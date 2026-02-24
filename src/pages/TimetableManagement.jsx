import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import './TimetableManagement.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const PERIODS = [
  { id: 1, time: '08:00 - 08:45' },
  { id: 2, time: '08:50 - 09:35' },
  { id: 3, time: '09:45 - 10:30' },
  { id: 4, time: '10:35 - 11:20' },
  { id: 5, time: '11:30 - 12:15' },
  { id: 6, time: '12:20 - 13:05' },
  { id: 7, time: '14:00 - 14:45' },
  { id: 8, time: '14:50 - 15:35' },
]

const DEFAULT_SUBJECTS = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design', 'PE', 'ICT', 'French', 'Library', 'Assembly', 'Break']

const initialClasses = [
  { id: 'g9a', name: 'Grade acb', faculty: 'Mr. Peter Weah' },
  { id: 'g9b', name: 'Grade KG1', faculty: 'Mr. Peter Weah' },
  { id: 'g9c', name: 'Grade KG2', faculty: 'Mr. David Cooper' },
  { id: 'g10a', name: 'Grade 1st', faculty: 'Mr. James Kollie' },
  { id: 'g10b', name: 'Grade 2nd', faculty: 'Mrs. Sarah Gbowee' },
  { id: 'g11a', name: 'Grade 3rd', faculty: 'Ms. Ruth Togba' },
  { id: 'g11b', name: 'Grade 4th', faculty: 'Mr. James Kollie' },
  { id: 'g12a', name: 'Grade 5th', faculty: 'Mr. James Kollie' },
  { id: 'g12b', name: 'Grade 6th', faculty: 'Mr. James Kollie' }, 
  { id: 'g12c', name: 'Grade 7th', faculty: 'Mr. James Kollie' },
  { id: 'g12d', name: 'Grade 8th', faculty: 'Mr. James Kollie' }, 
  { id: 'g12e', name: 'Grade 9th', faculty: 'Mr. James Kollie' },
  { id: 'g12f', name: 'Grade 10th', faculty: 'Mr. James Kollie' },
  { id: 'g12g', name: 'Grade 11th', faculty: 'Mr. James Kollie' },
  { id: 'g12h', name: 'Grade 12th', faculty: 'Mr. James Kollie' },
]

// Generate a default empty timetable
function emptyTimetable() {
  const tt = {}
  DAYS.forEach(day => {
    tt[day] = PERIODS.map(p => ({ periodId: p.id, subject: '', teacher: '', room: '' }))
  })
  return tt
}

// Generate sample timetable for Grade 10A
function sampleTimetable() {
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design', 'PE', 'ICT']
  const teachers = ['Mr. Kollie', 'Mrs. Gbowee', 'Mr. Weah', 'Ms. Togba', 'Mr. Cooper', 'Mrs. Flomo', 'Mr. Kollie', 'Mrs. Gbowee']
  const tt = {}
  DAYS.forEach(day => {
    tt[day] = PERIODS.map((p, i) => ({
      periodId: p.id,
      subject: subjects[(i + DAYS.indexOf(day)) % subjects.length],
      teacher: teachers[(i + DAYS.indexOf(day)) % teachers.length],
      room: `${Math.floor(Math.random() * 4 + 1)}0${i + 1}`,
    }))
  })
  return tt
}

