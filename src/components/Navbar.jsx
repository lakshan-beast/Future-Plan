// // src/components/Navbar.jsx
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Home,
//   CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
//   Menu,
//   X,
//   Sparkles,
// } from "lucide-react";

// const NAV_LINKS = [
//   { path: "/dashboard", label: "Dashboard", icon: Home },
//   { path: "/timetable", label: "Timetable", icon: CalendarDays },
//   { path: "/focus", label: "Focus", icon: Timer },
//   { path: "/notes", label: "Notes", icon: BookOpen },
//   { path: "/practice", label: "Practice", icon: FileText },
//   { path: "/insights", label: "Insights", icon: BarChart3 },
// ];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       {/* Desktop navbar */}
//       <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-[#0b1020]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
//         {/* Logo */}
//         <Link to="/dashboard" className="flex items-center gap-2">
//           <Sparkles size={24} className="text-indigo-400" />
//           <span className="font-heading font-bold text-xl text-white">
//             DreamTrack
//           </span>
//         </Link>

//         {/* Nav links */}
//         <div className="flex items-center gap-1">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body transition-colors ${
//                 isActive(link.path)
//                   ? "bg-indigo-500/20 text-indigo-300"
//                   : "text-white/60 hover:text-white hover:bg-white/5"
//               }`}>
//               <link.icon size={16} />
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       </nav>

//       {/* Mobile navbar */}
//       <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0b1020]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
//         {/* Logo */}
//         <Link to="/dashboard" className="flex items-center gap-2">
//           <Sparkles size={20} className="text-indigo-400" />
//           <span className="font-heading font-bold text-lg text-white">
//             DreamTrack
//           </span>
//         </Link>

//         {/* Hamburger */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5">
//           {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </nav>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden bg-[#0b1020]/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-2">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-colors ${
//                   isActive(link.path)
//                     ? "bg-indigo-500/20 text-indigo-300"
//                     : "text-white/60 hover:text-white hover:bg-white/5"
//                 }`}>
//                 <link.icon size={18} />
//                 {link.label}
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
// import { Link, useLocation } from "react-router-dom";
// // import { motion } from "motion/react";
// import {
//   Home,
//   CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
// //   GiDreamCatcher,
// } from "lucide-react";
// import { GiDreamCatcher } from "react-icons/gi";

// const NAV_LINKS = [
//   { path: "/dashboard", label: "Dashboard", icon: Home },
//   { path: "/timetable", label: "Timetable", icon: CalendarDays },
//   { path: "/focus", label: "Focus", icon: Timer },
//   { path: "/notes", label: "Notes", icon: BookOpen },
//   { path: "/practice", label: "Practice", icon: FileText },
//   { path: "/insights", label: "Insights", icon: BarChart3 },
// ];

// const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl  lg:hidden">
//       <div className="flex items-center justify-between px-5 sm:px-6 lg:px-8 py-6">
//         {/* Logo + current page */}
//         <div className="flex items-center gap-3">
//           <Link to="/dashboard" className="flex items-center gap-2">
//             <GiDreamCatcher className="text-white text-4xl" />
//             <span className="font-heading font-bold text-lg text-white">
//               DreamTrack
//             </span>
//           </Link>
//           <span className="hidden sm:inline text-white/30">/</span>
//           <span className="hidden sm:inline font-body text-sm text-white/60">
//             {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
//           </span>
//         </div>

//         {/* Nav links */}
//         <nav className="hidden md:flex items-center gap-1">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               aria-current={isActive(link.path) ? "page" : undefined}
//               className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body transition-colors ${
//                 isActive(link.path)
//                   ? "bg-indigo-500/20 text-indigo-300"
//                   : "text-white/60 hover:text-white hover:bg-white/5"
//               }`}>
//               <link.icon size={16} />
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile: current page only */}
//         <span className="md:hidden font-body text-sm text-white/60">
//           {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { motion } from "motion/react";
// import {
//   Home,
//   CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
//   Sparkles,
//   LogOut,
// } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineMail } from "react-icons/md";

// const NAV_LINKS = [
//   { path: "/dashboard", label: "Dashboard", icon: Home },
//   { path: "/timetable", label: "Timetable", icon: CalendarDays },
//   { path: "/focus", label: "Focus", icon: Timer },
//   { path: "/notes", label: "Notes", icon: BookOpen },
//   { path: "/practice", label: "Practice", icon: FileText },
//   { path: "/insights", label: "Insights", icon: BarChart3 },
// ];

// const Navbar = () => {
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   const provider = user?.providerData?.[0]?.providerId;
//   const isGoogle = provider === "google.com";

//   const handleLogout = async () => {
//     await auth.signOut();
//     window.location.href = "/login";
//   };

