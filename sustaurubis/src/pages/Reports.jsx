import { useState, useMemo } from 'react'
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import useESGStore from '../store/esgStore'
import {
  StatusBadge,
  ProgressBar,
  EmissionsChart,
  ScopeBreakdownChart
} from '../components/shared'

export default function Reports() {
  const { emissions, compliance, initiatives, getNetworkTotals, getComplianceStatus, getEmissionsTrendData } = useESGStore()
  const [selectedReport, setSelectedReport] = useState(null)

  const networkTotals = useMemo(() => getNetworkTotals(), [])
  const complianceStatus = useMemo(() => getComplianceStatus(), [])
  const trendData = useMemo(() => getEmissionsTrendData(), [])

  const reports = [
    {
      id: 'quarterly',
      title: 'Q4 2024 ESG Report',
      description: 'Comprehensive quarterly emissions and sustainability performance report',
      type: 'Quarterly Report',
      date: '2024-12-15',
      status: 'Available',
      icon: DocumentChartBarIcon
    },
    {
      id: 'annual',
      title: 'Annual Sustainability Report 2024',
      description: 'Full year sustainability performance, initiatives, and outlook',
      type: 'Annual Report',
      date: '2025-03-31',
      status: 'In Progress',
      icon: DocumentTextIcon
    },
    {
      id: 'csrd',
      title: 'CSRD Disclosure Report',
      description: 'Corporate Sustainability Reporting Directive compliance report',
      type: 'Regulatory',
      date: '2025-01-01',
      status: 'Draft',
      icon: ClipboardDocumentListIcon
    },
    {
      id: 'sbti',
      title: 'SBTi Progress Report',
      description: 'Science Based Targets initiative progress tracking',
      type: 'Framework',
      date: '2024-12-01',
      status: 'Available',
      icon: ChartBarIcon
    },
    {
      id: 'taxonomy',
      title: 'EU Taxonomy Alignment Report',
      description: 'Taxonomy eligibility and alignment assessment',
      type: 'Regulatory',
      date: '2024-11-30',
      status: 'Available',
      icon: GlobeAltIcon
    }
  ]

  const scopeData = [
    { name: 'Scope 1', value: networkTotals.totalScope1, color: '#ef4444' },
    { name: 'Scope 2', value: networkTotals.totalScope2, color: '#f59e0b' },
    { name: 'Scope 3', value: networkTotals.totalScope3, color: '#3b82f6' }
  ]

  const downloadReport = (reportId) => {
    // Simulate download
    console.log(`Downloading report: ${reportId}`)
    alert(`Report download started: ${reports.find(r => r.id === reportId)?.title}`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Reports & Analytics</h2>
          <p className="text-sm text-gray-400">Generate and download ESG reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-colors">
          <DocumentTextIcon className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon
          const isAvailable = report.status === 'Available'

          return (
            <div
              key={report.id}
              className={`card cursor-pointer transition-all ${selectedReport === report.id ? 'border-emerald-500' : 'hover:border-gray-600'}`}
              onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <StatusBadge
                  status={isAvailable ? 'Completed' : report.status === 'Draft' ? 'Pending' : 'In Progress'}
                  size="sm"
                />
              </div>

              <h3 className="font-semibold text-white mb-1">{report.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{report.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="text-xs text-gray-500">{report.type}</span>
              </div>

              {isAvailable && (
                <button
                  onClick={(e) => { e.stopPropagation(); downloadReport(report.id) }}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Stats Dashboard */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Executive Summary - Q4 2024</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Metrics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">Key Performance Indicators</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Network Emissions</p>
                <p className="text-2xl font-bold text-white">{networkTotals.totalEmissions.toLocaleString()}</p>
                <p className="text-xs text-gray-500">tons CO2e</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Gap to 2030 Target</p>
                <p className="text-2xl font-bold text-red-400">+{networkTotals.gap.toLocaleString()}</p>
                <p className="text-xs text-gray-500">tons above target</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Compliance Rate</p>
                <p className="text-2xl font-bold text-emerald-400">{complianceStatus.complianceRate}%</p>
                <p className="text-xs text-gray-500">{complianceStatus.compliant}/{complianceStatus.total} items</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Renewable Energy</p>
                <p className="text-2xl font-bold text-blue-400">{networkTotals.avgRenewable}%</p>
                <p className="text-xs text-gray-500">network average</p>
              </div>
            </div>

            {/* Site Status Summary */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Site Status Distribution</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-400">On Track / Below Target</span>
                  </div>
                  <span className="text-sm font-medium text-white">{networkTotals.sitesOnTrack}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-400">Moderate Risk</span>
                  </div>
                  <span className="text-sm font-medium text-white">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-400">Critical / High Priority</span>
                  </div>
                  <span className="text-sm font-medium text-white">{networkTotals.sitesOffTrack}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">Emissions Overview</h4>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-3">Monthly Trend (H2 2024)</p>
              <EmissionsChart data={trendData} height={150} />
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-3">Emissions by Scope</p>
              <ScopeBreakdownChart data={scopeData} height={150} />
            </div>
          </div>
        </div>
      </div>

      {/* Data Export Options */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Emissions Data', description: 'All site emissions data in CSV format', format: 'CSV' },
            { name: 'Compliance Matrix', description: 'Full compliance status and audit history', format: 'Excel' },
            { name: 'Initiative Pipeline', description: 'All decarbonization projects and progress', format: 'PDF' }
          ].map((exportOption, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{exportOption.name}</h4>
                <span className="px-2 py-0.5 bg-gray-600 rounded text-xs text-gray-300">{exportOption.format}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{exportOption.description}</p>
              <button className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Scheduled Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Weekly Emissions Summary', frequency: 'Every Monday', nextRun: '2024-12-16', recipients: 3 },
            { name: 'Monthly Executive Dashboard', frequency: 'First of month', nextRun: '2025-01-01', recipients: 8 },
            { name: 'Quarterly Board Report', frequency: 'End of quarter', nextRun: '2025-03-31', recipients: 12 }
          ].map((scheduled, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{scheduled.name}</p>
                  <p className="text-sm text-gray-400">{scheduled.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Next: {new Date(scheduled.nextRun).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <p className="text-xs text-gray-500">{scheduled.recipients} recipients</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
