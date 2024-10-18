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
import { db } from '../firebase'; // Import Firebase Firestore
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // For getting the logged-in user

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null); // State to hold the image file
  const { user } = useAuth(); // Get the logged-in user

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to add your recipe.'); // Alert if user is not logged in
      return;
    }

    try {
      // Create a new recipe document in Firestore
      await addDoc(collection(db, 'recipes'), {
        name,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()), // Convert ingredients to array
        instructions,
        userId: user.uid, // Ensure user ID is added to the recipe
        imageUrl: image ? URL.createObjectURL(image) : '', // Set image URL as object URL for preview
        createdAt: new Date(),
      });

      alert('Recipe added successfully!'); // Alert for successful addition
      setName(''); // Reset name
      setIngredients(''); // Reset ingredients
      setInstructions(''); // Reset instructions
      setImage(null); // Reset image
    } catch (error) {
      console.error('Error adding recipe: ', error); // Log error
      alert('Error adding recipe, please try again.'); // Alert on error
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
