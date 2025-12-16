import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import { formatNumber } from '../../utils/optimizationEngine';

export default function SiteUtilizationChart() {
  const { optimizationResult, sites } = useOptimizerStore();

  if (!optimizationResult) {
    return (
      <div className="glass-card p-6 h-80 flex items-center justify-center">
        <p className="text-white/50">Run optimization to see site utilization</p>
      </div>
    );
  }

  const data = optimizationResult.siteAllocations.map(sa => {
    const site = sites.find(s => s.id === sa.siteId);
    return {
      name: sa.siteName.split(' ')[0], // Short name
      fullName: sa.siteName,
      allocated: sa.allocated,
      capacity: sa.capacity,
      utilization: sa.utilization,
      baseUtilization: site?.capacity.currentUtilization || 0
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = data.find(d => d.name === label);
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-white font-medium mb-2">{item.fullName}</p>
          <p className="text-aurubis-copper">
            Allocated: {formatNumber(item.allocated)} mt
          </p>
          <p className="text-white/60">
            Available: {formatNumber(item.capacity)} mt
          </p>
          <p className="text-green-400 font-semibold">
            {item.utilization.toFixed(1)}% Q1 capacity used
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
      <h3 className="font-semibold text-white mb-4">Site Utilization (Q1 Allocation)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={85} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Optimal', fill: '#f59e0b', fontSize: 10 }} />
            <Bar
              dataKey="utilization"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              fill="#B87333"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
