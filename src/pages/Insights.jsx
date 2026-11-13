// import { useState, useMemo } from "react";
// import { motion } from "motion/react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Minus,
//   Award,
//   AlertTriangle,
//   Clock,
//   Lightbulb,
//   BarChart3,
//   Activity,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
// } from "recharts";

// const SUBJECT_COLORS = [
//   "#60a5fa",
//   "#a78bfa",
//   "#34d399",
//   "#f472b6",
//   "#fbbf24",
//   "#fb923c",
//   "#22d3ee",
//   "#a3e635",
//   "#f87171",
//   "#c084fc",
// ];

// const getSubjectColor = (index) => {
//   return SUBJECT_COLORS[index % SUBJECT_COLORS.length];
// };

// const Insights = () => {
//   // ---------------- Papers state ----------------
//   const [papers] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-papers");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Focus history state ----------------
//   const [focusHistory] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-focus-history");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Subject-wise performance ----------------
//   const subjectPerformance = useMemo(() => {
//     const groups = {};

//     papers.forEach((p) => {
//       if (!groups[p.subject]) {
//         groups[p.subject] = { total: 0, count: 0 };
//       }
//       groups[p.subject].total += p.percentage;
//       groups[p.subject].count++;
//     });

//     return Object.entries(groups).map(([subject, data], i) => ({
//       subject,
//       average: Math.round(data.total / data.count),
//       count: data.count,
//       color: getSubjectColor(i),
//     }));
//   }, [papers]);

//   // ---------------- Marks trend (chronological) ----------------
//   const marksTrend = useMemo(() => {
//     return papers
//       .slice()
//       .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//       .map((p, i) => ({
//         name: p.paperName || `P${i + 1}`,
//         marks: p.percentage,
//         subject: p.subject,
//       }));
//   }, [papers]);

//   // ---------------- Weak areas (inline trend logic) ----------------
//   const weakAreas = useMemo(() => {
//     return subjectPerformance
//       .filter((s) => s.average < 60)
//       .sort((a, b) => a.average - b.average)
//       .map((s) => {
//         const subjectPapers = papers
//           .filter((p) => p.subject === s.subject)
//           .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

//         let trend = "stable";
//         if (subjectPapers.length >= 2) {
//           const first = subjectPapers[0].percentage;
//           const last = subjectPapers[subjectPapers.length - 1].percentage;
//           if (last > first + 5) trend = "improving";
//           else if (last < first - 5) trend = "declining";
//         }

//         return { ...s, trend };
//       });
//   }, [subjectPerformance, papers]);

//   // ---------------- Error analysis ----------------
//   const errorAnalysis = useMemo(() => {
//     const errorCounts = {};

//     papers.forEach((p) => {
//       p.errors.forEach((err) => {
//         if (!errorCounts[err]) {
//           errorCounts[err] = 0;
//         }
//         errorCounts[err]++;
//       });
//     });

//     return Object.entries(errorCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([tag, count]) => ({
//         tag,
//         count,
//       }));
//   }, [papers]);

//   // ---------------- Focus time by subject ----------------
//   const focusBySubject = useMemo(() => {
//     const groups = {};

//     focusHistory.forEach((session) => {
//       if (!groups[session.subject]) {
//         groups[session.subject] = 0;
//       }
//       groups[session.subject] += session.duration;
//     });

//     return Object.entries(groups).map(([subject, mins]) => ({
//       subject,
//       minutes: mins,
//     }));
//   }, [focusHistory]);

//   // ---------------- Overall stats ----------------
//   const overallStats = useMemo(() => {
//     if (papers.length === 0) {
//       return {
//         avgMarks: 0,
//         totalPapers: 0,
//         trend: "stable",
//         totalFocusMinutes: 0,
//       };
//     }

//     const avgMarks = Math.round(
//       papers.reduce((sum, p) => sum + p.percentage, 0) / papers.length,
//     );

//     const sortedPapers = papers
//       .slice()
//       .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

//     const first = sortedPapers[0].percentage;
//     const last = sortedPapers[sortedPapers.length - 1].percentage;

