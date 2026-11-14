// // import { useState, useMemo } from "react";
// // import { motion, AnimatePresence } from "motion/react";
// // import {
// //   Plus,
// //   Search,
// //   Trash2,
// //   Edit3,
// //   FileText,
// //   X,
// //   Check,
// //   TrendingUp,
// //   Award,
// //   FileCheck,
// // } from "lucide-react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";

// // const ERROR_TAGS = [
// //   "time-shortage",
// //   "theory-forgotten",
// //   "calculation-mistake",
// //   "misread-question",
// //   "lack-of-practice",
// //   "formula-forgotten",
// //   "careless-mistake",
// // ];

// // // const SUBJECT_COLORS = {
// // //   Combined: "#60a5fa",
// // //   Physics: "#a78bfa",
// // //   Chemistry: "#34d399",
// // //   Biology: "#4ade80",
// // //   default: "#94a3b8",
// // // };

// // const Practice = () => {
// //   // ---------------- Papers state ----------------
// //   const [papers, setPapers] = useState(() => {
// //     const saved = localStorage.getItem("dreamutrack-papers");
// //     return saved ? JSON.parse(saved) : [];
// //   });

// //   // ---------------- Filter state ----------------
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filterSubject, setFilterSubject] = useState("");
// //   const [filterType, setFilterType] = useState("");
// //   const [filterYear, setFilterYear] = useState("");

// //   // ---------------- Modal state ----------------
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingId, setEditingId] = useState(null);

// //   // ---------------- Form state ----------------
// //   const [paperType, setPaperType] = useState("past");
// //   const [year, setYear] = useState("");
// //   const [subject, setSubject] = useState("");
// //   const [paperName, setPaperName] = useState("");
// //   const [marks, setMarks] = useState("");
// //   const [totalMarks, setTotalMarks] = useState("");
// //   const [errors, setErrors] = useState([]);
// //   const [notes, setNotes] = useState("");

// //   // ---------------- Subjects (derived from setup) ----------------
// //   const subjects = useMemo(() => {
// //     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

// //     return setup?.subjects || [];
// //   }, []);

// //   // ---------------- Save papers ----------------
// //   useMemo(() => {
// //     localStorage.setItem("dreamutrack-papers", JSON.stringify(papers));
// //   }, [papers]);

// //   // ---------------- Filtered papers ----------------
// //   const filteredPapers = useMemo(() => {
// //     return papers.filter((p) => {
// //       const matchesSearch =
// //         !searchQuery ||
// //         p.paperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         p.subject.toLowerCase().includes(searchQuery.toLowerCase());

// //       const matchesSubject = !filterSubject || p.subject === filterSubject;

// //       const matchesType = !filterType || p.type === filterType;

// //       const matchesYear = !filterYear || p.year === filterYear;

// //       return matchesSearch && matchesSubject && matchesType && matchesYear;
// //     });
// //   }, [papers, searchQuery, filterSubject, filterType, filterYear]);

// //   // ---------------- Stats ----------------
// //   const stats = useMemo(() => {
// //     if (papers.length === 0) {
// //       return { avgMarks: 0, bestSubject: "—", totalPapers: 0 };
// //     }

// //     const avgMarks = Math.round(
// //       papers.reduce((sum, p) => sum + p.percentage, 0) / papers.length,
// //     );

// //     const subjectScores = {};
// //     papers.forEach((p) => {
// //       if (!subjectScores[p.subject]) {
// //         subjectScores[p.subject] = { total: 0, count: 0 };
// //       }
// //       subjectScores[p.subject].total += p.percentage;
// //       subjectScores[p.subject].count++;
// //     });

// //     const bestSubject =
// //       Object.entries(subjectScores).sort(
// //         (a, b) => b[1].total / b[1].count - a[1].total / a[1].count,
// //       )[0]?.[0] || "—";

// //     return {
// //       avgMarks,
// //       bestSubject,
// //       totalPapers: papers.length,
// //     };
// //   }, [papers]);

// //   // ---------------- Chart data ----------------
// //   const chartData = useMemo(() => {
// //     return filteredPapers
// //       .slice()
// //       .reverse()
// //       .map((p, i) => ({
// //         name: `P${i + 1}`,
// //         marks: p.percentage,
// //         subject: p.subject,
// //       }));
// //   }, [filteredPapers]);

// //   // ---------------- Error analysis ----------------
// //   const errorAnalysis = useMemo(() => {
// //     const errorCounts = {};

// //     papers.forEach((p) => {
// //       p.errors.forEach((err) => {
// //         if (!errorCounts[err]) {
// //           errorCounts[err] = 0;
// //         }
// //         errorCounts[err]++;
// //       });
// //     });

// //     return Object.entries(errorCounts)
// //       .sort((a, b) => b[1] - a[1])
// //       .slice(0, 5);
// //   }, [papers]);

// //   // ---------------- Add / edit paper ----------------
// //   const handleSave = () => {
// //     if (!subject || !marks || !totalMarks) return;

// //     const percentage = Math.round((marks / totalMarks) * 100);

// //     const newPaper = {
// //       id: editingId || `paper-${Date.now()}`,
// //       type: paperType,
// //       year: year || new Date().getFullYear(),
// //       subject,
// //       paperName: paperName || `${paperType} paper`,
// //       marks: Number(marks),
// //       totalMarks: Number(totalMarks),
// //       percentage,
// //       errors,
// //       notes: notes.trim(),
// //       createdAt: new Date().toISOString(),
// //     };

// //     if (editingId) {
// //       setPapers((prev) => prev.map((p) => (p.id === editingId ? newPaper : p)));
// //     } else {
// //       setPapers((prev) => [...prev, newPaper]);
// //     }

// //     // Reset form
// //     setPaperType("past");
// //     setYear("");
// //     setSubject("");
// //     setPaperName("");
// //     setMarks("");
// //     setTotalMarks("");
// //     setErrors([]);
// //     setNotes("");
// //     setIsModalOpen(false);
// //     setEditingId(null);
// //   };

