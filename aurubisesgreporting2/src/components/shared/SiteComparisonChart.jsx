import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const emissions = payload.find(p => p.dataKey === 'emissions')?.value || 0
    const target = payload.find(p => p.dataKey === 'target')?.value || 0
    const gap = emissions - target
    const gapPercent = Math.round((gap / target) * 100)

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        <p className="text-sm text-emerald-400">
          Emissions: {emissions.toLocaleString()} tons
        </p>
        <p className="text-sm text-blue-400">
          2030 Target: {target.toLocaleString()} tons
        </p>
        <p className={`text-sm font-medium mt-1 ${gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
          Gap: {gap > 0 ? '+' : ''}{gap.toLocaleString()} tons ({gapPercent > 0 ? '+' : ''}{gapPercent}%)
        </p>
      </div>
    )
  }
  return null
}

export default function SiteComparisonChart({ data, height = 300 }) {
  const chartData = data.map(site => ({
    name: site.site,
    emissions: site.q4_emissions,
    target: site.target_2030,
    gap: site.q4_emissions - site.target_2030
  }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="name"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-gray-300">{value}</span>}
          />
          <Bar
            dataKey="emissions"
            name="Q4 2024 Emissions"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="target"
            name="2030 Target"
            fill="#6366F1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
