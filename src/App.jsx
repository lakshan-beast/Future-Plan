import { useState } from "react";

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

// import Logo from "../public/logo.jpg";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <GiFlyingTarget className="logo-icon" />
          Dream<span>Track</span>
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
        {/* * User Profile Section */}
        {/* <div className="user-profile"> */}
        {/* {" "}
          <img src={Logo} alt="avatar" className="avatar" />{" "}
          <div className="info">
            {" "}
            <h4>Wihanga Nimsara</h4> <p>A/L Student</p>{" "}
          </div>{" "}
        </div> */}
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

          <div className="user-info">2026 A/L Target</div>
        </header>

        <section className="page-render">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "papers" && <Papers />}
          {activeTab === "formulas" && <Formulas />}
          {activeTab === "analysis" && <Analysis />}
          {activeTab === "timetable" && <Timetable />}
          {activeTab === "finalpapers" && <FinalPapers />}
        </section>
      </main>
    </div>
  );
}

export default App;