// //   // ---------------- Edit paper ----------------
// //   const handleEdit = (paper) => {
// //     setPaperType(paper.type);
// //     setYear(paper.year);
// //     setSubject(paper.subject);
// //     setPaperName(paper.paperName);
// //     setMarks(paper.marks);
// //     setTotalMarks(paper.totalMarks);
// //     setErrors(paper.errors);
// //     setNotes(paper.notes);
// //     setEditingId(paper.id);
// //     setIsModalOpen(true);
// //   };

// //   // ---------------- Delete paper ----------------
// //   const handleDelete = (id) => {
// //     setPapers((prev) => prev.filter((p) => p.id !== id));
// //   };

// //   // ---------------- Toggle error tag ----------------
// //   const toggleError = (tag) => {
// //     setErrors((prev) =>
// //       prev.includes(tag) ? prev.filter((e) => e !== tag) : [...prev, tag],
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl font-bold flex items-center gap-2">
// //               <FileCheck size={24} className="text-indigo-300" />
// //               Practice & Results
// //             </h1>
// //             <p className="text-sm text-white/60 mt-1">
// //               Track your past papers and final papers.
// //             </p>
// //           </div>

// //           <button
// //             onClick={() => {
// //               setEditingId(null);
// //               setIsModalOpen(true);
// //             }}
// //             className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 font-semibold hover:opacity-90 transition">
// //             <Plus size={18} />
// //             Add Paper Result
// //           </button>
// //         </div>

// //         {/* Stats cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
// //             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
// //               <TrendingUp size={16} />
// //               Average Marks
// //             </div>
// //             <div className="text-3xl font-bold">{stats.avgMarks}%</div>
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
// //             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
// //               <Award size={16} />
// //               Best Subject
// //             </div>
// //             <div className="text-xl font-bold">{stats.bestSubject}</div>
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
// //             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
// //               <FileCheck size={16} />
// //               Total Papers
// //             </div>
// //             <div className="text-3xl font-bold">{stats.totalPapers}</div>
// //           </motion.div>
// //         </div>

// //         {/* Chart */}
// //         {chartData.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3 }}
// //             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
// //             <h3 className="font-semibold mb-4">Marks Progress</h3>

// //             <div className="h-64">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={chartData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
// //                   <XAxis dataKey="name" stroke="#ffffff60" fontSize={12} />
// //                   <YAxis domain={[0, 100]} stroke="#ffffff60" fontSize={12} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "#1a2235",
// //                       border: "1px solid #ffffff20",
// //                       borderRadius: "12px",
// //                     }}
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="marks"
// //                     stroke="#818cf8"
// //                     strokeWidth={2}
// //                     dot={{ fill: "#818cf8", r: 4 }}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Error analysis */}
// //         {errorAnalysis.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4 }}
// //             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
// //             <h3 className="font-semibold mb-4">Common Errors</h3>

// //             <div className="space-y-3">
// //               {errorAnalysis.map(([tag, count], i) => {
// //                 const maxCount = errorAnalysis[0][1];
// //                 const width = (count / maxCount) * 100;

// //                 return (
// //                   <div key={tag}>
// //                     <div className="flex items-center justify-between text-sm mb-1">
// //                       <span className="text-white/70 capitalize">
// //                         {tag.replace(/-/g, " ")}
// //                       </span>
// //                       <span className="text-white/40">{count}</span>
// //                     </div>
// //                     <div className="h-2 rounded-full bg-white/10 overflow-hidden">
// //                       <motion.div
// //                         initial={{ width: 0 }}
// //                         animate={{ width: `${width}%` }}
// //                         transition={{ delay: i * 0.05, duration: 0.5 }}
// //                         className="h-full bg-gradient-to-r from-orange-500 to-red-500"
// //                       />
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Filter bar */}
// //         <div className="flex flex-col sm:flex-row gap-3 mb-6">
// //           <div className="relative flex-1">
// //             <Search
// //               size={18}
// //               className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
// //             />
// //             <input
// //               type="text"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               placeholder="Search papers..."
// //               className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
// //             />
// //           </div>

// //           <select
// //             value={filterSubject}
// //             onChange={(e) => setFilterSubject(e.target.value)}
// //             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
// //             <option value="">All subjects</option>
// //             {subjects.map((s) => (
// //               <option key={s} value={s}>
// //                 {s}
// //               </option>
// //             ))}
// //           </select>

// //           <select
// //             value={filterType}
// //             onChange={(e) => setFilterType(e.target.value)}
// //             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
// //             <option value="">All types</option>
// //             <option value="past">Past</option>
// //             <option value="final">Final</option>
// //           </select>

