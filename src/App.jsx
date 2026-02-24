import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboardLayout from './components/AdminDashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ManageStudents from './pages/ManageStudents.jsx'
import ManageFaculty from './pages/ManageFaculty.jsx'
import ManageClasses from './pages/ManageClasses.jsx'
import FeeManagement from './pages/FeeManagement.jsx'
import Announcements from './pages/Announcements.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import ActivityLog from './pages/ActivityLog.jsx'
import TimetableManagement from './pages/TimetableManagement.jsx'
import ExamManagement from './pages/ExamManagement.jsx'
import HallTicket from './pages/HallTicket.jsx'

function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />

      <Route path="/admin" element={
        <AdminProtectedRoute>
          <AdminDashboardLayout />
        </AdminProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="faculty" element={<ManageFaculty />} />
        <Route path="classes" element={<ManageClasses />} />
        <Route path="fees" element={<FeeManagement />} />
        <Route path="timetable" element={<TimetableManagement />} />
        <Route path="exams" element={<ExamManagement />} />
        <Route path="hall-tickets" element={<HallTicket />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="reports" element={<Reports />} />
        <Route path="activity" element={<ActivityLog />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
