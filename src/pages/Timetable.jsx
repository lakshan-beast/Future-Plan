import { useState, useEffect } from "react";
import { LuCheck, LuSquare } from "react-icons/lu";

const Timetable = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("weekly-schedule");
    if (saved) return JSON.parse(saved);
    const initialSchedule = {};
    days.forEach((day) => {
      initialSchedule[day] = Array(10).fill({ text: "", completed: false });
    });
    return initialSchedule;
  });

  useEffect(() => {
    localStorage.setItem("weekly-schedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleTextChange = (day, index, val) => {
    const newDayTasks = [...schedule[day]];
    newDayTasks[index] = { ...newDayTasks[index], text: val };
    setSchedule({ ...schedule, [day]: newDayTasks });
  };

  const toggleComplete = (day, index) => {
    const newDayTasks = [...schedule[day]];
    newDayTasks[index] = {
      ...newDayTasks[index],
      completed: !newDayTasks[index].completed,
    };
    setSchedule({ ...schedule, [day]: newDayTasks });
  };

  const calculateProgress = (dayTasks) => {
    const totalWithText = dayTasks.filter((t) => t.text.trim() !== "").length;
    const completed = dayTasks.filter(
      (t) => t.text.trim() !== "" && t.completed,
    ).length;
    return totalWithText === 0
      ? 0
      : Math.round((completed / totalWithText) * 100);
  };

  // මුළු සතියේම ප්‍රගතිය ගණනය කිරීමට
  const calculateWeeklyProgress = () => {
    let total = 0;
    days.forEach((day) => {
      total += calculateProgress(schedule[day]);
    });
    return Math.round(total / 7);
  };

  useEffect(() => {
    const checkAndArchiveWeek = () => {
      const lastArchiveDate = localStorage.getItem("last-archive-date");
      const today = new Date();
      const currentMonday = new Date(today);
      currentMonday.setDate(
        today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1),
      );
      currentMonday.setHours(0, 0, 0, 0);

      if (lastArchiveDate) {
        const lastArchive = new Date(lastArchiveDate);
        if (lastArchive < currentMonday) {
          const history = JSON.parse(
            localStorage.getItem("weekly-history") || "[]",
          );
          const progress = calculateWeeklyProgress();

          const archivedWeek = {
            weekId: `Week ${history.length + 1}`,
            date: lastArchive.toLocaleDateString(),
            progress: progress,
            status: "Auto-Archived",
          };

          localStorage.setItem(
            "weekly-history",
            JSON.stringify([...history, archivedWeek]),
          );

          const resetSchedule = {};
          days.forEach((day) => {
            resetSchedule[day] = Array(10).fill({ text: "", completed: false });
          });
          setSchedule(resetSchedule);
          localStorage.setItem(
            "last-archive-date",
            currentMonday.toISOString(),
          );
        }
      } else {
        localStorage.setItem("last-archive-date", currentMonday.toISOString());
      }
    };
    checkAndArchiveWeek();
  }, [schedule]);

  return (
    <div className="timetable-page">
      <h2>This Week Schedule</h2>

      <div className="timetable-grid">
        {days.map((day) => (
          <div key={day} className="day-column card">
            <div className="day-header">
              <h4>{day}</h4>
              <span className="day-percentage">
                {calculateProgress(schedule[day])}%
              </span>
            </div>
            <div className="slots">
              {schedule[day].map((slot, idx) => (
                <div
                  key={idx}
                  className={`slot-item ${slot.completed ? "is-done" : ""}`}>
                  <button onClick={() => toggleComplete(day, idx)}>
                    {slot.completed ? <LuCheck /> : <LuSquare />}
                  </button>
                  <input
                    type="text"
                    placeholder={`Slot ${idx + 1}`}
                    value={slot.text}
                    onChange={(e) => handleTextChange(day, idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="day-footer-progress">
              <div className="bar-outer">
                <div
                  className="bar-inner"
                  style={{
                    width: `${calculateProgress(schedule[day])}%`,
                  }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="history-section card"> */}
      <div className="table-section">
        <h3>Academic History (Previous Weeks) 📜</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Date Archived</th>
              <th>Final Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(localStorage.getItem("weekly-history") || "[]").map(
              (h, i) => (
                <tr key={i}>
                  <td>{h.weekId}</td>
                  <td>{h.date}</td>
                  <td>
                    <div className="mini-progress-bar">
                      <div
                        className="fill"
                        style={{ width: `${h.progress}%` }}></div>
                      <span>{h.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="complete-tag">Archived</span>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
