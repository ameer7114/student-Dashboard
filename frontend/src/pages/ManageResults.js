// src/pages/ManageResults.js
import { useEffect, useState } from "react";
import axios from "axios";
import ResultTable from "../components/ResultTable";

function ManageResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    axios.get("http://localhost:8000/results")
      .then((res) => setResults(res.data.data))
      .catch(() => setError("❌ Failed to load results."));
  };

  const handleDelete = (id) => {
    setDeleting(true);
    axios.delete(`http://localhost:8000/results/${id}`)
      .then(() => {
        setResults((prev) => prev.filter((r) => r.id !== id));
      })
      .catch(() => alert("❌ Failed to delete result."))
      .finally(() => setDeleting(false));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Results</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ResultTable results={results} onDelete={handleDelete} deleting={deleting} />
      {deleting && <p>Deleting...</p>}
    </div>
  );
}

export default ManageResults;