//     const trend =
//       last > first + 5
//         ? "improving"
//         : last < first - 5
//           ? "declining"
//           : "stable";

//     const totalFocusMinutes = focusHistory.reduce(
//       (sum, s) => sum + s.duration,
//       0,
//     );

//     return {
//       avgMarks,
//       totalPapers: papers.length,
//       trend,
//       totalFocusMinutes,
//     };
//   }, [papers, focusHistory]);

//   // ---------------- Recommendations ----------------
//   const recommendations = useMemo(() => {
//     const recs = [];

//     weakAreas.forEach((area) => {
//       recs.push({
//         type: "weak-subject",
//         icon: <AlertTriangle size={16} className="text-orange-400" />,
//         message: `${area.subject} marks අඩුයි (average ${area.average}%) — මේ subject එකට වැඩියෙන් focus කරන්න`,
//       });
//     });

//     if (focusBySubject.length > 0) {
//       const totalFocus = focusBySubject.reduce((sum, f) => sum + f.minutes, 0);
//       const avgFocus = totalFocus / focusBySubject.length;

//       focusBySubject.forEach((f) => {
//         if (f.minutes < avgFocus * 0.5) {
//           recs.push({
//             type: "low-focus",
//             icon: <Clock size={16} className="text-blue-400" />,
//             message: `${f.subject} focus time අඩුයි (${f.minutes}m) — මේ subject එකට sessions වැඩි කරන්න`,
//           });
//         }
//       });
//     }

//     if (errorAnalysis.length > 0) {
//       const topError = errorAnalysis[0];
//       recs.push({
//         type: "error-pattern",
//         icon: <AlertTriangle size={16} className="text-red-400" />,
//         message: `“${topError.tag.replace(/-/g, " ")}” කියන error එක වැඩියි (${topError.count} පාරක්) — මේකට targeted practice කරන්න`,
//       });
//     }

//     if (recs.length === 0) {
//       recs.push({
//         type: "no-data",
//         icon: <Lightbulb size={16} className="text-yellow-400" />,
//         message: "වැඩි papers සහ focus sessions add කරලා insights ලබාගන්න",
//       });
//     }

//     return recs;
//   }, [weakAreas, focusBySubject, errorAnalysis]);

//   // ---------------- Radar chart data ----------------
//   const radarData = useMemo(() => {
//     return subjectPerformance.map((s) => ({
//       subject: s.subject,
//       value: s.average,
//     }));
//   }, [subjectPerformance]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <BarChart3 size={24} className="text-indigo-300" />
//             Insights
//           </h1>
//           <p className="text-sm text-white/60 mt-1">
//             Analyze your performance, find weak areas, and improve.
//           </p>
//         </div>

//         {/* Overall stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <Award size={16} />
//               Average Marks
//             </div>
//             <div className="text-3xl font-bold">{overallStats.avgMarks}%</div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               {overallStats.trend === "improving" ? (
//                 <TrendingUp size={16} className="text-emerald-400" />
//               ) : overallStats.trend === "declining" ? (
//                 <TrendingDown size={16} className="text-red-400" />
//               ) : (
//                 <Minus size={16} className="text-white/40" />
//               )}
//               Trend
//             </div>
//             <div
//               className={`text-xl font-bold capitalize ${
//                 overallStats.trend === "improving"
//                   ? "text-emerald-400"
//                   : overallStats.trend === "declining"
//                     ? "text-red-400"
//                     : "text-white/60"
//               }`}>
//               {overallStats.trend}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <Activity size={16} />
//               Papers
//             </div>
//             <div className="text-3xl font-bold">{overallStats.totalPapers}</div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <Clock size={16} />
//               Focus Time
//             </div>
//             <div className="text-3xl font-bold">
//               {Math.floor(overallStats.totalFocusMinutes / 60)}h{" "}
//               {overallStats.totalFocusMinutes % 60}m
//             </div>
//           </motion.div>
//         </div>

//         {/* Subject performance + Radar */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Subject performance bars */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//             <h3 className="font-semibold mb-4">Subject Performance</h3>

