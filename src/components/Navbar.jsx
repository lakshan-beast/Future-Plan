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
import { Link, useLocation } from "react-router-dom";
// import { motion } from "motion/react";
import {
  Home,
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
//   GiDreamCatcher,
} from "lucide-react";
import { GiDreamCatcher } from "react-icons/gi";

const NAV_LINKS = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/timetable", label: "Timetable", icon: CalendarDays },
  { path: "/focus", label: "Focus", icon: Timer },
  { path: "/notes", label: "Notes", icon: BookOpen },
  { path: "/practice", label: "Practice", icon: FileText },
  { path: "/insights", label: "Insights", icon: BarChart3 },
];

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl  lg:hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 lg:px-8 py-6">
        {/* Logo + current page */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <GiDreamCatcher className="text-white text-4xl" />
            <span className="font-heading font-bold text-lg text-white">
              DreamTrack
            </span>
          </Link>
          <span className="hidden sm:inline text-white/30">/</span>
          <span className="hidden sm:inline font-body text-sm text-white/60">
            {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body transition-colors ${
                isActive(link.path)
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}>
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: current page only */}
        <span className="md:hidden font-body text-sm text-white/60">
          {NAV_LINKS.find((l) => isActive(l.path))?.label || "Dashboard"}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
