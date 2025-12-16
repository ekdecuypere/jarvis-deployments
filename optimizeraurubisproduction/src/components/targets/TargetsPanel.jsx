import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import ProgressRing from '../shared/ProgressRing';
import { formatNumber } from '../../utils/optimizationEngine';

export default function TargetsPanel() {
  const { targets, optimizationResult } = useOptimizerStore();

  const getAchievement = (key) => {
    if (!optimizationResult) return 0;
    return optimizationResult.targetAchievement[key] || 0;
  };

  const getProjected = (key) => {
    if (!optimizationResult) return 0;
    const totals = optimizationResult.totals;
    switch (key) {
      case 'cathode': return totals.copper;
      case 'gold': return totals.gold * 1000;
      case 'silver': return totals.silver * 1000;
      case 'platinum': return totals.platinum * 1000;
      case 'palladium': return totals.palladium * 1000;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Q1 Header */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white text-xl">{targets.quarter} Production Targets</h3>
            <p className="text-white/50 text-sm">Cathode and Precious Metal Recovery Goals</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs">Quality Standard</p>
            <p className="text-aurubis-copper font-semibold">{targets.qualityMetrics.cathodeGrade}</p>
          </div>
        </div>
      </div>

      {/* Cathode Production Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-6">
          <ProgressRing
            value={getAchievement('cathode')}
            size={120}
            strokeWidth={10}
            label="Cathode"
            color={getAchievement('cathode') >= 100 ? '#22c55e' :
                   getAchievement('cathode') >= 80 ? '#f59e0b' : '#ef4444'}
          />
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-white mb-3">Copper Cathode Production</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/40 text-xs">Minimum</p>
                <p className="text-white font-medium">{formatNumber(targets.cathodeProduction.minimum)} mt</p>
              </div>
              <div>
                <p className="text-white/40 text-xs">Target</p>
                <p className="text-aurubis-copper font-bold text-lg">{formatNumber(targets.cathodeProduction.target)} mt</p>
              </div>
              <div>
                <p className="text-white/40 text-xs">Stretch</p>
                <p className="text-white font-medium">{formatNumber(targets.cathodeProduction.stretch)} mt</p>
              </div>
            </div>
            {optimizationResult && (
              <div className="mt-4 p-3 bg-white/5 rounded-xl">
                <p className="text-white/60 text-sm">Projected Production</p>
                <p className="text-2xl font-bold gradient-text">{formatNumber(getProjected('cathode'))} mt</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Precious Metals Targets */}
      <div className="grid grid-cols-2 gap-4">
        {/* Gold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg">Au</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">Gold Recovery</h4>
              <p className="text-white/50 text-sm">Target: {targets.preciousMetals.gold.target} mt</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ProgressRing
              value={getAchievement('gold')}
              size={80}
              strokeWidth={6}
              color="#fbbf24"
            />
            <div className="text-right">
              <p className="text-white/40 text-xs">Projected</p>
              <p className="text-xl font-bold text-yellow-400">
                {optimizationResult ? getProjected('gold').toFixed(2) : '—'} mt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Silver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-400/20 flex items-center justify-center">
              <span className="text-gray-300 font-bold text-lg">Ag</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">Silver Recovery</h4>
              <p className="text-white/50 text-sm">Target: {targets.preciousMetals.silver.target} mt</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ProgressRing
              value={getAchievement('silver')}
              size={80}
              strokeWidth={6}
              color="#94a3b8"
            />
            <div className="text-right">
              <p className="text-white/40 text-xs">Projected</p>
              <p className="text-xl font-bold text-gray-300">
                {optimizationResult ? getProjected('silver').toFixed(1) : '—'} mt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Platinum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-lg">Pt</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">Platinum Recovery</h4>
              <p className="text-white/50 text-sm">Target: {targets.preciousMetals.platinum.target} mt</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ProgressRing
              value={getAchievement('platinum')}
              size={80}
              strokeWidth={6}
              color="#60a5fa"
            />
            <div className="text-right">
              <p className="text-white/40 text-xs">Projected</p>
              <p className="text-xl font-bold text-blue-400">
                {optimizationResult ? getProjected('platinum').toFixed(3) : '—'} mt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Palladium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="text-purple-400 font-bold text-lg">Pd</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">Palladium Recovery</h4>
              <p className="text-white/50 text-sm">Target: {targets.preciousMetals.palladium.target} mt</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ProgressRing
              value={getAchievement('palladium')}
              size={80}
              strokeWidth={6}
              color="#a78bfa"
            />
            <div className="text-right">
              <p className="text-white/40 text-xs">Projected</p>
              <p className="text-xl font-bold text-purple-400">
                {optimizationResult ? getProjected('palladium').toFixed(3) : '—'} mt
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sustainability Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Sustainability Targets
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <p className="text-green-400 text-2xl font-bold">{targets.sustainability.recycledContentTarget}%</p>
            <p className="text-white/60 text-sm">Recycled Content</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-blue-400 text-2xl font-bold">-{targets.sustainability.co2ReductionTarget}%</p>
            <p className="text-white/60 text-sm">CO2 Reduction</p>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <p className="text-purple-400 text-2xl font-bold">+{targets.sustainability.energyEfficiencyTarget}%</p>
            <p className="text-white/60 text-sm">Energy Efficiency</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
