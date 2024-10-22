
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const Header = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/signin'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <header className="bg-cyan-900 text-orange-100 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-stone-100 mb-4 md:mb-0" to="/">
          <span className="ml-3 text-xl">AQ MEALS</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to={'/'} className="mr-5 hover:text-yellow-400 font-medium ">Home</Link>
          <Link to={'about'} className="mr-5 hover:text-yellow-400 font-medium">About Us</Link>
          <Link to={'recipes'} className="mr-5 hover:text-gyellow-400 font-medium ">Recipes</Link>
          <Link to={'AddRecipe'} className="mr-5 hover:text-yellow-400 font-medium ">Add Recipe</Link>
          {user ? ( // Show these links only if user is logged in
            <>
              <Link to={'/myrecipes'} className="mr-5 hover:text-yellow-400 font-normal ">My Recipes</Link>
              <button 
                onClick={handleLogout} 
                className="mr-5 hover:text-yellow-400 bg-transparent border-none cursor-pointer font-bold "
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to={'/signin'} className="mr-5 hover:text-yellow-400 font-bold ">Sign In</Link>
              <Link to={'/signup'} className="mr-5 hover:text-yellow-400 font-bold">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
