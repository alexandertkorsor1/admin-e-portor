import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const adminLinks = [
  { to: '/admin', icon: '📊', label: 'Dashboard', exact: true },
  { section: 'Management' },
  { to: '/admin/students', icon: '🎓', label: 'Students' },
  { to: '/admin/faculty', icon: '👨‍🏫', label: 'Faculty' },
  { to: '/admin/classes', icon: '🏫', label: 'Classes' },
  { section: 'Academics' },
  { to: '/admin/timetable', icon: '🗓️', label: 'Timetable' },
  { to: '/admin/exams', icon: '📝', label: 'Exams & Results' },
  { to: '/admin/hall-tickets', icon: '🎫', label: 'Hall Tickets' },
  { section: 'Operations' },
  { to: '/admin/fees', icon: '💰', label: 'Fee Management' },
  { to: '/admin/announcements', icon: '📢', label: 'Announcements', badge: 2 },
  { to: '/admin/reports', icon: '📈', label: 'Reports' },
  { section: 'System' },
  { to: '/admin/activity', icon: '📋', label: 'Activity Log' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
]

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">🛡️</div>
          <div className="brand-text">
            <h2>FFPMHS</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            {localStorage.getItem('adminName')?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
          </div>
          <div className="profile-info">
            <span className="profile-name">{localStorage.getItem('adminName') || 'Administrator'}</span>
            <span className="profile-status">Online</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminLinks.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="nav-section-title">{item.section}</div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
