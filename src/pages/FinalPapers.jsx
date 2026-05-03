// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const FinalPaperTracker = () => {
//   const [papers, setPapers] = useState([]);
//   const [formData, setFormData] = useState({ name: "", marks: "", error: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newPaper = {
//       ...formData,
//       id: Date.now(),
//       marks: Number(formData.marks),
//     };
//     setPapers([...papers, newPaper]);
//     setFormData({ name: "", marks: "", error: "" });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Final Paper Tracker 📝</h2>

//       {/* 1. Add Paper Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-end">
//         <div>
//           <label className="block text-sm">Paper Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm">Marks</label>
//           <input
//             type="number"
//             value={formData.marks}
//             onChange={(e) =>
//               setFormData({ ...formData, marks: e.target.value })
//             }
//             className="border p-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm">Error/Comment</label>
//           <input
//             type="text"
//             value={formData.error}
//             onChange={(e) =>
//               setFormData({ ...formData, error: e.target.value })
//             }
//             className="border p-2 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </form>

//       {/* 2. Marks Graph */}
//       <div className="bg-white p-4 rounded shadow mb-6 h-64">
//         <h3 className="font-bold mb-2">Marks Progress Chart 📈</h3>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={papers}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="marks"
//               stroke="#2563eb"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 3. Error Log Table */}
//       <div className="bg-white p-4 rounded shadow text-black">
//         <h3 className="font-bold mb-2">Error Log ⚠️</h3>
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Paper</th>
//               <th className="p-2">Marks</th>
//               <th className="p-2">Error Reason</th>
//             </tr>
//           </thead>
//           <tbody>
//             {papers.map((p) => (
//               <tr key={p.id} className="border-b">
//                 <td className="p-2">{p.name}</td>
//                 <td className="p-2 font-bold text-blue-600">{p.marks}%</td>
//                 <td className="p-2 text-red-500">{p.error}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FinalPaperTracker;

// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// // import "./FinalPaperTracker.scss";

// const FinalPaperTracker = () => {
//   const [papers, setPapers] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     marks: "",
//     error: "",
//     category: "Maths I",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPapers([
//       ...papers,
//       { ...formData, id: Date.now(), marks: Number(formData.marks) },
//     ]);
//     setFormData({ name: "", marks: "", error: "", category: "Maths I" });
//   };

//   return (
//     <div className="tracker-container">
//       <header className="tracker-header">
//         <h1>Final Paper Manager 🎓</h1>
//         <p>ඔබේ ප්‍රගතිය මෙතැනින් නිරීක්ෂණය කරන්න</p>
//       </header>

//       <section className="form-section">
//         <form onSubmit={handleSubmit} className="paper-form">
//           <div className="input-group">
//             <label>Paper Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               required
//               placeholder="e.g. Model Paper 01"
//             />
//           </div>
//           <div className="input-group">
//             <label>Category</label>
//             <select
//               value={formData.category}
//               onChange={(e) =>
//                 setFormData({ ...formData, category: e.target.value })
//               }>
//               <option>Maths I</option>
//               <option>Maths II</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label>Marks (%)</label>
//             <input
//               type="number"
//               value={formData.marks}
//               onChange={(e) =>
//                 setFormData({ ...formData, marks: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="input-group full-width">
//             <label>Error Log / Remarks</label>
//             <textarea
//               value={formData.error}
//               onChange={(e) =>
//                 setFormData({ ...formData, error: e.target.value })
//               }
//               placeholder="වැරදුණු හේතු මෙහි සටහන් කරන්න..."
//             />
//           </div>
//           <button type="submit" className="btn-submit">
//             Add Record
//           </button>
//         </form>
//       </section>

//       <section className="visuals-section">
//         <div className="chart-card">
//           <h3>Marks Analysis Graph</h3>
//           <div className="chart-wrapper">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={papers}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#eee"
//                 />
//                 <XAxis dataKey="name" stroke="#888" />
//                 <YAxis domain={[0, 100]} stroke="#888" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="marks"
//                   stroke="#3498db"
//                   strokeWidth={3}
//                   dot={{ r: 6 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>

//       <section className="log-section">
//         <div className="table-card">
//           <h3>Error Log & History</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Paper</th>
//                 <th>Category</th>
//                 <th>Marks</th>
//                 <th>Errors/Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {papers.map((p) => (
//                 <tr key={p.id}>
//                   <td>{p.name}</td>
//                   <td>
//                     <span
//                       className={`badge ${p.category.replace(" ", "").toLowerCase()}`}>
//                       {p.category}
//                     </span>
//                   </td>
//                   <td className="marks-cell">{p.marks}%</td>
//                   <td className="error-cell">{p.error}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FinalPaperTracker;

// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// // import "./FinalPaperTracker.scss";

// const FinalPaperTracker = () => {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({
//     paper: "Paper 01",
//     subject: "maths",
//     marks: "",
//   });

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (!form.marks) return;

//     let newData = [...data];
//     const index = newData.findIndex((item) => item.paper === form.paper);

//     if (index > -1) {
//       // පේපර් එක දැනටමත් තිබේ නම්, අදාළ විෂයට ලකුණු එකතු කරයි
//       newData[index] = {
//         ...newData[index],
//         [form.subject]: Number(form.marks),
//       };
//     } else {
//       // අලුත් පේපර් එකක් නම් අලුතින් සාදයි
//       newData.push({ paper: form.paper, [form.subject]: Number(form.marks) });
//     }

