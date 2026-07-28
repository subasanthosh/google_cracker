import React, { useState } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';

export default function ApplySection() {
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appGitHub, setAppGitHub] = useState("");
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appDiscord, setAppDiscord] = useState("");

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!appName || !appEmail || !appGitHub) return;
    setAppSubmitted(true);
  };

  return (
    <section className="apply-section" id="apply-now">
      <div className="container text-center max-w-md">
        <div className="badge-accent margin-auto">
          <span className="pulse-dot"></span> APPLICATIONS ARE NOW OPEN
        </div>
        <h2>Start Your Velocity Journey</h2>
        <p className="text-muted">Will you maintain consistency, ship projects, and unlock premium developer ranks? Apply to join the cohort of 100 dedicated developers.</p>
        
        {!appSubmitted ? (
          <form id="application-form" className="application-form glass-card" onSubmit={handleApplicationSubmit}>
            <div className="form-group text-left">
              <label className="form-label mono-font" htmlFor="app-name">Name</label>
              <input 
                type="text" 
                id="app-name" 
                className="form-input" 
                placeholder="e.g., Marcus Aurelius" 
                required 
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>
            <div className="form-group text-left">
              <label className="form-label mono-font" htmlFor="app-email">Email Address</label>
              <input 
                type="email" 
                id="app-email" 
                className="form-input" 
                placeholder="e.g., marcus@developers.com" 
                required 
                value={appEmail}
                onChange={(e) => setAppEmail(e.target.value)}
              />
            </div>
            <div className="form-group text-left">
              <label className="form-label mono-font" htmlFor="app-GitHub">GitHub Username</label>
              <input 
                type="text" 
                id="app-GitHub" 
                className="form-input" 
                placeholder="e.g., @coder_marcus" 
                required 
                value={appGitHub}
                onChange={(e) => setAppGitHub(e.target.value)}
              />
            </div>
             <div className="form-group text-left">
              <label className="form-label mono-font" htmlFor="app-discord">Discord UserId</label>
              <input 
                type="number" 
                id="app-discord" 
                className="form-input" 
                placeholder="e.g., 1234567890" 
                required 
                value={appDiscord}
                onChange={(e) => setAppDiscord(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: "20px" }}><Rocket size={16} style={{ marginRight: '6px' }} /> Submit Application</button>
          </form>
        ) : (
          <div className="form-success-msg" id="application-success">
            <div className="success-icon"><CheckCircle2 size={36} /></div>
            <h3>Application Logged!</h3>
            <p>We've logged your credentials. Check your email for onboarding interview slots and next actions.</p>
          </div>
        )}
      </div>
    </section>
  );
}
