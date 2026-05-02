// // import { useState, useEffect } from "react";
// // import {
// //   LuCheck,
// //   LuCircle,
// //   LuPlay,
// //   LuPause,
// //   LuCalendar,
// //   LuRotateCcw,
// // } from "react-icons/lu";

// // const Dashboard = () => {
// //   // --- 1. Countdown Logic ---
// //   const calculateTimeLeft = () => {
// //     const examDate = new Date("2026-08-08T00:00:00");
// //     const difference = +examDate - +new Date();

// //     if (difference > 0) {
// //       return {
// //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
// //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
// //         mins: Math.floor((difference / 1000 / 60) % 60),
// //         seconds: Math.floor((difference / 1000) % 60),
// //       };
// //     }
// //     return null;
// //   };

// //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// //   // timer event
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setTimeLeft(calculateTimeLeft());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // --- 2. To-Do List Logic (Local Storage) ---
// //   const [tasks, setTasks] = useState(() => {
// //     const saved = localStorage.getItem("tasks");
// //     return saved ? JSON.parse(saved) : [];
// //   });
// //   const [newTask, setNewTask] = useState("");

// //   useEffect(() => {
// //     localStorage.setItem("tasks", JSON.stringify(tasks));
// //   }, [tasks]);

// //   const addTask = (e) => {
// //     e.preventDefault();
// //     if (!newTask.trim()) return;
// //     setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
// //     setNewTask("");
// //   };

// //   const toggleTask = (id) => {
// //     setTasks(
// //       tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
// //     );
// //   };

// //   // --- 3. Focus Timer (Pomodoro) Logic ---
// //   const [seconds, setSeconds] = useState(1500); // 25 minutes
// //   const [isActive, setIsActive] = useState(false);

// //   useEffect(() => {
// //     let interval = null;
// //     if (isActive && seconds > 0) {
// //       interval = setInterval(() => setSeconds((s) => s - 1), 1000);
// //     } else {
// //       clearInterval(interval);
// //     }
// //     return () => clearInterval(interval);
// //   }, [isActive, seconds]);

// //   const formatTime = (s) =>
// //     `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// //   const today = new Date().toLocaleDateString("en-US", {
// //     weekday: "long",
// //     month: "long",
// //     day: "numeric",
// //   });

// //   const calculateWeeklyProgress = () => {
// //     const savedSchedule = localStorage.getItem("weekly-schedule");
// //     if (!savedSchedule) return 0;

// //     const schedule = JSON.parse(savedSchedule);
// //     const days = Object.keys(schedule);

// //     let totalTasks = 0;
// //     let completedTasks = 0;

// //     days.forEach((day) => {
// //       schedule[day].forEach((slot) => {
// //         if (slot.text.trim() !== "") {
// //           // හිස් slots ගණන් ගන්නේ නැහැ
// //           totalTasks++;
// //           if (slot.completed) completedTasks++;
// //         }
// //       });
// //     });

// //     return totalTasks === 0
// //       ? 0
// //       : Math.round((completedTasks / totalTasks) * 100);
// //   };

// //   const getLastPaperStats = () => {
// //     const savedPapers = localStorage.getItem("past-papers");
// //     if (!savedPapers) return null;

// //     const papers = JSON.parse(savedPapers);
// //     if (papers.length === 0) return null;

// //     // අවසන් වරට ඇතුළත් කළ පේපර් එක ලබා ගැනීම
// //     return papers[papers.length - 1];
// //   };

// //   const lastPaper = getLastPaperStats();

// //   const calculateWeeksUntilExam = () => {
// //     const examDate = new Date("2026-08-10"); // 2026 A/L ආරම්භක දිනය
// //     const today = new Date();

// //     // දින දෙක අතර පරතරය මිලි තත්පර වලින්
// //     const diffInMs = examDate - today;

// //     // සති ගණන ගණනය කිරීම
// //     const weeksLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

// //     return weeksLeft > 0 ? weeksLeft : 0;
// //   };

// //   // Dashboard.jsx ඇතුළත මේ logic එක update කරන්න

