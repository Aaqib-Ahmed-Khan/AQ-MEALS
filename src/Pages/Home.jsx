import React from 'react';
import HeroSection from '../components/HeroSection';
import TrendingRecipes from '../components/TrendingRecipes';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrendingRecipes/>
      {/* Other components specific to the Home page can go here */}
    </div>
  );
};

export default Home;
