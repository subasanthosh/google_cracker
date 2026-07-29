import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, Eye, EyeOff, ShieldAlert, Key, ArrowRight } from 'lucide-react';

/* ── Light theme glassmorphism tokens ── */
const light = {
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.03), inset 0 1px 0 rgba(255,255,255,0.2)',
    padding: '1.5rem 1.75rem',
    position: 'relative',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem 1rem 0.65rem 2.4rem',
    background: 'rgba(255, 255, 255, 0.25)',
    border: '1px solid rgba(0, 112, 243, 0.25)',
    borderRadius: '8px',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  inputPw: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem 2.6rem 0.65rem 2.4rem',
    background: 'rgba(255, 255, 255, 0.25)',
    border: '1px solid rgba(0, 112, 243, 0.25)',
    borderRadius: '8px',
    color: '#0f172a',
    fontWeight: '700',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '0.08em',
    color: '#0f172a',
    fontFamily: 'var(--font-mono)',
  },
};

export default function Login({ earnXP }) {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Enforce complete scroll lock on document body and html while route is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!handle || !password) {
      setErrorMsg('CRITICAL_ERR: Missing authentication credentials.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/logininpage', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email: handle, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(`AUTH_ERR [${res.status}]: ${data.detail ?? 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }
      else {
        localStorage.setItem("email",handle);
      } 

      /* ── Success flow ── */
      const logs = [
        `Initializing authentication handshake...`,
        `Verifying candidate handle: ${handle}...`,
        `Decrypting access key security layer...`,
        `Handshake success. Welcome to Velocity Kernel.`,
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, log]);
          if (index === logs.length - 1) {
            setTimeout(() => {
              setIsSubmitting(false);
              earnXP(20, 'Console Access Authenticated');
              navigate('/sprint');
            }, 800);
          }
        }, (index + 1) * 400);
      });

    } catch (err) {
      setErrorMsg(`NETWORK_ERR: Cannot reach server. ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const onFocusBlue = (e) => { e.target.style.borderColor = '#0070f3'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 112, 243, 0.15)'; };
  const onBlurBlue  = (e) => { e.target.style.borderColor = 'rgba(0, 112, 243, 0.22)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      height: 'calc(100vh - 72px)',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
    }}>
      {/* Background with increased brightness, no blur, no white overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/google_campus_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(1.75)',
        zIndex: 0,
      }} />

      <div style={{ width: '100%', maxWidth: '420px', zIndex: 1, position: 'relative', boxSizing: 'border-box' }}>
        <div style={light.card}>

          {/* ── Top bar ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0, 112, 243, 0.15)' }}>
            <span style={{ ...light.label, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> SECURE_AUTHENTICATION.exe
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0070f3', boxShadow: '0 0 8px #0070f3' }} />
          </div>

          {/* ── Heading ── */}
          <h2 style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '1.5rem', marginBottom: '0.2rem', textAlign: 'center' }}>
            Candidate Login
          </h2>
          <p style={{ color: '#475569', fontSize: '0.82rem', textAlign: 'center', marginBottom: '1.25rem' }}>
            Enter your cohort keys to establish system connection.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={light.label}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <User size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0, 112, 243, 0.6)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="you@email.com"
                  style={light.input}
                  onFocus={onFocusBlue}
                  onBlur={onBlurBlue}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={light.label}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0, 112, 243, 0.6)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={light.inputPw}
                  onFocus={onFocusBlue}
                  onBlur={onBlurBlue}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0, 112, 243, 0.6)', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <div style={{ fontSize: '0.78rem', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(254, 226, 226, 0.8)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <ShieldAlert size={15} /> {errorMsg}
              </div>
            )}

            {/* Terminal logs */}
            {terminalLogs.length > 0 && (
              <div style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(0, 112, 243, 0.2)', padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#0070f3', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                {terminalLogs.map((log, idx) => (
                  <div key={idx}>&gt; {log}</div>
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-ripple${isSubmitting ? ' btn-loading' : ''}`}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: isSubmitting
                  ? 'linear-gradient(135deg, #0056b3 0%, #00a870 100%)'
                  : 'linear-gradient(135deg, #0070f3 0%, #00dfd8 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(0, 112, 243, 0.25)',
                transition: 'all 0.25s',
                letterSpacing: '0.05em',
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner" style={{ borderTopColor: '#ffffff' }} />
                  Authenticating...
                </>
              ) : (
                <>Verify Handshake <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', textAlign: 'center', borderTop: '1px solid rgba(0, 112, 243, 0.15)' }}>
            <span style={{ fontSize: '0.8rem', color: '#475569' }}>No cohort registration yet?</span>
            <br />
            <Link
              to="/register"
              style={{ color: '#0070f3', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}
            >
              <Key size={13} /> Generate Access Key (Register)
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
