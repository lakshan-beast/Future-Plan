// // import { useState, useEffect } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// // } from "recharts";

// // const Analysis = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Past Papers වලින් දත්ත ලබා ගැනීම
// //     const savedPapers = localStorage.getItem("past-papers");
// //     if (savedPapers) {
// //       const parsed = JSON.parse(savedPapers);
// //       // අවුරුද්ද අනුව දත්ත පිළිවෙළට සකස් කිරීම
// //       const sortedData = parsed.sort((a, b) => a.year - b.year);
// //       setData(sortedData);
// //     }
// //   }, []);

// //   return (
// //     <div className="analysis-page">
// //       <div className="analysis-grid">
// //         {/* 1. Progress Graph */}
// //         <div className="card chart-card">
// //           <h3>
// //             Marks Progression <BarChart />
// //           </h3>
// //           <div className="chart-container">
// //             {data.length > 0 ? (
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <LineChart data={data}>
// //                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
// //                   <XAxis dataKey="year" title="Year" />
// //                   <YAxis domain={[0, 100]} />
// //                   <Tooltip />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="marks"
// //                     stroke="#2563eb"
// //                     strokeWidth={3}
// //                     dot={{ r: 6, fill: "#2563eb" }}
// //                     activeDot={{ r: 8 }}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <p className="no-data">
// //                 දත්ත ඇතුළත් කර නැත. Past Papers කොටසට ගොස් ලකුණු ඇතුළත් කරන්න.
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         {/* 2. Quick Stats Card */}
// //         <div className="stats-row">
// //           <div className="card mini-stat">
// //             <h4>
// //               Average Marks <Bar />
// //             </h4>
// //             <p className="stat-val">
// //               {data.length > 0
// //                 ? (
// //                     data.reduce((acc, curr) => acc + Number(curr.marks), 0) /
// //                     data.length
// //                   ).toFixed(1)
// //                 : 0}
// //               %
// //             </p>
// //           </div>
// //           <div className="card mini-stat">
// //             <h4>Highest Mark</h4>
// //             <p className="stat-val text-green">
// //               {data.length > 0 ? Math.max(...data.map((d) => d.marks)) : 0}%
// //             </p>
// //           </div>
// //           <div className="card mini-stat">
// //             <h4>Papers Completed</h4>
// //             <p className="stat-val text-blue">{data.length}</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Analysis;

// import { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Analysis = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const savedPapers = localStorage.getItem("past-papers");
//     if (savedPapers) {
//       const parsed = JSON.parse(savedPapers);
//       // දත්ත ටික Numbers බවට පත් කර අවුරුද්ද අනුව Sort කිරීම
//       const formattedData = parsed
//         .map((item) => ({
//           ...item,
//           year: parseInt(item.year),
//           marks: parseFloat(item.marks),
//         }))
//         .sort((a, b) => a.year - b.year);

//       setData(formattedData);
//     }
//   }, []);

//   // සාමාන්‍ය අගය ගණනය කිරීම
//   const average =
//     data.length > 0
//       ? (data.reduce((acc, curr) => acc + curr.marks, 0) / data.length).toFixed(
//           1,
//         )
//       : 0;

//   const highest = data.length > 0 ? Math.max(...data.map((d) => d.marks)) : 0;

//   return (
//     <div className="analysis-page">
//       <div className="analysis-grid">
//         <div className="card chart-card">
//           <h3>Marks Progression 📈</h3>
//           <div
//             className="chart-container"
//             style={{ width: "100%", height: 300 }}>
//             {data.length > 0 ? (
//               <ResponsiveContainer>
//                 <LineChart data={data}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     stroke="#eee"
//                   />
//                   <XAxis dataKey="year" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip
//                     contentStyle={{
//                       borderRadius: "10px",
//                       border: "none",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="marks"
//                     stroke="#2563eb"
//                     strokeWidth={3}
//                     dot={{
//                       r: 6,
//                       fill: "#2563eb",
//                       strokeWidth: 2,
//                       stroke: "#fff",
//                     }}
//                     activeDot={{ r: 8 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="no-data">
//                 දත්ත ඇතුළත් කර නැත. Past Papers කොටසට ගොස් ලකුණු ඇතුළත් කරන්න.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="stats-row">
//           <div className="card mini-stat">
//             <h4>Average Marks</h4>
//             <p className="stat-val">{average}%</p>
//           </div>
//           <div className="card mini-stat">
//             <h4>Highest Mark</h4>
//             <p className="stat-val text-green">{highest}%</p>
//           </div>
//           <div className="card mini-stat">
//             <h4>Papers Completed</h4>
//             <p className="stat-val text-blue">{data.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analysis;
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedPapers = localStorage.getItem("past-papers");
    if (savedPapers) {
      try {
        const parsed = JSON.parse(savedPapers);
        const formattedData = parsed
          .map((item) => ({
            ...item,
            year: parseInt(item.year) || 0,
            marks: parseFloat(item.marks) || 0,
          }))
          .sort((a, b) => a.year - b.year);

        setData(formattedData);
      } catch (err) {
        console.error("Data parsing error:", err);
      }
    }
  }, []);

  const average =
    data.length > 0
      ? (data.reduce((acc, curr) => acc + curr.marks, 0) / data.length).toFixed(
          1,
        )
      : "0.0";

  const highest = data.length > 0 ? Math.max(...data.map((d) => d.marks)) : 0;

  return (
    <div className="analysis-page">
      <div className="analysis-grid">
        <div className="card chart-card">
          <h3>Marks Progression 📈</h3>
          <div
            className="chart-container"
            style={{ width: "100%", height: "300px", minHeight: "300px" }}>
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eee"
                  />
                  <XAxis dataKey="year" padding={{ left: 30, right: 30 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="marks"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="no-data"
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "#94a3b8",
                }}>
                දත්ත ඇතුළත් කර නැත. Past Papers පිටුවට ගොස් ලකුණු ඇතුළත් කරන්න.
              </div>
            )}
          </div>
        </div>

        <div className="stats-row">
          <div className="card mini-stat">
            <h4>Average Marks</h4>
            <p className="stat-val">{average}%</p>
          </div>
          <div className="card mini-stat">
            <h4>Highest Mark</h4>
            <p className="stat-val" style={{ color: "#10b981" }}>
              {highest}%
            </p>
          </div>
          <div className="card mini-stat">
            <h4>Papers Completed</h4>
            <p className="stat-val" style={{ color: "#2563eb" }}>
              {data.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
