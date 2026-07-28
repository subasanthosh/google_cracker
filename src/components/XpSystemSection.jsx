import React, { useState } from 'react';
import { Zap, Award, Code, Trophy } from 'lucide-react';
import bgImage5 from '../assets/google_workspace_bright.png';


export default function XpSystemSection({ xp, level, levelTitle, badges, leaderboardData, earnXP }) {
  const [lbFilter, setLbFilter] = useState("all");
  const [lbSearch, setLbSearch] = useState("");

  const getFilteredLeaderboard = () => {
    let devs = [...leaderboardData];
    
    if (lbFilter === "weekly") {
      devs.sort((a, b) => b.weekly - a.weekly);
    } else if (lbFilter === "streaks") {
      devs.sort((a, b) => b.streak - a.streak);
    } else {
      devs.sort((a, b) => b.xp - a.xp);
    }

    if (lbSearch.trim() !== "") {
      const q = lbSearch.toLowerCase();
      devs = devs.filter(d => d.name.toLowerCase().includes(q) || d.handle.toLowerCase().includes(q));
    }
    return devs;
  };

  return (
    <section className="xp-system-section" id="xp-system" style={{ backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.5), rgba(3, 5, 9, 0.75)), url(${bgImage5})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', padding: '6rem 0' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Velocity XP Dashboard</h2>
          <p className="section-subtitle text-muted">Complete tasks, gain XP, unlock badges, and rise up the cohort leaderboard.</p>
        </div>

        <div className="xp-dashboard-grid">
          {/* XP Progress Dashboard */}
          <div className="dashboard-panel glass-card border-glow-green">
            <div className="panel-header">
              <h3>Developer Level Profile</h3>
              <span className="badge badge-neon" id="xp-level-title">LVL {level}: {levelTitle}</span>
            </div>
            <div className="level-indicator-area">
              <div className="circular-progress-wrapper">
                <svg className="progress-ring" width="120" height="120">
                  <circle className="progress-ring__circle-bg" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" />
                  <circle 
                    className="progress-ring__circle" 
                    id="xp-circle-bar" 
                    stroke="#00f0ff" 
                    strokeWidth="8" 
                    strokeDasharray="326.7" 
                    strokeDashoffset={326.7 - ((xp % 1000) / 1000 * 326.7)} 
                    fill="transparent" 
                    r="52" 
                    cx="60" 
                    cy="60" 
                  />
                </svg>
                <div className="progress-ring-text">
                  <span className="value-text" id="current-xp-num">{xp}</span>
                  <span className="label-text">/ 1000 XP</span>
                </div>
              </div>
              <div className="xp-metrics">
                <div className="metric-row">
                  <span>Weekly Ranking:</span>
                  <strong className="text-electric-blue" id="dashboard-weekly-rank">#12 / 85</strong>
                </div>
                <div className="metric-row">
                  <span>Streak Multiplier:</span>
                  <strong className="text-neon-green" id="dashboard-multiplier">1.2x (Active)</strong>
                </div>
                <div className="metric-row">
                  <span>Badges Unlocked:</span>
                  <strong id="unlocked-badges-count">{badges.length}</strong>
                </div>
              </div>
            </div>

            {/* Simulator Quest Panel */}
            <div className="interactive-quest-board">
              <h4>Interactive Simulator: Click to claim XP!</h4>
              <div className="quest-task" id="quest-solve-sim">
                <div className="quest-detail">
                  <h5>Solve Daily Leetcode</h5>
                  <p>Unlock algorithm milestones (+150 XP)</p>
                </div>
                <button type="button" className="quest-btn font-mono" id="sim-btn-solve" onClick={() => earnXP(150, "Daily Algorithm Challenge solved")}>+150 XP</button>
              </div>
              <div className="quest-task" id="quest-review-sim">
                <div className="quest-detail">
                  <h5>Conduct Buddy Code Review</h5>
                  <p>Validate peer commit scripts (+100 XP)</p>
                </div>
                <button type="button" className="quest-btn font-mono" id="sim-btn-review" onClick={() => earnXP(100, "Peer Pull Request reviewed")}>+100 XP</button>
              </div>
              <div className="quest-task" id="quest-project-sim">
                <div className="quest-detail">
                  <h5>Submit Weekly Architecture</h5>
                  <p>Deploy production build containers (+300 XP)</p>
                </div>
                <button type="button" className="quest-btn font-mono" id="sim-btn-project" onClick={() => earnXP(300, "Weekly Architecture pushed")}>+300 XP</button>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="leaderboard-panel glass-card">
            <div className="leaderboard-header">
              <h3>Cohort Leaderboard</h3>
              <div className="leaderboard-filters">
                <input 
                  type="text" 
                  id="leaderboard-search" 
                  className="leaderboard-search-input" 
                  placeholder="Search developer..." 
                  value={lbSearch}
                  onChange={(e) => setLbSearch(e.target.value)}
                />
                <select 
                  id="leaderboard-filter" 
                  className="leaderboard-filter-select"
                  value={lbFilter}
                  onChange={(e) => setLbFilter(e.target.value)}
                >
                  <option value="all">Overall Rank</option>
                  <option value="weekly">Weekly Speed</option>
                  <option value="streaks">Top Streaks</option>
                </select>
              </div>
            </div>
            <div className="table-container">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Developer</th>
                    <th>Streak</th>
                    <th>Level</th>
                    <th className="text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody id="leaderboard-tbody">
                  {getFilteredLeaderboard().map((dev, idx) => (
                    <tr key={idx} className={dev.handle === '@console_lord' ? 'active-user-row' : ''}>
                      <td className="table-rank">#{idx + 1}</td>
                      <td>
                        <div className="table-developer-cell">
                          <img src={dev.avatar} alt={dev.name} className="dev-avatar" />
                          <div>
                            <span className="dev-name">{dev.name}</span>
                            <span className="dev-handle-sub">{dev.handle}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="table-streak"><Zap className="xp-icon" size={12} fill="currentColor" /> {dev.streak}d</span>
                      </td>
                      <td>
                        <span className="table-level font-mono">LVL {dev.level}</span>
                      </td>
                      <td className="table-xp text-right font-mono">{dev.xp.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* XP Badges Grid */}
        <div className="badges-showcase">
          <h3 className="mono-font text-center text-electric-blue">&gt; EARNED_BADGES</h3>
          <div className="badges-grid" id="badges-container">
            <div className={`badge-card glass-card ${badges.includes('badge-initiation') ? 'unlocked' : 'locked'}`} id="badge-initiation">
              <div className="badge-icon-visual">
                <Zap size={20} />
              </div>
              <h4>First Commit</h4>
              <p className="badge-desc">Submitted proof of work on Day 1.</p>
              <span className="badge-status-text">{badges.includes('badge-initiation') ? 'UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className={`badge-card glass-card ${badges.includes('badge-streak') ? 'unlocked' : 'locked'}`} id="badge-streak">
              <div className="badge-icon-visual">
                <Award size={20} />
              </div>
              <h4>Consistency Core</h4>
              <p className="badge-desc">Maintained a 7-day streak.</p>
              <span className="badge-status-text">{badges.includes('badge-streak') ? 'UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className={`badge-card glass-card ${badges.includes('badge-algorithm') ? 'unlocked' : 'locked'}`} id="badge-algorithm">
              <div className="badge-icon-visual">
                <Code size={20} />
              </div>
              <h4>Recursion Ruler</h4>
              <p className="badge-desc">Unlock at 1,000 XP.</p>
              <span className="badge-status-text">{badges.includes('badge-algorithm') ? 'UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className={`badge-card glass-card ${badges.includes('badge-legend') ? 'unlocked' : 'locked'}`} id="badge-legend">
              <div className="badge-icon-visual">
                <Trophy size={20} />
              </div>
              <h4>Velocity Titan</h4>
              <p className="badge-desc">Unlock at 2,000 XP.</p>
              <span className="badge-status-text">{badges.includes('badge-legend') ? 'UNLOCKED' : 'LOCKED'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
