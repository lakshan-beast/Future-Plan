// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/firebase";
// import { signOut } from "firebase/auth";

// import {
//   MdOutlineTimer,
//   MdOutlineLogout,
//   MdOutlineDownload,
// } from "react-icons/md";
// import { FaUserGraduate } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";
// import { FiActivity, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
// import {
//   LuCheck,
//   LuPlay,
//   LuPause,
//   //   LuCalendar,
//   LuTrees,
//   LuSprout,
//   LuFlower2,
// } from "react-icons/lu";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const user = auth.currentUser;

//   // ---------------- Focus timer ----------------
//   const [seconds, setSeconds] = useState(1500);
//   const [isActive, setIsActive] = useState(false);
//   const [isOvertime, setIsOvertime] = useState(false);
//   const bgMusicRef = useRef(null);

//   // ---------------- Countdown ----------------
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     mins: 0,
//     seconds: 0,
//   });

//   // ✅ examDate derive කරනවා render වෙලාවේම
//   const examDate = useMemo(() => {
//     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//     if (setup?.examDate) {
//       return new Date(setup.examDate);
//     }

//     return null;
//   }, []);

//   // ---------------- Countdown logic ----------------
//   useEffect(() => {
//     if (!examDate) return;

//     const updateCountdown = () => {
//       const diff = examDate.getTime() - Date.now();

//       if (diff > 0) {
//         setTimeLeft({
//           days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//           mins: Math.floor((diff / 1000 / 60) % 60),
//           seconds: Math.floor((diff / 1000) % 60),
//         });
//       } else {
//         setTimeLeft({ days: 0, hours: 0, mins: 0, seconds: 0 });
//       }
//     };

//     updateCountdown();

//     const timer = setInterval(updateCountdown, 1000);
//     return () => clearInterval(timer);
//   }, [examDate]);

//   // ---------------- Weekly progress ----------------
//   const weeklyProgress = useMemo(() => {
//     const schedule = JSON.parse(
//       localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//     );

//     let total = 0;
//     let done = 0;

//     // New structure: { weekKey: { dateKey: { tasks: [] } } }
//     Object.values(schedule).forEach((week) => {
//       if (typeof week !== "object" || week === null) return;

//       Object.values(week).forEach((day) => {
//         if (!day || !Array.isArray(day.tasks)) return;

//         day.tasks.forEach((task) => {
//           if (task.text?.trim()) {
//             total++;
//             if (task.completed) done++;
//           }
//         });
//       });
//     });

//     return total === 0 ? 0 : Math.round((done / total) * 100);
//   }, []);

//   // ---------------- Latest paper ----------------
//   const lastPaper = useMemo(() => {
//     const papers = JSON.parse(
//       localStorage.getItem("dreamutrack-papers") || "[]",
//     );

//     return papers.length ? papers[papers.length - 1] : null;
//   }, []);

//   // ---------------- Weekly forest ----------------
//   const weeklyForest = useMemo(() => {
//     const history = JSON.parse(
//       localStorage.getItem("dreamutrack-focus-history") || "[]",
//     );

//     const last7Days = {};

//     for (let i = 0; i < 7; i++) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       last7Days[d.toLocaleDateString()] = 0;
//     }

//     history.forEach((session) => {
//       if (last7Days[session.date] !== undefined) {
//         last7Days[session.date] += 1;
//       }
//     });

//     return Object.entries(last7Days).reverse();
//   }, [isActive]);

//   // ---------------- Focus timer logic ----------------
//   useEffect(() => {
//     if (isActive && !isOvertime) {
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
//   }, [isActive, isOvertime]);

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

//   const finishFocusSession = () => {
//     if (bgMusicRef.current) {
//       bgMusicRef.current.pause();
//       bgMusicRef.current = null;
//     }

//     const duration = isOvertime
//       ? 25 + Math.floor(seconds / 60)
//       : 25 - Math.ceil(seconds / 60);

//     const history = JSON.parse(
//       localStorage.getItem("dreamutrack-focus-history") || "[]",
//     );

