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
              const pName = `Final Paper ${i + 1 < 10 ? "0" + (i + 1) : i + 1}`;
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
              stroke="#e9415d"
              name="Maths"
              strokeWidth={3}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="physics"
              stroke="#6d3be2"
              name="Physics"
              strokeWidth={3}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="chemistry"
              stroke="#47facd"
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
