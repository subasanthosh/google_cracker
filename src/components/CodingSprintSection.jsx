import React, { useEffect, useState } from 'react';
import { Code2, Trophy, Plus, X, Loader2, ExternalLink, Zap, Target, Lock, CheckCircle, AlertCircle, Star, Trash2 } from 'lucide-react';
import bgImage3 from '../assets/google_workspace_bright.png';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 8px rgba(66, 133, 244, 0.3); }
    50% { box-shadow: 0 0 22px rgba(66, 133, 244, 0.7); }
  }
  @keyframes pulse-glow-gold {
    0%, 100% { box-shadow: 0 0 8px rgba(251, 188, 5, 0.3); }
    50% { box-shadow: 0 0 22px rgba(251, 188, 5, 0.7); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .sprint-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    border-radius: 50px;
    border: 1.5px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.7);
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }
  .sprint-tab-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sprint-tab-btn:hover::before {
    opacity: 1;
    animation: shimmer 1.2s ease-in-out;
  }
  .sprint-tab-btn:hover {
    color: rgba(255,255,255,0.95);
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }
  .sprint-tab-btn.active-daily {
    background: linear-gradient(135deg, rgba(251,188,5,0.25) 0%, rgba(255,159,0,0.18) 100%);
    border-color: rgba(251,188,5,0.65);
    color: #ffd055;
    animation: pulse-glow-gold 2.5s ease-in-out infinite;
  }
  .sprint-tab-btn.active-weekly {
    background: linear-gradient(135deg, rgba(251,188,5,0.2) 0%, rgba(255,159,0,0.12) 100%);
    border-color: rgba(251,188,5,0.55);
    color: #ffd055;
    animation: pulse-glow-gold 2.5s ease-in-out infinite;
  }

  .sprint-question-card {
    padding: 1.1rem 1.35rem;
    border-radius: 14px;
    background: rgba(10, 16, 32, 0.7);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    transition: all 0.3s ease;
    animation: slideIn 0.35s ease forwards;
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }
  .sprint-question-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    border-radius: 14px 0 0 14px;
    background: linear-gradient(180deg, #FBBC05, #ff9f00);
    opacity: 0.8;
  }
  .sprint-question-card:hover {
    background: rgba(15, 23, 42, 0.85);
    border-color: rgba(255,255,255,0.15);
    transform: translateX(4px);
  }
  .sprint-question-card.locked::before {
    background: linear-gradient(180deg, #64748b, #475569);
  }

  .sprint-verify-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    border: 1.5px solid rgba(34,197,94,0.5);
    background: linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.08));
    color: #4ade80;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .sprint-verify-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(34,197,94,0.3), rgba(22,163,74,0.18));
    border-color: rgba(34,197,94,0.85);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(34,197,94,0.22);
  }
  .sprint-verify-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .sprint-solve-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    border: 1.5px solid rgba(251,188,5,0.5);
    background: linear-gradient(135deg, rgba(251,188,5,0.15), rgba(255,159,0,0.08));
    color: #ffd055;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .sprint-solve-btn:hover {
    background: linear-gradient(135deg, rgba(251,188,5,0.3), rgba(255,159,0,0.18));
    border-color: rgba(251,188,5,0.85);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(251,188,5,0.22);
  }

  .sprint-assess-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    border: 1.5px solid rgba(251,188,5,0.5);
    background: linear-gradient(135deg, rgba(251,188,5,0.15), rgba(255,159,0,0.08));
    color: #ffd055;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .sprint-assess-btn:hover {
    background: linear-gradient(135deg, rgba(251,188,5,0.3), rgba(255,159,0,0.18));
    border-color: rgba(251,188,5,0.85);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(251,188,5,0.22);
  }

  .sprint-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.3rem;
    border-radius: 30px;
    border: 1.5px solid rgba(251,188,5,0.5);
    background: linear-gradient(135deg, rgba(251,188,5,0.15), rgba(255,159,0,0.08));
    color: #ffd055;
    font-size: 0.88rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .sprint-add-btn:hover {
    background: linear-gradient(135deg, rgba(251,188,5,0.3), rgba(255,159,0,0.18));
    border-color: rgba(251,188,5,0.85);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(251,188,5,0.3);
  }

  .sprint-add-btn.weekly-add {
    border-color: rgba(251,188,5,0.5);
    background: linear-gradient(135deg, rgba(251,188,5,0.15), rgba(255,159,0,0.08));
    color: #ffd055;
  }
  .sprint-add-btn.weekly-add:hover {
    background: linear-gradient(135deg, rgba(251,188,5,0.3), rgba(255,159,0,0.18));
    border-color: rgba(251,188,5,0.85);
    box-shadow: 0 5px 20px rgba(251,188,5,0.3);
  }

  .sprint-modal-input {
    padding: 0.8rem 1.1rem;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: rgba(10, 16, 35, 0.7);
    color: #f1f5f9;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .sprint-modal-input:focus {
    border-color: rgba(66,133,244,0.6);
    box-shadow: 0 0 0 3px rgba(66,133,244,0.12);
  }
  .sprint-modal-input::placeholder {
    color: rgba(148,163,184,0.55);
  }
  .sprint-modal-input.weekly-input:focus {
    border-color: rgba(251,188,5,0.55);
    box-shadow: 0 0 0 3px rgba(251,188,5,0.1);
  }

  .sprint-difficulty-select {
    padding: 0.8rem 1.1rem;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: rgba(10, 16, 35, 0.7);
    color: #f1f5f9;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color 0.25s, box-shadow 0.25s;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }
  .sprint-difficulty-select:focus {
    border-color: rgba(66,133,244,0.6);
    box-shadow: 0 0 0 3px rgba(66,133,244,0.12);
  }
  .sprint-difficulty-select option {
    background: #0a1020;
    color: #f1f5f9;
  }
  .sprint-difficulty-select.weekly-select:focus {
    border-color: rgba(251,188,5,0.55);
    box-shadow: 0 0 0 3px rgba(251,188,5,0.1);
  }

  .difficulty-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.18rem 0.6rem;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }
  .difficulty-badge.easy {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.35);
    color: #4ade80;
  }
  .difficulty-badge.medium {
    background: rgba(251, 188, 5, 0.12);
    border: 1px solid rgba(251, 188, 5, 0.35);
    color: #ffd055;
  }
  .difficulty-badge.hard {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #f87171;
  }

  .sprint-modal-cancel {
    flex: 1;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
  }
  .sprint-modal-cancel:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }

  .sprint-modal-submit {
    flex: 1;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #4285F4, #34a8eb);
    color: #fff;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.02em;
  }
  .sprint-modal-submit:hover {
    background: linear-gradient(135deg, #5a96f8, #4ab8f7);
    box-shadow: 0 6px 22px rgba(66,133,244,0.45);
    transform: translateY(-1px);
  }

  .sprint-modal-submit.weekly-submit {
    background: linear-gradient(135deg, #FBBC05, #ff9f00);
    color: #1a1200;
  }
  .sprint-modal-submit.weekly-submit:hover {
    background: linear-gradient(135deg, #ffd040, #ffb200);
    box-shadow: 0 6px 22px rgba(251,188,5,0.45);
  }

  .sprint-delete-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.75rem;
    border-radius: 30px;
    border: 1.5px solid rgba(239,68,68,0.4);
    background: rgba(239,68,68,0.08);
    color: #f87171;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .sprint-delete-btn:hover {
    background: rgba(239,68,68,0.18);
    border-color: rgba(239,68,68,0.75);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(239,68,68,0.2);
  }

  .sprint-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    gap: 0.75rem;
    text-align: center;
  }
  .sprint-empty-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }
  .sprint-empty-icon.daily-icon {
    background: linear-gradient(135deg, rgba(66,133,244,0.15), rgba(52,168,235,0.08));
    border: 1.5px solid rgba(66,133,244,0.25);
  }
  .sprint-empty-icon.weekly-icon {
    background: linear-gradient(135deg, rgba(251,188,5,0.15), rgba(255,159,0,0.08));
    border: 1.5px solid rgba(251,188,5,0.25);
  }
