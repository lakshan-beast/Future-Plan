// src/components/dashboard/dashboardConfig.js
import {
  CalendarDays,
  Timer,
  BookOpen,
  FileText,
  BarChart3,
  Calculator,
  Ruler,
  Calendar,
  Trophy,
  Pin,
} from "lucide-react";

export const QUICK_LINKS = [
  {
    path: "/timetable",
    label: "Timetable",
    icon: CalendarDays,
    color: "from-indigo-500/30 to-indigo-500/3",
    iconColor: "text-indigo-300",
  },
  {
    path: "/focus",
    label: "Focus",
    icon: Timer,
    color: "from-emerald-500/30 to-emerald-500/3",
    iconColor: "text-emerald-300",
  },
  {
    path: "/notes",
    label: "Notes",
    icon: BookOpen,
    color: "from-purple-500/30 to-purple-500/3",
    iconColor: "text-purple-300",
  },
  {
    path: "/practice",
    label: "Practice",
    icon: FileText,
    color: "from-orange-500/30 to-orange-500/3",
    iconColor: "text-orange-300",
  },
  {
    path: "/insights",
    label: "Insights",
    icon: BarChart3,
    color: "from-pink-500/30 to-pink-500/3",
    iconColor: "text-pink-300",
  },
  {
    path: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    color: "from-slate-500/30 to-slate-500/3",
    iconColor: "text-slate-300",
  },
  {
    path: "/onboarding",
    label: "OnBoarding",
    icon: Pin,
    color: "from-yellow-500/30 to-yellow-500/5",
    iconColor: "text-yellow-300",
  },
];

export const TOOLS = [
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