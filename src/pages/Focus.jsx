// import { useState, useEffect, useMemo, useRef } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Play,
//   Pause,
//   RotateCcw,
//   Check,
//   Timer,
//   Flame,
//   Volume2,
//   VolumeX,
//   TreePine,
//   Sprout,
//   Flower2,
// } from "lucide-react";

// const FOCUS_DURATION = 1500; // 25 minutes in seconds

// const Focus = () => {
//   // ---------------- Timer state ----------------
//   const [seconds, setSeconds] = useState(FOCUS_DURATION);
//   const [isActive, setIsActive] = useState(false);
//   const [isOvertime, setIsOvertime] = useState(false);

//   // ---------------- Subject / task ----------------
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState("");

//   // ---------------- Music ----------------
//   const [musicOn, setMusicOn] = useState(false);
//   const bgMusicRef = useRef(null);

//   // ---------------- Load subjects from setup ----------------
//   //   useEffect(() => {
//   //     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//   //     if (setup?.subjects) {
//   //       setSubjects(setup.subjects);
//   //     }
//   //   }, []);

//   // ---------------- Subject / task ----------------
//   // ❌ මේ දෙක අයින් කරන්න
//   // const [subjects, setSubjects] = useState([]);
//   // const [tasks, setTasks] = useState([]);

//   // ✅ මේ දෙක දාන්න
//   const subjects = useMemo(() => {
//     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//     return setup?.subjects || [];
//   }, []);

//   const tasks = useMemo(() => {
//     const schedule = JSON.parse(
//       localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//     );

//     const allTasks = [];

//     Object.values(schedule).forEach((week) => {
//       if (typeof week !== "object" || week === null) return;

//       Object.values(week).forEach((day) => {
//         if (!day || !Array.isArray(day.tasks)) return;

//         day.tasks.forEach((task) => {
//           if (task.text?.trim()) {
//             allTasks.push(task);
//           }
//         });
//       });
//     });

//     return allTasks;
//   }, []);

//   // ---------------- Load tasks from timetable ----------------
//   //   useEffect(() => {
//   //     const schedule = JSON.parse(
//   //       localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//   //     );

//   //     const todayKey = new Date().toISOString().split("T")[0];
//   //     const allTasks = [];

//   //     Object.values(schedule).forEach((week) => {
//   //       if (typeof week !== "object" || week === null) return;

//   //       Object.values(week).forEach((day) => {
//   //         if (!day || !Array.isArray(day.tasks)) return;

//   //         day.tasks.forEach((task) => {
//   //           if (task.text?.trim()) {
//   //             allTasks.push(task);
//   //           }
//   //         });
//   //       });
//   //     });

//   //     setTasks(allTasks);
//   //   }, []);
//   // ✅ නිවැරදියි
//   const tasks2 = useMemo(() => {
//     const schedule = JSON.parse(
//       localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//     );

//     const allTasks = [];

//     Object.values(schedule).forEach((week) => {
//       if (typeof week !== "object" || week === null) return;

//       Object.values(week).forEach((day) => {
//         if (!day || !Array.isArray(day.tasks)) return;

//         day.tasks.forEach((task) => {
//           if (task.text?.trim()) {
//             allTasks.push(task);
//           }
//         });
//       });
//     });

//     return allTasks;
//   }, []);

//   // ---------------- Timer logic ----------------
//   useEffect(() => {
//     let interval = null;

//     if (isActive) {
//       interval = setInterval(() => {
//         if (!isOvertime) {
//           if (seconds > 0) {
//             setSeconds((s) => s - 1);
//           } else {
//             setIsOvertime(true);
//           }
//         } else {
//           setSeconds((s) => s + 1);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds, isOvertime]);

//   // ---------------- Music logic ----------------
//   useEffect(() => {
//     if (musicOn && isActive && !isOvertime) {
//       if (!bgMusicRef.current) {
//         bgMusicRef.current = new Audio("/bg-music.wav");
//         bgMusicRef.current.loop = true;
//         bgMusicRef.current.volume = 0.9;
//         bgMusicRef.current.play().catch(() => {});
//       }
//     } else {
//       if (bgMusicRef.current) {
//         bgMusicRef.current.pause();
//         bgMusicRef.current = null;
//       }
//     }

//     return () => {
//       if (bgMusicRef.current) {
//         bgMusicRef.current.pause();
//         bgMusicRef.current = null;
//       }
//     };
//   }, [musicOn, isActive, isOvertime]);

