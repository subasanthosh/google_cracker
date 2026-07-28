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
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.5), rgba(3, 5, 9, 0.75)), url(${googleBrightLobby})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '8rem 2rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(0, 240, 255, 0.2)'
        }}
      >
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.85)) drop-shadow(0 0 24px rgba(0,0,0,0.7))',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            boxShadow: '0 4px 32px rgba(0,0,0,0.55)',
          }}>
           Welcome to the 13-Month Google Velocity Cohort
          </h1>
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'left', marginTop: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1), rgba(234, 67, 53, 0.1))',
              border: '2px solid #4285F4',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(66, 133, 244, 0.15)'
            }}>
              <p style={{ fontSize: '1.8rem', fontWeight: '800', fontStyle: 'italic', color: '#fff', marginBottom: '1rem', lineHeight: '1.4' }}>
                "I Know it is difficult and Boring but it is definitely worth Cracking it so never ever give up!"
              </p>
              <div style={{ height: '4px', width: '60px', background: '#FBBC05', margin: '0 auto' }}></div>
            </div>

            <h2 style={{ color: '#4285F4', marginBottom: '1rem' }}>First of all...</h2>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Thank you for joining the Google Velocity Cohort! ❤️</p>
            <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>Today isn't just another day.</p>
            <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>Today is the day you decided to invest in yourself.</p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>For the next <strong style={{color: '#fff'}}>13 months</strong>, your mission is simple:</p>
            
            <blockquote style={{ borderLeft: '4px solid #EA4335', margin: '2rem 0', fontSize: '1.4rem', fontStyle: 'italic', background: 'rgba(234, 67, 53, 0.1)', padding: '1.5rem', borderRadius: '0 8px 8px 0', color: '#fff' }}>
              <strong>To become capable of cracking the Google Software Engineer interview.</strong>
            </blockquote>
            
            <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>This journey is not for everyone.</p>
            <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>It is for people who are willing to stay consistent when others quit.</p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>It is for people who choose discipline over excuses.</p>
            <p style={{ fontSize: '1.2rem', color: '#34A853', fontWeight: 'bold' }}>If you trust the process and give your best every single day, there is absolutely no reason why you cannot become Google-ready by the end of this journey.</p>
          </div>
        </div>
      </div>

      {/* Before You Begin */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem', margin: '0 auto' }}>
        <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#fff' }}>📝 Before You Begin</h2>
        </div>
        
        <div className="grid grid-3">
          <div className="glass-card border-glow-blue" style={{ borderTop: '4px solid #4285F4' }}>
            <BookOpen size={32} color="#4285F4" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#fff' }}>Maintain a Learning Notebook</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> New concepts</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Mistakes you made</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Important algorithms</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Interview tricks</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4285F4' }}></div> Notes from discussions</li>
            </ul>
            <p className="text-muted">One notebook.<br/>13 months.<br/>Your complete Google interview revision guide.</p>
          </div>
          
          <div className="glass-card border-glow-green" style={{ borderTop: '4px solid #34A853' }}>
            <CheckCircle size={32} color="#34A853" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#fff' }}>Submit Proof of Work</h3>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Every single day you must submit your proof of work. Examples:</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Programming Questions</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> GitHub Commits</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Project Progress</li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }}></div> Learning Notes</li>
            </ul>
            <p className="text-muted" style={{ fontWeight: 'bold' }}>No proof. No XP. No shortcuts.<br/>Consistency is everything.</p>
          </div>
          
          <div className="glass-card border-glow-red" style={{ borderTop: '4px solid #EA4335' }}>
            <Flame size={32} color="#EA4335" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#fff' }}>Never Give Up</h3>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Some days you'll enjoy coding.</p>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Some days you'll hate it.</p>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Some days you'll solve problems in minutes.</p>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Some days you'll spend hours on one bug.</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>Don't stop.</p>
            <p className="text-muted">Remember...<br/><strong style={{color: '#fff'}}>Google doesn't reward people who never struggled.</strong><br/><strong style={{color: '#fff'}}>Google rewards people who never stopped learning.</strong></p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.55), rgba(3, 5, 9, 0.55)), url(${googleBrightExterior})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '6rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 240, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.1)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#FBBC05' }}>💬 Quote of the Journey</h2>
          <blockquote style={{ fontSize: '2.2rem', lineHeight: '1.4', fontStyle: 'italic', fontWeight: 600, color: '#fff' }}>
            "Success at Google is not built in one day. It is built by showing up every single day for 13 months."
          </blockquote>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem', margin: '0 auto' }}>
        <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#fff' }}>🌟 Features of the Google Velocity Cohort</h2>
        </div>
        
        <div className="grid grid-3">
          <div className="glass-card">
            <Trophy size={28} color="#FBBC05" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Live Rank Board</h3>
            <p className="text-muted">See where you stand among hundreds of learners. Compete. Improve. Climb the leaderboard.</p>
          </div>
          <div className="glass-card">
            <Zap size={28} color="#4285F4" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Gamified XP System</h3>
            <p className="text-muted">Everything you do earns XP. Every question solved. Every GitHub commit. Every project milestone. Every bit of consistency counts.</p>
          </div>
          <div className="glass-card">
            <BookOpen size={28} color="#EA4335" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Exam Pass</h3>
            <p className="text-muted">College exams shouldn't break your momentum. You receive <strong style={{color: '#fff'}}>3 Exam Passes every month</strong> to pause your streak during unavoidable academic commitments.</p>
          </div>
          <div className="glass-card">
            <Users size={28} color="#34A853" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Connect with Google-Minded People</h3>
            <p className="text-muted">Surround yourself with students who share the same dream. Build friendships. Discuss problems. Form project teams. Grow together. The people beside you today could become your teammates tomorrow.</p>
          </div>
          <div className="glass-card">
            <Code size={28} color="#4285F4" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Build an Outstanding GitHub Profile</h3>
            <p className="text-muted">Every day you commit code. Every day your GitHub becomes stronger. By the end of the cohort, you'll have a profile that reflects consistency and real development work.</p>
          </div>
          <div className="glass-card">
            <Target size={28} color="#EA4335" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Master LeetCode & Build Projects</h3>
            <p className="text-muted">Every day you'll solve carefully selected coding problems to build problem-solving ability. Alongside DSA, you'll develop real-world applications to strengthen your resume.</p>
          </div>
        </div>
      </div>

      {/* How Journey Works & XP */}
      <div 
        style={{
          backgroundImage: `linear-gradient(rgba(3, 5, 9, 0.65), rgba(3, 5, 9, 0.65)), url(${googleBrightInterior})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 0'
        }}
      >
        <div className="container" style={{ margin: '0 auto' }}>
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#fff' }}>📖 How This Journey Works</h2>
            <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              For the next <strong style={{color: '#fff'}}>13 months</strong>, you'll work on <strong style={{color: '#fff'}}>Programming</strong> and <strong style={{color: '#fff'}}>Projects</strong> in parallel.
            </p>
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid #4285F4' }}>
              <h3 style={{ marginBottom: '1rem', color: '#4285F4', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code size={24} /> Daily Programming
              </h3>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Every day you'll solve:</p>
              <div style={{ background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34A853', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', color: '#34A853', fontWeight: 'bold' }}>
                ✅ 3 Programming Questions
              </div>
              <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>After solving them, you'll submit:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <li>Your code</li>
                <li>Your proof of completion</li>
              </ul>
              <p className="text-muted">Our team will verify your submissions. Once verified, XP points will automatically be added to your profile. Small improvements every day create extraordinary results over time.</p>
            </div>
            
            <div className="glass-card" style={{ borderLeft: '4px solid #EA4335' }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={24} /> Daily Project Development
              </h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Alongside DSA, you'll continuously build software projects.</p>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Every feature you build makes you a better engineer.</p>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Every GitHub commit makes your profile stronger.</p>
              <div style={{ background: 'rgba(234, 67, 53, 0.1)', border: '1px solid #EA4335', padding: '1rem', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '1.5rem' }}>
                By the end of this cohort, you'll not only know algorithms—you'll know how to build software.
              </div>
            </div>
          </div>
          
          <div className="grid grid-3" style={{ marginBottom: '4rem' }}>
             <div className="glass-card text-center">
               <Trophy size={32} color="#FBBC05" style={{ margin: '0 auto 1rem' }} />
               <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🏆 Weekly Assessments</h3>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Every week you'll test yourself through Weekly Coding Assessments, LeetCode Weekly Contests, and Bi-Weekly Assessments. These help measure your growth and prepare you for Google's interview environment.</p>
             </div>
             <div className="glass-card text-center">
               <Activity size={32} color="#4285F4" style={{ margin: '0 auto 1rem' }} />
               <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🥇 Rank Board</h3>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Your assessment scores and XP determine your position on the leaderboard. Don't fear competition. Use it as motivation. The person above you today can inspire you to become the person everyone looks up to tomorrow.</p>
             </div>
             <div className="glass-card text-center">
               <Users size={32} color="#34A853" style={{ margin: '0 auto 1rem' }} />
               <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🎤 Sunday Learning</h3>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Every Sunday, the community comes together. The week's top performers explain their approach, optimizations, thought process, and mistakes. Learning from someone who solved the same challenge accelerates understanding.</p>
             </div>
          </div>
          
          {/* XP Table */}
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#fff' }}>
              <Zap size={24} color="#FBBC05" /> XP System
            </h3>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Every action earns XP. The more consistent you are, the faster you climb the leaderboard.</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem', color: '#4285F4' }}>Activity</th>
                    <th style={{ padding: '1rem', textAlign: 'right', color: '#4285F4' }}>XP</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#fff' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>Daily Check-in</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+10</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>GitHub Commit</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+20</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>LeetCode Easy</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#34A853', fontWeight: 'bold' }}>+15</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>LeetCode Medium</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#FBBC05', fontWeight: 'bold' }}>+35</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>LeetCode Hard</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#fff', fontWeight: 'bold' }}>+60</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem' }}>Project Milestone</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#4285F4', fontWeight: 'bold' }}>+100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', textAlign: 'center', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff' }}>🎯 Your Mission</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>For the next <strong style={{color: '#fff'}}>13 months</strong>, your only goal is simple:</p>
        
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '4rem', width: '100%' }}>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(66, 133, 244, 0.4)', background: 'rgba(66, 133, 244, 0.1)', color: '#fff' }}>Wake up.</div>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(234, 67, 53, 0.4)', background: 'rgba(234, 67, 53, 0.1)', color: '#fff' }}>Solve your 3 problems.</div>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(251, 188, 5, 0.4)', background: 'rgba(251, 188, 5, 0.1)', color: '#fff' }}>Build your project.</div>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(52, 168, 83, 0.4)', background: 'rgba(52, 168, 83, 0.1)', color: '#fff' }}>Commit your code.</div>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(0, 240, 255, 0.4)', background: 'rgba(0, 240, 255, 0.1)', color: '#fff' }}>Submit your proof.</div>
          <div className="glass-card" style={{ padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', width: '100%', maxWidth: '400px', border: '1px solid rgba(161, 66, 244, 0.4)', background: 'rgba(161, 66, 244, 0.1)', color: '#fff' }}>Earn your XP.</div>
          <div className="glass-card" style={{ padding: '1.5rem 3rem', fontSize: '1.8rem', fontWeight: '900', width: '100%', maxWidth: '400px', background: '#fff', color: '#fff' }}>Repeat.</div>
        </div>
        
        <p style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>Do this every day.</p>
        <p style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Not for a week.</p>
        <p style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Not for a month.</p>
        <p style={{ fontSize: '1.8rem', marginBottom: '3rem', fontWeight: 'bold', color: '#fff' }}>But for 13 months.</p>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>When you stay consistent long enough, <span style={{ color: '#4285F4', fontWeight: 'bold' }}>confidence replaces fear.</span></p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Knowledge replaces doubt.</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#fff' }}>Discipline replaces excuses.</p>
          
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '3rem', color: '#fff' }}>
            And one day, you'll sit in front of a Google interviewer—not hoping you're ready, but knowing you are.
          </p>
          
          <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome to the Google Velocity Cohort.
          </h3>
          <p style={{ fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
            The countdown to your Google interview starts today. 🚀
          </p>
        </div>
      </div>
    </section>
  );
}