// //   //   const [seconds, setSeconds] = useState(1500); // 25 mins
// //   //   const [isActive, setIsActive] = useState(false);
// //   const [isOvertime, setIsOvertime] = useState(false); // Overtime ද නැද්ද යන්න
// //   const [totalFocusTime, setTotalFocusTime] = useState(0); // මුළු කාලය සටහන් කිරීමට

// //   const playAlarm = () => {
// //     const audio = new Audio("https://mixkit.co");
// //     audio.play();
// //   };

// //   useEffect(() => {
// //     let interval = null;

// //     if (isActive) {
// //       interval = setInterval(() => {
// //         if (!isOvertime) {
// //           if (seconds > 0) {
// //             setSeconds((s) => s - 1);
// //           } else {
// //             // Timer එක 0 වුණා!
// //             setIsOvertime(true);
// //             playAlarm(); // Sound එක ප්ලේ කිරීම
// //           }
// //         } else {
// //           // Overtime ගණන් කිරීම (0 සිට ඉහළට)
// //           setSeconds((s) => s + 1);
// //         }
// //       }, 1000);
// //     } else {
// //       clearInterval(interval);
// //     }
// //     return () => clearInterval(interval);
// //   }, [isActive, seconds, isOvertime]);

// //   // Session එක ඉවර කරලා දත්ත save කිරීම
// //   const completeSession = () => {
// //     const finalTime = isOvertime ? 1500 + seconds : 1500 - seconds;
// //     const history = JSON.parse(localStorage.getItem("focus-history") || "[]");

// //     const newSession = {
// //       date: new Date().toLocaleDateString(),
// //       duration: Math.floor(finalTime / 60), // විනාඩි වලින්
// //       type: "Forest Tree Grown",
// //     };

// //     localStorage.setItem(
// //       "focus-history",
// //       JSON.stringify([...history, newSession]),
// //     );

// //     // Reset Timer
// //     setIsActive(false);
// //     setIsOvertime(false);
// //     setSeconds(1500);
// //     alert("Session Saved! Your tree is added to the forest 🌲");
// //   };

// //   const getTreeStatus = () => {
// //     if (!isActive && seconds === 1500) return "🌱 Seed"; // පටන් ගන්න කලින්
// //     if (isOvertime) return "🌳 Fully Grown Tree";
// //     const progress = ((1500 - seconds) / 1500) * 100;
// //     if (progress < 30) return "🌿 Sprout";
// //     if (progress < 70) return "🪴 Sapling";
// //     return "🌳 Growing Tree";
// //   };

// //   const getForestStats = () => {
// //     const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
// //     // අද දවසට අදාළ ගස් පමණක් වෙන් කර ගැනීම
// //     const today = new Date().toLocaleDateString();
// //     const todayTrees = history.filter((session) => session.date === today);
// //     return todayTrees;
// //   };

// //   const dailyTrees = getForestStats();
// //   return (
// //     <div className="dashboard-wrapper">
// //       <div className="dashboard-main">
// //         <div className="welcome-section">
// //           <h1>
// //             Hello, <span>Winahga!</span>
// //           </h1>
// //           <p>Ready to achieve your objectives today?</p>
// //         </div>

// //         <div className="dashboard-main-right">
// //           <div className="date-box">
// //             <h4>{today}</h4>
// //             <p>Target: A/L 2026</p>
// //           </div>
// //           <div className="badge-status">
// //             <LuCalendar />
// //             Time Remaining: {calculateWeeksUntilExam()} Weeks left
// //           </div>
// //           <div className="badge-status">
// //             <LuCalendar />
// //             Academic Progress: {calculateWeeklyProgress()}%
// //           </div>
// //         </div>
// //       </div>

