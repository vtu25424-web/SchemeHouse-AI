import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [schemes, setSchemes] = useState([]);

  const [formData, setFormData] = useState({
    scheme_name: "",
    category: "",
    min_income: "",
    max_income: "",
    eligibility: "",
    benefits: "",
    official_link: ""
  });

  const [editingScheme, setEditingScheme] = useState(null);

  // =========================
  // FETCH SCHEMES
  // =========================
  const fetchSchemes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/admin/schemes"
      );

      setSchemes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD SCHEME
  // =========================
  const addScheme = async () => {
    try {
      const payload = {
        scheme_name: formData.scheme_name,
        category: formData.category,
        min_income: Number(formData.min_income),
        max_income: Number(formData.max_income),
        eligibility: formData.eligibility
          .split(",")
          .map((item) => item.trim()),
        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim()),
        official_link: formData.official_link
      };

      await axios.post(
        "http://localhost:8000/admin/add-scheme",
        payload
      );

      fetchSchemes();

      setFormData({
        scheme_name: "",
        category: "",
        min_income: "",
        max_income: "",
        eligibility: "",
        benefits: "",
        official_link: ""
      });

      alert("Scheme Added");
    } catch (error) {
      console.error(error);
      alert("Failed to add scheme");
    }
  };

  // =========================
  // DELETE SCHEME
  // =========================
  const deleteScheme = async (schemeName) => {
    try {
      await axios.delete(
        `http://localhost:8000/admin/delete-scheme/${schemeName}`
      );

      fetchSchemes();

      alert("Scheme Deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete scheme");
    }
  };

  // =========================
  // LOAD SCHEME FOR EDIT
  // =========================
  const editScheme = (scheme) => {
    setEditingScheme(scheme.scheme_name);

    setFormData({
      scheme_name: scheme.scheme_name,
      category: scheme.category,
      min_income: scheme.min_income,
      max_income: scheme.max_income,
      eligibility: Array.isArray(scheme.eligibility)
        ? scheme.eligibility.join(",")
        : "",
      benefits: Array.isArray(scheme.benefits)
        ? scheme.benefits.join(",")
        : "",
      official_link: scheme.official_link || ""
    });
  };

  // =========================
  // UPDATE SCHEME
  // =========================
  const updateScheme = async () => {
    try {
      const payload = {
        scheme_name: formData.scheme_name,
        category: formData.category,
        min_income: Number(formData.min_income),
        max_income: Number(formData.max_income),
        eligibility: formData.eligibility
          .split(",")
          .map((item) => item.trim()),
        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim()),
        official_link: formData.official_link
      };

      await axios.put(
        `http://localhost:8000/admin/update-scheme/${editingScheme}`,
        payload
      );

      setEditingScheme(null);

      setFormData({
        scheme_name: "",
        category: "",
        min_income: "",
        max_income: "",
        eligibility: "",
        benefits: "",
        official_link: ""
      });

      fetchSchemes();

      alert("Scheme Updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update scheme");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      <input
        type="text"
        name="scheme_name"
        placeholder="Scheme Name"
        value={formData.scheme_name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="min_income"
        placeholder="Min Income"
        value={formData.min_income}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="max_income"
        placeholder="Max Income"
        value={formData.max_income}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="eligibility"
        placeholder="Farmer, Women"
        value={formData.eligibility}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="benefits"
        placeholder="Loan, Subsidy"
        value={formData.benefits}
        onChange={handleChange}
      />

      <br /><br />

      {/* NEW FIELD */}
      <input
        type="text"
        name="official_link"
        placeholder="Official Scheme Website"
        value={formData.official_link}
        onChange={handleChange}
      />

      <br /><br />

      {editingScheme ? (
        <button onClick={updateScheme}>
          Update Scheme
        </button>
      ) : (
        <button onClick={addScheme}>
          Add Scheme
        </button>
      )}

      <hr />

      <h2>MongoDB Schemes</h2>

      {schemes.length === 0 ? (
        <p>No schemes found.</p>
      ) : (
        schemes.map((scheme, index) => (
          <div key={index}>
            <h3>{scheme.scheme_name}</h3>

            <p>Category: {scheme.category}</p>

            <p>
              Income: ₹{scheme.min_income} - ₹{scheme.max_income}
            </p>

            {scheme.official_link && (
              <p>
                🔗 <a href={scheme.official_link} target="_blank" rel="noreferrer">
                  Official Link
                </a>
              </p>
            )}

            <button onClick={() => editScheme(scheme)}>
              Edit
            </button>{" "}

            <button onClick={() => deleteScheme(scheme.scheme_name)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;