// //           <select
// //             value={filterYear}
// //             onChange={(e) => setFilterYear(e.target.value)}
// //             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
// //             <option value="">All years</option>
// //             {[2023, 2024, 2025, 2026, 2027].map((y) => (
// //               <option key={y} value={y}>
// //                 {y}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Papers table */}
// //         {filteredPapers.length === 0 ? (
// //           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
// //             <FileText size={48} className="mx-auto text-white/20 mb-4" />
// //             <p className="text-white/50">
// //               {searchQuery || filterSubject || filterType || filterYear
// //                 ? "No papers match your filters."
// //                 : "No papers yet. Add your first result!"}
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-sm">
// //                 <thead>
// //                   <tr className="border-b border-white/10 text-left text-white/50">
// //                     <th className="px-4 py-3">Type</th>
// //                     <th className="px-4 py-3">Year</th>
// //                     <th className="px-4 py-3">Subject</th>
// //                     <th className="px-4 py-3">Marks</th>
// //                     <th className="px-4 py-3">%</th>
// //                     <th className="px-4 py-3">Errors</th>
// //                     <th className="px-4 py-3">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <AnimatePresence>
// //                     {filteredPapers.map((p) => (
// //                       <motion.tr
// //                         key={p.id}
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="border-b border-white/5 last:border-0">
// //                         <td className="px-4 py-3">
// //                           <span
// //                             className={`rounded-full px-3 py-1 text-xs ${
// //                               p.type === "past"
// //                                 ? "bg-blue-500/20 text-blue-300"
// //                                 : "bg-purple-500/20 text-purple-300"
// //                             }`}>
// //                             {p.type}
// //                           </span>
// //                         </td>
// //                         <td className="px-4 py-3 text-white/60">{p.year}</td>
// //                         <td className="px-4 py-3">{p.subject}</td>
// //                         <td className="px-4 py-3">
// //                           {p.marks}/{p.totalMarks}
// //                         </td>
// //                         <td className="px-4 py-3 font-semibold">
// //                           {p.percentage}%
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <div className="flex flex-wrap gap-1">
// //                             {p.errors.slice(0, 2).map((err) => (
// //                               <span
// //                                 key={err}
// //                                 className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50">
// //                                 {err.replace(/-/g, " ")}
// //                               </span>
// //                             ))}
// //                             {p.errors.length > 2 && (
// //                               <span className="text-xs text-white/40">
// //                                 +{p.errors.length - 2}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </td>
// //                         <td className="px-4 py-3">
// //                           <div className="flex items-center gap-2">
// //                             <button
// //                               onClick={() => handleEdit(p)}
// //                               className="text-white/40 hover:text-white transition">
// //                               <Edit3 size={14} />
// //                             </button>
// //                             <button
// //                               onClick={() => handleDelete(p.id)}
// //                               className="text-white/40 hover:text-red-400 transition">
// //                               <Trash2 size={14} />
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </motion.tr>
// //                     ))}
// //                   </AnimatePresence>
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {isModalOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
// //             onClick={() => setIsModalOpen(false)}>
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //               animate={{ opacity: 1, scale: 1, y: 0 }}
// //               exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //               onClick={(e) => e.stopPropagation()}
// //               className="w-full max-w-md rounded-3xl border border-white/10 bg-[#131a35] p-6 max-h-[90vh] overflow-y-auto">
// //               {/* Modal header */}
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-xl font-bold">
// //                   {editingId ? "Edit Paper" : "Add Paper Result"}
// //                 </h2>
// //                 <button
// //                   onClick={() => setIsModalOpen(false)}
// //                   className="text-white/40 hover:text-white transition">
// //                   <X size={20} />
// //                 </button>
// //               </div>

// //               {/* Form */}
// //               <div className="space-y-4">
// //                 {/* Type */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Paper type
// //                   </label>
// //                   <div className="flex gap-2">
// //                     {["past", "final"].map((type) => (
// //                       <button
// //                         key={type}
// //                         onClick={() => setPaperType(type)}
// //                         className={`flex-1 rounded-xl border py-3 text-sm capitalize transition ${
// //                           paperType === type
// //                             ? "border-indigo-400 bg-indigo-500/20"
// //                             : "border-white/10 bg-white/5"
// //                         }`}>
// //                         {type}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Year */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Year
// //                   </label>
// //                   <input
// //                     type="number"
// //                     value={year}
// //                     onChange={(e) => setYear(e.target.value)}
// //                     placeholder="e.g. 2023"
// //                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
// //                   />
// //                 </div>

// //                 {/* Subject */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Subject
// //                   </label>
// //                   <select
// //                     value={subject}
// //                     onChange={(e) => setSubject(e.target.value)}
// //                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
// //                     <option value="">Select subject</option>
// //                     {subjects.map((s) => (
// //                       <option key={s} value={s}>
// //                         {s}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 {/* Paper name */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Paper name (optional)
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={paperName}
// //                     onChange={(e) => setPaperName(e.target.value)}
// //                     placeholder="e.g. 2023 Paper 1"
// //                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
// //                   />
// //                 </div>

// //                 {/* Marks */}
// //                 <div className="grid grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="block text-sm text-white/70 mb-2">
// //                       Marks
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={marks}
// //                       onChange={(e) => setMarks(e.target.value)}
// //                       placeholder="65"
// //                       className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm text-white/70 mb-2">
// //                       Total marks
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={totalMarks}
// //                       onChange={(e) => setTotalMarks(e.target.value)}
// //                       placeholder="100"
// //                       className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Error tags */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Errors (optional)
// //                   </label>
// //                   <div className="flex flex-wrap gap-2">
// //                     {ERROR_TAGS.map((tag) => (
// //                       <button
// //                         key={tag}
// //                         onClick={() => toggleError(tag)}
// //                         className={`rounded-full px-3 py-1.5 text-xs transition ${
// //                           errors.includes(tag)
// //                             ? "bg-orange-500/20 border border-orange-400/30 text-orange-300"
// //                             : "bg-white/5 border border-white/10 text-white/50"
// //                         }`}>
// //                         {tag.replace(/-/g, " ")}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Notes */}
// //                 <div>
// //                   <label className="block text-sm text-white/70 mb-2">
// //                     Notes (optional)
// //                   </label>
// //                   <textarea
// //                     value={notes}
// //                     onChange={(e) => setNotes(e.target.value)}
// //                     placeholder="Any additional notes..."
// //                     rows={3}
// //                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition resize-none"
// //                   />
// //                 </div>

// //                 {/* Save button */}
// //                 <button
// //                   onClick={handleSave}
// //                   className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
// //                   <Check size={18} />
// //                   {editingId ? "Update" : "Save"}
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default Practice;

// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Plus,
//   Search,
//   Trash2,
//   Edit3,
//   FileText,
//   X,
//   Check,
//   TrendingUp,
//   Award,
//   FileCheck,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const ERROR_TAGS = [
//   "time-shortage",
//   "theory-forgotten",
//   "calculation-mistake",
//   "misread-question",
//   "lack-of-practice",
//   "formula-forgotten",
//   "careless-mistake",
// ];

// // Dynamic color palette — 10 colors, cycle
// const SUBJECT_COLORS = [
//   "#60a5fa", // blue
//   "#a78bfa", // purple
//   "#34d399", // green
//   "#f472b6", // pink
//   "#fbbf24", // yellow
//   "#fb923c", // orange
//   "#22d3ee", // cyan
//   "#a3e635", // lime
//   "#f87171", // red
//   "#c084fc", // violet
// ];

// const getSubjectColor = (index) => {
//   return SUBJECT_COLORS[index % SUBJECT_COLORS.length];
// };

// const Practice = () => {
//   // ---------------- Papers state ----------------
//   const [papers, setPapers] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-papers");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Filter state ----------------
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterSubject, setFilterSubject] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterYear, setFilterYear] = useState("");