//     // පේපර් අංකය අනුව දත්ත පිළිවෙළට සකසයි (Sorting)
//     newData.sort((a, b) =>
//       a.paper.localeCompare(b.paper, undefined, { numeric: true }),
//     );

//     setData(newData);
//     setForm({ ...form, marks: "" }); // ලකුණු ඇතුළත් කරන තැන හිස් කරයි
//   };

//   return (
//     <div className="tracker-container">
//       <h2>Final Paper Progress Tracker 🚀</h2>

//       <form className="input-section" onSubmit={handleAdd}>
//         <div className="field">
//           <label>Select Paper</label>
//           <select
//             value={form.paper}
//             onChange={(e) => setForm({ ...form, paper: e.target.value })}>
//             {[...Array(20)].map((_, i) => (
//               <option
//                 key={i}
//                 value={`Paper ${i + 1 < 10 ? "0" + (i + 1) : i + 1}`}>
//                 Paper {i + 1 < 10 ? "0" + (i + 1) : i + 1}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="field">
//           <label>Subject</label>
//           <select
//             value={form.subject}
//             onChange={(e) => setForm({ ...form, subject: e.target.value })}>
//             <option value="maths">Combined Maths</option>
//             <option value="physics">Physics</option>
//             <option value="chemistry">Chemistry</option>
//           </select>
//         </div>

//         <div className="field">
//           <label>Marks (%)</label>
//           <input
//             type="number"
//             value={form.marks}
//             onChange={(e) => setForm({ ...form, marks: e.target.value })}
//             placeholder="0-100"
//           />
//         </div>

//         <button type="submit">Update Graph</button>
//       </form>

//       <div className="chart-wrapper">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="paper" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="maths"
//               stroke="#3498db"
//               name="Maths"
//               strokeWidth={3}
//               connectNulls
//             />
//             <Line
//               type="monotone"
//               dataKey="physics"
//               stroke="#e74c3c"
//               name="Physics"
//               strokeWidth={3}
//               connectNulls
//             />
//             <Line
//               type="monotone"
//               dataKey="chemistry"
//               stroke="#2ecc71"
//               name="Chemistry"
//               strokeWidth={3}
//               connectNulls
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default FinalPaperTracker;

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import "./FinalPaperTracker.scss";

const FinalPaperTracker = () => {
  // LocalStorage පාවිච්චි කරලා දත්ත ටික ස්ථිරවම තියාගන්නවා
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("finalPaperData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [form, setForm] = useState({
    paper: "Paper 01",
    subject: "maths",
    marks: "",
  });

  useEffect(() => {
    localStorage.setItem("finalPaperData", JSON.stringify(data));
  }, [data]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.marks) return;

    let newData = [...data];
    const index = newData.findIndex((item) => item.paper === form.paper);

    if (index > -1) {
      newData[index] = {
        ...newData[index],
        [form.subject]: Number(form.marks),
      };
    } else {
      newData.push({ paper: form.paper, [form.subject]: Number(form.marks) });
    }

    newData.sort((a, b) =>
      a.paper.localeCompare(b.paper, undefined, { numeric: true }),
    );
    setData(newData);
    setForm({ ...form, marks: "" });
  };

  return (
    <div className="tracker-container">
      <h2>Final Paper Progress Tracker 🚀</h2>

      {/* 1. ලකුණු ඇතුළත් කරන Form එක */}
      <form className="input-section" onSubmit={handleAdd}>
        <div className="field">
          <label>Select Paper</label>
          <select
            value={form.paper}
            onChange={(e) => setForm({ ...form, paper: e.target.value })}>
            {[...Array(20)].map((_, i) => {
              const pName = `Paper ${i + 1 < 10 ? "0" + (i + 1) : i + 1}`;
              return (
                <option key={i} value={pName}>
                  {pName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="field">
          <label>Subject</label>
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            <option value="maths">Combined Maths</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>

        <div className="field">
          <label>Marks (%)</label>
          <input
            type="number"
            value={form.marks}
            onChange={(e) => setForm({ ...form, marks: e.target.value })}
            placeholder="0-100"
          />
        </div>

        <button type="submit">Update Data</button>
      </form>

      {/* 2. ප්‍රස්තාරය (Graph) */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="paper" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="maths"
              stroke="#3498db"
              name="Maths"
              strokeWidth={3}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="physics"
              stroke="#e74c3c"
              name="Physics"
              strokeWidth={3}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="chemistry"
              stroke="#2ecc71"
              name="Chemistry"
              strokeWidth={3}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3. ලකුණු සටහන (Table) - මෙන්න මේ කොටස තමයි අලුතින් එක් කළේ */}
      <div className="table-section">
        <h3>Marks Summary Table</h3>
        <table>
          <thead>
            <tr>
              <th>Paper</th>
              <th className="maths">Maths</th>
              <th className="physics">Physics</th>
              <th className="chemistry">Chemistry</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.paper}</td>
                <td>{item.maths !== undefined ? `${item.maths}%` : "-"}</td>
                <td>{item.physics !== undefined ? `${item.physics}%` : "-"}</td>
                <td>
                  {item.chemistry !== undefined ? `${item.chemistry}%` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <p className="no-data">තවමත් ලකුණු ඇතුළත් කර නොමැත.</p>
        )}
      </div>
    </div>
  );
};

export default FinalPaperTracker;
