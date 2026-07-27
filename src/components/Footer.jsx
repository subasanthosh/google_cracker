import React from 'react';
import { MessageSquare, Activity } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">&gt; VELOCITY_13</span>
          <p>Developing unbreakable consistency and architectural strength over a 13-month developer run.</p>
          <div className="social-links">
            <a href="https://GitHub.com" target="_blank" rel="noreferrer" title="GitHub">GitHub</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" title="Discord"><MessageSquare size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Slack/Twitter"><Activity size={18} /></a>
          </div>
        </div>
        <div className="footer-nav">
          <h4>Navigation</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('how-it-works'); }}>How It Works</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('weekly-system'); }}>Weekly System</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('sprint'); }}>Weekly Sprint</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('buddy-system'); }}>Buddy Network</a>
        </div>
        <div className="footer-nav">
          <h4>Legal & Info</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Play</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('faq'); }}>FAQ</a>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; 2026 The 13-Month Velocity Cohort. All Rights Reserved. Built with console values.</p>
      </div>
    </footer>
  );
}
