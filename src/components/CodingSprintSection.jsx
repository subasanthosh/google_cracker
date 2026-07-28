import React, { useEffect, useState } from 'react';
import { Code2, Trophy, Plus, X } from 'lucide-react';
import bgImage3 from '../assets/google_workspace_bright.png';

export default function CodingSprintSection() {
  const [activeTab, setActiveTab] = useState("daily");
  
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
  const [role,setRole] = useState("");
  useEffect(() => {
  const fetchRole = async () => {
    try {
      const email = localStorage.getItem("email") || "";
      console.log(email)
      const res = await fetch(
        `http://localhost:8000/getrole?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      console.log(data.role)
      setRole(data.role);
    } catch (err) {
      console.error(err);
    }
  };

  fetchRole();
}, []);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionTitle.trim() || !questionLink.trim()) return;

    const newQuestion = {
      id: Date.now(),
      title: questionTitle.trim(),
      link: questionLink.trim()
    };

    setQuestions([...questions, newQuestion]);
    setQuestionTitle("");
    setQuestionLink("");
    setIsDailyModalOpen(false);
  };

  const handleAddAssessment = (e) => {
    e.preventDefault();
    if (!assessmentTitle.trim() || !assessmentLink.trim()) return;

    const newAssessment = {
      id: Date.now(),
      title: assessmentTitle.trim(),
      link: assessmentLink.trim()
    };

    setAssessments([...assessments, newAssessment]);
    setAssessmentTitle("");
    setAssessmentLink("");
    setIsWeeklyModalOpen(false);
  };

  return (
    <section className="coding-sprint-section" id="coding-sprint" style={{ backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.45), rgba(3, 5, 9, 0.60)), url(${bgImage3})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', padding: '6rem 0' }}>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Coding Sprints</h2>
          <p className="section-subtitle" style={{ color: '#ffffff' }}>Sharpen your logic, write high-performance solutions, and climb the scoreboard.</p>
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
          {activeTab === 'daily' && (
            <div className="tab-content active" id="tab-daily">
              <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Header with ADD QUESTIONS Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>Daily Questions</h3>
                  { role === 'admin' && <button
                    className="btn btn-primary"
                    onClick={() => setIsDailyModalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={18} /> ADD QUESTIONS
                  </button>}
                </div>

                {/* Added Questions Display List */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                  {questions.length === 0 ? (
                    <p className="text-muted" style={{ fontStyle: 'italic', textAlign: 'center', margin: 0 }}>No questions added yet. Click "ADD QUESTIONS" to add your first question.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {questions.map((q, idx) => (
                        <div
                          key={q.id}
                          style={{
                            padding: '1rem 1.25rem',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span style={{ color: '#4285F4', fontWeight: 'bold', marginRight: '0.5rem' }}>#{idx + 1}</span>
                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>{q.title}</span>
                          </div>
                          <a
                            href={q.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              padding: '0.4rem 1rem',
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              textDecoration: 'none'
                            }}
                          >
                            Solve Problem
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Weekly Sprint */}
          {activeTab === 'weekly' && (
            <div className="tab-content active" id="tab-weekly">
              <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Header with ADD ASSESSMENT Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>Weekly Assessments</h3>
                  { role === 'admin' && <button
                    className="btn btn-primary"
                    onClick={() => setIsWeeklyModalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={18} /> ADD ASSESSMENT
                  </button>}
                </div>

                {/* Added Assessments Display List */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                  {assessments.length === 0 ? (
                    <p className="text-muted" style={{ fontStyle: 'italic', textAlign: 'center', margin: 0 }}>No assessments added yet. Click "ADD ASSESSMENT" to add your first assessment.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {assessments.map((a, idx) => (
                        <div
                          key={a.id}
                          style={{
                            padding: '1rem 1.25rem',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span style={{ color: '#FBBC05', fontWeight: 'bold', marginRight: '0.5rem' }}>#{idx + 1}</span>
                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>{a.title}</span>
                          </div>
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              padding: '0.4rem 1rem',
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              textDecoration: 'none'
                            }}
                          >
                            Start Assessment
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal Overlay for Adding Daily Question */}
      {isDailyModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setIsDailyModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDailyModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

           { role==='admin' && <h3 style={{ marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>ADD QUESTION</h3>}

            <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="question-title" style={{ color: '#fff', fontWeight: '600' }}>Title</label>
                <input
                  id="question-title"
                  type="text"
                  placeholder="Enter question title"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="question-link" style={{ color: '#fff', fontWeight: '600' }}>Link</label>
                <input
                  id="question-link"
                  type="url"
                  placeholder="Enter question link"
                  value={questionLink}
                  onChange={(e) => setQuestionLink(e.target.value)}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsDailyModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'transparent',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Overlay for Adding Weekly Assessment */}
      {isWeeklyModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setIsWeeklyModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWeeklyModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>ADD ASSESSMENT</h3>

            <form onSubmit={handleAddAssessment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="assessment-title" style={{ color: '#fff', fontWeight: '600' }}>Title</label>
                <input
                  id="assessment-title"
                  type="text"
                  placeholder="Enter assessment title"
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="assessment-link" style={{ color: '#fff', fontWeight: '600' }}>Link</label>
                <input
                  id="assessment-link"
                  type="url"
                  placeholder="Enter assessment link"
                  value={assessmentLink}
                  onChange={(e) => setAssessmentLink(e.target.value)}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsWeeklyModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'transparent',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
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
