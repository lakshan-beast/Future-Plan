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

  // දත්ත ගබඩා කිරීම (සතියේ දින 7 සඳහා slots 10 බැගින්)
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("weekly-schedule");
    if (saved) return JSON.parse(saved);

    // මුලින්ම හිස් schedule එකක් හදමු
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

  return (
    <div className="timetable-page">
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
                    width: `${calculateProgress(schedule[day])}% `,
                  }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
