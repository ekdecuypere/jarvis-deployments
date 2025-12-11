import { useMemo } from 'react'
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  FlagIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatCard,
  StatusBadge,
  ProgressBar,
  SiteComparisonChart
} from '../components/shared'

export default function TargetTracking() {
  const { emissions, getNetworkTotals } = useESGStore()
  const networkTotals = useMemo(() => getNetworkTotals(), [])

  // Calculate trajectory data
  const trajectoryData = useMemo(() => {
    const baseYear2020 = 95000 // Estimated 2020 baseline
    const current = networkTotals.totalEmissions
    const target2030 = networkTotals.totalTarget
    const target2050 = networkTotals.totalTarget * 0.1 // Net zero essentially

    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    const linearPath = years.map(year => {
      const progress = (year - 2020) / (2030 - 2020)
      return {
        year,
        target: Math.round(baseYear2020 - (baseYear2020 - target2030) * progress)
      }
    })

    // Simulated actual emissions (declining but above target)
    const actualData = [
      { year: 2020, actual: 95000 },
      { year: 2021, actual: 92000 },
      { year: 2022, actual: 88000 },
      { year: 2023, actual: 82000 },
      { year: 2024, actual: current }
    ]

    return { linearPath, actualData, baseYear2020, target2030, target2050 }
  }, [networkTotals])

  // Calculate reduction needed per year
  const yearsRemaining = 2030 - 2024
  const reductionNeeded = networkTotals.totalEmissions - networkTotals.totalTarget
  const annualReductionRequired = Math.round(reductionNeeded / yearsRemaining)
  const percentReductionRequired = Math.round((reductionNeeded / networkTotals.totalEmissions) * 100)

  // Site progress towards targets
  const siteProgress = emissions.map(site => {
    const reduction2020 = site.q4_emissions * 1.25 // Estimated 2020 baseline
    const achieved = reduction2020 - site.q4_emissions
    const required = reduction2020 - site.target_2030
    const progressPercent = Math.round((achieved / required) * 100)

    return {
      ...site,
      baseline2020: Math.round(reduction2020),
      achieved: Math.round(achieved),
      required: Math.round(required),
      remaining: Math.round(site.q4_emissions - site.target_2030),
      progressPercent: Math.min(100, Math.max(0, progressPercent))
    }
  }).sort((a, b) => b.progressPercent - a.progressPercent)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">Target Tracking</h2>
        <p className="text-sm text-gray-400">Monitor progress towards 2030 Science Based Targets</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Emissions"
          value={networkTotals.totalEmissions.toLocaleString()}
          unit="tons CO2e"
          icon={FlagIcon}
          color="blue"
        />
        <StatCard
          title="2030 Target"
          value={networkTotals.totalTarget.toLocaleString()}
          unit="tons CO2e"
          icon={FlagIcon}
          color="emerald"
        />
        <StatCard
          title="Gap to Target"
          value={`+${reductionNeeded.toLocaleString()}`}
          unit="tons"
          change={networkTotals.gapPercent}
          changeLabel="above target"
          icon={ArrowTrendingDownIcon}
          trend="down"
          color="red"
        />
        <StatCard
          title="Required Annual Reduction"
          value={annualReductionRequired.toLocaleString()}
          unit="tons/year"
          icon={CalendarDaysIcon}
          color="amber"
        />
      </div>

      {/* Target Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Network Target Progress</h3>
            <p className="text-sm text-gray-400">2020 baseline to 2030 target trajectory</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-gray-400">Target Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-400">Actual Emissions</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">2020 Baseline</p>
            <p className="text-2xl font-bold text-white">{trajectoryData.baseYear2020.toLocaleString()}</p>
            <p className="text-xs text-gray-500">tons CO2e</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">2024 Current</p>
            <p className="text-2xl font-bold text-blue-400">{networkTotals.totalEmissions.toLocaleString()}</p>
            <p className="text-xs text-gray-500">tons CO2e</p>
            <p className="text-xs text-emerald-400 mt-1">
              -{Math.round(((trajectoryData.baseYear2020 - networkTotals.totalEmissions) / trajectoryData.baseYear2020) * 100)}% from baseline
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">2030 Target</p>
            <p className="text-2xl font-bold text-emerald-400">{trajectoryData.target2030.toLocaleString()}</p>
            <p className="text-xs text-gray-500">tons CO2e</p>
            <p className="text-xs text-gray-400 mt-1">
              -{Math.round(((trajectoryData.baseYear2020 - trajectoryData.target2030) / trajectoryData.baseYear2020) * 100)}% reduction required
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Overall Progress to 2030 Target</span>
            <span className="text-sm font-medium text-white">
              {Math.round(((trajectoryData.baseYear2020 - networkTotals.totalEmissions) / (trajectoryData.baseYear2020 - trajectoryData.target2030)) * 100)}%
            </span>
          </div>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.round(((trajectoryData.baseYear2020 - networkTotals.totalEmissions) / (trajectoryData.baseYear2020 - trajectoryData.target2030)) * 100))}%`
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>2020 Baseline: {trajectoryData.baseYear2020.toLocaleString()} t</span>
            <span>2030 Target: {trajectoryData.target2030.toLocaleString()} t</span>
          </div>
        </div>

        <SiteComparisonChart data={emissions} height={300} />
      </div>

      {/* Site-by-Site Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Site Progress Towards Targets</h3>
        <div className="space-y-4">
          {siteProgress.map((site) => (
            <div key={site.id} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">{site.site}</span>
                  <span className="text-sm text-gray-400">{site.country}</span>
                </div>
                <StatusBadge status={site.status} size="sm" />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-400">Est. 2020</p>
                  <p className="font-mono text-white">{site.baseline2020.toLocaleString()} t</p>
                </div>
                <div>
                  <p className="text-gray-400">Current</p>
                  <p className="font-mono text-blue-400">{site.q4_emissions.toLocaleString()} t</p>
                </div>
                <div>
                  <p className="text-gray-400">2030 Target</p>
                  <p className="font-mono text-emerald-400">{site.target_2030.toLocaleString()} t</p>
                </div>
                <div>
                  <p className="text-gray-400">Remaining</p>
                  <p className={`font-mono ${site.remaining > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {site.remaining > 0 ? '-' : '+'}{Math.abs(site.remaining).toLocaleString()} t
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <ProgressBar
                    value={site.progressPercent}
                    color={site.progressPercent >= 80 ? 'emerald' : site.progressPercent >= 50 ? 'amber' : 'red'}
                    showValue={false}
                  />
                </div>
                <span className={`text-sm font-medium min-w-[3rem] text-right ${
                  site.progressPercent >= 80 ? 'text-emerald-400' :
                  site.progressPercent >= 50 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {site.progressPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Key Milestones</h3>
        <div className="space-y-4">
          {[
            { year: 2025, target: 70000, label: '25% reduction milestone', status: 'upcoming' },
            { year: 2027, target: 60000, label: '35% reduction milestone', status: 'upcoming' },
            { year: 2030, target: networkTotals.totalTarget, label: 'SBTi validated target', status: 'target' },
            { year: 2050, target: 0, label: 'Net zero operations', status: 'long-term' }
          ].map((milestone, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                milestone.status === 'achieved' ? 'bg-emerald-500/20' :
                milestone.status === 'target' ? 'bg-blue-500/20' :
                'bg-gray-700'
              }`}>
                <span className={`text-sm font-bold ${
                  milestone.status === 'achieved' ? 'text-emerald-400' :
                  milestone.status === 'target' ? 'text-blue-400' :
                  'text-gray-400'
                }`}>
                  {milestone.year}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{milestone.label}</p>
                <p className="text-sm text-gray-400">
                  Target: {milestone.target.toLocaleString()} tons CO2e
                </p>
              </div>
              <StatusBadge
                status={
                  milestone.status === 'achieved' ? 'Completed' :
                  milestone.status === 'target' ? 'Active' :
                  'Planning'
                }
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
