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
import { LuCalendarDays } from "react-icons/lu";
import { PiMathOperationsFill } from "react-icons/pi";
import { GiPapers, GiDreamCatcher } from "react-icons/gi";

// bottom
const BottomNav = ({ activeTab, setActiveTab }) => (
  <nav className="bottom-nav" id="bottom-nav">
    <button
      className={activeTab === "dashboard" ? "active" : ""}
      onClick={() => setActiveTab("dashboard")}>
      <span className="icon">
        <LuCalendarDays />
      </span>
      Home
    </button>

    <button
      className={activeTab === "timetable" ? "active" : ""}
      onClick={() => setActiveTab("timetable")}>
      <span className="icon">
        <LuCalendarDays />
      </span>{" "}
      Timetable
    </button>

    <button
      className={activeTab === "formulas" ? "active" : ""}
      onClick={() => setActiveTab("formulas")}>
      <span className="icon">
        <PiMathOperationsFill />
      </span>{" "}
      Formulas
    </button>

    <button
      className={activeTab === "finalpapers" ? "active" : ""}
      onClick={() => setActiveTab("finalpapers")}>
      <span className="icon">
        <GiPapers />
      </span>{" "}
      Final
    </button>

    <button
      className={activeTab === "papers" ? "active" : ""}
      onClick={() => setActiveTab("papers")}>
      <span className="icon">
        <IoDocumentsSharp />
      </span>{" "}
      Past
    </button>

    <button
      className={activeTab === "analysis" ? "active" : ""}
      onClick={() => setActiveTab("analysis")}>
      <span className="icon">
        <IoStatsChart />
      </span>{" "}
      Analysis
    </button>
  </nav>
);

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // 2. Firebase User check ක
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <aside className="sidebar" id="sidebar">
        <div className="logo">
          <GiDreamCatcher className="logo-icon" />
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
          <a href="https://lakshan-sandeepa-dev.vercel.app/" target="_blank">
            Lakshan
          </a>
        </div>
      </aside>

      {/* Main Content - දකුණු පස ප්‍රධාන කොටස */}
      <main className="main-content">
        <header className="top-bar">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        <section className="page-render">
          {activeTab === "dashboard" && <Dashboard user={user} />}
          {activeTab === "papers" && <Papers />}
          {activeTab === "formulas" && <Formulas />}
          {activeTab === "analysis" && <Analysis />}
          {activeTab === "timetable" && <Timetable />}
          {activeTab === "finalpapers" && <FinalPapers />}

          {/* {activeTab === "desktop-warning" && <DesktopOnlyView />} */}
          {/* {activeTab === "bottom-nav" && <BottomNav />} */}
        </section>
      </main>
    </div>
  );
}

export default App;
