import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import './Announcements.css'

const initialAnnouncements = [
  { id: 1, title: 'Mid-Term Examination Schedule', content: 'Mid-term exams will begin on March 5, 2026. All students must report to school with proper identification. Exam timetable has been uploaded to the LMS.', audience: 'All', priority: 'High', date: 'Feb 18, 2026', author: 'Admin' },
  { id: 2, title: 'Fee Payment Deadline Extended', content: 'The deadline for second semester fee payment has been extended to March 15, 2026. Students with outstanding balances should clear them before this date.', audience: 'Students', priority: 'Medium', date: 'Feb 15, 2026', author: 'Admin' },
  { id: 3, title: 'Inter-School Science Competition', content: 'Registration is now open for the annual inter-school science competition. Interested students should register with their science teacher before February 28, 2026.', audience: 'Students', priority: 'Low', date: 'Feb 12, 2026', author: 'Admin' },
  { id: 4, title: 'Faculty Meeting — February 25', content: 'All faculty members are required to attend a mandatory meeting on February 25, 2026 at 2:00 PM in the conference room.', audience: 'Faculty', priority: 'High', date: 'Feb 10, 2026', author: 'Admin' },
  { id: 5, title: 'School Sports Day Announced', content: 'The annual school sports day will be on March 20, 2026. Students should sign up for events through their class monitors.', audience: 'All', priority: 'Medium', date: 'Feb 8, 2026', author: 'Admin' },
]

export default function Announcements() {
  const toast = useToast()
  const confirm = useConfirm()
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '', audience: 'All', priority: 'Medium' })
  const [filterAudience, setFilterAudience] = useState('All')

  const filtered = filterAudience === 'All'
    ? announcements
    : announcements.filter(a => a.audience === filterAudience || a.audience === 'All')

  const handlePost = () => {
    if (!formData.title.trim() || !formData.content.trim()) return toast.error('Please fill in all fields')
    setAnnouncements([{
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Admin'
    }, ...announcements])
    setShowModal(false)
    setFormData({ title: '', content: '', audience: 'All', priority: 'Medium' })
    toast.success(`Announcement "${formData.title}" posted successfully!`)
  }

  const handleDelete = async (id) => {
    const ann = announcements.find(a => a.id === id)
    const ok = await confirm('Delete Announcement', `Delete "${ann?.title}"? This cannot be undone.`)
    if (ok) {
      setAnnouncements(announcements.filter(a => a.id !== id))
      toast.success('Announcement deleted')
    }
  }

  const getPriorityColor = (p) => {
    if (p === 'High') return 'danger'
    if (p === 'Medium') return 'warning'
    return 'info'
  }

  const getAudienceIcon = (a) => {
    if (a === 'Students') return '🎓'
    if (a === 'Faculty') return '👨‍🏫'
    return '🏫'
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📢 Announcements</h1>
        <p>Create and manage school-wide announcements</p>
      </div>

      <div className="toolbar">
        <div className="tabs">
          {['All', 'Students', 'Faculty'].map(a => (
            <button key={a} className={`tab-btn ${filterAudience === a ? 'active' : ''}`} onClick={() => setFilterAudience(a)}>
              {a === 'All' ? '🏫' : a === 'Students' ? '🎓' : '👨‍🏫'} {a}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>📝 New Announcement</button>
      </div>

      <div className="announcements-list">
        {filtered.map(ann => (
          <div key={ann.id} className={`announcement-card priority-${ann.priority.toLowerCase()}`}>
            <div className="ann-header">
              <div className="ann-meta">
                <span className={`badge ${getPriorityColor(ann.priority)}`}>{ann.priority}</span>
                <span className="ann-audience">{getAudienceIcon(ann.audience)} {ann.audience}</span>
              </div>
              <span className="ann-date">📅 {ann.date}</span>
            </div>
            <h3 className="ann-title">{ann.title}</h3>
            <p className="ann-content">{ann.content}</p>
            <div className="ann-footer">
              <span className="ann-author">Posted by {ann.author}</span>
              <div className="ann-actions">
                <button className="btn btn-sm btn-secondary">✏️ Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ann.id)}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>📝 New Announcement</h2>
            <p className="modal-subtitle">This will be visible to selected audience on the e-portal</p>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-control" placeholder="Announcement title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows={5} placeholder="Write the announcement..." value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Target Audience</label>
                <select className="form-control" value={formData.audience} onChange={e => setFormData({ ...formData, audience: e.target.value })}>
                  <option>All</option>
                  <option>Students</option>
                  <option>Faculty</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-control" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePost}>📢 Post Announcement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
