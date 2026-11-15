// // src/components/BottomNav.jsx

// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   // CalendarDays,
//   Timer,
//   BookOpen,
//   FileText,
//   BarChart3,
// } from "lucide-react";

// const BottomNav = () => {
//   const links = [
//     { to: "/dashboard", label: "Home", icon: LayoutDashboard },
//     // { to: "/timetable", label: "Plan", icon: CalendarDays },
//     { to: "/focus", label: "Focus", icon: Timer },
//     { to: "/notes", label: "Notes", icon: BookOpen },
//     { to: "/practice", label: "Practice", icon: FileText },
//     { to: "/insights", label: "Stats", icon: BarChart3 },
//   ];

//   return (
//     <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0e1424]/95 backdrop-blur-xl py-2 rounded-t-3xl">
//       <div className="flex items-center justify-around px-2 py-2 ">
//         {links.map((link) => (
//           <NavLink
//             key={link.to}
//             to={link.to}
//             className={({ isActive }) =>
//               `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] transition ${
//                 isActive
//                   ? "text-indigo-300"
//                   : "text-white/40 hover:text-white/70"
//               }`
//             }>
//             {({ isActive }) => (
//               <>
//                 <link.icon
//                   size={20}
//                   className={isActive ? "text-indigo-300" : ""}
//                 />
//                 <span className={isActive ? "font-semibold" : ""}>
//                   {link.label}
//                 </span>
//               </>
//             )}
//           </NavLink>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default BottomNav;

import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
} from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/practice", label: "Practice", icon: FileText },
  { to: "/insights", label: "Stats", icon: BarChart3 },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="
        fixed inset-x-0 bottom-0 z-50 rounded-t-2xl
        border-t border-emerald-300/15 bg-[#070e20]/95
        px-2 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]
        backdrop-blur-xl lg:hidden
      "
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
      }}>
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
        {LINKS.map(({ to, label, icon: Icon }) => {
          const isDashboardRoot = to === "/dashboard" && pathname === "/";

          return (
            <NavLink
              key={to}
              to={to}
              aria-current={isDashboardRoot ? "page" : undefined}
              className={({ isActive }) => `
                flex min-h-14 min-w-0 flex-col items-center
                justify-center gap-1 rounded-xl px-1 py-2
                text-[10px] font-medium transition-colors
                ${
                  isActive || isDashboardRoot
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                }
              `}>
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              <span className="text-[10px] text-slate-600">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
