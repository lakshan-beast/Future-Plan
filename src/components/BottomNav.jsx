// src/components/BottomNav.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
} from "lucide-react";

const BottomNav = () => {
  const links = [
    { to: "/dashboard", label: "Home", icon: LayoutDashboard },
    { to: "/timetable", label: "Plan", icon: CalendarDays },
    { to: "/focus", label: "Focus", icon: Timer },
    { to: "/notes", label: "Notes", icon: BookOpen },
    { to: "/practice", label: "Practice", icon: FileText },
    { to: "/insights", label: "Stats", icon: BarChart3 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0e1424]/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] transition ${
                isActive
                  ? "text-indigo-300"
                  : "text-white/40 hover:text-white/70"
              }`
            }>
            {({ isActive }) => (
              <>
                <link.icon
                  size={20}
                  className={isActive ? "text-indigo-300" : ""}
                />
                <span className={isActive ? "font-semibold" : ""}>
                  {link.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
