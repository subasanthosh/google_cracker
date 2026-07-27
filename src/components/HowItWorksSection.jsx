import React from 'react';
import { Code, Award, Users, Check } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">The Velocity Philosophy</h2>
          <p className="section-subtitle text-muted">No fluff. Just structured daily progress. Here is the blueprint.</p>
        </div>

        <div className="grid grid-3">
          <div className="card glass-card border-glow-blue">
            <div className="card-icon blue-glow">
              <Code size={24} />
            </div>
            <h3>Daily Proof of Work</h3>
            <p>Write executable code every single day. No summaries, no reading-only logs. Your Git graph and compiler logs are the only proof that counts.</p>
          </div>
          <div className="card glass-card border-glow-green">
            <div className="card-icon green-glow">
              <Award size={24} />
            </div>
            <h3>Consistency Over Perfection</h3>
            <p>A bad 15-minute coding session is better than zero. The cohort is engineered to build unbreakable habit loops. We track commitment, not just brilliance.</p>
          </div>
          <div className="card glass-card border-glow-blue">
            <div className="card-icon blue-glow">
              <Users size={24} />
            </div>
            <h3>Proof of Competence</h3>
            <p>Every milestone has a live defense. Show your code, explain your architecture, and defend your performance in front of industry seniors.</p>
          </div>
        </div>

        <div className="timeline-wrapper">
          <h3 className="timeline-title text-center mono-font">&gt; DAILY_ANCHOR_TIMELINE</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-time">08:00 AM</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Daily Buddy Broadcast</h4>
                <p>Receive your daily peer review pairing, check daily milestones, and sync tasks via Discord / Slack channels.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">01:00 PM</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Concept Drop & Warmup</h4>
                <p>Deep technical modules unlock. Solve the algorithmic challenges, read system architectures, and plan implementation.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">09:00 PM</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Anchor Submission Hour</h4>
                <p>Submit your Proof of Work (PoW). Submit commits, build deployments, and fill in the buddy check-in logs.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">10:00 PM</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Automated Lint, Sync & Payout</h4>
                <p>Automated bots evaluate pull requests. Streak counters increment, XP levels are disbursed, and leaderboards update.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
