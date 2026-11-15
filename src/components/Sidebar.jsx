// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
// } from "lucide-react";

// const Sidebar = () => {
//   const links = [
//     {
//       to: "/dashboard",
//       label: "Dashboard",
//       icon: <LayoutDashboard size={18} />,
//     },
//     { to: "/timetable", label: "Timetable", icon: <CalendarDays size={18} /> },
//     { to: "/focus", label: "Focus", icon: <Timer size={18} /> },
//     { to: "/notes", label: "Notes", icon: <BookOpen size={18} /> },
//     { to: "/practice", label: "Practice", icon: <FileText size={18} /> },
//     { to: "/insights", label: "Insights", icon: <BarChart3 size={18} /> },
//   ];

//   return (
//     <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl p-6">
//       <div className="mb-10">
//         <h1 className="text-xl font-bold">
//           Dream<span className="text-indigo-300">U</span>Track
//         </h1>
//       </div>

//       <nav className="space-y-2">
//         {links.map((link) => (
//           <NavLink
//             key={link.to}
//             to={link.to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
//                 isActive
//                   ? "bg-indigo-500/20 text-white"
//                   : "text-white/60 hover:bg-white/5 hover:text-white"
//               }`
//             }>
//             {link.icon}
//             {link.label}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.jsx
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { motion } from "framer-motion";
// import {
//   LayoutDashboard,
//   // CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
//   // Sparkles,
//   Trophy,
//   LogOut,
// } from "lucide-react";
// import { GiDreamCatcher } from "react-icons/gi";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";

// const LINKS = [
//   { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   // { to: "/timetable", label: "Timetable", icon: CalendarDays },
//   { to: "/focus", label: "Focus", icon: Timer },
//   { to: "/notes", label: "Notes", icon: BookOpen },
//   { to: "/practice", label: "Practice", icon: FileText },
//   { to: "/insights", label: "Insights", icon: BarChart3 },
//   {
//     to: "/leaderboard",
//     label: "Leaderboard",
//     icon: Trophy,
//   },
// ];

// const Sidebar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   const provider = user?.providerData?.[0]?.providerId;
//   const isGoogle = provider === "google.com";

//   const handleLogout = async () => {
//     await signOut(auth);
//     window.location.href = "/login";
//   };

//   return (
//     <aside className="fixed hidden lg:flex w-72 flex-col border-r rounded-r-3xl border-white/10 bg-white/5 backdrop-blur-xl p-5 h-dvh">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-2.5">
//         <div className="w-10 h-10 rounded-bl-2xl rounded-tr-2xl rounded-br-md rounded-tl-md bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
//           <GiDreamCatcher size={30} className="text-emerald-100" />
//         </div>
//         <h1 className="font-heading text-3xl font-bold text-white">
//           Dream<span className="text-emerald-300">T</span>rack
//         </h1>
//       </div>

//       {/* Nav links */}
//       <nav aria-label="Main navigation" className="flex-1 space-y-1.5">
//         {LINKS.map((link) => (
//           <NavLink
//             key={link.to}
//             to={link.to}
//             aria-current={({ isActive }) => (isActive ? "page" : undefined)}
//             className={({ isActive }) =>
//               `flex items-center gap-5 rounded-xl px-4 py-3 text-sm font-body mt-1 transition ${
//                 isActive
//                   ? "bg-emerald-400/15 text-emerald-300"
//                   : "border border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
//               }`
//             }>
//             <link.icon size={18} />
//             {link.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Profile — bottom */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-6 pt-5 border-t border-white/10">
//         <div className="flex items-center gap-2 mb-3">
//           {user?.photoURL ? (
//             <img
//               src={user.photoURL}
//               alt={user.displayName || "Profile"}
//               className="w-10 h-10 rounded-full object-cover border border-emerald-50/0 outline-2 outline-emerald-400/90"
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
//               <span className="font-heading text-sm font-bold font-sans text-emerald-950">
//                 {(user?.displayName || user?.email || "U")[0].toUpperCase()}
//               </span>
//             </div>
//           )}
//           <div className="min-w-0 flex-1">
//             <p className="font-body text-sm font-medium truncate">
//               {user?.displayName || "Student"}
//             </p>
//             <p className="font-body text-xs text-white/40 truncate">
//               {user?.email}
//             </p>
//           </div>
//         </div>

//         {/* Provider badge */}
//         <div className="flex items-center justify-center gap-2 mb-3 py-1 ">
//           <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
//             {isGoogle ? (
//               <FcGoogle size={14} />
//             ) : (
//               <MdOutlineMail size={14} className="text-white/60" />
//             )}
//           </div>
//           <span className="font-body text-xs text-white/40">
//             {isGoogle ? "Google account" : "Email account"}
//           </span>
//         </div>

