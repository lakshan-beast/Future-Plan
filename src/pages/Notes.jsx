// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Plus,
//   Search,
//   Star,
//   Trash2,
//   Edit3,
//   BookOpen,
//   X,
//   Check,
// } from "lucide-react";

// const SUBJECT_COLORS = {
//   "Combined Maths": "bg-blue-500/20 text-blue-300 border-blue-400/30",
//   Physics: "bg-purple-500/20 text-purple-300 border-purple-400/30",
//   Chemistry: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
//   Biology: "bg-green-500/20 text-green-300 border-green-400/30",
//   default: "bg-white/10 text-white/70 border-white/20",
// };

// const Notes = () => {
//   // ---------------- Formulas state ----------------
//   const [formulas, setFormulas] = useState(() => {
//     const saved = localStorage.getItem("dreamutrack-formulas");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ---------------- Search / filter ----------------
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   // ---------------- Modal state ----------------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // ---------------- Form state ----------------
//   const [title, setTitle] = useState("");
//   const [formula, setFormula] = useState("");
//   const [subject, setSubject] = useState("");
//   const [explanation, setExplanation] = useState("");
//   const [example, setExample] = useState("");
//   const [tags, setTags] = useState("");

//   // ---------------- Subjects (derived from setup) ----------------
//   const subjects = useMemo(() => {
//     const setup = JSON.parse(localStorage.getItem("dreamutrack-setup") || "{}");

//     return setup?.subjects || [];
//   }, []);

//   // ---------------- Save formulas ----------------
//   useMemo(() => {
//     localStorage.setItem("dreamutrack-formulas", JSON.stringify(formulas));
//   }, [formulas]);

//   // ---------------- Filtered formulas ----------------
//   const filteredFormulas = useMemo(() => {
//     return formulas.filter((f) => {
//       const matchesSearch =
//         !searchQuery ||
//         f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         f.tags.some((tag) =>
//           tag.toLowerCase().includes(searchQuery.toLowerCase()),
//         );

//       const matchesSubject = !selectedSubject || f.subject === selectedSubject;

//       return matchesSearch && matchesSubject;
//     });
//   }, [formulas, searchQuery, selectedSubject]);

//   // ---------------- Add / edit formula ----------------
//   const handleSave = () => {
//     if (!title.trim() || !formula.trim()) return;

//     const newFormula = {
//       id: editingId || `formula-${Date.now()}`,
//       title: title.trim(),
//       formula: formula.trim(),
//       subject: subject || "General",
//       explanation: explanation.trim(),
//       example: example.trim(),
//       tags: tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter((t) => t),
//       favourite: false,
//       createdAt: new Date().toISOString(),
//     };

//     if (editingId) {
//       setFormulas((prev) =>
//         prev.map((f) => (f.id === editingId ? newFormula : f)),
//       );
//     } else {
//       setFormulas((prev) => [...prev, newFormula]);
//     }

//     // Reset form
//     setTitle("");
//     setFormula("");
//     setSubject("");
//     setExplanation("");
//     setExample("");
//     setTags("");
//     setIsModalOpen(false);
//     setEditingId(null);
//   };

//   // ---------------- Edit formula ----------------
//   const handleEdit = (formula) => {
//     setTitle(formula.title);
//     setFormula(formula.formula);
//     setSubject(formula.subject);
//     setExplanation(formula.explanation);
//     setExample(formula.example);
//     setTags(formula.tags.join(", "));
//     setEditingId(formula.id);
//     setIsModalOpen(true);
//   };

//   // ---------------- Delete formula ----------------
//   const handleDelete = (id) => {
//     setFormulas((prev) => prev.filter((f) => f.id !== id));
//   };

//   // ---------------- Toggle favourite ----------------
//   const toggleFavourite = (id) => {
//     setFormulas((prev) =>
//       prev.map((f) => (f.id === id ? { ...f, favourite: !f.favourite } : f)),
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold flex items-center gap-2">
//               <BookOpen size={24} className="text-indigo-300" />
//               Notes & Formulas
//             </h1>
//             <p className="text-sm text-white/60 mt-1">
//               Save your formulas, key concepts and quick references.
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               setEditingId(null);
//               setIsModalOpen(true);
//             }}
//             className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 font-semibold hover:opacity-90 transition">
//             <Plus size={18} />
//             Add Formula
//           </button>
//         </div>

