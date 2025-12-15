import { useState, useMemo } from 'react'
import {
  BuildingOffice2Icon,
  MapPinIcon,
  BoltIcon,
  CloudIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatCard,
  StatusBadge,
  ProgressBar,
  DataTable,
  EmissionsChart,
  ScopeBreakdownChart
} from '../components/shared'

export default function SiteAnalysis() {
  const { emissions, selectedSite, setSelectedSite } = useESGStore()
  const [viewMode, setViewMode] = useState('grid')

  const selectedSiteData = useMemo(() => {
    if (!selectedSite) return null
    return emissions.find(s => s.id === selectedSite)
  }, [selectedSite, emissions])

  const columns = [
    {
      key: 'site',
      label: 'Site',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center">
            <BuildingOffice2Icon className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="font-medium text-white">{value}</p>
            <p className="text-xs text-gray-400">{row.country}</p>
          </div>
        </div>
      )
    },
    {
      key: 'q4_emissions',
      label: 'Q4 Emissions',
      render: (value) => (
        <span className="font-mono">{value.toLocaleString()} t</span>
      )
    },
    {
      key: 'target_2030',
      label: '2030 Target',
      render: (value) => (
        <span className="font-mono text-gray-400">{value.toLocaleString()} t</span>
      )
    },
    {
      key: 'emissions_intensity',
      label: 'Intensity',
      render: (value) => (
        <span className="font-mono">{value.toLocaleString()} kg/t</span>
      )
    },
    {
      key: 'renewable_percent',
      label: 'Renewables',
      render: (value) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={value} size="sm" color="emerald" className="w-16" showValue={false} />
          <span className="text-sm">{value}%</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Site Analysis</h2>
          <p className="text-sm text-gray-400">Detailed emissions breakdown by production site</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-sm ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-sm ${viewMode === 'table' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Table
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={emissions}
          onRowClick={(row) => setSelectedSite(row.id)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {emissions.map((site) => {
            const gapPercent = Math.round(((site.q4_emissions - site.target_2030) / site.target_2030) * 100)
            const isAboveTarget = gapPercent > 0

            return (
              <div
                key={site.id}
                className={`card cursor-pointer transition-all hover:border-emerald-500/50 ${selectedSite === site.id ? 'border-emerald-500' : ''}`}
                onClick={() => setSelectedSite(site.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                      <BuildingOffice2Icon className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{site.site}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{site.country}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={site.status} size="sm" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Q4 2024 Emissions</span>
                    <span className="font-mono font-medium text-white">{site.q4_emissions.toLocaleString()} t</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">2030 Target</span>
                    <span className="font-mono text-gray-400">{site.target_2030.toLocaleString()} t</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Gap</span>
                    <span className={`font-mono font-medium ${isAboveTarget ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isAboveTarget ? '+' : ''}{gapPercent}%
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Renewable Energy</span>
                      <span className="text-xs text-emerald-400">{site.renewable_percent}%</span>
                    </div>
                    <ProgressBar value={site.renewable_percent} size="sm" color="emerald" showValue={false} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Site Detail Panel */}
      {selectedSiteData && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                <BuildingOffice2Icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedSiteData.site} Details</h3>
                <p className="text-sm text-gray-400">{selectedSiteData.country} - {selectedSiteData.region}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSite(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emissions Trend */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">Monthly Emissions Trend (H2 2024)</h4>
              <EmissionsChart data={selectedSiteData.monthly} height={200} />
            </div>

            {/* Scope Breakdown */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">Emissions by Scope</h4>
              <ScopeBreakdownChart
                data={[
                  { name: 'Scope 1', value: selectedSiteData.scope1, color: '#ef4444' },
                  { name: 'Scope 2', value: selectedSiteData.scope2, color: '#f59e0b' },
                  { name: 'Scope 3', value: selectedSiteData.scope3, color: '#3b82f6' }
                ]}
                height={200}
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CloudIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">Intensity</span>
              </div>
              <p className="text-lg font-semibold text-white">{selectedSiteData.emissions_intensity.toLocaleString()}</p>
              <p className="text-xs text-gray-500">kg CO2/ton Cu</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BoltIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-400">Renewables</span>
              </div>
              <p className="text-lg font-semibold text-emerald-400">{selectedSiteData.renewable_percent}%</p>
              <p className="text-xs text-gray-500">of energy mix</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">H2 Usage</span>
              </div>
              <p className="text-lg font-semibold text-blue-400">{selectedSiteData.hydrogen_usage_mwh.toLocaleString()}</p>
              <p className="text-xs text-gray-500">MWh</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">Initiatives</span>
              </div>
              <p className="text-lg font-semibold text-white">{selectedSiteData.initiatives.length}</p>
              <p className="text-xs text-gray-500">active projects</p>
            </div>
          </div>

          {/* Active Initiatives */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Active Initiatives</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSiteData.initiatives.map((initiative, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300">
                  {initiative}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