//   // ---------------- Chart filter tabs ----------------
//   const [chartFilter, setChartFilter] = useState("all");

//   // ---------------- Modal state ----------------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // ---------------- Form state ----------------
//   const [paperType, setPaperType] = useState("past");
//   const [year, setYear] = useState("");
//   const [subject, setSubject] = useState("");
//   const [paperName, setPaperName] = useState("");
//   const [marks, setMarks] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [notes, setNotes] = useState("");

//   // ---------------- Subjects (derived from setup) ----------------
//   const subjects = useMemo(() => {
//     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//     return setup?.subjects || [];
//   }, []);

//   // ---------------- Save papers ----------------
//   useMemo(() => {
//     localStorage.setItem("dreamutrack-papers", JSON.stringify(papers));
//   }, [papers]);

//   // ---------------- Filtered papers ----------------
//   const filteredPapers = useMemo(() => {
//     return papers.filter((p) => {
//       const matchesSearch =
//         !searchQuery ||
//         p.paperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.subject.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesSubject = !filterSubject || p.subject === filterSubject;

//       const matchesType = !filterType || p.type === filterType;

//       const matchesYear = !filterYear || String(p.year) === filterYear;

//       return matchesSearch && matchesSubject && matchesType && matchesYear;
//     });
//   }, [papers, searchQuery, filterSubject, filterType, filterYear]);

//   // ---------------- Chart papers (filter tabs) ----------------
//   const chartPapers = useMemo(() => {
//     if (chartFilter === "all") return filteredPapers;
//     return filteredPapers.filter((p) => p.type === chartFilter);
//   }, [filteredPapers, chartFilter]);

//   // ---------------- Chart data (group by paper name) ----------------
//   const chartData = useMemo(() => {
//     const grouped = {};

//     chartPapers.forEach((p) => {
//       const key = p.paperName || `Paper ${p.id.slice(-4)}`;

//       if (!grouped[key]) {
//         grouped[key] = { paper: key };
//       }

//       grouped[key][p.subject] = p.percentage;
//     });

//     return Object.values(grouped);
//   }, [chartPapers]);

//   // ---------------- Chart subjects (unique) ----------------
//   const chartSubjects = useMemo(() => {
//     return [...new Set(chartPapers.map((p) => p.subject))];
//   }, [chartPapers]);

//   // ---------------- Stats ----------------
//   const stats = useMemo(() => {
//     if (papers.length === 0) {
//       return { avgMarks: 0, bestSubject: "—", totalPapers: 0 };
//     }

//     const avgMarks = Math.round(
//       papers.reduce((sum, p) => sum + p.percentage, 0) / papers.length,
//     );

//     const subjectScores = {};
//     papers.forEach((p) => {
//       if (!subjectScores[p.subject]) {
//         subjectScores[p.subject] = { total: 0, count: 0 };
//       }
//       subjectScores[p.subject].total += p.percentage;
//       subjectScores[p.subject].count++;
//     });

//     const bestSubject =
//       Object.entries(subjectScores).sort(
//         (a, b) => b[1].total / b[1].count - a[1].total / a[1].count,
//       )[0]?.[0] || "—";

//     return {
//       avgMarks,
//       bestSubject,
//       totalPapers: papers.length,
//     };
//   }, [papers]);

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
//       .slice(0, 5);
//   }, [papers]);

//   // ---------------- Add / edit paper ----------------
//   const handleSave = () => {
//     if (!subject || !marks || !totalMarks) return;

//     const percentage = Math.round((marks / totalMarks) * 100);

//     const newPaper = {
//       id: editingId || `paper-${Date.now()}`,
//       type: paperType,
//       year: year || new Date().getFullYear(),
//       subject,
//       paperName: paperName.trim() || `${paperType} paper`,
//       marks: Number(marks),
//       totalMarks: Number(totalMarks),
//       percentage,
//       errors,
//       notes: notes.trim(),
//       createdAt: new Date().toISOString(),
//     };

//     if (editingId) {
//       setPapers((prev) => prev.map((p) => (p.id === editingId ? newPaper : p)));
//     } else {
//       setPapers((prev) => [...prev, newPaper]);
//     }

//     // Reset form
//     setPaperType("past");
//     setYear("");
//     setSubject("");
//     setPaperName("");
//     setMarks("");
//     setTotalMarks("");
//     setErrors([]);
//     setNotes("");
//     setIsModalOpen(false);
//     setEditingId(null);
//   };

//   // ---------------- Edit paper ----------------
//   const handleEdit = (paper) => {
//     setPaperType(paper.type);
//     setYear(String(paper.year));
//     setSubject(paper.subject);
//     setPaperName(paper.paperName);
//     setMarks(String(paper.marks));
//     setTotalMarks(String(paper.totalMarks));
//     setErrors(paper.errors);
//     setNotes(paper.notes);
//     setEditingId(paper.id);
//     setIsModalOpen(true);
//   };