//         {/* Search + filter */}
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
//               placeholder="Search formulas, subjects, tags..."
//               className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//             />
//           </div>

//           <select
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//             <option value="">All subjects</option>
//             {subjects.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Formulas grid */}
//         {filteredFormulas.length === 0 ? (
//           <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
//             <BookOpen size={48} className="mx-auto text-white/20 mb-4" />
//             <p className="text-white/50">
//               {searchQuery || selectedSubject
//                 ? "No formulas match your search."
//                 : "No formulas yet. Add your first one!"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <AnimatePresence>
//               {filteredFormulas.map((f) => (
//                 <motion.div
//                   key={f.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-indigo-400/30 transition">
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="font-semibold text-sm">{f.title}</h3>
//                     <button
//                       onClick={() => toggleFavourite(f.id)}
//                       className="text-white/30 hover:text-yellow-400 transition">
//                       <Star
//                         size={16}
//                         className={
//                           f.favourite ? "fill-yellow-400 text-yellow-400" : ""
//                         }
//                       />
//                     </button>
//                   </div>

//                   {/* Formula */}
//                   <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 mb-3 font-mono text-sm">
//                     {f.formula}
//                   </div>

//                   {/* Subject badge */}
//                   <span
//                     className={`inline-block rounded-full px-3 py-1 text-xs border mb-3 ${
//                       SUBJECT_COLORS[f.subject] || SUBJECT_COLORS.default
//                     }`}>
//                     {f.subject}
//                   </span>

//                   {/* Explanation */}
//                   {f.explanation && (
//                     <p className="text-sm text-white/60 mb-2">
//                       {f.explanation}
//                     </p>
//                   )}

//                   {/* Example */}
//                   {f.example && (
//                     <p className="text-xs text-white/40 mb-3">
//                       Example: {f.example}
//                     </p>
//                   )}

//                   {/* Tags */}
//                   {f.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {f.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50">
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 mt-auto">
//                     <button
//                       onClick={() => handleEdit(f)}
//                       className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10 transition">
//                       <Edit3 size={12} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(f.id)}
//                       className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs hover:bg-red-500/20 hover:border-red-400/30 transition">
//                       <Trash2 size={12} />
//                       Delete
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
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
//               className="w-full max-w-md rounded-3xl border border-white/10 bg-[#131a35] p-6">
//               {/* Modal header */}
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold">
//                   {editingId ? "Edit Formula" : "Add Formula"}
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-white/40 hover:text-white transition">
//                   <X size={20} />
//                 </button>
//               </div>

//               {/* Form */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="e.g. Newton's Second Law"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Formula
//                   </label>
//                   <input
//                     type="text"
//                     value={formula}
//                     onChange={(e) => setFormula(e.target.value)}
//                     placeholder="e.g. F = ma"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Subject
//                   </label>
//                   <select
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition">
//                     <option value="">Select subject</option>
//                     {subjects.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Explanation (optional)
//                   </label>
//                   <textarea
//                     value={explanation}
//                     onChange={(e) => setExplanation(e.target.value)}
//                     placeholder="Short explanation..."
//                     rows={3}
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition resize-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Example (optional)
//                   </label>
//                   <input
//                     type="text"
//                     value={example}
//                     onChange={(e) => setExample(e.target.value)}
//                     placeholder="e.g. F = 5kg × 2m/s² = 10N"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-white/70 mb-2">
//                     Tags (comma separated)
//                   </label>
//                   <input
//                     type="text"
//                     value={tags}
//                     onChange={(e) => setTags(e.target.value)}
//                     placeholder="e.g. mechanics, dynamics"
//                     className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
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

// export default Notes;

// src/pages/Notes.jsx
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Search,
  Star,
  Trash2,
  Edit3,
  BookOpen,
  X,
  Check,
  Copy,
  Filter,
} from "lucide-react";

