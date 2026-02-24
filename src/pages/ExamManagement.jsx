import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'
import './ExamManagement.css'

const SUBJECTS_ALL = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design', 'PE', 'ICT', 'French']
const GRADES_ALL = ['9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A', '12B']

const examScheduleDetail = [
  { subject: 'Mathematics', date: '2026-03-05', time: '08:00 - 10:00', room: 'Hall A', invigilator: 'Mr. Peter Weah' },
  { subject: 'English', date: '2026-03-06', time: '08:00 - 10:00', room: 'Hall B', invigilator: 'Mrs. Sarah Gbowee' },
  { subject: 'Science', date: '2026-03-07', time: '08:00 - 10:30', room: 'Lab 1', invigilator: 'Mr. David Cooper' },
  { subject: 'History', date: '2026-03-09', time: '08:00 - 09:30', room: 'Hall A', invigilator: 'Ms. Ruth Togba' },
  { subject: 'Geography', date: '2026-03-10', time: '08:00 - 09:30', room: 'Hall B', invigilator: 'Mr. James Kollie' },
  { subject: 'Art & Design', date: '2026-03-11', time: '10:00 - 12:00', room: 'Art Room', invigilator: 'Mrs. Agnes Flomo' },
]

const eligibleStudents = [
  { name: 'Abraham Kollie', grade: '12A', admission: 'STU-2024-001', feeStatus: 'Paid', attendance: 96, eligible: true },
  { name: 'Fatu Massaquoi', grade: '11B', admission: 'STU-2024-002', feeStatus: 'Paid', attendance: 94, eligible: true },
  { name: 'Moses Johnson', grade: '10A', admission: 'STU-2024-003', feeStatus: 'Pending', attendance: 88, eligible: true },
  { name: 'Comfort Saye', grade: '12A', admission: 'STU-2024-004', feeStatus: 'Paid', attendance: 97, eligible: true },
  { name: 'Emmanuel Dolo', grade: '9C', admission: 'STU-2024-005', feeStatus: 'Overdue', attendance: 62, eligible: false },
  { name: 'Grace Mabor', grade: '10B', admission: 'STU-2024-006', feeStatus: 'Pending', attendance: 78, eligible: true },
  { name: 'Joseph Kamara', grade: '11A', admission: 'STU-2024-007', feeStatus: 'Paid', attendance: 91, eligible: true },
  { name: 'Martha Togba', grade: '9A', admission: 'STU-2024-008', feeStatus: 'Paid', attendance: 89, eligible: true },
  { name: 'Samuel Kollie', grade: '10A', admission: 'STU-2024-009', feeStatus: 'Paid', attendance: 85, eligible: true },
  { name: 'Patricia Weah', grade: '11B', admission: 'STU-2024-010', feeStatus: 'Paid', attendance: 92, eligible: true },
  { name: 'David Flomo', grade: '12A', admission: 'STU-2024-011', feeStatus: 'Paid', attendance: 90, eligible: true },
  { name: 'Hannah Dolo', grade: '9B', admission: 'STU-2024-012', feeStatus: 'Overdue', attendance: 55, eligible: false },
]

