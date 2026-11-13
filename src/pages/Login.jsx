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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { auth, googleProvider } from "../firebase/firebase";
// import { GiDreamCatcher } from "react-icons/gi";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getErrorMessage = (code) => {
//     switch (code) {
//       case "auth/invalid-email":
//         return "Please enter a valid email address.";
//       case "auth/missing-password":
//         return "Please enter your password.";
//       case "auth/weak-password":
//         return "Password must be at least 6 characters.";
//       case "auth/email-already-in-use":
//         return "This email is already registered.";
//       case "auth/invalid-credential":
//         return "Incorrect email or password.";
//       case "auth/network-request-failed":
//         return "Check your internet connection and try again.";
//       default:
//         return "Something went wrong. Please try again.";
//     }
//   };

//   const handleEmailAuth = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isRegistering) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         navigate("/onboarding");
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       setError(getErrorMessage(error.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/onboarding");
//     } catch (error) {
//       if (error.code === "auth/popup-closed-by-user") {
//         setError("Google sign-in was cancelled.");
//       } else {
//         setError(getErrorMessage(error.code));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
//         {/* Left side */}
//         <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent">
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//                 <GiDreamCatcher className="text-white text-4xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold tracking-tight">
//                   Dream<span className="text-indigo-300">U</span>Track
//                 </h1>
//                 <p className="text-xs text-white/60">Precision Study Engine</p>
//               </div>
//             </div>

//             <h2 className="mt-14 text-4xl font-bold leading-tight">
//               Plan your studies.
//               <br />
//               Track your progress.
//               <br />
//               <span className="text-indigo-300">Reach your dream.</span>
//             </h2>

//             <p className="mt-5 text-white/70 leading-tight">
//               DreamUTrack helps O/L and A/L students manage subjects,
//               timetables, formulas, past papers and daily focus sessions in one
//               place.
//             </p>

//             <div className="mt-8 space-y-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   📅
//                 </div>
//                 <div>
//                   <p className="font-medium">Smart timetable</p>
//                   <p className="text-sm text-white/60">
//                     Build weekly study plans and track completion.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   ⏱️
//                 </div>
//                 <div>
//                   <p className="font-medium">Pomodoro focus</p>
//                   <p className="text-sm text-white/60">
//                     Stay focused with 25-minute study sessions.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   📊
//                 </div>
//                 <div>
//                   <p className="font-medium">Performance insights</p>
//                   <p className="text-sm text-white/60">
//                     Track marks, errors and subject progress.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
//             <p className="text-sm text-white/70 leading-tight">
//               Your study data stays on your device. DreamUTrack does not upload
//               your marks, timetable or notes to its servers.
//             </p>
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="p-7 sm:p-10 bg-[#0e1424]/80 lg:flex flex-col justify-center">
//           <div className="lg:hidden flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//               <GiDreamCatcher className="text-white text-3xl" />
//             </div>
//             <h1 className="text-xl font-bold">
//               Dream<span className="text-indigo-300">U</span>Track
//             </h1>
//           </div>

//           <h2 className="text-3xl font-bold">
//             {isRegistering ? "Create your account" : "Welcome back"}
//           </h2>
//           <p className="mt-2 text-white/60">
//             {isRegistering
//               ? "Start building your personal study system."
//               : "Sign in to continue your study journey."}
//           </p>

//           <button
//             onClick={handleGoogleLogin}
//             disabled={loading}
//             className="mt-7 w-full flex items-center justify-center gap-3 rounded-xl bg-white text-gray-900 py-3 font-medium hover:bg-gray-100 transition disabled:opacity-60">
//             <FcGoogle size={22} />
//             {loading ? "Please wait..." : "Continue with Google"}
//           </button>

//           <div className="flex items-center gap-4 my-6">
//             <div className="h-px flex-1 bg-white/10"></div>
//             <span className="text-xs text-white/40">OR</span>
//             <div className="h-px flex-1 bg-white/10"></div>
//           </div>

//           <form onSubmit={handleEmailAuth} className="space-y-4">
//             <div>
//               <label className="block text-sm text-white/70 mb-0">
//                 Email address
//               </label>
//               <div className="relative">
//                 <MdOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   required
//                   className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm text-white/70 mb-0">
//                 Password
//               </label>
//               <div className="relative">
//                 <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-11 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
//                   {showPassword ? (
//                     <IoEyeOffOutline size={20} />
//                   ) : (
//                     <IoEyeOutline size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-90 transition disabled:opacity-60">
//               {loading
//                 ? "Please wait..."
//                 : isRegistering
//                   ? "Create account"
//                   : "Sign in"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-white/60">
//             {isRegistering
//               ? "Already have an account?"
//               : "Don't have an account?"}{" "}
//             <button
//               type="button"
//               onClick={() => {
//                 setIsRegistering(!isRegistering);
//                 setError("");
//               }}
//               className="text-indigo-300 font-medium hover:text-indigo-200">
//               {isRegistering ? "Sign in" : "Create one"}
//             </button>
//           </p>

//           <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:hidden">
//             <p className="text-xs text-white/60 text-center font-body leading-tight">
//               Your study data stays on your device. DreamUTrack does not upload
//               your marks, timetable or notes to its servers.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { auth, googleProvider } from "../firebase/firebase";
// import { GiDreamCatcher } from "react-icons/gi";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

// const ERROR_MESSAGES = {
//   "auth/invalid-email": "Please enter a valid email address.",
//   "auth/missing-password": "Please enter your password.",
//   "auth/weak-password": "Password must be at least 6 characters.",
//   "auth/email-already-in-use": "This email is already registered.",
//   "auth/invalid-credential": "Incorrect email or password.",
//   "auth/network-request-failed":
//     "Check your internet connection and try again.",
//   "auth/popup-closed-by-user": "Google sign-in was cancelled.",
//   "auth/popup-blocked": "Popup was blocked. Please allow popups for this site.",
//   "auth/operation-not-allowed":
//     "Google sign-in is not enabled. Please contact support.",
//   "auth/unauthorized-domain":
//     "This domain is not authorized. Please contact support.",
// };

// const getErrorMessage = (code) =>
//   ERROR_MESSAGES[code] || "Something went wrong. Please try again.";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleEmailAuth = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isRegistering) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         navigate("/onboarding");
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(getErrorMessage(err.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(getErrorMessage(err.code));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
//         {/* Left side — desktop only */}
//         <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent">
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//                 <GiDreamCatcher className="text-white text-4xl" />
//               </div>
//               <div>
//                 <h1 className="font-heading text-2xl font-bold tracking-tight">
//                   Dream<span className="text-indigo-300">U</span>Track
//                 </h1>
//                 <p className="font-body text-xs text-white/60">
//                   Precision Study Engine
//                 </p>
//               </div>
//             </div>

//             <h2 className="font-heading mt-14 text-4xl font-bold leading-tight">
//               Plan your studies.
//               <br />
//               Track your progress.
//               <br />
//               <span className="text-indigo-300">Reach your dream.</span>
//             </h2>

//             <p className="font-body mt-5 text-white/70 leading-tight">
//               DreamUTrack helps O/L and A/L students manage subjects,
//               timetables, formulas, past papers and daily focus sessions in one
//               place.
//             </p>

//             <div className="mt-8 space-y-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   📅
//                 </div>
//                 <div>
//                   <p className="font-body font-medium">Smart timetable</p>
//                   <p className="font-body text-sm text-white/60">
//                     Build weekly study plans and track completion.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   ⏱️
//                 </div>
//                 <div>
//                   <p className="font-body font-medium">Pomodoro focus</p>
//                   <p className="font-body text-sm text-white/60">
//                     Stay focused with 25-minute study sessions.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
//                   📊
//                 </div>
//                 <div>
//                   <p className="font-body font-medium">Performance insights</p>
//                   <p className="font-body text-sm text-white/60">
//                     Track marks, errors and subject progress.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
//             <p className="font-body text-sm text-white/70 leading-tight">
//               Your study data stays on your device. DreamUTrack does not upload
//               your marks, timetable or notes to its servers.
//             </p>
//           </div>
//         </div>

//         {/* Right side — form */}
//         <div className="p-7 sm:p-10 bg-[#0e1424]/80 lg:flex flex-col justify-center">
//           <div className="lg:hidden flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//               <GiDreamCatcher className="text-white text-3xl" />
//             </div>
//             <h1 className="font-heading text-xl font-bold">
//               Dream<span className="text-indigo-300">U</span>Track
//             </h1>
//           </div>

//           <h2 className="font-heading text-3xl font-bold">
//             {isRegistering ? "Create your account" : "Welcome back"}
//           </h2>
//           <p className="font-body mt-2 text-white/60">
//             {isRegistering
//               ? "Start building your personal study system."
//               : "Sign in to continue your study journey."}
//           </p>

//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             disabled={loading}
//             aria-label="Continue with Google"
//             className="font-body mt-7 w-full flex items-center justify-center gap-3 rounded-xl bg-white text-gray-900 py-3 font-medium hover:bg-gray-100 transition disabled:opacity-60">
//             <FcGoogle size={22} aria-hidden="true" />
//             {loading ? "Please wait..." : "Continue with Google"}
//           </button>

//           <div className="flex items-center gap-4 my-6">
//             <div className="h-px flex-1 bg-white/10"></div>
//             <span className="font-body text-xs text-white/40">OR</span>
//             <div className="h-px flex-1 bg-white/10"></div>
//           </div>

//           <form onSubmit={handleEmailAuth} className="space-y-4" noValidate>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="font-body block text-sm text-white/70 mb-1">
//                 Email address
//               </label>
//               <div className="relative">
//                 <MdOutlineMail
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
//                   aria-hidden="true"
//                 />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   required
//                   aria-describedby={error ? "login-error" : undefined}
//                   className="font-body w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="font-body block text-sm text-white/70 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <RiLockPasswordLine
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
//                   aria-hidden="true"
//                 />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete={
//                     isRegistering ? "new-password" : "current-password"
//                   }
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   aria-describedby={error ? "login-error" : undefined}
//                   className="font-body w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-11 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
//                   {showPassword ? (
//                     <IoEyeOffOutline size={20} aria-hidden="true" />
//                   ) : (
//                     <IoEyeOutline size={20} aria-hidden="true" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div
//                 id="login-error"
//                 role="alert"
//                 className="font-body rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="font-body w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-90 transition disabled:opacity-60">
//               {loading
//                 ? "Please wait..."
//                 : isRegistering
//                   ? "Create account"
//                   : "Sign in"}
//             </button>
//           </form>

//           <p className="font-body mt-6 text-center text-sm text-white/60">
//             {isRegistering
//               ? "Already have an account?"
//               : "Don't have an account?"}{" "}
//             <button
//               type="button"
//               onClick={() => {
//                 setIsRegistering(!isRegistering);
//                 setError("");
//               }}
//               className="font-body text-indigo-300 font-medium hover:text-indigo-200">
//               {isRegistering ? "Sign in" : "Create one"}
//             </button>
//           </p>

//           <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:hidden">
//             <p className="font-body text-xs text-white/60 text-center leading-tight">
//               Your study data stays on your device. DreamUTrack does not upload
//               your marks, timetable or notes to its servers.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { GiDreamCatcher } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import Loader from "../components/Loader";

/* ----------------------------- helpers ----------------------------- */

const ERROR_MESSAGES = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-email": "Please enter your email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/email-already-in-use":
    "This email is already registered. Try signing in instead.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a few minutes and try again.",
  "auth/network-request-failed":
    "Check your internet connection and try again.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/popup-blocked": "Popup was blocked. Please allow popups for this site.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled. Please contact support.",
  "auth/unauthorized-domain":
    "This domain is not authorized. Please contact support.",
};

const getErrorMessage = (code) =>
  ERROR_MESSAGES[code] || "Something went wrong. Please try again.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// New users go through onboarding (pick O/L or A/L + subjects), others to dashboard
const destinationFor = (result) =>
  getAdditionalUserInfo(result)?.isNewUser ? "/onboarding" : "/dashboard";

const getStrength = (pw) => {
  if (pw.length < 6) return 0;
  let score = 1;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^\w\s]/.test(pw)) score++;
  return score;
};

const STRENGTH_LABELS = ["Too short", "Weak", "Okay", "Good", "Strong"];
const STRENGTH_COLORS = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-emerald-400",
];