// //       <div className="main-grid">
// //         <div className="left-col">
// //           <div className="card mini-card count-card">
// //             <p>Exam Countdown</p>
// //             <div className="mini-timer">
// //               <span>{timeLeft?.days}d</span> : <span>{timeLeft?.hours}h</span> :
// //               <span>{timeLeft?.mins}m</span> :
// //               <span style={{ color: "#eb4d25" }}>{timeLeft?.seconds}s</span>
// //             </div>
// //           </div>
// //           <div className="card performance-card">
// //             <h3>Recent Evaluation 🎯</h3>
// //             {lastPaper ? (
// //               <div className="performance-content">
// //                 <div className="sub-tag">
// //                   {lastPaper.subject} - {lastPaper.type}
// //                 </div>
// //                 <div className="score-display">
// //                   <span className="score">{lastPaper.marks}%</span>
// //                   <p className="label">Performance Score</p>
// //                 </div>
// //                 <div className="remarks-box">
// //                   <strong>Notes:</strong>
// //                   {lastPaper.errors || "No remarks recorded."}
// //                 </div>
// //               </div>
// //             ) : (
// //               <p className="no-data-msg">
// //                 Complete your first past paper to see analysis.
// //               </p>
// //             )}
// //           </div>
// //           <div className="card focus-card">
// //             <h3>Focus Timer ⏱️</h3>
// //             <div className="timer-display">{formatTime(seconds)}</div>
// //             <div className="timer-controls">
// //               <button onClick={() => setIsActive(!isActive)}>
// //                 {isActive ? <LuPause /> : <LuPlay />}
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setIsActive(false);
// //                   setSeconds(1500);
// //                 }}>
// //                 <LuRotateCcw />
// //               </button>
// //             </div>
// //           </div>
// //           // UI එක ඇතුළේ:
// //           <div className="card forest-gallery-card">
// //             <h3>Daily Achievement Forest 🌲</h3>
// //             <div className="trees-display">
// //               {dailyTrees.length > 0 ? (
// //                 dailyTrees.map((tree, index) => (
// //                   <div
// //                     key={index}
// //                     className="mini-tree-box"
// //                     title={`Duration: tree.duration}mins`}>
// //                     <LuTrees className="mini-tree-icon" />
// //                     <span className="tree-time">{tree.duration}m</span>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <p className="no-trees-msg">
// //                   No trees planted today. Start a session to grow your forest!
// //                 </p>
// //               )}
// //             </div>
// //             <div className="forest-summary">
// //               Total Focus Time Today:
// //               <strong>
// //                 {dailyTrees.reduce((acc, curr) => acc + curr.duration, 0)} mins
// //               </strong>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column: Info & Stats */}
// //         <div className="right-col">
// //           <div className="card todo-card">
// //             <h3>Study Planner 📚</h3>
// //             <form onSubmit={addTask}>
// //               <input
// //                 value={newTask}
// //                 onChange={(e) => setNewTask(e.target.value)}
// //                 placeholder="අද මොනවද ඉගෙන ගන්නේ?"
// //               />
// //             </form>
// //             <div className="task-list">
// //               {tasks.map((task) => (
// //                 <div
// //                   key={task.id}
// //                   className={`task-item ${task.completed ? "done" : ""}`}
// //                   onClick={() => toggleTask(task.id)}>
// //                   {task.completed ? (
// //                     <LuCheck className="check" />
// //                   ) : (
// //                     <LuCircle />
// //                   )}
// //                   <span>{task.text}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Progress Section */}
// //           <div className="daily-progress-container card">
// //             <div className="progress-info">
// //               <h3>Daily Progress 🎯</h3>
// //               <span className="percentage">
// //                 {tasks.length > 0
// //                   ? Math.round(
// //                       (tasks.filter((t) => t.completed).length / tasks.length) *
// //                         100,
// //                     )
// //                   : 0}
// //                 %
// //               </span>
// //             </div>

// //             <div className="progress-bar-outer">
// //               <div
// //                 className="progress-bar-inner"
// //                 style={{
// //                   width: `${tasks.length > 0 ? (tasks.filter((t) => t.completed).length / tasks.length) * 100 : 0}%`,
// //                 }}></div>
// //             </div>

// //             <p className="task-count">
// //               {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
// //               completed
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import { useState, useEffect, useMemo } from "react";
// import {
//   LuCheck,
//   LuCircle,
//   LuPlay,
//   LuPause,
//   LuCalendar,
//   LuTrees,
//   LuSprout,
//   LuFlower2,
// } from "react-icons/lu";

