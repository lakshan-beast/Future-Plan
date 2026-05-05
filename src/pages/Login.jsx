// import React from 'react';
import { useState } from "react";
import { auth, googleProvider } from "../firebase";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { GiFlyingTarget } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";

import Dashboards from "./Dashboard";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Login ද Register ද

  // Email/Password Login & Register
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created Successfully!");
        navigate("/Dashboards");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/Dashboards");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <GiFlyingTarget className="logo-icon" />
            <span className="logo-name">Dream</span>
            <span>Track</span>
          </div>
        </div>
        <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">Precision Study Engine | Edition 2026</p>

        <form onSubmit={handleEmailAuth} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            {isRegistering ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="toggle-text">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? " Login here" : " Register here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
