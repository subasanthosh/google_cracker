import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import CodingSprintSection from './components/CodingSprintSection';
import BuildSprintSection from './components/BuildSprintSection';
import XpSystemSection from './components/XpSystemSection';
import ApplySection from './components/ApplySection';
import FaqSection from './components/FaqSection';
import WeeklySystemSection from './components/WeeklySystemSection';
import Login from './components/Login';
import Register from './components/Register';
import ProjectTrackerSection from './components/ProjectTrackerSection';

import { initialLeaderboard } from './constants';
import googleWorkspaceBright from './assets/google_workspace_bright.png';
import googleAbstractTech from './assets/google_abstract_tech.png';
import googleCafeteriaBright from './assets/google_cafeteria_bright.png';

export default function App() {
  const location = useLocation();
  const terminalInputRef = useRef(null);
  const isFirstLoad = useRef(true);

  const email = localStorage.getItem("email") || "";
  const [xp, setXp] = useState(() => {
    return email ? null : 350;
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("velocity_cohort_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.streak !== undefined) return parsed.streak;
      } catch (e) {}
    }
    return 28;
  });
  const [badges, setBadges] = useState(["badge-initiation", "badge-streak"]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [consoleGlitch, setConsoleGlitch] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (amount, reason) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, amount, reason }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const bonus = localStorage.getItem("login_checkin_bonus");
    if (bonus === "true") {
      localStorage.removeItem("login_checkin_bonus");
      showToast(10, "Daily Login Checkin Bonus");
    }
  }, [location.pathname]);

  const [feedItems, setFeedItems] = useState([
    { time: "12:28", user: "@alex_dev", action: "solved LeetCode #239 (Hard)", gain: "+200 XP" },
    { time: "12:25", user: "@pixel_ninja", action: "pushed 5 commits to velocity-core", gain: "+50 XP" }
  ]);
  const [floatingPopups, setFloatingPopups] = useState([]);

  const [terminalInValue, setTerminalInValue] = useState("");
  const [terminalOutLines, setTerminalOutLines] = useState([
    { type: "sys", text: "Initializing cohort kernel terminal..." },
    { type: "sys", text: "Ready. Type 'help' for available diagnostic commands." }
  ]);
  const isHome = location.pathname === '/';
  const isApply = location.pathname === '/apply-now';
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  useEffect(() => {
    const saved = localStorage.getItem("velocity_cohort_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
      } catch (e) {
        console.error("Local storage parsing error:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchXpFromDb = async () => {
      const email = localStorage.getItem("email") || "";
      if (!email) return;
      try {
        const res = await fetch(`http://localhost:8000/get/xp_scores?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.xp_scores !== undefined) {
            setXp(data.xp_scores);
          }
        } else {
          setXp(prev => prev === null ? 350 : prev);
        }
      } catch (err) {
        console.error("Failed to fetch XP from DB:", err);
        setXp(prev => prev === null ? 350 : prev);
      }
    };
    
    fetchXpFromDb();
    const interval = setInterval(fetchXpFromDb, 4000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  useEffect(() => {
    const htmlEl = document.documentElement;
    switch (location.pathname) {
      case '/sprint':
        htmlEl.style.setProperty('--page-bg', `url(${googleWorkspaceBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'blur(3px) brightness(0.85)');
        break;
      case '/project-tracker':
        htmlEl.style.setProperty('--page-bg', `url(${googleAbstractTech})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.7)');
        break;
      case '/build-sprint':
        htmlEl.style.setProperty('--page-bg', `url(${googleCafeteriaBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.8)');
        break;
      case '/buddy-system':
        htmlEl.style.setProperty('--page-bg', `url(${googleWorkspaceBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.8)');
        break;
      case '/xp-system':
        htmlEl.style.setProperty('--page-bg', `url(${googleWorkspaceBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.8)');
        break;
      case '/daily-cycle':
        htmlEl.style.setProperty('--page-bg', `url(${googleCafeteriaBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.8)');
        break;
      case '/weekly-system':
        htmlEl.style.setProperty('--page-bg', `url(${googleCafeteriaBright})`);
        htmlEl.style.setProperty('--page-bg-filter', 'brightness(0.8)');
        break;
      default:
        htmlEl.style.removeProperty('--page-bg');
        htmlEl.style.removeProperty('--page-bg-filter');
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    const stateToSave = { streak };
    localStorage.setItem("velocity_cohort_state", JSON.stringify(stateToSave));
  }, [streak]);

  useEffect(() => {
    if (xp === null) {
      setLeaderboardData(prev => prev.map(dev => {
        if (dev.email === email) {
          return { ...dev, xp: null };
        }
        return dev;
      }));
      return;
    }

    const updatedBadges = [...badges];
    let badgeUnlocked = false;

    if (xp >= 1000 && !updatedBadges.includes("badge-algorithm")) {
      updatedBadges.push("badge-algorithm");
      badgeUnlocked = true;
      if (!isFirstLoad.current) {
        appendTerminalOutput("System Notification: Badge Unlocked - Recursion Ruler!");
      }
    }
    if (xp >= 2000 && !updatedBadges.includes("badge-legend")) {
      updatedBadges.push("badge-legend");
      badgeUnlocked = true;
      if (!isFirstLoad.current) {
        appendTerminalOutput("System Notification: Badge Unlocked - Velocity Titan!");
      }
    }

    if (badgeUnlocked) {
      setBadges(updatedBadges);
    }

    setLeaderboardData(prev => prev.map(dev => {
      if (dev.email === email) {
        return { ...dev, xp };
      }
      return dev;
    }));

    isFirstLoad.current = false;
  }, [xp]);

  useEffect(() => {
    if (consoleGlitch) {
      document.body.classList.add("console-glitch-mode");
    } else {
      document.body.classList.remove("console-glitch-mode");
    }
  }, [consoleGlitch]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:8000/get/usersforrank");
        if (res.ok) {
          const data = await res.json();
          setLeaderboardData(data);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard ranking:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 4000);
    return () => clearInterval(interval);
  }, []);

  const appendTerminalOutput = (text, type = "sys") => {
    setTerminalOutLines(prev => [...prev, { type, text }]);
  };

  const earnXP = (amount, reason = "Task Cleared") => {
    setXp(prev => prev + amount);
    showToast(amount, reason);

    const id = Date.now() + Math.random();
    setFloatingPopups(prev => [...prev, { id, amount }]);
    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== id));
    }, 1000);

    const date = new Date();
    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    setFeedItems(prev => [
      { time: timeStr, user: "@You", action: `${reason}`, gain: `+${amount} XP` },
      ...prev.slice(0, 3)
    ]);

    appendTerminalOutput(`PoW validation log: ${reason}. +${amount} XP granted.`);

    // Sync XP to database
    const email = localStorage.getItem("email") || "";
    if (email) {
      fetch("http://localhost:8000/update/xp_scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, xp_scores: amount })
      }).catch(err => console.error("Error updating XP in DB:", err));
    }
  };

  const handleTerminalSubmit = (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInValue.toLowerCase().trim();
      setTerminalInValue("");

      appendTerminalOutput(`velocity-cohort $ ${cmd}`, "echo");

      if (cmd === "help") {
        appendTerminalOutput("Avail commands: help | claim | status | multiplier | reset");
      } else if (cmd === "claim") {
        earnXP(50, "Console prompt checkin");
      } else if (cmd === "status") {
        appendTerminalOutput(`Streak: ${streak} days | XP: ${xp}`);
      } else if (cmd === "multiplier") {
        appendTerminalOutput("Current multiplier: 1.2x (Reason: Active 7+ day streak)");
      } else if (cmd === "reset") {
        localStorage.removeItem("velocity_cohort_state");
        setXp(350);
        setStreak(28);
        setBadges(["badge-initiation", "badge-streak"]);
        setTerminalOutLines([
          { type: "sys", text: "State reset. Cohort kernel reinitialized." }
        ]);
      } else if (cmd !== "") {
        appendTerminalOutput(`Unknown command: '${cmd}'. Type 'help' for options.`, "error");
      }
    }
  };

  return (
    <div className="dark-theme">
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

      <div className="matrix-grid"></div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {!isHome && !isApply && !isLogin && !isRegister && (
        <Header
          xp={xp} streak={streak}
          consoleGlitch={consoleGlitch} setConsoleGlitch={setConsoleGlitch}
        />
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <HeroSection
              streak={streak} xp={xp}
              feedItems={feedItems} earnXP={earnXP}
              terminalInValue={terminalInValue} setTerminalInValue={setTerminalInValue}
              terminalOutLines={terminalOutLines} handleTerminalSubmit={handleTerminalSubmit}
              terminalInputRef={terminalInputRef}
            />
          } />
          <Route path="/how-it-works" element={<HowItWorksSection />} />
          <Route path="/sprint" element={<CodingSprintSection xp={xp} earnXP={earnXP} />} />
          <Route path="/build-sprint" element={<BuildSprintSection />} />
          <Route path="/xp-system" element={
            <XpSystemSection
              xp={xp}
              badges={badges} leaderboardData={leaderboardData} earnXP={earnXP}
            />
          } />
          <Route path="/apply-now" element={<ApplySection />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route path="/weekly-system" element={<WeeklySystemSection />} />
          <Route path="/project-tracker" element={<ProjectTrackerSection earnXP={earnXP} />} />
          <Route path="/login" element={<Login earnXP={earnXP} />} />
          <Route path="/register" element={<Register earnXP={earnXP} />} />
          <Route path="*" element={
            <HeroSection
              streak={streak} xp={xp}
              feedItems={feedItems} earnXP={earnXP}
              terminalInValue={terminalInValue} setTerminalInValue={setTerminalInValue}
              terminalOutLines={terminalOutLines} handleTerminalSubmit={handleTerminalSubmit}
              terminalInputRef={terminalInputRef}
            />
          } />
        </Routes>
      </main>

      {isHome && <Footer />}

      {/* Toast Notification Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {toasts.map(t => (
          <div
            key={t.id}
            className="xp-toast-alert"
            style={{
              pointerEvents: 'auto',
              background: 'rgba(5, 8, 22, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid #39ff14',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              minWidth: '280px',
              maxWidth: '380px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 12px 32px rgba(57, 255, 20, 0.15), 0 0 10px rgba(57, 255, 20, 0.1)',
              animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(57, 255, 20, 0.12)',
              border: '1px solid rgba(57, 255, 20, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#39ff14',
              flexShrink: 0
            }}>
              <Zap size={18} fill="#39ff14" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '800', fontSize: '0.92rem', marginBottom: '2px' }}>
                +{t.amount} XP Earned!
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.78rem', fontWeight: '500' }}>
                {t.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
