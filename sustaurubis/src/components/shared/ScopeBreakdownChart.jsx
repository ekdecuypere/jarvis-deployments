import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-300">
          {payload[0].value.toLocaleString()} tons CO₂e
        </p>
        <p className="text-sm text-gray-400">
          {payload[0].payload.percent}% of total
        </p>
      </div>
    )
  }
  return null
}

export default function ScopeBreakdownChart({ scope1, scope2, scope3, height = 250 }) {
  const total = scope1 + scope2 + scope3

  const data = [
    { name: 'Scope 1 (Direct)', value: scope1, percent: Math.round((scope1 / total) * 100) },
    { name: 'Scope 2 (Energy)', value: scope2, percent: Math.round((scope2 / total) * 100) },
    { name: 'Scope 3 (Value Chain)', value: scope3, percent: Math.round((scope3 / total) * 100) }
  ]

  const COLORS = ['#10B981', '#6366F1', '#F59E0B']

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
            wrapperStyle={{ paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-30px' }}>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{(total / 1000).toFixed(0)}k</p>
          <p className="text-xs text-gray-400">tons CO₂e</p>
        </div>
      </div>
    </div>
  )
}
