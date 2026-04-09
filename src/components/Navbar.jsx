import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Patients", to: "/patients" },
  { label: "Doctors", to: "/doctors" },
  { label: "Appointments", to: "/appointments" },
  { label: "Login", to: "/login" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">H+</span>
        <span>
          <strong>CareAxis</strong>
          <small>Hospital Management System</small>
        </span>
      </NavLink>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
