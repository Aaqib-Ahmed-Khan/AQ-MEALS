import React from 'react';
import heroImage from '../images/herosection.jpeg'; // Ensure this path is correct

const HeroSection = () => {
  return (
    <section 
      className="relative h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to AQ Meals</h1>
        <p className="text-xl mb-6 text-teal-200">"Fresh, Fast, and Flavorful Meals Await!"</p>
        {/* <button className="bg-red-800 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg">
          Order Now
        </button> */}
      </div>
    </section>
  );
};

export default HeroSection;
