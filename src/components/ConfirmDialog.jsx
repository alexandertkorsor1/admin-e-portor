import { createContext, useContext, useState, useCallback } from 'react'

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({ open: false, title: '', message: '', resolve: null })

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setState({ open: true, title, message, resolve })
    })
  }, [])

  const handleConfirm = () => {
    state.resolve?.(true)
    setState({ open: false, title: '', message: '', resolve: null })
  }

  const handleCancel = () => {
    state.resolve?.(false)
    setState({ open: false, title: '', message: '', resolve: null })
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state.open && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <h2 style={{ fontSize: '1.15rem' }}>⚠️ {state.title}</h2>
            <p className="modal-subtitle">{state.message}</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirm} style={{ background: 'var(--danger)', color: 'white', border: 'none' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider')
  return ctx
}
