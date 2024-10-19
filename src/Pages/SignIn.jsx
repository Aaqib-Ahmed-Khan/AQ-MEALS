import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useNavigate } from "react-router-dom";

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
    <div className="container mx-auto p-10 bg-stone-400">
      <h1 className="text-3xl font-bold mb-4">Sign In first to add your recipe</h1>
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
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} className="text-red-500">
          Create Account
        </button>
      </p>
    </div>
  );
};

export default SignIn;
