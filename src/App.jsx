// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import { useState } from "react";
// import "./styles/main.scss";
// import Dashboard from "./pages/Dashboard";
// function App() {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-900 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-blue-800">
//           StudyFlow ML
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           <button
//             onClick={() => setActiveTab("dashboard")}
//             className={`w-full text-left p-3 rounded ${activeTab === "dashboard" ? "bg-blue-700" : "hover:bg-blue-800"}`}>
//             📊 Dashboard
//           </button>
//           <button
//             onClick={() => setActiveTab("papers")}
//             className={`w-full text-left p-3 rounded ${activeTab === "papers" ? "bg-blue-700" : "hover:bg-blue-800"}`}>
//             📝 Past Papers
//           </button>
//           <button
//             onClick={() => setActiveTab("formulas")}
//             className={`w-full text-left p-3 rounded ${activeTab === "formulas" ? "bg-blue-700" : "hover:bg-blue-800"}`}>
//             📐 Formula Sheet
//           </button>
//         </nav>
//         <div className="p-4 border-t border-blue-800 text-sm text-blue-300">
//           For Combined Maths 🇱🇰
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 overflow-y-auto p-8">
//         {activeTab === "dashboard" && <Dashboard />}
//         {activeTab === "papers" && (
//           <div className="text-2xl font-bold">
//             Past Paper Tracker (Coming Soon)
//           </div>
//         )}
//         {activeTab === "formulas" && (
//           <div className="text-2xl font-bold">Formula Sheet (Coming Soon)</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import "./styles/main.scss";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   return (
//     <div className="app-container">
//       <aside className="sidebar">
//         <div className="logo">StudyFlow</div>
//         <nav>
//           <button
//             className={activeTab === "dashboard" ? "active" : ""}
//             onClick={() => setActiveTab("dashboard")}>
//             📊 Dashboard
//           </button>
//           <button
//             className={activeTab === "papers" ? "active" : ""}
//             onClick={() => setActiveTab("papers")}>
//             📝 Past Papers
//           </button>
//           {/* අනෙක් buttons... */}
//         </nav>
//       </aside>

//       <main className="content">
//         {activeTab === "dashboard" && <Dashboard />}
//         {activeTab === "papers" && <h2>Past Paper Tracker</h2>}
//       </main>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Papers from "./pages/Papers";
import Formulas from "./pages/Formulas";
import Analysis from "./pages/Analysis";
import Timetable from "./pages/Timetable";

import { MdSpaceDashboard } from "react-icons/md";
import { IoDocumentsSharp, IoStatsChart } from "react-icons/io5";

import { GiFlyingTarget } from "react-icons/gi";
import { TbMathFunction } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";

import Logo from "../public/logo.jpg";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <GiFlyingTarget className="logo-icon" />
          Future<span>Plan</span>
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
            className={activeTab === "papers" ? "active" : ""}
            onClick={() => setActiveTab("papers")}>
            <span className="icon">
              <IoDocumentsSharp />
            </span>{" "}
            Past Papers
          </button>

          <button
            className={activeTab === "formulas" ? "active" : ""}
            onClick={() => setActiveTab("formulas")}>
            <span className="icon">
              <TbMathFunction />
            </span>{" "}
            Formulas
          </button>

          <button
            className={activeTab === "analysis" ? "active" : ""}
            onClick={() => setActiveTab("analysis")}>
            <span className="icon">
              <IoStatsChart />
            </span>{" "}
            Analysis
          </button>

          <button
            className={activeTab === "timetable" ? "active" : ""}
            onClick={() => setActiveTab("timetable")}>
            <span className="icon">
              <LuCalendarDays />
            </span>{" "}
            Timetable
          </button>
        </nav>
        {/* * User Profile Section */}
        <div className="user-profile">
          {" "}
          <img src={Logo} alt="avatar" className="avatar" />{" "}
          <div className="info">
            {" "}
            <h4>Wihanga</h4> <p>A/L Student</p>{" "}
          </div>{" "}
        </div>
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
          {/* <button
            className="icon-btn-notify"
            style={{
              border: "none",
              background: "#f8fafc",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              color: "#64748b",
            }}>
            <LuBell size={20} />
          </button> */}
          <div className="user-info">
            A/L 2026 Target <GiFlyingTarget />
          </div>
        </header>

        <section className="page-render">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "papers" && <Papers />}
          {activeTab === "formulas" && <Formulas />}
          {activeTab === "analysis" && <Analysis />}
          {activeTab === "timetable" && <Timetable />}
        </section>
      </main>
    </div>
  );
}

export default App;