//   // ---------------- Session history ----------------
//   const [history, setHistory] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-focus-history");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Save history ----------------
//   useEffect(() => {
//     localStorage.setItem("dreamutrack-focus-history", JSON.stringify(history));
//   }, [history]);

//   // ---------------- Streak calculation ----------------
//   const streak = useMemo(() => {
//     const dates = new Set(
//       history.map((h) => new Date(h.completedAt).toDateString()),
//     );

//     let count = 0;
//     const d = new Date();

//     while (dates.has(d.toDateString())) {
//       count++;
//       d.setDate(d.getDate() - 1);
//     }

//     return count;
//   }, [history]);

//   // ---------------- Weekly focus chart ----------------
//   const weeklyFocus = useMemo(() => {
//     const last7Days = {};

//     for (let i = 0; i < 7; i++) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       last7Days[d.toLocaleDateString()] = 0;
//     }

//     history.forEach((session) => {
//       if (last7Days[session.date] !== undefined) {
//         last7Days[session.date] += session.duration;
//       }
//     });

//     return Object.entries(last7Days).reverse();
//   }, [history]);

//   // ---------------- Today's sessions ----------------
//   const todaySessions = useMemo(() => {
//     const today = new Date().toLocaleDateString();
//     return history.filter((h) => h.date === today);
//   }, [history]);

//   const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

//   const weekMinutes = weeklyFocus.reduce((sum, [, mins]) => sum + mins, 0);

//   // ---------------- Complete session ----------------
//   const completeSession = () => {
//     const duration = isOvertime
//       ? 25 + Math.floor(seconds / 60)
//       : 25 - Math.ceil(seconds / 60);

//     const newSession = {
//       date: new Date().toLocaleDateString(),
//       subject: selectedSubject || "General",
//       task: selectedTask || "Focus session",
//       duration,
//       completedAt: new Date().toISOString(),
//     };

//     setHistory((prev) => [...prev, newSession]);

//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(FOCUS_DURATION);
//     setMusicOn(false);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(FOCUS_DURATION);
//     setMusicOn(false);
//   };

//   const formatTime = (s) =>
//     `${Math.floor(s / 60)
//       .toString()
//       .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

//   // ---------------- Forest stage ----------------
//   const getForestStage = () => {
//     const elapsed = FOCUS_DURATION - seconds;

//     if (isOvertime || elapsed > 1200) {
//       return "grown";
//     } else if (elapsed > 600) {
//       return "growing";
//     } else {
//       return "seed";
//     }
//   };

//   const forestStage = getForestStage();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <Timer size={24} className="text-indigo-300" />
//             Focus Session
//           </h1>
//           <p className="text-sm text-white/60 mt-1">
//             Stay focused with 25-minute Pomodoro sessions.
//           </p>
//         </div>

//         {/* Main focus card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 mb-6">
//           {/* Timer display */}
//           <div className="text-center mb-8">
//             {isOvertime && (
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="inline-block rounded-full bg-red-500/20 border border-red-400/30 px-4 py-1 text-xs font-semibold text-red-300 mb-3">
//                 OVERTIME
//               </motion.span>
//             )}

//             <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight">
//               {formatTime(seconds)}
//             </div>

//             <p className="text-sm text-white/50 mt-2">
//               {isOvertime
//                 ? "Great focus! Keep going."
//                 : "Stay focused, avoid distractions."}
//             </p>
//           </div>

//           {/* Forest visual */}
//           <div className="flex items-center justify-center py-6 mb-6">
//             <AnimatePresence mode="wait">
//               {forestStage === "seed" && (
//                 <motion.div
//                   key="seed"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <Sprout size={64} className="text-emerald-300" />
//                 </motion.div>
//               )}
//               {forestStage === "growing" && (
//                 <motion.div
//                   key="growing"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <Flower2 size={72} className="text-emerald-300" />
//                 </motion.div>
//               )}
//               {forestStage === "grown" && (
//                 <motion.div
//                   key="grown"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <TreePine size={80} className="text-emerald-400" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Subject / task select */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm text-white/70 mb-2">
//                 Subject
//               </label>
//               <select
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//                 <option value="">Select subject</option>
//                 {subjects.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm text-white/70 mb-2">Task</label>
//               <select
//                 value={selectedTask}
//                 onChange={(e) => setSelectedTask(e.target.value)}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//                 <option value="">Select task</option>
//                 {tasks.map((t) => (
//                   <option key={t.id} value={t.text}>
//                     {t.text}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-wrap items-center justify-center gap-3">
//             <button
//               onClick={() => setIsActive(!isActive)}
//               className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold hover:opacity-90 transition">
//               {isActive ? <Pause size={18} /> : <Play size={18} />}
//               {isActive ? "Pause" : "Start"}
//             </button>

