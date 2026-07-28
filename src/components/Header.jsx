import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, Terminal, Menu, Monitor, X, User, Star, GitBranch, Mail, Shield, ChevronRight } from 'lucide-react';

/* ── Mock user profile — replace with real auth data as needed ── */
const USER_PROFILE = {
  name: 'Console Lord',
  email: 'console_lord@gmail.com',
  github: 'https://github.com/console_lord',
  joinDate: 'Jan 2026',
  targetCompany: 'Google',
};

export default function Header({ xp, level, levelTitle, streak, consoleGlitch, setConsoleGlitch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  /* Close overlay on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = USER_PROFILE.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const xpToNext = 1000 - (xp % 1000);
  const pct = Math.min(((xp % 1000) / 1000) * 100, 100).toFixed(1);

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <span className="logo-prompt">&gt;</span> GOOGLE COHORT<span className="logo-accent"></span>
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
            {/* XP Badge */}
            <div className="user-xp-status" id="header-xp-badge">
              <Zap className="xp-icon" size={16} fill="currentColor" />
              <span className="xp-value" id="current-xp-header">{xp}</span>
              <span className="xp-label">XP</span>
            </div>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              id="console-theme-btn"
              title="Toggle Console Glitch Mode"
              onClick={() => setConsoleGlitch(!consoleGlitch)}
            >
              {consoleGlitch ? <Monitor size={18} /> : <Terminal size={18} />}
            </button>

            {/* ── Profile Avatar Button ── */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                title="Developer Level Profile"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #39ff14 100%)',
                  border: profileOpen ? '2px solid #fff' : '2px solid rgba(0,240,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  color: '#030813',
                  boxShadow: profileOpen ? '0 0 16px rgba(0,240,255,0.6)' : '0 0 8px rgba(0,240,255,0.25)',
                  transition: 'all 0.25s',
                  flexShrink: 0,
                }}
              >
                {initials}
              </button>

              {/* ── Profile Overlay Dropdown ── */}
              {profileOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  width: '320px',
                  background: 'rgba(5, 8, 20, 0.90)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1px solid rgba(0,240,255,0.22)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,240,255,0.08)',
                  zIndex: 2000,
                  overflow: 'hidden',
                  animation: 'fadeSlideDown 0.2s ease',
                }}>

                  {/* Header strip */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(57,255,20,0.10) 100%)',
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid rgba(0,240,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00f0ff, #39ff14)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '800',
                      fontSize: '1.1rem',
                      color: '#030813',
                      flexShrink: 0,
                      boxShadow: '0 0 16px rgba(0,240,255,0.4)',
                    }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', marginBottom: '2px' }}>
                        {USER_PROFILE.name}
                      </div>
                      <div style={{ color: 'rgba(0,240,255,0.75)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                        LVL {level ?? 1} — {levelTitle ?? 'COMPILING_INIT'}
                      </div>
                    </div>
                  </div>

                  {/* Details list */}
                  <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>

                    {/* Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={14} style={{ color: '#00f0ff', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(220,240,255,0.85)', wordBreak: 'break-all' }}>{USER_PROFILE.email}</span>
                    </div>

                    {/* GitHub */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <GitBranch size={14} style={{ color: '#39ff14', flexShrink: 0 }} />
                      <a href={USER_PROFILE.github} target="_blank" rel="noreferrer"
                        style={{ fontSize: '0.85rem', color: 'rgba(57,255,20,0.85)', textDecoration: 'none' }}>
                        {USER_PROFILE.github.replace('https://', '')}
                      </a>
                    </div>

                    {/* Target company */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Shield size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(245,158,11,0.85)' }}>Target: {USER_PROFILE.targetCompany}</span>
                    </div>

                    {/* Joined */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Star size={14} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(200,180,255,0.80)' }}>Joined: {USER_PROFILE.joinDate}</span>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.25rem 0' }} />

                    {/* XP Progress bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(0,240,255,0.7)', fontFamily: 'var(--font-mono)' }}>
                          XP PROGRESS
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                          {xp} / {Math.ceil(xp / 1000) * 1000}
                        </span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: 'linear-gradient(90deg, #00f0ff, #39ff14)',
                          borderRadius: '99px',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(160,200,220,0.55)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                        {xpToNext} XP to next level
                      </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                      {[
                        { label: 'Total XP', value: xp, color: '#00f0ff' },
                        { label: 'Level', value: level ?? 1, color: '#39ff14' },
                        { label: 'Streak', value: `${streak ?? 0}d`, color: '#f59e0b' },
                      ].map(stat => (
                        <div key={stat.label} style={{
                          flex: 1,
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          padding: '0.6rem 0.5rem',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: stat.color, fontFamily: 'var(--font-mono)' }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: 'rgba(160,200,220,0.55)', marginTop: '2px' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer link */}
                  <div style={{
                    padding: '0.75rem 1.5rem',
                    borderTop: '1px solid rgba(0,240,255,0.10)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Link
                      to="/xp-system"
                      onClick={() => setProfileOpen(false)}
                      style={{ fontSize: '0.82rem', color: '#00f0ff', textDecoration: 'none', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      View XP Dashboard <ChevronRight size={14} />
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      style={{ fontSize: '0.82rem', color: 'rgba(255,100,100,0.8)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                    >
                      Logout
                    </Link>
                  </div>

                </div>
              )}
            </div>

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

      {/* Keyframe for overlay drop animation */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
