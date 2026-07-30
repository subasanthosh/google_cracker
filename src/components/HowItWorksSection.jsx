import React from 'react';
import { BookOpen, CheckCircle, Flame, Trophy, Users, Code, Activity, Target, Zap } from 'lucide-react';
import googleBrightLobby from '../assets/google_bright_lobby.png';
import googleBrightExterior from '../assets/google_bright_exterior.png';
import googleBrightInterior from '../assets/google_bright_interior.png';

export default function HowItWorksSection() {
  return (
    <section className="how-it-works-section" id="how-it-works" style={{ padding: 0 }}>
      {/* Hero Section */}
      <div 
        className="google-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '85vh',
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(0, 240, 255, 0.2)'
        }}
      >
        {/* Absolute Background Photo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.12), rgba(3, 5, 9, 0.25)), url(${googleBrightExterior})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />

        {/* Absolute Glass Overlay covering full hero area */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 13, 26, 0.38)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 1
        }} />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          .tech-font {
            font-family: 'Space Grotesk', sans-serif !important;
          }
          .tech-font h2, 
          .tech-font p, 
          .tech-font blockquote, 
          .tech-font strong,
          .tech-font span {
            font-family: 'Space Grotesk', sans-serif !important;
          }
        `}</style>

        <div className="tech-font" style={{ maxWidth: '1100px', width: '92%', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Quote Header */}
          <span style={{ display: 'block', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.08em', color: '#FBBC05', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            💬 Quote of the Journey
          </span>
          
          {/* Quote Text */}
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            fontStyle: 'italic', 
            color: '#ffffff', 
            lineHeight: '1.4', 
            marginBottom: '1rem',
            padding: '0 1rem'
          }}>
            "Success at Google is not built in one day. It is built by showing up every single day for 13 months."
          </h1>

          {/* Separation Line */}
          <div style={{ height: '2px', width: '50px', background: '#FBBC05', margin: '0 auto 1.2rem auto' }}></div>

          {/* Main Content */}
          <h2 style={{ color: '#ffffff', marginBottom: '0.35rem', fontSize: '1.35rem', fontWeight: 800 }}>
            First of all
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.6rem', color: '#ffffff' }}>
            Thank you for joining the Google Velocity Cohort ❤️
          </p>
          
          <p style={{ marginBottom: '0.25rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>Today isn't just another day.</p>
          <p style={{ marginBottom: '0.25rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>Today is the day you decided to invest in yourself.</p>
          <p style={{ marginBottom: '0.6rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>
            For the next <strong style={{ color: '#FBBC05', fontWeight: '700' }}>13 months</strong>, your mission is simple:
          </p>
          
          <blockquote style={{ 
            borderLeft: '4px solid #FBBC05', 
            margin: '0.6rem auto', 
            maxWidth: '900px',
            width: '85%',
            fontSize: '1.15rem', 
            fontStyle: 'italic', 
            background: 'rgba(251, 188, 5, 0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '0 6px 6px 0', 
            color: '#ffffff',
            fontWeight: '700'
          }}>
            To become capable of cracking the Google Software Engineer interview.
          </blockquote>
          
          <p style={{ marginBottom: '0.25rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>This journey is not for everyone.</p>
          <p style={{ marginBottom: '0.25rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>It is for people who are willing to stay consistent when others quit.</p>
          <p style={{ marginBottom: '0.6rem', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '500' }}>It is for people who choose discipline over excuses.</p>
          
          <p style={{ fontSize: '1rem', color: '#ffffff', fontWeight: '700', lineHeight: '1.4', marginTop: '1rem' }}>
            If you trust the process and give your best every single day, there is absolutely no reason why you cannot become Google-ready by the end of this journey.
          </p>
        </div>
      </div>

      {/* Before You Begin */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem', margin: '0 auto' }}>
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', color: '#fff' }}>📝 Before You Begin</h2>
        </div>
        
        <div className="grid grid-3">
          <div className="glass-card border-glow-blue" style={{ borderTop: '4px solid #4285F4', padding: '2rem' }}>
            <BookOpen size={26} color="#4285F4" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', color: '#fff' }}>Maintain a Learning Notebook</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> New concepts</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Mistakes you made</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Important algorithms</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Interview tricks</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Notes from discussions</li>
            </ul>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>One notebook.<br/>13 months.<br/>Your complete Google interview revision guide.</p>
          </div>
          
          <div className="glass-card border-glow-green" style={{ borderTop: '4px solid #34A853', padding: '2rem' }}>
            <CheckCircle size={26} color="#34A853" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', color: '#fff' }}>Submit Proof of Work</h3>
            <p style={{ marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Every single day you must submit your proof of work. Examples:</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Programming Questions</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> GitHub Commits</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Project Progress</li>
              <li style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Learning Notes</li>
            </ul>
            <p className="text-muted" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>No proof. No XP. No shortcuts.<br/>Consistency is everything.</p>
          </div>
          
          <div className="glass-card border-glow-red" style={{ borderTop: '4px solid #EA4335', padding: '2rem' }}>
            <Flame size={26} color="#EA4335" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', color: '#fff' }}>Never Give Up</h3>
            <p style={{ marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Some days you'll enjoy coding.</p>
            <p style={{ marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Some days you'll hate it.</p>
            <p style={{ marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Some days you'll solve problems in minutes.</p>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Some days you'll spend hours on one bug.</p>
            <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>Don't stop.</p>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Remember...<br/><strong style={{color: '#fff'}}>Google doesn't reward people who never struggled.</strong><br/><strong style={{color: '#fff'}}>Google rewards people who never stopped learning.</strong></p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.20), rgba(3, 5, 9, 0.35)), url(${googleBrightExterior})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 240, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.1)'
        }}
      >
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: 0 }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', color: '#FBBC05' }}>💬 Quote of the Journey</h2>
          <blockquote style={{ fontSize: '1.7rem', lineHeight: '1.4', fontStyle: 'italic', fontWeight: 600, color: '#fff' }}>
            "Success at Google is not built in one day. It is built by showing up every single day for 13 months."
          </blockquote>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem', margin: '0 auto' }}>
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', color: '#fff' }}>🌟 Features of the Google Velocity Cohort</h2>
        </div>
        
        <div className="grid grid-3">
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Trophy size={24} color="#FBBC05" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Live Rank Board</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>See where you stand among hundreds of learners. Compete. Improve. Climb the leaderboard.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Zap size={24} color="#4285F4" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Gamified XP System</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>Everything you do earns XP. Every question solved. Every GitHub commit. Every project milestone. Every bit of consistency counts.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <BookOpen size={24} color="#EA4335" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Exam Pass</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>College exams shouldn't break your momentum. You receive <strong style={{color: '#fff'}}>3 Exam Passes every month</strong> to pause your streak during unavoidable academic commitments.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Users size={24} color="#34A853" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Connect with Google-Minded People</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>Surround yourself with students who share the same dream. Build friendships. Discuss problems. Form project teams. Grow together. The people beside you today could become your teammates tomorrow.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Code size={24} color="#4285F4" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Build an Outstanding GitHub Profile</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>Every day you commit code. Every day your GitHub becomes stronger. By the end of the cohort, you'll have a profile that reflects consistency and real development work.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Target size={24} color="#EA4335" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.25rem' }}>Master LeetCode & Build Projects</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>Every day you'll solve carefully selected coding problems to build problem-solving ability. Alongside DSA, you'll develop real-world applications to strengthen your resume.</p>
          </div>
        </div>
      </div>

      {/* How Journey Works & XP */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.20), rgba(3, 5, 9, 0.35)), url(${googleBrightInterior})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 0'
        }}
      >
        <div className="container" style={{ margin: '0 auto', padding: 0 }}>
          <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: '#fff' }}>📖 How This Journey Works</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              For the next <strong style={{color: '#fff'}}>13 months</strong>, you'll work on <strong style={{color: '#fff'}}>Programming</strong> and <strong style={{color: '#fff'}}>Projects</strong> in parallel.
            </p>
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid #4285F4', padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: '#4285F4', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem' }}>
                <Code size={20} /> Daily Programming
              </h3>
              <p style={{ marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Every day you'll solve:</p>
              <div style={{ background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34A853', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '0.75rem', color: '#34A853', fontWeight: 'bold', fontSize: '0.95rem' }}>
                ✅ 3 Programming Questions
              </div>
              <p style={{ marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>After solving them, you'll submit:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <li>Your code</li>
                <li>Your proof of completion</li>
              </ul>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Our team will verify your submissions. Once verified, XP points will automatically be added to your profile. Small improvements every day create extraordinary results over time.</p>
            </div>
            
            <div className="glass-card" style={{ borderLeft: '4px solid #EA4335', padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem' }}>
                <Target size={20} /> Daily Project Development
              </h3>
              <p className="text-muted" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Alongside DSA, you'll continuously build software projects.</p>
              <p className="text-muted" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Every feature you build makes you a better engineer.</p>
              <p className="text-muted" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Every GitHub commit makes your profile stronger.</p>
              <div style={{ background: 'rgba(234, 67, 53, 0.1)', border: '1px solid #EA4335', padding: '0.75rem 1rem', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '1rem', fontSize: '0.95rem' }}>
                By the end of this cohort, you'll not only know algorithms—you'll know how to build software.
              </div>
            </div>
          </div>
          
          <div className="grid grid-3" style={{ marginBottom: '2.5rem' }}>
             <div className="glass-card text-center" style={{ padding: '2rem' }}>
               <Trophy size={26} color="#FBBC05" style={{ margin: '0 auto 0.75rem' }} />
               <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.2rem' }}>🏆 Weekly Assessments</h3>
               <p className="text-muted" style={{ fontSize: '0.85rem' }}>Every week you'll test yourself through Weekly Coding Assessments, LeetCode Weekly Contests, and Bi-Weekly Assessments. These help measure your growth and prepare you for Google's interview environment.</p>
             </div>
             <div className="glass-card text-center" style={{ padding: '2rem' }}>
               <Activity size={26} color="#4285F4" style={{ margin: '0 auto 0.75rem' }} />
               <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.2rem' }}>🥇 Rank Board</h3>
               <p className="text-muted" style={{ fontSize: '0.85rem' }}>Your assessment scores and XP determine your position on the leaderboard. Don't fear competition. Use it as motivation. The person above you today can inspire you to become the person everyone looks up to tomorrow.</p>
             </div>
             <div className="glass-card text-center" style={{ padding: '2rem' }}>
               <Users size={26} color="#34A853" style={{ margin: '0 auto 0.75rem' }} />
               <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.2rem' }}>🎤 Sunday Learning</h3>
               <p className="text-muted" style={{ fontSize: '0.85rem' }}>Every Sunday, the community comes together. The week's top performers explain their approach, optimizations, thought process, and mistakes. Learning from someone who solved the same challenge accelerates understanding.</p>
             </div>
          </div>
          
          {/* XP Table */}
          <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#fff', fontSize: '1.25rem' }}>
              <Zap size={20} color="#FBBC05" /> XP System
            </h3>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Every action earns XP. The more consistent you are, the faster you climb the leaderboard.</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '0.75rem 1rem', color: '#4285F4' }}>Activity</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#4285F4' }}>XP</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#fff' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>Daily Check-in</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+10</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>GitHub Commit</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+20</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>LeetCode Easy</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+15</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>LeetCode Medium</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#FBBC05', fontWeight: 'bold' }}>+35</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>LeetCode Hard</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#fff', fontWeight: 'bold' }}>+60</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem' }}>Project Milestone</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#4285F4', fontWeight: 'bold' }}>+100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: '#fff' }}>🎯 Your Mission</h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>For the next <strong style={{color: '#fff'}}>13 months</strong>, your only goal is simple:</p>
        
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem', width: '100%' }}>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(66, 133, 244, 0.4)', background: 'rgba(66, 133, 244, 0.1)', color: '#fff' }}>Wake up.</div>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(234, 67, 53, 0.4)', background: 'rgba(234, 67, 53, 0.1)', color: '#fff' }}>Solve your 3 problems.</div>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(251, 188, 5, 0.4)', background: 'rgba(251, 188, 5, 0.1)', color: '#fff' }}>Build your project.</div>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(52, 168, 83, 0.4)', background: 'rgba(52, 168, 83, 0.1)', color: '#fff' }}>Commit your code.</div>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(0, 240, 255, 0.4)', background: 'rgba(0, 240, 255, 0.1)', color: '#fff' }}>Submit your proof.</div>
          <div className="glass-card" style={{ padding: '0.6rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', width: '100%', maxWidth: '350px', border: '1px solid rgba(161, 66, 244, 0.4)', background: 'rgba(161, 66, 244, 0.1)', color: '#fff' }}>Earn your XP.</div>
          <div className="glass-card" style={{ padding: '1rem 2rem', fontSize: '1.4rem', fontWeight: '900', width: '100%', maxWidth: '350px', background: '#fff', color: '#fff' }}>Repeat.</div>
        </div>
        
        <p style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#fff' }}>Do this every day.</p>
        <p style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Not for a week.</p>
        <p style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Not for a month.</p>
        <p style={{ fontSize: '1.4rem', marginBottom: '2rem', fontWeight: 'bold', color: '#fff' }}>But for 13 months.</p>
        
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: '#fff' }}>When you stay consistent long enough, <span style={{ color: '#4285F4', fontWeight: 'bold' }}>confidence replaces fear.</span></p>
          <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: '#fff' }}>Knowledge replaces doubt.</p>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: '#fff' }}>Discipline replaces excuses.</p>
          
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#fff' }}>
            And one day, you'll sit in front of a Google interviewer—not hoping you're ready, but knowing you are.
          </p>
          
          <h3 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '0.75rem', background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome to the Google Velocity Cohort.
          </h3>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
            The countdown to your Google interview starts today. 🚀
          </p>
        </div>
      </div>
    </section>
  );
}
