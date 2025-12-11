export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'emerald',
  showTarget = false,
  targetValue = null
}) {
  const percent = Math.min((value / max) * 100, 100)
  const targetPercent = targetValue ? Math.min((targetValue / max) * 100, 100) : null

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const colorClasses = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    gradient: 'bg-gradient-to-r from-emerald-500 to-blue-500'
  }

  // Dynamic color based on value
  const getStatusColor = () => {
    if (percent <= 33) return colorClasses.emerald
    if (percent <= 66) return colorClasses.amber
    return colorClasses.red
  }

  const barColor = color === 'status' ? getStatusColor() : colorClasses[color]

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-white">
              {value.toLocaleString()}{max !== 100 && ` / ${max.toLocaleString()}`}
            </span>
          )}
        </div>
      )}
      <div className={`progress-bar ${sizeClasses[size]} relative`}>
        <div
          className={`progress-fill ${barColor}`}
          style={{ width: `${percent}%` }}
        />
        {showTarget && targetPercent && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/50"
            style={{ left: `${targetPercent}%` }}
            title={`Target: ${targetValue?.toLocaleString()}`}
          />
        )}
      </div>
    </div>
  )
}
