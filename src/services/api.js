/*
 * Centralized API Service
 * All backend calls go through here so pages never call fetch() directly.
 */

const BASE =
    import.meta.env.VITE_API_URL || 'http://localhost:5000'

/* ── helpers ──────────────────────────────────────────── */

async function request(path, options = {}) {
    const url = `${BASE}${path}`
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    try {
        const res = await fetch(url, {
            ...options,
            headers
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.msg || data.error || 'Request failed')
        return {
            data,
            ok: true
        }
    } catch (err) {
        // If the backend is unreachable, return a clear error
        if (err instanceof TypeError && err.message.includes('fetch')) {
            return {
                data: null,
                ok: false,
                error: 'Backend not reachable',
                offline: true
            }
        }
        return {
            data: null,
            ok: false,
            error: err.message
        }
    }
}

const get = (path) => request(path)
const post = (path, body) => request(path, {
    method: 'POST',
    body: JSON.stringify(body)
})
const put = (path, body) => request(path, {
    method: 'PUT',
    body: JSON.stringify(body)
})
const del = (path) => request(path, {
    method: 'DELETE'
})

/* ── Auth ─────────────────────────────────────────────── */

export const authAPI = {
    login: (username, password) =>
        post('/api/auth/login', {
            username,
            password,
            role: 'admin'
        }),

    register: (username, password, fullName, role = 'student') =>
        post('/api/auth/register', {
            username,
            password,
            fullName,
            role
        }),
}

/* ── Admin — Users ────────────────────────────────────── */

export const usersAPI = {
    getAll: () => get('/api/admin/users'),
    getById: (id) => get(`/api/admin/users/${id}`),
    create: (userData) => post('/api/admin/users', userData),
    update: (id, userData) => put(`/api/admin/users/${id}`, userData),
    delete: (id) => del(`/api/admin/users/${id}`),
    getStudents: () => get('/api/admin/users?role=student'),
    getFaculty: () => get('/api/admin/users?role=faculty'),
}

/* ── Admin — Classes ──────────────────────────────────── */

export const classesAPI = {
    getAll: () => get('/api/admin/classes'),
    getById: (id) => get(`/api/admin/classes/${id}`),
    create: (classData) => post('/api/admin/classes', classData),
    update: (id, classData) => put(`/api/admin/classes/${id}`, classData),
    delete: (id) => del(`/api/admin/classes/${id}`),
}

/* ── Admin — Fees ─────────────────────────────────────── */

export const feesAPI = {
    getAll: () => get('/api/admin/fees'),
    getByStudent: (studentId) => get(`/api/admin/fees/${studentId}`),
    recordPayment: (paymentData) => post('/api/admin/fees/payment', paymentData),
    updateStructure: (feeData) => put('/api/admin/fees/structure', feeData),
}

/* ── Admin — Timetable ────────────────────────────────── */

export const timetableAPI = {
    getAll: () => get('/api/admin/timetable'),
    getByClass: (classId) => get(`/api/admin/timetable/${classId}`),
    update: (classId, timetableData) => put(`/api/admin/timetable/${classId}`, timetableData),
}

/* ── Admin — Exams ────────────────────────────────────── */

export const examsAPI = {
    getAll: () => get('/api/admin/exams'),
    create: (examData) => post('/api/admin/exams', examData),
    update: (id, examData) => put(`/api/admin/exams/${id}`, examData),
    delete: (id) => del(`/api/admin/exams/${id}`),
    getResults: (examId) => get(`/api/admin/exams/${examId}/results`),
}

/* ── Admin — Announcements ────────────────────────────── */

export const announcementsAPI = {
    getAll: () => get('/api/admin/announcements'),
    create: (annData) => post('/api/admin/announcements', annData),
    update: (id, annData) => put(`/api/admin/announcements/${id}`, annData),
    delete: (id) => del(`/api/admin/announcements/${id}`),
}

/* ── Admin — Attendance ───────────────────────────────── */

export const attendanceAPI = {
    getOverview: () => get('/api/admin/attendance/overview'),
    getByClass: (classId, date) => get(`/api/admin/attendance/${classId}?date=${date}`),
}

/* ── Admin — Reports ──────────────────────────────────── */

export const reportsAPI = {
    getStudentReport: () => get('/api/admin/reports/students'),
    getFacultyReport: () => get('/api/admin/reports/faculty'),
    getFinancialReport: () => get('/api/admin/reports/financial'),
    getAttendanceReport: () => get('/api/admin/reports/attendance'),
}

/* ── Admin — Activity Log ─────────────────────────────── */

export const activityAPI = {
    getAll: () => get('/api/admin/activity'),
}

/* ── Admin — Settings ─────────────────────────────────── */

export const settingsAPI = {
    get: () => get('/api/admin/settings'),
    update: (settings) => put('/api/admin/settings', settings),
}