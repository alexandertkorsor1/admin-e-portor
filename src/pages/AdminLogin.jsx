import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { authAPI } from '../services/api.js'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both admin ID and password')
      return
    }

    setLoading(true)

    // Try real backend first
    const result = await authAPI.login(username, password)

    if (result.ok) {
      login('admin', result.data.user.fullName)
      toast.success(`Welcome back, ${result.data.user.fullName}!`)
      navigate('/admin')
    } else if (result.offline) {
      // Backend not reachable — fall back to demo mode
      console.warn('Backend not reachable, using demo login...')
      login('admin', username)
      toast.info('Demo mode — backend not connected')
      navigate('/admin')
    } else {
      setError(result.error || 'Login failed')
      toast.error(result.error || 'Login failed')
    }

    setLoading(false)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-crest">🛡️</div>
          <h1>Foya Free Pentecostal<br />Mission High School</h1>
          <div className="admin-tag">🔑 Admin Portal</div>
          <p>Authorized personnel only</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Admin ID</label>
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Enter admin ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="admin-username"
            />
          </div>
          <div className="admin-form-group">
            <label>Password</label>
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="admin-password"
            />
            <button
              type="button"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(20%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="admin-login-btn" disabled={loading} id="admin-login-btn">
            {loading ? '⏳ Authenticating...' : 'Access Admin Panel →'}
          </button>
        </form>

        <div className="admin-login-footer">
          🔐 Secure admin access • © 1980 FFPMHS
        </div>
      </div>
    </div>
  )
}