//             <button
//               onClick={resetTimer}
//               className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
//               <RotateCcw size={18} />
//               Reset
//             </button>

//             <button
//               onClick={() => setMusicOn(!musicOn)}
//               className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
//               {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
//               {musicOn ? "Music On" : "Music Off"}
//             </button>

//             {(isActive || isOvertime) && (
//               <button
//                 onClick={completeSession}
//                 className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-600 transition">
//                 <Check size={18} />
//                 Complete
//               </button>
//             )}
//           </div>
//         </motion.div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {/* Today */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">Today</div>
//             <div className="text-3xl font-bold">{todayMinutes}m</div>
//             <p className="text-xs text-white/40 mt-1">
//               {todaySessions.length} sessions
//             </p>
//           </motion.div>

//           {/* This week */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">This week</div>
//             <div className="text-3xl font-bold">
//               {Math.floor(weekMinutes / 60)}h {weekMinutes % 60}m
//             </div>
//             <p className="text-xs text-white/40 mt-1">Total focus time</p>
//           </motion.div>

//           {/* Streak */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">Streak</div>
//             <div className="text-3xl font-bold flex items-center gap-2">
//               {streak}
//               <Flame size={24} className="text-orange-400" />
//             </div>
//             <p className="text-xs text-white/40 mt-1">Consecutive days</p>
//           </motion.div>
//         </div>

//         {/* Weekly chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
//           <h3 className="font-semibold mb-4">Weekly Focus</h3>

//           <div className="flex items-end justify-between gap-2 h-40">
//             {weeklyFocus.map(([date, mins], i) => {
//               const maxMins = Math.max(...weeklyFocus.map(([, m]) => m), 1);
//               const height = (mins / maxMins) * 100;

//               return (
//                 <div
//                   key={i}
//                   className="flex-1 flex flex-col items-center gap-2">
//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: `${height}%` }}
//                     transition={{ delay: i * 0.05, duration: 0.5 }}
//                     className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 min-h-[4px]"
//                   />
//                   <span className="text-[10px] text-white/40">
//                     {date.split("/")[1]}/{date.split("/")[0]}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Session history */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <h3 className="font-semibold mb-4">Today’s Sessions</h3>

//           {todaySessions.length === 0 ? (
//             <p className="text-sm text-white/40">
//               No sessions yet today. Start your first focus session!
//             </p>
//           ) : (
//             <div className="space-y-2">
//               <AnimatePresence>
//                 {todaySessions.map((session, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
//                     <div>
//                       <p className="text-sm font-medium">{session.subject}</p>
//                       <p className="text-xs text-white/40">{session.task}</p>
//                     </div>
//                     <span className="text-sm font-semibold text-indigo-300">
//                       {session.duration}m
//                     </span>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Focus;

// import { useState, useEffect, useMemo, useRef } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Play,
//   Pause,
//   RotateCcw,
//   Check,
//   Timer,
//   Flame,
//   Volume2,
//   VolumeX,
//   TreePine,
//   Sprout,
//   Flower2,
// } from "lucide-react";

// const FOCUS_DURATION = 1500; // 25 minutes in seconds

// const Focus = () => {
//   // ---------------- Timer state ----------------
//   const [seconds, setSeconds] = useState(FOCUS_DURATION);
//   const [isActive, setIsActive] = useState(false);
//   const [isOvertime, setIsOvertime] = useState(false);

//   // ---------------- Subject / task selection ----------------
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTask, setSelectedTask] = useState("");

//   // ---------------- Music ----------------
//   const [musicOn, setMusicOn] = useState(false);
//   const bgMusicRef = useRef(null);

//   // ---------------- Subjects (derived from localStorage) ----------------
//   const subjects = useMemo(() => {
//     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//     return setup?.subjects || [];
//   }, []);

//   // ---------------- Tasks (derived from timetable) ----------------
//   const tasks = useMemo(() => {
//     const schedule = JSON.parse(
//       localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//     );

