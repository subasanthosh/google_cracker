import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, Eye, EyeOff, ShieldAlert, Key, ArrowRight } from 'lucide-react';

export default function Login({ earnXP }) {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit =async (e) => {
    e.preventDefault();
    if (!handle || !password) {
      setErrorMsg('CRITICAL_ERR: Missing authentication credentials.');
      return;
    }

    await fetch("http://127.0.0.1:8000/logininpage", {
      headers:{"Content-Type": "application/json"},
      method:"POST",
      body:JSON.stringify({
        "email": handle,
        "password": password
      })
    })
    setErrorMsg('');
    setIsSubmitting(true);
    
    // Simulate terminal logging for authenticating
    const logs = [
      `Initializing authentication handshake...`,
      `Verifying candidate handle: ${handle}...`,
      `Decrypting access key security layer...`,
      `Handshake success. Welcome to Velocity Kernel.`
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
  };

  return (
    <section className="login-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="glass-card border-glow-blue" style={{ padding: '3rem', position: 'relative' }}>
          
          {/* Cyber Terminal Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> SECURE_AUTHENTICATION.exe
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-neon-green)' }}></span>
          </div>

          <h2 className="mono-font text-center" style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.5rem', textShadow: 'var(--glow-text)' }}>
            Candidate Login
          </h2>
          <p className="text-muted text-center" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
            Enter your cohort keys to establish system connection.P
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Handle/Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                <input 
                  type="text" 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@console_lord"
                  style={{
                    width: '90%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    background: 'rgba(3, 5, 9, 0.6)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-electric-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)'}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '84%',
                    padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                    background: 'rgba(3, 5, 9, 0.6)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-electric-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)'}
                  disabled={isSubmitting}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.3)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="mono-font" style={{ fontSize: '0.8rem', color: 'var(--color-crimson)', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 0, 85, 0.05)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid rgba(255, 0, 85, 0.2)' }}>
                <ShieldAlert size={16} /> {errorMsg}
              </div>
            )}

            {/* Console Log Animation Block */}
            {terminalLogs.length > 0 && (
              <div className="mono-font" style={{ fontSize: '0.75rem', background: '#030509', border: '1px solid rgba(0, 240, 255, 0.1)', padding: '1rem', borderRadius: '6px', color: 'var(--color-electric-blue)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {terminalLogs.map((log, idx) => (
                  <div key={idx}>&gt; {log}</div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '0.5rem', display: 'flex', gap: '10px' }}
            >
              Verify Handshake <ArrowRight size={18} />
            </button>

          </form>

          {/* Footer Link to Register */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>No cohort registration yet?</span>
            <br />
            <Link 
              to="/register"
              className="mono-font"
              style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem' }}
            >
              <Key size={14} /> Generate Access Key (Register)
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
