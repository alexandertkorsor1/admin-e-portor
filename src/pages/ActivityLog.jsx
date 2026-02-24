import './ActivityLog.css'

const activities = [
  { id: 1, action: 'Student Registration', user: 'Admin', detail: 'New student John Doe (STU-2024-009) registered', time: '5 minutes ago', icon: '🎓', type: 'create' },
  { id: 2, action: 'Fee Payment', user: 'System', detail: 'Payment of $150 received from Grace Mabor (STU-2024-006)', time: '15 minutes ago', icon: '💰', type: 'payment' },
  { id: 3, action: 'Schedule Update', user: 'Mr. James Kollie', detail: 'Updated weekly timetable for Grade 10A', time: '1 hour ago', icon: '📅', type: 'update' },
  { id: 4, action: 'Announcement Posted', user: 'Admin', detail: 'New announcement: "Mid-Term Examination Schedule"', time: '2 hours ago', icon: '📢', type: 'create' },
  { id: 5, action: 'Attendance Marked', user: 'Mrs. Sarah Gbowee', detail: 'Marked attendance for Grade 10A English — 3 absent', time: '3 hours ago', icon: '✅', type: 'attendance' },
  { id: 6, action: 'Marks Updated', user: 'Mr. Peter Weah', detail: 'Entered science marks for Grade 9A — 35 students', time: '4 hours ago', icon: '📝', type: 'update' },
  { id: 7, action: 'LMS Upload', user: 'Ms. Ruth Togba', detail: 'Uploaded History notes for Grade 11A', time: '5 hours ago', icon: '📤', type: 'upload' },
  { id: 8, action: 'Student Deactivated', user: 'Admin', detail: 'Student Grace Mabor (STU-2024-006) status set to Inactive', time: '6 hours ago', icon: '⚠️', type: 'delete' },
  { id: 9, action: 'Login', user: 'Admin', detail: 'Admin logged in from IP 192.168.1.105', time: '7 hours ago', icon: '🔑', type: 'login' },
  { id: 10, action: 'Settings Updated', user: 'Admin', detail: 'Updated school contact information', time: '8 hours ago', icon: '⚙️', type: 'update' },
  { id: 11, action: 'Fee Waiver Approved', user: 'Admin', detail: 'Approved fee waiver for Emmanuel Dolo — $100 discount', time: '1 day ago', icon: '🎫', type: 'payment' },
  { id: 12, action: 'Faculty Added', user: 'Admin', detail: 'New faculty member Dr. Agnes Flomo registered', time: '2 days ago', icon: '👨‍🏫', type: 'create' },
]

export default function ActivityLog() {
  const getTypeColor = (type) => {
    const colors = {
      create: 'success', payment: 'info', update: 'warning',
      attendance: 'purple', upload: 'info', delete: 'danger', login: 'purple'
    }
    return colors[type] || 'info'
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📋 Activity Log</h1>
        <p>Track all actions and changes across the admin portal</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>🕐 Recent Activities</h3>
          <span className="badge admin">{activities.length} entries</span>
        </div>
        <div className="timeline">
          {activities.map((activity, idx) => (
            <div key={activity.id} className="timeline-item">
              <div className="timeline-dot-col">
                <div className={`timeline-dot ${getTypeColor(activity.type)}`}>{activity.icon}</div>
                {idx < activities.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{activity.action}</h4>
                  <span className="timeline-time">{activity.time}</span>
                </div>
                <p className="timeline-detail">{activity.detail}</p>
                <span className="timeline-user">By: {activity.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