//     localStorage.setItem(
//       "dreamutrack-focus-history",
//       JSON.stringify([
//         ...history,
//         {
//           date: new Date().toLocaleDateString(),
//           duration,
//         },
//       ]),
//     );

//     setIsActive(false);
//     setIsOvertime(false);
//     setSeconds(1500);

//     alert("Tree planted successfully!");
//   };

//   const formatTime = (s) =>
//     `${Math.floor(s / 60)
//       .toString()
//       .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   const handleDownloadBackup = () => {
//     const data = {
//       setup: JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}"),
//       weeklySchedule: JSON.parse(
//         localStorage.getItem("dreamutrack-weekly-schedule") || "{}",
//       ),
//       papers: JSON.parse(localStorage.getItem("dreamutrack-papers") || "[]"),
//       focusHistory: JSON.parse(
//         localStorage.getItem("dreamutrack-focus-history") || "[]",
//       ),
//     };

//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "dreamutrack-backup.json";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <header className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
//         <div className="flex items-center gap-4">
//           {user?.photoURL ? (
//             <div className="relative">
//               <img
//                 src={user.photoURL}
//                 alt="profile"
//                 referrerPolicy="no-referrer"
//                 className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
//               />
//               <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                 {user.providerData[0]?.providerId === "google.com" ? (
//                   <FcGoogle size={16} />
//                 ) : (
//                   <MdOutlineMail size={16} className="text-gray-700" />
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="relative">
//               <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
//                 <FaUserGraduate className="text-white/70 text-xl" />
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                 <MdOutlineMail size={16} className="text-gray-700" />
//               </div>
//             </div>
//           )}

//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold">
//               Hello, {user?.displayName || "Student"}!
//             </h1>
//             <p className="text-sm text-white/60">
//               {examDate
//                 ? `Target: ${examDate.toLocaleDateString()}`
//                 : "Set your exam date in onboarding"}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleDownloadBackup}
//             className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
//             <MdOutlineDownload />
//             Backup
//           </button>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
//             <MdOutlineLogout />
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
//         {/* Countdown card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <MdOutlineTimer /> Final Countdown
//             </h3>
//             <span className="text-xs text-white/40">Live</span>
//           </div>

//           <div className="grid grid-cols-4 gap-2 text-center">
//             {[
//               ["Days", timeLeft.days],
//               ["Hours", timeLeft.hours],
//               ["Mins", timeLeft.mins],
//               ["Secs", timeLeft.seconds],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="rounded-xl bg-white/5 border border-white/10 py-3">
//                 <div className="text-xl font-bold">{value}</div>
//                 <div className="text-[10px] text-white/50">{label}</div>
//               </div>
//             ))}
//           </div>

//           <p className="mt-4 text-xs text-white/50">
//             {examDate
//               ? `Target: ${examDate.toLocaleDateString()}`
//               : "No exam date set"}
//           </p>
//         </div>

//         {/* Weekly progress card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <LuCheck /> Weekly Progress
//             </h3>
//             <span className="text-xs text-white/40">Live</span>
//           </div>

//           <div className="text-4xl font-bold">{weeklyProgress}%</div>
//           <p className="text-sm text-white/50 mt-1">
//             Tasks completed this week
//           </p>

//           <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
//               style={{ width: `${weeklyProgress}%` }}></div>
//           </div>
//         </div>

//         {/* Latest paper card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <FiBarChart2 /> Latest Evaluation
//             </h3>
//             <span className="text-xs text-white/40">Live</span>
//           </div>

//           {lastPaper ? (
//             <div>
//               <div className="text-4xl font-bold">
//                 {lastPaper.marks}
//                 <span className="text-lg text-white/40">%</span>
//               </div>
//               <p className="text-sm text-white/50 mt-1">
//                 {lastPaper.subject} · {lastPaper.type}
//               </p>
//             </div>
//           ) : (
//             <p className="text-sm text-white/40">No records found.</p>
//           )}
//         </div>

//         {/* Focus card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <FiActivity /> Deep Work
//             </h3>
//             <span className="text-xs text-white/40">Focus</span>
//           </div>

