// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import ResultTable from "../components/ResultTable";

const API_URL = "http://localhost:8000/results";

function Dashboard() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setResults(response.data.data);
        setFilteredResults(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setError("Failed to load results.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = results.filter((result) =>
      result.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchTerm, results]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ResultTable results={filteredResults} />
      )}
    </div>
  );
}

export default Dashboard;
