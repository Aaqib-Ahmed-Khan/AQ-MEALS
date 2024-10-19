// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase'; // Adjust according to your project structure
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for user info

// const MyRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const { user } = useAuth(); // Getting logged-in user's info

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       if (!user) return; // If no user is logged in, don't fetch anything
//       try {
//         const q = query(collection(db, 'recipes'), where('userId', '==', user.uid)); // Query by user ID
//         const querySnapshot = await getDocs(q);

//         const userRecipes = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setRecipes(userRecipes);
//       } catch (error) {
//         console.error("Error fetching recipes: ", error);
//       }
//     };

//     fetchRecipes();
//   }, [user]);

//   return (
//     <div className="container mx-auto p-5">
//       <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="border rounded-lg p-4 shadow-md">
//             <h3 className="text-lg font-semibold">{recipe.name}</h3>
//             <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
//             <p><strong>Instructions:</strong> {recipe.instructions}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyRecipes;
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firestore
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const MyRecipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', user.uid) // Filter by user ID
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push({ ...doc.data(), id: doc.id });
        });
        setRecipes(recipesData);
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    }
  }, [user]);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{recipe.name}</h3>
            <p className="text-sm text-gray-700">Ingredients: {recipe.ingredients.join(', ')}</p>
            <p className="text-sm text-gray-700">Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
