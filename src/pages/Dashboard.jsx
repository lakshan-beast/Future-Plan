// import { useState, useEffect } from "react";
// import { GiFlyingTarget } from "react-icons/gi";

// const Dashboard = () => {
//   // විභාගයට ඇති කාලය ගණනය කිරීමේ Logic එක
//   const calculateTimeLeft = () => {
//     const examDate = new Date("2026-10-25T00:00:00"); // මල්ලිගේ විභාග දිනය මෙතනට දාන්න
//     const difference = +examDate - +new Date();

//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="dashboard-container">
//       {/* Countdown Section */}
//       <div className="status-grid">
//         <div className="card countdown-card">
//           <h3>
//             Exam Countdown <GiFlyingTarget />
//           </h3>
//           <div className="timer-display">
//             <div className="time-unit">
//               <span>{timeLeft.days || "0"}</span>
//               <p>Days</p>
//             </div>
//             <div className="time-unit">
//               <span>{timeLeft.hours || "0"}</span>
//               <p>Hours</p>
//             </div>
//             <div className="time-unit">
//               <span>{timeLeft.minutes || "0"}</span>
//               <p>Mins</p>
//             </div>
//           </div>
//         </div>

//         <div className="card welcome-card">
//           <h3>Good Morning, Malli! 👋</h3>
//           <p>අද ඔයාගේ ඉලක්කය සපුරාගන්න සූදානම්ද?</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard; // අන්න මේ පේළිය අනිවාර්යයෙන්ම තියෙන්න ඕනේ

import { useState, useEffect } from "react";
import {
  LuCheck,
  LuCircle,
  LuPlay,
  LuPause,
  LuRotateCcw,
} from "react-icons/lu";

const Dashboard = () => {
  // --- 1. Countdown Logic ---
  //   const calculateTimeLeft = () => {
  //     const examDate = new Date("2025-11-25T00:00:00");
  //     const difference = +examDate - +new Date();
  //     return difference > 0
  //       ? {
  //           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //           mins: Math.floor((difference / 1000 / 60) % 60),
  //         }
  //       : null;
  //   };
  //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // --- 1. Countdown Logic ---
  const calculateTimeLeft = () => {
    const examDate = new Date("2026-08-08T00:00:00");
    const difference = +examDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // මේ useEffect එක අනිවාර්යයෙන්ම දාන්න, එතකොට තමයි ටයිමර් එක වැඩ කරන්නේ
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // විනාඩියකට වරක් update වේ (mins පෙන්වන නිසා)
    return () => clearInterval(timer);
  }, []);

  // --- 2. To-Do List Logic (Local Storage) ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // --- 3. Focus Timer (Pomodoro) Logic ---
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="dashboard-wrapper">
      <div className="main-grid">
        {/* Left Column: Focus & Tasks */}
        <div className="left-col">
          <div className="card focus-card">
            <h3>Focus Timer ⏱️</h3>
            <div className="timer-display">{formatTime(seconds)}</div>
            <div className="timer-controls">
              <button onClick={() => setIsActive(!isActive)}>
                {isActive ? <LuPause /> : <LuPlay />}
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setSeconds(1500);
                }}>
                <LuRotateCcw />
              </button>
            </div>
          </div>

          <div className="card todo-card">
            <h3>Study Planner 📚</h3>
            <form onSubmit={addTask}>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="අද මොනවද ඉගෙන ගන්නේ?"
              />
            </form>
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? "done" : ""}`}
                  onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <LuCheck className="check" />
                  ) : (
                    <LuCircle />
                  )}
                  <span>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Info & Stats */}
        <div className="right-col">
          <div className="card mini-card count-card">
            <p>Exam Countdown</p>
            <div className="mini-timer">
              <span>{timeLeft?.days}d</span> : <span>{timeLeft?.hours}h</span> :{" "}
              <span>{timeLeft?.mins}m</span> :{" "}
              <span style={{ color: "#eb4d25" }}>{timeLeft?.seconds}s</span>
            </div>
          </div>

          <div className="card mini-card progress-summary">
            <p>Daily Progress</p>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%`,
                }}></div>
            </div>
            <small>
              {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
              completed
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
