import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Zap, Terminal, Menu, Monitor, X } from 'lucide-react';

export default function Header({ xp, consoleGlitch, setConsoleGlitch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <span className="logo-prompt">&gt;</span> VELOCITY<span className="logo-accent">_13</span>
            </Link>
          </div>
          <nav className="nav-links">
            <NavLink to="/how-it-works" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>How It Works</NavLink>
            <NavLink to="/weekly-system" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Weekly System</NavLink>
            <NavLink to="/sprint" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Daily / Weekly Coding Sprint</NavLink>
            <NavLink to="/buddy-system" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Buddy System</NavLink>
            <NavLink to="/xp-system" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>XP Dashboard</NavLink>
            <NavLink to="/daily-cycle" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Daily Cycle</NavLink>
          </nav>
          <div className="header-actions">
            <div className="user-xp-status" id="header-xp-badge">
              <Zap className="xp-icon" size={16} fill="currentColor" />
              <span className="xp-value" id="current-xp-header">{xp}</span>
              <span className="xp-label">XP</span>
            </div>
            <button
              className="theme-toggle"
              id="console-theme-btn"
              title="Toggle Console Glitch Mode"
              onClick={() => setConsoleGlitch(!consoleGlitch)}
            >
              {consoleGlitch ? <Monitor size={18} /> : <Terminal size={18} />}
            </button>
            <Link to="/apply-now" className="btn btn-primary btn-lg">Apply Now</Link>
          </div>
          <button
            className="mobile-menu-toggle"
            id="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`} id="mobile-nav">
        <Link to="/how-it-works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
        <Link to="/sprint" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Coding Sprint</Link>
        <Link to="/build-sprint" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Build Sprint</Link>
        <Link to="/buddy-system" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Buddy System</Link>
        <Link to="/xp-system" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>XP Dashboard</Link>
        <Link to="/daily-cycle" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Daily Cycle</Link>
        <div className="mobile-nav-footer">
          <Link to="/apply-now" className="btn btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
        </div>
      </div>
    </>
  );
}
