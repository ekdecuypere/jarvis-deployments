export default function StatusBadge({ status, size = 'md' }) {
  const statusConfig = {
    // Emissions status
    critical: { label: 'Critical', className: 'badge-danger' },
    high: { label: 'High Priority', className: 'badge-warning' },
    moderate: { label: 'Moderate', className: 'badge-info' },
    on_track: { label: 'On Track', className: 'badge-success' },
    below_target: { label: 'Below Target', className: 'badge-success' },

    // Compliance status
    Compliant: { label: 'Compliant', className: 'badge-success' },
    Certified: { label: 'Certified', className: 'badge-success' },
    'In Progress': { label: 'In Progress', className: 'badge-info' },
    Pending: { label: 'Pending', className: 'badge-warning' },
    'Action Required': { label: 'Action Required', className: 'badge-danger' },
    Expired: { label: 'Expired', className: 'badge-danger' },

    // Initiative status
    Active: { label: 'Active', className: 'badge-success' },
    Planning: { label: 'Planning', className: 'badge-info' },
    Completed: { label: 'Completed', className: 'badge-success' },
    'On Hold': { label: 'On Hold', className: 'badge-warning' }
  }

  const config = statusConfig[status] || { label: status, className: 'badge-info' }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  }

  return (
    <span className={`${config.className} ${sizeClasses[size]}`}>
      {config.label}
    </span>
  )
}
