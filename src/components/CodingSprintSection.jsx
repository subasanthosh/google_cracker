import React, { useState, useEffect } from 'react';
import { Zap, Code2, MessageSquare, Trophy, FileCode, Copy, CheckCircle, Clock, Play } from 'lucide-react';
import { codeSnippets } from '../constants';

export default function CodingSprintSection() {
  const [activeTab, setActiveTab] = useState("daily");
  const [lang, setLang] = useState("python");
  const [isCopied, setIsCopied] = useState(false);
  const [contestCountdown, setContestCountdown] = useState("00d : 00h : 00m : 00s");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextContest = new Date();
      nextContest.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
      nextContest.setHours(14, 0, 0, 0);
      
      if (now > nextContest) {
        nextContest.setDate(nextContest.getDate() + 7);
      }

      const diff = nextContest - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setContestCountdown(`${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(mins).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[lang]).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  return (
    <section className="coding-sprint-section" id="coding-sprint">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Coding Sprints</h2>
          <p className="section-subtitle text-muted">Sharpen your logic, write high-performance solutions, and climb the scoreboard.</p>
        </div>

        <div className="tabs-container">
          <div className="tabs-header" id="coding-sprint-tabs">
            <button 
              className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab("daily")}
            >
              <Code2 size={16} style={{ marginRight: '6px' }} /> Daily Sprint
            </button>
            <button 
              className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab("weekly")}
            >
              <Trophy size={16} style={{ marginRight: '6px' }} /> Weekly Sprint
            </button>
          </div>

          {/* Tab 1: Daily Sprint */}
          <div className={`tab-content ${activeTab === 'daily' ? 'active' : ''}`} id="tab-daily">
            <div className="sprint-grid">
              <div className="challenge-info glass-card">
                <div className="challenge-meta">
                  <span className="difficulty hard">Hard</span>
                  <span className="xp-bounty"><Zap size={14} style={{ marginRight: '4px' }} /> 300 XP</span>
                </div>
                <h3>LeetCode #239: Sliding Window Maximum</h3>
                <p>You are given an array of integers <code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>
                <p>Return the max sliding window.</p>
                
                <div className="code-picker-wrapper">
                  <label className="mono-font">Select Language:</label>
                  <select id="lang-picker" value={lang} onChange={(e) => setLang(e.target.value)}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
              </div>

              <div className="solution-showcase glass-card">
                <div className="showcase-header">
                  <span className="file-name"><FileCode size={14} style={{ marginRight: '6px' }} /> solution.{lang === 'python' ? 'py' : lang === 'javascript' ? 'js' : 'cpp'}</span>
                  <button className="copy-btn" id="copy-code-btn" onClick={handleCopyCode}>
                    <Copy size={12} style={{ marginRight: '4px' }} /> {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="code-snippet-box">
                  <code id="code-snippet-code">{codeSnippets[lang]}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Tab 2: Weekly Sprint */}
          <div className={`tab-content ${activeTab === 'weekly' ? 'active' : ''}`} id="tab-weekly">
            <div className="contest-grid">
              <div className="contest-info glass-card border-glow-blue">
                <span className="badge-sprint">LIVE MATCHUP</span>
                <h3>Weekly Coding Sprint</h3>
                <p>Weekly algorithm races happen live every Saturday. Compete against peers in a race to optimize time complexities. Leaderboard calculations update instantly with penalty times.</p>
                <div className="countdown-timer-box">
                  <span className="countdown-label">NEXT LIVE CONTEST IN:</span>
                  <div className="timer-display" id="contest-countdown">
                    {contestCountdown}
                  </div>
                </div>
                <button className="btn btn-primary w-full"><Play size={16} style={{ marginRight: '6px' }} /> Register for Contest</button>
              </div>
              <div className="contest-rules glass-card">
                <h3>Sprint Rules</h3>
                <ul className="checklist-list">
                  <li><CheckCircle size={16} className="text-neon-green" style={{ marginRight: '8px' }} /> 3 Core problems: Easy, Medium, Hard.</li>
                  <li><CheckCircle size={16} className="text-neon-green" style={{ marginRight: '8px' }} /> Plagiarism detection strictly enforced.</li>
                  <li><CheckCircle size={16} className="text-neon-green" style={{ marginRight: '8px' }} /> Submission penalties of +10 mins for compile/runtime errors.</li>
                  <li><CheckCircle size={16} className="text-neon-green" style={{ marginRight: '8px' }} /> Leaderboard unlocks +500 XP bonus for top 3 finishers.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
