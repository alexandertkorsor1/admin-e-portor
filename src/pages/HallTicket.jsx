import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import './HallTicket.css'

const allStudents = [
  { id: 1, name: 'Abraham Kollie', admission: 'STU-2024-001', grade: '12A', attendance: 96, currentGrade: 92, feeStatus: 'Paid', phone: '0886-111-222' },
  { id: 2, name: 'Fatu Massaquoi', admission: 'STU-2024-002', grade: '11B', attendance: 94, currentGrade: 89, feeStatus: 'Paid', phone: '0775-222-333' },
  { id: 3, name: 'Moses Johnson', admission: 'STU-2024-003', grade: '10A', attendance: 88, currentGrade: 78, feeStatus: 'Pending', phone: '0886-333-444' },
  { id: 4, name: 'Comfort Saye', admission: 'STU-2024-004', grade: '12A', attendance: 97, currentGrade: 86, feeStatus: 'Paid', phone: '0775-444-555' },
  { id: 5, name: 'Emmanuel Dolo', admission: 'STU-2024-005', grade: '9C', attendance: 62, currentGrade: 58, feeStatus: 'Overdue', phone: '0886-555-666' },
  { id: 6, name: 'Grace Mabor', admission: 'STU-2024-006', grade: '10B', attendance: 72, currentGrade: 44, feeStatus: 'Pending', phone: '0775-666-777' },
  { id: 7, name: 'Joseph Kamara', admission: 'STU-2024-007', grade: '11A', attendance: 91, currentGrade: 84, feeStatus: 'Paid', phone: '0886-777-888' },
  { id: 8, name: 'Martha Togba', admission: 'STU-2024-008', grade: '9A', attendance: 89, currentGrade: 76, feeStatus: 'Paid', phone: '0775-888-999' },
  { id: 9, name: 'Samuel Kollie', admission: 'STU-2024-009', grade: '10A', attendance: 85, currentGrade: 74, feeStatus: 'Paid', phone: '0886-999-000' },
  { id: 10, name: 'Patricia Weah', admission: 'STU-2024-010', grade: '11B', attendance: 92, currentGrade: 81, feeStatus: 'Paid', phone: '0775-000-111' },
  { id: 11, name: 'David Flomo', admission: 'STU-2024-011', grade: '12A', attendance: 90, currentGrade: 77, feeStatus: 'Paid', phone: '0886-010-020' },
  { id: 12, name: 'Hannah Dolo', admission: 'STU-2024-012', grade: '9B', attendance: 55, currentGrade: 42, feeStatus: 'Overdue', phone: '0775-030-040' },
  { id: 13, name: 'Peter Gbowee', admission: 'STU-2024-013', grade: '10A', attendance: 78, currentGrade: 80, feeStatus: 'Paid', phone: '0886-050-060' },
  { id: 14, name: 'Ruth Cooper', admission: 'STU-2024-014', grade: '11A', attendance: 74, currentGrade: 76, feeStatus: 'Paid', phone: '0775-070-080' },
  { id: 15, name: 'James Togba', admission: 'STU-2024-015', grade: '12A', attendance: 70, currentGrade: 72, feeStatus: 'Pending', phone: '0886-090-100' },
]

const MIN_ATTENDANCE = 75
const MIN_GRADE = 75

