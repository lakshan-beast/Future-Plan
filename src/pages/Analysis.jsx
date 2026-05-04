import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Analysis = () => {
  // state දෙකක් වෙනුවට එක object එකක් පාවිච්චි කිරීමෙන් cascading renders මගහැරේ
  const [data, setData] = useState({
    chartData: [],
    stats: { maths: 0, physics: 0, chemistry: 0 },
  });

  useEffect(() => {
    const savedPapers = localStorage.getItem("past-papers");
    if (savedPapers) {
      const parsed = JSON.parse(savedPapers);
      const years = [...new Set(parsed.map((p) => p.year))].sort();

      const formatted = years.map((year) => {
        const entry = { year };
        ["Maths", "Physics", "Chemistry"].forEach((sub) => {
          const papersInYear = parsed.filter(
            (p) => p.year === year && p.subject === sub,
          );
          if (papersInYear.length > 0) {
            const avg =
              papersInYear.reduce((sum, p) => sum + parseFloat(p.marks), 0) /
              papersInYear.length;
            entry[sub] = parseFloat(avg.toFixed(1));
          }
        });
        return entry;
      });

      const calcAvg = (sub) => {
        const subPapers = parsed.filter((p) => p.subject === sub);
        return subPapers.length > 0
          ? (
              subPapers.reduce((acc, curr) => acc + parseFloat(curr.marks), 0) /
              subPapers.length
            ).toFixed(1)
          : 0;
      };

      // --- විසඳුම මෙතනයි: setTimeout පාවිච්චි කරමු ---
      const timeoutId = setTimeout(() => {
        setData({
          chartData: formatted,
          stats: {
            maths: calcAvg("Maths"),
            physics: calcAvg("Physics"),
            chemistry: calcAvg("Chemistry"),
          },
        });
      }, 0);

      return () => clearTimeout(timeoutId); // Cleanup function
    }
  }, []);

  return (
    <div className="analysis-page">
      <div className="analysis-grid">
        <div className="card tracker-container">
          <h3>Overall Performance (Maths, Physics, Chemistry)</h3>
          <div
            className="chart-wrapper"
            style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Maths"
                  name="Maths"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Physics"
                  name="Physics"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Chemistry"
                  name="Chemistry"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stats-row tracker-container">
          <div className=" mini-stat border-chemistry">
            <h4>Chemistry Avg</h4>
            <p className="stat-val">{data.stats.chemistry}%</p>
          </div>
          <div className=" mini-stat border-maths">
            <h4>Maths Avg</h4>
            <p className="stat-val">{data.stats.maths}%</p>
          </div>
          <div className=" mini-stat border-physics">
            <h4>Physics Avg</h4>
            <p className="stat-val">{data.stats.physics}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
