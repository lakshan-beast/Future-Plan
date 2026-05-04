import { useState, useEffect } from "react";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Papers from "./pages/Papers";
import Formulas from "./pages/Formulas";
import Analysis from "./pages/Analysis";
import Timetable from "./pages/Timetable";
import FinalPapers from "./pages/FinalPapers";

import { MdSpaceDashboard } from "react-icons/md";
import { IoDocumentsSharp, IoStatsChart } from "react-icons/io5";
import { GiFlyingTarget } from "react-icons/gi";
import { LuCalendarDays } from "react-icons/lu";
import { PiMathOperationsFill } from "react-icons/pi";
import { GiPapers } from "react-icons/gi";
import { LuMonitorOff } from "react-icons/lu";

const DesktopOnlyView = () => (
  <div className="mobile-blocker">
    <div className="device-animation">
      <LuMonitorOff />
    </div>
    <h2>Desktop Experience Only</h2>
    <p>
      This dashboard is optimized for Large Screens. Please switch to a Desktop
      or Laptop.
    </p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 800);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Login එක check කරනකම් පොඩි වෙලාවක් යනවා

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // 1. Screen size එක check කිරීම
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 800);
    window.addEventListener("resize", handleResize);

    // 2. Firebase User check කිරීම
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loading වෙලාවට හිස් screen එකක් පේනවා වෙනුවට මොනවා හරි දාන්න පුළුවන්
  // if (loading) return <div className="loader">Loading...</div>;
  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader-content">
          <div className="spinner"></div>
          <h3>Dream Track</h3>
          <p>Syncing your academic progress...</p>
        </div>
      </div>
    );
  }

  // Screen එක පොඩි නම් මුලින්ම ඒක පෙන්වමු (Login වෙලා හිටියත් නැතත්)
  if (!isLargeScreen) {
    return (
      <div className="mobile-blocker">
        <h2>Desktop Experience Only</h2>
        <p>Please use a computer to access your study plan.</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <GiFlyingTarget className="logo-icon" />
          <span className="logo-name">Dream</span>
          <span>Track</span>
        </div>
        <nav className="nav-menu">
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}>
            <span className="icon">
              <MdSpaceDashboard />
            </span>{" "}
            Dashboard
          </button>

          <button
            className={activeTab === "timetable" ? "active" : ""}
            onClick={() => setActiveTab("timetable")}>
            <span className="icon">
              <LuCalendarDays />
            </span>{" "}
            Master Schedule
          </button>

          <button
            className={activeTab === "formulas" ? "active" : ""}
            onClick={() => setActiveTab("formulas")}>
            <span className="icon">
              <PiMathOperationsFill />
            </span>{" "}
            Formulas Vault
          </button>

          <button
            className={activeTab === "finalpapers" ? "active" : ""}
            onClick={() => setActiveTab("finalpapers")}>
            <span className="icon">
              <GiPapers />
            </span>{" "}
            Final Papers
          </button>

          <button
            className={activeTab === "papers" ? "active" : ""}
            onClick={() => setActiveTab("papers")}>
            <span className="icon">
              <IoDocumentsSharp />
            </span>{" "}
            Past Papers
          </button>

          <button
            className={activeTab === "analysis" ? "active" : ""}
            onClick={() => setActiveTab("analysis")}>
            <span className="icon">
              <IoStatsChart />
            </span>{" "}
            Past Paper Analysis
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="footer-status">
            <div className="status-dot"></div>
            <span>System Operational</span>
          </div>
          <p>Precision Study Engine | Edition 2026 </p>
        </div>
      </aside>

      {/* Main Content - දකුණු පස ප්‍රධාන කොටස */}
      <main className="main-content">
        <header className="top-bar">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

          <div className="date-box">
            <h4>{today}</h4>
            <p>Target: A/L 2026</p>
          </div>
        </header>

        <section className="page-render">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "papers" && <Papers />}
          {activeTab === "formulas" && <Formulas />}
          {activeTab === "analysis" && <Analysis />}
          {activeTab === "timetable" && <Timetable />}
          {activeTab === "finalpapers" && <FinalPapers />}

          {activeTab === "desktop-warning" && <DesktopOnlyView />}
        </section>
      </main>
    </div>
  );
}

export default App;
