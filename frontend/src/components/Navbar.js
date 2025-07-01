import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isAdmin");

  const handleLogout = () => {
    fetch("http://localhost:8000/admin/logout", { method: "POST" });
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>Student Dashboard</h3>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/add" style={styles.link}>Add Result</Link></li>
        <li><Link to="/manage" style={styles.link}>Manage Results</Link></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} style={{ background: "#007bff", border: "none", color: "#fff", cursor: "pointer" }}>Logout</button></li>
        ) : (
          <li><Link to="/login" style={styles.link}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
const styles = {
  nav: {
    backgroundColor: '#fff',
    color: '#333',
    padding: '16px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#3f51b5',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    paddingBottom: '5px',
    borderBottom: '2px solid transparent',
    transition: 'border-bottom 0.3s ease, color 0.3s ease',
  },
  ul: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  listStyleType: "none"}
};

export default Navbar