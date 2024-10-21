import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-5 bg-stone-300">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">Welcome to AQ Meals, your go-to destination for fresh and flavorful meals! We are dedicated to providing delicious and healthy food options tailored to your tastes.</p>

      <div className="mb-8">                    
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p><strong>Address:</strong> 123 Foodie Lane, Meal City, Flavor Town</p>
        <p><strong>Contact Number:</strong> +1 (234) 567-890</p>
        <p><strong>Email Address:</strong> contact@aqmeals.com</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Report Issues</h2>
        <p>If you have any questions, concerns, or wish to report an issue, please do not hesitate to reach out to us via the email provided above. Your satisfaction and feedback are our top priorities.</p>
      </div>
    </div>
  );
};

export default About;
