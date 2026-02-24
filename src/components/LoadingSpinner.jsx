import './LoadingSpinner.css'

export default function LoadingSpinner({ text = 'Loading...', fullPage = false }) {
  if (fullPage) {
    return (
      <div className="loading-fullpage">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>{text}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="loading-inline">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-wide"></div>
      <div className="skeleton-line skeleton-medium"></div>
      <div className="skeleton-line skeleton-narrow"></div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-cell skeleton-circle"></div>
          <div className="skeleton-cell skeleton-wide"></div>
          <div className="skeleton-cell skeleton-medium"></div>
          <div className="skeleton-cell skeleton-narrow"></div>
        </div>
      ))}
    </div>
  )
}
