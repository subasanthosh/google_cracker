import React, { useState } from 'react';
import { Zap, Terminal, Menu, Monitor, X } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, xp, consoleGlitch, setConsoleGlitch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
              <span className="logo-prompt">&gt;</span> VELOCITY<span className="logo-accent">_13</span>
            </a>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('how-it-works'); }}>How It Works</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('weekly-system'); }}>Weekly System</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('sprint'); }}>Daily / Weekly Coding Sprint</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('buddy-system'); }}>Buddy System</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('xp-system'); }}>XP Dashboard</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('daily-cycle'); }}>Daily Cycle</a>
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
            <a href="#" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); setCurrentPage('apply-now'); }}>Apply Now</a>
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
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('how-it-works'); }}>How It Works</a>
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('sprint'); }}>Coding Sprint</a>
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('build-sprint'); }}>Build Sprint</a>
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('buddy-system'); }}>Buddy System</a>
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('xp-system'); }}>XP Dashboard</a>
        <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('daily-cycle'); }}>Daily Cycle</a>
        <div className="mobile-nav-footer">
          <a href="#" className="btn btn-primary w-full text-center" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentPage('apply-now'); }}>Apply Now</a>
        </div>
      </div>
    </>
  );
}