`;

export default function CodingSprintSection({ xp, earnXP }) {
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);

  // Daily Questions State
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionLink, setQuestionLink] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);

  // Weekly Assessment State
  const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentLink, setAssessmentLink] = useState("");
  const [assessmentDifficulty, setAssessmentDifficulty] = useState("medium");
  const [assessments, setAssessments] = useState([]);
  const [role, setRole] = useState("");
  const [roleLoaded, setRoleLoaded] = useState(false);

  const isAdmin = role?.trim().toLowerCase() === 'admin';

  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [verifyingIdx, setVerifyingIdx] = useState(null);
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");

  const XP_BY_DIFFICULTY = { easy: 15, medium: 35, hard: 60 };

  const handleVerifyCommit = async (idx, question) => {
    const email = localStorage.getItem("email") || "";
    if (!email) {
      setVerifyError("User email not found. Please log in again.");
      return;
    }
    setVerifyingIdx(idx);
    setVerifyError("");
    setVerifySuccess("");

    try {
      const res = await fetch(`http://localhost:8000/check/commit/github?email=${encodeURIComponent(email)}`, {
        method: "POST"
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.solved === true) {
        const nextIndex = data.last_solved_question !== undefined ? data.last_solved_question : (idx + 1);
        setUnlockedIndex(nextIndex);
        const difficulty = question?.difficulty || "medium";
        const xpEarned = XP_BY_DIFFICULTY[difficulty] ?? 35;
        setVerifySuccess(`Question ${idx + 1} verified! +${xpEarned} XP awarded. Next question unlocked.`);
        if (earnXP) {
          earnXP(xpEarned, `Daily Question ${idx + 1} verified`);
        }
      } else {
        setVerifyError("Verification failed: Solution not found. Please make sure you push your commits to your GitHub repository.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setVerifyError(`Failed to verify commit: ${err.message}`);
    } finally {
      setVerifyingIdx(null);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const email = localStorage.getItem("email") || "";
        const res = await fetch(
          `http://localhost:8000/getrole?email=${encodeURIComponent(email)}`,
          { method: "GET" }
        );
        const data = await res.json();
        console.log("[Role fetched]:", data.role);
        setRole(data.role);
      } catch (err) {
        console.error(err);
      } finally {
        setRoleLoaded(true);
      }
    };

    const fetchAllQuestions = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const [dailyRes, weeklyRes] = await Promise.all([
          fetch(`http://localhost:8000/getdailyques?date=${formattedDate}`),
          fetch(`http://localhost:8000/getweeklyques?date=${formattedDate}`)
        ]);

        if (dailyRes.ok) {
          const dailyData = await dailyRes.json();
          setQuestions(dailyData.data || []);
        } else {
          setQuestions([]);
        }

        if (weeklyRes.ok) {
          const weeklyData = await weeklyRes.json();
          setAssessments(weeklyData.data || []);
        } else {
          setAssessments([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchLastSolved = async () => {
      try {
        const email = localStorage.getItem("email") || "";
        if (!email) return;
        const res = await fetch(
          `http://localhost:8000/get/last/solved/ques?email=${encodeURIComponent(email)}`,
          { method: "GET" }
        );
        if (res.ok) {
          const data = await res.json();
          setUnlockedIndex(data.last_solved_question || 0);
        }
      } catch (err) {
        console.error("Error fetching last solved question:", err);
      }
    };

    fetchRole();
    fetchAllQuestions();
    fetchLastSolved();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionTitle.trim() || !questionLink.trim()) return;

    const payload = {
      title: questionTitle.trim(),
      link: questionLink.trim(),
      difficulty: questionDifficulty
    };

    try {
      const res = await fetch("http://localhost:8000/dailyques", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("Daily Question added:", data);
      setQuestions((prev) => [...prev, { id: Date.now(), ...payload }]);
      setQuestionTitle("");
      setQuestionLink("");
      setQuestionDifficulty("medium");
      setIsDailyModalOpen(false);
    } catch (err) {
      console.error("Error adding daily question:", err);
    }
  };

  const handleAddAssessment = async (e) => {
    e.preventDefault();
    if (!assessmentTitle.trim() || !assessmentLink.trim()) return;

    const payload = {
      title: assessmentTitle.trim(),
      link: assessmentLink.trim(),
      difficulty: assessmentDifficulty
    };

    try {
      const res = await fetch("http://localhost:8000/weeklyques", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("Weekly Question added:", data);
      setAssessments((prev) => [...prev, { id: Date.now(), ...payload }]);
      setAssessmentTitle("");
      setAssessmentLink("");
      setAssessmentDifficulty("medium");
      setIsWeeklyModalOpen(false);
    } catch (err) {
      console.error("Error adding weekly assessment:", err);
    }
  };

  const handleDeleteQuestion = async (title) => {
    try {
      const res = await fetch("http://localhost:8000/dailyques", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.title !== title));
      } else {
        console.error("Failed to delete daily question");
      }
    } catch (err) {
      console.error("Error deleting daily question:", err);
    }
  };

  const handleDeleteAssessment = async (title) => {
    try {
      const res = await fetch("http://localhost:8000/weeklyques", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      if (res.ok) {
        setAssessments((prev) => prev.filter((a) => a.title !== title));
      } else {
        console.error("Failed to delete weekly assessment");
      }
    } catch (err) {
      console.error("Error deleting weekly assessment:", err);
    }
  };

  const LoadingCard = ({ color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '1rem' }}>
      <Loader2 size={34} style={{ animation: 'spin 1s linear infinite', color }} />
      <p style={{ color: 'rgba(148,163,184,0.7)', fontStyle: 'italic', margin: 0, fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
        Fetching today's challenges...
      </p>
    </div>
  );

  const isSectionEmpty = 
    (activeTab === 'weekly' && assessments.length === 0) || 
    (activeTab === 'daily' && questions.length === 0);

  return (
    <section
      id="coding-sprint"
      style={{
        padding: isSectionEmpty ? '0' : '4rem 0',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flex: 1
      }}
    >
      <style>{STYLES}</style>
 


      {/* Decorative glow orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(66,133,244,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(251,188,5,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)'
      }} />

      <div style={{ maxWidth: '1500px', width: '100%', boxSizing: 'border-box', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem',
            background: 'rgba(66,133,244,0.1)',
            border: '1px solid rgba(66,133,244,0.25)',
            borderRadius: '50px',
            marginBottom: '1.25rem'
          }}>
            <Zap size={14} color="#6db3ff" />
            <span style={{ color: '#6db3ff', fontSize: '0.78rem', fontWeight: '700', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Daily &amp; Weekly Challenges
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 0.9rem',
            lineHeight: 1.15
          }}>
            Coding Sprints
          </h2>
          <p style={{
            color: '#f8fafc',
            fontSize: '1.05rem',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.65,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.85)'
          }}>
            Sharpen your logic, write high-performance solutions, and climb the scoreboard.
          </p>

          {/* XP Score Widget */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginTop: '1.25rem',
            padding: '0.55rem 1.35rem',
            borderRadius: '50px',
            background: 'rgba(251,188,5,0.1)',
            border: '1.5px solid rgba(251,188,5,0.35)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(251,188,5,0.12)'
          }}>
            <Star size={15} color="#ffd055" fill="#ffd055" />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Your XP</span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '800',
              fontSize: '1rem',
              color: '#ffd055',
              minWidth: '60px',
              textAlign: 'center',
              transition: 'all 0.4s ease'
            }}>
              {xp === null ? (
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }} />
              ) : (
                `${xp} XP`
              )}
            </span>
          </div>
        </div>

        {/* Tabs Header */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <button
            className={`sprint-tab-btn ${activeTab === 'daily' ? 'active-daily' : ''}`}
            onClick={() => setActiveTab("daily")}
          >
            <Code2 size={15} />
            Daily Sprint
          </button>
          <button
            className={`sprint-tab-btn ${activeTab === 'weekly' ? 'active-weekly' : ''}`}
            onClick={() => setActiveTab("weekly")}
          >
            <Trophy size={15} />
            Weekly Sprint
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ maxWidth: '720px', margin: '0 auto', animation: 'fadeInUp 0.4s ease' }}>

          {/* Daily Sprint Tab */}
          {activeTab === 'daily' && (
            <div>
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#FBBC05',
                    boxShadow: '0 0 10px rgba(251,188,5,0.7)'
                  }} />
                  <h3 style={{
                    color: '#f1f5f9', margin: 0, fontSize: '1.15rem',
                    fontWeight: '700', fontFamily: 'Inter, sans-serif'
                  }}>
                    Today's Questions
                  </h3>
                  {!loading && (
                    <span style={{
                      background: 'rgba(251,188,5,0.12)',
                      border: '1px solid rgba(251,188,5,0.3)',
                      color: '#ffd055',
                      borderRadius: '50px',
                      padding: '0.15rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {questions.length}
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <button className="sprint-add-btn" onClick={() => setIsDailyModalOpen(true)}>
                    <Plus size={15} />
                    Add Question
                  </button>
                )}
              </div>

              {/* Questions Card */}
              <div style={{
                background: 'rgba(8, 14, 28, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '18px',
                padding: '1.5rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.45)'
              }}>
                {verifySuccess && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#4ade80',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    animation: 'fadeInUp 0.3s ease'
                  }}>
                    <CheckCircle size={16} />
                    {verifySuccess}
                  </div>
                )}
                {verifyError && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    animation: 'fadeInUp 0.3s ease'
                  }}>
                    <AlertCircle size={16} />
                    {verifyError}
                  </div>
                )}
                {loading ? (
                  <LoadingCard color="#FBBC05" />
                ) : questions.length === 0 ? (
                  <div className="sprint-empty-state">
                    <div className="sprint-empty-icon daily-icon">
                      <Target size={22} color="rgba(251,188,5,0.7)" />
                    </div>
                    <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>
                      No questions added yet
                    </p>
                    <p style={{ color: 'rgba(148,163,184,0.45)', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.82rem' }}>
                      {isAdmin ? 'Click "Add Question" to post today\'s challenge.' : 'Check back soon for today\'s coding challenge!'}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {questions.map((q, idx) => {
                      const isLocked = idx > unlockedIndex;
                      const isSolved = idx < unlockedIndex;

                      return (
                        <div
                          className={`sprint-question-card${isLocked ? ' locked' : ''}`}
                          key={q.id || q._id || idx}
                          style={isLocked && !isAdmin ? {
                            opacity: 0.45,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            borderColor: 'rgba(255,255,255,0.03)',
                            background: 'rgba(10, 16, 32, 0.4)'
                          } : isLocked && isAdmin ? {
                            opacity: 0.7,
                            borderColor: 'rgba(255,255,255,0.03)',
                            background: 'rgba(10, 16, 32, 0.4)'
                          } : {}}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden', flex: 1 }}>
                            <span style={{
                              minWidth: '28px', height: '28px',
                              borderRadius: '8px',
                              background: isLocked
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                                : isSolved
                                ? 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))'
                                : 'linear-gradient(135deg, rgba(251,188,5,0.2), rgba(255,159,0,0.12))',
                              border: isLocked
                                ? '1px solid rgba(255,255,255,0.1)'
                                : isSolved
                                ? '1px solid rgba(34,197,94,0.4)'
                                : '1px solid rgba(251,188,5,0.3)',
                              color: isLocked ? '#64748b' : isSolved ? '#4ade80' : '#ffd055',
                              fontWeight: '700',
                              fontSize: '0.78rem',
                              fontFamily: 'Inter, sans-serif',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {idx + 1}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden', flex: 1 }}>
                              <span style={{
                                color: isLocked ? '#64748b' : '#ffffff',
                                fontWeight: '700',
                                fontSize: '0.97rem',
                                fontFamily: 'Inter, sans-serif',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {q.title}
                              </span>
                              {q.difficulty && (
                                <span className={`difficulty-badge ${q.difficulty}`}>
                                  {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                            {isLocked ? (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '30px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                color: 'rgba(255, 255, 255, 0.4)',
                                fontSize: '0.82rem',
                                fontWeight: '600',
                                fontFamily: 'Inter, sans-serif'
                              }}>
                                <Lock size={13} />
                                Locked
                              </span>
                            ) : isSolved ? (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '30px',
                                background: 'rgba(34, 197, 94, 0.12)',
                                border: '1.5px solid rgba(34, 197, 94, 0.4)',
                                color: '#4ade80',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                fontFamily: 'Inter, sans-serif'
                              }}>
                                <CheckCircle size={13} />
                                Verified
                              </span>
                            ) : (
                              <>
                                <a
                                  href={q.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="sprint-solve-btn"
                                >
                                  <ExternalLink size={13} />
                                  Solve
                                </a>
                                <button
                                  onClick={() => handleVerifyCommit(idx, q)}
                                  disabled={verifyingIdx !== null}
                                  className="sprint-verify-btn"
                                >
                                  {verifyingIdx === idx ? (
                                    <>
                                      <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                                      Verifying...
                                    </>
                                  ) : (
                                    <>
                                      <Zap size={13} />
                                      Verify Push
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                            {isAdmin && (
                              <button
                                onClick={() => handleDeleteQuestion(q.title)}
                                className="sprint-delete-btn"
                                title="Delete question"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Weekly Sprint Tab */}
          {activeTab === 'weekly' && (
            <div>
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#FBBC05',
                    boxShadow: '0 0 10px rgba(251,188,5,0.7)'
                  }} />
                  <h3 style={{
                    color: '#f1f5f9', margin: 0, fontSize: '1.15rem',
                    fontWeight: '700', fontFamily: 'Inter, sans-serif'
                  }}>
                    Weekly Assessments
                  </h3>
                  {!loading && (
                    <span style={{
                      background: 'rgba(251,188,5,0.12)',
                      border: '1px solid rgba(251,188,5,0.3)',
                      color: '#ffd055',
                      borderRadius: '50px',
                      padding: '0.15rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {assessments.length}
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <button className="sprint-add-btn weekly-add" onClick={() => setIsWeeklyModalOpen(true)}>
                    <Plus size={15} />
                    Add Assessment
                  </button>
                )}
              </div>

              {/* Assessments Card */}
              <div style={{
                background: 'rgba(8, 14, 28, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '18px',
                padding: '1.5rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.45)'
              }}>
                {loading ? (
                  <LoadingCard color="#FBBC05" />
                ) : assessments.length === 0 ? (
                  <div className="sprint-empty-state">
                    <div className="sprint-empty-icon weekly-icon">
                      <Trophy size={22} color="rgba(251,188,5,0.7)" />
                    </div>
                    <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>
                      No assessments this week
                    </p>
                    <p style={{ color: 'rgba(148,163,184,0.45)', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.82rem' }}>
                      {isAdmin ? 'Click "Add Assessment" to post this week\'s challenge.' : 'Weekly assessments will appear here soon!'}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {assessments.map((a, idx) => (
                      <div className="sprint-question-card weekly-card" key={a.id || a._id || idx}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden', flex: 1 }}>
                          <span style={{
                            minWidth: '28px', height: '28px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, rgba(251,188,5,0.2), rgba(255,159,0,0.12))',
                            border: '1px solid rgba(251,188,5,0.3)',
                            color: '#ffd055',
                            fontWeight: '700',
                            fontSize: '0.78rem',
                            fontFamily: 'Inter, sans-serif',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden', flex: 1 }}>
                            <span style={{
                              color: '#ffffff',
                              fontWeight: '700',
                              fontSize: '0.97rem',
                              fontFamily: 'Inter, sans-serif',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {a.title}
                            </span>
                            {a.difficulty && (
                              <span className={`difficulty-badge ${a.difficulty}`}>
                                {a.difficulty.charAt(0).toUpperCase() + a.difficulty.slice(1)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sprint-assess-btn"
                          >
                            <ExternalLink size={13} />
                            Start
                          </a>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteAssessment(a.title)}
                              className="sprint-delete-btn"
                              title="Delete assessment"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal: Add Daily Question */}
      {isDailyModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
          }}
          onClick={() => setIsDailyModalOpen(false)}
        >
          <div
            style={{
              maxWidth: '480px', width: '100%',
              background: 'rgba(10, 16, 32, 0.92)',
              border: '1px solid rgba(66,133,244,0.25)',
              borderRadius: '20px',
              padding: '2.25rem',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              animation: 'fadeInUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDailyModalOpen(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer', padding: '0.4rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <X size={17} />
            </button>

            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Code2 size={18} color="#4285F4" />
                <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: '1.1rem', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>
                  Add Daily Question
                </h3>
              </div>
              <p style={{ color: 'rgba(148,163,184,0.6)', margin: 0, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif' }}>
                This will appear for all members today.
              </p>
            </div>

            <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="question-title" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Question Title
                </label>
                <input
                  id="question-title"
                  type="text"
                  placeholder="e.g. Two Sum, Merge Intervals..."
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  required
                  className="sprint-modal-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="question-link" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Problem Link
                </label>
                <input
                  id="question-link"
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={questionLink}
                  onChange={(e) => setQuestionLink(e.target.value)}
                  required
                  className="sprint-modal-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="question-difficulty" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Difficulty
                </label>
                <select
                  id="question-difficulty"
                  value={questionDifficulty}
                  onChange={(e) => setQuestionDifficulty(e.target.value)}
                  className="sprint-difficulty-select"
                >
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="button" onClick={() => setIsDailyModalOpen(false)} className="sprint-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="sprint-modal-submit">
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Weekly Assessment */}
      {isWeeklyModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
          }}
          onClick={() => setIsWeeklyModalOpen(false)}
        >
          <div
            style={{
              maxWidth: '480px', width: '100%',
              background: 'rgba(10, 16, 32, 0.92)',
              border: '1px solid rgba(251,188,5,0.2)',
              borderRadius: '20px',
              padding: '2.25rem',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              animation: 'fadeInUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWeeklyModalOpen(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer', padding: '0.4rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <X size={17} />
            </button>

            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Trophy size={18} color="#FBBC05" />
                <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: '1.1rem', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>
                  Add Weekly Assessment
                </h3>
              </div>
              <p style={{ color: 'rgba(148,163,184,0.6)', margin: 0, fontSize: '0.83rem', fontFamily: 'Inter, sans-serif' }}>
                This will appear for all members this week.
              </p>
            </div>

            <form onSubmit={handleAddAssessment} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="assessment-title" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Assessment Title
                </label>
                <input
                  id="assessment-title"
                  type="text"
                  placeholder="e.g. Week 3 — DSA Mock Test..."
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  required
                  className="sprint-modal-input weekly-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="assessment-link" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Assessment Link
                </label>
                <input
                  id="assessment-link"
                  type="url"
                  placeholder="https://..."
                  value={assessmentLink}
                  onChange={(e) => setAssessmentLink(e.target.value)}
                  required
                  className="sprint-modal-input weekly-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <label htmlFor="assessment-difficulty" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Difficulty
                </label>
                <select
                  id="assessment-difficulty"
                  value={assessmentDifficulty}
                  onChange={(e) => setAssessmentDifficulty(e.target.value)}
                  className="sprint-difficulty-select weekly-select"
                >
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="button" onClick={() => setIsWeeklyModalOpen(false)} className="sprint-modal-cancel">
                  Cancel
                </button>
                <button type="submit" className="sprint-modal-submit weekly-submit">
                  Add Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}