//     const allTasks = [];

//     Object.values(schedule).forEach((week) => {
//       if (typeof week !== "object" || week === null) return;

//       Object.values(week).forEach((day) => {
//         if (!day || !Array.isArray(day.tasks)) return;

//         day.tasks.forEach((task) => {
//           if (task.text?.trim()) {
//             allTasks.push(task);
//           }
//         });
//       });
//     });

//     return allTasks;
//   }, []);

//   // ---------------- Timer logic ----------------
//   useEffect(() => {
//     let interval = null;

//     if (isActive) {
//       interval = setInterval(() => {
//         if (!isOvertime) {
//           if (seconds > 0) {
//             setSeconds((s) => s - 1);
//           } else {
//             setIsOvertime(true);
//           }
//         } else {
//           setSeconds((s) => s + 1);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds, isOvertime]);

//   // ---------------- Music logic ----------------
//   useEffect(() => {
//     if (musicOn && isActive && !isOvertime) {
//       if (!bgMusicRef.current) {
//         bgMusicRef.current = new Audio("/bg-music.wav");
//         bgMusicRef.current.loop = true;
//         bgMusicRef.current.volume = 0.3;
//         bgMusicRef.current.play().catch(() => {});
//       }
//     } else {
//       if (bgMusicRef.current) {
//         bgMusicRef.current.pause();
//         bgMusicRef.current = null;
//       }
//     }

//     return () => {
//       if (bgMusicRef.current) {
//         bgMusicRef.current.pause();
//         bgMusicRef.current = null;
//       }
//     };
//   }, [musicOn, isActive, isOvertime]);

//   // ---------------- Session history ----------------
//   const [history, setHistory] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-focus-history");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Save history ----------------
//   useEffect(() => {
//     localStorage.setItem("dreamutrack-focus-history", JSON.stringify(history));
//   }, [history]);

//   // ---------------- Streak calculation ----------------
//   const streak = useMemo(() => {
//     const dates = new Set(
//       history.map((h) => new Date(h.completedAt).toDateString()),
//     );

//     let count = 0;
//     const d = new Date();

//     while (dates.has(d.toDateString())) {
//       count++;
//       d.setDate(d.getDate() - 1);
//     }

//     return count;
//   }, [history]);

//   // ---------------- Weekly focus chart ----------------
//   const weeklyFocus = useMemo(() => {
//     const last7Days = {};

//     for (let i = 0; i < 7; i++) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       last7Days[d.toLocaleDateString()] = 0;
//     }

//     history.forEach((session) => {
//       if (last7Days[session.date] !== undefined) {
//         last7Days[session.date] += session.duration;
//       }
//     });

//     return Object.entries(last7Days).reverse();
//   }, [history]);

//   // ---------------- Today's sessions ----------------
//   const todaySessions = useMemo(() => {
//     const today = new Date().toLocaleDateString();
//     return history.filter((h) => h.date === today);
//   }, [history]);

//   const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

//   const weekMinutes = weeklyFocus.reduce((sum, [, mins]) => sum + mins, 0);

//   // ---------------- Complete session ----------------
//   const completeSession = () => {
//     const duration = isOvertime
//       ? 25 + Math.floor(seconds / 60)
//       : 25 - Math.ceil(seconds / 60);

//     const newSession = {
//       date: new Date().toLocaleDateString(),
//       subject: selectedSubject || "General",
//       task: selectedTask || "Focus session",
//       duration,
//       completedAt: new Date().toISOString(),
//     };

//     setHistory((prev) => [...prev, newSession]);

//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(FOCUS_DURATION);
//     setMusicOn(false);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(FOCUS_DURATION);
//     setMusicOn(false);
//   };

//   const formatTime = (s) =>
//     `${Math.floor(s / 60)
//       .toString()
//       .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

//   // ---------------- Forest stage ----------------
//   const getForestStage = () => {
//     const elapsed = FOCUS_DURATION - seconds;

//     if (isOvertime || elapsed > 1200) {
//       return "grown";
//     } else if (elapsed > 600) {
//       return "growing";
//     } else {
//       return "seed";
//     }
//   };

//   const forestStage = getForestStage();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <Timer size={24} className="text-indigo-300" />
//             Focus Session
//           </h1>
//           <p className="text-sm text-white/60 mt-1">
//             Stay focused with 25-minute Pomodoro sessions.
//           </p>
//         </div>