//   return (
//     <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl">
//       <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
//         {/* Logo + current page */}
//         <div className="flex items-center gap-3 min-w-0">
//           <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
//               <Sparkles size={18} className="text-emerald-950" />
//             </div>
//             <span className="font-heading font-bold text-lg text-white hidden sm:inline">
//               Dream<span className="text-emerald-300">U</span>Track
//             </span>
//           </Link>

//           <span className="hidden md:inline text-white/20">/</span>
//           <span className="hidden md:inline font-body text-sm text-white/60 truncate">
//             {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
//           </span>
//         </div>

//         {/* Desktop nav links */}
//         <nav
//           aria-label="Main navigation"
//           className="hidden lg:flex items-center gap-1"
//         >
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               aria-current={isActive(link.path) ? "page" : undefined}
//               className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-body transition-colors ${
//                 isActive(link.path)
//                   ? "bg-emerald-400/15 text-emerald-300"
//                   : "text-white/60 hover:text-white hover:bg-white/5"
//               }`}
//             >
//               <link.icon size={16} />
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Right side — profile */}
//         <div className="flex items-center gap-2">
//           {/* Mobile: current page label */}
//           <span className="lg:hidden font-body text-sm text-white/60 truncate max-w-[120px]">
//             {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
//           </span>

//           {/* Profile avatar + dropdown */}
//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Open profile menu"
//               aria-expanded={menuOpen}
//               className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400/30 flex items-center justify-center bg-white/5 hover:border-emerald-400/60 transition"
//             >
//               {user?.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt={user.displayName || "Profile"}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="font-heading text-sm font-bold text-emerald-300">
//                   {(user?.displayName || user?.email || "U")[0].toUpperCase()}
//                 </span>
//               )}
//             </button>

//             {/* Dropdown menu */}
//             {menuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8, scale: 0.96 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -8, scale: 0.96 }}
//                 className="absolute right-0 top-12 w-56 rounded-2xl border border-white/10 bg-[#0e1424]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
//               >
//                 {/* User info */}
//                 <div className="p-4 border-b border-white/10">
//                   <div className="flex items-center gap-3">
//                     {user?.photoURL ? (
//                       <img
//                         src={user.photoURL}
//                         alt={user.displayName || "Profile"}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
//                         <span className="font-heading text-sm font-bold text-emerald-950">
//                           {(user?.displayName || user?.email || "U")[0].toUpperCase()}
//                         </span>
//                       </div>
//                     )}
//                     <div className="min-w-0">
//                       <p className="font-body text-sm font-medium truncate">
//                         {user?.displayName || "Student"}
//                       </p>
//                       <p className="font-body text-xs text-white/40 truncate">
//                         {user?.email}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Provider badge */}
//                   <div className="mt-3 flex items-center gap-2">
//                     <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
//                       {isGoogle ? (
//                         <FcGoogle size={14} />
//                       ) : (
//                         <MdOutlineMail size={14} className="text-white/60" />
//                       )}
//                     </div>
//                     <span className="font-body text-xs text-white/40">
//                       {isGoogle ? "Google account" : "Email account"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Logout */}
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-red-300 hover:bg-red-500/10 transition"
//                 >
//                   <LogOut size={16} />
//                   Log out
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion, AnimatePresence } from "motion/react";
import { LogOut } from "lucide-react";
import { GiDreamCatcher } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="lg:hidden fixed top-3 left-0 right-0 z-40 px-2 pb-2 bg-gradient-to-b from-[#0b1020] to-transparent pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between rounded-full border border-white/15 bg-[#0e1424]/10 backdrop-blur-xl shadow-lg shadow-black/20 pr-3 pl-5 py-3">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-bl-2xl rounded-tr-2xl rounded-br-md rounded-tl-md bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <GiDreamCatcher size={24} className="text-emerald-100" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Dream<span className="text-emerald-300">U</span>Track
          </h1>
        </Link>

        {/* Avatar + menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open profile menu"
            aria-expanded={menuOpen}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/30 flex items-center justify-center bg-white/5 active:scale-95 transition">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-heading text-sm font-bold text-emerald-300">
                {(user?.displayName || user?.email || "U")[0].toUpperCase()}
              </span>
            )}
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute -right-1 top-14 w-80 rounded-2xl border border-white/10 bg-[#0e1424]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "Profile"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <span className="font-heading text-sm font-bold text-emerald-950">
                          {(user?.displayName ||
                            user?.email ||
                            "U")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium truncate">
                        {user?.displayName || "Student"}
                      </p>
                      <p className="font-body text-xs text-white/40 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Member since — NEW */}
                  <p className="font-body text-[11px] text-white/30 mt-2 pt-2 border-t border-t-slate-100/10">
                    Member since{" "}  
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "—"}
                  </p>

                  <div className="mt-3 flex items-center  gap-2">
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
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-body text-red-300 hover:bg-red-500/10 transition">
                  <LogOut size={16} />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
