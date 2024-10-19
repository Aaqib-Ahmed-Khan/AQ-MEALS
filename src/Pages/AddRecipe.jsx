// import React, { useState } from 'react';
// import { db } from '../firebase'; // Import Firebase Firestore
// import { collection, addDoc } from 'firebase/firestore';
// import { useAuth } from '../context/AuthContext'; // For getting the logged-in user

// const AddRecipe = () => {
//   const [name, setName] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const { user } = useAuth(); // Assuming the logged-in user is accessible

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Add recipe to Firestore
//       await addDoc(collection(db, 'recipes'), {
//         name,
//         ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), // Convert ingredients to array
//         instructions,
//         userId: user?.uid, // Ensure user ID is added to the recipe
//         createdAt: new Date(),
//       });
//       alert('Recipe added successfully!');
//       setName('');
//       setIngredients('');
//       setInstructions('');
//     } catch (error) {
//       console.error("Error adding recipe: ", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full p-2 border"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
//           <input
//             type="text"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//             className="mt-1 block w-full p-2 border"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Instructions</label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             className="mt-1 block w-full p-2 border"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Recipe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddRecipe;
import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase Firestore and Storage
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage methods
import { useAuth } from '../context/AuthContext'; // For getting the logged-in user

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to add your recipe.');
      return;
    }

    try {
      // Create a storage reference
      const storageRef = ref(storage, `recipes/${image.name}`);
      
      // Upload the image
      await uploadBytes(storageRef, image);
      
      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Create a new recipe document in Firestore
      await addDoc(collection(db, 'recipes'), {
        name,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions,
        userId: user.uid, // Ensure user ID is added to the recipe
        imageUrl, // Set the image URL from Firebase Storage
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