// const Dashboard = () => {
//   // --- 1. Basic States ---
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     mins: 0,
//     seconds: 0,
//   });
//   const [tasks, setTasks] = useState(() =>
//     JSON.parse(localStorage.getItem("tasks") || "[]"),
//   );
//   const [newTask, setNewTask] = useState("");

//   // --- 2. Focus Timer States ---
//   const [seconds, setSeconds] = useState(60); // 25 mins
//   const [isActive, setIsActive] = useState(false);
//   const [isOvertime, setIsOvertime] = useState(false);

//   // --- 3. Exam Countdown Logic ---
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const examDate = new Date("2026-08-08T00:00:00");
//       const difference = +examDate - +new Date();

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           mins: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // --- 4. Focus Timer Logic (with Overtime & Sound) ---
//   const playAlarm = () => {
//     const audio = new Audio("https://mixkit.co");
//     audio.play().catch(() => console.log("Audio play error"));
//   };

//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         if (!isOvertime) {
//           if (seconds > 0) {
//             setSeconds((s) => s - 1);
//           } else {
//             setIsOvertime(true);
//             playAlarm();
//           }
//         } else {
//           setSeconds((s) => s + 1); // Overtime counts UP
//         }
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, seconds, isOvertime]);

//   // --- 5. Helper Functions (Memoized for Performance) ---
//   const weeklyProgress = useMemo(() => {
//     const saved = localStorage.getItem("weekly-schedule");
//     if (!saved) return 0;
//     const schedule = JSON.parse(saved);
//     let total = 0,
//       done = 0;
//     Object.values(schedule).forEach((day) =>
//       day.forEach((slot) => {
//         if (slot.text.trim() !== "") {
//           total++;
//           if (slot.completed) done++;
//         }
//       }),
//     );
//     return total === 0 ? 0 : Math.round((done / total) * 100);
//   }, [tasks]); // Re-calculates when tasks change

//   const dailyTrees = useMemo(() => {
//     const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
//     const todayStr = new Date().toLocaleDateString();
//     return history.filter((s) => s.date === todayStr);
//   }, [isActive]);

//   const weeksUntilExam = useMemo(() => {
//     const diff = new Date("2026-08-10") - new Date();
//     return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 7)));
//   }, []);

//   // --- 6. Handlers ---
//   const addTask = (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;
//     const updated = [
//       ...tasks,
//       { id: Date.now(), text: newTask, completed: false },
//     ];
//     setTasks(updated);
//     localStorage.setItem("tasks", JSON.stringify(updated));
//     setNewTask("");
//   };

//   const completeFocusSession = () => {
//     const finalTime = isOvertime ? 1500 + seconds : 1500 - seconds;
//     const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
//     const newSession = {
//       date: new Date().toLocaleDateString(),
//       duration: Math.floor(finalTime / 60),
//       type: "Forest Tree",
//     };
//     localStorage.setItem(
//       "focus-history",
//       JSON.stringify([...history, newSession]),
//     );
//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(1500);
//     alert("Session Saved! Your tree has been planted 🌲");
//   };

//   const formatTime = (s) =>
//     `${Math.floor(s / 60)
//       .toString()
//       .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

//   const today = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//   });

//   // const getLastPaperStats = () => {
//   //   const savedPapers = localStorage.getItem("past-papers");
//   //   if (!savedPapers) return null;

//   //   const papers = JSON.parse(savedPapers);
//   //   if (papers.length === 0) return null;

//   //   // අවසන් වරට ඇතුළත් කළ පේපර් එක ලබා ගැනීම
//   //   return papers[papers.length - 1];
//   // };

