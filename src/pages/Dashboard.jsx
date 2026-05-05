// export default Dashboard;
import { useState, useEffect, useMemo, useRef } from "react";
import { auth } from "../firebase";

import { MdOutlineTimer } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import {
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  // FiTarget,
} from "react-icons/fi";
import {
  LuCheck,
  // LuCircle,
  LuPlay,
  LuPause,
  LuCalendar,
  LuTrees,
  LuSprout,
  LuFlower2,
} from "react-icons/lu";

// let audio = null;

const Dashboard = ({ user }) => {
  // const [newTask, setNewTask] = useState("");
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  // const [alarmInstance, setAlarmInstance] = useState(null);
  // const [bgInstance, setBgInstance] = useState(null);

  const bgMusicRef = useRef(null);

  // const today = new Date().toLocaleDateString("en-US", {
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  // });

  // --- 1. States ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    seconds: 0,
  });

  // const [tasks, setTasks] = useState(() =>
  //   JSON.parse(localStorage.getItem("tasks") || "[]"),
  // );

  // --- 2. Exam Countdown Logic (Target: Aug 10, 2026) ---
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date("2026-08-10T00:00:00") - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- 3. Focus Timer & Overtime Logic ---
  // useEffect(() => {
  //   let interval = null;

  //   if (!bgInstance && !isOvertime) {
  //     // if (!bgMusic) {
  //     bgMusic = new Audio("/bg-music.wav");
  //     bgMusic.loop = true;
  //     bgMusic.volume = 0.5;
  //     bgMusic.play().catch(() => console.log("Bg Audio play Blocked"));
  //     setBgInstance(bgMusic);
  //     // }

  //     interval = setInterval(() => {
  //       if (!isOvertime) {
  //         if (seconds > 0) setSeconds((s) => s - 1);
  //         else {
  //           setIsOvertime(true);

  //           if (bgInstance) {
  //             bgInstance.pause();
  //             setBgInstance(null);
  //           }
  //         }
  //       } else {
  //         setSeconds((s) => s + 1);
  //       }
  //     }, 1000);
  //   } else {
  //     if (bgInstance) {
  //       bgInstance.pause();
  //       setBgInstance(null);
  //     }
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     if (bgInstance) {
  //       bgInstance.pause();
  //       setBgInstance(null);
  //     }
  //   };
  // }, [isActive, seconds, isOvertime, bgInstance]);

  // useEffect(() => {
  //   let interval = null;

  //   if (isActive) {
  //     // 1. විනාඩි 25 පාඩම් කරන වෙලාවේ සද්දේ පටන් ගන්නවා
  //     if (!isOvertime && !bgInstance) {
  //       const audio = new Audio("/nature-sound.mp3");
  //       audio.loop = true;
  //       audio.volume = 0.3;
  //       audio.play().catch(() => {
  //         console.log("Bg Audio play Blocked");
  //       });
  //       setBgInstance(audio);
  //     }

  //     interval = setInterval(() => {
  //       if (!isOvertime) {
  //         if (seconds > 0) {
  //           setSeconds((s) => s - 1);
  //         } else {
  //           // 2. විනාඩි 25 ඉවර වුණාම සද්දේ නවත්තලා Overtime එක පටන් ගන්නවා
  //           setIsOvertime(true);
  //           if (bgInstance) {
  //             bgInstance.pause();
  //             setBgInstance(null);
  //           }
  //         }
  //       } else {
  //         // Overtime එකේදී තත්පර වැඩි වෙනවා (සද්දයක් නැහැ)
  //         setSeconds((s) => s + 1);
  //       }
  //     }, 1000);
  //   } else {
  //     // Pause කරොත් සද්දේ නවත්තනවා
  //     if (bgInstance) {
  //       bgInstance.pause();
  //       setBgInstance(null);
  //     }
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     if (bgInstance) bgInstance.pause();
  //   };
  // }, [isActive, seconds, isOvertime, bgInstance]);

  // useEffect(() => {
  //   let interval = null;

  //   if (isActive && !isOvertime) {
  //     // 1. සද්දය පටන් ගැනීම (එක සැරයක් විතරයි පටන් ගන්නේ)
  //     if (!bgMusicRef.current) {
  //       const audio = new Audio("/nature-sound.mp3");
  //       audio.loop = true;
  //       audio.volume = 0.8;
  //       audio.play().catch(() => {});
  //       bgMusicRef.current = audio;
  //     }

  //     interval = setInterval(() => {
  //       if (seconds > 0) {
  //         setSeconds((s) => s - 1);
  //       } else {
  //         // 2. විනාඩි 25 ඉවර වුණාම සද්දය නතර කිරීම
  //         setIsOvertime(true);
  //         if (bgMusicRef.current) {
  //           bgMusicRef.current.pause();
  //           bgMusicRef.current = null;
  //         }
  //       }
  //       else {
  //         setSeconds((s) => s + 1);
  //       }
  //     }, 1000);
  //   } else {
  //     // 3. Pause කළොත් හෝ Overtime වෙලාවේ සද්දය නැවතීම
  //     if (bgMusicRef.current) {
  //       bgMusicRef.current.pause();
  //       bgMusicRef.current = null;
  //     }
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     if (bgMusicRef.current) bgMusicRef.current.pause();
  //   };
  // }, [isActive, seconds, isOvertime]); // Dependency එකෙන් අර අවුල් සහගත state එක අයින් කළා

  useEffect(() => {
    let interval = null;

    if (isActive) {
      if (!isOvertime && !bgMusicRef.current) {
        bgMusicRef.current = new Audio("/bg-music.wav");
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 1;
        bgMusicRef.current.play().catch(() => {});
      }

      interval = setInterval(() => {
        if (!isOvertime) {
          if (seconds > 0) {
            setSeconds((s) => s - 1);
          } else {
            setIsOvertime(true);
            if (bgMusicRef.current) {
              bgMusicRef.current.pause();
              bgMusicRef.current = null;
            }
          }
        } else {
          setSeconds((s) => s + 1);
        }
      }, 1000);
    } else {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    }

    return () => {
      clearInterval(interval);
      if (bgMusicRef.current) bgMusicRef.current.pause();
    };
  }, [isActive, seconds, isOvertime]);

  // --- 4. Data Calculations (Memoized) ---
  const weeklyProgress = useMemo(() => {
    const schedule = JSON.parse(
      localStorage.getItem("weekly-schedule") || "{}",
    );

    let total = 0,
      done = 0;
    Object.values(schedule).forEach((day) =>
      day.forEach((slot) => {
        if (slot.text.trim()) {
          total++;
          if (slot.completed) done++;
        }
      }),
    );

    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, []);

  const lastPaper = useMemo(() => {
    const papers = JSON.parse(localStorage.getItem("past-papers") || "[]");

    return papers.length ? papers[papers.length - 1] : null;
  }, []);

  // (Weekly Forest)
  const weeklyForest = useMemo(() => {
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");
    const last7Days = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days[d.toLocaleDateString()] = 0;
    }

    history.forEach((session) => {
      if (last7Days[session.date] !== undefined) last7Days[session.date] += 1;
    });

    return Object.entries(last7Days).reverse();
  }, [isActive]);

  const weeksUntilExam = Math.max(
    0,
    Math.floor(
      (new Date("2026-08-10") - new Date()) / (1000 * 60 * 60 * 24 * 7),
    ),
  );

  // --- 5. Event Handlers ---
  // const handleTaskToggle = (id) => {
  //   const updated = tasks.map((t) =>
  //     t.id === id ? { ...t, completed: !t.completed } : t,
  //   );

  //   setTasks(updated);
  //   localStorage.setItem("tasks", JSON.stringify(updated));
  // };

  const finishFocusSession = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current = null;
    }

    const duration = isOvertime
      ? 25 + Math.floor(seconds / 60)
      : 25 - Math.ceil(seconds / 60);
    const history = JSON.parse(localStorage.getItem("focus-history") || "[]");

    localStorage.setItem(
      "focus-history",
      JSON.stringify([
        ...history,
        { date: new Date().toLocaleDateString(), duration },
      ]),
    );

    setIsActive(false);
    setIsOvertime(false);
    setSeconds(1500);

    alert("Tree Planted Successfully!");
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="dashboard-wrapper">
      {/* Header Section */}
      <header className="dashboard-main">
        <div className="user-profile">
          <img
            src={user.photoURL || <FaUserGraduate />}
            alt="profile"
            className="avatar"
            referrerPolicy="no-referrer"
          />
          <h1>
            Hello, <span>{user?.displayName || "Student"}!</span>
          </h1>
          {/* <p>Ready to master your academic goals today?</p> */}
          <p>Target: A/L 2026 | 2026 August 10</p>

          {/* <div className="date-box">
            <h4>{today}</h4>
            <p>Target: A/L 2026</p>
          </div> */}

          <div className="dashboard-main-right">
            <div className="badge-status primary">
              <LuCalendar className="badge-icon" /> {weeksUntilExam} Weeks
              Remaining
            </div>
            <div className="badge-status success">
              <LuCheck className="badge-icon" /> {weeklyProgress}% Progress
            </div>
          </div>

          <button className="logout-btn" onClick={() => auth.signOut()}>
            <CiLogout className="logout-icon" /> Logout
          </button>
        </div>
      </header>

      <div className="main-grid">
        {/* Left Column: Focus & Countdown */}
        <div className="left-col">
          <div className="card countdown-card-premium">
            <h3>
              Final Countdown <MdOutlineTimer />
            </h3>
            <div className="timer-grid">
              <div className="time-item">
                <span>{timeLeft.days}</span>
                <small>Days</small>
              </div>
              <div className="time-item">
                <span>{timeLeft.hours}</span>
                <small>Hours</small>
              </div>
              <div className="time-item">
                <span>{timeLeft.mins}</span>
                <small>Mins</small>
              </div>
              <div className="time-item">
                <span className="secs">{timeLeft.seconds}</span>
                <small>Secs</small>
              </div>
            </div>
            <p>Target: A/L 2026 | 2026 August 10</p>
          </div>

          <div className="card performance-card-premium">
            <div className="card-header">
              <h3>
                Latest Evaluation <FiBarChart2 />
              </h3>
              <span className="live-tag">Live Data</span>
            </div>
            {lastPaper ? (
              <div className="performance-content">
                <div className="score-ring">
                  <span className="score-num">{lastPaper.marks}</span>
                  <span className="percent-sign">%</span>
                </div>
                <div className="paper-info">
                  <span className="sub-badge">{lastPaper.subject}</span>
                  <p>{lastPaper.type} Paper Result</p>
                </div>
              </div>
            ) : (
              <p className="no-data">No records found.</p>
            )}
          </div>
        </div>

        {/* <div className="card todo-card-premium">
          <div className="card-header">
            <h3>
              Daily Objectives <FiTarget />
            </h3>
            <span className="task-count">
              {tasks.filter((t) => !t.completed).length} Left
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTask.trim()) return;
              const updated = [
                ...tasks,
                { id: Date.now(), text: newTask, completed: false },
              ];
              setTasks(updated);
              localStorage.setItem("tasks", JSON.stringify(updated));
              setNewTask("");
            }}
            className="task-input-box">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add next goal..."
            />
            <button type="submit">+</button>
          </form>
          <div className="task-scroll-area">
            {tasks.map((t) => (
              <div
                key={t.id}
                className={`task-item-premium ${t.completed ? "is-done" : ""}`}
                onClick={() => handleTaskToggle(t.id)}>
                <div className="check-box">
                  {t.completed ? <LuCheck /> : <LuCircle />}
                </div>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Right Column: Performance & Tasks */}
        <div className="right-col">
          <div className="card focus-card-premium">
            <h3>
              Deep Work Session <FiActivity />
            </h3>
            <div className="forest-visual">
              {isOvertime || 1500 - seconds > 1200 ? (
                <LuTrees className="tree grown" />
              ) : 1500 - seconds > 600 ? (
                <LuFlower2 className="tree growing" />
              ) : (
                <LuSprout className="tree seed" />
              )}
            </div>

            <div className={`timer-display ${isOvertime ? "emergency" : ""}`}>
              {isOvertime && <span className="ot-label">OVERTIME</span>}
              <h2>{formatTime(seconds)}</h2>
            </div>

            <div className="timer-controls">
              <button
                onClick={() => setIsActive(!isActive)}
                className="btn-start">
                {isActive ? <LuPause /> : <LuPlay />}{" "}
                {isActive ? "Pause" : "Start Again"}
              </button>
              {(isActive || isOvertime) && (
                <button onClick={finishFocusSession} className="btn-complete">
                  Finish & Plant
                </button>
              )}
            </div>
          </div>

          {/* Forest Gallery - separate card for better layout */}
          <div className="card forest-gallery-premium">
            <h3>
              Weekly Forest Growth <FiTrendingUp />
            </h3>
            <div className="calendar-grid">
              {weeklyForest.map(([date, count], i) => (
                <div key={i} className="day-growth">
                  <div className="tree-stack">
                    {[...Array(Math.min(count, 3))].map((_, idx) => (
                      <LuTrees key={idx} />
                    ))}
                    {count === 0 && <span className="seed-dot">.</span>}
                  </div>
                  <span className="day-label">
                    {date === new Date().toLocaleDateString()
                      ? "Today"
                      : date.split("/")[1] + "/" + date.split("/")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* <div className=" performance-card-premium">
            <div className="card-header">
              <h3>
                Latest Evaluation <FiBarChart2 />
              </h3>
              <span className="live-tag">Live Data</span>
            </div>
            {lastPaper ? (
              <div className="performance-content">
                <div className="score-ring">
                  <span className="score-num">{lastPaper.marks}</span>
                  <span className="percent-sign">%</span>
                </div>
                <div className="paper-info">
                  <span className="sub-badge">{lastPaper.subject}</span>
                  <p>{lastPaper.type} Paper Result</p>
                </div>
              </div>
            ) : (
              <p className="no-data">No records found.</p>
            )}
          </div> */}

          {/* <div className="card todo-card-premium">
            <div className="card-header">
              <h3>
                Daily Objectives <FiTarget />
              </h3>
              <span className="task-count">
                {tasks.filter((t) => !t.completed).length} Left
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTask.trim()) return;
                const updated = [
                  ...tasks,
                  { id: Date.now(), text: newTask, completed: false },
                ];
                setTasks(updated);
                localStorage.setItem("tasks", JSON.stringify(updated));
                setNewTask("");
              }}
              className="task-input-box">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add next goal..."
              />
              <button type="submit">+</button>
            </form>
            <div className="task-scroll-area">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={`task-item-premium ${t.completed ? "is-done" : ""}`}
                  onClick={() => handleTaskToggle(t.id)}>
                  <div className="check-box">
                    {t.completed ? <LuCheck /> : <LuCircle />}
                  </div>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
