import { useState, useEffect } from "react";

const Dashboard = () => {
  // විභාගයට ඇති කාලය ගණනය කිරීමේ Logic එක
  const calculateTimeLeft = () => {
    const examDate = new Date("2025-11-25T00:00:00"); // මල්ලිගේ විභාග දිනය මෙතනට දාන්න
    const difference = +examDate - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Countdown Section */}
      <div className="status-grid">
        <div className="card countdown-card">
          <h3>Exam Countdown 🎯</h3>
          <div className="timer-display">
            <div className="time-unit">
              <span>{timeLeft.days || "0"}</span>
              <p>Days</p>
            </div>
            <div className="time-unit">
              <span>{timeLeft.hours || "0"}</span>
              <p>Hours</p>
            </div>
            <div className="time-unit">
              <span>{timeLeft.minutes || "0"}</span>
              <p>Mins</p>
            </div>
          </div>
        </div>

        <div className="card welcome-card">
          <h3>Good Morning, Malli! 👋</h3>
          <p>අද ඔයාගේ ඉලක්කය සපුරාගන්න සූදානම්ද?</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // අන්න මේ පේළිය අනිවාර්යයෙන්ම තියෙන්න ඕනේ