//             {subjectPerformance.length === 0 ? (
//               <p className="text-sm text-white/40">
//                 No papers yet. Add paper results to see insights.
//               </p>
//             ) : (
//               <div className="h-64 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={subjectPerformance}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#ffffff20"
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="subject"
//                       stroke="#ffffff60"
//                       fontSize={10}
//                       angle={-45}
//                       textAnchor="end"
//                       height={70}
//                     />
//                     <YAxis domain={[0, 100]} stroke="#ffffff60" fontSize={12} />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1a2235",
//                         border: "1px solid #ffffff20",
//                         borderRadius: "12px",
//                       }}
//                     />
//                     <Bar
//                       dataKey="average"
//                       fill="#818cf8"
//                       radius={[8, 8, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </motion.div>

//           {/* Radar chart */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//             <h3 className="font-semibold mb-4">Subject Balance</h3>

//             {radarData.length === 0 ? (
//               <p className="text-sm text-white/40">No data yet.</p>
//             ) : (
//               <div className="h-64 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RadarChart data={radarData}>
//                     <PolarGrid stroke="#ffffff20" />
//                     <PolarAngleAxis
//                       dataKey="subject"
//                       stroke="#ffffff60"
//                       fontSize={10}
//                     />
//                     <PolarRadiusAxis
//                       domain={[0, 100]}
//                       stroke="#ffffff40"
//                       fontSize={10}
//                     />
//                     <Radar
//                       dataKey="value"
//                       stroke="#818cf8"
//                       fill="#818cf8"
//                       fillOpacity={0.3}
//                       strokeWidth={2}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1a2235",
//                         border: "1px solid #ffffff20",
//                         borderRadius: "12px",
//                       }}
//                     />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Marks trend */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
//           <h3 className="font-semibold mb-4">Marks Trend Over Time</h3>

//           {marksTrend.length === 0 ? (
//             <p className="text-sm text-white/40">No papers yet.</p>
//           ) : (
//             <div className="h-64 w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={marksTrend}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#ffffff20"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     stroke="#ffffff60"
//                     fontSize={10}
//                     angle={-45}
//                     textAnchor="end"
//                     height={70}
//                   />
//                   <YAxis domain={[0, 100]} stroke="#ffffff60" fontSize={12} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1a2235",
//                       border: "1px solid #ffffff20",
//                       borderRadius: "12px",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="marks"
//                     stroke="#818cf8"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </motion.div>

//         {/* Weak areas + Error analysis */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Weak areas */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//             <h3 className="font-semibold mb-4 flex items-center gap-2">
//               <AlertTriangle size={18} className="text-orange-400" />
//               Areas Needing Attention
//             </h3>

