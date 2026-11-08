// // import React from 'react';
// import { useState } from "react";
// import { auth, googleProvider } from "../firebase";

// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// import { useNavigate } from "react-router-dom";
// import { GiDreamCatcher } from "react-icons/gi";
// import { FcGoogle } from "react-icons/fc";

// // import Dashboards from "./Dashboard";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false); // Login ද Register ද

//   // Email/Password Login & Register
//   const handleEmailAuth = async (e) => {
//     e.preventDefault();
//     try {
//       if (isRegistering) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         alert("Account Created Successfully!");
//         navigate("/Dashboards");
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/Dashboards");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-card card">
//         <div className="login-header">
//           <div className="logo">
//             <GiDreamCatcher className="logo-icon" />
//             <span className="logo-name">Dream</span>
//             <span>Track</span>
//           </div>
//         </div>
//         <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
//         <p className="subtitle">Precision Study Engine | Edition 2026</p>

//         <form onSubmit={handleEmailAuth} className="login-form">
//           <input
//             type="email"
//             placeholder="Email Address"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="auth-btn">
//             {isRegistering ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <div className="divider">
//           <span>OR</span>
//         </div>

//         <button className="google-btn" onClick={handleGoogleLogin}>
//           <FcGoogle size={22} /> Continue with Google
//         </button>

//         <p className="toggle-text">
//           {isRegistering
//             ? "Already have an account?"
//             : "Don't have an account?"}
//           <span onClick={() => setIsRegistering(!isRegistering)}>
//             {isRegistering ? " Login here" : " Register here"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { GiDreamCatcher } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/missing-password":
        return "Please enter your password.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/network-request-failed":
        return "Check your internet connection and try again.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/onboarding");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/onboarding");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else {
        setError(getErrorMessage(error.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Left side */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <GiDreamCatcher className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Dream<span className="text-indigo-300">U</span>Track
                </h1>
                <p className="text-xs text-white/60">Precision Study Engine</p>
              </div>
            </div>

            <h2 className="mt-14 text-4xl font-bold leading-tight">
              Plan your studies.
              <br />
              Track your progress.
              <br />
              <span className="text-indigo-300">Reach your dream.</span>
            </h2>

            <p className="mt-5 text-white/70 leading-relaxed">
              DreamUTrack helps O/L and A/L students manage subjects,
              timetables, formulas, past papers and daily focus sessions in one
              place.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  📅
                </div>
                <div>
                  <p className="font-medium">Smart timetable</p>
                  <p className="text-sm text-white/60">
                    Build weekly study plans and track completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  ⏱️
                </div>
                <div>
                  <p className="font-medium">Pomodoro focus</p>
                  <p className="text-sm text-white/60">
                    Stay focused with 25-minute study sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  📊
                </div>
                <div>
                  <p className="font-medium">Performance insights</p>
                  <p className="text-sm text-white/60">
                    Track marks, errors and subject progress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/70">
              🔒 Your study data stays on your device. DreamUTrack does not
              upload your marks, timetable or notes to its servers.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="p-7 sm:p-10 bg-[#0e1424]/80">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <GiDreamCatcher className="text-white text-xl" />
            </div>
            <h1 className="text-xl font-bold">
              Dream<span className="text-indigo-300">U</span>Track
            </h1>
          </div>

          <h2 className="text-3xl font-bold">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-white/60">
            {isRegistering
              ? "Start building your personal study system."
              : "Sign in to continue your study journey."}
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-7 w-full flex items-center justify-center gap-3 rounded-xl bg-white text-gray-900 py-3 font-medium hover:bg-gray-100 transition disabled:opacity-60">
            <FcGoogle size={22} />
            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs text-white/40">OR</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Email address
              </label>
              <div className="relative">
                <MdOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-11 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-90 transition disabled:opacity-60">
              {loading
                ? "Please wait..."
                : isRegistering
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="text-indigo-300 font-medium hover:text-indigo-200">
              {isRegistering ? "Sign in" : "Create one"}
            </button>
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:hidden">
            <p className="text-xs text-white/60">
              🔒 Your study data stays on your device. DreamUTrack does not
              upload your marks, timetable or notes to its servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
