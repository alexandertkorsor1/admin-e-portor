import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import './FeeManagement.css'

const initialFees = [
  { id: 1, student: 'Abraham Kollie', admission: 'STU-2024-001', grade: '12A', totalFee: 500, paid: 500, currency: 'USD', status: 'Paid', date: 'Jan 15, 2026', method: 'Cash' },
  { id: 2, student: 'Fatu Massaquoi', admission: 'STU-2024-002', grade: '11B', totalFee: 450, paid: 450, currency: 'USD', status: 'Paid', date: 'Jan 20, 2026', method: 'Mobile Money' },
  { id: 3, student: 'Moses Johnson', admission: 'STU-2024-003', grade: '10A', totalFee: 400, paid: 200, currency: 'USD', status: 'Pending', date: 'Feb 5, 2026', method: 'Cash' },
  { id: 4, student: 'Comfort Saye', admission: 'STU-2024-004', grade: '12A', totalFee: 500, paid: 500, currency: 'USD', status: 'Paid', date: 'Jan 10, 2026', method: 'Bank Transfer' },
  { id: 5, student: 'Emmanuel Dolo', admission: 'STU-2024-005', grade: '9C', totalFee: 350, paid: 0, currency: 'USD', status: 'Overdue', date: '—', method: '—' },
  { id: 6, student: 'Grace Mabor', admission: 'STU-2024-006', grade: '10B', totalFee: 400, paid: 150, currency: 'USD', status: 'Pending', date: 'Feb 10, 2026', method: 'Cash' },
  { id: 7, student: 'Joseph Kamara', admission: 'STU-2024-007', grade: '11A', totalFee: 450, paid: 450, currency: 'USD', status: 'Paid', date: 'Jan 25, 2026', method: 'Mobile Money' },
  { id: 8, student: 'Martha Togba', admission: 'STU-2024-008', grade: '9A', totalFee: 350, paid: 350, currency: 'USD', status: 'Paid', date: 'Feb 1, 2026', method: 'Cash' },
]

export default function FeeManagement() {
  const toast = useToast()
  const [fees] = useState(initialFees)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const totalCollected = fees.reduce((s, f) => s + f.paid, 0)
  const totalExpected = fees.reduce((s, f) => s + f.totalFee, 0)
  const totalPending = totalExpected - totalCollected
  const paidCount = fees.filter(f => f.status === 'Paid').length
  const overdueCount = fees.filter(f => f.status === 'Overdue').length

  const filtered = fees.filter(f => {
    const matchSearch = f.student.toLowerCase().includes(searchTerm.toLowerCase()) || f.admission.includes(searchTerm)
    const matchStatus = filterStatus === 'All' || f.status === filterStatus
    return matchSearch && matchStatus
  })

  const openPayment = (student) => {
    setSelectedStudent(student)
    setShowPayModal(true)
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>💰 Fee Management</h1>
        <p>Track payments, generate invoices, and manage fee structures</p>
      </div>

      {/* Fee Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card success animate-in">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <h4>Total Collected</h4>
            <div className="stat-value">${totalCollected.toLocaleString()}</div>
            <div className="stat-change positive">{paidCount} students paid</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h4>Pending Amount</h4>
            <div className="stat-value">${totalPending.toLocaleString()}</div>
            <div className="stat-change negative">{fees.filter(f => f.status === 'Pending').length} students</div>
          </div>
        </div>
        <div className="stat-card danger animate-in">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h4>Overdue</h4>
            <div className="stat-value">{overdueCount}</div>
            <div className="stat-change negative">Needs follow-up</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Collection Rate</h4>
            <div className="stat-value">{Math.round((totalCollected / totalExpected) * 100)}%</div>
            <div className="stat-change positive">Of total expected</div>
          </div>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="card fee-progress-card">
        <div className="card-header">
          <h3>📊 Overall Collection Progress</h3>
          <span className="fee-total">${totalCollected.toLocaleString()} / ${totalExpected.toLocaleString()}</span>
        </div>
        <div className="fee-progress-bar">
          <div className="fee-progress-fill" style={{ width: `${(totalCollected / totalExpected) * 100}%` }}>
            <span>{Math.round((totalCollected / totalExpected) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ marginTop: 'var(--sp-lg)' }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search student name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="toolbar-filters">
          <div className="tabs">
            {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
              <button key={s} className={`tab-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
                {s} {s !== 'All' && `(${fees.filter(f => f.status === s).length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Last Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(fee => (
              <tr key={fee.id}>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">{fee.student.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div className="student-name">{fee.student}</div>
                      <div className="student-phone">{fee.admission}</div>
                    </div>
                  </div>
                </td>
                <td>{fee.grade}</td>
                <td><strong>${fee.totalFee}</strong></td>
                <td style={{ color: 'var(--success)', fontWeight: 600 }}>${fee.paid}</td>
                <td style={{ color: fee.totalFee - fee.paid > 0 ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                  ${fee.totalFee - fee.paid}
                </td>
                <td><span className={`badge ${fee.status.toLowerCase()}`}>{fee.status}</span></td>
                <td>{fee.date}</td>
                <td>
                  <div className="action-btns">
                    {fee.status !== 'Paid' && (
                      <button className="btn btn-sm btn-success" onClick={() => openPayment(fee)}>💳 Record</button>
                    )}
                    <button className="btn btn-sm btn-secondary">🧾</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPayModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>💳 Record Payment</h2>
            <p className="modal-subtitle">Recording payment for {selectedStudent.student}</p>
            <div className="form-group">
              <label className="form-label">Student</label>
              <input className="form-control" value={selectedStudent.student} disabled />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Outstanding Balance</label>
                <input className="form-control" value={`$${selectedStudent.totalFee - selectedStudent.paid}`} disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Amount Paying</label>
                <input className="form-control" type="number" placeholder="Enter amount" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select className="form-control">
                <option>Cash</option>
                <option>Mobile Money</option>
                <option>Bank Transfer</option>
                <option>Check</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowPayModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { toast.success(`Payment recorded for ${selectedStudent.student}!`); setShowPayModal(false) }}>✅ Confirm Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
