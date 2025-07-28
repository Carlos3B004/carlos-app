import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ title = "Hotel Uleam", navItems = [] }) => {
  return (
    <header className="encabezado">
      <h1>{title}</h1>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="nav-link">
                {item.icon && <span className="nav-icon">{item.icon}</span>}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;