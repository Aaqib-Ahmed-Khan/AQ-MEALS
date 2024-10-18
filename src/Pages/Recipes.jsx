import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState(['cakes', 'chicken', 'pasta', 'salads']); // Add your suggestions here

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchRecipes(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchClick = () => {
    if (searchQuery) {
      fetchRecipes(searchQuery); // Fetch recipes on button click
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        <Link to="/sharerecipe">Add Recipe</Link>
      </button>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full"
        />
        <button 
          onClick={handleSearchClick}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Suggestions:</h2>
        <ul className="list-disc list-inside">
          {suggestedRecipes.map((suggestion, index) => (
            <li key={index} className="hover:text-blue-500 cursor-pointer" onClick={() => setSearchQuery(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      {loading && <p>Loading...</p>}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-32 object-cover rounded mb-2" />
              <p>{recipe.strCategory}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Recipes;
