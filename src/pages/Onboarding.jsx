// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   GraduationCap,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   Calendar,
//   Clock,
//   //   BookOpen,
//   Plus,
// } from "lucide-react";

// const Onboarding = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [examLevel, setExamLevel] = useState("");
//   const [stream, setStream] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [customSubject, setCustomSubject] = useState("");
//   const [examDate, setExamDate] = useState("");
//   const [dailyHours, setDailyHours] = useState(4);

//   const olMainSubjects = [
//     "Sinhala",
//     "Mathematics",
//     "Science",
//     "English",
//     "History",
//     "Religion",
//   ];

//   const olOptionalGroups = {
//     "Group 01": ["Commerce", "Geography", "Civil Technology", "Agriculture"],
//     "Group 02": [
//       "Music",
//       "Drama",
//       "Dancing",
//       "Sinhala Literature",
//       "English Literature",
//     ],
//     "Group 03": ["ICT", "Technology", "Health", "Home Economics"],
//   };

//   const alStreams = {
//     Maths: ["Combined Maths", "Physics", "Chemistry", "ICT"],
//     "Biological Science": ["Biology", "Physics", "Chemistry", "Agriculture"],
//     Technology: [
//       "Engineering Technology",
//       "Science for Technology",
//       "ICT",
//       "Physics",
//     ],
//     Commerce: [
//       "Business Studies",
//       "Economics",
//       "Accounting",
//       "Business Statistics",
//     ],
//     Arts: ["Sinhala", "Political Science", "Geography", "History", "Logic"],
//   };

//   const toggleSubject = (subject) => {
//     setSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject],
//     );
//   };

//   const addCustomSubject = () => {
//     if (customSubject.trim() && !subjects.includes(customSubject.trim())) {
//       setSubjects([...subjects, customSubject.trim()]);
//       setCustomSubject("");
//     }
//   };

//   const handleNext = () => {
//     if (step < 5) setStep(step + 1);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSave = () => {
//     const setup = {
//       examLevel,
//       stream,
//       subjects,
//       examDate,
//       dailyHours,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem("dreamutrack-setup", JSON.stringify(setup));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10">
//         {/* Progress indicator */}
//         <div className="flex items-center justify-between mb-8">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <div
//               key={s}
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
//                 s <= step
//                   ? "bg-indigo-500 text-white"
//                   : "bg-white/10 text-white/40"
//               }`}>
//               {s <= step ? <Check size={16} /> : s}
//             </div>
//           ))}
//         </div>

//         {/* Step 1: Exam level */}
//         {step === 1 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Choose your exam level</h2>
//             <p className="text-white/60 mb-6">
//               Select whether you are preparing for O/L or A/L.
//             </p>

//             <div className="grid grid-cols-2 gap-4">
//               {["O/L", "A/L"].map((level) => (
//                 <button
//                   key={level}
//                   onClick={() => setExamLevel(level)}
//                   className={`rounded-2xl border p-6 text-left transition ${
//                     examLevel === level
//                       ? "border-indigo-400 bg-indigo-500/20"
//                       : "border-white/10 bg-white/5 hover:bg-white/10"
//                   }`}>
//                   <GraduationCap size={24} className="mb-3 text-indigo-300" />
//                   <div className="font-semibold">{level}</div>
//                   <div className="text-sm text-white/50">
//                     {level === "O/L" ? "Ordinary Level" : "Advanced Level"}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 2: Stream (A/L only) */}
//         {step === 2 && examLevel === "A/L" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Choose your stream</h2>
//             <p className="text-white/60 mb-6">Select your A/L stream.</p>

//             <div className="grid grid-cols-2 gap-4">
//               {Object.keys(alStreams).map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setStream(s)}
//                   className={`rounded-2xl border p-5 text-left transition ${
//                     stream === s
//                       ? "border-indigo-400 bg-indigo-500/20"
//                       : "border-white/10 bg-white/5 hover:bg-white/10"
//                   }`}>
//                   <div className="font-semibold">{s}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 3: Subjects */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Select your subjects</h2>
//             <p className="text-white/60 mb-6">
//               Choose the subjects you are studying.
//             </p>