//   // const lastPaper = getLastPaperStats();
//   return (
//     <div className="dashboard-wrapper">
//       {/* Top Bar Section */}
//       <header className="dashboard-main">
//         <div className="welcome-section">
//           <h1>
//             Hello, <span>Winahga!</span>
//           </h1>
//           <p>Ready to achieve your academic objectives today?</p>
//         </div>
//         <div className="dashboard-main-right">
//           <div className="date-box">
//             <h4>{today}</h4>
//             <p>Target: A/L 2026</p>
//           </div>
//           <div className="badge-status primary">
//             <LuCalendar /> {weeksUntilExam} Weeks Remaining
//           </div>
//           <div className="badge-status success">
//             <LuCheck /> {weeklyProgress}% Academic Progress
//           </div>
//         </div>
//       </header>

//       <div className="main-grid">
//         {/* Left Side: Focus Timer & Forest */}
//         <div className="left-col">
//           <div className="card focus-card-premium">
//             <h3>Deep Work Session 🌳</h3>
//             <div className="forest-visual">
//               {isOvertime || 1500 - seconds > 1200 ? (
//                 <LuTrees className="tree grown" />
//               ) : 1500 - seconds > 600 ? (
//                 <LuFlower2 className="tree" />
//               ) : (
//                 <LuSprout className="tree" />
//               )}
//             </div>
//             <div className={`timer - display ${isOvertime ? "emergency" : ""}`}>
//               {isOvertime && <span className="ot-label">OVERTIME ACTIVE</span>}
//               <h2>{formatTime(seconds)}</h2>
//             </div>
//             <div className="timer-controls">
//               <button
//                 className="start-btn"
//                 onClick={() => setIsActive(!isActive)}>
//                 {isActive ? <LuPause /> : <LuPlay />}
//                 {isActive ? "Pause" : "Start Focus"}
//               </button>
//               {isActive && (
//                 <button className="btn-complete" onClick={completeFocusSession}>
//                   Finish & Plant
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="card forest-gallery">
//             <h3>Today's Forest Growth</h3>
//             <div className="tree-list">
//               {dailyTrees.map((tree, i) => (
//                 <div key={i} className="mini-tree">
//                   <LuTrees />
//                   <span>{tree.duration}m</span>
//                 </div>
//               ))}
//               {dailyTrees.length === 0 && (
//                 <p className="empty-msg">No trees planted yet today.</p>
//               )}
//             </div>
//           </div>

//           <div className="card countdown-card-premium">
//             <h3>Final Countdown ⏳</h3>
//             <div className="timer-grid">
//               <div className="time-item">
//                 <span>{timeLeft?.days || 0}</span>
//                 <small>Days</small>
//               </div>
//               <div className="time-item">
//                 <span>{timeLeft?.hours || 0}</span>
//                 <small>Hours</small>
//               </div>
//               <div className="time-item">
//                 <span>{timeLeft?.mins || 0}</span>
//                 <small>Mins</small>
//               </div>
//               <div className="time-item">
//                 <span className="secs">{timeLeft?.seconds || 0}</span>
//                 <small>Secs</small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: To-Do & Stats */}
//         <div className="right-col">
//           <div className="card todo-card">
//             <h3>Daily Objectives 📚</h3>
//             <form onSubmit={addTask} className="task-form">
//               <input
//                 value={newTask}
//                 onChange={(e) => setNewTask(e.target.value)}
//                 placeholder="Define your next milestone..."
//               />
//             </form>
//             <div className="task-list">
//               {tasks.map((t) => (
//                 <div
//                   key={t.id}
//                   className={`task-item ${t.completed ? "done" : ""}`}
//                   onClick={() => {
//                     const updated = tasks.map((tk) =>
//                       tk.id === t.id ? { ...tk, completed: !tk.completed } : tk,
//                     );
//                     setTasks(updated);
//                     localStorage.setItem("tasks", JSON.stringify(updated));
//                   }}>
//                   {t.completed ? <LuCheck /> : <LuCircle />}
//                   <span>{t.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* <div className="right-col"> */}
//           {/* 1. Academic Progress Card */}
//           {/* <div className="card progress-card-premium">
//     <h3>Academic Progress 📈</h3>
//     <div className="progress-content">
//       <div className="circular-progress">
//         <svg viewBox="0 0 36 36" className="circular-chart">
//           <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
//           <path className="circle" strokeDasharray={`${weeklyProgress}`, 100} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
//           <text x="18" y="20.35" className="percentage">{weeklyProgress}%</text>
//         </svg>
//       </div>
//       <p>Overall Weekly Completion</p>
//     </div>
//   </div>