//         {/* Main focus card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 mb-6">
//           {/* Timer display */}
//           <div className="text-center mb-8">
//             {isOvertime && (
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="inline-block rounded-full bg-red-500/20 border border-red-400/30 px-4 py-1 text-xs font-semibold text-red-300 mb-3">
//                 OVERTIME
//               </motion.span>
//             )}

//             <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight">
//               {formatTime(seconds)}
//             </div>

//             <p className="text-sm text-white/50 mt-2">
//               {isOvertime
//                 ? "Great focus! Keep going."
//                 : "Stay focused, avoid distractions."}
//             </p>
//           </div>

//           {/* Forest visual */}
//           <div className="flex items-center justify-center py-6 mb-6">
//             <AnimatePresence mode="wait">
//               {forestStage === "seed" && (
//                 <motion.div
//                   key="seed"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <Sprout size={64} className="text-emerald-300" />
//                 </motion.div>
//               )}
//               {forestStage === "growing" && (
//                 <motion.div
//                   key="growing"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <Flower2 size={72} className="text-emerald-300" />
//                 </motion.div>
//               )}
//               {forestStage === "grown" && (
//                 <motion.div
//                   key="grown"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}>
//                   <TreePine size={80} className="text-emerald-400" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Subject / task select */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm text-white/70 mb-2">
//                 Subject
//               </label>
//               <select
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//                 <option value="">Select subject</option>
//                 {subjects.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm text-white/70 mb-2">Task</label>
//               <select
//                 value={selectedTask}
//                 onChange={(e) => setSelectedTask(e.target.value)}
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//                 <option value="">Select task</option>
//                 {tasks.map((t) => (
//                   <option key={t.id} value={t.text}>
//                     {t.text}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-wrap items-center justify-center gap-3">
//             <button
//               onClick={() => setIsActive(!isActive)}
//               className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold hover:opacity-90 transition">
//               {isActive ? <Pause size={18} /> : <Play size={18} />}
//               {isActive ? "Pause" : "Start"}
//             </button>

//             <button
//               onClick={resetTimer}
//               className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
//               <RotateCcw size={18} />
//               Reset
//             </button>

//             <button
//               onClick={() => setMusicOn(!musicOn)}
//               className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
//               {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
//               {musicOn ? "Music On" : "Music Off"}
//             </button>

//             {(isActive || isOvertime) && (
//               <button
//                 onClick={completeSession}
//                 className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-600 transition">
//                 <Check size={18} />
//                 Complete
//               </button>
//             )}
//           </div>
//         </motion.div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {/* Today */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">Today</div>
//             <div className="text-3xl font-bold">{todayMinutes}m</div>
//             <p className="text-xs text-white/40 mt-1">
//               {todaySessions.length} sessions
//             </p>
//           </motion.div>

//           {/* This week */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">This week</div>
//             <div className="text-3xl font-bold">
//               {Math.floor(weekMinutes / 60)}h {weekMinutes % 60}m
//             </div>
//             <p className="text-xs text-white/40 mt-1">Total focus time</p>
//           </motion.div>

//           {/* Streak */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="text-sm text-white/50 mb-1">Streak</div>
//             <div className="text-3xl font-bold flex items-center gap-2">
//               {streak}
//               <Flame size={24} className="text-orange-400" />
//             </div>
//             <p className="text-xs text-white/40 mt-1">Consecutive days</p>
//           </motion.div>
//         </div>

//         {/* Weekly chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
//           <h3 className="font-semibold mb-4">Weekly Focus</h3>

//           <div className="flex items-end justify-between gap-2 h-40">
//             {weeklyFocus.map(([date, mins], i) => {
//               const maxMins = Math.max(...weeklyFocus.map(([, m]) => m), 1);
//               const height = (mins / maxMins) * 100;

//               return (
//                 <div
//                   key={i}
//                   className="flex-1 flex flex-col items-center gap-2">
//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: `${height}%` }}
//                     transition={{ delay: i * 0.05, duration: 0.5 }}
//                     className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 min-h-[4px]"
//                   />
//                   <span className="text-[10px] text-white/40">
//                     {date.split("/")[1]}/{date.split("/")[0]}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Session history */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <h3 className="font-semibold mb-4">Today’s Sessions</h3>

