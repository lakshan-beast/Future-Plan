import { useState, useEffect } from "react";
import {
  LuCheck,
  LuCircle,
  LuPlay,
  LuPause,
  LuCalendar,
  LuRotateCcw,
} from "react-icons/lu";

const Dashboard = () => {
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

  // timer event
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
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

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const calculateWeeklyProgress = () => {
    const savedSchedule = localStorage.getItem("weekly-schedule");
    if (!savedSchedule) return 0;

    const schedule = JSON.parse(savedSchedule);
    const days = Object.keys(schedule);

    let totalTasks = 0;
    let completedTasks = 0;

    days.forEach((day) => {
      schedule[day].forEach((slot) => {
        if (slot.text.trim() !== "") {
          // හිස් slots ගණන් ගන්නේ නැහැ
          totalTasks++;
          if (slot.completed) completedTasks++;
        }
      });
    });

    return totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);
  };

  const getLastPaperStats = () => {
    const savedPapers = localStorage.getItem("past-papers");
    if (!savedPapers) return null;

    const papers = JSON.parse(savedPapers);
    if (papers.length === 0) return null;

    // අවසන් වරට ඇතුළත් කළ පේපර් එක ලබා ගැනීම
    return papers[papers.length - 1];
  };

  const lastPaper = getLastPaperStats();

  const calculateWeeksUntilExam = () => {
    const examDate = new Date("2026-08-10"); // 2026 A/L ආරම්භක දිනය
    const today = new Date();

    // දින දෙක අතර පරතරය මිලි තත්පර වලින්
    const diffInMs = examDate - today;

    // සති ගණන ගණනය කිරීම
    const weeksLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

    return weeksLeft > 0 ? weeksLeft : 0;
  };

  // Dashboard.jsx ඇතුළත මේ logic එක update කරන්න

  //   const [seconds, setSeconds] = useState(1500); // 25 mins
  //   const [isActive, setIsActive] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false); // Overtime ද නැද්ද යන්න
  const [totalFocusTime, setTotalFocusTime] = useState(0); // මුළු කාලය සටහන් කිරීමට

  const playAlarm = () => {
    const audio = new Audio("https://mixkit.co");
    audio.play();
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (!isOvertime) {
          if (seconds > 0) {
            setSeconds((s) => s - 1);
          } else {
            // Timer එක 0 වුණා!
            setIsOvertime(true);
            playAlarm(); // Sound එක ප්ලේ කිරීම
          }
        } else {
          // Overtime ගණන් කිරීම (0 සිට ඉහළට)
          setSeconds((s) => s + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isOvertime]);

  // Session එක ඉවර කරලා දත්ත save කිරීම
  const completeSession = () => {
    const finalTime = isOvertime ? 1500 + seconds : 1500 - seconds;
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");

    const newSession = {
      date: new Date().toLocaleDateString(),
      duration: Math.floor(finalTime / 60), // විනාඩි වලින්
      type: "Forest Tree Grown",
    };

    localStorage.setItem(
      "focus-history",
      JSON.stringify([...history, newSession]),
    );

    // Reset Timer
    setIsActive(false);
    setIsOvertime(false);
    setSeconds(1500);
    alert("Session Saved! Your tree is added to the forest 🌲");
  };

  const getTreeStatus = () => {
    if (!isActive && seconds === 1500) return "🌱 Seed"; // පටන් ගන්න කලින්
    if (isOvertime) return "🌳 Fully Grown Tree";
    const progress = ((1500 - seconds) / 1500) * 100;
    if (progress < 30) return "🌿 Sprout";
    if (progress < 70) return "🪴 Sapling";
    return "🌳 Growing Tree";
  };

  const getForestStats = () => {
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
    // අද දවසට අදාළ ගස් පමණක් වෙන් කර ගැනීම
    const today = new Date().toLocaleDateString();
    const todayTrees = history.filter((session) => session.date === today);
    return todayTrees;
  };

  const dailyTrees = getForestStats();
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-main">
        <div className="welcome-section">
          <h1>
            Hello, <span>Winahga!</span>
          </h1>
          <p>Ready to achieve your objectives today?</p>
        </div>

        <div className="dashboard-main-right">
          <div className="date-box">
            <h4>{today}</h4>
            <p>Target: A/L 2026</p>
          </div>
          <div className="badge-status">
            <LuCalendar />
            Time Remaining: {calculateWeeksUntilExam()} Weeks left
          </div>
          <div className="badge-status">
            <LuCalendar />
            Academic Progress: {calculateWeeklyProgress()}%
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div className="left-col">
          <div className="card mini-card count-card">
            <p>Exam Countdown</p>
            <div className="mini-timer">
              <span>{timeLeft?.days}d</span> : <span>{timeLeft?.hours}h</span> :{" "}
              <span>{timeLeft?.mins}m</span> :{" "}
              <span style={{ color: "#eb4d25" }}>{timeLeft?.seconds}s</span>
            </div>
          </div>
          <div className="card performance-card">
            <h3>Recent Evaluation 🎯</h3>
            {lastPaper ? (
              <div className="performance-content">
                <div className="sub-tag">
                  {lastPaper.subject} - {lastPaper.type}
                </div>
                <div className="score-display">
                  <span className="score">{lastPaper.marks}%</span>
                  <p className="label">Performance Score</p>
                </div>
                <div className="remarks-box">
                  <strong>Notes:</strong>{" "}
                  {lastPaper.errors || "No remarks recorded."}
                </div>
              </div>
            ) : (
              <p className="no-data-msg">
                Complete your first past paper to see analysis.
              </p>
            )}
          </div>
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
          // UI එක ඇතුළේ:
          <div className="card forest-gallery-card">
            <h3>Daily Achievement Forest 🌲</h3>
            <div className="trees-display">
              {dailyTrees.length > 0 ? (
                dailyTrees.map((tree, index) => (
                  <div
                    key={index}
                    className="mini-tree-box"
                    title={`Duration: tree.duration}mins`}>
                    <LuTrees className="mini-tree-icon" />
                    <span className="tree-time">{tree.duration}m</span>
                  </div>
                ))
              ) : (
                <p className="no-trees-msg">
                  No trees planted today. Start a session to grow your forest!
                </p>
              )}
            </div>
            <div className="forest-summary">
              Total Focus Time Today:{" "}
              <strong>
                {dailyTrees.reduce((acc, curr) => acc + curr.duration, 0)} mins
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Stats */}
        <div className="right-col">
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

          {/* Progress Section */}
          <div className="daily-progress-container card">
            <div className="progress-info">
              <h3>Daily Progress 🎯</h3>
              <span className="percentage">
                {tasks.length > 0
                  ? Math.round(
                      (tasks.filter((t) => t.completed).length / tasks.length) *
                        100,
                    )
                  : 0}
                %
              </span>
            </div>

            <div className="progress-bar-outer">
              <div
                className="progress-bar-inner"
                style={{
                  width: `${tasks.length > 0 ? (tasks.filter((t) => t.completed).length / tasks.length) * 100 : 0}%`,
                }}></div>
            </div>

            <p className="task-count">
              {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
              completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