const inputClass =
  "font-body w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-emerald-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10 disabled:opacity-60";

/* --------------------------- small pieces --------------------------- */

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function Brand({ size = "lg" }) {
  const box = size === "lg" ? "h-12 w-12 rounded-2xl" : "h-10 w-10 rounded-xl";
  const icon = size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <div className="flex items-center justify-center py-1 gap-3">
      <div
        className={`${box} flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20`}>
        <GiDreamCatcher className={`text-4xl ${icon} text-emerald-950`} />
      </div>
      <div>
        <h1
          className={`font-heading font-bold tracking-tight ${
            size === "lg" ? "text-2xl" : "text-xl"
          }`}>
          Dream<span className="text-emerald-300 px-1">U</span>Track
        </h1>
        {size === "lg" && (
          <p className="font-body text-xs text-white/50">
            Precision Study Engine
          </p>
        )}
      </div>
    </div>
  );
}

function PasswordStrength({ password }) {
  if (!password) return null;
  const score = getStrength(password);
  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? STRENGTH_COLORS[score] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="font-body mt-1.5 text-xs text-white/50">
        {STRENGTH_LABELS[score]}
      </p>
    </div>
  );
}

function PreviewPanel() {
  const bars = [40, 65, 50, 85, 70, 95, 30];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="mt-10">
      <p className="font-body mb-3 text-[11px] uppercase tracking-[0.2em] text-white/35">
        Preview
      </p>

      <div className="grid grid-cols-5 gap-3">
        {/* Countdown */}
        <div className="col-span-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="font-body text-xs text-white/50">Exam countdown</p>
          <p className="font-heading mt-2 text-4xl font-bold tabular-nums">
            112
            <span className="ml-1.5 text-base font-medium text-white/50">
              days
            </span>
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
          </div>
        </div>

        {/* Pomodoro ring */}
        <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="163.4"
                strokeDashoffset="57"
              />
            </svg>
            <span className="font-heading absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">
              25:00
            </span>
          </div>
          <p className="font-body mt-2 text-xs text-white/50">Focus</p>
        </div>
      </div>

      {/* Weekly forest */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs text-white/50">Weekly forest</p>
          <p className="font-body text-xs text-emerald-300">🌲 18 sessions</p>
        </div>
        <div className="mt-3 flex h-16 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-12 w-full items-end">
                <div
                  className="w-full rounded-md bg-gradient-to-t from-emerald-500/70 to-emerald-300/90"
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="font-body text-[10px] text-white/40">
                {days[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- page ------------------------------- */

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(null); // null | "email" | "google" | "reset"
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Stops the "already logged in" listener from racing with our own navigate()
  const authInProgress = useRef(false);

  const isBusy = loading !== null;

  // 1) Finish a Google redirect sign-in (used when popups are blocked, e.g. on mobile)
  // 2) Send already-signed-in users straight to the dashboard
  useEffect(() => {
    let cancelled = false;
    let unsubscribe;

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          navigate(destinationFor(result), { replace: true });
          return;
        }
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user && !authInProgress.current) {
            navigate("/dashboard", { replace: true });
          }
        });
      })
      .catch((err) => setError(getErrorMessage(err.code)));

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, [navigate]);

  const fail = (err) => {
    authInProgress.current = false;
    if (err?.code === "auth/cancelled-popup-request") return;
    setError(getErrorMessage(err?.code));
  };

  const clearMessages = () => {
    setError("");
    setInfo("");
  };

  const validate = () => {
    if (!email.trim()) return "auth/missing-email";
    if (!EMAIL_RE.test(email.trim())) return "auth/invalid-email";
    if (!password) return "auth/missing-password";
    if (isRegistering && password.length < 6) return "auth/weak-password";
    return null;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    clearMessages();

    const problem = validate();
    if (problem) {
      setError(getErrorMessage(problem));
      return;
    }

    setLoading("email");
    authInProgress.current = true;

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        navigate("/onboarding", { replace: true });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      fail(err);
    } finally {
      setLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    clearMessages();
    setLoading("google");
    authInProgress.current = true;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate(destinationFor(result), { replace: true });
    } catch (err) {
      if (err.code === "auth/popup-blocked") {
        // Popup blocked (common on phones) -> fall back to full-page redirect
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          fail(redirectErr);
        }
      } else {
        fail(err);
      }
    } finally {
      setLoading(null);
    }
  };

  const handleReset = async () => {
    clearMessages();

    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter your email above first, then tap “Forgot password?”");
      return;
    }

    setLoading("reset");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo("Reset link sent. Check your inbox (and the spam folder).");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(null);
    }
  };

  const switchMode = (registering) => {
    setIsRegistering(registering);
    clearMessages();
  };

  const feedbackId = error || info ? "auth-feedback" : undefined;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#070b0a] px-4 py-8 text-white sm:py-12">
      {/* background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-amber-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <main className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1311]/90 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:grid-cols-[1.05fr_1fr]">
        {/* Left side — desktop only */}
        <section className="hidden flex-col justify-between bg-gradient-to-br from-emerald-900/40 via-emerald-950/30 to-transparent p-10 lg:flex">
          <div>
            <Brand />

            <h2 className="font-heading mt-12 text-4xl font-bold leading-[1.15]">
              Plan. Focus.
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Reach your dream.
              </span>
            </h2>

            <p className="font-body mt-4 max-w-sm text-[15px] leading-tight text-white/60">
              Timetables, formulas, past papers and focus sessions for O/L and
              A/L students, all in one place.
            </p>

            <PreviewPanel />
          </div>
        </section>

        {/* Right side — form */}
        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-8 lg:hidden">
            <Brand size="sm" />
          </div>

          {/* Mode switch */}
          <div
            role="tablist"
            aria-label="Sign in or create account"
            className="grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.04] p-1">
            {[
              { label: "Sign in", value: false },
              { label: "Create account", value: true },
            ].map((tab) => {
              const active = isRegistering === tab.value;
              return (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={isBusy}
                  onClick={() => switchMode(tab.value)}
                  className={`font-body rounded-lg py-2 text-sm font-medium transition ${
                    active
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-white/50 hover:text-white/80"
                  }`}>
                  {tab.label}
                </button>
              );
            })}
          </div>

          <h2 className="font-heading mt-8 text-3xl font-bold tracking-tight">
            {isRegistering ? "Start your journey" : "Welcome back"}
          </h2>
          <p className="font-body mt-2 text-[15px] text-white/55 leading-tight">
            {isRegistering
              ? "Create an account and set up your study space in a minute."
              : "Sign in to continue where you left off."}
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isBusy}
            className="font-body mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 text-[15px] font-medium text-gray-900 transition hover:bg-gray-100 active:scale-[0.99] disabled:opacity-60">
            {loading === "google" ? (
              <Spinner />
            ) : (
              <FcGoogle size={22} aria-hidden="true" />
            )}
            {loading === "google" ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-body text-xs uppercase tracking-widest text-white/35">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="font-body mb-1.5 block text-sm text-white/70">
                Email address
              </label>
              <div className="relative">
                <MdOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/40"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  disabled={isBusy}
                  aria-invalid={!!error}
                  aria-describedby={feedbackId}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-body block text-sm text-white/70">
                  Password
                </label>
                {!isRegistering && (
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isBusy}
                    className="font-body text-xs text-emerald-300 transition hover:text-emerald-200 disabled:opacity-60">
                    {loading === "reset" ? "Sending..." : "Forgot password?"}
                  </button>
                )}
              </div>
              <div className="relative">
                <RiLockPasswordLine
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/40"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isRegistering ? "new-password" : "current-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isRegistering ? "At least 6 characters" : "Your password"
                  }
                  disabled={isBusy}
                  aria-invalid={!!error}
                  aria-describedby={feedbackId}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white">
                  {showPassword ? (
                    <IoEyeOffOutline size={20} aria-hidden="true" />
                  ) : (
                    <IoEyeOutline size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
              {isRegistering && <PasswordStrength password={password} />}
            </div>

            <div id="auth-feedback" aria-live="polite">
              {error && (
                <div
                  role="alert"
                  className="font-body rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
              {info && (
                <div
                  role="status"
                  className="font-body rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  {info}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="font-body flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-[15px] font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-[0.99] disabled:opacity-60">
              {loading === "email" && <Spinner />}
              {loading === "email"
                ? "Please wait..."
                : isRegistering
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="font-body mt-7 text-center text-xs leading-tight text-white/40">
            Your marks, timetable and notes are saved on this device only.
            Firebase handles your login. Clearing your browser data will erase
            your study data.
          </p>
        </section>
      </main>
    </div>
  );
}
