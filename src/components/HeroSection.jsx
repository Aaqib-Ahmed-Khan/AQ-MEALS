import React from "react";
import Slider from "react-slick";
import heroImage4 from "../images/herosection.jpeg"; 
import heroImage2 from "../images/caroselpic.png";
import heroImage3 from "../images/carosel3.png";
import heroImage1 from "../images/carosel2.png"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  // Settings for the slider
  const settings = {
    dots: true,             
    infinite: true,         
    speed: 500,            
    // slidesToShow: 1,       
    slidesToScroll: 1,      
    autoplay: true,         
    autoplaySpeed: 2300,   
    arrows: true      
  };

  return (
    <section className="relative h-screen">
      <Slider {...settings}>
      <div>
          <img src={heroImage4} alt="Slide 4" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage2} alt="Slide 2" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage3} alt="Slide 3" className="w-full h-screen object-cover" />
        </div>
        <div>
          <img src={heroImage1} alt="Slide 1" className="w-full h-screen object-cover" />
        </div>
      </Slider>

     
      <div className="absolute inset-0 bg-black opacity-50"></div>

      
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
