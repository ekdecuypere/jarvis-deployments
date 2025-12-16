import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtitle, icon, trend, color = 'copper' }) {
  const colorStyles = {
    copper: 'from-aurubis-copper to-yellow-600',
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-indigo-600',
    purple: 'from-purple-500 to-pink-600',
    red: 'from-red-500 to-rose-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorStyles[color]} bg-opacity-20`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <span>{trend >= 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-white/60 text-sm">{title}</p>
        <p className={`text-3xl font-bold bg-gradient-to-r ${colorStyles[color]} bg-clip-text text-transparent`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-white/50 text-xs">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
