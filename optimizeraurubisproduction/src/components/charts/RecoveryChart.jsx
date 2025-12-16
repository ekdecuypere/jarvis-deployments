import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';

export default function RecoveryChart() {
  const { optimizationResult, targets } = useOptimizerStore();

  if (!optimizationResult) {
    return (
      <div className="glass-card p-6 h-80 flex items-center justify-center">
        <p className="text-white/50">Run optimization to see recovery projections</p>
      </div>
    );
  }

  const { totals, targetAchievement } = optimizationResult;

  const data = [
    {
      name: 'Cathode',
      actual: totals.copper,
      target: targets.cathodeProduction.target,
      achievement: targetAchievement.cathode,
      unit: 'mt',
      color: '#B87333'
    },
    {
      name: 'Gold',
      actual: totals.gold * 1000, // Convert to mt
      target: targets.preciousMetals.gold.target,
      achievement: targetAchievement.gold,
      unit: 'mt',
      color: '#fbbf24'
    },
    {
      name: 'Silver',
      actual: totals.silver * 1000,
      target: targets.preciousMetals.silver.target,
      achievement: targetAchievement.silver,
      unit: 'mt',
      color: '#94a3b8'
    },
    {
      name: 'Platinum',
      actual: totals.platinum * 1000,
      target: targets.preciousMetals.platinum.target,
      achievement: targetAchievement.platinum,
      unit: 'mt',
      color: '#60a5fa'
    },
    {
      name: 'Palladium',
      actual: totals.palladium * 1000,
      target: targets.preciousMetals.palladium.target,
      achievement: targetAchievement.palladium,
      unit: 'mt',
      color: '#a78bfa'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = data.find(d => d.name === label);
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-white font-medium mb-2">{label}</p>
          <p className="text-green-400">
            Projected: {item.actual < 1 ? item.actual.toFixed(3) : item.actual.toFixed(1)} {item.unit}
          </p>
          <p className="text-white/60">
            Target: {item.target} {item.unit}
          </p>
          <p className={`font-semibold ${item.achievement >= 100 ? 'text-green-400' : 'text-yellow-400'}`}>
            {item.achievement.toFixed(1)}% achieved
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6"
    >
      <h3 className="font-semibold text-white mb-4">Target Achievement</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              type="number"
              domain={[0, 120]}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="achievement" radius={[0, 4, 4, 0]} animationDuration={800}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.achievement >= 100 ? '#22c55e' :
                        entry.achievement >= 80 ? '#f59e0b' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-white/60">Target Met</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-white/60">Near Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-white/60">Below Target</span>
        </div>
      </div>
    </motion.div>
  );
}