//           <div className="flex items-center justify-center py-4">
//             {isOvertime || 1500 - seconds > 1200 ? (
//               <LuTrees className="text-5xl text-emerald-400" />
//             ) : 1500 - seconds > 600 ? (
//               <LuFlower2 className="text-5xl text-emerald-300" />
//             ) : (
//               <LuSprout className="text-5xl text-emerald-200" />
//             )}
//           </div>

//           <div className="text-center">
//             {isOvertime && (
//               <span className="text-xs text-red-400 font-semibold">
//                 OVERTIME
//               </span>
//             )}
//             <div className="text-3xl font-bold mt-1">{formatTime(seconds)}</div>
//           </div>

//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={() => setIsActive(!isActive)}
//               className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-2 text-sm font-semibold hover:opacity-90 transition">
//               {isActive ? <LuPause /> : <LuPlay />}{" "}
//               {isActive ? "Pause" : "Start"}
//             </button>

//             {(isActive || isOvertime) && (
//               <button
//                 onClick={finishFocusSession}
//                 className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition">
//                 Finish
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Weekly forest card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:col-span-2">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <FiTrendingUp /> Weekly Forest Growth
//             </h3>
//             <span className="text-xs text-white/40">Last 7 days</span>
//           </div>

//           <div className="grid grid-cols-7 gap-2 text-center">
//             {weeklyForest.map(([date, count], i) => (
//               <div key={i}>
//                 <div className="h-16 flex items-end justify-center gap-1">
//                   {[...Array(Math.min(count, 3))].map((_, idx) => (
//                     <LuTrees key={idx} className="text-emerald-400 text-lg" />
//                   ))}
//                   {count === 0 && <span className="text-white/20">.</span>}
//                 </div>
//                 <div className="text-[10px] text-white/40 mt-1">
//                   {date === new Date().toLocaleDateString()
//                     ? "Today"
//                     : date.split("/")[1] + "/" + date.split("/")[0]}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion } from "motion/react";
import {
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
  Calculator,
  Ruler,
  Calendar,
  LogOut,
  ChevronRight,
  Target,
  Clock,
  Sparkles,
  Mail,
  Trophy,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import GridMatrixLoader from "../components/Loader";

const QUICK_LINKS = [
  {
    path: "/timetable",
    label: "Timetable",
    icon: CalendarDays,
    color: "from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-300",
  },
  {
    path: "/focus",
    label: "Focus",
    icon: Timer,
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-300",
  },
  {
    path: "/notes",
    label: "Notes",
    icon: BookOpen,
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-300",
  },
  {
    path: "/practice",
    label: "Practice",
    icon: FileText,
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-300",
  },
  {
    path: "/insights",
    label: "Insights",
    icon: BarChart3,
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-300",
  },
  {
    path: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy, // lucide-react එකෙන් import
  },
];

const TOOLS = [
  {
    label: "Calendar",
    icon: Calendar,
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-300",
    comingSoon: true,
  },
  {
    label: "Calculator",
    icon: Calculator,
    color: "from-teal-500/20 to-teal-500/5",
    iconColor: "text-teal-300",
    comingSoon: true,
  },
  {
    label: "Unit Converter",
    icon: Ruler,
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-300",
    comingSoon: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [examDate, setExamDate] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [weekSessions, setWeekSessions] = useState(0);

  // ---------------- Auth state ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Local data ----------------
  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    // Exam date
    const savedExamDate = localStorage.getItem(`dreamutrack-exam-date-${uid}`);
    if (savedExamDate) {
      setExamDate(new Date(savedExamDate));
    }

    // Last activity (latest paper or focus session)
    const papers = JSON.parse(
      localStorage.getItem(`dreamutrack-papers-${uid}`) || "[]",
    );
    const focusHistory = JSON.parse(
      localStorage.getItem(`dreamutrack-focus-history-${uid}`) || "[]",
    );

    const allActivities = [
      ...papers.map((p) => ({
        type: "paper",
        title: p.paperName || "Past paper",
        detail: `${p.subject} · ${p.percentage}%`,
        date: p.createdAt,
      })),
      ...focusHistory.map((f) => ({
        type: "focus",
        title: "Focus session",
        detail: `${f.subject} · ${f.duration} min`,
        date: f.createdAt || f.startedAt,
      })),
    ];

    const latest = allActivities
      .filter((a) => a.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    setLastActivity(latest || null);

    // Weekly sessions (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const recentSessions = focusHistory.filter(
      (f) => new Date(f.createdAt || f.startedAt) >= weekAgo,
    );

    setWeekSessions(recentSessions.length);
  }, [user]);

  // ---------------- Countdown ----------------
  const countdown = useMemo(() => {
    if (!examDate) return null;

    const diff = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));

    return diff;
  }, [examDate]);

  // ---------------- Logout ----------------
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // ---------------- Provider badge ----------------
  const provider = user?.providerData?.[0]?.providerId;
  const isGoogle = provider === "google.com";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <GridMatrixLoader />
        <p className="font-body text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 pt-24">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Profile"}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400/30"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="font-heading text-xl font-bold text-emerald-950">
                {(user.displayName || user.email || "U")[0].toUpperCase()}
              </span>
            </div>
          )}

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-lg font-bold truncate">
              {user.displayName || "Student"}
            </h2>
            <p className="font-body text-sm text-white/50 truncate">
              {user.email}
            </p>
          </div>

          {/* Provider badge + logout */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              title={
                isGoogle ? "Signed in with Google" : "Signed in with Email"
              }>
              {isGoogle ? (
                <FcGoogle size={18} />
              ) : (
                <Mail size={16} className="text-white/60" />
              )}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 transition">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Exam countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 backdrop-blur-xl p-5 mb-6">
        <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
          <Target size={16} className="text-emerald-300" />
          Exam Countdown
        </div>

        {countdown === null ? (
          <p className="font-body text-sm text-white/40">
            Set your exam date in Onboarding to see countdown.
          </p>
        ) : (
          <>
            <div className="font-heading text-4xl font-bold tabular-nums">
              {countdown}
              <span className="font-body ml-2 text-base font-medium text-white/50">
                days left
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                style={{
                  width: `${Math.max(0, Math.min(100, (countdown / 365) * 100))}%`,
                }}
              />
            </div>
          </>
        )}
      </motion.div>

      {/* Last activity + Forest preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Last activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Clock size={16} className="text-indigo-300" />
            Last Activity
          </div>

          {lastActivity ? (
            <>
              <p className="font-heading text-lg font-bold truncate">
                {lastActivity.title}
              </p>
              <p className="font-body text-sm text-white/50 mt-1">
                {lastActivity.detail}
              </p>
              <p className="font-body text-xs text-white/30 mt-2">
                {new Date(lastActivity.date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="font-body text-sm text-white/40">
              No activity yet. Start a focus session or add a paper.
            </p>
          )}
        </motion.div>

        {/* Forest preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 backdrop-blur-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Sparkles size={16} className="text-emerald-300" />
              Weekly Forest
            </div>
            <Link
              to="/focus"
              className="font-body text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1">
              Open
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="font-heading text-3xl font-bold">
            {weekSessions}
            <span className="font-body ml-2 text-sm font-medium text-white/50">
              sessions this week
            </span>
          </div>

          <div className="mt-3 flex items-end gap-1.5 h-12">
            {[40, 65, 50, 85, 70, 95, 30].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md bg-gradient-to-t from-emerald-500/70 to-emerald-300/90"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6">
        <h3 className="font-heading text-lg font-bold mb-3">Quick Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${link.color} backdrop-blur-xl p-4 hover:border-white/20 transition group`}>
              <link.icon size={22} className={`${link.iconColor} mb-2`} />
              <p className="font-body text-sm font-medium">{link.label}</p>
              <ChevronRight
                size={14}
                className="text-white/30 group-hover:text-white/60 transition mt-1"
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Tools — coming soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}>
        <h3 className="font-heading text-lg font-bold mb-3">Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.label}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${tool.color} backdrop-blur-xl p-4 opacity-60`}>
              <div className="flex items-center justify-between mb-2">
                <tool.icon size={22} className={tool.iconColor} />
                <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  Coming soon
                </span>
              </div>
              <p className="font-body text-sm font-medium">{tool.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
