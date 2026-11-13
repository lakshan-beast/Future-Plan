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
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
  // Sparkles,
  Trophy,
  LogOut,
} from "lucide-react";
import { GiDreamCatcher } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/practice", label: "Practice", icon: FileText },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  {
    to: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
];

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const provider = user?.providerData?.[0]?.providerId;
  const isGoogle = provider === "google.com";

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <aside className="fixed hidden lg:flex w-72 flex-col border-r rounded-r-3xl border-white/10 bg-white/4 backdrop-blur-xl p-5 h-dvh">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-bl-2xl rounded-tr-2xl rounded-br-md rounded-tl-md bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <GiDreamCatcher size={30} className="text-emerald-100" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Dream<span className="text-emerald-300">U</span>Track
        </h1>
      </div>

      {/* Nav links */}
      <nav aria-label="Main navigation" className="flex-1 space-y-1.5">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            className={({ isActive }) =>
              `flex items-center gap-5 rounded-xl px-4 py-3 text-sm font-body mt-1 transition ${
                isActive
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "border border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
              }`
            }>
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Profile — bottom */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Profile"}
              className="w-10 h-10 rounded-full object-cover border border-emerald-50/0 outline-2 outline-emerald-400/90"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="font-heading text-sm font-bold font-sans text-emerald-950">
                {(user?.displayName || user?.email || "U")[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-body text-sm font-medium truncate">
              {user?.displayName || "Student"}
            </p>
            <p className="font-body text-xs text-white/40 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Provider badge */}
        <div className="flex items-center justify-center gap-2 mb-3 py-1 ">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            {isGoogle ? (
              <FcGoogle size={14} />
            ) : (
              <MdOutlineMail size={14} className="text-white/60" />
            )}
          </div>
          <span className="font-body text-xs text-white/40">
            {isGoogle ? "Google account" : "Email account"}
          </span>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 border border-red-300/30 rounded-xl px-4 py-2.5 text-sm font-body text-red-300 hover:bg-red-500/10 hover:border-red-500/30 transition">
          <LogOut size={16} />
          Log out
        </button>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
