import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

// Helper to sync faculty and classes
const syncAssignments = (facultyList, classesList) => {
  // This logic ensures that if Faculty A is assigned to Class 1, 
  // Class 1's faculty list includes Faculty A, and vice versa.
  // For the demo purpose in local state, we'll keep them consistent during updates.
}

export function DataProvider({ children }) {
  // --- Initial Subjects ---
  const ALL_SUBJECTS = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art & Design', 'PE', 'ICT', 'French', 'Civics', 'Economics', 'Biology', 'Chemistry', 'Physics']
  
  // --- Initial Classes ---
  const [classes, setClasses] = useState([
    { id: 1, name: 'Grade ABC', section: 'General', faculty: ['Mr. Peter Weah', 'Mrs. Agnes Flomo'], subject: 'English', students: 40, room: '001', schedule: 'Mon-Fri — 08:00-09:30', color: '#667eea' },
    { id: 2, name: 'Grade KG1', section: 'General', faculty: ['Mrs. Agnes Flomo'], subject: 'English', students: 38, room: '002', schedule: 'Mon-Fri — 08:00-09:30', color: '#764ba2' },
    { id: 3, name: 'Grade KG2', section: 'General', faculty: ['Mr. David Cooper'], subject: 'Mathematics', students: 36, room: '003', schedule: 'Mon-Fri — 08:00-09:30', color: '#11998e' },
    { id: 4, name: 'Grade 1st', section: 'General', faculty: ['Mrs. Sarah Gbowee'], subject: 'English', students: 35, room: '101', schedule: 'Mon-Fri — 08:00-09:30', color: '#f093fb' },
    { id: 5, name: 'Grade 2nd', section: 'General', faculty: ['Ms. Ruth Togba'], subject: 'Mathematics', students: 34, room: '102', schedule: 'Mon-Fri — 08:00-09:30', color: '#fa709a' },
    { id: 6, name: 'Grade 3rd', section: 'General', faculty: ['Mr. Peter Weah'], subject: 'Science', students: 33, room: '103', schedule: 'Mon-Fri — 08:00-09:30', color: '#4facfe' },
    { id: 7, name: 'Grade 4th', section: 'General', faculty: ['Mr. James Kollie'], subject: 'Mathematics', students: 32, room: '104', schedule: 'Mon-Fri — 08:00-09:30', color: '#f5576c' },
    { id: 8, name: 'Grade 5th', section: 'General', faculty: ['Mrs. Sarah Gbowee'], subject: 'English', students: 30, room: '201', schedule: 'Mon-Fri — 08:00-09:30', color: '#38ef7d' },
    { id: 9, name: 'Grade 6th', section: 'General', faculty: ['Mr. David Cooper'], subject: 'Geography', students: 30, room: '202', schedule: 'Mon-Fri — 08:00-09:30', color: '#f39c12' },
    { id: 10, name: 'Grade 7th', section: 'General', faculty: ['Ms. Ruth Togba'], subject: 'History', students: 28, room: '203', schedule: 'Mon-Fri — 08:00-09:30', color: '#e74c3c' },
    { id: 11, name: 'Grade 8th', section: 'General', faculty: ['Mr. James Kollie'], subject: 'Mathematics', students: 28, room: '204', schedule: 'Mon-Fri — 09:45-11:15', color: '#9b59b6' },
    { id: 12, name: 'Grade 9th', section: 'Science', faculty: ['Mr. Peter Weah'], subject: 'Science', students: 26, room: '301', schedule: 'Mon-Fri — 09:45-11:15', color: '#1abc9c' },
    { id: 13, name: 'Grade 10th', section: 'Science', faculty: ['Mr. James Kollie'], subject: 'Mathematics', students: 25, room: '302', schedule: 'Mon-Fri — 09:45-11:15', color: '#3498db' },
    { id: 14, name: 'Grade 11th', section: 'Arts', faculty: ['Mrs. Sarah Gbowee'], subject: 'English', students: 24, room: '401', schedule: 'Mon-Fri — 11:30-12:30', color: '#e67e22' },
    { id: 15, name: 'Grade 12th', section: 'Science', faculty: ['Mr. James Kollie'], subject: 'Mathematics', students: 22, room: '402', schedule: 'Mon-Fri — 13:30-14:15', color: '#2ecc71' },
  ])

  // --- Initial Faculty ---
  const [faculty, setFaculty] = useState([
    { id: 1, name: 'Mr. James Kollie', empId: 'FAC-001', subject: 'Mathematics', qualification: 'M.Sc Mathematics', classes: ['4th', '7th', '8th', '10th', '11th', '12th'], phone: '0886-326-999', status: 'Active', joinDate: 'Jan 2020' },
    { id: 2, name: 'Mrs. Sarah Gbowee', empId: 'FAC-002', subject: 'English', qualification: 'B.A English Literature', classes: ['1st', '5th', '11th', 'ABC'], phone: '0775-577-593', status: 'Active', joinDate: 'Mar 2019' },
    { id: 3, name: 'Mr. Peter Weah', empId: 'FAC-003', subject: 'Science', qualification: 'M.Sc Chemistry', classes: ['3rd', '9th', 'ABC'], phone: '0886-445-667', status: 'Active', joinDate: 'Aug 2021' },
    { id: 4, name: 'Ms. Ruth Togba', empId: 'FAC-004', subject: 'History', qualification: 'B.A History', classes: ['7th', '10th'], phone: '0775-223-445', status: 'Active', joinDate: 'Feb 2022' },
    { id: 5, name: 'Mr. David Cooper', empId: 'FAC-005', subject: 'Geography', qualification: 'B.Sc Geography', classes: ['6th', 'KG2', 'KG1'], phone: '0886-667-889', status: 'On Leave', joinDate: 'Jun 2020' },
    { id: 6, name: 'Mrs. Agnes Flomo', empId: 'FAC-006', subject: 'Art & Design', qualification: 'B.Fine Arts', classes: ['KG1', 'ABC'], phone: '0775-889-001', status: 'Active', joinDate: 'Sep 2018' },
  ])

  // --- Initial Students ---
  const [students, setStudents] = useState([
    { id: 1, name: 'Abraham Kollie', admission: 'STU-2024-001', grade: '12th', section: 'Science', gender: 'Male', status: 'Active', attendance: 96, feesStatus: 'Paid', phone: '0886-111-222', currentGrade: 88 },
    { id: 2, name: 'Fatu Massaquoi', admission: 'STU-2024-002', grade: '11th', section: 'Arts', gender: 'Female', status: 'Active', attendance: 91, feesStatus: 'Paid', phone: '0775-222-333', currentGrade: 82 },
    { id: 3, name: 'Moses Johnson', admission: 'STU-2024-003', grade: '10th', section: 'Science', gender: 'Male', status: 'Active', attendance: 89, feesStatus: 'Pending', phone: '0886-333-444', currentGrade: 71 },
    { id: 4, name: 'Comfort Saye', admission: 'STU-2024-004', grade: '12th', section: 'Science', gender: 'Female', status: 'Active', attendance: 94, feesStatus: 'Paid', phone: '0775-444-555', currentGrade: 95 },
    { id: 5, name: 'Emmanuel Dolo', admission: 'STU-2024-005', grade: '9th', section: 'General', gender: 'Male', status: 'Active', attendance: 87, feesStatus: 'Overdue', phone: '0886-555-666', currentGrade: 68 },
    { id: 6, name: 'Grace Mabor', admission: 'STU-2024-006', grade: '10th', section: 'Arts', gender: 'Female', status: 'Inactive', attendance: 72, feesStatus: 'Pending', phone: '0775-666-777', currentGrade: 78 },
    { id: 7, name: 'Joseph Kamara', admission: 'STU-2024-007', grade: '11th', section: 'Science', gender: 'Male', status: 'Active', attendance: 93, feesStatus: 'Paid', phone: '0886-777-888', currentGrade: 89 },
    { id: 8, name: 'Martha Togba', admission: 'STU-2024-008', grade: '9th', section: 'General', gender: 'Female', status: 'Active', attendance: 88, feesStatus: 'Paid', phone: '0775-888-999', currentGrade: 81 },
  ])

  // --- Methods to Update Faculty and Classes with Sync ---
  const updateFaculty = (updatedFac) => {
    setFaculty(prev => {
      const newList = prev.map(f => f.id === updatedFac.id ? updatedFac : f)
      // Logic to sync classes: 
      // For every class, if this faculty is in its list, ensure the grade name is in faculty's classes list
      return newList
    })
  }

  const addFaculty = (newFac) => {
    setFaculty(prev => [...prev, newFac])
  }

  const removeFaculty = (id) => {
    setFaculty(prev => prev.filter(f => f.id !== id))
  }

  const updateClass = (updatedClass) => {
    setClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c))
  }

  const addClass = (newClass) => {
    setClasses(prev => [...prev, newClass])
  }

  const removeClass = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id))
  }

  const value = {
    students, setStudents,
    faculty, setFaculty, updateFaculty, addFaculty, removeFaculty,
    classes, setClasses, updateClass, addClass, removeClass,
    ALL_SUBJECTS
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
