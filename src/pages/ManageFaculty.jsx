import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import { useData } from '../context/DataContext.jsx'
import './ManageFaculty.css'

export default function ManageFaculty() {
  const { faculty, setFaculty, classes, updateFaculty, addFaculty, removeFaculty, ALL_SUBJECTS } = useData()
  const toast = useToast()
  const confirm = useConfirm()
  
  const ALL_CLASSES = classes.map(c => c.name.replace('Grade ', '')) // Use names for the dropdown/grid
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editFac, setEditFac] = useState(null)
  const [formData, setFormData] = useState({
    name: '', empId: '', subject: '', qualification: '', phone: '', status: 'Active', classes: []
  })
  const [activeStatDetail, setActiveStatDetail] = useState(null) // 'total', 'active', 'leave', 'subjects' or null

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.empId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openAdd = () => {
    setEditFac(null)
    setFormData({ name: '', empId: `FAC-${String(faculty.length + 1).padStart(3, '0')}`, subject: '', qualification: '', phone: '', status: 'Active', classes: [] })
    setShowModal(true)
  }

  const openEdit = (f) => {
    setEditFac(f)
    setFormData({ ...f })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return toast.error('Please enter faculty name')
    if (editFac) {
      updateFaculty({ ...editFac, ...formData })
      toast.success(`Faculty "${formData.name}" updated successfully`)
    } else {
      addFaculty({ ...formData, id: Date.now(), joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) })
      toast.success(`Faculty "${formData.name}" added successfully`)
    }
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    const fac = faculty.find(f => f.id === id)
    const ok = await confirm('Remove Faculty', `Are you sure you want to remove ${fac?.name}? This cannot be undone.`)
    if (ok) {
      removeFaculty(id)
      toast.success(`Faculty "${fac?.name}" removed successfully`)
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>👨‍🏫 Manage Faculty</h1>
        <p>Manage teaching staff records, assignments, and schedules</p>
      </div>

      <div className="mini-stats-row">
        <div 
          className={`mini-stat clickable-stat ${activeStatDetail === 'total' ? 'active-stat' : ''}`} 
          onClick={() => setActiveStatDetail(activeStatDetail === 'total' ? null : 'total')}
        >
          <span className="mini-stat-value">{faculty.length}</span>
          <span className="mini-stat-label">Total Faculty ▾</span>
        </div>
        <div 
          className={`mini-stat clickable-stat ${activeStatDetail === 'active' ? 'active-stat' : ''}`}
          onClick={() => setActiveStatDetail(activeStatDetail === 'active' ? null : 'active')}
        >
          <span className="mini-stat-value">{faculty.filter(f => f.status === 'Active').length}</span>
          <span className="mini-stat-label">Active ▾</span>
        </div>
        <div 
          className={`mini-stat clickable-stat ${activeStatDetail === 'leave' ? 'active-stat' : ''}`}
          onClick={() => setActiveStatDetail(activeStatDetail === 'leave' ? null : 'leave')}
        >
          <span className="mini-stat-value">{faculty.filter(f => f.status === 'On Leave').length}</span>
          <span className="mini-stat-label">On Leave ▾</span>
        </div>
        <div 
          className={`mini-stat clickable-stat ${activeStatDetail === 'subjects' ? 'active-stat' : ''}`}
          onClick={() => setActiveStatDetail(activeStatDetail === 'subjects' ? null : 'subjects')}
        >
          <span className="mini-stat-value">{new Set(faculty.map(f => f.subject)).size}</span>
          <span className="mini-stat-label">Subjects ▾</span>
        </div>
      </div>

      {/* Stats Detail Panel */}
      {activeStatDetail && (
        <div className="stat-detail-panel animate-in">
          <div className="detail-panel-header">
            <h3>
              {activeStatDetail === 'total' && 'Institition Faculty List'}
              {activeStatDetail === 'active' && 'Active Staff List'}
              {activeStatDetail === 'leave' && 'Staff On Leave'}
              {activeStatDetail === 'subjects' && 'Subjects & Teachers'}
            </h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveStatDetail(null)}>Close</button>
          </div>
          <div className="detail-panel-body">
            <div className="detail-list-grid">
              {activeStatDetail === 'subjects' ? (
                // Group by subjects
                ALL_SUBJECTS.filter(s => faculty.some(f => f.subject === s)).map(subj => (
                  <div key={subj} className="detail-subject-group">
                    <strong className="detail-subject-title">{subj}</strong>
                    <div className="detail-faculty-sublist">
                      {faculty.filter(f => f.subject === subj).map(f => (
                        <div key={f.id} className="detail-faculty-item">
                          <span className="dot"></span>
                          <span>{f.name}</span>
                          <span className={`status-dot ${f.status === 'Active' ? 'online' : 'away'}`} title={f.status}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Standard lists
                faculty
                  .filter(f => {
                    if (activeStatDetail === 'active') return f.status === 'Active'
                    if (activeStatDetail === 'leave') return f.status === 'On Leave'
                    return true
                  })
                  .map(f => (
                    <div key={f.id} className="detail-row-item">
                      <div className="detail-fac-info">
                        <strong>{f.name}</strong>
                        <span className="detail-fac-subject">{f.subject}</span>
                      </div>
                      <span className={`badge ${f.status === 'Active' ? 'active' : 'pending'}`}>{f.status}</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search faculty by name, subject, or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>➕ Add Faculty</button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="faculty-grid">
        {filtered.map(fac => (
          <div key={fac.id} className="faculty-card">
            <div className="fac-card-header">
              <div className="fac-avatar">{fac.name.split(' ').pop()[0]}</div>
              <div className="fac-header-info">
                <h3>{fac.name}</h3>
                <span className="fac-emp-id">{fac.empId}</span>
              </div>
              <span className={`badge ${fac.status === 'Active' ? 'active' : 'pending'}`}>{fac.status}</span>
            </div>
            <div className="fac-card-body">
              <div className="fac-detail-row">
                <span className="fac-detail-icon">📚</span>
                <div>
                  <span className="fac-detail-label">Subject</span>
                  <span className="fac-detail-value">{fac.subject}</span>
                </div>
              </div>
              <div className="fac-detail-row">
                <span className="fac-detail-icon">🎓</span>
                <div>
                  <span className="fac-detail-label">Qualification</span>
                  <span className="fac-detail-value">{fac.qualification}</span>
                </div>
              </div>
              <div className="fac-detail-row">
                <span className="fac-detail-icon">🏫</span>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="fac-detail-label">Assigned Classes</span>
                    <span className="fac-amount-badge">{fac.classes.length} Classes</span>
                  </div>
                  <div className="fac-classes-chips">
                    {fac.classes.map(c => <span key={c} className="class-chip">{c}</span>)}
                  </div>
                </div>
              </div>
              <div className="fac-detail-row">
                <span className="fac-detail-icon">📅</span>
                <div>
                  <span className="fac-detail-label">Joined</span>
                  <span className="fac-detail-value">{fac.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="fac-card-footer">
              <button className="btn btn-sm btn-secondary" onClick={() => openEdit(fac)}>✏️ Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(fac.id)}>🗑️ Remove</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No faculty found</h3>
          <p>Try adjusting your search</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editFac ? '✏️ Edit Faculty' : '➕ Add New Faculty'}</h2>
            <p className="modal-subtitle">{editFac ? 'Update faculty information' : 'Register a new faculty member'}</p>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-control" placeholder="Enter full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input className="form-control" placeholder="FAC-XXX" value={formData.empId} onChange={e => setFormData({ ...formData, empId: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-control" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                  <option value="">— Select Subject —</option>
                  {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Qualification</label>
                <input className="form-control" placeholder="E.g. M.Sc Mathematics" value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-control" placeholder="0886-XXX-XXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 'var(--sp-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Assigned Classes</label>
                  <span className="amount-indicator">{formData.classes.length} Selected</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn btn-sm btn-secondary" style={{ fontSize: '0.65rem', padding: '2px 8px' }} onClick={() => setFormData({ ...formData, classes: ALL_CLASSES })}>Select All</button>
                  <button type="button" className="btn btn-sm btn-secondary" style={{ fontSize: '0.65rem', padding: '2px 8px' }} onClick={() => setFormData({ ...formData, classes: [] })}>Clear</button>
                </div>
              </div>
              <div className="class-selection-grid">
                {ALL_CLASSES.map(cls => (
                  <label key={cls} className="class-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={formData.classes.includes(cls)} 
                      onChange={e => {
                        const newClasses = e.target.checked 
                          ? [...formData.classes, cls]
                          : formData.classes.filter(c => c !== cls)
                        setFormData({ ...formData, classes: newClasses })
                      }}
                    />
                    <span>{cls}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editFac ? 'Update Faculty' : 'Add Faculty'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