export default function HallTicket() {
  const toast = useToast()
  const confirm = useConfirm()
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [approved, setApproved] = useState(() => {
    const auto = {}
    allStudents.forEach(s => { auto[s.id] = s.attendance >= MIN_ATTENDANCE && s.currentGrade >= MIN_GRADE })
    return auto
  })
  const [generated, setGenerated] = useState({})
  const [showTicketPreview, setShowTicketPreview] = useState(null)

  const meetsRequirements = (s) => s.attendance >= MIN_ATTENDANCE && s.currentGrade >= MIN_GRADE
  const grades = ['All', ...new Set(allStudents.map(s => s.grade))].sort()

  const filtered = allStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.admission.toLowerCase().includes(searchTerm.toLowerCase())
    const matchGrade = filterGrade === 'All' || s.grade === filterGrade
    const matchStatus = filterStatus === 'All' ||
      (filterStatus === 'Eligible' && meetsRequirements(s)) ||
      (filterStatus === 'Not Eligible' && !meetsRequirements(s)) ||
      (filterStatus === 'Approved' && approved[s.id]) ||
      (filterStatus === 'Generated' && generated[s.id])
    return matchSearch && matchGrade && matchStatus
  })

  const eligibleCount = allStudents.filter(meetsRequirements).length
  const approvedCount = Object.values(approved).filter(Boolean).length
  const generatedCount = Object.values(generated).filter(Boolean).length

  const toggleApproval = (id) => {
    setApproved(p => ({ ...p, [id]: !p[id] }))
    const s = allStudents.find(x => x.id === id)
    if (!approved[id]) {
      toast.success(`${s.name} approved for hall ticket`)
    } else {
      toast.info(`${s.name} approval revoked`)
    }
  }

  const approveAllEligible = () => {
    const next = { ...approved }
    allStudents.forEach(s => { if (meetsRequirements(s)) next[s.id] = true })
    setApproved(next)
    toast.success(`All eligible students approved (${eligibleCount})`)
  }

  const revokeAll = async () => {
    const ok = await confirm('Revoke All', 'Revoke approval for all students?')
    if (ok) {
      const next = {}
      allStudents.forEach(s => { next[s.id] = false })
      setApproved(next)
      setGenerated({})
      toast.success('All approvals revoked')
    }
  }

  const generateTickets = async () => {
    const approvedStudents = allStudents.filter(s => approved[s.id] && !generated[s.id])
    if (approvedStudents.length === 0) return toast.error('No new students to generate tickets for')
    const ok = await confirm('Generate Hall Tickets', `Generate tickets for ${approvedStudents.length} approved students?`)
    if (ok) {
      const next = { ...generated }
      approvedStudents.forEach(s => { next[s.id] = true })
      setGenerated(next)
      toast.success(`${approvedStudents.length} hall tickets generated!`)
    }
  }

  const viewTicket = (student) => setShowTicketPreview(student)

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🎫 Exam Hall Tickets</h1>
        <p>Verify eligibility, approve students, and generate downloadable exam hall tickets</p>
      </div>

      {/* Requirements Banner */}
      <div className="ht-requirements-banner">
        <div className="ht-req-content">
          <h3>📜 Hall Ticket Eligibility Requirements</h3>
          <div className="ht-req-list">
            <div className="ht-req-item">
              <span className="ht-req-icon">📊</span>
              <div>
                <strong>Current Period Grade ≥ {MIN_GRADE}%</strong>
                <span>Average across all subjects for the current semester</span>
              </div>
            </div>
            <div className="ht-req-item">
              <span className="ht-req-icon">📋</span>
              <div>
                <strong>Attendance ≥ {MIN_ATTENDANCE}%</strong>
                <span>Total attendance percentage for the current period</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ht-req-note">
          <span>⚠️</span> Admin can override and approve/revoke students manually
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card purple animate-in"><div className="stat-icon">🎓</div><div className="stat-info"><h4>Total Students</h4><div className="stat-value">{allStudents.length}</div><div className="stat-change">All enrolled</div></div></div>
        <div className="stat-card success animate-in"><div className="stat-icon">✅</div><div className="stat-info"><h4>Auto-Eligible</h4><div className="stat-value">{eligibleCount}</div><div className="stat-change positive">Meet both requirements</div></div></div>
        <div className="stat-card info animate-in"><div className="stat-icon">👍</div><div className="stat-info"><h4>Approved</h4><div className="stat-value">{approvedCount}</div><div className="stat-change">By admin</div></div></div>
        <div className="stat-card accent animate-in"><div className="stat-icon">🎫</div><div className="stat-info"><h4>Tickets Generated</h4><div className="stat-value">{generatedCount}</div><div className="stat-change positive">Ready to download</div></div></div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search student name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="toolbar-filters">
          <select className="form-control" value={filterGrade} onChange={e => setFilterGrade(e.target.value)} style={{ width: 'auto' }}>
            {grades.map(g => <option key={g} value={g}>{g === 'All' ? '📚 All Grades' : `Grade ${g}`}</option>)}
          </select>
          <select className="form-control" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">📋 All Status</option>
            <option value="Eligible">✅ Eligible</option>
            <option value="Not Eligible">❌ Not Eligible</option>
            <option value="Approved">👍 Approved</option>
            <option value="Generated">🎫 Generated</option>
          </select>
        </div>
      </div>

      {/* Admin Control Bar */}
      <div className="ht-control-bar">
        <div className="ht-control-left">
          <button className="btn btn-success" onClick={approveAllEligible}>✅ Approve All Eligible</button>
          <button className="btn btn-danger" onClick={revokeAll}>🚫 Revoke All</button>
        </div>
        <div className="ht-control-right">
          <button className="btn btn-primary" onClick={generateTickets}>🎫 Generate Hall Tickets ({approvedCount - generatedCount > 0 ? approvedCount - generatedCount : 0} pending)</button>
        </div>
      </div>

      {/* Student Table */}
      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Grade</th>
              <th>Current Score</th>
              <th>Attendance</th>
              <th>Eligibility</th>
              <th>Admin Action</th>
              <th>Ticket</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => {
              const eligible = meetsRequirements(s)
              const isApproved = approved[s.id]
              const isGenerated = generated[s.id]
              return (
                <tr key={s.id} className={!eligible && !isApproved ? 'row-ineligible' : ''}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="student-cell">
                      <div className={`student-avatar ${!eligible && !isApproved ? 'avatar-ineligible' : ''}`}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <div className="student-name">{s.name}</div>
                        <div className="student-phone">{s.admission}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.grade}</td>
                  <td>
                    <div className="ht-score-cell">
                      <div className={`ht-score-value ${s.currentGrade >= MIN_GRADE ? 'ht-pass' : 'ht-fail'}`}>{s.currentGrade}%</div>
                      <div className="mini-progress"><div className="mini-progress-fill" style={{ width: `${s.currentGrade}%`, background: s.currentGrade >= MIN_GRADE ? 'var(--success)' : 'var(--danger)' }}></div></div>
                      {s.currentGrade >= MIN_GRADE ? <span className="ht-check">✅</span> : <span className="ht-cross">❌</span>}
                    </div>
                  </td>
                  <td>
                    <div className="ht-score-cell">
                      <div className={`ht-score-value ${s.attendance >= MIN_ATTENDANCE ? 'ht-pass' : 'ht-fail'}`}>{s.attendance}%</div>
                      <div className="mini-progress"><div className="mini-progress-fill" style={{ width: `${s.attendance}%`, background: s.attendance >= MIN_ATTENDANCE ? 'var(--success)' : 'var(--danger)' }}></div></div>
                      {s.attendance >= MIN_ATTENDANCE ? <span className="ht-check">✅</span> : <span className="ht-cross">❌</span>}
                    </div>
                  </td>
                  <td>
                    {eligible
                      ? <span className="badge pass">✅ Eligible</span>
                      : <span className="badge fail">❌ Not Eligible</span>
                    }
                    {!eligible && isApproved && <span className="badge admin" style={{ marginLeft: 4 }}>🔓 Override</span>}
                  </td>
                  <td>
                    <label className="ht-toggle-label">
                      <input type="checkbox" checked={isApproved} onChange={() => toggleApproval(s.id)} />
                      <span className="ht-toggle-slider"></span>
                      <span className="ht-toggle-text">{isApproved ? 'Approved' : 'Approve'}</span>
                    </label>
                  </td>
                  <td>
                    {isGenerated ? (
                      <div className="ht-ticket-actions">
                        <button className="btn btn-sm btn-accent" onClick={() => viewTicket(s)}>👁️ View</button>
                        <button className="btn btn-sm btn-primary" onClick={() => toast.success(`Downloading ticket for ${s.name}...`)}>📥</button>
                      </div>
                    ) : isApproved ? (
                      <span className="badge pending">⏳ Pending</span>
                    ) : (
                      <span className="badge inactive">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="table-footer">Showing {filtered.length} of {allStudents.length} students</div>

      {/* Hall Ticket Preview Modal */}
      {showTicketPreview && (
        <div className="modal-overlay" onClick={() => setShowTicketPreview(null)}>
          <div className="modal-content ht-ticket-modal" onClick={e => e.stopPropagation()}>
            <div className="ht-ticket">
              <div className="ht-ticket-header">
                <div className="ht-ticket-logo">🏫</div>
                <div>
                  <h2>Foya Free Pentecostal Mission High School</h2>
                  <p>EXAMINATION HALL TICKET</p>
                  <span className="ht-ticket-term">Second Semester Mid-Term — 2025-2026</span>
                </div>
              </div>
              <div className="ht-ticket-divider"></div>
              <div className="ht-ticket-body">
                <div className="ht-ticket-row"><span>Student Name</span><strong>{showTicketPreview.name}</strong></div>
                <div className="ht-ticket-row"><span>Admission No.</span><strong>{showTicketPreview.admission}</strong></div>
                <div className="ht-ticket-row"><span>Grade / Class</span><strong>{showTicketPreview.grade}</strong></div>
                <div className="ht-ticket-row"><span>Current Score</span><strong>{showTicketPreview.currentGrade}%</strong></div>
                <div className="ht-ticket-row"><span>Attendance</span><strong>{showTicketPreview.attendance}%</strong></div>
                <div className="ht-ticket-row"><span>Status</span><strong style={{ color: 'var(--success)' }}>✅ APPROVED</strong></div>
              </div>
              <div className="ht-ticket-divider"></div>
              <div className="ht-ticket-footer">
                <div className="ht-ticket-stamp">
                  <span>🔏</span>
                  <div>
                    <strong>Authorized</strong>
                    <span>Admin Office</span>
                  </div>
                </div>
                <div className="ht-ticket-date">
                  <span>Issued: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="ht-ticket-id">TKT-{showTicketPreview.admission.split('-').pop()}-2026</span>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowTicketPreview(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => { toast.success(`Downloading hall ticket for ${showTicketPreview.name}...`); setShowTicketPreview(null) }}>📥 Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