//             {weakAreas.length === 0 ? (
//               <p className="text-sm text-white/40">
//                 No weak areas detected. Keep it up!
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {weakAreas.map((area, i) => (
//                   <motion.div
//                     key={area.subject}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     className="rounded-xl border border-white/10 bg-white/5 p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="font-medium">{area.subject}</span>
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           area.trend === "declining"
//                             ? "bg-red-500/20 text-red-300"
//                             : area.trend === "improving"
//                               ? "bg-emerald-500/20 text-emerald-300"
//                               : "bg-white/10 text-white/50"
//                         }`}>
//                         {area.trend}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-white/60">
//                       <span>Average: {area.average}%</span>
//                       <span>·</span>
//                       <span>{area.count} papers</span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </motion.div>

//           {/* Error analysis */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//             <h3 className="font-semibold mb-4">Common Errors</h3>

//             {errorAnalysis.length === 0 ? (
//               <p className="text-sm text-white/40">No error data yet.</p>
//             ) : (
//               <div className="space-y-3">
//                 {errorAnalysis.map((err, i) => {
//                   const maxCount = errorAnalysis[0].count;
//                   const width = (err.count / maxCount) * 100;

//                   return (
//                     <div key={err.tag}>
//                       <div className="flex items-center justify-between text-sm mb-1">
//                         <span className="text-white/70 capitalize">
//                           {err.tag.replace(/-/g, " ")}
//                         </span>
//                         <span className="text-white/40">{err.count}</span>
//                       </div>
//                       <div className="h-2 rounded-full bg-white/10 overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${width}%` }}
//                           transition={{ delay: i * 0.05, duration: 0.5 }}
//                           className="h-full bg-gradient-to-r from-orange-500 to-red-500"
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Focus time by subject */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.9 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
//           <h3 className="font-semibold mb-4">Focus Time by Subject</h3>

//           {focusBySubject.length === 0 ? (
//             <p className="text-sm text-white/40">No focus sessions yet.</p>
//           ) : (
//             <div className="h-64 w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={focusBySubject}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#ffffff20"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="subject"
//                     stroke="#ffffff60"
//                     fontSize={10}
//                     angle={-45}
//                     textAnchor="end"
//                     height={70}
//                   />
//                   <YAxis stroke="#ffffff60" fontSize={12} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1a2235",
//                       border: "1px solid #ffffff20",
//                       borderRadius: "12px",
//                     }}
//                   />
//                   <Bar dataKey="minutes" fill="#34d399" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </motion.div>

//         {/* Recommendations */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.0 }}
//           className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//           <h3 className="font-semibold mb-4 flex items-center gap-2">
//             <Lightbulb size={18} className="text-yellow-400" />
//             Recommendations
//           </h3>

//           <div className="space-y-3">
//             {recommendations.map((rec, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
//                 {rec.icon}
//                 <p className="text-sm text-white/70">{rec.message}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Insights;

// src/pages/Insights.jsx
import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  AlertTriangle,
  Clock,
  Lightbulb,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const EMERALD = "#34d399";
const TEAL = "#2dd4bf";

const truncate = (str, len = 8) =>
  str && str.length > len ? `${str.slice(0, len)}…` : str;

const tooltipStyle = {
  backgroundColor: "#0e1424",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  fontSize: "12px",
};

export default function Insights() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [focusHistory, setFocusHistory] = useState([]);

  // ---------------- Auth + data load ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        const savedPapers = localStorage.getItem(`dreamutrack-papers-${uid}`);
        setPapers(savedPapers ? JSON.parse(savedPapers) : []);

        const savedFocus = localStorage.getItem(
          `dreamutrack-focus-history-${uid}`,
        );
        setFocusHistory(savedFocus ? JSON.parse(savedFocus) : []);
      } else {
        setPapers([]);
        setFocusHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Subject performance ----------------
  const subjectPerformance = useMemo(() => {
    const groups = {};

    papers.forEach((p) => {
      if (!groups[p.subject]) {
        groups[p.subject] = { total: 0, count: 0 };
      }
      groups[p.subject].total += p.percentage;
      groups[p.subject].count++;
    });

    return Object.entries(groups).map(([subject, data]) => ({
      subject,
      average: Math.round(data.total / data.count),
      count: data.count,
    }));
  }, [papers]);

  // ---------------- Marks trend ----------------
  const marksTrend = useMemo(() => {
    return papers
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((p, i) => ({
        name: p.paperName || `P${i + 1}`,
        marks: p.percentage,
      }));
  }, [papers]);

  // ---------------- Weak areas ----------------
  const weakAreas = useMemo(() => {
    return subjectPerformance
      .filter((s) => s.average < 60)
      .sort((a, b) => a.average - b.average)
      .map((s) => {
        const subjectPapers = papers
          .filter((p) => p.subject === s.subject)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        let trend = "stable";
        if (subjectPapers.length >= 2) {
          const first = subjectPapers[0].percentage;
          const last = subjectPapers[subjectPapers.length - 1].percentage;
          if (last > first + 5) trend = "improving";
          else if (last < first - 5) trend = "declining";
        }

        return { ...s, trend };
      });
  }, [subjectPerformance, papers]);

  // ---------------- Error analysis ----------------
  const errorAnalysis = useMemo(() => {
    const errorCounts = {};

    papers.forEach((p) => {
      (p.errors || []).forEach((err) => {
        errorCounts[err] = (errorCounts[err] || 0) + 1;
      });
    });

    return Object.entries(errorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));
  }, [papers]);

  // ---------------- Focus by subject ----------------
  const focusBySubject = useMemo(() => {
    const groups = {};

    focusHistory.forEach((session) => {
      groups[session.subject] =
        (groups[session.subject] || 0) + session.duration;
    });

    return Object.entries(groups).map(([subject, minutes]) => ({
      subject,
      minutes,
    }));
  }, [focusHistory]);

  // ---------------- Overall stats ----------------
  const overallStats = useMemo(() => {
    if (papers.length === 0) {
      return {
        avgMarks: 0,
        totalPapers: 0,
        trend: "stable",
        totalFocusMinutes: 0,
      };
    }

    const avgMarks = Math.round(
      papers.reduce((sum, p) => sum + p.percentage, 0) / papers.length,
    );

    const sorted = papers
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const first = sorted[0].percentage;
    const last = sorted[sorted.length - 1].percentage;

    const trend =
      last > first + 5
        ? "improving"
        : last < first - 5
          ? "declining"
          : "stable";

    const totalFocusMinutes = focusHistory.reduce(
      (sum, s) => sum + s.duration,
      0,
    );

    return {
      avgMarks,
      totalPapers: papers.length,
      trend,
      totalFocusMinutes,
    };
  }, [papers, focusHistory]);

  // ---------------- Recommendations ----------------
  const recommendations = useMemo(() => {
    const recs = [];

    weakAreas.forEach((area) => {
      recs.push({
        icon: <AlertTriangle size={16} className="text-orange-400" />,
        message: `${area.subject} marks අඩුයි (average ${area.average}%) — මේ subject එකට වැඩියෙන් focus කරන්න`,
      });
    });

    if (focusBySubject.length > 0) {
      const total = focusBySubject.reduce((s, f) => s + f.minutes, 0);
      const avg = total / focusBySubject.length;

      focusBySubject.forEach((f) => {
        if (f.minutes < avg * 0.5) {
          recs.push({
            icon: <Clock size={16} className="text-blue-400" />,
            message: `${f.subject} focus time අඩුයි (${f.minutes}m) — sessions වැඩි කරන්න`,
          });
        }
      });
    }

    if (errorAnalysis.length > 0) {
      const top = errorAnalysis[0];
      recs.push({
        icon: <AlertTriangle size={16} className="text-red-400" />,
        message: `“${top.tag.replace(/-/g, " ")}” error එක වැඩියි (${top.count} පාරක්) — targeted practice කරන්න`,
      });
    }

    if (recs.length === 0) {
      recs.push({
        icon: <Lightbulb size={16} className="text-yellow-400" />,
        message: "වැඩි papers සහ focus sessions add කරලා insights ලබාගන්න",
      });
    }

    return recs;
  }, [weakAreas, focusBySubject, errorAnalysis]);

  // ---------------- Radar data ----------------
  const radarData = useMemo(() => {
    return subjectPerformance.map((s) => ({
      subject: truncate(s.subject, 6),
      value: s.average,
    }));
  }, [subjectPerformance]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <p className="font-body text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 pt-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <BarChart3 size={24} className="text-emerald-300" />
          Insights
        </h1>
        <p className="font-body text-sm leading-tight text-white/50 mt-1">
          Analyze your performance, find weak areas, and improve.
        </p>
      </div>

      {/* Stats — 2 cols mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-8">
        {[
          {
            icon: <Award size={16} className="text-emerald-300" />,
            label: "Average",
            value: `${overallStats.avgMarks}%`,
          },
          {
            icon:
              overallStats.trend === "improving" ? (
                <TrendingUp size={16} className="text-emerald-300" />
              ) : overallStats.trend === "declining" ? (
                <TrendingDown size={16} className="text-red-400" />
              ) : (
                <Minus size={16} className="text-white/40" />
              ),
            label: "Trend",
            value: overallStats.trend,
          },
          {
            icon: <Activity size={16} className="text-teal-300" />,
            label: "Papers",
            value: overallStats.totalPapers,
          },
          {
            icon: <Clock size={16} className="text-blue-300" />,
            label: "Focus",
            value: `${Math.floor(overallStats.totalFocusMinutes / 60)}h ${
              overallStats.totalFocusMinutes % 60
            }m`,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5">
              {stat.icon}
              {stat.label}
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold capitalize truncate">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subject performance — mobile friendly */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6 mb-3">
        <h3 className="font-heading font-semibold mb-4">Subject Performance</h3>

        {subjectPerformance.length === 0 ? (
          <p className="pl-2 font-body text-sm text-white/40">
            No papers yet. Add paper results to see insights.
          </p>
        ) : (
          <div className="h-52 sm:h-64 w-full px-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectPerformance}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="subject"
                  tickFormatter={(v) => truncate(v, 6)}
                  interval="preserveStartEnd"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  dataKey="average"
                  fill={EMERALD}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Marks trend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6 mb-4">
        <h3 className="font-heading font-semibold mb-4">
          Marks Trend Over Time
        </h3>

        {marksTrend.length === 0 ? (
          <p className="pl-2 font-body text-sm text-white/40">No papers yet.</p>
        ) : (
          <div className="h-52 sm:h-64 w-full px-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={marksTrend}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickFormatter={(v) => truncate(v, 6)}
                  interval="preserveStartEnd"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="marks"
                  stroke={EMERALD}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: EMERALD }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Subject balance — radar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6 mb-4">
        <h3 className="font-heading font-semibold mb-4">Subject Balance</h3>

        {radarData.length === 0 ? (
          <p className="pl-2 font-body text-sm text-white/40">No data yet.</p>
        ) : (
          <div className="h-56 sm:h-72 w-full px-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
                  axisLine={false}
                />
                <Radar
                  dataKey="value"
                  stroke={TEAL}
                  fill={TEAL}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Weak areas + Errors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        {/* Weak areas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-400" />
            Areas Needing Attention
          </h3>

          {weakAreas.length === 0 ? (
            <p className="pl-2 font-body text-sm text-white/40">
              No weak areas detected. Keep it up!
            </p>
          ) : (
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <div
                  key={area.subject}
                  className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body font-medium text-sm truncate">
                      {area.subject}
                    </span>
                    <span
                      className={`font-body text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                        area.trend === "declining"
                          ? "bg-red-500/20 text-red-300"
                          : area.trend === "improving"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-white/10 text-white/50"
                      }`}>
                      {area.trend}
                    </span>
                  </div>
                  <p className="font-body text-xs text-white/50">
                    Average {area.average}% · {area.count} papers
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Error analysis */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6">
          <h3 className="font-heading font-semibold mb-4">Common Errors</h3>

          {errorAnalysis.length === 0 ? (
            <p className="pl-2 font-body text-sm text-white/40">
              No error data yet.
            </p>
          ) : (
            <div className="space-y-3">
              {errorAnalysis.map((err, i) => {
                const width = (err.count / errorAnalysis[0].count) * 100;

                return (
                  <div key={err.tag}>
                    <div className="flex items-center justify-between font-body text-xs mb-1.5">
                      <span className="text-white/70 capitalize truncate">
                        {err.tag.replace(/-/g, " ")}
                      </span>
                      <span className="text-white/40 shrink-0">
                        {err.count}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Focus time */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="rounded-xl border-none border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6 mb-4">
        <h3 className="font-heading font-semibold mb-4">
          Focus Time by Subject
        </h3>

        {focusBySubject.length === 0 ? (
          <p className="pl-2 font-body text-sm text-white/40">
            No focus sessions yet.
          </p>
        ) : (
          <div className="h-52 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={focusBySubject}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="subject"
                  tickFormatter={(v) => truncate(v, 6)}
                  interval="preserveStartEnd"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  dataKey="minutes"
                  fill={TEAL}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="rounded-xl border-0 border-white/10 bg-white/0 backdrop-blur-xl p-4 sm:p-6">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-yellow-400 animate-bounce" />
          Recommendations
        </h3>

        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
              <div className="shrink-0 mt-0.5">{rec.icon}</div>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                {rec.message}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
