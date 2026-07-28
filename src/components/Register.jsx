import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, User, GitBranch, Building, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

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

  const handleRegisterSubmit =async (e) => {
    e.preventDefault();
    if (!name || !handle || !github || !password) {
      alert('Error: Please complete all registration fields.');
      return;
    }

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

  return (
    <section className="register-section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="glass-card border-glow-green" style={{ padding: '3rem', position: 'relative' }}>
          
          {/* Cyber Terminal Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(57, 255, 20, 0.15)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-neon-green)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> INITIALIZE_CANDIDATE_ACCESS.sh
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-electric-blue)' }}></span>
          </div>

          <h2 className="mono-font text-center" style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.5rem', textShadow: 'var(--glow-text)' }}>
            Cohort Registration
          </h2>
          <p className="text-muted text-center" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
            Initialize your candidate entry to generate secure access keys.
          </p>

          {!generatedKey ? (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Full Name Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-neon-green)' }}>FULL_NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alan Turing"
                    required
                    style={{
                      width: '85%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      background: 'rgba(3, 5, 9, 0.6)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-neon-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(57, 255, 20, 0.2)'}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Cohort Handle Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-neon-green)' }}>EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <span className="mono-font" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neon-green)', fontWeight: 'bold' }}>@</span>
                  <input 
                    type="text" 
                    value={handle.startsWith('@') ? handle.substring(1) : handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="turing_code"
                    required
                    style={{
                      width: '87%',
                      padding: '0.75rem 1rem 0.75rem 2rem',
                      background: 'rgba(3, 5, 9, 0.6)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-neon-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(57, 255, 20, 0.2)'}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Github Handle Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-neon-green)' }}>GITHUB_PROFILE_URL</label>
                <div style={{ position: 'relative' }}>
                  <GitBranch size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type="url" 
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/alanturing"
                    required
                    style={{
                      width: '85%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      background: 'rgba(3, 5, 9, 0.6)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-neon-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(57, 255, 20, 0.2)'}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

             

              {/* Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-neon-green)' }}>CREATE_ACCESS_PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong keypass"
                    required
                    style={{
                      width: '81%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      background: 'rgba(3, 5, 9, 0.6)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-neon-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(57, 255, 20, 0.2)'}
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

              {/* Console Logs */}
              {terminalLogs.length > 0 && (
                <div className="mono-font" style={{ fontSize: '0.75rem', background: '#030509', border: '1px solid rgba(57, 255, 20, 0.1)', padding: '1rem', borderRadius: '6px', color: 'var(--color-neon-green)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                style={{ 
                  width: '100%', 
                  marginTop: '0.5rem', 
                  display: 'flex', 
                  gap: '10px', 
                  background: 'linear-gradient(135deg, var(--color-neon-green) 0%, var(--color-electric-blue) 100%)', 
                  color: '#000', 
                  boxShadow: 'var(--shadow-green)' 
                }}
              >
                Generate Access Keys <ArrowRight size={18} />
              </button>

            </form>
          ) : (
            /* Success View displaying generated key */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', border: '1px solid var(--color-neon-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neon-green)' }}>
                  <ShieldCheck size={36} />
                </div>
              </div>
              <h3 className="mono-font" style={{ color: '#fff', fontSize: '1.5rem' }}>Enrollment Keys Disbursed!</h3>
              <div className="mono-font" style={{ background: '#030509', border: '1px solid var(--color-neon-green)', padding: '1rem 1.5rem', borderRadius: '6px', color: 'var(--color-neon-green)', letterSpacing: '0.1em', fontSize: '1.1rem', fontWeight: 'bold', boxShadow: 'var(--shadow-green)' }}>
                {generatedKey}
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Access granted! Connection establishing, transferring data protocols...
              </p>
              <div className="mono-font" style={{ fontSize: '0.75rem', color: 'var(--color-electric-blue)' }}>
                System redirecting to Home Dashboard...
              </div>
            </div>
          )}

          {/* Footer Link to Login */}
          {!generatedKey && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Already registered in the cohort?</span>
              <br />
              <Link 
                to="/login"
                className="mono-font"
                style={{ color: 'var(--color-neon-green)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem' }}
              >
                Verify Access Key (Login) →
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
