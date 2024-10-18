import React, { useEffect, useState } from 'react';

const TrendingRecipes = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        ]);

        const data = await Promise.all(responses.map((res) => res.json()));
        // Extracting meals from the fetched data
        const recipes = data.map((item) => item.meals[0]);
        setTrendingRecipes(recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingRecipes();
  }, []);

  if (loading) return <div>Loading trending recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Trending Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card border p-4 rounded">
            <h3 className="text-lg font-bold">{recipe.strMeal}</h3>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 object-cover mb-2"
            />
            <p>Category: {recipe.strCategory}</p>
            <p>Cuisine: {recipe.strArea}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;
