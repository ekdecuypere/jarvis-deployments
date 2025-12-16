import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import { formatNumber } from '../../utils/optimizationEngine';

const COLORS = ['#B87333', '#22c55e', '#3b82f6', '#a855f7'];

export default function AllocationChart() {
  const { optimizationResult } = useOptimizerStore();

  if (!optimizationResult) {
    return (
      <div className="glass-card p-6 h-80 flex items-center justify-center">
        <p className="text-white/50">Run optimization to see allocation distribution</p>
      </div>
    );
  }

  const data = optimizationResult.siteAllocations
    .filter(sa => sa.allocated > 0)
    .map(sa => ({
      name: sa.siteName,
      value: sa.allocated,
      utilization: sa.utilization
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-aurubis-copper">{formatNumber(data.value)} mt</p>
          <p className="text-white/60 text-sm">{data.utilization.toFixed(1)}% capacity</p>
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
      <h3 className="font-semibold text-white mb-4">Site Allocation Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(255,255,255,0.1)"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-white/80">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
