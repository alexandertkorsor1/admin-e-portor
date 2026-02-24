import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const role = localStorage.getItem('adminRole')
    const name = localStorage.getItem('adminName')
    return role ? { role, name } : null
  })

  const login = useCallback((role, name) => {
    localStorage.setItem('adminRole', role)
    localStorage.setItem('adminName', name)
    setUser({ role, name })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('adminRole')
    localStorage.removeItem('adminName')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