//   // ---------------- Delete paper ----------------
//   const handleDelete = (id) => {
//     setPapers((prev) => prev.filter((p) => p.id !== id));
//   };

//   // ---------------- Toggle error tag ----------------
//   const toggleError = (tag) => {
//     setErrors((prev) =>
//       prev.includes(tag) ? prev.filter((e) => e !== tag) : [...prev, tag],
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold flex items-center gap-2">
//               <FileCheck size={24} className="text-indigo-300" />
//               Practice & Results
//             </h1>
//             <p className="text-sm text-white/60 mt-1">
//               Track your past papers and final papers.
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               setEditingId(null);
//               setIsModalOpen(true);
//             }}
//             className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 font-semibold hover:opacity-90 transition">
//             <Plus size={18} />
//             Add Paper Result
//           </button>
//         </div>

//         {/* Stats cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <TrendingUp size={16} />
//               Average Marks
//             </div>
//             <div className="text-3xl font-bold">{stats.avgMarks}%</div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <Award size={16} />
//               Best Subject
//             </div>
//             <div className="text-xl font-bold">{stats.bestSubject}</div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//             <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
//               <FileCheck size={16} />
//               Total Papers
//             </div>
//             <div className="text-3xl font-bold">{stats.totalPapers}</div>
//           </motion.div>
//         </div>

//         {/* Chart filter tabs */}
//         <div className="mb-4 flex items-center gap-2">
//           {["all", "past", "final"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setChartFilter(filter)}
//               className={`rounded-xl px-4 py-2 text-sm capitalize transition ${
//                 chartFilter === filter
//                   ? "bg-indigo-500 text-white"
//                   : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
//               }`}>
//               {filter === "all" ? "All Papers" : `${filter} papers`}
//             </button>
//           ))}
//         </div>

//         {/* Multi-series line chart */}
//         {chartData.length > 0 && chartSubjects.length > 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6 ">
//             <h3 className="font-semibold mb-4">
//               Marks Progress —{" "}
//               {chartFilter === "all" ? "All Papers" : `${chartFilter} papers`}
//             </h3>

//             <div className="h-96">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="#ffffff20"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="paper"
//                     stroke="#ffffff60"
//                     fontSize={10}
//                     angle={-45}
//                     textAnchor="end"
//                     height={80}
//                   />
//                   <YAxis domain={[0, 100]} stroke="#ffffff60" fontSize={12} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1a2235",
//                       border: "1px solid #ffffff20",
//                       borderRadius: "12px",
//                     }}
//                   />
//                   <Legend />

//                   {chartSubjects.map((subject, i) => (
//                     <Line
//                       key={subject}
//                       type="monotone"
//                       dataKey={subject}
//                       stroke={getSubjectColor(i)}
//                       name={subject}
//                       strokeWidth={3}
//                       connectNulls
//                       dot={{ r: 4 }}
//                     />
//                   ))}
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </motion.div>
//         ) : (
//           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center mb-6">
//             <FileText size={48} className="mx-auto text-white/20 mb-4" />
//             <p className="text-white/50">
//               No papers yet for this filter. Add your first result!
//             </p>
//           </div>
//         )}

//         {/* Error analysis */}
//         {errorAnalysis.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-6">
//             <h3 className="font-semibold mb-4">Common Errors</h3>

//             <div className="space-y-3">
//               {errorAnalysis.map(([tag, count], i) => {
//                 const maxCount = errorAnalysis[0][1];
//                 const width = (count / maxCount) * 100;

//                 return (
//                   <div key={tag}>
//                     <div className="flex items-center justify-between text-sm mb-1">
//                       <span className="text-white/70 capitalize">
//                         {tag.replace(/-/g, " ")}
//                       </span>
//                       <span className="text-white/40">{count}</span>
//                     </div>
//                     <div className="h-2 rounded-full bg-white/10 overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${width}%` }}
//                         transition={{ delay: i * 0.05, duration: 0.5 }}
//                         className="h-full bg-gradient-to-r from-orange-500 to-red-500"
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}

//         {/* Filter bar */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-6">
//           <div className="relative flex-1">
//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
//             />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search papers..."
//               className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//             />
//           </div>

//           <select
//             value={filterSubject}
//             onChange={(e) => setFilterSubject(e.target.value)}
//             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
//             <option value="">All subjects</option>
//             {subjects.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
//             <option value="">All types</option>
//             <option value="past">Past</option>
//             <option value="final">Final</option>
//           </select>

//           <select
//             value={filterYear}
//             onChange={(e) => setFilterYear(e.target.value)}
//             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
//             <option value="">All years</option>
//             {[2023, 2024, 2025, 2026, 2027].map((y) => (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Papers table — dynamic columns */}
//         {filteredPapers.length === 0 ? (
//           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
//             <FileText size={48} className="mx-auto text-white/20 mb-4" />
//             <p className="text-white/50">
//               {searchQuery || filterSubject || filterType || filterYear
//                 ? "No papers match your filters."
//                 : "No papers yet. Add your first result!"}
//             </p>
//           </div>
//         ) : (
//           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-white/10 text-left text-white/50">
//                     <th className="px-4 py-3">Paper</th>
//                     <th className="px-4 py-3">Type</th>
//                     <th className="px-4 py-3">Year</th>
//                     {/* Dynamic subject columns */}
//                     {[...new Set(filteredPapers.map((p) => p.subject))].map(
//                       (s) => (
//                         <th key={s} className="px-4 py-3">
//                           {s}
//                         </th>
//                       ),
//                     )}
//                     <th className="px-4 py-3">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <AnimatePresence>
//                     {filteredPapers.map((p) => (
//                       <motion.tr
//                         key={p.id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="border-b border-white/5 last:border-0">
//                         <td className="px-4 py-3">{p.paperName}</td>
//                         <td className="px-4 py-3">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs ${
//                               p.type === "past"
//                                 ? "bg-blue-500/20 text-blue-300"
//                                 : "bg-purple-500/20 text-purple-300"
//                             }`}>
//                             {p.type}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-white/60">{p.year}</td>
//                         {/* Dynamic subject cells */}
//                         {[
//                           ...new Set(filteredPapers.map((p2) => p2.subject)),
//                         ].map((s) => (
//                           <td key={s} className="px-4 py-3">
//                             {p.subject === s ? `${p.percentage}%` : "—"}
//                           </td>
//                         ))}
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => handleEdit(p)}
//                               className="text-white/40 hover:text-white transition">
//                               <Edit3 size={14} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(p.id)}
//                               className="text-white/40 hover:text-red-400 transition">
//                               <Trash2 size={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={() => setIsModalOpen(false)}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//               className="w-full max-w-md rounded-3xl border border-white/10 bg-[#131a35] p-6 max-h-[90vh] overflow-y-auto">
//               {/* Modal header */}
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold">
//                   {editingId ? "Edit Paper" : "Add Paper Result"}
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-white/40 hover:text-white transition">
//                   <X size={20} />
//                 </button>
//               </div>

