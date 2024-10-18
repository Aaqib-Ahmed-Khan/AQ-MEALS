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
import { db } from '../firebase'; // Import Firebase Firestore
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // For getting the logged-in user

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]); // State to hold the recipes
  const { user } = useAuth(); // Get the logged-in user

  useEffect(() => {
    if (user) {
      // Create a query to get recipes by the logged-in user
      const q = query(collection(db, 'recipes'), where('userId', '==', user.uid));
      
      // Subscribe to the query and get real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const recipesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipesData); // Update the recipes state with the retrieved data
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user]); // Dependency array: runs when 'user' changes

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">{recipe.name}</h3>
            {recipe.imageUrl && ( // Check if imageUrl exists
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name} 
                className="w-full h-64 object-cover mb-2" 
              />
            )}
            <p className="mb-2">Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;

