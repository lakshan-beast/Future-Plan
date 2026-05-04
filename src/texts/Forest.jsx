import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// import "./DailyStudyTracker.scss";

const DailyStudyTracker = () => {
  const [dailyData, setDailyData] = useState(() => {
    const saved = localStorage.getItem("studyForestData");
    return saved ? JSON.parse(saved) : [];
  });

  // Forest එකෙන් Session එකක් ඉවර වුණාම මේක Call කරන්න පුළුවන්
  const addStudyTime = (minutes) => {
    const today = new Date().toLocaleDateString();
    const hours = parseFloat((minutes / 60).toFixed(2));

    let updatedData = [...dailyData];
    const index = updatedData.findIndex((d) => d.date === today);

    if (index > -1) {
      updatedData[index].hours = parseFloat(
        (updatedData[index].hours + hours).toFixed(2),
      );
    } else {
      updatedData.push({ date: today, hours: hours });
    }

    setDailyData(updatedData);
    localStorage.setItem("studyForestData", JSON.stringify(updatedData));
  };

  return (
    <div className="forest-tracker">
      <h3>Daily Study Forest 🌳</h3>
      <p className="subtitle">දිනපතා පාඩම් කළ පැය ගණන</p>

      <div className="stats-cards">
        <div className="card">
          <span>අද දවසේ එකතුව</span>
          <h4>
            {dailyData.find((d) => d.date === new Date().toLocaleDateString())
              ?.hours || 0}{" "}
            hrs
          </h4>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData.slice(-7)}>
            {" "}
            {/* අන්තිම දවස් 7 විතරක් පෙන්වන්න */}
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip cursor={{ fill: "#f0f0f0" }} />
            <Bar dataKey="hours" radius={[5, 5, 0, 0]}>
              {dailyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hours >= 6 ? "#27ae60" : "#f1c40f"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Test Button - මේක පස්සේ Forest Timer එකට සම්බන්ධ කරන්න පුළුවන් */}
      <button className="test-btn" onClick={() => addStudyTime(25)}>
        Add 25 Min Session
      </button>
    </div>
  );
};

export default DailyStudyTracker;