//         {/* Logout */}
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-3 border border-red-300/30 rounded-xl px-4 py-2.5 text-sm font-body text-red-300 hover:bg-red-500/10 hover:border-red-500/30 transition">
//           <LogOut size={16} />
//           Log out
//         </button>
//       </motion.div>
//     </aside>
//   );
// };

// export default Sidebar;

import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  LayoutDashboard,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
  Trophy,
  LogOut,
} from "lucide-react";
import { GiDreamCatcher } from "react-icons/gi";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";

import { auth } from "../firebase/firebase";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/practice", label: "Practice", icon: FileText },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

function SidebarLandscape() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mt-6 h-28 shrink-0 overflow-hidden rounded-2xl bg-[#081d28]">
      <svg
        viewBox="0 0 300 140"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        className="h-full w-full">
        <defs>
          <linearGradient
            id="sidebar-landscape-sky"
            x1="0"
            y1="0"
            x2="0"
            y2="1">
            <stop offset="0%" stopColor="#081321" />
            <stop offset="100%" stopColor="#12605b" />
          </linearGradient>
        </defs>

        <rect width="300" height="140" fill="url(#sidebar-landscape-sky)" />

        <circle cx="233" cy="36" r="15" fill="#a7f3d0" opacity=".7" />

        <path
          d="M0 110 55 52 105 92 168 39 240 102 300 64V140H0Z"
          fill="#135052"
        />
        <path d="M0 132 70 83 129 120 201 71 300 117V140H0Z" fill="#0a333d" />
        <path d="M0 140 76 116 160 137 241 108 300 132V140Z" fill="#061a29" />

        <path
          d="M145 140Q175 116 202 112"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="2"
          opacity=".55"
        />
      </svg>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-emerald-300/10" />
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // const isGoogle = user?.providerData?.some(
  //   ({ providerId }) => providerId === "google.com",
  // );

  const displayName = user?.displayName || "Student";
  const initial = (displayName.trim()[0] || "S").toUpperCase();

  async function handleLogout() {
    if (loggingOut) return;

    setError("");
    setLoggingOut(true);

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch {
      setError("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  return (
    <aside
      aria-label="Desktop sidebar"
      className="
        fixed inset-y-0 left-0 z-40 hidden h-dvh w-72
        flex-col overflow-y-auto rounded-r-4xl border-r-2 border-emerald-300/10
        bg-[#050b1b] px-5 py-6 text-white lg:flex
      ">
      <NavLink
        to="/dashboard"
        aria-label="DreamTrack dashboard"
        className="mb-8 flex shrink-0 items-center gap-3 rounded-xl">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-[0_0_24px_rgba(52,211,153,0.10)]">
          <GiDreamCatcher
            size={30}
            className="text-emerald-300"
            aria-hidden="true"
          />
        </span>

        <span className="font-heading text-3xl font-bold tracking-tight">
          Dream<span className="text-emerald-300">Track</span>
        </span>
      </NavLink>
{/* 
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Study workspace
      </p> */}

      <nav aria-label="Main navigation" className="space-y-1.5">
        {LINKS.map(({ to, label, icon: Icon }) => {
          const isDashboardRoot = to === "/dashboard" && pathname === "/";

          return (
            <NavLink
              key={to}
              to={to}
              aria-current={isDashboardRoot ? "page" : undefined}
              className={({ isActive }) => {
                const active = isActive || isDashboardRoot;

                return `
                  group flex min-h-12 items-center gap-13 rounded-xl
                  border px-4 py-3 text-sm font-medium
                  transition-colors motion-reduce:transition-none
                  ${
                    active
                      ? "border-emerald-300/15 bg-emerald-400/10 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.08)]"
                      : "border-slate-600/30 text-slate-300/60 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }
                `;
              }}>
              <Icon
                size={19}
                strokeWidth={1.8}
                className="shrink-0"
                aria-hidden="true"
              />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="min-h-4 flex-1" />

      <SidebarLandscape />

      <div className="mt-4 shrink-0 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="size-10 shrink-0 rounded-full border border-emerald-300/40 object-cover"
            />
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-300 font-bold text-[#052016]">
              {initial}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-100">
              {displayName}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          {isGoogle ? (
            <FcGoogle size={15} aria-hidden="true" />
          ) : (
            <MdOutlineMail
              size={16}
              className="text-emerald-300"
              aria-hidden="true"
            />
          )}
          <span>{isGoogle ? "Google account" : "Email account"}</span>
        </div> */}

        {error && (
          <p role="alert" className="mt-3 text-xs text-red-300">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="
            mt-4 flex min-h-11 w-full items-center justify-center
            gap-2 rounded-xl border border-white/10 bg-white/[0.03]
            px-4 py-2.5 text-sm text-slate-300
            transition-colors hover:border-red-300/25
            hover:bg-red-400/10 hover:text-red-200
            disabled:cursor-wait disabled:opacity-60
          ">
          <LogOut size={16} aria-hidden="true" />
          {loggingOut ? "Logging out…" : "Log out"}
        </button>
      </div>
    </aside>
  );
}