export default function TimetableManagement() {
  const toast = useToast()
  const confirm = useConfirm()
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS)
  const [selectedClass, setSelectedClass] = useState(initialClasses[3]) // Default to 10A
  const [timetables, setTimetables] = useState(() => {
    const map = {}
    initialClasses.forEach(c => {
      map[c.id] = c.id === 'g10a' ? sampleTimetable() : emptyTimetable()
    })
    return map
  })
  const [editCell, setEditCell] = useState(null) // { day, periodIdx }
  const [editData, setEditData] = useState({ subject: '', teacher: '', room: '' })
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')

  const currentTT = timetables[selectedClass.id]

  const startEdit = (day, periodIdx) => {
    const cell = currentTT[day][periodIdx]
    setEditData({ subject: cell.subject, teacher: cell.teacher, room: cell.room })
    setEditCell({ day, periodIdx })
  }

  const saveEdit = () => {
    if (!editCell) return
    const updated = { ...timetables }
    updated[selectedClass.id][editCell.day][editCell.periodIdx] = {
      ...updated[selectedClass.id][editCell.day][editCell.periodIdx],
      ...editData,
    }
    setTimetables(updated)
    setEditCell(null)
    toast.success('Period updated successfully')
  }

  const handleClearAll = async () => {
    const ok = await confirm('Clear Timetable', `Are you sure you want to clear the entire timetable for ${selectedClass.name}?`)
    if (ok) {
      setTimetables({ ...timetables, [selectedClass.id]: emptyTimetable() })
      toast.warning(`Timetable cleared for ${selectedClass.name}`)
    }
  }

  const handleAddSubject = () => {
    const name = newSubjectName.trim()
    if (!name) return toast.error('Enter a subject name')
    if (subjects.some(s => s.toLowerCase() === name.toLowerCase())) return toast.error('Subject already exists')
    setSubjects([...subjects, name])
    setNewSubjectName('')
    toast.success(`Subject "${name}" added`)
  }

  const handleDeleteSubject = async (subj) => {
    const ok = await confirm('Delete Subject', `Remove "${subj}" from the subject list? This won't affect existing timetable entries.`)
    if (ok) {
      setSubjects(subjects.filter(s => s !== subj))
      toast.success(`Subject "${subj}" removed`)
    }
  }

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': '#667eea', 'English': '#f093fb', 'Science': '#11998e',
      'History': '#fa709a', 'Geography': '#4facfe', 'Art & Design': '#f5576c',
      'PE': '#38ef7d', 'ICT': '#764ba2', 'French': '#f39c12', 'Library': '#95a5a6',
      'Assembly': '#d4a843', 'Break': '#bdc3c7',
    }
    return colors[subject] || '#8b5cf6'
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🗓️ Timetable Management</h1>
        <p>Create and manage class timetables for the school</p>
      </div>

      {/* Class Selector */}
      <div className="timetable-toolbar">
        <div className="class-selector-row">
          {initialClasses.map(cls => (
            <button
              key={cls.id}
              className={`class-select-btn ${selectedClass.id === cls.id ? 'active' : ''}`}
              onClick={() => setSelectedClass(cls)}
            >
              {cls.name}
            </button>
          ))}
        </div>
        <div className="timetable-actions">
          <span className="selected-class-info">👨‍🏫 {selectedClass.faculty}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowSubjectModal(true)}>📚 Manage Subjects</button>
          <button className="btn btn-danger btn-sm" onClick={handleClearAll}>🗑️ Clear All</button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="card timetable-card">
        <div className="timetable-grid">
          {/* Header Row — Day names */}
          <div className="tt-header-cell tt-corner">
            <span>⏰ Period</span>
          </div>
          {DAYS.map(day => (
            <div key={day} className="tt-header-cell">
              {day}
            </div>
          ))}

          {/* Period Rows */}
          {PERIODS.map((period, pIdx) => (
            <>
              <div key={`time-${period.id}`} className="tt-time-cell">
                <span className="tt-period-num">P{period.id}</span>
                <span className="tt-period-time">{period.time}</span>
              </div>
              {DAYS.map(day => {
                const cell = currentTT[day][pIdx]
                const isEmpty = !cell.subject
                return (
                  <div
                    key={`${day}-${period.id}`}
                    className={`tt-cell ${isEmpty ? 'tt-cell-empty' : ''}`}
                    onClick={() => startEdit(day, pIdx)}
                    style={!isEmpty ? { borderLeft: `3px solid ${getSubjectColor(cell.subject)}` } : {}}
                  >
                    {isEmpty ? (
                      <span className="tt-add-hint">+ Add</span>
                    ) : (
                      <>
                        <span className="tt-subject">{cell.subject}</span>
                        <span className="tt-teacher">{cell.teacher}</span>
                        {cell.room && <span className="tt-room">📍 {cell.room}</span>}
                      </>
                    )}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>

      {/* Subject Legend */}
      <div className="subject-legend">
        <h4>📚 Subject Legend ({subjects.filter(s => s !== 'Break' && s !== 'Assembly').length} subjects)</h4>
        <div className="legend-chips">
          {subjects.filter(s => s !== 'Break' && s !== 'Assembly').map(sub => (
            <span key={sub} className="legend-chip" style={{ borderColor: getSubjectColor(sub), color: getSubjectColor(sub) }}>
              <span className="legend-dot" style={{ background: getSubjectColor(sub) }}></span>
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editCell && (
        <div className="modal-overlay" onClick={() => setEditCell(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <h2>✏️ Edit Period</h2>
            <p className="modal-subtitle">{editCell.day} — {PERIODS[editCell.periodIdx].time} — {selectedClass.name}</p>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-control" value={editData.subject} onChange={e => setEditData({ ...editData, subject: e.target.value })}>
                <option value="">— Select Subject —</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Teacher</label>
              <input className="form-control" placeholder="Teacher name" value={editData.teacher} onChange={e => setEditData({ ...editData, teacher: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Room</label>
              <input className="form-control" placeholder="Room number" value={editData.room} onChange={e => setEditData({ ...editData, room: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => {
                const updated = { ...timetables }
                updated[selectedClass.id][editCell.day][editCell.periodIdx] = { periodId: PERIODS[editCell.periodIdx].id, subject: '', teacher: '', room: '' }
                setTimetables(updated)
                setEditCell(null)
                toast.info('Period cleared')
              }}>🗑️ Clear</button>
              <button className="btn btn-primary" onClick={saveEdit}>💾 Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Subjects Modal */}
      {showSubjectModal && (
        <div className="modal-overlay" onClick={() => setShowSubjectModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2>📚 Manage Subjects</h2>
            <p className="modal-subtitle">Add or remove subjects from the timetable</p>
            <div className="form-group" style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
              <input className="form-control" placeholder="New subject name..." value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddSubject()} />
              <button className="btn btn-primary" onClick={handleAddSubject}>➕ Add</button>
            </div>
            <div className="subject-manage-list">
              {subjects.map(sub => (
                <div key={sub} className="subject-manage-item">
                  <span className="legend-dot" style={{ background: getSubjectColor(sub), width: 10, height: 10, borderRadius: '50%', flexShrink: 0 }}></span>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '0.88rem' }}>{sub}</span>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSubject(sub)}>🗑️</button>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowSubjectModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
