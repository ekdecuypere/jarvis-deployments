import { useState, useMemo } from 'react'
import {
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatCard,
  StatusBadge,
  ProgressBar,
  DataTable
} from '../components/shared'
import { getComplianceByCategory } from '../data/mockData'

export default function Compliance() {
  const { compliance, getComplianceStatus } = useESGStore()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const complianceStatus = useMemo(() => getComplianceStatus(), [])
  const categoryStats = useMemo(() => getComplianceByCategory(), [])

  const categories = ['all', ...new Set(compliance.map(c => c.category))]
  const statuses = ['all', 'Compliant', 'Certified', 'In Progress', 'Pending', 'Action Required']

  const filteredCompliance = compliance.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    if (statusFilter !== 'all' && item.status !== statusFilter) return false
    return true
  })

  const upcomingDeadlines = compliance
    .filter(c => c.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5)

  const columns = [
    {
      key: 'regulation',
      label: 'Regulation',
      render: (value, row) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-xs text-gray-400">{row.site}</p>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'alignment_percent',
      label: 'Alignment',
      render: (value) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={value} size="sm" color={value === 100 ? 'emerald' : value >= 75 ? 'blue' : 'amber'} className="w-20" showValue={false} />
          <span className="text-sm font-mono">{value}%</span>
        </div>
      )
    },
    {
      key: 'due_date',
      label: 'Due Date',
      render: (value) => {
        if (!value) return <span className="text-gray-500">-</span>
        const date = new Date(value)
        const now = new Date()
        const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
        const isUrgent = daysUntil <= 90

        return (
          <div>
            <p className={`text-sm ${isUrgent ? 'text-amber-400' : 'text-gray-300'}`}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            {isUrgent && <p className="text-xs text-amber-400">{daysUntil} days</p>}
          </div>
        )
      }
    },
    {
      key: 'last_audit',
      label: 'Last Audit',
      render: (value) => {
        if (!value) return <span className="text-gray-500">Not audited</span>
        return (
          <span className="text-sm text-gray-400">
            {new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )
      }
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">Compliance Management</h2>
        <p className="text-sm text-gray-400">Track regulatory compliance and certification status</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Compliance Rate"
          value={complianceStatus.complianceRate}
          unit="%"
          icon={ShieldCheckIcon}
          color="emerald"
        />
        <StatCard
          title="Compliant Items"
          value={complianceStatus.compliant}
          unit={`of ${complianceStatus.total}`}
          icon={CheckCircleIcon}
          color="emerald"
        />
        <StatCard
          title="In Progress"
          value={complianceStatus.pending}
          unit="items"
          icon={ClockIcon}
          color="blue"
        />
        <StatCard
          title="Action Required"
          value={complianceStatus.attention}
          unit="items"
          icon={ExclamationTriangleIcon}
          color={complianceStatus.attention > 0 ? 'red' : 'emerald'}
        />
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-white mb-4">Compliance by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStats.map((cat) => (
              <div
                key={cat.category}
                className="bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => setCategoryFilter(cat.category)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">{cat.category}</span>
                  <span className={`text-lg font-bold ${cat.rate === 100 ? 'text-emerald-400' : cat.rate >= 75 ? 'text-blue-400' : 'text-amber-400'}`}>
                    {cat.rate}%
                  </span>
                </div>
                <ProgressBar
                  value={cat.rate}
                  size="sm"
                  color={cat.rate === 100 ? 'emerald' : cat.rate >= 75 ? 'blue' : 'amber'}
                  showValue={false}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {cat.compliant} of {cat.total} compliant
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((item) => {
              const date = new Date(item.due_date)
              const now = new Date()
              const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
              const isUrgent = daysUntil <= 90

              return (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{item.regulation}</p>
                    <p className="text-xs text-gray-400">{item.site}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isUrgent ? 'text-amber-400' : 'text-gray-300'}`}>
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className={`text-xs ${isUrgent ? 'text-amber-400' : 'text-gray-500'}`}>
                      {daysUntil} days
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
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

      {/* Compliance Table */}
      <DataTable
        columns={columns}
        data={filteredCompliance}
        emptyMessage="No compliance items match your filters"
      />

      {/* Key Regulations Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Key Regulatory Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'EU Taxonomy',
              description: 'Climate mitigation and adaptation framework for sustainable activities',
              status: 'Compliant',
              icon: '🇪🇺'
            },
            {
              name: 'CSRD',
              description: 'Corporate Sustainability Reporting Directive for ESG disclosure',
              status: 'In Progress',
              icon: '📊'
            },
            {
              name: 'Science Based Targets',
              description: 'SBTi validated 1.5°C pathway commitment',
              status: 'Certified',
              icon: '🎯'
            },
            {
              name: 'Copper Mark',
              description: 'Responsible copper production certification',
              status: 'Certified',
              icon: '🏆'
            }
          ].map((reg, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
              <span className="text-2xl">{reg.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-white">{reg.name}</h4>
                  <StatusBadge status={reg.status} size="sm" />
                </div>
                <p className="text-sm text-gray-400">{reg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
