import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Terminal, Menu, Activity, Code, Award, Users, Check, Shield, 
  Code2, MessageSquare, Trophy, FileCode, Copy, CheckCircle, Clock, 
  Play, Share2, Shuffle, CheckCircle2, Calendar, ChevronLeft, 
  ChevronRight, Rocket, ChevronDown, Monitor, X 
} from 'lucide-react';
import './index.css';

// Initial state data
const initialLeaderboard = [
  { name: "Marcus Aurelius", handle: "@coder_marcus", streak: 42, level: 3, xp: 2150, weekly: 450, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Elena Rostova", handle: "@elena_design", streak: 35, level: 2, xp: 1850, weekly: 390, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Samuel Vance", handle: "@cyber_sam", streak: 29, level: 2, xp: 1220, weekly: 280, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Lisa Wong", handle: "@lisa_code", streak: 12, level: 1, xp: 620, weekly: 150, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Alex Rivera", handle: "@alex_dev", streak: 18, level: 1, xp: 550, weekly: 110, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "You (Console Lord)", handle: "@console_lord", streak: 28, level: 1, xp: 350, weekly: 90, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Nikolai Petrov", handle: "@nik_rust", streak: 3, level: 1, xp: 180, weekly: 40, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" }
];

const buddyProfiles = [
  { name: "Alex Rivera", handle: "@alex_dev", GitHub: "@alexrivera", streak: "18 days", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Lisa Wong", handle: "@lisa_code", GitHub: "@lisawongcode", streak: "12 days", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" },
  { name: "Samuel Vance", handle: "@cyber_sam", GitHub: "@samvance", streak: "29 days", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" }
];

const codeSnippets = {
  python: `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        from collections import deque
        q = deque() # store indices
        res = []
        for i, x in enumerate(nums):
            while q and nums[q[-1]] <= x:
                q.pop()
            q.append(i)
            # remove first element if it's out of window
            if q[0] == i - k:
                q.popleft()
            if i >= k - 1:
                res.append(nums[q[0]])
        return res`,
  javascript: `class Solution {
    maxSlidingWindow(nums, k) {
        const q = []; // double ended queue
        const res = [];
        for (let i = 0; i < nums.length; i++) {
            // Remove numbers smaller than current
            while (q.length && nums[q[q.length - 1]] <= nums[i]) {
                q.pop();
            }
            q.push(i);
            // Remove elements out of window range
            if (q[0] === i - k) {
                q.shift();
            }
            // Append current window maximum
            if (i >= k - 1) {
                res.push(nums[q[0]]);
            }
        }
        return res;
    }
}`,
  cpp: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> ans;
        for (int i = 0; i < nums.size(); ++i) {
            while (!dq.empty() && nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if (dq.front() == i - k) {
                dq.pop_front();
            }
            if (i >= k - 1) {
                ans.push_back(dq.front());
            }
        }
        return ans;
    }
};`
};

const cycleSteps = [
  {
    num: "STEP 01 / 05",
    title: "Structured Learning Module",
    description: "Begin the day by diving deep into algorithmic concepts and system architecture blueprints. Daily modules are structured in written and interactive formats, detailing memory efficiency and computing costs.",
    metric: "Time block: 09:00 - 13:00 UTC | Output: Conceptual notes & syntax diagrams"
  },
  {
    num: "STEP 02 / 05",
    title: "Algorithmic Problem Solving",
    description: "Access the LeetCode daily sandbox. Implement efficient solutions, bypass cubic time complexities, and review constraints. Your solutions are pushed into standard compilers for performance evaluation.",
    metric: "Time block: 13:00 - 16:00 UTC | Output: 1-3 Solved Code Snippets"
  },
  {
    num: "STEP 03 / 05",
    title: "Project Architecture Build",
    description: "Build code segments for the weekly project. Construct schemas, establish APIs, debug containers, and document system components. Code must follow strict linting constraints.",
    metric: "Time block: 16:00 - 20:00 UTC | Output: Pushed Project Repos"
  },
  {
    num: "STEP 04 / 05",
    title: "Commit and Submit PoW",
    description: "Push changes to your GitHub branch. The Velocity bot checks compilation, tests constraints, and reads commit syntax. Update check-in sheets and review matches with your paired buddy.",
    metric: "Time block: 20:00 - 21:00 UTC | Output: Validated PRs & check-in log"
  },
  {
    num: "STEP 05 / 05",
    title: "Reflect and Peer Review",
    description: "Review your buddy's code submissions, suggest optimizations, and schedule programming sessions. Update notes on design patterns before rest.",
    metric: "Time block: 21:00 - 22:30 UTC | Output: Code review comments & schedules"
  }
];

export default function App() {
  // --- States ---
  const [xp, setXp] = useState(350);
  const [streak, setStreak] = useState(28);
  const [level, setLevel] = useState(1);
  const [levelTitle, setLevelTitle] = useState("COMPILING_INIT");
  const [badges, setBadges] = useState(["badge-initiation", "badge-streak"]);
  const [activeBuddyIndex, setActiveBuddyIndex] = useState(0);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [currentCycleStep, setCurrentCycleStep] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboard);
  const [activeTab, setActiveTab] = useState("practice");
  const [lang, setLang] = useState("python");
  const [isCopied, setIsCopied] = useState(false);
  const [consoleGlitch, setConsoleGlitch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Timers
  const [contestCountdown, setContestCountdown] = useState("00d : 00h : 00m : 00s");
  const [hackathonTimer, setHackathonTimer] = useState("48:00:00");
  
  // Forms & Simulator
  const [checkSolve, setCheckSolve] = useState(false);
  const [checkCommit, setCheckCommit] = useState(false);
  const [checkMeet, setCheckMeet] = useState(false);
  const [buddyComment, setBuddyComment] = useState("");
  
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("10:00");
  const [scheduleTopic, setScheduleTopic] = useState("");
  
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appGitHub, setAppGitHub] = useState("");
  const [appSubmitted, setAppSubmitted] = useState(false);
  
  // Terminal
  const [terminalInValue, setTerminalInValue] = useState("");
  const [terminalOutLines, setTerminalOutLines] = useState([
    { type: "sys", text: "Initializing cohort kernel terminal..." },
    { type: "sys", text: "Ready. Type 'help' for available diagnostic commands." }
  ]);
  
  // Live pulse feed state
  const [feedItems, setFeedItems] = useState([
    { time: "12:28", user: "@alex_dev", action: "solved LeetCode #239 (Hard)", gain: "+200 XP" },
    { time: "12:25", user: "@pixel_ninja", action: "pushed 5 commits to velocity-core", gain: "+50 XP" }
  ]);

  // Leaderboard filters
  const [lbFilter, setLbFilter] = useState("all");
  const [lbSearch, setLbSearch] = useState("");

  // FAQ Accordion indices
  const [faqActive, setFaqActive] = useState({ 0: false, 1: false, 2: false });

  // Floating +XP popups
  const [floatingPopups, setFloatingPopups] = useState([]);
  
  // --- Refs ---
  const terminalInputRef = useRef(null);

  // --- Effects ---
  
  // Load State from localStorage on Mount
  useEffect(() => {
    const saved = localStorage.getItem("velocity_cohort_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.xp !== undefined) setXp(parsed.xp);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
        if (parsed.level !== undefined) setLevel(parsed.level);
        if (parsed.levelTitle !== undefined) setLevelTitle(parsed.levelTitle);
        if (parsed.badges !== undefined) setBadges(parsed.badges);
        if (parsed.scheduledSessions !== undefined) setScheduledSessions(parsed.scheduledSessions);
      } catch (e) {
        console.error("Local storage parsing error:", e);
      }
    }
  }, []);

  // Save State to localStorage on Change
  useEffect(() => {
    const stateToSave = { xp, streak, level, levelTitle, badges, scheduledSessions };
    localStorage.setItem("velocity_cohort_state", JSON.stringify(stateToSave));
  }, [xp, streak, level, levelTitle, badges, scheduledSessions]);

  // Sync Level Upgrades
  useEffect(() => {
    let nextLvl = 1;
    let nextTitle = "COMPILING_INIT";
    if (xp >= 2000) {
      nextLvl = 3;
      nextTitle = "COMPILER_TITAN";
    } else if (xp >= 1000) {
      nextLvl = 2;
      nextTitle = "SCRIPT_LORD";
    }
    setLevel(nextLvl);
    setLevelTitle(nextTitle);

    // Dynamic badge unlocks
    const updatedBadges = [...badges];
    let badgeUnlocked = false;

    if (xp >= 1000 && !updatedBadges.includes("badge-algorithm")) {
      updatedBadges.push("badge-algorithm");
      badgeUnlocked = true;
      appendTerminalOutput("System Notification: Badge Unlocked - Recursion Ruler!");
    }
    if (xp >= 2000 && !updatedBadges.includes("badge-legend")) {
      updatedBadges.push("badge-legend");
      badgeUnlocked = true;
      appendTerminalOutput("System Notification: Badge Unlocked - Velocity Titan!");
    }

    if (badgeUnlocked) {
      setBadges(updatedBadges);
    }

    // Sync @console_lord values inside leaderboard
    setLeaderboardData(prev => prev.map(dev => {
      if (dev.handle === "@console_lord") {
        return { ...dev, xp, streak, level: nextLvl };
      }
      return dev;
    }));

  }, [xp]);

  // Glitch mode className effect on document.body
  useEffect(() => {
    if (consoleGlitch) {
      document.body.classList.add("console-glitch-mode");
    } else {
      document.body.classList.remove("console-glitch-mode");
    }
  }, [consoleGlitch]);

  // Saturday Contest Timer
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

  // Hackathon simulated timer (loops 48 hours)
  useEffect(() => {
    let hr = 47, min = 59, sec = 59;
    const timer = setInterval(() => {
      sec--;
      if (sec < 0) {
        sec = 59;
        min--;
        if (min < 0) {
          min = 59;
          hr--;
          if (hr < 0) {
            hr = 47;
          }
        }
      }
      setHackathonTimer(`${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulated live feed updates & randomized peer leaderboard progression
  useEffect(() => {
    const activities = [
      { user: "@coder_marcus", desc: "completed 3 algorithms", xp: 150 },
      { user: "@lisa_code", desc: "scheduled pairing session", xp: 50 },
      { user: "@cyber_sam", desc: "merged code module", xp: 300 },
      { user: "@nik_rust", desc: "claimed daily streak checkin", xp: 100 },
      { user: "@elena_design", desc: "approved a peer pull request", xp: 100 }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const act = activities[Math.floor(Math.random() * activities.length)];
        // Append live activity feed item
        const date = new Date();
        const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        setFeedItems(prev => [
          { time: timeStr, user: act.user, action: act.desc, gain: `+${act.xp} XP` },
          ...prev.slice(0, 3) // Keep maximum 4 items
        ]);

        // Increment peer XP inside leaderboard
        setLeaderboardData(prev => prev.map(dev => {
          if (dev.handle === act.user) {
            const nextXp = dev.xp + act.xp;
            const nextLvl = nextXp >= 2000 ? 3 : nextXp >= 1000 ? 2 : 1;
            return { ...dev, xp: nextXp, weekly: dev.weekly + act.xp, level: nextLvl };
          }
          return dev;
        }));
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // --- Handlers & Core Methods ---

  // Earn XP Action
  const earnXP = (amount, reason = "Task Cleared") => {
    setXp(prev => prev + amount);
    
    // Add floating popup
    const id = Date.now() + Math.random();
    setFloatingPopups(prev => [...prev, { id, amount }]);
    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== id));
    }, 800);

    // Append to feed
    const date = new Date();
    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    setFeedItems(prev => [
      { time: timeStr, user: "@You", action: `${reason}`, gain: `+${amount} XP` },
      ...prev.slice(0, 3)
    ]);

    appendTerminalOutput(`PoW validation log: ${reason}. +${amount} XP granted.`);
  };

  // Append line to simulator terminal
  const appendTerminalOutput = (text, type = "sys") => {
    setTerminalOutLines(prev => [...prev, { type, text }]);
  };

  // Process Console Command
  const handleTerminalSubmit = (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInValue.toLowerCase().trim();
      setTerminalInValue("");

      // Echo command
      appendTerminalOutput(`velocity-cohort $ ${cmd}`, "echo");

      if (cmd === "help") {
        appendTerminalOutput("Avail commands: help | claim | status | multiplier | reset");
      } else if (cmd === "claim") {
        earnXP(50, "Console prompt checkin");
      } else if (cmd === "status") {
        appendTerminalOutput(`Streak: ${streak} days | Level: ${level} (${levelTitle}) | XP: ${xp}`);
      } else if (cmd === "multiplier") {
        appendTerminalOutput("Current multiplier: 1.2x (Reason: Active 7+ day streak)");
      } else if (cmd === "reset") {
        localStorage.removeItem("velocity_cohort_state");
        setXp(350);
        setStreak(28);
        setLevel(1);
        setLevelTitle("COMPILING_INIT");
        setBadges(["badge-initiation", "badge-streak"]);
        setScheduledSessions([]);
        setTerminalOutLines([
          { type: "sys", text: "State reset. Cohort kernel reinitialized." }
        ]);
      } else if (cmd !== "") {
        appendTerminalOutput(`Unknown command: '${cmd}'. Type 'help' for options.`, "error");
      }
    }
  };

  // Copy code sandbox logic
  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[lang]).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  // Daily Checkin Submit
  const handleDailyCheckin = (e) => {
    e.preventDefault();
    if (!checkSolve || !checkCommit || !checkMeet) return;
    
    earnXP(100, "Daily check-in PoW submission");
    setStreak(prev => prev + 1);
    
    // Clear inputs
    setCheckSolve(false);
    setCheckCommit(false);
    setCheckMeet(false);
    setBuddyComment("");
  };

  // Session Scheduler Submit
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleDate || !scheduleTopic) return;

    const newSession = {
      date: scheduleDate,
      time: scheduleTime,
      topic: scheduleTopic
    };
    setScheduledSessions(prev => [...prev, newSession]);
    setScheduleDate("");
    setScheduleTopic("");
    appendTerminalOutput(`Scheduled: ${scheduleTopic} logged successfully.`);
  };

  // Cohort Application Registration
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!appName || !appEmail || !appGitHub) return;
    setAppSubmitted(true);
  };

  // Roll active buddy index
  const handleRotateBuddy = () => {
    const nextIdx = (activeBuddyIndex + 1) % buddyProfiles.length;
    setActiveBuddyIndex(nextIdx);
    appendTerminalOutput(`Buddy system: pairing rotated to ${buddyProfiles[nextIdx].name}`);
  };

  // --- Filtering Leaderboard lists ---
  const getFilteredLeaderboard = () => {
    let devs = [...leaderboardData];
    
    // Sorting
    if (lbFilter === "weekly") {
      devs.sort((a, b) => b.weekly - a.weekly);
    } else if (lbFilter === "streaks") {
      devs.sort((a, b) => b.streak - a.streak);
    } else {
      devs.sort((a, b) => b.xp - a.xp);
    }

    // Search filter
    if (lbSearch.trim() !== "") {
      const q = lbSearch.toLowerCase();
      devs = devs.filter(d => d.name.toLowerCase().includes(q) || d.handle.toLowerCase().includes(q));
    }
    return devs;
  };

  const currentBuddy = buddyProfiles[activeBuddyIndex];
  const activeStep = cycleSteps[currentCycleStep];

  return (
    <div className="dark-theme">
      {/* Floating XP Popup Elements */}
      {floatingPopups.map((p) => (
        <div 
          key={p.id} 
          className="xp-popup-fly"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          +{p.amount} XP
        </div>
      ))}

      {/* Background Matrix/Glow effects */}
      <div className="matrix-grid"></div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Navigation Header */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <a href="#">
              <span className="logo-prompt">&gt;</span> VELOCITY<span class="logo-accent">_13</span>
            </a>
          </div>
          <nav className="nav-links">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#weekly-system" className="nav-link">Weekly System</a>
            <a href="#coding-sprint" className="nav-link">Coding Sprint</a>
            <a href="#build-sprint" className="nav-link">Build Sprint</a>
            <a href="#buddy-system" className="nav-link">Buddy System</a>
            <a href="#xp-system" className="nav-link">XP Dashboard</a>
            <a href="#daily-cycle" className="nav-link">Daily Cycle</a>
          </nav>
          <div className="header-actions">
            <div className="user-xp-status" id="header-xp-badge">
              <Zap className="xp-icon" size={16} fill="currentColor" />
              <span className="xp-value" id="current-xp-header">{xp}</span>
              <span className="xp-label">XP</span>
            </div>
            <button 
              className="theme-toggle" 
              id="console-theme-btn" 
              title="Toggle Console Glitch Mode"
              onClick={() => setConsoleGlitch(!consoleGlitch)}
            >
              {consoleGlitch ? <Monitor size={18} /> : <Terminal size={18} />}
            </button>
            <a href="#apply-now" className="btn btn-primary btn-sm">Apply Now</a>
          </div>
          <button 
            className="mobile-menu-toggle" 
            id="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`} id="mobile-nav">
        <a href="#how-it-works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
        <a href="#weekly-system" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Weekly System</a>
        <a href="#coding-sprint" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Coding Sprint</a>
        <a href="#build-sprint" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Build Sprint</a>
        <a href="#buddy-system" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Buddy System</a>
        <a href="#xp-system" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>XP Dashboard</a>
        <a href="#daily-cycle" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Daily Cycle</a>
        <div className="mobile-nav-footer">
          <a href="#apply-now" className="btn btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Apply Now</a>
        </div>
      </div>

      <main>
        {/* 1. HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="badge-accent">
                <span className="pulse-dot"></span> NEXT BATCH STARTS SOON
              </div>
              <h1>Accelerate Your Dev Velocity. <span className="gradient-text">No Excuses.</span></h1>
              <p className="hero-description">
                A brutalist 13-month developer sprint focused on <strong>consistency over perfection</strong>. Build daily proof of work, dominate weekly coding contests, and launch production-grade projects.
              </p>
              <div className="hero-ctas">
                <a href="#apply-now" className="btn btn-primary">Join the Cohort</a>
                <a href="#how-it-works" className="btn btn-secondary">Learn More</a>
              </div>
              
              {/* Real-Time Activity Feed Mockup */}
              <div className="activity-feed-wrapper">
                <div className="feed-header">
                  <span className="feed-title"><Activity size={16} style={{ marginRight: '6px' }} /> Cohort Pulse (Live Feed)</span>
                  <span className="feed-status-dot"></span>
                </div>
                <div className="feed-container" id="live-activity-feed">
                  {feedItems.map((item, idx) => (
                    <div key={idx} className="feed-item">
                      <span className="feed-time">{item.time}</span>
                      <span className="feed-user">{item.user}</span> {item.action} <span className="gain-green">{item.gain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Streak Tracker Visualizer */}
            <div className="hero-visual">
              <div className="terminal-mockup">
                <div className="terminal-header">
                  <span className="term-dot close"></span>
                  <span className="term-dot minimize"></span>
                  <span className="term-dot maximize"></span>
                  <span className="terminal-title">user@velocity-console:~</span>
                </div>
                <div className="terminal-body">
                  <div className="streak-header-stats">
                    <div className="stat-box">
                      <span className="stat-val text-neon-green" id="hero-streak-count">{streak}</span>
                      <span className="stat-lbl">Active Streak</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-val text-electric-blue">96.8%</span>
                      <span className="stat-lbl">Consistency</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-val text-neon-green" id="hero-xp-total">{xp}</span>
                      <span className="stat-lbl">XP Earned</span>
                    </div>
                  </div>

                  <div className="streak-grid-wrapper">
                    <p className="section-sub-title mono-font">&gt; streak_contributions --user=current</p>
                    <div className="streak-grid" id="streak-days-grid">
                      {/* Generates 30 Contribution Blocks */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        let levelClass = "";
                        if (i < 20) {
                          levelClass = `level-${(i % 3) + 1}`;
                        } else if (i < 28) {
                          levelClass = i % 5 === 0 ? "level-0" : "level-2";
                        } else if (i === 28) {
                          levelClass = "level-3";
                        }
                        return (
                          <div 
                            key={i} 
                            className={`streak-day ${levelClass}`} 
                            title={`Day ${i + 1}: Activity Level`}
                          />
                        );
                      })}
                    </div>
                    <div className="streak-legend">
                      <span>Less Consistent</span>
                      <span className="legend-box level-0"></span>
                      <span className="legend-box level-1"></span>
                      <span className="legend-box level-2"></span>
                      <span className="legend-box level-3"></span>
                      <span>High Velocity</span>
                    </div>
                  </div>

                  <div className="terminal-prompt-line">
                    <span className="prompt-text">velocity-cohort $</span>
                    <input 
                      type="text" 
                      className="terminal-input" 
                      id="terminal-input" 
                      placeholder="Type 'help' or 'claim'..." 
                      ref={terminalInputRef}
                      value={terminalInValue}
                      onChange={(e) => setTerminalInValue(e.target.value)}
                      onKeyDown={handleTerminalSubmit}
                    />
                  </div>
                  <div className="terminal-output" id="terminal-output">
                    {/* Render output lines reversed (newest first) or bottom down. */}
                    {terminalOutLines.slice(-3).map((line, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          color: line.type === "sys" ? "var(--color-neon-green)" : 
                                 line.type === "error" ? "var(--color-crimson)" : "inherit",
                          display: 'block'
                        }}
                      >
                        {line.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. HOW IT WORKS SECTION */}
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

            {/* Timeline Component */}
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

        {/* 3. WEEKLY SYSTEM (5+1+1) */}
        <section className="weekly-system-section" id="weekly-system">
          <div className="container">
            <div className="section-header text-center">
              <h2 class="section-title">The 5+1+1 Weekly Cadence</h2>
              <p className="section-subtitle text-muted">A balanced, relentless cycle designed to avoid developer burnout while maintaining peak momentum.</p>
            </div>

            <div className="calendar-grid">
              {/* Mon-Fri */}
              <div className="calendar-card weekday">
                <div className="calendar-card-header">
                  <span className="day-count">5 DAYS</span>
                  <span className="day-span">MON - FRI</span>
                </div>
                <div className="calendar-card-body">
                  <h4>Core Deep-Dive Learning</h4>
                  <ul className="calendar-tasks">
                    <li><Check className="task-done" size={14} /> Algorithmic Mastery (DSA)</li>
                    <li><Check className="task-done" size={14} /> Low-Level & High-Level System Design</li>
                    <li><Check className="task-done" size={14} /> Project Build components</li>
                    <li><Check className="task-done" size={14} /> Peer Review sessions</li>
                  </ul>
                </div>
              </div>

              {/* Saturday */}
              <div className="calendar-card sprint">
                <div className="calendar-card-header">
                  <span className="day-count">1 DAY</span>
                  <span className="day-span text-electric-blue">SATURDAY</span>
                </div>
                <div className="calendar-card-body">
                  <h4>Weekly Sprint & Contests</h4>
                  <ul className="calendar-tasks">
                    <li><Zap className="text-neon-green" size={14} /> 3-Hour Algorithmic Hackathon</li>
                    <li><Zap className="text-neon-green" size={14} /> Rapid prototyping builds</li>
                    <li><Zap className="text-neon-green" size={14} /> Live leaderboard wars</li>
                  </ul>
                </div>
              </div>

              {/* Sunday */}
              <div className="calendar-card rest">
                <div className="calendar-card-header">
                  <span className="day-count">1 DAY</span>
                  <span className="day-span text-neon-green">SUNDAY</span>
                </div>
                <div className="calendar-card-body">
                  <h4>Recovery & Strategy Rest</h4>
                  <p>Reflect on weekly logs, schedule buddy systems, and refresh mental models. No compulsory submission deadlines.</p>
                </div>
              </div>
            </div>

            {/* Exam Pass Flexibility banner */}
            <div className="glass-card flex-pass-banner">
              <div className="flex-pass-content">
                <div className="flex-pass-icon">
                  <Shield className="glowing-icon" size={24} />
                </div>
                <div>
                  <h4>Exam Pass & Safe Havens</h4>
                  <p>University exams? Critical production deployments at work? Burnout risk? Trigger a <strong>Safe Haven Pass</strong> up to twice a quarter to pause submissions without losing your streak multiplier.</p>
                </div>
              </div>
              <div className="flex-pass-action">
                <span className="badge badge-outline">2 Passes Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WEEKLY CODING SPRINT */}
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

        {/* 5. BUILD SPRINT */}
        <section className="build-sprint-section" id="build-sprint">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">Build Sprint: Show Your Shipping Power</h2>
              <p className="section-subtitle text-muted">Developers don't just solve problems, they ship products. Peer-reviewed project showcase.</p>
            </div>

            {/* Hackathon Countdown Banner */}
            <div className="hackathon-banner glass-card">
              <div className="banner-content">
                <span className="hackathon-badge">MID-COHORT HACKATHON</span>
                <h3>Velocity Hackathon V1: Devtools & AI Automation</h3>
                <p>An intense 48-hour build challenge. Build developer productivity applications, deploy them, and submit for peer review.</p>
              </div>
              <div className="banner-timer">
                <div className="timer-digits" id="hackathon-timer">{hackathonTimer}</div>
                <span className="timer-desc">Rethink limits. Build the future.</span>
              </div>
            </div>

            {/* Project Showcase Grid */}
            <div className="grid grid-3" id="project-showcase-grid">
              {/* Project 1 */}
              <div className="project-card glass-card">
                <div className="project-img-placeholder">
                  <span className="mono-font">&lt;DEV-COMPLY-AI /&gt;</span>
                </div>
                <div className="project-body">
                  <span className="project-tag">AI Automation</span>
                  <h3>GitComply AI</h3>
                  <p>An AI agent inspecting pull requests for architecture flaws and generating clean lint configurations dynamically.</p>
                  
                  <div className="project-team">
                    <span className="team-label">Shipped by:</span>
                    <div className="avatar-group">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" className="avatar-circle xs" title="@dev_john" />
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" className="avatar-circle xs" title="@elena_design" />
                    </div>
                  </div>

                  <div className="project-feedback">
                    <span className="feedback-quote">"The prompt validation module saved us hours."</span>
                    <span className="feedback-author">- Mentored by @lead_archi</span>
                  </div>

                  <div className="project-links">
                    <a href="https://GitHub.com" target="_blank" rel="noreferrer" className="project-link">Repo</a>
                    <a href="https://vercel.com" target="_blank" rel="noreferrer" className="project-link"><Share2 size={14} style={{ marginRight: '4px' }} /> Live Demo</a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="project-card glass-card">
                <div className="project-img-placeholder">
                  <span className="mono-font">&lt;VISUAL-COMPUTE /&gt;</span>
                </div>
                <div className="project-body">
                  <span className="project-tag">WebGL & Tools</span>
                  <h3>GraphQ-Trace</h3>
                  <p>Interact with GraphQL resolvers in a three-dimensional visual space, tracing query speed bottlenecks.</p>
                  
                  <div className="project-team">
                    <span className="team-label">Shipped by:</span>
                    <div className="avatar-group">
                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" className="avatar-circle xs" title="@marcus_dev" />
                    </div>
                  </div>

                  <div className="project-feedback">
                    <span className="feedback-quote">"Rendering 10k nodes in canvas was smooth."</span>
                    <span className="feedback-author">- Peer Review by @graph_lord</span>
                  </div>

                  <div className="project-links">
                    <a href="https://GitHub.com" target="_blank" rel="noreferrer" className="project-link">Repo</a>
                    <a href="https://vercel.com" target="_blank" rel="noreferrer" className="project-link"><Share2 size={14} style={{ marginRight: '4px' }} /> Live Demo</a>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="project-card glass-card">
                <div className="project-img-placeholder">
                  <span className="mono-font">&lt;TERMINAL-UI /&gt;</span>
                </div>
                <div className="project-body">
                  <span className="project-tag">CLI Tooling</span>
                  <h3>SyncShell</h3>
                  <p>Sync environmental profiles, command logs, and alias layouts securely between multiple container shells.</p>
                  
                  <div className="project-team">
                    <span className="team-label">Shipped by:</span>
                    <div className="avatar-group">
                      <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" className="avatar-circle xs" title="@cyber_sam" />
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" className="avatar-circle xs" title="@lisa_code" />
                    </div>
                  </div>

                  <div className="project-feedback">
                    <span className="feedback-quote">"Zero-dependency binary file structure makes it robust."</span>
                    <span className="feedback-author">- Mentored by @rust_guru</span>
                  </div>

                  <div className="project-links">
                    <a href="https://GitHub.com" target="_blank" rel="noreferrer" className="project-link">Repo</a>
                    <a href="https://vercel.com" target="_blank" rel="noreferrer" className="project-link"><Share2 size={14} style={{ marginRight: '4px' }} /> Live Demo</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BUDDY SYSTEM */}
        <section className="buddy-system-section" id="buddy-system">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">The Buddy Synergy Engine</h2>
              <p className="section-subtitle text-muted">Pairs change every 7 days. Review their PRs, write code together, and boost your mutual XP multipliers.</p>
            </div>

            <div className="buddy-container-grid">
              {/* Buddy Pairing Widget */}
              <div className="buddy-widget glass-card border-glow-blue">
                <div className="widget-header-title">
                  <h3><Users size={18} style={{ marginRight: '6px' }} /> Active Pairing</h3>
                  <span className="active-badge-status">SYNC ACTIVE</span>
                </div>
                <div className="current-buddy-card" id="buddy-pairing-card" style={{ transition: 'all 0.15s ease-out' }}>
                  <div className="buddy-avatar-area">
                    <img src={currentBuddy.avatar} alt="Buddy" id="buddy-img" className="avatar-circle lg" />
                    <div className="badge-status-dot online"></div>
                  </div>
                  <div className="buddy-details">
                    <h4 id="buddy-name">{currentBuddy.name}</h4>
                    <span className="buddy-handle" id="buddy-handle">{currentBuddy.handle}</span>
                    <div className="buddy-meta-chips">
                      <span className="chip font-mono">{currentBuddy.GitHub}</span>
                      <span className="chip font-mono"><Zap size={12} style={{ marginRight: '4px' }} /> Streak: {currentBuddy.streak}</span>
                    </div>
                    <div className="buddy-xp-bonus">
                      <Zap className="text-neon-green" size={14} style={{ marginRight: '4px' }} /> <span>Buddy Multiplier: <strong>1.5x XP</strong> on joint coding review sessions!</span>
                    </div>
                  </div>
                </div>
                <div className="buddy-actions-row">
                  <button className="btn btn-secondary btn-sm" id="rotate-buddy-btn" onClick={handleRotateBuddy}><Shuffle size={14} style={{ marginRight: '4px' }} /> Roll Next Buddy</button>
                  <a href="#discord-channel" className="btn btn-outline btn-sm"><MessageSquare size={14} style={{ marginRight: '4px' }} /> Open DM Chat</a>
                </div>
              </div>

              {/* Daily Check-in Form */}
              <div className="check-in-form-container glass-card">
                <h3>Daily Sync Check-in</h3>
                <form id="buddy-checkin-form" className="buddy-form" onSubmit={handleDailyCheckin}>
                  <div className="form-group-checkbox">
                    <label className="checkbox-container">
                      <input type="checkbox" id="check-solve" checked={checkSolve} onChange={(e) => setCheckSolve(e.target.checked)} required />
                      <span className="checkmark"></span>
                      Solved the Daily Algorithmic Challenge
                    </label>
                  </div>
                  <div className="form-group-checkbox">
                    <label className="checkbox-container">
                      <input type="checkbox" id="check-commit" checked={checkCommit} onChange={(e) => setCheckCommit(e.target.checked)} required />
                      <span className="checkmark"></span>
                      Pushed PoW commit to repository
                    </label>
                  </div>
                  <div className="form-group-checkbox">
                    <label className="checkbox-container">
                      <input type="checkbox" id="check-meet" checked={checkMeet} onChange={(e) => setCheckMeet(e.target.checked)} required />
                      <span className="checkmark"></span>
                      Conducted peer review / Sync with your buddy
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="buddy-comment" className="form-label mono-font">Sync Notes / Code Review link</label>
                    <textarea 
                      id="buddy-comment" 
                      className="form-input" 
                      rows="2" 
                      placeholder="e.g. Reviewed @alex_dev's sliding window solution. Discussed heap complexity."
                      value={buddyComment}
                      onChange={(e) => setBuddyComment(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full"><CheckCircle2 size={16} style={{ marginRight: '6px' }} /> Submit Proof & Claim XP</button>
                </form>
              </div>

              {/* Pair Programming Scheduler */}
              <div className="scheduler-container glass-card">
                <h3>Pair Programming Scheduler</h3>
                <p className="section-sub-title text-muted text-sm">Coordinate code reviews, whiteboard exercises, and pairing sessions easily.</p>
                
                <form id="scheduler-form" className="buddy-form" onSubmit={handleScheduleSubmit}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label mono-font" htmlFor="schedule-date">Select Date</label>
                      <input 
                        type="date" 
                        id="schedule-date" 
                        className="form-input" 
                        required 
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label mono-font" htmlFor="schedule-time">Select Slot</label>
                      <select 
                        id="schedule-time" 
                        className="form-input" 
                        required 
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      >
                        <option value="10:00">10:00 - 11:30 UTC</option>
                        <option value="14:00">14:00 - 15:30 UTC</option>
                        <option value="17:00">17:00 - 18:30 UTC</option>
                        <option value="21:00">21:00 - 22:30 UTC</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label mono-font" htmlFor="schedule-topic">Session Topic</label>
                    <input 
                      type="text" 
                      id="schedule-topic" 
                      className="form-input" 
                      placeholder="e.g., Whiteboard System Design or Mock Interview" 
                      required 
                      value={scheduleTopic}
                      onChange={(e) => setScheduleTopic(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary w-full"><Calendar size={16} style={{ marginRight: '6px' }} /> Book Pair Session</button>
                </form>

                <div className="booked-sessions-list-wrapper">
                  <h4 className="mono-font text-xs text-electric-blue">&gt; SCHEDULED_SESSIONS</h4>
                  <ul className="booked-sessions-list" id="sessions-list">
                    {scheduledSessions.length === 0 ? (
                      <li className="no-sessions">No pair sessions scheduled yet.</li>
                    ) : (
                      scheduledSessions.map((session, idx) => (
                        <li key={idx}>
                          <div>
                            <strong>{session.topic}</strong>
                            <span style={{ color: 'var(--text-dark)', display: 'block', fontSize: '0.7rem' }}>
                              {session.date} @ {session.time} UTC
                            </span>
                          </div>
                          <span className="session-badge font-mono">PENDING SYNC</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. VELOCITY XP SYSTEM */}
        <section className="xp-system-section" id="xp-system">
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

        {/* 8. DAILY CYCLE INFOGRAPHIC */}
        <section className="daily-cycle-section" id="daily-cycle">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">The Velocity Daily Cycle</h2>
              <p className="section-subtitle text-muted">A perfect 24-hour cycle of deliberate practice. Click steps to understand core structures.</p>
            </div>

            <div className="cycle-grid">
              <div className="svg-diagram-wrapper">
                <svg className="cycle-svg" viewBox="0 0 400 400" width="100%" height="100%">
                  <defs>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#060913" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="140" fill="url(#centerGlow)" />
                  
                  {/* Connectors */}
                  <circle cx="200" cy="200" r="120" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="2" fill="none" strokeDasharray="10 10" />
                  
                  <text x="200" y="195" fontFamily="'Share Tech Mono', monospace" fontSize="16" fill="#00f0ff" textAnchor="middle" letterSpacing="1">VELOCITY</text>
                  <text x="200" y="215" fontFamily="'Share Tech Mono', monospace" fontSize="11" fill="#39ff14" textAnchor="middle" letterSpacing="3">24-HOUR ROT</text>

                  {/* Nodes */}
                  <g className={`svg-node ${currentCycleStep === 0 ? 'active' : ''}`} id="node-learn" transform="translate(200, 70)" onClick={() => setCurrentCycleStep(0)}>
                    <circle r="28" className="node-circle" />
                    <text className="node-icon" y="5" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="11">LEARN</text>
                  </g>
                  <g className={`svg-node ${currentCycleStep === 1 ? 'active' : ''}`} id="node-solve" transform="translate(320, 150)" onClick={() => setCurrentCycleStep(1)}>
                    <circle r="28" className="node-circle" />
                    <text className="node-icon" y="5" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="11">SOLVE</text>
                  </g>
                  <g className={`svg-node ${currentCycleStep === 2 ? 'active' : ''}`} id="node-build" transform="translate(275, 290)" onClick={() => setCurrentCycleStep(2)}>
                    <circle r="28" className="node-circle" />
                    <text className="node-icon" y="5" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="11">BUILD</text>
                  </g>
                  <g className={`svg-node ${currentCycleStep === 3 ? 'active' : ''}`} id="node-commit" transform="translate(125, 290)" onClick={() => setCurrentCycleStep(3)}>
                    <circle r="28" className="node-circle" />
                    <text className="node-icon" y="5" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="11">COMMIT</text>
                  </g>
                  <g className={`svg-node ${currentCycleStep === 4 ? 'active' : ''}`} id="node-reflect" transform="translate(80, 150)" onClick={() => setCurrentCycleStep(4)}>
                    <circle r="28" className="node-circle" />
                    <text className="node-icon" y="5" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="11">REFLECT</text>
                  </g>
                </svg>
              </div>

              {/* Interactive Stepper Details */}
              <div className="stepper-details-card glass-card">
                <div className="stepper-header-title">
                  <span className="step-indicator" id="step-number">{activeStep.num}</span>
                  <h3 id="step-title">{activeStep.title}</h3>
                </div>
                <div className="step-body-content">
                  <p id="step-description">{activeStep.description}</p>
                  
                  <div className="step-metrics-badge font-mono">
                    <span>{activeStep.metric.split("|")[0]?.trim()}</span>
                    <span>{activeStep.metric.split("|")[1]?.trim()}</span>
                  </div>
                </div>

                <div className="stepper-nav-buttons">
                  <button 
                    className="btn btn-secondary btn-sm" 
                    id="stepper-prev-btn"
                    onClick={() => setCurrentCycleStep(prev => (prev - 1 + cycleSteps.length) % cycleSteps.length)}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button 
                    className="btn btn-primary btn-sm" 
                    id="stepper-next-btn"
                    onClick={() => setCurrentCycleStep(prev => (prev + 1) % cycleSteps.length)}
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & APPLICATIONS FORM */}
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
                <button type="submit" className="btn btn-primary w-full"><Rocket size={16} style={{ marginRight: '6px' }} /> Submit Application</button>
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
      </main>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-grid max-w-md">
            {[
              {
                q: "Is this cohort for absolute beginners?",
                a: "No. Velocity is designed for junior developers, computer science students, and self-taught engineers who already know basic programming principles and wish to transition into high-performing builders."
              },
              {
                q: "What happens if I miss a Proof of Work day?",
                a: "Missing a day resets your streak multiplier to 1.0x. However, you can trigger your \"Safe Haven Pass\" up to twice a quarter to protect your streak."
              },
              {
                q: "What is the price of the cohort?",
                a: "Pricing and scholarship details are shared post-application, based on portfolio assessment and commitment levels during interviews."
              }
            ].map((faqItem, idx) => (
              <div key={idx} className={`faq-item glass-card ${faqActive[idx] ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setFaqActive(prev => ({ ...prev, [idx]: !prev[idx] }))}>
                  <span>{faqItem.q}</span>
                  <ChevronDown className="faq-chevron" size={16} />
                </div>
                <div className="faq-answer">
                  <p>{faqItem.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <a href="#how-it-works">How It Works</a>
            <a href="#weekly-system">Weekly System</a>
            <a href="#coding-sprint">Weekly Sprint</a>
            <a href="#buddy-system">Buddy Network</a>
          </div>
          <div className="footer-nav">
            <h4>Legal & Info</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Play</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; 2026 The 13-Month Velocity Cohort. All Rights Reserved. Built with console values.</p>
        </div>
      </footer>
    </div>
  );
}