const resultsBySubject = {
  Mathematics: [
    { student: 'Abraham Kollie', grade: '12A', score: 96, outOf: 100, grade_letter: 'A+', remark: 'Excellent' },
    { student: 'Comfort Saye', grade: '12A', score: 92, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Joseph Kamara', grade: '11A', score: 88, outOf: 100, grade_letter: 'A', remark: 'Very Good' },
    { student: 'Fatu Massaquoi', grade: '11B', score: 85, outOf: 100, grade_letter: 'B+', remark: 'Very Good' },
    { student: 'Patricia Weah', grade: '11B', score: 82, outOf: 100, grade_letter: 'B+', remark: 'Good' },
    { student: 'David Flomo', grade: '12A', score: 79, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Moses Johnson', grade: '10A', score: 78, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Samuel Kollie', grade: '10A', score: 74, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Martha Togba', grade: '9A', score: 72, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Grace Mabor', grade: '10B', score: 42, outOf: 100, grade_letter: 'F', remark: 'Fail' },
  ],
  English: [
    { student: 'Fatu Massaquoi', grade: '11B', score: 94, outOf: 100, grade_letter: 'A+', remark: 'Excellent' },
    { student: 'Abraham Kollie', grade: '12A', score: 88, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Comfort Saye', grade: '12A', score: 86, outOf: 100, grade_letter: 'B+', remark: 'Very Good' },
    { student: 'Joseph Kamara', grade: '11A', score: 82, outOf: 100, grade_letter: 'B+', remark: 'Good' },
    { student: 'Patricia Weah', grade: '11B', score: 80, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'David Flomo', grade: '12A', score: 76, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Moses Johnson', grade: '10A', score: 72, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Martha Togba', grade: '9A', score: 68, outOf: 100, grade_letter: 'C+', remark: 'Satisfactory' },
    { student: 'Samuel Kollie', grade: '10A', score: 65, outOf: 100, grade_letter: 'C', remark: 'Average' },
    { student: 'Grace Mabor', grade: '10B', score: 38, outOf: 100, grade_letter: 'F', remark: 'Fail' },
  ],
  Science: [
    { student: 'Abraham Kollie', grade: '12A', score: 92, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Joseph Kamara', grade: '11A', score: 90, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Fatu Massaquoi', grade: '11B', score: 88, outOf: 100, grade_letter: 'A', remark: 'Very Good' },
    { student: 'Moses Johnson', grade: '10A', score: 85, outOf: 100, grade_letter: 'B+', remark: 'Very Good' },
    { student: 'Comfort Saye', grade: '12A', score: 80, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Patricia Weah', grade: '11B', score: 77, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Martha Togba', grade: '9A', score: 75, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'David Flomo', grade: '12A', score: 71, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Samuel Kollie', grade: '10A', score: 68, outOf: 100, grade_letter: 'C+', remark: 'Satisfactory' },
    { student: 'Grace Mabor', grade: '10B', score: 45, outOf: 100, grade_letter: 'F', remark: 'Fail' },
  ],
  History: [
    { student: 'Comfort Saye', grade: '12A', score: 88, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Abraham Kollie', grade: '12A', score: 85, outOf: 100, grade_letter: 'B+', remark: 'Very Good' },
    { student: 'Fatu Massaquoi', grade: '11B', score: 91, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Joseph Kamara', grade: '11A', score: 76, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Patricia Weah', grade: '11B', score: 73, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Martha Togba', grade: '9A', score: 70, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Moses Johnson', grade: '10A', score: 68, outOf: 100, grade_letter: 'C+', remark: 'Satisfactory' },
    { student: 'David Flomo', grade: '12A', score: 64, outOf: 100, grade_letter: 'C', remark: 'Average' },
    { student: 'Samuel Kollie', grade: '10A', score: 58, outOf: 100, grade_letter: 'C-', remark: 'Below Average' },
    { student: 'Grace Mabor', grade: '10B', score: 35, outOf: 100, grade_letter: 'F', remark: 'Fail' },
  ],
  Geography: [
    { student: 'Abraham Kollie', grade: '12A', score: 90, outOf: 100, grade_letter: 'A', remark: 'Excellent' },
    { student: 'Fatu Massaquoi', grade: '11B', score: 87, outOf: 100, grade_letter: 'B+', remark: 'Very Good' },
    { student: 'Joseph Kamara', grade: '11A', score: 84, outOf: 100, grade_letter: 'B+', remark: 'Good' },
    { student: 'Comfort Saye', grade: '12A', score: 82, outOf: 100, grade_letter: 'B+', remark: 'Good' },
    { student: 'Patricia Weah', grade: '11B', score: 79, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'Moses Johnson', grade: '10A', score: 74, outOf: 100, grade_letter: 'B', remark: 'Good' },
    { student: 'David Flomo', grade: '12A', score: 70, outOf: 100, grade_letter: 'B-', remark: 'Satisfactory' },
    { student: 'Martha Togba', grade: '9A', score: 66, outOf: 100, grade_letter: 'C+', remark: 'Satisfactory' },
    { student: 'Samuel Kollie', grade: '10A', score: 62, outOf: 100, grade_letter: 'C', remark: 'Average' },
    { student: 'Grace Mabor', grade: '10B', score: 40, outOf: 100, grade_letter: 'F', remark: 'Fail' },
  ],
}

const initialExams = [
  {
    id: 1, name: 'Mid-Term Examination', type: 'Mid-Term', status: 'Completed',
    startDate: '2026-01-15', endDate: '2026-01-22', totalMarks: 100,
    grades: ['9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A'],
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography'],
    passRate: 87, avgScore: 72, topScorer: 'Abraham Kollie (96%)',
    totalStudents: 247, passed: 215, failed: 32,
  },
  {
    id: 2, name: 'First Semester Final', type: 'Final', status: 'Completed',
    startDate: '2025-12-10', endDate: '2025-12-20', totalMarks: 100,
    grades: ['9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A'],
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design'],
    passRate: 84, avgScore: 69, topScorer: 'Fatu Massaquoi (94%)',
    totalStudents: 245, passed: 206, failed: 39,
  },
  {
    id: 3, name: 'Second Semester Mid-Term', type: 'Mid-Term', status: 'Upcoming',
    startDate: '2026-03-05', endDate: '2026-03-12', totalMarks: 100,
    grades: ['9A', '9B', '9C', '10A', '10B', '11A', '11B', '12A'],
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design'],
    passRate: null, avgScore: null, topScorer: null,
    totalStudents: 247, passed: null, failed: null,
  },
]

export default function ExamManagement() {
  const toast = useToast()
  const confirm = useConfirm()
  const [exams, setExams] = useState(initialExams)
  const [activeTab, setActiveTab] = useState('schedule')
  const [showModal, setShowModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [viewPanel, setViewPanel] = useState(null) // 'schedule-detail', 'eligible', 'results'
  const [formData, setFormData] = useState({
    name: '', type: 'Mid-Term', startDate: '', endDate: '', totalMarks: 100,
    grades: [], subjects: [],
  })

  const toggleGrade = (g) => setFormData(p => ({ ...p, grades: p.grades.includes(g) ? p.grades.filter(x => x !== g) : [...p.grades, g] }))
  const toggleSubject = (s) => setFormData(p => ({ ...p, subjects: p.subjects.includes(s) ? p.subjects.filter(x => x !== s) : [...p.subjects, s] }))

  const handleCreate = () => {
    if (!formData.name.trim() || !formData.startDate || !formData.endDate) return toast.error('Please fill exam name and dates')
    if (formData.grades.length === 0) return toast.error('Select at least one grade')
    if (formData.subjects.length === 0) return toast.error('Select at least one subject')
    setExams([...exams, { ...formData, id: Date.now(), status: 'Upcoming', passRate: null, avgScore: null, topScorer: null, totalStudents: 247, passed: null, failed: null }])
    setShowModal(false)
    setFormData({ name: '', type: 'Mid-Term', startDate: '', endDate: '', totalMarks: 100, grades: [], subjects: [] })
    toast.success(`Exam "${formData.name}" scheduled successfully!`)
  }

  const handleDelete = async (id) => {
    const ok = await confirm('Delete Exam', 'Are you sure? This action cannot be undone.')
    if (ok) { setExams(exams.filter(e => e.id !== id)); toast.success('Exam deleted successfully') }
  }

  const openScheduleDetail = (exam) => { setSelectedExam(exam); setViewPanel('schedule-detail') }
  const openEligible = (exam) => { setSelectedExam(exam); setViewPanel('eligible') }
  const openSubjectResults = (exam, subject) => { setSelectedExam(exam); setSelectedSubject(subject); setViewPanel('results') }

  const getGradeLetter = (score) => {
    if (score >= 90) return { letter: 'A+', color: '#10b981' }
    if (score >= 80) return { letter: 'A', color: '#22c55e' }
    if (score >= 75) return { letter: 'B+', color: '#84cc16' }
    if (score >= 70) return { letter: 'B', color: '#eab308' }
    if (score >= 65) return { letter: 'B-', color: '#f59e0b' }
    if (score >= 60) return { letter: 'C+', color: '#f97316' }
    if (score >= 55) return { letter: 'C', color: '#ef4444' }
    if (score >= 50) return { letter: 'C-', color: '#dc2626' }
    return { letter: 'F', color: '#991b1b' }
  }

  // Compute subject-level summary for a completed exam
  const getSubjectSummary = (subject) => {
    const data = resultsBySubject[subject]
    if (!data) return null
    const avg = Math.round(data.reduce((s, r) => s + r.score, 0) / data.length)
    const passed = data.filter(r => r.score >= 50).length
    const highest = Math.max(...data.map(r => r.score))
    const lowest = Math.min(...data.map(r => r.score))
    return { avg, passed, failed: data.length - passed, total: data.length, highest, lowest, passRate: Math.round((passed / data.length) * 100) }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📝 Exam Management</h1>
        <p>Schedule exams, view detailed results by subject, and track student eligibility</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card purple animate-in"><div className="stat-icon">📝</div><div className="stat-info"><h4>Total Exams</h4><div className="stat-value">{exams.length}</div><div className="stat-change">{exams.filter(e => e.status === 'Upcoming').length} upcoming</div></div></div>
        <div className="stat-card success animate-in"><div className="stat-icon">✅</div><div className="stat-info"><h4>Completed</h4><div className="stat-value">{exams.filter(e => e.status === 'Completed').length}</div><div className="stat-change positive">Results available</div></div></div>
        <div className="stat-card info animate-in"><div className="stat-icon">🎓</div><div className="stat-info"><h4>Students Tested</h4><div className="stat-value">247</div><div className="stat-change">{eligibleStudents.filter(s => s.eligible).length} eligible</div></div></div>
        <div className="stat-card accent animate-in"><div className="stat-icon">🏆</div><div className="stat-info"><h4>Avg Pass Rate</h4><div className="stat-value">{Math.round(exams.filter(e => e.passRate).reduce((s, e) => s + e.passRate, 0) / (exams.filter(e => e.passRate).length || 1))}%</div><div className="stat-change positive">Across all exams</div></div></div>
      </div>

      {/* Tabs */}
      <div className="toolbar">
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => { setActiveTab('schedule'); setViewPanel(null) }}>📅 Exam Schedule</button>
          <button className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`} onClick={() => { setActiveTab('subjects'); setViewPanel(null) }}>📊 Results by Subject</button>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>➕ Schedule Exam</button>
      </div>

      {/* ═══════════ TAB: Exam Schedule ═══════════ */}
      {activeTab === 'schedule' && !viewPanel && (
        <div className="exam-cards-list">
          {exams.map(exam => (
            <div key={exam.id} className={`exam-card exam-${exam.status.toLowerCase().replace(' ', '-')}`}>
              <div className="exam-card-main">
                <div className="exam-card-left">
                  <div className="exam-date-block">
                    <span className="exam-date-month">{new Date(exam.startDate + 'T00:00').toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="exam-date-day">{new Date(exam.startDate + 'T00:00').getDate()}</span>
                    <span className="exam-date-year">{new Date(exam.startDate + 'T00:00').getFullYear()}</span>
                  </div>
                  <div className="exam-info">
                    <h3>{exam.name}</h3>
                    <div className="exam-meta">
                      <span className={`badge ${exam.status === 'Completed' ? 'pass' : 'info'}`}>{exam.status}</span>
                      <span className="exam-type-badge">{exam.type}</span>
                      <span>📅 {exam.startDate} → {exam.endDate}</span>
                      <span>📝 {exam.totalMarks} marks</span>
                    </div>
                    <div className="exam-scope">
                      <span>🏫 {exam.grades.length} grades</span>
                      <span>📚 {exam.subjects.length} subjects</span>
                      <span>🎓 {exam.totalStudents} students</span>
                    </div>
                    <div className="exam-subject-chips">
                      {exam.subjects.map(s => <span key={s} className="subject-chip">{s}</span>)}
                    </div>
                  </div>
                </div>
                <div className="exam-card-right">
                  {exam.status === 'Completed' && (
                    <div className="exam-result-summary">
                      <div className="result-ring">
                        <svg viewBox="0 0 36 36" className="result-ring-svg">
                          <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="ring-fill" strokeDasharray={`${exam.passRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="ring-text">{exam.passRate}%</span>
                        <span className="ring-label">Pass Rate</span>
                      </div>
                      <div className="result-stats-col">
                        <div className="mini-stat"><span className="mini-label">Avg Score</span><span className="mini-val">{exam.avgScore}%</span></div>
                        <div className="mini-stat"><span className="mini-label">Passed</span><span className="mini-val" style={{ color: 'var(--success)' }}>{exam.passed}</span></div>
                        <div className="mini-stat"><span className="mini-label">Failed</span><span className="mini-val" style={{ color: 'var(--danger)' }}>{exam.failed}</span></div>
                        <div className="mini-stat"><span className="mini-label">Top Scorer</span><span className="mini-val top-scorer">{exam.topScorer}</span></div>
                      </div>
                    </div>
                  )}
                  <div className="exam-card-actions">
                    <button className="btn btn-sm btn-accent" onClick={() => openScheduleDetail(exam)}>📋 Full Schedule</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => openEligible(exam)}>🎓 Eligible Students</button>
                    {exam.status === 'Completed' && (
                      <button className="btn btn-sm btn-primary" onClick={() => { setActiveTab('subjects'); setSelectedExam(exam) }}>📊 Results</button>
                    )}
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(exam.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ PANEL: Full Exam Schedule Detail ═══════════ */}
      {viewPanel === 'schedule-detail' && selectedExam && (
        <div className="detail-panel animate-in">
          <div className="panel-header">
            <button className="btn btn-sm btn-secondary" onClick={() => setViewPanel(null)}>← Back</button>
            <h2>📋 Full Exam Schedule — {selectedExam.name}</h2>
          </div>
          <div className="schedule-info-bar">
            <span>📅 {selectedExam.startDate} → {selectedExam.endDate}</span>
            <span>📝 {selectedExam.totalMarks} marks per paper</span>
            <span>🏫 Grades: {selectedExam.grades.join(', ')}</span>
          </div>
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Room</th>
                  <th>Invigilator</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {examScheduleDetail.map((row, idx) => {
                  const examDate = new Date(row.date + 'T00:00')
                  const isPast = examDate < new Date()
                  return (
                    <tr key={idx} className={isPast ? 'row-completed' : ''}>
                      <td><strong>{idx + 1}</strong></td>
                      <td>
                        <div className="subject-cell">
                          <span className="subject-dot" style={{ background: getSubjectColor(row.subject) }}></span>
                          <strong>{row.subject}</strong>
                        </div>
                      </td>
                      <td>{new Date(row.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                      <td>{row.time}</td>
                      <td>2 hours</td>
                      <td><span className="room-badge">📍 {row.room}</span></td>
                      <td>{row.invigilator}</td>
                      <td><span className={`badge ${isPast ? 'pass' : 'info'}`}>{isPast ? 'Done' : 'Upcoming'}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ PANEL: Eligible Students ═══════════ */}
      {viewPanel === 'eligible' && selectedExam && (
        <div className="detail-panel animate-in">
          <div className="panel-header">
            <button className="btn btn-sm btn-secondary" onClick={() => setViewPanel(null)}>← Back</button>
            <h2>🎓 Eligible Students — {selectedExam.name}</h2>
          </div>
          <div className="eligible-stats">
            <div className="eligible-stat-box eligible-yes">
              <span className="eligible-count">{eligibleStudents.filter(s => s.eligible).length}</span>
              <span>Eligible</span>
            </div>
            <div className="eligible-stat-box eligible-no">
              <span className="eligible-count">{eligibleStudents.filter(s => !s.eligible).length}</span>
              <span>Not Eligible</span>
            </div>
            <div className="eligible-stat-box eligible-total">
              <span className="eligible-count">{eligibleStudents.length}</span>
              <span>Total Students</span>
            </div>
          </div>
          <div className="eligible-criteria">
            <h4>📜 Eligibility Criteria</h4>
            <ul>
              <li>✅ Fee status must be <strong>Paid</strong> or <strong>Pending</strong> (not Overdue)</li>
              <li>✅ Attendance must be at least <strong>70%</strong></li>
              <li>✅ No active disciplinary suspensions</li>
            </ul>
          </div>
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Grade</th>
                  <th>Admission #</th>
                  <th>Fee Status</th>
                  <th>Attendance</th>
                  <th>Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {eligibleStudents.map((s, idx) => (
                  <tr key={idx} className={!s.eligible ? 'row-ineligible' : ''}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="student-cell">
                        <div className={`student-avatar ${!s.eligible ? 'avatar-ineligible' : ''}`}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                        <strong>{s.name}</strong>
                      </div>
                    </td>
                    <td>{s.grade}</td>
                    <td>{s.admission}</td>
                    <td><span className={`badge ${s.feeStatus === 'Paid' ? 'pass' : s.feeStatus === 'Pending' ? 'pending' : 'fail'}`}>{s.feeStatus}</span></td>
                    <td>
                      <div className="attendance-mini">
                        <div className="att-bar"><div className="att-fill" style={{ width: `${s.attendance}%`, background: s.attendance >= 70 ? 'var(--success)' : 'var(--danger)' }}></div></div>
                        <span>{s.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      {s.eligible
                        ? <span className="badge pass">✅ Eligible</span>
                        : <span className="badge fail">❌ Not Eligible</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ TAB: Results by Subject ═══════════ */}
      {activeTab === 'subjects' && !viewPanel && (
        <div className="animate-in">
          <div className="subject-results-grid">
            {Object.keys(resultsBySubject).map(subject => {
              const summary = getSubjectSummary(subject)
              return (
                <div key={subject} className="subject-result-card" onClick={() => openSubjectResults(exams[0], subject)}>
                  <div className="src-header" style={{ background: `linear-gradient(135deg, ${getSubjectColor(subject)}15, ${getSubjectColor(subject)}05)` }}>
                    <span className="src-dot" style={{ background: getSubjectColor(subject) }}></span>
                    <h3>{subject}</h3>
                    <span className="src-click-hint">Click to view →</span>
                  </div>
                  <div className="src-body">
                    <div className="src-stat-row">
                      <div className="src-stat"><span className="src-label">Average</span><span className="src-value" style={{ color: getSubjectColor(subject) }}>{summary.avg}%</span></div>
                      <div className="src-stat"><span className="src-label">Pass Rate</span><span className="src-value">{summary.passRate}%</span></div>
                      <div className="src-stat"><span className="src-label">Highest</span><span className="src-value" style={{ color: 'var(--success)' }}>{summary.highest}</span></div>
                      <div className="src-stat"><span className="src-label">Lowest</span><span className="src-value" style={{ color: 'var(--danger)' }}>{summary.lowest}</span></div>
                    </div>
                    <div className="src-bar">
                      <div className="src-bar-pass" style={{ width: `${summary.passRate}%` }}><span>{summary.passed} passed</span></div>
                      <div className="src-bar-fail" style={{ width: `${100 - summary.passRate}%` }}><span>{summary.failed}</span></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══════════ PANEL: Subject-specific Results ═══════════ */}
      {viewPanel === 'results' && selectedSubject && (
        <div className="detail-panel animate-in">
          <div className="panel-header">
            <button className="btn btn-sm btn-secondary" onClick={() => setViewPanel(null)}>← Back to Subjects</button>
            <h2>📊 {selectedSubject} — Detailed Results</h2>
            <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
              <button className="btn btn-sm btn-secondary">📥 Export CSV</button>
              <button className="btn btn-sm btn-secondary">🖨️ Print</button>
            </div>
          </div>
          {(() => {
            const summary = getSubjectSummary(selectedSubject)
            const data = resultsBySubject[selectedSubject] || []
            return (
              <>
                <div className="subject-detail-stats">
                  <div className="sd-stat" style={{ borderColor: getSubjectColor(selectedSubject) }}>
                    <span className="sd-icon">📊</span><span className="sd-label">Class Average</span><span className="sd-val">{summary.avg}%</span>
                  </div>
                  <div className="sd-stat" style={{ borderColor: 'var(--success)' }}>
                    <span className="sd-icon">✅</span><span className="sd-label">Passed</span><span className="sd-val">{summary.passed}/{summary.total}</span>
                  </div>
                  <div className="sd-stat" style={{ borderColor: 'var(--danger)' }}>
                    <span className="sd-icon">❌</span><span className="sd-label">Failed</span><span className="sd-val">{summary.failed}</span>
                  </div>
                  <div className="sd-stat" style={{ borderColor: 'var(--accent)' }}>
                    <span className="sd-icon">🏆</span><span className="sd-label">Highest</span><span className="sd-val">{summary.highest}%</span>
                  </div>
                  <div className="sd-stat" style={{ borderColor: 'var(--info)' }}>
                    <span className="sd-icon">📉</span><span className="sd-label">Lowest</span><span className="sd-val">{summary.lowest}%</span>
                  </div>
                </div>

                <div className="card">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Student</th>
                        <th>Grade</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Grade Letter</th>
                        <th>Performance</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.sort((a, b) => b.score - a.score).map((r, idx) => {
                        const gl = getGradeLetter(r.score)
                        return (
                          <tr key={idx} className={r.score < 50 ? 'row-ineligible' : ''}>
                            <td>
                              <span className={`rank-badge ${idx === 0 ? 'rank-gold' : idx === 1 ? 'rank-silver' : idx === 2 ? 'rank-bronze' : ''}`}>
                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                              </span>
                            </td>
                            <td>
                              <div className="student-cell">
                                <div className="student-avatar">{r.student.split(' ').map(n => n[0]).join('')}</div>
                                <strong>{r.student}</strong>
                              </div>
                            </td>
                            <td>{r.grade}</td>
                            <td><strong style={{ fontSize: '1.05rem' }}>{r.score}</strong> <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>/{r.outOf}</span></td>
                            <td><strong style={{ color: gl.color }}>{Math.round((r.score / r.outOf) * 100)}%</strong></td>
                            <td><span className="grade-letter-badge" style={{ background: `${gl.color}18`, color: gl.color, border: `1px solid ${gl.color}40` }}>{gl.letter}</span></td>
                            <td>
                              <div className="performance-bar-wrap">
                                <div className="performance-bar">
                                  <div className="performance-fill" style={{ width: `${r.score}%`, background: gl.color }}></div>
                                </div>
                              </div>
                            </td>
                            <td><span style={{ fontSize: '0.82rem', color: r.score >= 50 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{r.remark}</span></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {/* ═══════════ Schedule Exam Modal ═══════════ */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>➕ Schedule New Exam</h2>
            <p className="modal-subtitle">Define exam details, participating grades, and subjects</p>
            <div className="form-group">
              <label className="form-label">Exam Name</label>
              <input className="form-control" placeholder="e.g. Second Semester Final" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Exam Type</label>
                <select className="form-control" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option>Mid-Term</option><option>Final</option><option>Quiz</option><option>Practical</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Total Marks</label>
                <input className="form-control" type="number" value={formData.totalMarks} onChange={e => setFormData({ ...formData, totalMarks: parseInt(e.target.value) || 100 })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Start Date</label><input className="form-control" type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">End Date</label><input className="form-control" type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} /></div>
            </div>
            <div className="form-group"><label className="form-label">Participating Grades</label>
              <div className="chip-selector">{GRADES_ALL.map(g => <button key={g} type="button" className={`select-chip ${formData.grades.includes(g) ? 'selected' : ''}`} onClick={() => toggleGrade(g)}>{g}</button>)}</div>
            </div>
            <div className="form-group"><label className="form-label">Subjects</label>
              <div className="chip-selector">{SUBJECTS_ALL.map(s => <button key={s} type="button" className={`select-chip ${formData.subjects.includes(s) ? 'selected' : ''}`} onClick={() => toggleSubject(s)}>{s}</button>)}</div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate}>📅 Schedule Exam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getSubjectColor(subject) {
  const colors = { 'Mathematics': '#667eea', 'English': '#f093fb', 'Science': '#11998e', 'History': '#fa709a', 'Geography': '#4facfe', 'Art & Design': '#f5576c', 'PE': '#38ef7d', 'ICT': '#764ba2', 'French': '#f39c12' }
  return colors[subject] || '#8b5cf6'
}
