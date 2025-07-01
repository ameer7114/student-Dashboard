// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddResult from './pages/AddResult';
import ManageResults from './pages/ManageResults';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppWrapper() {
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            isAdmin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div style={{ padding: "30px" }}>
              <h2>404 - Not Found</h2>
            </div>
          }
        />
        
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
      
    </Router>
  );
}


export default App;