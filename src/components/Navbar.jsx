import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import useTheme from "../hooks/useTheme";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            Chris<span>Code</span>Lab
          </Link>

          <ul className="navbar-links">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={isActive(to) ? "active" : ""}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            <button
              className="theme-btn"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <button
              className="menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link key={to} to={to} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <button
          className="theme-btn"
          onClick={() => { toggle(); setOpen(false); }}
          style={{ width: "fit-content", marginTop: "8px" }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
          <span style={{ marginLeft: "8px", fontSize: "0.9rem", fontWeight: 500 }}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>
      </div>
    </>
  );
}

export default Navbar;
