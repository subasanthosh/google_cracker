import React, { useState, useEffect } from 'react';
import { Zap, Code2, MessageSquare, Trophy, FileCode, Copy, CheckCircle, Clock, Play } from 'lucide-react';
import { codeSnippets } from '../constants';

export default function CodingSprintSection() {
  const [activeTab, setActiveTab] = useState("practice");
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
          <h2 className="section-title">Weekly Coding Sprint</h2>
          <p className="section-subtitle text-muted">Sharpen your logic, write high-performance solutions, and climb the scoreboard.</p>
        </div>

        <div className="tabs-container">
          <div className="tabs-header" id="coding-sprint-tabs">
            <button 
              className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => setActiveTab("practice")}
            >
              <Code2 size={16} style={{ marginRight: '6px' }} /> Practice Sandbox
            </button>
            <button 
              className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
              onClick={() => setActiveTab("review")}
            >
              <MessageSquare size={16} style={{ marginRight: '6px' }} /> Peer Review
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contest' ? 'active' : ''}`}
              onClick={() => setActiveTab("contest")}
            >
              <Trophy size={16} style={{ marginRight: '6px' }} /> Live Contest & Meet
            </button>
          </div>

          {/* Tab 1: Practice */}
          <div className={`tab-content ${activeTab === 'practice' ? 'active' : ''}`} id="tab-practice">
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

          {/* Tab 2: Peer Review */}
          <div className={`tab-content ${activeTab === 'review' ? 'active' : ''}`} id="tab-review">
            <div className="peer-review-grid">
              <div className="review-item-card glass-card">
                <div className="reviewer-meta">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" alt="Reviewer" className="avatar-circle sm" />
                  <div>
                    <span className="user-handle">@elena_design</span>
                    <span className="review-time">1 hour ago</span>
                  </div>
                  <span className="review-tag approved"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Approved</span>
                </div>
                <p className="review-body">Clean implementation of the Sliding Window. Memory complexity is O(k) which is optimal here. I've left a small comment on the deque bounds check, but other than that, it looks excellent.</p>
                <div className="review-target-snippet">
                  <code># Elena: Check if deque length exceeds window limits</code>
                </div>
              </div>

              <div className="review-item-card glass-card">
                <div className="reviewer-meta">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" alt="Reviewer" className="avatar-circle sm" />
                  <div>
                    <span className="user-handle">@marcus_dev</span>
                    <span className="review-time">3 hours ago</span>
                  </div>
                  <span className="review-tag revision"><Clock size={14} style={{ marginRight: '4px' }} /> Needs Revision</span>
                </div>
                <p className="review-body">Your solution works, but it's hitting O(n*k) time complexity in the worst-case scenario. Consider using a Monotonic Deque or Max-Heap to bypass linear scans inside the window loop.</p>
                <div className="review-target-snippet">
                  <code># Marcus: Optimize inner loop to achieve O(n) runtime</code>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 3: Live Contest */}
          <div className={`tab-content ${activeTab === 'contest' ? 'active' : ''}`} id="tab-contest">
            <div className="contest-grid">
              <div className="contest-info glass-card border-glow-blue">
                <span className="badge-sprint">LIVE MATCHUP</span>
                <h3>Saturday Coding Brawl</h3>
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
