// import { useState, useEffect } from "react";
// import { LuCheck, LuSquare } from "react-icons/lu";
// import { MdHistory } from "react-icons/md";

// const Timetable = () => {
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const [schedule, setSchedule] = useState(() => {
//     const saved = localStorage.getItem("weekly-schedule");
//     if (saved) return JSON.parse(saved);
//     const initialSchedule = {};
//     days.forEach((day) => {
//       initialSchedule[day] = Array(10).fill({ text: "", completed: false });
//     });
//     return initialSchedule;
//   });

//   useEffect(() => {
//     localStorage.setItem("weekly-schedule", JSON.stringify(schedule));
//   }, [schedule]);

//   const handleTextChange = (day, index, val) => {
//     const newDayTasks = [...schedule[day]];
//     newDayTasks[index] = { ...newDayTasks[index], text: val };
//     setSchedule({ ...schedule, [day]: newDayTasks });
//   };

//   const toggleComplete = (day, index) => {
//     const newDayTasks = [...schedule[day]];
//     newDayTasks[index] = {
//       ...newDayTasks[index],
//       completed: !newDayTasks[index].completed,
//     };
//     setSchedule({ ...schedule, [day]: newDayTasks });
//   };

//   const calculateProgress = (dayTasks) => {
//     const totalWithText = dayTasks.filter((t) => t.text.trim() !== "").length;
//     const completed = dayTasks.filter(
//       (t) => t.text.trim() !== "" && t.completed,
//     ).length;
//     return totalWithText === 0
//       ? 0
//       : Math.round((completed / totalWithText) * 100);
//   };

//   const calculateWeeklyProgress = () => {
//     let total = 0;
//     days.forEach((day) => {
//       total += calculateProgress(schedule[day]);
//     });
//     return Math.round(total / 7);
//   };

//   useEffect(() => {
//     const checkAndArchiveWeek = () => {
//       const lastArchiveDate = localStorage.getItem("last-archive-date");
//       const today = new Date();
//       const currentMonday = new Date(today);
//       currentMonday.setDate(
//         today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1),
//       );
//       currentMonday.setHours(0, 0, 0, 0);

//       if (lastArchiveDate) {
//         const lastArchive = new Date(lastArchiveDate);
//         if (lastArchive < currentMonday) {
//           const history = JSON.parse(
//             localStorage.getItem("weekly-history") || "[]",
//           );
//           const progress = calculateWeeklyProgress();

//           const archivedWeek = {
//             weekId: `Week ${history.length + 1}`,
//             date: lastArchive.toLocaleDateString(),
//             progress: progress,
//             status: "Auto-Archived",
//           };

//           localStorage.setItem(
//             "weekly-history",
//             JSON.stringify([...history, archivedWeek]),
//           );

//           const resetSchedule = {};
//           days.forEach((day) => {
//             resetSchedule[day] = Array(10).fill({ text: "", completed: false });
//           });
//           setSchedule(resetSchedule);
//           localStorage.setItem(
//             "last-archive-date",
//             currentMonday.toISOString(),
//           );
//         }
//       } else {
//         localStorage.setItem("last-archive-date", currentMonday.toISOString());
//       }
//     };
//     checkAndArchiveWeek();
//   }, [schedule]);

//   return (
//     <div className="timetable-page">
//       {/* <div className="tracker-container"> */}
//       <h2>Week Schedule</h2>

//       <div className="timetable-grid">
//         {days.map((day) => (
//           <div key={day} className="day-column card">
//             <div className="day-header">
//               <h4>{day}</h4>
//               <span className="day-percentage">
//                 {calculateProgress(schedule[day])}%
//               </span>
//             </div>
//             <div className="slots">
//               {schedule[day].map((slot, index) => (
//                 <div
//                   key={index}
//                   className={`slot-item ${slot.completed ? "is-done" : ""}`}>
//                   <button onClick={() => toggleComplete(day, index)}>
//                     {slot.completed ? <LuCheck /> : <LuSquare />}
//                   </button>
//                   <input
//                     type="text"
//                     placeholder={`Task ${index + 1}`}
//                     value={slot.text}
//                     onChange={(e) =>
//                       handleTextChange(day, index, e.target.value)
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="day-footer-progress">
//               <div className="bar-outer">
//                 <div
//                   className="bar-inner"
//                   style={{
//                     width: `${calculateProgress(schedule[day])}%`,
//                   }}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="table-section">
//         <h3>
//           Academic History (Previous Weeks) <MdHistory />
//         </h3>
//         <table className="history-table">
//           <thead>
//             <tr>
//               <th>Week</th>
//               <th>Date Archived</th>
//               <th>Final Progress</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {JSON.parse(localStorage.getItem("weekly-history") || "[]").map(
//               (history, i) => (
//                 <tr key={i}>
//                   <td>{history.weekId}</td>
//                   <td>{history.date}</td>
//                   <td>
//                     <div className="mini-progress-bar">
//                       <div
//                         className="fill"
//                         style={{ width: `${history.progress}%` }}></div>
//                       <span>{history.progress}%</span>
//                     </div>
//                   </td>
//                   <td>
//                     <span className="complete-tag">Archived</span>
//                   </td>
//                 </tr>
//               ),
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Timetable;

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Check,
  Circle,
  // Flag,
  // Clock,
  History,
} from "lucide-react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SUBJECT_COLORS = {
  "Combined Maths": "bg-blue-500/20 text-blue-300 border-blue-400/30",
  Physics: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Chemistry: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Biology: "bg-green-500/20 text-green-300 border-green-400/30",
  default: "bg-white/10 text-white/70 border-white/20",
};

