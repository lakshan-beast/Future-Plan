import { useState, useEffect } from "react";
import { LuPlus, LuTrash2, LuSearch } from "react-icons/lu";

const Formulas = () => {
  const [formulas, setFormulas] = useState(() => {
    const saved = localStorage.getItem("study-formulas");
    return saved ? JSON.parse(saved) : [];
  });

  const [newFormula, setNewFormula] = useState({
    category: "Trigonometry",
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
    setFormulas(formulas.filter((f) => f.id !== id));
  };

  // Search filter
  const filteredFormulas = formulas.filter(
    (f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <div className="card add-formula-card">
        <h3>
          Add New Formula <LuPlus />
        </h3>
        <form onSubmit={addFormula}>
          <select
            value={newFormula.category}
            onChange={(e) =>
              setNewFormula({ ...newFormula, category: e.target.value })
            }>
            <option value="Maths">Combined Maths</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
          <input
            placeholder="Title (e.g. Sin(A+B))"
            value={newFormula.title}
            onChange={(e) =>
              setNewFormula({ ...newFormula, title: e.target.value })
            }
          />
          <textarea
            placeholder="Formula (e.g. sinAcosB + cosAsinB)"
            value={newFormula.content}
            onChange={(e) =>
              setNewFormula({ ...newFormula, content: e.target.value })
            }
          />
          <button type="submit">Save Formula</button>
        </form>
      </div>

      {/* Display Formulas */}
      <h3>All Formulas</h3>
      <div className="formula-grid">
        {filteredFormulas.map((f) => (
          <div key={f.id} className="card formula-item-card">
            <div className="card-header">
              <span className={`tag ${f.category.toLowerCase()}`}>
                {f.category}
              </span>
              <button onClick={() => deleteFormula(f.id)}>
                <LuTrash2 />
              </button>
            </div>
            <h4>{f.title}</h4>
            <div className="formula-content">{f.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formulas;