//             {examLevel === "O/L" && (
//               <div>
//                 <h3 className="text-sm font-semibold text-white/70 mb-3">
//                   Main subjects
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {olMainSubjects.map((sub) => (
//                     <button
//                       key={sub}
//                       onClick={() => toggleSubject(sub)}
//                       className={`rounded-full px-4 py-2 text-sm transition ${
//                         subjects.includes(sub)
//                           ? "bg-indigo-500 text-white"
//                           : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
//                       }`}>
//                       {sub}
//                     </button>
//                   ))}
//                 </div>

//                 <h3 className="text-sm font-semibold text-white/70 mb-3">
//                   Optional subjects
//                 </h3>
//                 {Object.entries(olOptionalGroups).map(([group, subs]) => (
//                   <div key={group} className="mb-4">
//                     <p className="text-xs text-white/40 mb-2">{group}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {subs.map((sub) => (
//                         <button
//                           key={sub}
//                           onClick={() => toggleSubject(sub)}
//                           className={`rounded-full px-4 py-2 text-sm transition ${
//                             subjects.includes(sub)
//                               ? "bg-indigo-500 text-white"
//                               : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
//                           }`}>
//                           {sub}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {examLevel === "A/L" && (
//               <div>
//                 <h3 className="text-sm font-semibold text-white/70 mb-3">
//                   {stream} subjects
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {alStreams[stream]?.map((sub) => (
//                     <button
//                       key={sub}
//                       onClick={() => toggleSubject(sub)}
//                       className={`rounded-full px-4 py-2 text-sm transition ${
//                         subjects.includes(sub)
//                           ? "bg-indigo-500 text-white"
//                           : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
//                       }`}>
//                       {sub}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Custom subject */}
//             <div className="mt-6">
//               <label className="block text-sm text-white/70 mb-2">
//                 Add custom subject
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={customSubject}
//                   onChange={(e) => setCustomSubject(e.target.value)}
//                   placeholder="e.g. Entrepreneurship Studies"
//                   className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                 />
//                 <button
//                   onClick={addCustomSubject}
//                   className="rounded-xl bg-indigo-500 px-4 py-3 hover:bg-indigo-600 transition">
//                   <Plus size={18} />
//                 </button>
//               </div>

//               {subjects.length > 0 && (
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {subjects.map((sub) => (
//                     <span
//                       key={sub}
//                       className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-sm">
//                       {sub}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 4: Exam date */}
//         {step === 4 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Set your exam date</h2>
//             <p className="text-white/60 mb-6">
//               This will be used for your countdown.
//             </p>

//             <div className="relative">
//               <Calendar
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
//                 size={18}
//               />
//               <input
//                 type="date"
//                 value={examDate}
//                 onChange={(e) => setExamDate(e.target.value)}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//               />
//             </div>
//           </div>
//         )}

//         {/* Step 5: Daily study hours */}
//         {step === 5 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-2">
//               Set your daily study target
//             </h2>
//             <p className="text-white/60 mb-6">
//               How many hours can you study per day?
//             </p>

//             <div className="relative">
//               <Clock
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
//                 size={18}
//               />
//               <input
//                 type="number"
//                 min="1"
//                 max="16"
//                 value={dailyHours}
//                 onChange={(e) => setDailyHours(Number(e.target.value))}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//               />
//             </div>

//             <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
//               <p className="text-sm text-white/70">
//                 📚 You selected {subjects.length} subjects and plan to study{" "}
//                 {dailyHours} hours per day.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Navigation buttons */}
//         <div className="mt-8 flex items-center justify-between">
//           <button
//             onClick={handleBack}
//             disabled={step === 1}
//             className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition disabled:opacity-40">
//             <ChevronLeft size={16} />
//             Back
//           </button>

//           {step < 5 ? (
//             <button
//               onClick={handleNext}
//               className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
//               Next
//               <ChevronRight size={16} />
//             </button>
//           ) : (
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
//               Save & Continue
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

// src/pages/Onboarding.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/firebase";
// import { motion } from "motion/react";
// import {
//   GraduationCap,
//   BookOpen,
//   CalendarDays,
//   Check,
//   Plus,
//   X,
//   // ArrowLeft,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";

// const OL_GROUPS = {
//   "Group 01": ["Commerce", "Geography", "Civil Technology"],
//   "Group 02": ["Music", "Drama", "Dancing", "English Literature"],
//   "Group 03": ["ICT", "Technology", "Health"],
// };

// const AL_STREAMS = {
//   Maths: ["Combined Maths", "Physics", "Chemistry"],
//   Bio: ["Biology", "Physics", "Chemistry"],
//   Tech: ["Engineering Technology", "Science for Technology", "ICT"],
//   Commerce: ["Business Studies", "Accounting", "Economics"],
//   Arts: ["Sinhala", "Geography", "Political Science"],
// };

// const Onboarding = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const [level, setLevel] = useState(""); // "OL" | "AL"
//   const [olGroup, setOlGroup] = useState("");
//   const [alStream, setAlStream] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [customSubject, setCustomSubject] = useState("");
//   const [examDate, setExamDate] = useState("");

//   const [isExisting, setIsExisting] = useState(false);

//   // ---------------- Auth + load existing profile ----------------
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         try {
//           const snapshot = await getDoc(doc(db, "users", currentUser.uid));
//           const data = snapshot.exists() ? snapshot.data() : {};

//           const hasProfile =
//             data.profile?.level && data.profile?.subjects?.length > 0;

//           if (hasProfile) {
//             setIsExisting(true);
//             setLevel(data.profile.level);
//             setOlGroup(data.profile.olGroup || "");
//             setAlStream(data.profile.alStream || "");
//             setSubjects(data.profile.subjects || []);
//             setExamDate(data.profile.examDate || "");
//           }
//         } catch (err) {
//           console.error("Failed to load profile:", err);
//         }
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // ---------------- Subject toggle ----------------
//   const toggleSubject = (subject) => {
//     setSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject],
//     );
//   };

//   const addCustomSubject = () => {
//     const value = customSubject.trim();
//     if (!value || subjects.includes(value)) return;
//     setSubjects((prev) => [...prev, value]);
//     setCustomSubject("");
//   };

//   // ---------------- Save ----------------
//   const handleSave = async () => {
//     if (!level) {
//       setError("Please select O/L or A/L.");
//       return;
//     }
//     if (subjects.length === 0) {
//       setError("Please select at least one subject.");
//       return;
//     }

//     setError("");
//     setSaving(true);

//     try {
//       await setDoc(
//         doc(db, "users", user.uid),
//         {
//           profile: {
//             level,
//             olGroup: level === "OL" ? olGroup : "",
//             alStream: level === "AL" ? alStream : "",
//             subjects,
//             examDate: examDate || "",
//           },
//         },
//         { merge: true },
//       );

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
//         <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
//       </div>
//     );
//   }

//   const presetSubjects =
//     level === "OL"
//       ? Object.values(OL_GROUPS).flat()
//       : level === "AL"
//         ? AL_STREAMS[alStream] || []
//         : [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
//             <Sparkles size={20} className="text-emerald-950" />
//           </div>
//           <div>
//             <h1 className="font-heading text-xl font-bold">
//               {isExisting ? "Update your profile" : "Set up your profile"}
//             </h1>
//             <p className="font-body text-xs text-white/50">
//               {isExisting
//                 ? "Update your exam details anytime."
//                 : "Tell us about your studies to personalize DreamUTrack."}
//             </p>
//           </div>
//         </div>

//         {/* Level */}
//         <div className="mb-6">
//           <label className="font-body block text-sm text-white/70 mb-2">
//             <GraduationCap size={14} className="inline mr-1.5 -mt-0.5" />
//             Select your level
//           </label>
//           <div className="grid grid-cols-2 gap-3">
//             {[
//               { value: "OL", label: "O/L" },
//               { value: "AL", label: "A/L" },
//             ].map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   setLevel(option.value);
//                   setOlGroup("");
//                   setAlStream("");
//                   setSubjects([]);
//                 }}
//                 className={`rounded-xl border py-3 font-body text-sm font-medium transition ${
//                   level === option.value
//                     ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
//                     : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
//                 }`}>
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* O/L group */}
//         {level === "OL" && (
//           <div className="mb-6">
//             <label className="font-body block text-sm text-white/70 mb-2">
//               Select your subject group
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {Object.keys(OL_GROUPS).map((group) => (
//                 <button
//                   key={group}
//                   type="button"
//                   onClick={() => {
//                     setOlGroup(group);
//                     setSubjects([]);
//                   }}
//                   className={`rounded-xl border py-3 px-3 font-body text-sm transition ${
//                     olGroup === group
//                       ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
//                       : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
//                   }`}>
//                   {group}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* A/L stream */}
//         {level === "AL" && (
//           <div className="mb-6">
//             <label className="font-body block text-sm text-white/70 mb-2">
//               Select your stream
//             </label>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
//               {Object.keys(AL_STREAMS).map((stream) => (
//                 <button
//                   key={stream}
//                   type="button"
//                   onClick={() => {
//                     setAlStream(stream);
//                     setSubjects([]);
//                   }}
//                   className={`rounded-xl border py-2.5 font-body text-sm transition ${
//                     alStream === stream
//                       ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
//                       : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
//                   }`}>
//                   {stream}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Subjects */}
//         {(level === "OL" && olGroup) || (level === "AL" && alStream) ? (
//           <div className="mb-6">
//             <label className="font-body block text-sm text-white/70 mb-2">
//               <BookOpen size={14} className="inline mr-1.5 -mt-0.5" />
//               Select your subjects
//             </label>

//             <div className="flex flex-wrap gap-2 mb-3">
//               {presetSubjects.map((subject) => (
//                 <button
//                   key={subject}
//                   type="button"
//                   onClick={() => toggleSubject(subject)}
//                   className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-xs transition ${
//                     subjects.includes(subject)
//                       ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
//                       : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
//                   }`}>
//                   {subjects.includes(subject) && <Check size={12} />}
//                   {subject}
//                 </button>
//               ))}
//             </div>

//             {/* Custom subject */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={customSubject}
//                 onChange={(e) => setCustomSubject(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     addCustomSubject();
//                   }
//                 }}
//                 placeholder="Add a custom subject"
//                 className="font-body flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-400/70 transition"
//               />
//               <button
//                 type="button"
//                 onClick={addCustomSubject}
//                 aria-label="Add subject"
//                 className="w-11 rounded-xl bg-emerald-400/15 text-emerald-300 flex items-center justify-center hover:bg-emerald-400/25 transition">
//                 <Plus size={18} />
//               </button>
//             </div>

//             {/* Selected custom subjects */}
//             {subjects.filter((s) => !presetSubjects.includes(s)).length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {subjects
//                   .filter((s) => !presetSubjects.includes(s))
//                   .map((subject) => (
//                     <span
//                       key={subject}
//                       className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 font-body text-xs text-emerald-300">
//                       {subject}
//                       <button
//                         type="button"
//                         onClick={() => toggleSubject(subject)}
//                         aria-label={`Remove ${subject}`}
//                         className="text-emerald-300/60 hover:text-emerald-200">
//                         <X size={12} />
//                       </button>
//                     </span>
//                   ))}
//               </div>
//             )}
//           </div>
//         ) : null}

//         {/* Exam date */}
//         <div className="mb-6">
//           <label
//             htmlFor="examDate"
//             className="font-body block text-sm text-white/70 mb-2">
//             <CalendarDays size={14} className="inline mr-1.5 -mt-0.5" />
//             Exam date (optional)
//           </label>
//           <input
//             id="examDate"
//             type="date"
//             value={examDate}
//             onChange={(e) => setExamDate(e.target.value)}
//             className="font-body w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white outline-none focus:border-emerald-400/70 transition"
//           />
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300 mb-4">
//             {error}
//           </div>
//         )}

//         {/* Save */}
//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={saving}
//           className="font-body w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition disabled:opacity-60">
//           {saving ? (
//             <div className="w-4 h-4 rounded-full border-2 border-emerald-950/30 border-t-emerald-950 animate-spin" />
//           ) : (
//             <ArrowRight size={18} />
//           )}
//           {saving
//             ? "Saving..."
//             : isExisting
//               ? "Update profile"
//               : "Continue to Dashboard"}
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Onboarding;

// src/pages/Onboarding.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { motion } from "motion/react";
import {
  GraduationCap,
  // BookOpen,
  CalendarDays,
  Check,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

// ---------------- O/L data ----------------
const OL_MAIN_SUBJECTS = [
  "Sinhala",
  "Mathematics",
  "Science",
  "English",
  "History",
  "Religion",
];

const OL_OPTIONAL_GROUPS = {
  "Group 01": ["Commerce", "Geography", "Civil Technology", "Agriculture"],
  "Group 02": [
    "Music",
    "Drama",
    "Dancing",
    "Sinhala Literature",
    "English Literature",
  ],
  "Group 03": ["ICT", "Technology", "Health", "Home Economics"],
};

// ---------------- A/L data ----------------
const AL_STREAMS = {
  Maths: {
    label: "Maths",
    options: ["Combined Maths", "Physics", "Chemistry", "ICT"],
    note: "Pick any 3 subjects",
  },
  "Biological Science": {
    label: "Bio",
    options: ["Biology", "Physics", "Chemistry", "Agriculture", "ICT"],
    note: "Pick any 3 subjects",
  },
  Technology: {
    label: "Tech",
    options: [
      "Engineering Technology",
      "Science for Technology",
      "ICT",
      "Physics",
    ],
    note: "Pick any 3 subjects",
  },
  Commerce: {
    label: "Commerce",
    options: [
      "Business Studies",
      "Economics",
      "Accounting",
      "Business Statistics",
    ],
    note: "Pick any 3 subjects",
  },
  Arts: {
    label: "Arts",
    options: ["Sinhala", "Political Science", "Geography", "History", "Logic"],
    note: "Pick any 3 subjects",
  },
};

const Onboarding = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [level, setLevel] = useState(""); // "OL" | "AL"
  const [olOptional, setOlOptional] = useState({
    "Group 01": "",
    "Group 02": "",
    "Group 03": "",
  });
  const [alStream, setAlStream] = useState("");
  const [alSubjects, setAlSubjects] = useState([]);
  const [examDate, setExamDate] = useState("");

  const [isExisting, setIsExisting] = useState(false);

  // ---------------- Auth + load existing ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const snapshot = await getDoc(doc(db, "users", currentUser.uid));
          const data = snapshot.exists() ? snapshot.data() : {};
          const profile = data.profile || {};

          const hasProfile = profile.level && profile.subjects?.length > 0;

          if (hasProfile) {
            setIsExisting(true);
            setLevel(profile.level);
            setExamDate(profile.examDate || "");

            if (profile.level === "OL") {
              // Restore optional picks from saved subjects
              const saved = profile.subjects || [];
              const optional = saved.filter(
                (s) => !OL_MAIN_SUBJECTS.includes(s),
              );
              setOlOptional({
                "Group 01": optional[0] || "",
                "Group 02": optional[1] || "",
                "Group 03": optional[2] || "",
              });
            } else if (profile.level === "AL") {
              setAlStream(profile.alStream || "");
              setAlSubjects(
                (profile.subjects || []).filter(
                  (s) => s !== "English" && s !== "Common General",
                ),
              );
            }
          }
        } catch (err) {
          console.error("Failed to load profile:", err);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- O/L optional toggle ----------------
  const handleOlOptional = (groupName, subject) => {
    setOlOptional((prev) => ({
      ...prev,
      [groupName]: prev[groupName] === subject ? "" : subject,
    }));
  };

  // ---------------- A/L subject toggle ----------------
  const handleAlSubject = (subject) => {
    setAlSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      }
      if (prev.length >= 3) return prev; // max 3
      return [...prev, subject];
    });
  };

  // ---------------- Validation ----------------
  const getValidation = () => {
    if (!level) return "Please select O/L or A/L.";

    if (level === "OL") {
      const selected = Object.values(olOptional);
      if (selected.some((s) => !s)) {
        return "Please select 1 subject from each group (3 total).";
      }
    }

    if (level === "AL") {
      if (!alStream) return "Please select your A/L stream.";
      if (alSubjects.length !== 3) {
        return "Please select exactly 3 main subjects.";
      }
    }

    return null;
  };

  // ---------------- Save ----------------
  const handleSave = async () => {
    const problem = getValidation();
    if (problem) {
      setError(problem);
      return;
    }

    setError("");
    setSaving(true);

    try {
      let subjects = [];
      let olGroup = "";
      let stream = "";

      if (level === "OL") {
        subjects = [
          ...OL_MAIN_SUBJECTS,
          olOptional["Group 01"],
          olOptional["Group 02"],
          olOptional["Group 03"],
        ];
        olGroup = "Custom";
      } else {
        subjects = [...alSubjects, "English", "Common General"];
        stream = alStream;
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          profile: {
            level,
            olGroup,
            alStream: stream,
            subjects,
            examDate: examDate || "",
          },
        },
        { merge: true },
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
      </div>
    );
  }

  const olSelectedCount = Object.values(olOptional).filter((s) => s).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <Sparkles size={20} className="text-emerald-950" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold">
              {isExisting ? "Update your profile" : "Set up your profile"}
            </h1>
            <p className="font-body text-xs text-white/50">
              {isExisting
                ? "Update your subjects and exam details anytime."
                : "Tell us about your studies to personalize DreamUTrack."}
            </p>
          </div>
        </div>

        {/* Level */}
        <div className="mb-6">
          <label className="font-body block text-sm text-white/70 mb-2">
            <GraduationCap size={14} className="inline mr-1.5 -mt-0.5" />
            Select your level
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "OL", label: "O/L" },
              { value: "AL", label: "A/L" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLevel(option.value);
                  setOlOptional({
                    "Group 01": "",
                    "Group 02": "",
                    "Group 03": "",
                  });
                  setAlStream("");
                  setAlSubjects([]);
                }}
                className={`rounded-xl border py-3 font-body text-sm font-medium transition ${
                  level === option.value
                    ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* O/L — main + optional */}
        {level === "OL" && (
          <>
            {/* Main subjects — auto */}
            <div className="mb-6">
              <label className="font-body block text-sm text-white/70 mb-2">
                Main subjects (automatic)
              </label>
              <div className="flex flex-wrap gap-2">
                {OL_MAIN_SUBJECTS.map((subject) => (
                  <span
                    key={subject}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 font-body text-xs text-emerald-300">
                    <Check size={12} />
                    {subject}
                  </span>
                ))}
              </div>
              <p className="font-body text-[11px] text-white/30 mt-2">
                These 6 subjects are included automatically.
              </p>
            </div>

            {/* Optional — 1 from each group */}
            <div className="mb-6">
              <label className="font-body block text-sm text-white/70 mb-2">
                Select 1 subject from each group ({olSelectedCount}/3)
              </label>

              {Object.entries(OL_OPTIONAL_GROUPS).map(
                ([groupName, options]) => (
                  <div key={groupName} className="mb-4">
                    <p className="font-body text-xs text-white/40 mb-2">
                      {groupName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleOlOptional(groupName, subject)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-xs transition ${
                            olOptional[groupName] === subject
                              ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                          }`}>
                          {olOptional[groupName] === subject && (
                            <Check size={12} />
                          )}
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {/* A/L — stream + 3 subjects */}
        {level === "AL" && (
          <>
            {/* Stream */}
            <div className="mb-6">
              <label className="font-body block text-sm text-white/70 mb-2">
                Select your stream
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(AL_STREAMS).map(([key, stream]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setAlStream(key);
                      setAlSubjects([]);
                    }}
                    className={`rounded-xl border py-2.5 font-body text-sm transition ${
                      alStream === key
                        ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                        : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}>
                    {stream.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 subjects */}
            {alStream && (
              <div className="mb-6">
                <label className="font-body block text-sm text-white/70 mb-2">
                  Select 3 main subjects ({alSubjects.length}/3)
                </label>
                <p className="font-body text-[11px] text-white/30 mb-3">
                  {AL_STREAMS[alStream].note}
                </p>

                <div className="flex flex-wrap gap-2">
                  {AL_STREAMS[alStream].options.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleAlSubject(subject)}
                      disabled={
                        !alSubjects.includes(subject) && alSubjects.length >= 3
                      }
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-xs transition ${
                        alSubjects.includes(subject)
                          ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-40"
                      }`}>
                      {alSubjects.includes(subject) && <Check size={12} />}
                      {subject}
                    </button>
                  ))}
                </div>

                {/* Common subjects — auto */}
                <p className="font-body text-[11px] text-white/30 mt-3">
                  English + Common General are added automatically (minor
                  focus).
                </p>
              </div>
            )}
          </>
        )}

        {/* Exam date */}
        <div className="mb-6">
          <label
            htmlFor="examDate"
            className="font-body block text-sm text-white/70 mb-2">
            <CalendarDays size={14} className="inline mr-1.5 -mt-0.5" />
            Exam date (optional)
          </label>
          <input
            id="examDate"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="font-body w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm text-white outline-none focus:border-emerald-400/70 transition"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300 mb-4">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="font-body w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition disabled:opacity-60">
          {saving ? (
            <div className="w-4 h-4 rounded-full border-2 border-emerald-950/30 border-t-emerald-950 animate-spin" />
          ) : (
            <ArrowRight size={18} />
          )}
          {saving
            ? "Saving..."
            : isExisting
              ? "Update profile"
              : "Continue to Dashboard"}
        </button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
