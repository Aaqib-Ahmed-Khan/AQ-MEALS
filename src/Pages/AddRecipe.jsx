
import React, { useState } from 'react';
import { db, storage } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { useAuth } from '../context/AuthContext'; 

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {        
    e.preventDefault();

    if (!user) {
      alert('Please sign in to add your recipe.');
      return;
    }

    try {
      
      const storageRef = ref(storage, `recipes/${image.name}`);
     
      await uploadBytes(storageRef, image);
      
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'recipes'), {
        name,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions,
        userId: user.uid, 
        imageUrl, 
        createdAt: new Date(),
      });

      alert('Recipe added successfully!');
      setName('');
      setIngredients('');
      setInstructions('');
      setImage(null);
    } catch (error) {
      console.error('Error adding recipe: ', error);
      alert('Error adding recipe, please try again.');
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
        <input
        type="text"
       value={name}
            onChange={(e) => setName(e.target.value)}
        className="mt-1 block w-full p-2 border"
        required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
        <input
       type="text"
         value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
       className="mt-1 block w-full p-2 border"
       required
        />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
          value={instructions}
         onChange={(e) => setInstructions(e.target.value)}
           className="mt-1 block w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Recipe Image</label>
        <input
       type="file"
         accept="image/*"
          onChange={handleImageChange}
         className="mt-1 block w-full p-2 border"
           required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Recipe
      </button>
      </form>
    </div>
  );
};

export default AddRecipe;
