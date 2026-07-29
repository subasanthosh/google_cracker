import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import CodingSprintSection from './components/CodingSprintSection';
import BuildSprintSection from './components/BuildSprintSection';
import BuddySystemSection from './components/BuddySystemSection';
import XpSystemSection from './components/XpSystemSection';
import DailyCycleSection from './components/DailyCycleSection';
import ApplySection from './components/ApplySection';
import FaqSection from './components/FaqSection';
import WeeklySystemSection from './components/WeeklySystemSection';
import Login from './components/Login';
import Register from './components/Register';

import { initialLeaderboard } from './constants';

export default function App() {
  const [xp, setXp] = useState(350);
  const [streak, setStreak] = useState(28);
  const [level, setLevel] = useState(1);
  const [levelTitle, setLevelTitle] = useState("COMPILING_INIT");
  const [badges, setBadges] = useState(["badge-initiation", "badge-streak"]);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboard);
  const [consoleGlitch, setConsoleGlitch] = useState(false);

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
  const terminalInputRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isApply = location.pathname === '/apply-now';
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

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

  useEffect(() => {
    const stateToSave = { xp, streak, level, levelTitle, badges, scheduledSessions };
    localStorage.setItem("velocity_cohort_state", JSON.stringify(stateToSave));
  }, [xp, streak, level, levelTitle, badges, scheduledSessions]);

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

    setLeaderboardData(prev => prev.map(dev => {
      if (dev.handle === "@console_lord") {
        return { ...dev, xp, streak, level: nextLvl };
      }
      return dev;
    }));

  }, [xp]);

  useEffect(() => {
    if (consoleGlitch) {
      document.body.classList.add("console-glitch-mode");
    } else {
      document.body.classList.remove("console-glitch-mode");
    }
  }, [consoleGlitch]);

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
        const date = new Date();
        const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        setFeedItems(prev => [
          { time: timeStr, user: act.user, action: act.desc, gain: `+${act.xp} XP` },
          ...prev.slice(0, 3)
        ]);

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

  const appendTerminalOutput = (text, type = "sys") => {
    setTerminalOutLines(prev => [...prev, { type, text }]);
  };

  const earnXP = (amount, reason = "Task Cleared") => {
    setXp(prev => prev + amount);

    const id = Date.now() + Math.random();
    setFloatingPopups(prev => [...prev, { id, amount }]);
    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== id));
    }, 800);

    const date = new Date();
    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    setFeedItems(prev => [
      { time: timeStr, user: "@You", action: `${reason}`, gain: `+${amount} XP` },
      ...prev.slice(0, 3)
    ]);

    appendTerminalOutput(`PoW validation log: ${reason}. +${amount} XP granted.`);
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

      {!isHome && !isApply && (
        <Header
          xp={xp} level={level} levelTitle={levelTitle} streak={streak}
          consoleGlitch={consoleGlitch} setConsoleGlitch={setConsoleGlitch}
        />
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <HeroSection
              streak={streak} xp={xp} level={level} levelTitle={levelTitle}
              feedItems={feedItems} earnXP={earnXP}
              terminalInValue={terminalInValue} setTerminalInValue={setTerminalInValue}
              terminalOutLines={terminalOutLines} handleTerminalSubmit={handleTerminalSubmit}
              terminalInputRef={terminalInputRef}
            />
          } />
          <Route path="/how-it-works" element={<HowItWorksSection />} />
          <Route path="/sprint" element={<CodingSprintSection />} />
          <Route path="/build-sprint" element={<BuildSprintSection />} />
          <Route path="/buddy-system" element={
            <BuddySystemSection
              earnXP={earnXP} setStreak={setStreak}
              scheduledSessions={scheduledSessions} setScheduledSessions={setScheduledSessions}
              appendTerminalOutput={appendTerminalOutput}
            />
          } />
          <Route path="/xp-system" element={
            <XpSystemSection
              xp={xp} level={level} levelTitle={levelTitle}
              badges={badges} leaderboardData={leaderboardData} earnXP={earnXP}
            />
          } />
          <Route path="/daily-cycle" element={<DailyCycleSection />} />
          <Route path="/apply-now" element={<ApplySection />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route path="/weekly-system" element={<WeeklySystemSection />} />
          <Route path="/login" element={<Login earnXP={earnXP} />} />
          <Route path="/register" element={<Register earnXP={earnXP} />} />
          <Route path="*" element={
            <HeroSection
              streak={streak} xp={xp} level={level} levelTitle={levelTitle}
              feedItems={feedItems} earnXP={earnXP}
              terminalInValue={terminalInValue} setTerminalInValue={setTerminalInValue}
              terminalOutLines={terminalOutLines} handleTerminalSubmit={handleTerminalSubmit}
              terminalInputRef={terminalInputRef}
            />
          } />
        </Routes>
      </main>

      {isHome && <Footer />}
    </div>
  );
}
