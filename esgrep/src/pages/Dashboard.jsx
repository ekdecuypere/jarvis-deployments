import { useMemo } from 'react'
import {
  CloudIcon,
  BoltIcon,
  ArrowTrendingDownIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatCard,
  EmissionsChart,
  SiteComparisonChart,
  StatusBadge,
  ProgressBar
} from '../components/shared'

export default function Dashboard() {
  const { emissions, getNetworkTotals, getEmissionsTrendData, getComplianceStatus, getActiveInitiatives } = useESGStore()

  const networkTotals = useMemo(() => getNetworkTotals(), [])
  const trendData = useMemo(() => getEmissionsTrendData(), [])
  const complianceStatus = useMemo(() => getComplianceStatus(), [])
  const activeInitiatives = useMemo(() => getActiveInitiatives(), [])

  const topSitesOffTrack = emissions
    .filter(s => s.status === 'critical' || s.status === 'high')
    .slice(0, 3)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Q4 2024 Total Emissions"
          value={networkTotals.totalEmissions.toLocaleString()}
          unit="tons CO₂e"
          change={-3.2}
          changeLabel="vs Q3"
          icon={CloudIcon}
          trend="down"
          color="emerald"
        />
        <StatCard
          title="Gap to 2030 Target"
          value={`+${networkTotals.gap.toLocaleString()}`}
          unit="tons"
          change={networkTotals.gapPercent}
          changeLabel="above target"
          icon={ArrowTrendingDownIcon}
          trend="down"
          color="red"
        />
        <StatCard
          title="Avg Emissions Intensity"
          value={networkTotals.avgIntensity.toLocaleString()}
          unit="kg CO₂/ton"
          change={-1.8}
          changeLabel="vs Q3"
          icon={BoltIcon}
          trend="down"
          color="blue"
        />
        <StatCard
          title="Compliance Rate"
          value={complianceStatus.complianceRate}
          unit="%"
          icon={CheckCircleIcon}
          color="emerald"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emissions Trend */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Network Emissions Trend</h3>
            <span className="text-sm text-gray-400">H2 2024</span>
          </div>
          <EmissionsChart data={trendData} height={280} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          {/* Renewable Energy */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300">Renewable Energy Mix</h4>
              <span className="text-emerald-400 font-semibold">{networkTotals.avgRenewable}%</span>
            </div>
            <ProgressBar
              value={networkTotals.avgRenewable}
              color="emerald"
              showValue={false}
            />
            <p className="text-xs text-gray-500 mt-2">Network average across all sites</p>
          </div>

          {/* Hydrogen Usage */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300">H₂ Consumption</h4>
              <span className="text-blue-400 font-semibold">{networkTotals.totalH2.toLocaleString()} MWh</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Hamburg: 280 MWh (Pilot)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Lunen: 120 MWh (Trial)</span>
            </div>
          </div>

          {/* Sites Summary */}
          <div className="card">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Site Status Overview</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">On Track / Below Target</span>
                <span className="text-emerald-400 font-medium">{networkTotals.sitesOnTrack}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Needs Attention</span>
                <span className="text-amber-400 font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Critical / High Priority</span>
                <span className="text-red-400 font-medium">{networkTotals.sitesOffTrack}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Comparison */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">Site Emissions vs 2030 Targets</h3>
          <span className="text-sm text-gray-400">Q4 2024 Data</span>
        </div>
        <SiteComparisonChart data={emissions} height={320} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sites Requiring Attention */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
            <h3 className="section-title mb-0">Sites Requiring Attention</h3>
          </div>
          <div className="space-y-3">
            {topSitesOffTrack.map((site) => {
              const gapPercent = Math.round(((site.q4_emissions - site.target_2030) / site.target_2030) * 100)
              return (
                <div key={site.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                      <BuildingOffice2Icon className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{site.site}</p>
                      <p className="text-xs text-gray-400">{site.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={site.status} />
                    <p className="text-xs text-red-400 mt-1">+{gapPercent}% above target</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active Initiatives */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Active Reduction Initiatives</h3>
            <span className="badge-info">{activeInitiatives.length} active</span>
          </div>
          <div className="space-y-3">
            {activeInitiatives.slice(0, 4).map((initiative) => (
              <div key={initiative.id} className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">{initiative.name}</p>
                  <StatusBadge status={initiative.status} size="sm" />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>{initiative.site}</span>
                  <span>-{initiative.expected_reduction_tons.toLocaleString()} tons/yr</span>
                </div>
                <ProgressBar
                  value={initiative.progress_percent}
                  size="sm"
                  color="emerald"
                  showValue={false}
                />
                <p className="text-xs text-gray-500 mt-1">{initiative.progress_percent}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
