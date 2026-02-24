import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import { useData } from '../context/DataContext.jsx'
import './ManageClasses.css'

export default function ManageClasses() {
  const { classes, setClasses, faculty, updateClass, addClass, removeClass, ALL_SUBJECTS } = useData()
  const toast = useToast()
  const confirm = useConfirm()
  
  const ALL_FACULTY = faculty.map(f => f.name)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', section: 'General', faculty: [], subject: '', room: '', schedule: '' })
  const [editClass, setEditClass] = useState(null)

  const filtered = classes.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.faculty.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStudents = classes.reduce((s, c) => s + c.students, 0)

  const openAdd = () => {
    setEditClass(null)
    setFormData({ name: '', section: 'General', faculty: [], subject: '', room: '', schedule: '' })
    setShowModal(true)
  }

  const openEdit = (cls) => {
    setEditClass(cls)
    setFormData({ ...cls })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return toast.error('Please enter class name')
    if (editClass) {
      updateClass({ ...editClass, ...formData })
      toast.success(`Class "${formData.name}" updated successfully`)
    } else {
      const colors = ['#667eea', '#764ba2', '#11998e', '#f093fb', '#fa709a', '#4facfe', '#f5576c', '#38ef7d']
      addClass({ ...formData, id: Date.now(), students: 0, color: colors[classes.length % colors.length] })
      toast.success(`Class "${formData.name}" created successfully`)
    }
    setShowModal(false)
  }

  const handleDeleteClass = async (cls) => {
    const ok = await confirm('Delete Class', `Are you sure you want to delete ${cls.name}?`)
    if (ok) {
      removeClass(cls.id)
      toast.success(`Class "${cls.name}" deleted`)
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🏫 Manage Classes</h1>
        <p>Organize classes, assign faculty, and manage schedules</p>
      </div>

      <div className="mini-stats-row">
        <div className="mini-stat">
          <span className="mini-stat-value">{classes.length}</span>
          <span className="mini-stat-label">Total Classes</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{totalStudents}</span>
          <span className="mini-stat-label">Total Students</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{Math.round(totalStudents / classes.length)}</span>
          <span className="mini-stat-label">Avg Per Class</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{new Set(classes.flatMap(c => c.faculty)).size}</span>
          <span className="mini-stat-label">Faculty Assigned</span>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search classes, faculty, subjects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>➕ Add Class</button>
      </div>

      <div className="classes-grid">
        {filtered.map(cls => (
          <div key={cls.id} className="class-card" style={{ borderTop: `4px solid ${cls.color}` }}>
            <div className="class-card-header">
              <div className="class-icon" style={{ background: cls.color }}>{cls.name.replace('Grade ', '')}</div>
              <div className="class-header-text">
                <h3>{cls.name}</h3>
                <span className="class-section-badge">{cls.section}</span>
              </div>
            </div>
            <div className="class-details">
              <div className="class-detail-item">
                <span>👨‍🏫</span>
                <span>{cls.faculty.join(', ')}</span>
              </div>
              <div className="class-detail-item">
                <span>📚</span>
                <span>{cls.subject}</span>
              </div>
              <div className="class-detail-item">
                <span>🎓</span>
                <span>{cls.students} students</span>
              </div>
              <div className="class-detail-item">
                <span>📍</span>
                <span>Room {cls.room}</span>
              </div>
              <div className="class-detail-item">
                <span>🗓️</span>
                <span className="class-schedule">{cls.schedule}</span>
              </div>
            </div>
            <div className="class-card-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => openEdit(cls)}>✏️ Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClass(cls)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editClass ? '✏️ Edit Class' : '➕ Add New Class'}</h2>
            <p className="modal-subtitle">Configure class details and assignments</p>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Class Name</label>
                <input className="form-control" placeholder="e.g. Grade 10A" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Section</label>
                <select className="form-control" value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })}>
                  <option>General</option>
                  <option>Science</option>
                  <option>Arts</option>
                  <option>Commerce</option>
                </select>
              </div>
            </div>
            <div className="form-row">
            <div className="form-group">
              <label className="form-label">Assigned Faculty</label>
              <div className="multi-select-grid">
                {ALL_FACULTY.map(fac => (
                  <label key={fac} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={formData.faculty.includes(fac)} 
                      onChange={e => {
                        const newFac = e.target.checked 
                          ? [...formData.faculty, fac]
                          : formData.faculty.filter(f => f !== fac)
                        setFormData({ ...formData, faculty: newFac })
                      }}
                    />
                    <span>{fac}</span>
                  </label>
                ))}
              </div>
            </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-control" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                  <option value="">— Select Subject —</option>
                  {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room</label>
                <input className="form-control" placeholder="Room number" value={formData.room} onChange={e => setFormData({ ...formData, room: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Schedule</label>
                <input className="form-control" placeholder="e.g. Mon, Wed 08:00-09:30" value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editClass ? 'Update' : 'Add Class'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
