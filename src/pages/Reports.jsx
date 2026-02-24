import { useState } from 'react'
import './Reports.css'

export default function Reports() {
  const [activeTab, setActiveTab] = useState('overview')

  const reportCards = [
    { icon: '🎓', title: 'Student Report', desc: 'Academic performance, attendance, and demographics', color: '#667eea', count: '247 students' },
    { icon: '👨‍🏫', title: 'Faculty Report', desc: 'Teaching load, attendance, and performance', color: '#11998e', count: '18 faculty' },
    { icon: '💰', title: 'Financial Report', desc: 'Fee collection, pending payments, and revenue', color: '#f39c12', count: '$18.5K collected' },
    { icon: '✅', title: 'Attendance Report', desc: 'Daily, weekly, and monthly attendance analytics', color: '#2ecc71', count: '92% avg' },
    { icon: '📝', title: 'Exam Report', desc: 'Exam results, pass rates, and analytics', color: '#e74c3c', count: '3 exams conducted' },
    { icon: '🏫', title: 'Class Report', desc: 'Class-wise performance and comparisons', color: '#8b5cf6', count: '12 classes' },
  ]

  const gradeDistribution = [
    { grade: '12A', students: 22, passRate: 95, avgScore: 78, topSubject: 'Mathematics' },
    { grade: '11B', students: 28, passRate: 89, avgScore: 74, topSubject: 'English' },
    { grade: '11A', students: 26, passRate: 92, avgScore: 76, topSubject: 'Science' },
    { grade: '10A', students: 32, passRate: 88, avgScore: 72, topSubject: 'History' },
    { grade: '10B', students: 30, passRate: 85, avgScore: 70, topSubject: 'Geography' },
    { grade: '9A', students: 35, passRate: 90, avgScore: 73, topSubject: 'Science' },
    { grade: '9B', students: 32, passRate: 87, avgScore: 71, topSubject: 'English' },
    { grade: '9C', students: 28, passRate: 82, avgScore: 68, topSubject: 'Mathematics' },
  ]

  const monthlyAttendance = [
    { month: 'Sep 2025', rate: 94, students: 232 },
    { month: 'Oct 2025', rate: 91, students: 238 },
    { month: 'Nov 2025', rate: 89, students: 240 },
    { month: 'Dec 2025', rate: 86, students: 235 },
    { month: 'Jan 2026', rate: 93, students: 245 },
    { month: 'Feb 2026', rate: 92, students: 247 },
  ]

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📈 Reports & Analytics</h1>
        <p>Comprehensive school data and performance insights</p>
      </div>

      {/* Report Type Cards */}
      <div className="report-cards-grid">
        {reportCards.map((r, idx) => (
          <div key={idx} className="report-type-card" style={{ '--card-color': r.color }}>
            <div className="report-card-icon">{r.icon}</div>
            <div className="report-card-info">
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <span className="report-card-count">{r.count}</span>
            </div>
            <button className="btn btn-sm btn-secondary">📥 Export</button>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginTop: 'var(--sp-xl)' }}>
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Grade Overview</button>
        <button className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>✅ Attendance Trend</button>
      </div>

      {activeTab === 'overview' && (
        <div className="card">
          <div className="card-header">
            <h3>📊 Grade-wise Performance Overview</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Students</th>
                <th>Pass Rate</th>
                <th>Avg Score</th>
                <th>Top Subject</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {gradeDistribution.map(g => (
                <tr key={g.grade}>
                  <td><strong>Grade {g.grade}</strong></td>
                  <td>{g.students}</td>
                  <td>
                    <span className={`badge ${g.passRate >= 90 ? 'pass' : g.passRate >= 80 ? 'pending' : 'fail'}`}>
                      {g.passRate}%
                    </span>
                  </td>
                  <td>{g.avgScore}%</td>
                  <td>{g.topSubject}</td>
                  <td>
                    <div className="performance-bar-wrap">
                      <div className="performance-bar">
                        <div className="performance-fill" style={{
                          width: `${g.avgScore}%`,
                          background: g.avgScore >= 75 ? 'var(--success)' : g.avgScore >= 60 ? 'var(--warning)' : 'var(--danger)'
                        }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="card">
          <div className="card-header">
            <h3>✅ Monthly Attendance Trend</h3>
          </div>
          <div className="attendance-chart">
            {monthlyAttendance.map((m, idx) => (
              <div key={idx} className="chart-bar-group">
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{
                    height: `${m.rate}%`,
                    background: m.rate >= 92 ? 'linear-gradient(180deg, var(--success), rgba(46,204,113,0.6))' :
                      m.rate >= 88 ? 'linear-gradient(180deg, var(--warning), rgba(243,156,18,0.6))' :
                        'linear-gradient(180deg, var(--danger), rgba(231,76,60,0.6))'
                  }}>
                    <span className="chart-bar-value">{m.rate}%</span>
                  </div>
                </div>
                <span className="chart-label">{m.month}</span>
                <span className="chart-sub">{m.students} students</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
