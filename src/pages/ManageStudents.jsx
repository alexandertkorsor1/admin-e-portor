import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import './ManageStudents.css'

const initialStudents = [
  { id: 1, name: 'Abraham Kollie', admission: 'STU-2024-001', grade: '12th', section: 'Science', gender: 'Male', status: 'Active', attendance: 96, feesStatus: 'Paid', phone: '0886-111-222' },
  { id: 2, name: 'Fatu Massaquoi', admission: 'STU-2024-002', grade: '11th', section: 'Arts', gender: 'Female', status: 'Active', attendance: 91, feesStatus: 'Paid', phone: '0775-222-333' },
  { id: 3, name: 'Moses Johnson', admission: 'STU-2024-003', grade: '10th', section: 'Science', gender: 'Male', status: 'Active', attendance: 89, feesStatus: 'Pending', phone: '0886-333-444' },
  { id: 4, name: 'Comfort Saye', admission: 'STU-2024-004', grade: '12th', section: 'Science', gender: 'Female', status: 'Active', attendance: 94, feesStatus: 'Paid', phone: '0775-444-555' },
  { id: 5, name: 'Emmanuel Dolo', admission: 'STU-2024-005', grade: '9th', section: 'General', gender: 'Male', status: 'Active', attendance: 87, feesStatus: 'Overdue', phone: '0886-555-666' },
  { id: 6, name: 'Grace Mabor', admission: 'STU-2024-006', grade: '10th', section: 'Arts', gender: 'Female', status: 'Inactive', attendance: 72, feesStatus: 'Pending', phone: '0775-666-777' },
  { id: 7, name: 'Joseph Kamara', admission: 'STU-2024-007', grade: '11th', section: 'Science', gender: 'Male', status: 'Active', attendance: 93, feesStatus: 'Paid', phone: '0886-777-888' },
  { id: 8, name: 'Martha Togba', admission: 'STU-2024-008', grade: '9th', section: 'General', gender: 'Female', status: 'Active', attendance: 88, feesStatus: 'Paid', phone: '0775-888-999' },
]

export default function ManageStudents() {
  const toast = useToast()
  const confirm = useConfirm()
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [formData, setFormData] = useState({
    name: '', admission: '', grade: 'ABC', section: 'General', gender: 'Male', phone: '', status: 'Active'
  })

  const grades = ['All', 'ABC', 'KG1', 'KG2', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
  const statuses = ['All', 'Active', 'Inactive']

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.admission.toLowerCase().includes(searchTerm.toLowerCase())
    const matchGrade = filterGrade === 'All' || s.grade === filterGrade
    const matchStatus = filterStatus === 'All' || s.status === filterStatus
    return matchSearch && matchGrade && matchStatus
  })

  const openAdd = () => {
    setEditStudent(null)
    setFormData({ name: '', admission: `STU-2024-${String(students.length + 1).padStart(3, '0')}`, grade: 'ABC', section: 'General', gender: 'Male', phone: '', status: 'Active' })
    setShowModal(true)
  }

  const openEdit = (student) => {
    setEditStudent(student)
    setFormData({ ...student })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return toast.error('Please enter student name')
    if (editStudent) {
      setStudents(students.map(s => s.id === editStudent.id ? { ...s, ...formData } : s))
      toast.success(`Student "${formData.name}" updated successfully`)
    } else {
      setStudents([...students, { ...formData, id: Date.now(), attendance: 0, feesStatus: 'Pending' }])
      toast.success(`Student "${formData.name}" added successfully`)
    }
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    const student = students.find(s => s.id === id)
    const ok = await confirm('Remove Student', `Are you sure you want to remove ${student?.name}? This action cannot be undone.`)
    if (ok) {
      setStudents(students.filter(s => s.id !== id))
      toast.success(`Student "${student?.name}" removed successfully`)
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🎓 Manage Students</h1>
        <p>View, add, and manage all student records</p>
      </div>

      {/* Stats Row */}
      <div className="mini-stats-row">
        <div className="mini-stat">
          <span className="mini-stat-value">{students.length}</span>
          <span className="mini-stat-label">Total Students</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{students.filter(s => s.status === 'Active').length}</span>
          <span className="mini-stat-label">Active</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{students.filter(s => s.feesStatus === 'Paid').length}</span>
          <span className="mini-stat-label">Fees Cleared</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{Math.round(students.reduce((s, st) => s + st.attendance, 0) / students.length)}%</span>
          <span className="mini-stat-label">Avg Attendance</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-students"
          />
        </div>
        <div className="toolbar-filters">
          <select className="form-control" value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} style={{ width: 'auto' }}>
            {grades.map(g => <option key={g} value={g}>{g === 'All' ? '📚 All Grades' : `Grade ${g}`}</option>)}
          </select>
          <select className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? '📋 All Status' : s}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd} id="add-student-btn">➕ Add Student</button>
        </div>
      </div>

      {/* Table */}
      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Admission #</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Attendance</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div className="student-name">{student.name}</div>
                      <div className="student-phone">{student.phone}</div>
                    </div>
                  </div>
                </td>
                <td><code className="admission-code">{student.admission}</code></td>
                <td>{student.grade}</td>
                <td>{student.gender}</td>
                <td>
                  <div className="attendance-bar-cell">
                    <div className="mini-progress">
                      <div className="mini-progress-fill" style={{ width: `${student.attendance}%`, background: student.attendance >= 90 ? 'var(--success)' : student.attendance >= 75 ? 'var(--warning)' : 'var(--danger)' }}></div>
                    </div>
                    <span>{student.attendance}%</span>
                  </div>
                </td>
                <td><span className={`badge ${student.feesStatus.toLowerCase()}`}>{student.feesStatus}</span></td>
                <td><span className={`badge ${student.status.toLowerCase()}`}>{student.status}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(student)}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No students found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <div className="table-footer">
        <span>Showing {filtered.length} of {students.length} students</span>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
            <p className="modal-subtitle">{editStudent ? 'Update student information' : 'Fill in the details to register a new student'}</p>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-control" placeholder="Enter full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Admission Number</label>
                <input className="form-control" placeholder="STU-2024-XXX" value={formData.admission} onChange={e => setFormData({ ...formData, admission: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Grade</label>
                <select className="form-control" value={formData.grade} onChange={e => setFormData({ ...formData, grade: e.target.value })}>
                  {grades.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
                </select>
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
                <label className="form-label">Gender</label>
                <select className="form-control" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-control" placeholder="0886-XXX-XXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editStudent ? 'Update Student' : 'Add Student'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