// const PRIORITY_COLORS = {
//   high: "text-red-400",
//   medium: "text-yellow-400",
//   low: "text-green-400",
// };

const Timetable = () => {
  const todayRef = useRef(null);

  // ---------------- Week navigation ----------------
  const [weekOffset, setWeekOffset] = useState(0);

  const getMonday = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset * 7);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const weekStart = useMemo(() => getMonday(weekOffset), [weekOffset]);

  const weekNumber = useMemo(() => {
    const d = new Date(weekStart);
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(
      ((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7,
    );
    return week;
  }, [weekStart]);

  const monthYear = useMemo(() => {
    return weekStart.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [weekStart]);

  // ---------------- Schedule state ----------------
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("dreamutrack-weekly-schedule");
    if (saved) return JSON.parse(saved);
    return {};
  });

  // ---------------- Load week data ----------------
  const weekKey = weekStart.toISOString().split("T")[0];

  const weekData = useMemo(() => {
    return schedule[weekKey] || {};
  }, [schedule, weekKey]);

  // ---------------- Task operations ----------------
  const addTask = (dateKey) => {
    const newTask = {
      id: `task-${Date.now()}`,
      text: "",
      subject: "",
      priority: "medium",
      time: "",
      completed: false,
    };

    setSchedule((prev) => {
      const week = prev[weekKey] || {};
      const day = week[dateKey] || { tasks: [] };
      return {
        ...prev,
        [weekKey]: {
          ...week,
          [dateKey]: {
            ...day,
            tasks: [...day.tasks, newTask],
          },
        },
      };
    });
  };

  const removeTask = (dateKey, taskId) => {
    setSchedule((prev) => {
      const week = prev[weekKey] || {};
      const day = week[dateKey] || { tasks: [] };
      return {
        ...prev,
        [weekKey]: {
          ...week,
          [dateKey]: {
            ...day,
            tasks: day.tasks.filter((t) => t.id !== taskId),
          },
        },
      };
    });
  };

  const updateTask = (dateKey, taskId, field, value) => {
    setSchedule((prev) => {
      const week = prev[weekKey] || {};
      const day = week[dateKey] || { tasks: [] };
      return {
        ...prev,
        [weekKey]: {
          ...week,
          [dateKey]: {
            ...day,
            tasks: day.tasks.map((t) =>
              t.id === taskId ? { ...t, [field]: value } : t,
            ),
          },
        },
      };
    });
  };

  const toggleComplete = (dateKey, taskId) => {
    setSchedule((prev) => {
      const week = prev[weekKey] || {};
      const day = week[dateKey] || { tasks: [] };
      return {
        ...prev,
        [weekKey]: {
          ...week,
          [dateKey]: {
            ...day,
            tasks: day.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t,
            ),
          },
        },
      };
    });
  };

  // ---------------- Save to localStorage ----------------
  useEffect(() => {
    localStorage.setItem(
      "dreamutrack-weekly-schedule",
      JSON.stringify(schedule),
    );
  }, [schedule]);

  // ---------------- Auto-scroll to today ----------------
  useEffect(() => {
    if (weekOffset === 0 && todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [weekOffset]);

  // ---------------- Progress calculations ----------------
  const getDayProgress = (dateKey) => {
    const tasks = weekData[dateKey]?.tasks || [];
    const withText = tasks.filter((t) => t.text.trim());
    const completed = withText.filter((t) => t.completed);
    return withText.length === 0
      ? 0
      : Math.round((completed.length / withText.length) * 100);
  };

  const getWeekProgress = () => {
    const allTasks = DAYS.flatMap((_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      return weekData[key]?.tasks || [];
    });
    const withText = allTasks.filter((t) => t.text.trim());
    const completed = withText.filter((t) => t.completed);
    return withText.length === 0
      ? 0
      : Math.round((completed.length / withText.length) * 100);
  };

  // ---------------- History ----------------
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("dreamutrack-weekly-history");
    return saved ? JSON.parse(saved) : [];
  });

  const archiveWeek = () => {
    const archived = {
      weekId: `Week ${weekNumber}`,
      date: new Date().toLocaleDateString(),
      progress: getWeekProgress(),
      status: "Archived",
    };

    const newHistory = [...history, archived];
    setHistory(newHistory);
    localStorage.setItem(
      "dreamutrack-weekly-history",
      JSON.stringify(newHistory),
    );
  };

  const todayKey = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#131a35] to-[#1b1035] text-white p-4 sm:p-6 lg:p-8">
      {/* Week header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CalendarDays size={24} className="text-indigo-300" />
              Week Schedule
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Week {weekNumber} · {monthYear}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition">
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setWeekOffset(0)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
              Today
            </button>

            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition">
              <ChevronRight size={18} />
            </button>

            <button
              onClick={archiveWeek}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2">
              <History size={16} />
              Archive
            </button>
          </div>
        </div>

        {/* Week progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">Weekly progress</span>
            <span className="font-semibold">{getWeekProgress()}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${getWeekProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Day columns - horizontal scroll */}
      <div className="max-w-7xl mx-auto overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {DAYS.map((dayName, i) => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + i);
            const dateKey = d.toISOString().split("T")[0];
            const isToday = dateKey === todayKey;
            const tasks = weekData[dateKey]?.tasks || [];
            const progress = getDayProgress(dateKey);

            return (
              <motion.div
                key={dateKey}
                ref={isToday ? todayRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-96 max-w-full flex-shrink-0 rounded-3xl border p-5 backdrop-blur-xl ${
                  isToday
                    ? "border-indigo-400/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                    : "border-white/10 bg-white/5"
                }`}>
                {/* Day header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{dayName}</h3>
                    <p className="text-xs text-white/40">
                      {d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {isToday && (
                    <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold">
                      Today
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/50">{progress}%</span>
                    <span className="text-white/40">
                      {tasks.filter((t) => t.completed).length}/
                      {tasks.filter((t) => t.text.trim()).length}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Tasks list */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`rounded-xl border p-3 ${
                          task.completed
                            ? "border-emerald-400/30 bg-emerald-500/10"
                            : "border-white/10 bg-white/5"
                        }`}>
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => toggleComplete(dateKey, task.id)}
                            className="mt-0.5">
                            {task.completed ? (
                              <Check size={18} className="text-emerald-400" />
                            ) : (
                              <Circle size={18} className="text-white/40" />
                            )}
                          </button>

                          <div className="flex-1">
                            <input
                              type="text"
                              value={task.text}
                              onChange={(e) =>
                                updateTask(
                                  dateKey,
                                  task.id,
                                  "text",
                                  e.target.value,
                                )
                              }
                              placeholder="Task..."
                              className="w-full bg-transparent text-sm outline-none placeholder-white/30"
                            />

                            <div className="flex items-center gap-2 mt-2">
                              <select
                                value={task.subject}
                                onChange={(e) =>
                                  updateTask(
                                    dateKey,
                                    task.id,
                                    "subject",
                                    e.target.value,
                                  )
                                }
                                className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs outline-none">
                                <option value="">Subject</option>
                                {Object.keys(SUBJECT_COLORS).map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={task.priority}
                                onChange={(e) =>
                                  updateTask(
                                    dateKey,
                                    task.id,
                                    "priority",
                                    e.target.value,
                                  )
                                }
                                className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs outline-none">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>

                              <button
                                onClick={() => removeTask(dateKey, task.id)}
                                className="ml-auto text-white/30 hover:text-red-400 transition">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Add task button */}
                <button
                  onClick={() => addTask(dateKey)}
                  className="mt-4 w-full rounded-xl border border-dashed border-white/20 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white transition flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Add task
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* History section */}
      {history.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <History size={18} />
            Academic History
          </h3>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/50">
                  <th className="px-4 py-3">Week</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3">{h.weekId}</td>
                    <td className="px-4 py-3 text-white/60">{h.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${h.progress}%` }}
                          />
                        </div>
                        <span className="text-xs">{h.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-xs">
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
