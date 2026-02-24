import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const adminName = localStorage.getItem('adminName') || 'Admin'

  const recentActivities = [
    { icon: '🎓', text: 'New student John Doe registered', time: '5 min ago', type: 'info' },
    { icon: '💰', text: 'Fee payment received from Grace M. — $150', time: '15 min ago', type: 'success' },
    { icon: '👨‍🏫', text: 'Faculty Mr. Kollie updated schedule', time: '1 hour ago', type: 'info' },
    { icon: '📢', text: 'New announcement posted: Exam Schedule', time: '2 hours ago', type: 'warning' },
    { icon: '⚠️', text: '3 students marked absent today', time: '3 hours ago', type: 'danger' },
    { icon: '📝', text: 'Marks entry completed for Grade 10A', time: '4 hours ago', type: 'success' },
  ]

  const topPerformers = [
    { name: 'Abraham K.', grade: '12A', avg: 94, trend: '+3%' },
    { name: 'Fatu M.', grade: '11B', avg: 91, trend: '+5%' },
    { name: 'Moses J.', grade: '10A', avg: 89, trend: '+2%' },
    { name: 'Comfort S.', grade: '12A', avg: 88, trend: '+1%' },
    { name: 'Emmanuel D.', grade: '9C', avg: 87, trend: '+4%' },
  ]

  const pendingActions = [
    { task: 'Review 5 new registrations', icon: '📋', priority: 'high' },
    { task: 'Approve fee waiver requests (3)', icon: '💰', priority: 'medium' },
    { task: 'Update school calendar', icon: '📅', priority: 'low' },
    { task: 'Review faculty leave requests', icon: '👨‍🏫', priority: 'high' },
  ]

  return (
    <div className="animate-in">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Welcome back, {adminName}! 👋</h1>
            <p>Here's what's happening at FFPMHS today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="welcome-quick-actions">
            <button className="btn btn-primary" onClick={() => navigate('/admin/students')}>
              ➕ Add Student
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/announcements')}>
              📢 Post Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card accent animate-in" onClick={() => navigate('/admin/students')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h4>Total Students</h4>
            <div className="stat-value">247</div>
            <div className="stat-change positive">↑ 12 this semester</div>
          </div>
        </div>
        <div className="stat-card purple animate-in" onClick={() => navigate('/admin/faculty')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h4>Total Faculty</h4>
            <div className="stat-value">18</div>
            <div className="stat-change positive">↑ 2 new hires</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Attendance Today</h4>
            <div className="stat-value">92%</div>
            <div className="stat-change positive">↑ 3% vs last week</div>
          </div>
        </div>
        <div className="stat-card warning animate-in" onClick={() => navigate('/admin/fees')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h4>Fees Collected</h4>
            <div className="stat-value">$18.5K</div>
            <div className="stat-change negative">23 pending</div>
          </div>
        </div>
        <div className="stat-card info animate-in" onClick={() => navigate('/admin/classes')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon">🏫</div>
          <div className="stat-info">
            <h4>Active Classes</h4>
            <div className="stat-value">12</div>
            <div className="stat-change">5 grades</div>
          </div>
        </div>
        <div className="stat-card danger animate-in">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h4>Alerts</h4>
            <div className="stat-value">7</div>
            <div className="stat-change negative">3 urgent</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>🕐 Recent Activity</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate('/admin/activity')}>View All</button>
          </div>
          <div className="notif-list">
            {recentActivities.map((item, idx) => (
              <div key={idx} className="notif-item">
                <div className={`notif-icon ${item.type}`}>{item.icon}</div>
                <div className="notif-body">
                  <h4>{item.text}</h4>
                  <span className="notif-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right-col">
          {/* Pending Actions */}
          <div className="card">
            <div className="card-header">
              <h3>📋 Pending Actions</h3>
              <span className="badge admin">{pendingActions.length} items</span>
            </div>
            <div className="pending-actions-list">
              {pendingActions.map((item, idx) => (
                <div key={idx} className={`pending-action-item priority-${item.priority}`}>
                  <span className="pending-icon">{item.icon}</span>
                  <span className="pending-text">{item.task}</span>
                  <span className={`priority-dot ${item.priority}`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="card">
            <div className="card-header">
              <h3>🏆 Top Performers</h3>
            </div>
            <div className="performers-list">
              {topPerformers.map((student, idx) => (
                <div key={idx} className="performer-row">
                  <div className="performer-rank">#{idx + 1}</div>
                  <div className="performer-info">
                    <h4>{student.name}</h4>
                    <span>Grade {student.grade}</span>
                  </div>
                  <div className="performer-score">
                    <span className="score-value">{student.avg}%</span>
                    <span className="score-trend positive">{student.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="quick-access-section">
        <h3>⚡ Quick Access</h3>
        <div className="quick-access-grid">
          <button className="quick-access-card" onClick={() => navigate('/admin/students')}>
            <span className="qa-icon">🎓</span>
            <span className="qa-label">Manage Students</span>
            <span className="qa-desc">View, add, edit students</span>
          </button>
          <button className="quick-access-card" onClick={() => navigate('/admin/faculty')}>
            <span className="qa-icon">👨‍🏫</span>
            <span className="qa-label">Manage Faculty</span>
            <span className="qa-desc">Faculty records & schedules</span>
          </button>
          <button className="quick-access-card" onClick={() => navigate('/admin/fees')}>
            <span className="qa-icon">💰</span>
            <span className="qa-label">Fee Management</span>
            <span className="qa-desc">Payments & invoices</span>
          </button>
          <button className="quick-access-card" onClick={() => navigate('/admin/reports')}>
            <span className="qa-icon">📈</span>
            <span className="qa-label">Generate Reports</span>
            <span className="qa-desc">Analytics & exports</span>
          </button>
          <button className="quick-access-card" onClick={() => navigate('/admin/classes')}>
            <span className="qa-icon">🏫</span>
            <span className="qa-label">Class Management</span>
            <span className="qa-desc">Sections & timetables</span>
          </button>
          <button className="quick-access-card" onClick={() => navigate('/admin/settings')}>
            <span className="qa-icon">⚙️</span>
            <span className="qa-label">System Settings</span>
            <span className="qa-desc">Configure portal</span>
          </button>
        </div>
      </div>
    </div>
  )
}