//   {/* 2. Latest Evaluation Card
//   <div className="card performance-card">
//     <h3>Latest Evaluation 🎯</h3>
//     {lastPaper ? (
//       <div className="performance-content">
//         <div className="sub-badge">{lastPaper.subject}</div>
//         <div className="score-box">
//           <span className="score-num">{lastPaper.marks}</span>
//           <span className="percent-sign">%</span>
//         </div>
//         <p className="paper-type">{lastPaper.type} Paper</p>
//       </div>
//     ) : (
//       <div className="no-data-box">No evaluation records found.</div>
//     )}
//   </div>

//   {/* 3. To-Do Card (කලින් තිබුණු එක)
//   <div className="card todo-card">
//     <h3>Daily Objectives 📚</h3> */}
//           {/* ... පරණ todo code එක ... */}
//           {/* </div> */}
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect, useMemo } from "react";
import {
  LuCheck,
  LuCircle,
  LuPlay,
  LuPause,
  LuCalendar,
  LuTrees,
  LuSprout,
  LuFlower2,
} from "react-icons/lu";

const Dashboard = () => {
  // --- 1. States ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    seconds: 0,
  });
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]"),
  );
  const [newTask, setNewTask] = useState("");
  const [seconds, setSeconds] = useState(1500); // 25 mins (Testing නම් 60 කරන්න)
  const [isActive, setIsActive] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false); // --- 2. Alarm Sound Function ---

  const playAlarm = () => {
    const audio = new Audio("https://google.com");
    audio.play().catch(() => console.log("Interaction needed for sound"));
  }; // --- 3. Exam Countdown Logic (Target: Aug 10, 2026) ---

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date("2026-08-10T00:00:00") - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []); // --- 4. Focus Timer & Overtime Logic ---

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (!isOvertime) {
          if (seconds > 0) setSeconds((s) => s - 1);
          else {
            setIsOvertime(true);
            playAlarm();
          }
        } else {
          setSeconds((s) => s + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isOvertime]); // --- 5. Data Calculations (Memoized for Performance) ---

  const weeklyProgress = useMemo(() => {
    const schedule = JSON.parse(
      localStorage.getItem("weekly-schedule") || "{}",
    );
    let total = 0,
      done = 0;
    Object.values(schedule).forEach((day) =>
      day.forEach((slot) => {
        if (slot.text.trim()) {
          total++;
          if (slot.completed) done++;
        }
      }),
    );
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [tasks]);

  const lastPaper = useMemo(() => {
    const papers = JSON.parse(localStorage.getItem("past-papers") || "[]");
    return papers.length ? papers[papers.length - 1] : null;
  }, []);

  const dailyTrees = useMemo(() => {
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
    const todayStr = new Date().toLocaleDateString();
    return history.filter((s) => s.date === todayStr);
  }, [isActive]);

  const weeksUntilExam = Math.max(
    0,
    Math.floor(
      (new Date("2026-08-10") - new Date()) / (1000 * 60 * 60 * 24 * 7),
    ),
  ); // --- 6. Event Handlers ---

  const handleTaskToggle = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const finishFocusSession = () => {
    const duration = isOvertime
      ? 25 + Math.floor(seconds / 60)
      : 25 - Math.ceil(seconds / 60);
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
    localStorage.setItem(
      "focus-history",
      JSON.stringify([
        ...history,
        { date: new Date().toLocaleDateString(), duration },
      ]),
    );
    setIsActive(false);
    setIsOvertime(false);
    setSeconds(1500);
    alert("Tree Planted Successfully! 🌳");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="dashboard-wrapper">
      {/* Top Header */}
      <header className="dashboard-main">
               {" "}
        <div className="welcome-section card">
                           {" "}
          <h1>
            Hello, <span>Winahga!</span>
          </h1>
                    <p>Ready to master your academic goals today?</p>
                 {" "}
        </div>
               {" "}
        <div className="dashboard-main-right">
          <div className="date-box">
            <h4>{today}</h4>
            <p>Target: A/L 2026</p>{" "}
          </div>
                   {" "}
          <div className="badge-status primary">
            <LuCalendar /> {weeksUntilExam} Weeks Remaining
          </div>
                   {" "}
          <div className="badge-status success">
            <LuCheck /> {weeklyProgress}% Progress
          </div>
                 {" "}
        </div>
             {" "}
      </header>
      <div className="main-grid">
        {/* Left Side: Focus Timer & Forest Display */}
        <div className="left-col">
          <div className="card focus-card-premium">
                       {" "}
            <h3>
              Deep Work Session <LuTrees />
            </h3>
                       {" "}
            <div className="forest-visual">
                           {" "}
              {isOvertime || 1500 - seconds > 1200 ? (
                <LuTrees className="tree grown" />
              ) : 1500 - seconds > 600 ? (
                <LuFlower2 className="tree growing" />
              ) : (
                <LuSprout className="tree seed" />
              )}
                         {" "}
            </div>
                       {" "}
            <div className={`timer-display ${isOvertime ? "emergency" : ""}`}>
                           {" "}
              {isOvertime && <span className="ot-label">OVERTIME</span>}
                            <h2>{formatTime(seconds)}</h2>
                         {" "}
            </div>
                       {" "}
            <div className="timer-controls">
                           {" "}
              <button
                onClick={() => setIsActive(!isActive)}
                className="btn-start">
                {isActive ? <LuPause /> : <LuPlay />}{" "}
                {isActive ? "Pause" : "Start Again"}
              </button>
                           {" "}
              {isActive && (
                <button onClick={finishFocusSession} className="btn-complete">
                  Finish & Plant
                </button>
              )}
                         {" "}
            </div>
                     {" "}
          </div>
          <div className="card forest-gallery">
                        <h3>Today's Forest Growth</h3>
                       {" "}
            <div className="tree-list">
                           {" "}
              {dailyTrees.map((tree, i) => (
                <div key={i} className="mini-tree">
                  <LuTrees />
                  <span>{tree.duration}m</span>
                </div>
              ))}
                           {" "}
              {!dailyTrees.length && (
                <p className="empty-msg">No trees planted yet today.</p>
              )}
                         {" "}
            </div>
                     {" "}
          </div>
          <div className="card countdown-card-premium">
            <h3>Final Countdown ⏳</h3>
            <div className="timer-grid">
              <div className="time-item">
                <span>{timeLeft.days}</span>
                <small>Days</small>
              </div>
              <div className="time-item">
                <span>{timeLeft.hours}</span>
                <small>Hours</small>
              </div>
              <div className="time-item">
                <span>{timeLeft.mins}</span>
                <small>Mins</small>
              </div>
              <div className="time-item">
                <span className="secs">{timeLeft.seconds}</span>
                <small>Secs</small>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side: Progress, Evaluation & Tasks */}
        <div className="right-col">
          <div className="card performance-card">
            <h3>Latest Evaluation 🎯</h3>

            {lastPaper ? (
              <div className="performance-content">
                <span className="sub-badge">{lastPaper.subject}</span>
                <div className="score-box">
                  <span className="score-num">{lastPaper.marks}</span>
                  <span className="percent-sign">%</span>
                </div>
                <p className="paper-type">{lastPaper.type} Paper</p>
              </div>
            ) : (
              <p className="no-data">No records found.</p>
            )}
          </div>
          <div className="card todo-card">
            <h3>Daily Objectives 📚</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTask.trim()) return;
                const updated = [
                  ...tasks,
                  { id: Date.now(), text: newTask, completed: false },
                ];
                setTasks(updated);
                localStorage.setItem("tasks", JSON.stringify(updated));
                setNewTask("");
              }}
              className="task-form">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Next milestone..."
              />
            </form>
            <div className="task-list">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={`task-item ${t.completed ? "done" : ""}`}
                  onClick={() => handleTaskToggle(t.id)}>
                  {t.completed ? <LuCheck /> : <LuCircle />}{" "}
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