//               {/* Form */}
//               <div className="space-y-4">
//                 {/* Type */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Paper type
//                   </label>
//                   <div className="flex gap-2">
//                     {["past", "final"].map((type) => (
//                       <button
//                         key={type}
//                         onClick={() => setPaperType(type)}
//                         className={`flex-1 rounded-xl border py-3 text-sm capitalize transition ${
//                           paperType === type
//                             ? "border-indigo-400 bg-indigo-500/20"
//                             : "border-white/10 bg-white/5"
//                         }`}>
//                         {type}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Year */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Year
//                   </label>
//                   <input
//                     type="number"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     placeholder="e.g. 2023"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
//                   />
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Subject
//                   </label>
//                   <select
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 transition">
//                     <option value="">Select subject</option>
//                     {subjects.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Paper name */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Paper name
//                   </label>
//                   <input
//                     type="text"
//                     value={paperName}
//                     onChange={(e) => setPaperName(e.target.value)}
//                     placeholder="e.g. 2025 Maths Paper"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
//                   />
//                 </div>

//                 {/* Marks */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Marks
//                     </label>
//                     <input
//                       type="number"
//                       value={marks}
//                       onChange={(e) => setMarks(e.target.value)}
//                       placeholder="65"
//                       className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Total marks
//                     </label>
//                     <input
//                       type="number"
//                       value={totalMarks}
//                       onChange={(e) => setTotalMarks(e.target.value)}
//                       placeholder="100"
//                       className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition"
//                     />
//                   </div>
//                 </div>

