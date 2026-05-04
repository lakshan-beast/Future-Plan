import { useState, useEffect } from "react";
import { LuPlus, LuTrash2, LuFileText } from "react-icons/lu";

const Papers = () => {
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem("past-papers");
    return saved ? JSON.parse(saved) : [];
  });

  // state එක මේ විදිහට වෙනස් කරන්න
  const [formData, setFormData] = useState({
    year: "",
    subject: "Maths", // අලුතින් එකතු කළා
    type: "Theory/Full",
    marks: "",
    errors: "",
  });

  useEffect(() => {
    localStorage.setItem("past-papers", JSON.stringify(papers));
  }, [papers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.year || !formData.marks) return;
    setPapers([...papers, { ...formData, id: Date.now() }]);
    setFormData({ year: "", type: "Pure", marks: "", errors: "" }); // Form එක reset කරන්න
  };

  const deletePaper = (id) => {
    setPapers(papers.filter((p) => p.id !== id));
  };

  return (
    <div className="papers-page">
      {/* <div className=" paper-form"> */}
      <div className="card tracker-container">
        <h2>Add Past Paper Record 📝</h2>

        <form
          className="paper-form"
          onSubmit={handleSubmit}
          className="paper-form">
          {/* <div className="field"> */}
          <input
            type="number"
            placeholder="Year (e.g. 2022)"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
          {/* </div> */}
          {/* <div className="field"> */}
          <select
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }>
            <option value="Maths">Combined Maths</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
          {/* </div> */}
          {/* <div className="field"> */}
          <input
            type="number"
            placeholder="Marks"
            value={formData.marks}
            onChange={(e) =>
              setFormData({ ...formData, marks: e.target.value })
            }
          />
          {/* </div> */}
          {/* <div className="field"> */}
          <input
            type="text"
            placeholder="Errors / Remarks"
            value={formData.errors}
            onChange={(e) =>
              setFormData({ ...formData, errors: e.target.value })
            }
          />
          {/* </div> */}

          <button type="submit">
            <LuPlus /> Add
          </button>
        </form>
        {/* </div> */}

        {/* 2. Table එක - ඇතුළත් කළ දත්ත පෙන්වීමට */}
        {/* <div className="card table-card"> */}
        <div className=" table-section">
          <h3>
            Results History <LuFileText />
          </h3>
          <table className="papers-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Type</th>
                <th>Marks</th>
                <th>Errors/Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((p) => (
                <tr key={p.id}>
                  <td>{p.year}</td>
                  <td>
                    <span className={`tag ${p.subject.toLowerCase()}`}>
                      {p.subject}
                    </span>
                  </td>
                  <td>
                    <span className="mark-badge">{p.marks}%</span>
                  </td>
                  <td className="error-cell">{p.errors || "-"}</td>
                  <td>
                    <button
                      onClick={() => deletePaper(p.id)}
                      className="delete-btn">
                      <LuTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Papers;
