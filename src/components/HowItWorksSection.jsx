import React from 'react';
import { Code, Award, Users, Check, Zap, Shield, Target, Terminal, Calendar, Activity, Trophy, ArrowRight } from 'lucide-react';

export default function HowItWorksSection({ setCurrentPage }) {
  return (
    <section className="how-it-works-section" id="how-it-works" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Sticky Slide Navigation Bar */}
        <div style={{ 
          position: 'sticky', 
          top: '70px', 
          zIndex: 100, 
          background: 'rgba(10, 15, 29, 0.95)', 
          backdropFilter: 'blur(16px)', 
          padding: '1rem 1.5rem', 
          borderRadius: '12px',
          border: '1px solid rgba(0, 240, 255, 0.15)', 
          marginBottom: '3rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-neon-green)', animation: 'pulse 1.5s infinite' }}></span>
              COHORT_CURRICULUM_MANUAL.md
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { name: "1. Launch", id: "slide-1" },
                { name: "2. How it Works", id: "slide-2" },
                { name: "3. 5+1+1 System", id: "slide-3" },
                { name: "4. Coding Sprint", id: "slide-4" },
                { name: "5. Build Sprint", id: "slide-5" },
                { name: "6. Buddy Network", id: "slide-6" },
                { name: "7. XP System", id: "slide-7" },
                { name: "8. Daily Specs", id: "slide-8" },
                { name: "9. Cycle", id: "slide-9" }
              ].map((slide, idx) => (
                <a 
                  key={idx} 
                  href={`#${slide.id}`}
                  className="mono-font"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    background: 'rgba(0, 240, 255, 0.03)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'var(--color-electric-blue)';
                    e.target.style.color = '#fff';
                    e.target.style.background = 'rgba(0, 240, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                    e.target.style.color = 'var(--text-muted)';
                    e.target.style.background = 'rgba(0, 240, 255, 0.03)';
                  }}
                >
                  {slide.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 1: LAUNCHING
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-1">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 01 / 09 : COHORT LAUNCH</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>INITIALIZATION</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h1 className="mono-font" style={{ fontSize: '2.5rem', color: '#fff', textShadow: 'var(--glow-text)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                LAUNCHING: The 13-Month Velocity Cohort
              </h1>
              <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                From baseline programmer to industry-ready software engineer. A peer-driven, high-accountability accelerator that replaces passive learning with daily practice, real-world projects, and cohort momentum. We learn, build, compete, document, and ship—together.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="badge-outline" style={{ color: 'var(--color-neon-green)', borderColor: 'var(--color-neon-green)' }}>★ High Agency</span>
                <span className="badge-outline" style={{ color: 'var(--color-electric-blue)', borderColor: 'var(--color-electric-blue)' }}>★ Compiler Checked</span>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="mono-font" style={{ fontSize: '0.9rem', color: 'var(--color-electric-blue)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>// COHORT_STATS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Duration:</span>
                <span className="mono-font" style={{ color: '#fff' }}>13 Months</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Target level:</span>
                <span className="mono-font" style={{ color: '#fff' }}>Industry Ready</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Focus:</span>
                <span className="mono-font" style={{ color: '#fff' }}>Coding & Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 2: HOW THE COHORT WORKS (CRACKING GOOGLE ALIGNMENT)
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 02 / 09 : SYSTEM PHILOSOPHY</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,0,85,0.1)', border: '1px solid var(--color-crimson)', padding: '0.25rem 0.8rem', borderRadius: '4px' }}>
              <Target size={14} style={{ color: 'var(--color-crimson)' }} />
              <span className="mono-font" style={{ fontSize: '0.75rem', color: 'var(--color-crimson)', fontWeight: 'bold' }}>GOOGLE_SWE_CRACK_BLUEPRINT</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2.2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                How the Cohort Works
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                This high-intensity cohort is designed specifically for developers aiming to **crack Google's technical loops**. Google doesn't test rote memorization; they evaluate coding speed under pressure, algorithmic depth, structural clarity, and system design maturity. Every aspect of this system is structured to replicate that evaluation process.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderLeft: '3px solid var(--color-electric-blue)', paddingLeft: '1.2rem' }}>
                  <h4 className="mono-font" style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.4rem' }}>Daily Proof of Work (PoW)</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    1.5 hours of Anchor Time every day. Share progress in #proof-of-work: GitHub commits, LeetCode runs, project updates, learning notes. **Why it cracks Google:** Replicates Google's whiteboard interview pressure by demanding clean, compilation-ready solutions in fixed daily intervals.
                  </p>
                </div>
                
                <div style={{ borderLeft: '3px solid var(--color-neon-green)', paddingLeft: '1.2rem' }}>
                  <h4 className="mono-font" style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.4rem' }}>Consistency Over Perfection</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    No excuses—small, measurable traction compounds. The community rewards consistency and visible progress. **Why it cracks Google:** Cracking Google is a marathon of consistency. Accumulating 13 months of daily engineering discipline builds the elite muscle memory needed for advanced DSA loops.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Google Evaluation Terminal */}
            <div className="glass-card" style={{ padding: '2rem', background: '#05070e', border: '1px solid rgba(0, 240, 255, 0.15)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-crimson)' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold)' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-neon-green)' }}></span>
                <span className="mono-font" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '6px' }}>google_eval_metrics.sh</span>
              </div>
              <div className="mono-font" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                <div style={{ color: 'var(--text-muted)' }}>$ ./run_assessment.sh --eval=YOU</div>
                <div style={{ color: 'var(--color-electric-blue)', marginTop: '0.5rem' }}>[+] Target: Google SWE L4/L5</div>
                <div style={{ color: 'var(--text-primary)', marginTop: '0.5rem' }}>[+] Checking Evaluation Criteria:</div>
                <div style={{ paddingLeft: '1rem', color: 'var(--text-muted)' }}>
                  - Whiteboard Speed: <span style={{ color: 'var(--color-neon-green)' }}>PASS (1.5h Anchor)</span><br/>
                  - DSA Pattern Depth: <span style={{ color: 'var(--color-neon-green)' }}>PASS (5+1+1 System)</span><br/>
                  - System Design: <span style={{ color: 'var(--color-neon-green)' }}>PASS (Build Sprints)</span><br/>
                  - Pair Reviewing: <span style={{ color: 'var(--color-neon-green)' }}>PASS (Buddy Network)</span>
                </div>
                <div style={{ color: 'var(--color-cyber-purple)', marginTop: '0.8rem', fontWeight: 'bold' }}>&gt; GOOGLE CRACK INDEX: ELITE 98.4%</div>
                <div style={{ animation: 'blink 1.2s infinite', background: 'var(--color-neon-green)', width: '6px', height: '12px', display: 'inline-block', marginTop: '0.5rem' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 3: THE 5+1+1 WEEKLY SYSTEM
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 03 / 09 : WEEKLY CADENCE</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(0, 240, 255, 0.25)', color: 'var(--color-electric-blue)' }}>STRUCTURE THAT LASTS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            {/* Left Column: Interactive Cadence Graphic */}
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="mono-font" style={{ fontSize: '0.9rem', color: 'var(--color-electric-blue)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>// WEEKLY_CADENCE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="mono-font" style={{ fontSize: '1.5rem', color: '#fff', width: '80px', fontWeight: 'bold' }}>5 DAYS</span>
                <div style={{ height: '2px', flex: 1, background: 'var(--color-electric-blue)' }}></div>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>MON - FRI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="mono-font" style={{ fontSize: '1.5rem', color: 'var(--color-cyber-purple)', width: '80px', fontWeight: 'bold' }}>1 DAY</span>
                <div style={{ height: '2px', flex: 1, background: 'var(--color-cyber-purple)' }}></div>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>SATURDAY</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="mono-font" style={{ fontSize: '1.5rem', color: 'var(--color-neon-green)', width: '80px', fontWeight: 'bold' }}>1 DAY</span>
                <div style={{ height: '2px', flex: 1, background: 'var(--color-neon-green)' }}></div>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>SUNDAY</span>
              </div>
            </div>
            
            {/* Right Column: Descriptions */}
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem' }}>The 5+1+1 Weekly System</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: 0 }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Check className="task-done" size={20} style={{ color: 'var(--color-electric-blue)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>5 days:</strong> structured learning, pattern-based DSA, project work, GitHub contributions.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Check className="task-done" size={20} style={{ color: 'var(--color-cyber-purple)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>1 day:</strong> catch-up, reflection, revision.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Check className="task-done" size={20} style={{ color: 'var(--color-neon-green)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>1 day:</strong> full rest—recover and recharge.
                  </div>
                </li>
              </ul>
              
              {/* Flexible Streak Protector */}
              <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.15)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Shield style={{ color: 'var(--color-electric-blue)' }} size={24} />
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  <strong>3 Exam Passes per month</strong> let students pause streaks for unavoidable academic conflicts—designed to be realistic for university schedules.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 4: WEEKLY CODING SPRINT
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 04 / 09 : ALGORITHMIC SPRINTS</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>WEEKEND CHALLENGES</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                Weekly Coding Sprint
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Weekend challenges focus on the week's concept set (Arrays, Sliding Window, Graphs, DP, Trees). After each sprint: top performers present, optimizations are discussed, and alternative approaches are reviewed—because teaching is the highest form of learning.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono-font" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-electric-blue)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>1</span>
                  <span style={{ color: 'var(--text-primary)' }}><strong>Practice:</strong> Timed problems aligned to learning goals.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono-font" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-electric-blue)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>2</span>
                  <span style={{ color: 'var(--text-primary)' }}><strong>Review:</strong> Post-contest walkthroughs and code reviews.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono-font" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-electric-blue)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>3</span>
                  <span style={{ color: 'var(--text-primary)' }}><strong>Contest & Meet:</strong> We attend LeetCode contests weekly. Top performers teach approaches to other students.</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-cyber-purple)' }}>// RUNNING_CONTESTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                  <span>Array Sprints</span>
                  <span style={{ color: 'var(--color-neon-green)' }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                  <span>Sliding Window</span>
                  <span style={{ color: 'var(--color-neon-green)' }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                  <span>Graph & DP</span>
                  <span style={{ color: 'var(--color-neon-green)' }}>Locked</span>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('sprint')} 
                className="btn btn-outline btn-sm" 
                style={{ marginTop: '0.5rem' }}
              >
                Access Coding Sprints
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 5: BUILD SPRINT
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 05 / 09 : PRODUCTION PROJECTS</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>BUILD SPRINTS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem' }}>
                Build Sprint
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Every member can also form their teams to build production-grade applications and attend hackathons. The goal: real products users can try—complete with deployments, monitoring, and user feedback.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <h4 className="mono-font" style={{ color: '#fff', fontSize: '1.1', marginBottom: '0.5rem' }}>Team Work</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Form teams among the community if needed, interact, and build networks with people to improve communications.
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <h4 className="mono-font" style={{ color: '#fff', fontSize: '1.1', marginBottom: '0.5rem' }}>Better Mindset</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Have like-minded people around you to stay constantly motivated and driven toward elite technical standards.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1rem', justifySelf: 'stretch' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>// RECENT_SHIPPED</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-neon-green)' }}></span>
                  <span style={{ color: '#fff' }}>Distributed DB Cache</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-neon-green)' }}></span>
                  <span style={{ color: '#fff' }}>V8 JIT Engine Mock</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-neon-green)' }}></span>
                  <span style={{ color: '#fff' }}>Load Balancer Module</span>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('build-sprint')} 
                className="btn btn-primary btn-sm" 
                style={{ marginTop: '0.5rem' }}
              >
                Explore Shipped Apps
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 6: THE BUDDY SYSTEM
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 06 / 09 : SOCIAL ACCOUNTABILITY</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(0, 240, 255, 0.25)', color: 'var(--color-electric-blue)' }}>BUDDY ACCOUNTABILITY</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                The Buddy System
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Bi-weekly pairing rotates your accountability partner. Partners do daily check-ins, code reviews, pair programming, and weekly goal tracking to keep momentum steady—because progress sticks when it’s social and accountable.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Users size={18} style={{ color: 'var(--color-electric-blue)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 className="mono-font" style={{ color: '#fff', marginBottom: '0.2rem' }}>Daily Check-ins</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Short syncs to surface blockers and wins.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Check className="task-done" size={18} style={{ color: 'var(--color-neon-green)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 className="mono-font" style={{ color: '#fff', marginBottom: '0.2rem' }}>Code Reviews</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Practical feedback and style alignment.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Code size={18} style={{ color: 'var(--color-cyber-purple)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 className="mono-font" style={{ color: '#fff', marginBottom: '0.2rem' }}>Pair Programming</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Shared problem-solving, faster learning.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1rem', justifySelf: 'stretch' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>// BUDDY_MATCH</div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-cyber-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AR</div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>Alex Rivera</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>18 Days Streak</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('buddy-system')} 
                className="btn btn-secondary btn-sm" 
                style={{ marginTop: '0.5rem' }}
              >
                Join Pair Lobby
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 7: THE VELOCITY XP SYSTEM
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-7">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 07 / 09 : GAMIFICATION</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>XP LEDGER</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                The Velocity XP System
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                Earn XP for work that matters. Daily streaks, badges, personal dashboards, weekly leaderboards, and monthly champions keep engagement high and learning measurable.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'rgba(255,255,255,0.01)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ borderLeft: '2px solid var(--color-electric-blue)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '1.2rem', fontWeight: 'bold' }}>+10 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Daily Check-in</span>
                </div>
                <div style={{ borderLeft: '2px solid var(--color-electric-blue)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '1.2rem', fontWeight: 'bold' }}>+15 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>LeetCode Easy</span>
                </div>
                <div style={{ borderLeft: '2px solid var(--color-neon-green)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-neon-green)', fontSize: '1.2rem', fontWeight: 'bold' }}>+20 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>GitHub Commit</span>
                </div>
                <div style={{ borderLeft: '2px solid var(--color-neon-green)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-neon-green)', fontSize: '1.2rem', fontWeight: 'bold' }}>+35 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>LeetCode Medium</span>
                </div>
                <div style={{ borderLeft: '2px solid var(--color-cyber-purple)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-cyber-purple)', fontSize: '1.2rem', fontWeight: 'bold' }}>+60 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>LeetCode Hard</span>
                </div>
                <div style={{ borderLeft: '2px solid var(--color-cyber-purple)', paddingLeft: '1rem' }}>
                  <span className="mono-font" style={{ color: 'var(--color-cyber-purple)', fontSize: '1.2rem', fontWeight: 'bold' }}>+100 XP</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Project Milestone</span>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
                * XP structure encourages consistent small wins and rewards meaningful project progress.
              </p>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1rem', justifySelf: 'stretch' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>// LEADERBOARD</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span>1. Marcus Aurelius</span>
                  <span className="mono-font" style={{ color: '#fff' }}>2,150 XP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span>2. Elena Rostova</span>
                  <span className="mono-font" style={{ color: '#fff' }}>1,850 XP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span>3. Samuel Vance</span>
                  <span className="mono-font" style={{ color: '#fff' }}>1,220 XP</span>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('xp-system')} 
                className="btn btn-secondary btn-sm" 
                style={{ marginTop: '0.5rem' }}
              >
                Access XP Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 8: EVERY DAY INCLUDES
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '4rem', padding: '3rem' }} id="slide-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 08 / 09 : EVERY DAY SPECIFICATION</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(0, 240, 255, 0.25)', color: 'var(--color-electric-blue)' }}>24-HOUR BLOCKS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                Every Day Includes
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Every day in the cohort is calibrated to lock you into a flow state. We combine concepts, problem solving, compilation targets, and peer feedbacks in a single loop.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--color-electric-blue)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[01]</span>
                  <span><strong style={{ color: '#fff' }}>Concept Learning:</strong> Learn the topic of the day through curated resources and explanations.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--color-electric-blue)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[02]</span>
                  <span><strong style={{ color: '#fff' }}>Problem Solving:</strong> Solve carefully selected coding problems that reinforce the day's concepts.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--color-electric-blue)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[03]</span>
                  <span><strong style={{ color: '#fff' }}>Project Development:</strong> Apply the concepts immediately by implementing features in real-world projects.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--color-neon-green)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[04]</span>
                  <span><strong style={{ color: '#fff' }}>GitHub Contribution:</strong> Push commits to maintain consistency and build a strong history.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--color-neon-green)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[05]</span>
                  <span><strong style={{ color: '#fff' }}>Daily Reflection:</strong> Share progress, blockers, and next steps to stay accountable.</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '1rem', justifySelf: 'stretch', alignSelf: 'center' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)' }}>// REPLICATING_THE_DESK</div>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                This curriculum combines algorithmic deep-dives, compilation sandboxes, team builds, buddy pairings, and XP progression. It's the absolute fastest loop to transition from baseline programmer to tech industry leader.
              </p>
              <button 
                onClick={() => setCurrentPage('daily-cycle')} 
                className="btn btn-secondary btn-sm"
              >
                Inspect Cycle Details
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            SLIDE 9: OUR WEEKLY RHYTHM & DAILY CYCLE
           ======================================================== */}
        <div className="slide-card glass-card border-glow-blue" style={{ marginBottom: '2rem', padding: '3rem' }} id="slide-9">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span className="mono-font" style={{ color: 'var(--color-electric-blue)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>PAGE 09 / 09 : COHORT CALENDAR</span>
            <span className="badge-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>WEEKLY RHYTHM</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive-layout">
            <div>
              <h2 className="mono-font" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.2rem', textShadow: 'var(--glow-text)' }}>
                Our Weekly Rhythm & Daily Cycle
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Our structured approach ensures continuous engagement and tangible progress throughout the 13-month cohort. Each day builds on the last, fostering deep understanding and practical application.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                <div>
                  <strong style={{ color: '#fff' }}>Monday – Friday Weekly Breakdown:</strong><br />
                  <span className="text-muted">Daily roadmap execution, problem-solving, project development, GitHub commits, and community check-ins.</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--color-cyber-purple)' }}>Saturday:</strong><br />
                  <span className="text-muted">Weekly coding sprint, revision, catch-up, planning, solution discussions, code reviews, and project showcases.</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--color-neon-green)' }}>Sunday:</strong><br />
                  <span className="text-muted">Complete rest for rejuvenation.</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--color-electric-blue)', background: 'rgba(0, 240, 255, 0.02)', display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'stretch' }}>
              <div className="mono-font" style={{ fontSize: '0.85rem', color: 'var(--color-electric-blue)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>// THE_VELOCITY_CYCLE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>1. LEARN</span>
                  <span style={{ color: 'var(--color-electric-blue)' }}>Concept Learning</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>2. SOLVE</span>
                  <span style={{ color: 'var(--color-electric-blue)' }}>Problem Solving</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>3. BUILD</span>
                  <span style={{ color: 'var(--color-electric-blue)' }}>Project Dev</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>4. COMMIT</span>
                  <span style={{ color: 'var(--color-electric-blue)' }}>Push Commits</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                <span className="badge-outline" style={{ color: 'var(--color-neon-green)', borderColor: 'var(--color-neon-green)' }}>LOOP EQUILIBRIUM ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
