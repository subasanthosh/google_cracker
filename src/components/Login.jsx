import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, Eye, EyeOff, ShieldAlert, Key, ArrowRight } from 'lucide-react';

/* ── Dark theme glassmorphism tokens ── */
const dark = {
  card: {
    background: 'rgba(5, 8, 18, 0.88)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(0, 240, 255, 0.22)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(0,240,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
    padding: '3rem',
    position: 'relative',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 1rem 0.8rem 2.6rem',
    background: 'rgba(0, 240, 255, 0.05)',
    border: '1px solid rgba(0, 240, 255, 0.18)',
    borderRadius: '10px',
    color: '#e8f8ff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  inputPw: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 3rem 0.8rem 2.6rem',
    background: 'rgba(0, 240, 255, 0.05)',
    border: '1px solid rgba(0, 240, 255, 0.18)',
    borderRadius: '10px',
    color: '#e8f8ff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.10em',
    color: '#00f0ff',
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
              navigate('/');
            }, 800);
          }
        }, (index + 1) * 400);
      });

    } catch (err) {
      /* Network / CORS / server-down errors */
      setErrorMsg(`NETWORK_ERR: Cannot reach server. ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const onFocusBlue = (e) => { e.target.style.borderColor = '#00f0ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,240,255,0.14)'; };
  const onBlurBlue  = (e) => { e.target.style.borderColor = 'rgba(0,240,255,0.18)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/google_campus_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div style={dark.card}>

          {/* ── Top bar ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', marginBottom: '1.75rem', borderBottom: '1px solid rgba(0,240,255,0.15)' }}>
            <span style={{ ...dark.label, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> SECURE_AUTHENTICATION.exe
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 8px #39ff14' }} />
          </div>

          {/* ── Heading ── */}
          <h2 style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', fontSize: '1.85rem', marginBottom: '0.4rem', textAlign: 'center', textShadow: '0 0 20px rgba(0,240,255,0.5)' }}>
            Candidate Login
          </h2>
          <p style={{ color: 'rgba(160, 210, 230, 0.75)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '2rem' }}>
            Enter your cohort keys to establish system connection.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label style={dark.label}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <User size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,240,255,0.5)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="you@email.com"
                  style={dark.input}
                  onFocus={onFocusBlue}
                  onBlur={onBlurBlue}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label style={dark.label}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,240,255,0.5)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={dark.inputPw}
                  onFocus={onFocusBlue}
                  onBlur={onBlurBlue}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,240,255,0.5)', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <div style={{ fontSize: '0.8rem', color: '#ff4d6d', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,0,85,0.10)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,0,85,0.28)' }}>
                <ShieldAlert size={15} /> {errorMsg}
              </div>
            )}

            {/* Terminal logs */}
            {terminalLogs.length > 0 && (
              <div style={{ fontSize: '0.74rem', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(0,240,255,0.18)', padding: '0.9rem 1rem', borderRadius: '8px', color: '#00f0ff', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)' }}>
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
                padding: '0.85rem',
                marginTop: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: isSubmitting
                  ? 'linear-gradient(135deg, #00a0cc 0%, #2acc10 100%)'
                  : 'linear-gradient(135deg, #00c8ff 0%, #39ff14 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#030813',
                fontWeight: '800',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: isSubmitting ? 'none' : '0 4px 24px rgba(0,240,255,0.35)',
                transition: 'all 0.25s',
                letterSpacing: '0.05em',
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner" style={{ borderTopColor: '#030813' }} />
                  Authenticating...
                </>
              ) : (
                <>Verify Handshake <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: '0.84rem', color: 'rgba(160,200,220,0.60)' }}>No cohort registration yet?</span>
            <br />
            <Link
              to="/register"
              style={{ color: '#00f0ff', fontSize: '0.84rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', textShadow: '0 0 8px rgba(0,240,255,0.45)' }}
            >
              <Key size={13} /> Generate Access Key (Register)
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
