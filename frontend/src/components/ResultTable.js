// src/components/ResultTable.js
function ResultTable({ results, onDelete }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Roll Number</th>
          <th>Subject</th>
          <th>Marks</th>
          {onDelete && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.name}</td>
            <td>{result.roll_number}</td>
            <td>{result.subject}</td>
            <td>{result.marks}</td>
            {onDelete && (
              <td>
               <button className="delete-btn" onClick={() => onDelete(result.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;