//                 {/* Error tags */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Errors (optional)
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {ERROR_TAGS.map((tag) => (
//                       <button
//                         key={tag}
//                         onClick={() => toggleError(tag)}
//                         className={`rounded-full px-3 py-1.5 text-xs transition ${
//                           errors.includes(tag)
//                             ? "bg-orange-500/20 border border-orange-400/30 text-orange-300"
//                             : "bg-white/5 border border-white/10 text-white/50"
//                         }`}>
//                         {tag.replace(/-/g, " ")}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Notes */}
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Notes (optional)
//                   </label>
//                   <textarea
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     placeholder="Any additional notes..."
//                     rows={3}
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 transition resize-none"
//                   />
//                 </div>

//                 {/* Save button */}
//                 <button
//                   onClick={handleSave}
//                   className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
//                   <Check size={18} />
//                   {editingId ? "Update" : "Save"}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Practice;

// src/pages/Practice.jsx
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  FileText,
  FileCheck2,
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  X,
  Check,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ERROR_OPTIONS = [
  "Time Management",
  "Theory",
  "Calculation",
  "Careless Mistakes",
  "Concept Gap",
  "Question Misunderstood",
];

const PAPER_TYPES = ["Past Paper", "Model Paper"];

const Practice = () => {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [paperType, setPaperType] = useState("Past Paper");
  const [subject, setSubject] = useState("");
  const [paperName, setPaperName] = useState("");
  const [marks, setMarks] = useState("");
  const [errors, setErrors] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState("");

  // ---------------- Auth + load ----------------
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);

  //     if (currentUser) {
  //       const uid = currentUser.uid;

  //       // Subjects — Firestore profile
  //       try {
  //         const snapshot = await getDoc(doc(db, "users", uid));
  //         const data = snapshot.exists() ? snapshot.data() : {};
  //         setSubjects(data.profile?.subjects || []);
  //       } catch (err) {
  //         console.error("Failed to load subjects:", err);
  //       }

  //       // Papers — user-scoped localStorage
  //       const saved = localStorage.getItem(`dreamutrack-papers-${uid}`);
  //       setPapers(saved ? JSON.parse(saved) : []);
  //     } else {
  //       setSubjects([]);
  //       setPapers([]);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // Practice.jsx — auth + load useEffect එකේ papers section
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        // Subjects — Firestore
        try {
          const snapshot = await getDoc(doc(db, "users", uid));
          const data = snapshot.exists() ? snapshot.data() : {};
          setSubjects(data.profile?.subjects || []);
        } catch (err) {
          console.error("Failed to load subjects:", err);
        }

        // Papers — migration: old global key → new user-scoped key
        const newKey = `dreamutrack-papers-${uid}`;
        const oldKey = "dreamutrack-papers";

        let saved = localStorage.getItem(newKey);

        if (!saved) {
          const old = localStorage.getItem(oldKey);
          if (old) {
            localStorage.setItem(newKey, old);
            saved = old;
          }
        }

        setPapers(saved ? JSON.parse(saved) : []);
      } else {
        setSubjects([]);
        setPapers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Save papers ----------------
  // useEffect(() => {
  //   if (!user) return;
  //   localStorage.setItem(
  //     `dreamutrack-papers-${user.uid}`,
  //     JSON.stringify(papers),
  //   );
  // }, [papers, user]);

  // ---------------- Stats ----------------
  const stats = useMemo(() => {
    const past = papers.filter((p) => p.paperType === "Past Paper");
    const model = papers.filter((p) => p.paperType === "Model Paper");

    const avg =
      papers.length > 0
        ? Math.round(
            papers.reduce((sum, p) => sum + p.marks, 0) / papers.length,
          )
        : 0;

    return {
      total: papers.length,
      past: past.length,
      model: model.length,
      avg,
    };
  }, [papers]);

  // ---------------- Subject performance ----------------
  const subjectPerformance = useMemo(() => {
    const groups = {};

    papers.forEach((p) => {
      if (!groups[p.subject]) {
        groups[p.subject] = { total: 0, count: 0 };
      }
      groups[p.subject].total += p.marks;
      groups[p.subject].count++;
    });

    return Object.entries(groups)
      .map(([subject, data]) => ({
        subject,
        average: Math.round(data.total / data.count),
        count: data.count,
      }))
      .sort((a, b) => b.average - a.average);
  }, [papers]);

  // ---------------- Selected subject trend ----------------
  const subjectTrend = useMemo(() => {
    if (!selectedSubject) return [];

    return papers
      .filter((p) => p.subject === selectedSubject)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((p, i) => ({
        name: p.paperName || `Paper ${i + 1}`,
        marks: p.marks,
        type: p.paperType,
      }));
  }, [papers, selectedSubject]);

  const selectedTrendInfo = useMemo(() => {
    if (subjectTrend.length < 2) return { trend: "stable", diff: 0 };

    const first = subjectTrend[0].marks;
    const last = subjectTrend[subjectTrend.length - 1].marks;
    const diff = last - first;

    return {
      trend: diff > 5 ? "improving" : diff < -5 ? "declining" : "stable",
      diff,
    };
  }, [subjectTrend]);

  // ---------------- Actions ----------------
  const openAddModal = () => {
    setEditingId(null);
    setPaperType("Past Paper");
    setSubject("");
    setPaperName("");
    setMarks("");
    setErrors([]);
    setError("");
    setIsModalOpen(true);
  };

  const handleEdit = (paper) => {
    setEditingId(paper.id);
    setPaperType(paper.paperType);
    setSubject(paper.subject);
    setPaperName(paper.paperName || "");
    setMarks(paper.marks);
    setErrors(paper.errors || []);
    setError("");
    setIsModalOpen(true);
  };

  const toggleError = (err) => {
    setErrors((prev) =>
      prev.includes(err) ? prev.filter((e) => e !== err) : [...prev, err],
    );
  };

  // const handleSave = () => {
  //   if (!subject) {
  //     setError("Please select a subject.");
  //     return;
  //   }
  //   if (marks === "" || marks < 0 || marks > 100) {
  //     setError("Please enter marks between 0 and 100.");
  //     return;
  //   }

  //   const newPaper = {
  //     id: editingId || `paper-${Date.now()}`,
  //     paperType,
  //     subject,
  //     paperName: paperName.trim(),
  //     marks: Number(marks),
  //     errors,
  //     createdAt: editingId
  //       ? papers.find((p) => p.id === editingId)?.createdAt
  //       : new Date().toISOString(),
  //   };

  //   setPapers((prev) =>
  //     editingId
  //       ? prev.map((p) => (p.id === editingId ? newPaper : p))
  //       : [...prev, newPaper],
  //   );

  //   setIsModalOpen(false);
  //   setEditingId(null);
  // };

  // const handleDelete = (id) => {
  //   setPapers((prev) => prev.filter((p) => p.id !== id));
  // };

  // ✅ අලුත් handleSave — direct localStorage write
  const handleSave = () => {
    if (!subject) {
      setError("Please select a subject.");
      return;
    }
    if (marks === "" || marks < 0 || marks > 100) {
      setError("Please enter marks between 0 and 100.");
      return;
    }

    const newPaper = {
      id: editingId || `paper-${Date.now()}`,
      paperType,
      subject,
      paperName: paperName.trim(),
      marks: Number(marks),
      errors,
      createdAt: editingId
        ? papers.find((p) => p.id === editingId)?.createdAt
        : new Date().toISOString(),
    };

    const updated = editingId
      ? papers.map((p) => (p.id === editingId ? newPaper : p))
      : [...papers, newPaper];

    // Direct write — guaranteed persistence
    localStorage.setItem(
      `dreamutrack-papers-${user.uid}`,
      JSON.stringify(updated),
    );
    setPapers(updated);

    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updated = papers.filter((p) => p.id !== id);
    localStorage.setItem(
      `dreamutrack-papers-${user.uid}`,
      JSON.stringify(updated),
    );
    setPapers(updated);
  };

  const inputClass =
    "font-body w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 px-4 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-emerald-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 mt-25 lg:mt-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            {/* <FileText size={24} className="text-emerald-300" /> */}
            Practice
          </h1>
          <p className="font-body text-sm text-white/50 mt-1">
            Track past papers and model papers to get exam ready.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="font-body flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition">
          <Plus size={18} />
          Add Paper
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {[
          {
            icon: <FileText size={16} className="text-emerald-300" />,
            label: "Total Papers",
            value: stats.total,
          },
          {
            icon: <FileCheck2 size={16} className="text-blue-300" />,
            label: "Past Papers",
            value: stats.past,
          },
          {
            icon: <FileCheck2 size={16} className="text-purple-300" />,
            label: "Model Papers",
            value: stats.model,
          },
          {
            icon: <Award size={16} className="text-amber-300" />,
            label: "Average",
            value: `${stats.avg}%`,
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
            <div className="font-heading text-xl sm:text-2xl font-bold">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subject selector + trend chart */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 mb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-heading font-semibold">Marks Trend by Subject</h3>

          {selectedSubject && subjectTrend.length >= 2 && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs ${
                selectedTrendInfo.trend === "improving"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : selectedTrendInfo.trend === "declining"
                    ? "bg-red-500/15 text-red-300"
                    : "bg-white/10 text-white/50"
              }`}>
              {selectedTrendInfo.trend === "improving" ? (
                <TrendingUp size={13} />
              ) : selectedTrendInfo.trend === "declining" ? (
                <TrendingDown size={13} />
              ) : (
                <Minus size={13} />
              )}
              {selectedTrendInfo.trend} ({selectedTrendInfo.diff > 0 ? "+" : ""}
              {selectedTrendInfo.diff}%)
            </span>
          )}
        </div>

        {/* Subject chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className={`rounded-full border px-3.5 py-1.5 font-body text-xs transition ${
                selectedSubject === subject
                  ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}>
              {subject}
            </button>
          ))}
        </div>

        {/* Chart */}
        {selectedSubject && subjectTrend.length > 0 ? (
          <div className="h-52 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={subjectTrend}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
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
                  contentStyle={{
                    backgroundColor: "#0e1424",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="marks"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#34d399" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="font-body text-sm text-white/40 py-8 text-center pl-2">
            {selectedSubject
              ? "No papers yet for this subject. Add one to see the trend."
              : "Select a subject to see its marks trend."}
          </p>
        )}
      </div>

      {/* Subject averages */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 mb-4">
        <h3 className="font-heading font-semibold mb-4">
          Average Marks by Subject
        </h3>

        {subjectPerformance.length === 0 ? (
          <p className="font-body text-sm text-white/40 pl-2">
            No papers yet. Add your first paper.
          </p>
        ) : (
          <div className="space-y-3">
            {subjectPerformance.map((s, i) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between font-body text-xs mb-1.5">
                  <span className="text-white/70 truncate">{s.subject}</span>
                  <span className="text-white/40 shrink-0">
                    {s.average}% · {s.count} papers
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.average}%` }}
                    transition={{ delay: i * 0.06, duration: 0.6 }}
                    className={`h-full rounded-full ${
                      s.average >= 75
                        ? "bg-emerald-400"
                        : s.average >= 50
                          ? "bg-amber-400"
                          : "bg-red-400"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Marks table */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
        <h3 className="font-heading font-semibold mb-4">All Papers</h3>

        {papers.length === 0 ? (
          <p className="font-body text-sm text-white/40 pl-2">
            No papers yet. Add your first past paper or model paper.
          </p>
        ) : (
          <div className="space-y-2.5">
            {papers
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((paper, i) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                  {/* Type badge */}
                  <span
                    className={`hidden sm:inline-flex shrink-0 rounded-full px-2.5 py-1 font-body text-[10px] ${
                      paper.paperType === "Past Paper"
                        ? "bg-blue-500/15 text-blue-300"
                        : "bg-purple-500/15 text-purple-300"
                    }`}>
                    {paper.paperType === "Past Paper" ? "Past" : "Model"}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate">
                      {paper.paperName || paper.subject}
                    </p>
                    <p className="font-body text-xs text-white/40 truncate">
                      {paper.subject} ·{" "}
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </p>
                    {(paper.errors || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {paper.errors.map((err) => (
                          <span
                            key={err}
                            className="rounded-full bg-red-500/10 px-2 py-0.5 font-body text-[10px] text-red-300">
                            {err}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Marks */}
                  <div className="text-right shrink-0">
                    <p
                      className={`font-heading text-base font-bold ${
                        paper.marks >= 75
                          ? "text-emerald-300"
                          : paper.marks >= 50
                            ? "text-amber-300"
                            : "text-red-300"
                      }`}>
                      {paper.marks}%
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(paper)}
                      aria-label="Edit paper"
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition">
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(paper.id)}
                      aria-label="Delete paper"
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0e1424] p-6 max-h-[60vh] overflow-y-auto">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold">
                  {editingId ? "Edit Paper" : "Add Paper"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition">
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Paper type */}
                <div>
                  <label className="font-body block text-sm text-white/70 mb-2">
                    Paper type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAPER_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPaperType(type)}
                        className={`rounded-xl border py-2.5 font-body text-xs font-medium transition ${
                          paperType === type
                            ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                            : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="paper-subject"
                    className="font-body block text-sm text-white/70 mb-2">
                    Subject
                  </label>
                  <select
                    id="paper-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}>
                    <option value="" className="bg-[#0e1424]">
                      Select subject
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s} className="bg-[#0e1424]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Paper name */}
                <div>
                  <label
                    htmlFor="paper-name"
                    className="font-body block text-sm text-white/70 mb-2">
                    Paper name (optional)
                  </label>
                  <input
                    id="paper-name"
                    type="text"
                    value={paperName}
                    onChange={(e) => setPaperName(e.target.value)}
                    placeholder="e.g. 2023 Past Paper, Model Paper 1"
                    className={inputClass}
                  />
                </div>

                {/* Marks */}
                <div>
                  <label
                    htmlFor="paper-marks"
                    className="font-body block text-sm text-white/70 mb-2">
                    Marks (%)
                  </label>
                  <input
                    id="paper-marks"
                    type="number"
                    min="0"
                    max="100"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="e.g. 75"
                    className={inputClass}
                  />
                </div>

                {/* Errors */}
                <div>
                  <label className="font-body block text-sm text-white/70 mb-2">
                    Errors (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ERROR_OPTIONS.map((err) => (
                      <button
                        key={err}
                        type="button"
                        onClick={() => toggleError(err)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-xs transition ${
                          errors.includes(err)
                            ? "border-red-400/50 bg-red-500/15 text-red-300"
                            : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                        }`}>
                        {errors.includes(err) && <Check size={12} />}
                        {err}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-body text-sm text-red-300">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="font-body w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition">
                  <Check size={18} />
                  {editingId ? "Update Paper" : "Save Paper"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Practice;
