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

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Timer,
  Flame,
  Volume2,
  VolumeX,
  TreePine,
  Sprout,
  Flower2,
} from "lucide-react";

const FOCUS_DURATION = 1500; // 25 minutes in seconds

const Focus = () => {
  // ---------------- Timer state ----------------
  const [seconds, setSeconds] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);

  // ---------------- Subject / task selection ----------------
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  // ---------------- Music ----------------
  const [musicOn, setMusicOn] = useState(false);
  const bgMusicRef = useRef(null);

  // ---------------- Subjects (derived from localStorage) ----------------
  const subjects = useMemo(() => {
    const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

    return setup?.subjects || [];
  }, []);

  // ---------------- Tasks (derived from timetable) ----------------
  const tasks = useMemo(() => {
    const schedule = JSON.parse(
      localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
    );

    const allTasks = [];

    Object.values(schedule).forEach((week) => {
      if (typeof week !== "object" || week === null) return;

      Object.values(week).forEach((day) => {
        if (!day || !Array.isArray(day.tasks)) return;

        day.tasks.forEach((task) => {
          if (task.text?.trim()) {
            allTasks.push(task);
          }
        });
      });
    });

    return allTasks;
  }, []);

  // ---------------- Timer logic ----------------
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (!isOvertime) {
          if (seconds > 0) {
            setSeconds((s) => s - 1);
          } else {
            setIsOvertime(true);
          }
        } else {
          setSeconds((s) => s + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isOvertime]);

  // ---------------- Music logic ----------------
  useEffect(() => {
    if (musicOn && isActive && !isOvertime) {
      if (!bgMusicRef.current) {
        bgMusicRef.current = new Audio("/bg-music.wav");
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.3;
        bgMusicRef.current.play().catch(() => {});
      }
    } else {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, [musicOn, isActive, isOvertime]);

  // ---------------- Session history ----------------
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("dreamutrack-focus-history");
    return saved ? JSON.parse(saved) : [];
  });

  // ---------------- Save history ----------------
  useEffect(() => {
    localStorage.setItem("dreamutrack-focus-history", JSON.stringify(history));
  }, [history]);

  // ---------------- Streak calculation ----------------
  const streak = useMemo(() => {
    const dates = new Set(
      history.map((h) => new Date(h.completedAt).toDateString()),
    );

    let count = 0;
    const d = new Date();

    while (dates.has(d.toDateString())) {
      count++;
      d.setDate(d.getDate() - 1);
    }

    return count;
  }, [history]);

  // ---------------- Weekly focus chart ----------------
  const weeklyFocus = useMemo(() => {
    const last7Days = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days[d.toLocaleDateString()] = 0;
    }

    history.forEach((session) => {
      if (last7Days[session.date] !== undefined) {
        last7Days[session.date] += session.duration;
      }
    });

    return Object.entries(last7Days).reverse();
  }, [history]);

  // ---------------- Today's sessions ----------------
  const todaySessions = useMemo(() => {
    const today = new Date().toLocaleDateString();
    return history.filter((h) => h.date === today);
  }, [history]);

  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

  const weekMinutes = weeklyFocus.reduce((sum, [, mins]) => sum + mins, 0);

  // ---------------- Complete session ----------------
  const completeSession = () => {
    const duration = isOvertime
      ? 25 + Math.floor(seconds / 60)
      : 25 - Math.ceil(seconds / 60);

    const newSession = {
      date: new Date().toLocaleDateString(),
      subject: selectedSubject || "General",
      task: selectedTask || "Focus session",
      duration,
      completedAt: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, newSession]);

    setIsActive(false);
    setIsOvertime(false);
    setSeconds(FOCUS_DURATION);
    setMusicOn(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsOvertime(false);
    setSeconds(FOCUS_DURATION);
    setMusicOn(false);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // ---------------- Forest stage ----------------
  const getForestStage = () => {
    const elapsed = FOCUS_DURATION - seconds;

    if (isOvertime || elapsed > 1200) {
      return "grown";
    } else if (elapsed > 600) {
      return "growing";
    } else {
      return "seed";
    }
  };

  const forestStage = getForestStage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Timer size={24} className="text-indigo-300" />
            Focus Session
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Stay focused with 25-minute Pomodoro sessions.
          </p>
        </div>

        {/* Main focus card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 mb-6">
          {/* Timer display */}
          <div className="text-center mb-8">
            {isOvertime && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block rounded-full bg-red-500/20 border border-red-400/30 px-4 py-1 text-xs font-semibold text-red-300 mb-3">
                OVERTIME
              </motion.span>
            )}

            <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight">
              {formatTime(seconds)}
            </div>

            <p className="text-sm text-white/50 mt-2">
              {isOvertime
                ? "Great focus! Keep going."
                : "Stay focused, avoid distractions."}
            </p>
          </div>

          {/* Forest visual */}
          <div className="flex items-center justify-center py-6 mb-6">
            <AnimatePresence mode="wait">
              {forestStage === "seed" && (
                <motion.div
                  key="seed"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}>
                  <Sprout size={64} className="text-emerald-300" />
                </motion.div>
              )}
              {forestStage === "growing" && (
                <motion.div
                  key="growing"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}>
                  <Flower2 size={72} className="text-emerald-300" />
                </motion.div>
              )}
              {forestStage === "grown" && (
                <motion.div
                  key="grown"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}>
                  <TreePine size={80} className="text-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subject / task select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Task</label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
                <option value="">Select task</option>
                {tasks.map((t) => (
                  <option key={t.id} value={t.text}>
                    {t.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold hover:opacity-90 transition">
              {isActive ? <Pause size={18} /> : <Play size={18} />}
              {isActive ? "Pause" : "Start"}
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
              <RotateCcw size={18} />
              Reset
            </button>

            <button
              onClick={() => setMusicOn(!musicOn)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
              {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {musicOn ? "Music On" : "Music Off"}
            </button>

            {(isActive || isOvertime) && (
              <button
                onClick={completeSession}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-600 transition">
                <Check size={18} />
                Complete
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="text-sm text-white/50 mb-1">Today</div>
            <div className="text-3xl font-bold">{todayMinutes}m</div>
            <p className="text-xs text-white/40 mt-1">
              {todaySessions.length} sessions
            </p>
          </motion.div>

          {/* This week */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="text-sm text-white/50 mb-1">This week</div>
            <div className="text-3xl font-bold">
              {Math.floor(weekMinutes / 60)}h {weekMinutes % 60}m
            </div>
            <p className="text-xs text-white/40 mt-1">Total focus time</p>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="text-sm text-white/50 mb-1">Streak</div>
            <div className="text-3xl font-bold flex items-center gap-2">
              {streak}
              <Flame size={24} className="text-orange-400" />
            </div>
            <p className="text-xs text-white/40 mt-1">Consecutive days</p>
          </motion.div>
        </div>

        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">Weekly Focus</h3>

          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyFocus.map(([date, mins], i) => {
              const maxMins = Math.max(...weeklyFocus.map(([, m]) => m), 1);
              const height = (mins / maxMins) * 100;

              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 min-h-[4px]"
                  />
                  <span className="text-[10px] text-white/40">
                    {date.split("/")[1]}/{date.split("/")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Session history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-4">Today’s Sessions</h3>

          {todaySessions.length === 0 ? (
            <p className="text-sm text-white/40">
              No sessions yet today. Start your first focus session!
            </p>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {todaySessions.map((session, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{session.subject}</p>
                      <p className="text-xs text-white/40">{session.task}</p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-300">
                      {session.duration}m
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Focus;
