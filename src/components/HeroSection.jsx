import React from "react";
import Slider from "react-slick";
import heroImage1 from "../images/carosel2.png"; 
import heroImage2 from "../images/caroselpic.png";
import heroImage3 from "../images/carosel3.png";
import heroImage4 from "../images/herosection.jpeg"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  // Settings for the slider
  const settings = {
    dots: true,             // Display dots navigation
    infinite: true,         // Infinite scroll
    speed: 500,             // Transition speed
    // slidesToShow: 1,        // Show one slide at a time
    slidesToScroll: 1,      // Scroll one slide at a time
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 2300,    // Set autoplay speed to 3 seconds
    arrows: true       // Show arrows for manual navigation
  };

  return (
    <section className="relative h-screen">
      <Slider {...settings}>
        <div>
          <img src={heroImage1} alt="Slide 1" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage2} alt="Slide 2" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage3} alt="Slide 3" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage4} alt="Slide 4" className="w-full h-screen object-cover" />
        </div>
      </Slider>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content in the center of the Hero Section */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white">
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
