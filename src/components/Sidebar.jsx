import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  // BarChart3,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { to: "/timetable", label: "Timetable", icon: <CalendarDays size={18} /> },
    { to: "/focus", label: "Focus", icon: <Timer size={18} /> },
    { to: "/notes", label: "Notes", icon: <BookOpen size={18} /> },
    { to: "/practice", label: "Practice", icon: <FileText size={18} /> },
    // { to: "/insights", label: "Insights", icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold">
          Dream<span className="text-indigo-300">U</span>Track
        </h1>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-indigo-500/20 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`
            }>
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
