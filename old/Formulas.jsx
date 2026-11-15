import { useState, useEffect } from "react";
import { LuTrash2, LuSearch } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

const Formulas = () => {
  const [formulas, setFormulas] = useState(() => {
    const saved = localStorage.getItem("study-formulas");
    return saved ? JSON.parse(saved) : [];
  });

  const [newFormula, setNewFormula] = useState({
    category: "",
    title: "",
    content: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("study-formulas", JSON.stringify(formulas));
  }, [formulas]);

  const addFormula = (e) => {
    e.preventDefault();
    if (!newFormula.title || !newFormula.content) return;
    setFormulas([...formulas, { ...newFormula, id: Date.now() }]);
    setNewFormula({ ...newFormula, title: "", content: "" });
  };

  const deleteFormula = (id) => {
    setFormulas(formulas.filter((formula) => formula.id !== id));
  };

  // Search filter
  const filteredFormulas = formulas.filter(
    (formula) =>
      formula.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="formulas-page">
      {/* Search & Add Section */}
      <div className="formula-header">
        <div className="search-bar">
          <LuSearch />
          <input
            type="text"
            placeholder="Search formulas (e.g. Sin, Integration)..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add New Formula Card */}
      <div className="tracker-container">
        <h2>
          Add New Formula <FiPlus />
        </h2>

        <form className="input-section" onSubmit={addFormula}>
          <div className="field">
            <label>Select Subject</label>
            <select
              value={newFormula.category}
              onChange={(e) =>
                setNewFormula({ ...newFormula, category: e.target.value })
              }>
              <option value="Maths">Combined Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
          <div className="field">
            <label>Title</label>
            <input
              placeholder="(e.g. Sin(A+B))"
              value={newFormula.title}
              onChange={(e) =>
                setNewFormula({ ...newFormula, title: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Formula</label>
            <input
              type="text"
              placeholder="(e.g. sinAcosB + cosAsinB)"
              value={newFormula.content}
              onChange={(e) =>
                setNewFormula({ ...newFormula, content: e.target.value })
              }
            />
          </div>
          <button type="submit">Save Formula</button>
        </form>
      </div>

      {/* Display Formulas */}
      <h2>All Formulas</h2>
      <div className="formula-grid">
        {filteredFormulas.map((formula) => (
          <div key={formula.id} className="card formula-item-card">
            <div className="card-header">
              <span className={`tag ${formula.category.toLowerCase()}`}>
                {formula.category}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteFormula(formula.id)}>
                <LuTrash2 />
              </button>
            </div>
            <h4>{formula.title}</h4>
            <div className="formula-content">{formula.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formulas;