//           {todaySessions.length === 0 ? (
//             <p className="text-sm text-white/40">
//               No sessions yet today. Start your first focus session!
//             </p>
//           ) : (
//             <div className="space-y-2">
//               <AnimatePresence>
//                 {todaySessions.map((session, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
//                     <div>
//                       <p className="text-sm font-medium">{session.subject}</p>
//                       <p className="text-xs text-white/40">{session.task}</p>
//                     </div>
//                     <span className="text-sm font-semibold text-indigo-300">
//                       {session.duration}m
//                     </span>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Focus;

// src/pages/Focus.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { saveFocusToFirestore } from "../utils/focusStats";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Music,
  VolumeX,
  Flame,
  Timer,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FOCUS_MINUTES = 1;
const FOCUS_SECONDS = FOCUS_MINUTES * 60;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Focus = () => {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("maths");
  const [focusHistory, setFocusHistory] = useState([]);

  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [completed, setCompleted] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // ---------------- Auth + data load ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        const setup = JSON.parse(
          localStorage.getItem(`dreamutrack-setup-${uid}`) || "{}",
        );
        setSubjects(setup?.subjects || []);

        const saved = localStorage.getItem(`dreamutrack-focus-history-${uid}`);
        setFocusHistory(saved ? JSON.parse(saved) : []);
      } else {
        setSubjects([]);
        setFocusHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Default subject select
  useEffect(() => {
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects, selectedSubject]);

  // ---------------- Timer ----------------
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // ---------------- Music ----------------
  useEffect(() => {
    if (!audioRef.current) return;

    if (isRunning && isMusicOn) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user must interact first
      });
    } else {
      audioRef.current.pause();
    }
  }, [isRunning, isMusicOn]);

  // ---------------- Save on complete ----------------
  useEffect(() => {
    if (!completed || !user) return;

    const saveSession = async () => {
      const minutes = FOCUS_MINUTES;
      const newSession = {
        subject: selectedSubject || "General",
        duration: minutes,
        createdAt: new Date().toISOString(),
      };

      // 1. localStorage
      const updated = [...focusHistory, newSession];
      localStorage.setItem(
        `dreamutrack-focus-history-${user.uid}`,
        JSON.stringify(updated),
      );
      setFocusHistory(updated);

      // 2. Firestore (leaderboard)
      await saveFocusToFirestore(user, minutes);

      // Stop music
      if (audioRef.current) audioRef.current.pause();
    };

    saveSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  // ---------------- Actions ----------------
  const handleStart = () => {
    if (!selectedSubject) return;
    setCompleted(false);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setCompleted(false);
    setSecondsLeft(FOCUS_SECONDS);
    if (audioRef.current) audioRef.current.pause();
  };

  // ---------------- Plant growth stage ----------------
  const progress = 1 - secondsLeft / FOCUS_SECONDS; // 0 → 1

  const getStage = () => {
    if (completed) return "flower";
    if (progress < 0.15) return "seed";
    if (progress < 0.4) return "sprout";
    if (progress < 0.7) return "stem";
    if (progress < 1) return "bud";
    return "flower";
  };

  const stage = getStage();

  // ---------------- Weekly chart data ----------------
  const weeklyData = useMemo(() => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);

      const minutes = focusHistory
        .filter((f) => (f.createdAt || "").slice(0, 10) === key)
        .reduce((sum, f) => sum + f.duration, 0);

      days.push({
        day: DAYS[d.getDay()],
        minutes,
      });
    }

    return days;
  }, [focusHistory]);

  const totalWeekMinutes = weeklyData.reduce((s, d) => s + d.minutes, 0);

  // ---------------- Streak ----------------
  const currentStreak = useMemo(() => {
    let streak = 0;
    const d = new Date();

    for (let i = 0; i < 365; i++) {
      const key = d.toISOString().slice(0, 10);
      const hasSession = focusHistory.some(
        (f) => (f.createdAt || "").slice(0, 10) === key,
      );

      if (hasSession) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else if (i === 0) {
        // Today no session yet — check yesterday
        d.setDate(d.getDate() - 1);
        continue;
      } else {
        break;
      }
    }

    return streak;
  }, [focusHistory]);

  // ---------------- Format time ----------------
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // src/pages/Focus.jsx — timer persistence

  const TIMER_KEY = `dreamutrack-timer-${user?.uid || "guest"}`;

  // Restore on mount
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(TIMER_KEY);
    if (saved) {
      const { secondsLeft, isRunning, startedAt } = JSON.parse(saved);

      if (isRunning && startedAt) {
        // Elapsed time calculate කරලා resume
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const remaining = FOCUS_SECONDS - elapsed;

        if (remaining <= 0) {
          setSecondsLeft(0);
          setCompleted(true);
        } else {
          setSecondsLeft(remaining);
          setIsRunning(true);
        }
      } else {
        setSecondsLeft(secondsLeft);
      }
    }
  }, [user]);

  // Save on every change
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      TIMER_KEY,
      JSON.stringify({
        secondsLeft,
        isRunning,
        startedAt: isRunning
          ? Date.now() - (FOCUS_SECONDS - secondsLeft) * 1000
          : null,
      }),
    );
  }, [secondsLeft, isRunning, user]);

  // Clear on complete/reset
  useEffect(() => {
    if (completed) {
      localStorage.removeItem(TIMER_KEY);
    }
  }, [completed]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <p className="font-body text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 mt-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Timer size={24} className="text-emerald-300" />
          Focus
        </h1>
        <p className="font-body text-sm text-white/50 mt-1">
          Stay focused for 25 minutes and grow your plant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left — Timer + Plant */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6">
          {/* Subject select */}
          <label
            htmlFor="subject"
            className="font-body block text-sm text-white/60 mb-2">
            Subject
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={isRunning}
            className="font-body w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white outline-none focus:border-emerald-400/70 transition disabled:opacity-60 mb-6">
            {subjects.length === 0 && (
              <option value="">Add subjects first</option>
            )}
            {subjects.map((s) => (
              <option key={s} value={s} className="bg-[#0e1424]">
                {s}
              </option>
            ))}
          </select>

          {/* Plant + Timer */}
          <div className="flex flex-col items-center py-4">
            {/* Plant */}
            {/* <div className="h-44 w-44 flex items-end justify-center mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative">
                  {stage === "seed" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg" />
                  )}

                  {stage === "sprout" && (
                    <div className="flex flex-col items-center">
                      <div className="w-1.5 h-10 bg-emerald-500 rounded-full" />
                      <div className="flex gap-1 -mt-1">
                        <div className="w-4 h-3 bg-emerald-400 rounded-full rounded-r-none -rotate-45" />
                        <div className="w-4 h-3 bg-emerald-400 rounded-full rounded-l-none rotate-45" />
                      </div>
                    </div>
                  )}

                  {stage === "stem" && (
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-20 bg-emerald-500 rounded-full" />
                      <div className="flex gap-2 -mt-16">
                        <div className="w-6 h-4 bg-emerald-400 rounded-full rounded-r-none -rotate-45" />
                        <div className="w-6 h-4 bg-emerald-400 rounded-full rounded-l-none rotate-45" />
                      </div>
                    </div>
                  )}

                  {stage === "bud" && (
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-24 bg-emerald-500 rounded-full" />
                      <div className="flex gap-2 -mt-20">
                        <div className="w-7 h-5 bg-emerald-400 rounded-full rounded-r-none -rotate-45" />
                        <div className="w-7 h-5 bg-emerald-400 rounded-full rounded-l-none rotate-45" />
                      </div>
                      <div className="w-4 h-4 rounded-full bg-pink-400 -mt-2 shadow-lg shadow-pink-400/40" />
                    </div>
                  )}

                  {stage === "flower" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="flex flex-col items-center">
                      <div className="relative">
                        {/* Petals *
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                          <div
                            key={deg}
                            className="absolute w-5 h-8 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full"
                            style={{
                              transform: `rotate(${deg}deg) translateY(-14px)`,
                              transformOrigin: "center bottom",
                            }}
                          />
                        ))}
                        {/* Center 
                        <div className="mb-12 w-5 h-5 rounded-full bg-amber-300 relative z-10 shadow-lg shadow-amber-300/50" />
                      </div>
                      <div className="w-2 h-20 bg-emerald-500 rounded-full mt-3" />
                      <div className="flex gap-2 -mt-16">
                        <div className="w-7 h-5 bg-emerald-400 rounded-full rounded-r-none -rotate-45" />
                        <div className="w-7 h-5 bg-emerald-400 rounded-full rounded-l-none rotate-45" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
              {/* Soil *
              <div className="absolute bottom-0 w-32 h-3 rounded-full bg-gradient-to-r from-amber-900/60 to-amber-800/60" />
            </div> 

            {/* Plant — SVG */}
            <div className="h-48 w-44 flex items-end justify-center mb-4 relative">
              <svg viewBox="0 0 120 160" className="w-full h-full">
                {/* Soil */}
                <ellipse
                  className="animate-pulse"
                  cx="60"
                  cy="152"
                  rx="34"
                  ry="7"
                  fill="#3b2a1a"
                />

                {/* Stem — grows with progress */}
                <motion.path
                  d="M60 150 C 60 120, 60 100, 60 70"
                  stroke="#22c55e"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.min(progress / 0.7, 1) }}
                  transition={{ duration: 0.8 }}
                />

                {/* Leaves — appear after 40% */}
                {progress > 0.4 && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformOrigin: "60px 110px" }}>
                    <path
                      className="animate-pulse"
                      d="M60 110 C 40 105, 30 95, 32 85 C 45 88, 55 98, 60 110 Z"
                      fill="#4ade80"
                    />
                    <path
                      className="animate-pulse delay-150"
                      d="M60 110 C 80 105, 90 95, 88 85 C 75 88, 65 98, 60 110 Z"
                      fill="#4ade80"
                    />
                  </motion.g>
                )}

                {/* Flower — appears at 100% / completed */}
                {(progress >= 1 || completed) && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12 }}
                    style={{ transformOrigin: "60px 60px" }}>
                    {/* Petals */}
                    {[
                      0, 60, 120, 180, 240, 300, 330, 390, 450, 510, 570, 630,
                    ].map((deg) => (
                      <ellipse
                        className="animate-pulse"
                        key={deg}
                        cx="60"
                        cy="42"
                        rx="7"
                        ry="14"
                        fill="#f472b6"
                        transform={`rotate(${deg} 60 60)`}
                      />
                    ))}
                    {/* Center */}
                    <circle cx="60" cy="60" r="7" fill="#fbbf24" />
                  </motion.g>
                )}

                {/* Seed — visible at start */}
                {progress < 0.15 && !completed && (
                  <motion.ellipse
                    cx="60"
                    cy="148"
                    rx="6"
                    ry="8"
                    fill="#92400e"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </svg>
            </div>

            {/* Stage label */}
            <p className="font-body text-xs text-white/40 mb-3 capitalize">
              {completed
                ? "🌸 Your flower bloomed!"
                : stage === "seed"
                  ? "🌱 Seed planted"
                  : stage === "sprout"
                    ? "🌿 Sprouting..."
                    : stage === "stem"
                      ? "🌿 Growing..."
                      : "🌸 Budding..."}
            </p>

            {/* Timer */}
            <div className="font-heading text-5xl font-bold tabular-nums mb-4">
              {formatTime(secondsLeft)}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden mb-5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {!isRunning ? (
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={!selectedSubject || completed}
                  className="flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-body font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition disabled:opacity-40">
                  <Play size={18} />
                  {completed ? "Done!" : "Start"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-body font-semibold text-white hover:bg-white/15 transition">
                  <Pause size={18} />
                  Pause
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset timer"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition">
                <RotateCcw size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsMusicOn(!isMusicOn)}
                aria-label={isMusicOn ? "Mute music" : "Unmute music"}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                  isMusicOn
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-white/5 text-white/40"
                }`}>
                {isMusicOn ? <Music size={18} /> : <VolumeX size={18} />}
              </button>
            </div>
          </div>

          {/* Hidden audio */}
          <audio ref={audioRef} src="/focus-music.mp3" loop />
        </div>

        {/* Right — Stats + Weekly chart */}
        <div className="space-y-4">
          {/* Streak card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/15 to-transparent backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
              <Flame size={16} className="text-orange-400" />
              Current Streak
            </div>
            <div className="font-heading text-3xl font-bold">
              {currentStreak}
              <span className="font-body ml-2 text-sm font-medium text-white/50">
                day{currentStreak === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* Weekly chart */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold flex items-center gap-2">
                <BarChart3 size={18} className="text-emerald-300" />
                Weekly Focus
              </h3>
              <span className="font-body text-xs text-white/40">
                {Math.floor(totalWeekMinutes / 60)}h {totalWeekMinutes % 60}m
              </span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0e1424",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar
                    dataKey="minutes"
                    fill="#34d399"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Focus;
