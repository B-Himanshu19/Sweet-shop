import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <h1>🍬 Sweet Shop Management</h1>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/">Dashboard</Link>
              {isAdmin() && <Link to="/admin">Admin Panel</Link>}
              <div className="user-info">
                <span>Welcome, {user.username} ({user.role})</span>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

