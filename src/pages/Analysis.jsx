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
  const [data, setData] = useState({
    chartData: [],
    stats: { maths: 0, physics: 0, chemistry: 0 },
  });

  useEffect(() => {
    const savedPapers = localStorage.getItem("past-papers");
    if (savedPapers) {
      const parsed = JSON.parse(savedPapers);
      const years = [...new Set(parsed.map((paper) => paper.year))].sort();

      const formatted = years.map((year) => {
        const entry = { year };

        ["Maths", "Physics", "Chemistry"].forEach((sub) => {
          const papersInYear = parsed.filter(
            (paper) => paper.year === year && paper.subject === sub,
          );

          if (papersInYear.length > 0) {
            const avg =
              papersInYear.reduce(
                (sum, paper) => sum + parseFloat(paper.marks),
                0,
              ) / papersInYear.length;
            entry[sub] = parseFloat(avg.toFixed(1));
          }
        });

        return entry;
      });

      const calcAvg = (sub) => {
        const subPapers = parsed.filter((paper) => paper.subject === sub);
        return subPapers.length > 0
          ? (
              subPapers.reduce((acc, curr) => acc + parseFloat(curr.marks), 0) /
              subPapers.length
            ).toFixed(1)
          : 0;
      };

      // --- setTimeout
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
      <div className="tracker-container">
        <h2>Overall Performance | Past Papers</h2>

        <div className="chart-wrapper">
          <ResponsiveContainer width="99%" aspect={2.5}>
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
          <h4>Com. Maths Avg</h4>
          <p className="stat-val">{data.stats.maths}%</p>
        </div>
        <div className=" mini-stat border-physics">
          <h4>Physics Avg</h4>
          <p className="stat-val">{data.stats.physics}%</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
