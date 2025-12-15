import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function StatCard({ title, value, unit, change, changeLabel, icon: Icon, trend, color = 'emerald' }) {
  const colorClasses = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    red: 'bg-red-500/20 text-red-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400'
  }

  const isPositive = trend === 'up' ? change >= 0 : change < 0

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="stat-value">{value}</span>
            {unit && <span className="text-gray-400 text-sm">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {change >= 0 ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
              {changeLabel && <span className="text-gray-500 font-normal ml-1">{changeLabel}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
