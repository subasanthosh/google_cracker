import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, GitBranch, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

/* ── Dark theme glassmorphism tokens ── */
const dark = {
  card: {
    background: 'rgba(5, 8, 18, 0.88)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(57, 255, 20, 0.22)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(0,0,0,0.60), 0 0 0 1px rgba(57,255,20,0.07), inset 0 1px 0 rgba(255,255,255,0.06)',
    padding: '3rem',
    position: 'relative',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 1rem 0.8rem 2.6rem',
    background: 'rgba(57, 255, 20, 0.05)',
    border: '1px solid rgba(57, 255, 20, 0.18)',
    borderRadius: '10px',
    color: '#e8ffe8',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  inputPw: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 3rem 0.8rem 2.6rem',
    background: 'rgba(57, 255, 20, 0.05)',
    border: '1px solid rgba(57, 255, 20, 0.18)',
    borderRadius: '10px',
    color: '#e8ffe8',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.10em',
    color: '#39ff14',
    fontFamily: 'var(--font-mono)',
  },
};

export default function Register({ earnXP }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [github, setGithub] = useState('');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [generatedKey, setGeneratedKey] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !handle || !github || !password) {
      alert('Error: Please complete all registration fields.');
      return;
    }
    // https://counts-trout-variables-begun.trycloudflare.com/registerinpage
    await fetch("http://127.0.0.1:8000/registerinpage", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name, email: handle, github, password })
    });

  await fetch("http://127.0.0.1:8000/registerinpage",{
    headers:{"Content-Type": "application/json",},
    method:"POST",
    body:JSON.stringify({
      name:name,
      email:handle,
      github:github,
      password:password})
  })

  
    
    setIsSubmitting(true);
    const candidateHandle = handle.startsWith('@') ? handle : `@${handle}`;

    const logs = [
      `Registering new cohort profile: ${name}...`,
      `Setting candidate handle: ${candidateHandle}...`,
      `Validating GitHub repository access parameters...`,
      `Target company flag set to: [${targetCompany.toUpperCase()}]`,
      `Cryptographic security key generation in progress...`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
          const mockKey = `VELOCITY-${randomHex()}-${randomHex()}`;

          setTimeout(() => {
            setGeneratedKey(mockKey);
            setIsSubmitting(false);
            earnXP(50, 'Cohort Enrollment Keys Generated');

            setTimeout(() => {
              navigate('/');
            }, 2500);
          }, 600);
        }
      }, (index + 1) * 350);
    });
  };

  const onFocusGreen = (e) => { e.target.style.borderColor = '#39ff14'; e.target.style.boxShadow = '0 0 0 3px rgba(57,255,20,0.13)'; };
  const onBlurGreen  = (e) => { e.target.style.borderColor = 'rgba(57,255,20,0.18)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url(./google_bright_exterior.png)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={dark.card}>

          {/* ── Top bar ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', marginBottom: '1.75rem', borderBottom: '1px solid rgba(57,255,20,0.15)' }}>
            <span style={{ ...dark.label, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> READY FOR THE COHORT
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
          </div>

          {/* ── Heading ── */}
          <h2 style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', fontSize: '1.85rem', marginBottom: '0.4rem', textAlign: 'center', textShadow: '0 0 20px rgba(57,255,20,0.45)' }}>
            Cohort Registration
          </h2>
          <p style={{ color: 'rgba(160, 240, 180, 0.70)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.75rem' }}>
            Initialize your candidate entry to generate secure access keys.
          </p>

          {!generatedKey ? (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Full Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label style={dark.label}>FULL_NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(57,255,20,0.55)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alan Turing"
                    required
                    style={dark.input}
                    onFocus={onFocusGreen}
                    onBlur={onBlurGreen}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label style={dark.label}>EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(57,255,20,0.75)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', pointerEvents: 'none' }}>@</span>
                  <input
                    type="text"
                    value={handle.startsWith('@') ? handle.substring(1) : handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="turing_code"
                    required
                    style={{ ...dark.input, paddingLeft: '1.9rem' }}
                    onFocus={onFocusGreen}
                    onBlur={onBlurGreen}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* GitHub */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label style={dark.label}>GITHUB_PROFILE_URL</label>
                <div style={{ position: 'relative' }}>
                  <GitBranch size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(57,255,20,0.55)', pointerEvents: 'none' }} />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/alanturing"
                    required
                    style={dark.input}
                    onFocus={onFocusGreen}
                    onBlur={onBlurGreen}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label style={dark.label}>CREATE_ACCESS_PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(57,255,20,0.55)', pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong keypass"
                    required
                    style={dark.inputPw}
                    onFocus={onFocusGreen}
                    onBlur={onBlurGreen}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(57,255,20,0.55)', padding: 0 }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Terminal logs */}
              {terminalLogs.length > 0 && (
                <div style={{ fontSize: '0.74rem', background: 'rgba(0,0,0,0.60)', border: '1px solid rgba(57,255,20,0.20)', padding: '0.9rem 1rem', borderRadius: '8px', color: '#39ff14', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                  {terminalLogs.map((log, idx) => (
                    <div key={idx}>&gt; {log}</div>
                  ))}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  marginTop: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #39ff14 0%, #00c8ff 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#030813',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 24px rgba(57,255,20,0.32)',
                  transition: 'all 0.25s',
                  letterSpacing: '0.05em',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                Generate Access Keys <ArrowRight size={17} />
              </button>

            </form>
          ) : (
            /* ── Success state ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(57,255,20,0.10)', border: '1px solid rgba(57,255,20,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39ff14', boxShadow: '0 0 20px rgba(57,255,20,0.22)' }}>
                  <ShieldCheck size={34} />
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: '1.5rem' }}>Enrollment Keys Disbursed!</h3>
              <div style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(57,255,20,0.50)', padding: '1rem 1.5rem', borderRadius: '10px', color: '#39ff14', letterSpacing: '0.1em', fontSize: '1.05rem', fontWeight: 'bold', boxShadow: '0 0 20px rgba(57,255,20,0.20)', fontFamily: 'var(--font-mono)' }}>
                {generatedKey}
              </div>
              <p style={{ color: 'rgba(160,240,180,0.65)', fontSize: '0.9rem' }}>
                Access granted! Connection establishing, transferring data protocols...
              </p>
              <div style={{ fontSize: '0.75rem', color: 'rgba(0,240,255,0.75)', fontFamily: 'var(--font-mono)' }}>
                System redirecting to Home Dashboard...
              </div>
            </div>
          )}

          {/* ── Footer link ── */}
          {!generatedKey && (
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontSize: '0.84rem', color: 'rgba(160,240,180,0.55)' }}>Already registered in the cohort?</span>
              <br />
              <Link
                to="/login"
                style={{ color: '#39ff14', fontSize: '0.84rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', textShadow: '0 0 8px rgba(57,255,20,0.45)' }}
              >
                Verify Access Key (Login) →
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
