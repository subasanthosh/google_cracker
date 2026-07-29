import React, { useEffect, useState } from 'react';
import { Code2, Trophy, Plus, X, Loader2, ExternalLink, Zap, Target } from 'lucide-react';
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
    border: 1.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.55);
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
    color: rgba(255,255,255,0.9);
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    transform: translateY(-1px);
  }
  .sprint-tab-btn.active-daily {
    background: linear-gradient(135deg, rgba(66,133,244,0.25) 0%, rgba(52,168,235,0.15) 100%);
    border-color: rgba(66,133,244,0.6);
    color: #6db3ff;
    animation: pulse-glow 2.5s ease-in-out infinite;
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
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    transition: all 0.3s ease;
    animation: slideIn 0.35s ease forwards;
    backdrop-filter: blur(8px);
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
    background: linear-gradient(180deg, #4285F4, #34a8eb);
    opacity: 0.8;
  }
  .sprint-question-card.weekly-card::before {
    background: linear-gradient(180deg, #FBBC05, #ff9f00);
  }
  .sprint-question-card:hover {
    background: rgba(20, 30, 55, 0.7);
    border-color: rgba(255,255,255,0.13);
    transform: translateX(4px);
  }

  .sprint-solve-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.1rem;
    border-radius: 30px;
    border: 1.5px solid rgba(66,133,244,0.5);
    background: linear-gradient(135deg, rgba(66,133,244,0.15), rgba(52,168,235,0.08));
    color: #6db3ff;
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
    background: linear-gradient(135deg, rgba(66,133,244,0.35), rgba(52,168,235,0.2));
    border-color: rgba(66,133,244,0.8);
    color: #a8d0ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(66,133,244,0.25);
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
    color: #ffe38a;
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(251,188,5,0.22);
  }

  .sprint-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 1.3rem;
    border-radius: 30px;
    border: 1.5px solid rgba(66,133,244,0.5);
    background: linear-gradient(135deg, rgba(66,133,244,0.2), rgba(52,168,235,0.1));
    color: #6db3ff;
    font-size: 0.88rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .sprint-add-btn:hover {
    background: linear-gradient(135deg, rgba(66,133,244,0.35), rgba(52,168,235,0.2));
    border-color: rgba(66,133,244,0.85);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(66,133,244,0.3);
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

export default function CodingSprintSection() {
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);

  // Daily Questions State
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionLink, setQuestionLink] = useState("");
  const [questions, setQuestions] = useState([]);

  // Weekly Assessment State
  const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentLink, setAssessmentLink] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [role, setRole] = useState("");

  const isAdmin = role?.toLowerCase() === 'admin';

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const email = localStorage.getItem("email") || "";
        const res = await fetch(
          `http://localhost:8000/getrole?email=${encodeURIComponent(email)}`,
          { method: "GET" }
        );
        const data = await res.json();
        setRole(data.role);
      } catch (err) {
        console.error(err);
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

    fetchRole();
    fetchAllQuestions();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionTitle.trim() || !questionLink.trim()) return;

    const payload = {
      title: questionTitle.trim(),
      link: questionLink.trim()
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
      link: assessmentLink.trim()
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
      setIsWeeklyModalOpen(false);
    } catch (err) {
      console.error("Error adding weekly assessment:", err);
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

  return (
    <section
      id="coding-sprint"
      style={{
        backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.55), rgba(3, 5, 9, 0.75)), url(${bgImage3})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        padding: '7rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

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
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.05rem',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.65
          }}>
            Sharpen your logic, write high-performance solutions, and climb the scoreboard.
          </p>
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
                    background: '#4285F4',
                    boxShadow: '0 0 10px rgba(66,133,244,0.7)'
                  }} />
                  <h3 style={{
                    color: '#f1f5f9', margin: 0, fontSize: '1.15rem',
                    fontWeight: '700', fontFamily: 'Inter, sans-serif'
                  }}>
                    Today's Questions
                  </h3>
                  {!loading && (
                    <span style={{
                      background: 'rgba(66,133,244,0.15)',
                      border: '1px solid rgba(66,133,244,0.3)',
                      color: '#6db3ff',
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
                background: 'rgba(8, 14, 28, 0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '18px',
                padding: '1.5rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
              }}>
                {loading ? (
                  <LoadingCard color="#4285F4" />
                ) : questions.length === 0 ? (
                  <div className="sprint-empty-state">
                    <div className="sprint-empty-icon daily-icon">
                      <Target size={22} color="rgba(66,133,244,0.7)" />
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
                    {questions.map((q, idx) => (
                      <div className="sprint-question-card" key={q.id || q._id || idx}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden', flex: 1 }}>
                          <span style={{
                            minWidth: '28px', height: '28px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, rgba(66,133,244,0.25), rgba(52,168,235,0.15))',
                            border: '1px solid rgba(66,133,244,0.3)',
                            color: '#6db3ff',
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
                          <span style={{
                            color: '#e2e8f0',
                            fontWeight: '600',
                            fontSize: '0.97rem',
                            fontFamily: 'Inter, sans-serif',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {q.title}
                          </span>
                        </div>
                        <a
                          href={q.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sprint-solve-btn"
                        >
                          <ExternalLink size={13} />
                          Solve
                        </a>
                      </div>
                    ))}
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
                background: 'rgba(8, 14, 28, 0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '18px',
                padding: '1.5rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
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
                          <span style={{
                            color: '#e2e8f0',
                            fontWeight: '600',
                            fontSize: '0.97rem',
                            fontFamily: 'Inter, sans-serif',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {a.title}
                          </span>
                        </div>
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sprint-assess-btn"
                        >
                          <ExternalLink size={13} />
                          Start
                        </a>
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
