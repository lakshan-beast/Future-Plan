// src/components/dashboard/QuickLinks.jsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { QUICK_LINKS } from "./dashboardConfig";

const QuickLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mb-6">
    <h3 className="font-heading text-lg font-bold mb-3">Quick Links</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {QUICK_LINKS.map(({ path, label, icon: Icon, color, iconColor }) => (
        <Link
          key={path}
          to={path}
          className={`rounded-2xl border border-white/5 bg-gradient-to-br ${color} backdrop-blur-xl p-4 hover:border-white/20 transition group`}>
          <Icon size={26} className={`${iconColor} mb-2`} />
          <p className="font-body text-sm font-medium">{label}</p>
          <span className="text-white/50 flex items-center justify-center gap-3 text-[11px] mt-4 pt-1">
            Open Page{" "}
            <ChevronRight
              size={14}
              className="text-white/30 group-hover:text-white/60 transition mt-1"
            />
          </span>
        </Link>
      ))}
    </div>
  </motion.div>
);

export default QuickLinks;
