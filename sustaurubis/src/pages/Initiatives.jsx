import { useState, useMemo } from 'react'
import {
  RocketLaunchIcon,
  CurrencyEuroIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  FunnelIcon,
  SparklesIcon,
  BoltIcon,
  TruckIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatCard,
  StatusBadge,
  ProgressBar
} from '../components/shared'
import { getInitiativesByCategory } from '../data/mockData'

export default function Initiatives() {
  const { initiatives, getActiveInitiatives, getTotalInvestment, getExpectedReduction } = useESGStore()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const activeInitiatives = useMemo(() => getActiveInitiatives(), [])
  const totalInvestment = useMemo(() => getTotalInvestment(), [])
  const expectedReduction = useMemo(() => getExpectedReduction(), [])
  const categoryStats = useMemo(() => getInitiativesByCategory(), [])

  const categories = ['all', ...new Set(initiatives.map(i => i.category))]
  const statuses = ['all', 'Active', 'In Progress', 'Planning', 'Completed']

  const filteredInitiatives = initiatives.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    if (statusFilter !== 'all' && item.status !== statusFilter) return false
    return true
  })

  const categoryIcons = {
    Hydrogen: SparklesIcon,
    Renewable: BoltIcon,
    Efficiency: CpuChipIcon,
    Transport: TruckIcon
  }

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`
    }
    return `€${(value / 1000).toFixed(0)}K`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">Decarbonization Initiatives</h2>
        <p className="text-sm text-gray-400">Track emission reduction projects and investments</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Initiatives"
          value={activeInitiatives.length}
          unit={`of ${initiatives.length}`}
          icon={RocketLaunchIcon}
          color="emerald"
        />
        <StatCard
          title="Total Investment"
          value={formatCurrency(totalInvestment)}
          icon={CurrencyEuroIcon}
          color="blue"
        />
        <StatCard
          title="Expected Reduction"
          value={expectedReduction.toLocaleString()}
          unit="tons/year"
          icon={ArrowTrendingDownIcon}
          color="emerald"
        />
        <StatCard
          title="Avg. ROI Period"
          value="5.2"
          unit="years"
          icon={ClockIcon}
          color="amber"
        />
      </div>

      {/* Investment by Category */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Investment by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryStats.map((cat) => {
            const Icon = categoryIcons[cat.category] || RocketLaunchIcon
            const percentOfTotal = Math.round((cat.investment / totalInvestment) * 100)

            return (
              <div
                key={cat.category}
                className="bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => setCategoryFilter(cat.category)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium text-gray-300">{cat.category}</span>
                </div>
                <p className="text-xl font-bold text-white mb-1">{formatCurrency(cat.investment)}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{cat.count} projects</span>
                  <span className="text-xs text-emerald-400">-{cat.reduction.toLocaleString()} t</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={percentOfTotal} size="sm" color="emerald" showValue={false} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Filters:</span>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status}
            </option>
          ))}
        </select>
        {(categoryFilter !== 'all' || statusFilter !== 'all') && (
          <button
            onClick={() => { setCategoryFilter('all'); setStatusFilter('all') }}
            className="text-sm text-emerald-400 hover:text-emerald-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Initiative Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredInitiatives.map((initiative) => {
          const Icon = categoryIcons[initiative.category] || RocketLaunchIcon
          const startDate = new Date(initiative.start_date)
          const targetDate = new Date(initiative.target_completion)
          const now = new Date()
          const totalDays = (targetDate - startDate) / (1000 * 60 * 60 * 24)
          const elapsedDays = (now - startDate) / (1000 * 60 * 60 * 24)
          const timeProgress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100))

          return (
            <div key={initiative.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{initiative.name}</h3>
                    <p className="text-xs text-gray-400">{initiative.site}</p>
                  </div>
                </div>
                <StatusBadge status={initiative.status} />
              </div>

              <p className="text-sm text-gray-400 mb-4">{initiative.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-white">{initiative.progress_percent}%</span>
                </div>
                <ProgressBar
                  value={initiative.progress_percent}
                  color={initiative.progress_percent >= 75 ? 'emerald' : initiative.progress_percent >= 50 ? 'blue' : 'amber'}
                  showValue={false}
                />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Investment</p>
                  <p className="text-sm font-semibold text-blue-400">{formatCurrency(initiative.investment_eur)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CO2 Reduction</p>
                  <p className="text-sm font-semibold text-emerald-400">
                    {initiative.expected_reduction_tons > 0 ? `-${initiative.expected_reduction_tons.toLocaleString()} t` : 'TBD'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ROI Period</p>
                  <p className="text-sm font-semibold text-white">{initiative.roi_years} years</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>
                    Started: {startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span>
                    Target: {targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gray-600"
                    style={{ width: `${timeProgress}%` }}
                  />
                  <div
                    className="absolute left-0 top-0 h-full bg-emerald-500"
                    style={{ width: `${initiative.progress_percent}%` }}
                  />
                </div>
                {timeProgress > initiative.progress_percent + 10 && (
                  <p className="text-xs text-amber-400 mt-1">Behind schedule</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filteredInitiatives.length === 0 && (
        <div className="card text-center py-12">
          <RocketLaunchIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No initiatives match your filters</p>
          <button
            onClick={() => { setCategoryFilter('all'); setStatusFilter('all') }}
            className="mt-2 text-sm text-emerald-400 hover:text-emerald-300"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Impact Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Projected Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">
              -{expectedReduction.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">tons CO2e/year</p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((expectedReduction / 76453) * 100)}% of current network emissions
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">
              {formatCurrency(totalInvestment)}
            </p>
            <p className="text-sm text-gray-400">Total Investment</p>
            <p className="text-xs text-gray-500 mt-1">
              €{Math.round(totalInvestment / expectedReduction).toLocaleString()}/ton reduced
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">2026</p>
            <p className="text-sm text-gray-400">Majority Completion</p>
            <p className="text-xs text-gray-500 mt-1">
              {initiatives.filter(i => new Date(i.target_completion) <= new Date('2026-12-31')).length} projects
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
