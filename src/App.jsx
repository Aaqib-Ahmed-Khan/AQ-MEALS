// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import About from './pages/About';
// import Recipes from './Pages/Recipes';
// import AddRecipe from './pages/AddRecipe';
// import SignIn from './Pages/SignIn';// Import Sign In page
// import SignUp from './Pages/SignUp';// Import Sign Up page
// import MyRecipes from './pages/MyRecipes'; // Import My Recipes page

// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <div className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/recipes" element={<Recipes />} />
//             <Route path="/sharerecipe" element={<AddRecipe />} />
//             <Route path="/signin" element={<SignIn />} /> {/* Sign In route */}
//             <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
//             <Route path="/myrecipes" element={<MyRecipes />} /> {/* My Recipes route */}
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Recipes from './Pages/Recipes';
import AddRecipe from './Pages/AddRecipe';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import MyRecipes from './Pages/MyRecipes';
import AuthGuard from './components/AuthGuard';
import './index.css'; // Your custom styles

// Import slick-carousel CSS for the carousel functionality
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Add these imports

const App = () => {
  return (
    <Router>
      {/* The flex layout is already good here */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content area that will grow to fill the space between Header and Footer */}
        <div className="flex-grow">          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route 
              path="/AddRecipe" 
              element={
                <AuthGuard>
                  <AddRecipe />
                </AuthGuard>
              } 
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/MyRecipes" 
              element={
                <AuthGuard>
                  <MyRecipes />
                </AuthGuard>
              } 
            />
          </Routes>
        </div>

        {/* Footer should always be at the bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

