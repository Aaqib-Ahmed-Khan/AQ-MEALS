import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // You can also save user details like name and image in Firestore here
      // const user = userCredential.user;
      // await saveUserToFirestore(user.uid, name, image); // Implement this function to save user data
      
      console.log("User signed up:", userCredential.user);
      // Redirect to sign in or home page after successful signup
      navigate("/signin"); // Redirecting to sign-in page after signup
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please log in instead.'); // Inform the user
        // Optionally, redirect to the sign-in page
        navigate("/signin");
      } else {
        console.error("Error signing up:", error);
        alert("An error occurred during sign up. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp}>
        <h2>Create Account</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          accept="image/*" 
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </form>
    </div>
  );
};

export default SignUp;
