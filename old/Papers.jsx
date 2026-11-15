import { useState, useEffect } from "react";
import { LuTrash2, LuFileText } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";

const Papers = () => {
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem("past-papers");
    return saved ? JSON.parse(saved) : [];
  });


  const [formData, setFormData] = useState({
    year: "",
    subject: "Maths", 
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
    setFormData({ year: "", type: "Pure", marks: "", errors: "" }); // Form reset
  };

  const deletePaper = (id) => {
    setPapers(papers.filter((paper) => paper.id !== id));
  };

  return (
    <div className="papers-page">
      <div className="tracker-container">
        <h2>
          Add Past Paper Record <FiFileText />
        </h2>

        <form onSubmit={handleSubmit} className="input-section">
          <div className="field">
            <label>Add Paper Year</label>
            <input
              type="number"
              placeholder="Year (e.g. 2022)"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Select Subject</label>
            <select
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }>
              <option value="Maths">Combined Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
          <div className="field">
            <label>Add Marks</label>
            <input
              type="number"
              placeholder="(e.g. 78)"
              value={formData.marks}
              onChange={(e) =>
                setFormData({ ...formData, marks: e.target.value })
              }
            />{" "}
          </div>
          <div className="field">
            <label>Add Errors </label>
            <input
              type="text"
              placeholder="Errors / Remarks"
              value={formData.errors}
              onChange={(e) =>
                setFormData({ ...formData, errors: e.target.value })
              }
            />{" "}
          </div>

          <button type="submit">Add Marks</button>
        </form>

        {/* 2. Table */}
        <div className="table-section">
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
              {papers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.year}</td>
                  <td>
                    <span className={`tag ${paper.subject.toLowerCase()}`}>
                      {paper.subject}
                    </span>
                  </td>
                  <td>
                    <span className="mark-badge">{paper.marks}%</span>
                  </td>
                  <td className="error-cell">{paper.errors || "-"}</td>
                  <td>
                    <button
                      onClick={() => deletePaper(paper.id)}
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
