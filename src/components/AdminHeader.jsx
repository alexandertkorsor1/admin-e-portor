import { useLocation } from 'react-router-dom'

const routeMap = {
  '/admin': { title: 'Dashboard', icon: '📊' },
  '/admin/students': { title: 'Manage Students', icon: '🎓' },
  '/admin/faculty': { title: 'Manage Faculty', icon: '👨‍🏫' },
  '/admin/classes': { title: 'Manage Classes', icon: '🏫' },
  '/admin/fees': { title: 'Fee Management', icon: '💰' },
  '/admin/attendance': { title: 'Attendance', icon: '📋' },
  '/admin/reports': { title: 'Reports & Analytics', icon: '📈' },
  '/admin/announcements': { title: 'Announcements', icon: '📢' },
  '/admin/timetable': { title: 'Timetable', icon: '📅' },
  '/admin/exams': { title: 'Exams & Results', icon: '📝' },
  '/admin/hall-tickets': { title: 'Hall Tickets', icon: '🎫' },
  '/admin/settings': { title: 'Settings', icon: '⚙️' },
}

export default function AdminHeader({ onMenuToggle }) {
  const adminName = localStorage.getItem('adminName') || 'Administrator'
  const initials = adminName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const location = useLocation()
  const current = routeMap[location.pathname] || routeMap['/admin']

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle}>☰</button>
        <div>
          <h2>{current.icon} {current.title}</h2>
          <span className="breadcrumb">Home / {current.title}</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-greeting">
          <span>{greeting} 👋</span>
        </div>
        <button className="header-icon-btn" title="Notifications">
          🔔
          <span className="notif-dot"></span>
        </button>
        <button className="header-icon-btn" title="Messages">
          💬
        </button>
        <div className="header-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{adminName}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}
