// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/configuracion">Configuración</Link>
        </li>
        <li>
          <Link to="/panel">Panel</Link>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;