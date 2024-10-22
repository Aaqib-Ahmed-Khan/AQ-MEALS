
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
        where('userId', '==', user.uid) 
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push({ ...doc.data(), id: doc.id });
        });
        setRecipes(recipesData);
      });

      return () => unsubscribe(); 
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
