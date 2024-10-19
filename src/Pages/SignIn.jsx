import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Import your background image
import backgroundImage from '../images/bg.jpg'; // Adjust the path as necessary

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after successful sign-in
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-stone-400"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }} 
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-sm w-full"> {/* Container styling with slight opacity */}
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In to Add Your Recipe</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 w-full mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-red-500">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
