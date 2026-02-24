import { useState } from 'react'
import { useToast } from '../components/Toast.jsx'
import './Settings.css'

export default function Settings() {
  const toast = useToast()
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', icon: '🏫', label: 'School Info' },
    { id: 'academic', icon: '📚', label: 'Academic' },
    { id: 'fees', icon: '💰', label: 'Fee Structure' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'security', icon: '🔒', label: 'Security' },
  ]

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Configure and customize the admin portal</p>
      </div>

      <div className="settings-layout">
        {/* Settings Navigation */}
        <div className="settings-nav card">
          {sections.map(s => (
            <button
              key={s.id}
              className={`settings-nav-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {activeSection === 'general' && (
            <div className="card">
              <div className="card-header">
                <h3>🏫 School Information</h3>
              </div>
              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">School Name</label>
                  <input className="form-control" defaultValue="Foya Free Pentecostal Mission High School" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Abbreviation</label>
                    <input className="form-control" defaultValue="FFPMHS" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Established</label>
                    <input className="form-control" defaultValue="1980" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input className="form-control" defaultValue="Foya, Lofa County, Liberia" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-control" defaultValue="+231-886-000-000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-control" defaultValue="admin@ffpmhs.edu.lr" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">School Motto</label>
                  <input className="form-control" defaultValue="Knowledge is Power" />
                </div>
                <div className="settings-save-bar">
                  <button className="btn btn-primary" onClick={() => toast.success('School information saved successfully!')}>💾 Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'academic' && (
            <div className="card">
              <div className="card-header">
                <h3>📚 Academic Settings</h3>
              </div>
              <div className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Current Academic Year</label>
                    <input className="form-control" defaultValue="2025-2026" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Semester</label>
                    <select className="form-control">
                      <option>First Semester</option>
                      <option selected>Second Semester</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Grading System</label>
                    <select className="form-control">
                      <option>Percentage (0-100%)</option>
                      <option>Letter Grade (A-F)</option>
                      <option>GPA (0-4.0)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pass Mark (%)</label>
                    <input className="form-control" type="number" defaultValue="50" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Students Per Class</label>
                  <input className="form-control" type="number" defaultValue="40" />
                </div>
                <div className="settings-save-bar">
                  <button className="btn btn-primary" onClick={() => toast.success('Academic settings saved successfully!')}>💾 Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'fees' && (
            <div className="card">
              <div className="card-header">
                <h3>💰 Fee Structure</h3>
              </div>
              <div className="settings-form">
                <div className="fee-structure-table">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Grade</th>
                        <th>Tuition (USD)</th>
                        <th>Library</th>
                        <th>Sports</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Grade 9</td><td>$250</td><td>$30</td><td>$20</td><td><strong>$300</strong></td></tr>
                      <tr><td>Grade 10</td><td>$300</td><td>$30</td><td>$20</td><td><strong>$350</strong></td></tr>
                      <tr><td>Grade 11</td><td>$350</td><td>$30</td><td>$20</td><td><strong>$400</strong></td></tr>
                      <tr><td>Grade 12</td><td>$400</td><td>$30</td><td>$20</td><td><strong>$450</strong></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-row" style={{ marginTop: 'var(--sp-lg)' }}>
                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select className="form-control">
                      <option>USD ($)</option>
                      <option>LRD (L$)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Deadline</label>
                    <input className="form-control" type="date" defaultValue="2026-03-15" />
                  </div>
                </div>
                <div className="settings-save-bar">
                  <button className="btn btn-primary" onClick={() => toast.success('Fee structure saved successfully!')}>💾 Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h3>🔔 Notification Preferences</h3>
              </div>
              <div className="settings-form">
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>📧 Email Notifications</h4>
                    <p>Receive email for important events</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>💬 SMS Alerts</h4>
                    <p>Send SMS to parents for attendance issues</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>💰 Fee Reminders</h4>
                    <p>Auto-send fee payment reminders</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>📊 Weekly Reports</h4>
                    <p>Receive weekly summary reports</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-save-bar">
                  <button className="btn btn-primary" onClick={() => toast.success('Notification preferences saved!')}>💾 Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="card">
              <div className="card-header">
                <h3>🔒 Security Settings</h3>
              </div>
              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-control" type="password" placeholder="Enter current password" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input className="form-control" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input className="form-control" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>🔐 Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>🕐 Session Timeout</h4>
                    <p>Auto-logout after 30 minutes of inactivity</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-save-bar">
                  <button className="btn btn-primary" onClick={() => toast.success('Security settings updated!')}>💾 Update Security</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