const Notes = () => {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [formulas, setFormulas] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [formula, setFormula] = useState("");
  const [subject, setSubject] = useState("");
  const [noteType, setNoteType] = useState("Formula"); // Formula | Concept | Definition
  const [explanation, setExplanation] = useState("");
  const [example, setExample] = useState("");
  const [tags, setTags] = useState("");

  // ---------------- Auth + load data ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        // Subjects — Firestore profile එකෙන් (O/L + A/L)
        try {
          const snapshot = await getDoc(doc(db, "users", uid));
          const data = snapshot.exists() ? snapshot.data() : {};
          setSubjects(data.profile?.subjects || []);
        } catch (err) {
          console.error("Failed to load subjects:", err);
        }

        // Formulas — user-scoped localStorage
        const saved = localStorage.getItem(`dreamutrack-formulas-${uid}`);
        setFormulas(saved ? JSON.parse(saved) : []);
      } else {
        setSubjects([]);
        setFormulas([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Save formulas — useEffect (fix) ----------------
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(
      `dreamutrack-formulas-${user.uid}`,
      JSON.stringify(formulas),
    );
  }, [formulas, user]);

  // ---------------- Filtered formulas ----------------
  const filteredFormulas = useMemo(() => {
    return formulas
      .filter((f) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          f.title.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          (f.tags || []).some((tag) => tag.toLowerCase().includes(q));

        const matchesSubject =
          !selectedSubject || f.subject === selectedSubject;

        const matchesFavourite = !showFavouritesOnly || f.favourite;

        return matchesSearch && matchesSubject && matchesFavourite;
      })
      .sort((a, b) => {
        // Favourites first, then newest
        if (a.favourite !== b.favourite) return a.favourite ? -1 : 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [formulas, searchQuery, selectedSubject, showFavouritesOnly]);

  // ---------------- Add / edit ----------------
  const handleSave = () => {
    if (!title.trim() || !formula.trim()) return;

    const newFormula = {
      id: editingId || `formula-${Date.now()}`,
      title: title.trim(),
      formula: formula.trim(),
      subject: subject || "General",
      noteType,
      explanation: explanation.trim(),
      example: example.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      favourite: false,
      createdAt: new Date().toISOString(),
    };

    setFormulas((prev) =>
      editingId
        ? prev.map((f) => (f.id === editingId ? newFormula : f))
        : [...prev, newFormula],
    );

    // Reset
    setTitle("");
    setFormula("");
    setSubject("");
    setNoteType("Formula");
    setExplanation("");
    setExample("");
    setTags("");
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleEdit = (f) => {
    setTitle(f.title);
    setFormula(f.formula);
    setSubject(f.subject);
    setNoteType(f.noteType || "Formula");
    setExplanation(f.explanation || "");
    setExample(f.example || "");
    setTags((f.tags || []).join(", "));
    setEditingId(f.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFormulas((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleFavourite = (id) => {
    setFormulas((prev) =>
      prev.map((f) => (f.id === id ? { ...f, favourite: !f.favourite } : f)),
    );
  };

  const copyFormula = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setFormula("");
    setSubject("");
    setNoteType("Formula");
    setExplanation("");
    setExample("");
    setTags("");
    setIsModalOpen(true);
  };

  const inputClass =
    "font-body w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 px-4 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-emerald-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10";

  return (
    <div className="pb-24 md:pb-8 mt-20">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <BookOpen size={24} className="text-emerald-300" />
            Notes & Formulas
          </h1>
          <p className="font-body text-sm text-white/50 mt-1">
            Save formulas, key concepts and quick references.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="font-body flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition">
          <Plus size={18} />
          Add Note
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, formulas, tags..."
            className={`${inputClass} pl-11`}
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`${inputClass} pl-10 pr-8 appearance-none min-w-[150px]`}>
              <option value="" className="bg-[#0e1424]">
                All subjects
              </option>
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#0e1424]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            aria-pressed={showFavouritesOnly}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 font-body text-sm transition ${
              showFavouritesOnly
                ? "border-amber-400/50 bg-amber-400/15 text-amber-300"
                : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/10"
            }`}>
            <Star
              size={16}
              className={showFavouritesOnly ? "fill-amber-300" : ""}
            />
            <span className="hidden sm:inline">Favourites</span>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filteredFormulas.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
          <BookOpen size={48} className="mx-auto text-white/20 mb-4" />
          <p className="font-body text-white/50">
            {searchQuery || selectedSubject || showFavouritesOnly
              ? "No notes match your filters."
              : "No notes yet. Add your first formula or concept!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredFormulas.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 hover:border-emerald-400/30 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <span className="font-body text-[10px] uppercase tracking-wider text-emerald-300/70">
                      {f.noteType || "Formula"}
                    </span>
                    <h3 className="font-heading font-semibold text-[15px] truncate">
                      {f.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavourite(f.id)}
                    aria-label={
                      f.favourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    className="shrink-0 text-white/30 hover:text-amber-300 transition">
                    <Star
                      size={17}
                      className={
                        f.favourite ? "fill-amber-300 text-amber-300" : ""
                      }
                    />
                  </button>
                </div>

                {/* Formula box */}
                <div className="relative rounded-xl border border-white/10 bg-black/20 px-4 py-3 mb-3">
                  <p className="font-mono text-sm text-emerald-100/90 break-words">
                    {f.formula}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyFormula(f.formula)}
                    aria-label="Copy formula"
                    className="absolute right-2 top-2 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 opacity-0 group-hover:opacity-100 hover:text-white transition">
                    <Copy size={13} />
                  </button>
                </div>

                {/* Subject badge */}
                <span className="inline-block self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-body text-[11px] text-emerald-300 mb-3">
                  {f.subject}
                </span>

                {/* Explanation */}
                {f.explanation && (
                  <p className="font-body text-sm text-white/60 mb-2 leading-relaxed">
                    {f.explanation}
                  </p>
                )}

                {/* Example */}
                {f.example && (
                  <p className="font-body text-xs text-white/40 mb-3">
                    Example: {f.example}
                  </p>
                )}

                {/* Tags */}
                {(f.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 font-body text-[11px] text-white/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions — bottom */}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(f)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-body text-xs text-white/60 hover:text-white hover:bg-white/10 transition">
                    <Edit3 size={12} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(f.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-body text-xs text-white/60 hover:text-red-300 hover:border-red-400/30 hover:bg-red-500/10 transition">
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

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
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0e1424] p-6 max-h-[70vh] overflow-y-auto">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold">
                  {editingId ? "Edit Note" : "Add Note"}
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
                {/* Note type */}
                <div>
                  <label className="font-body block text-sm text-white/70 mb-2">
                    Note type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Formula", "Concept", "Definition"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNoteType(type)}
                        className={`rounded-xl border py-2.5 font-body text-xs font-medium transition ${
                          noteType === type
                            ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                            : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="note-title"
                    className="font-body block text-sm text-white/70 mb-2">
                    Title
                  </label>
                  <input
                    id="note-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Newton's Second Law"
                    className={inputClass}
                  />
                </div>

                {/* Formula */}
                <div>
                  <label
                    htmlFor="note-formula"
                    className="font-body block text-sm text-white/70 mb-2">
                    {noteType === "Formula" ? "Formula" : "Key point"}
                  </label>
                  <input
                    id="note-formula"
                    type="text"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    placeholder={
                      noteType === "Formula"
                        ? "e.g. F = ma"
                        : "e.g. Force = mass × acceleration"
                    }
                    className={inputClass}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="note-subject"
                    className="font-body block text-sm text-white/70 mb-2">
                    Subject
                  </label>
                  <select
                    id="note-subject"
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

                {/* Explanation */}
                <div>
                  <label
                    htmlFor="note-explanation"
                    className="font-body block text-sm text-white/70 mb-2">
                    Explanation (optional)
                  </label>
                  <textarea
                    id="note-explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Short explanation..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Example */}
                <div>
                  <label
                    htmlFor="note-example"
                    className="font-body block text-sm text-white/70 mb-2">
                    Example (optional)
                  </label>
                  <input
                    id="note-example"
                    type="text"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    placeholder="e.g. F = 5kg × 2m/s² = 10N"
                    className={inputClass}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="note-tags"
                    className="font-body block text-sm text-white/70 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    id="note-tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. mechanics, dynamics"
                    className={inputClass}
                  />
                </div>

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="font-body w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition">
                  <Check size={18} />
                  {editingId ? "Update Note" : "Save Note"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
