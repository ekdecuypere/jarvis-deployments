import { motion, AnimatePresence } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import Badge from '../shared/Badge';
import ProgressRing from '../shared/ProgressRing';
import { formatNumber, formatCurrency } from '../../utils/optimizationEngine';

export default function OptimizationPanel() {
  const {
    settings,
    updateSettings,
    runOptimization,
    optimizationResult,
    isOptimizing,
    lastOptimized
  } = useOptimizerStore();

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-aurubis-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Optimization Settings
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-white font-medium group-hover:text-aurubis-copper transition-colors">
                Prioritize Precious Metal Recovery
              </p>
              <p className="text-white/50 text-sm">Maximize gold, silver, platinum, and palladium yields</p>
            </div>
            <input
              type="checkbox"
              checked={settings.prioritizePreciousMetals}
              onChange={(e) => updateSettings({ prioritizePreciousMetals: e.target.checked })}
              className="w-5 h-5 rounded accent-aurubis-copper"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-white font-medium group-hover:text-aurubis-copper transition-colors">
                Balance Site Load
              </p>
              <p className="text-white/50 text-sm">Distribute materials evenly across facilities</p>
            </div>
            <input
              type="checkbox"
              checked={settings.balanceSiteLoad}
              onChange={(e) => updateSettings({ balanceSiteLoad: e.target.checked })}
              className="w-5 h-5 rounded accent-aurubis-copper"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-white font-medium group-hover:text-aurubis-copper transition-colors">
                Minimize Processing Cost
              </p>
              <p className="text-white/50 text-sm">Optimize for lowest processing expenses</p>
            </div>
            <input
              type="checkbox"
              checked={settings.minimizeCost}
              onChange={(e) => updateSettings({ minimizeCost: e.target.checked })}
              className="w-5 h-5 rounded accent-aurubis-copper"
            />
          </label>
        </div>
      </div>

      {/* Run Optimization Button */}
      <motion.button
        onClick={runOptimization}
        disabled={isOptimizing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary flex items-center justify-center gap-3 py-4 disabled:opacity-50"
      >
        {isOptimizing ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Optimizing...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run Optimization
          </>
        )}
      </motion.button>

      {lastOptimized && (
        <p className="text-white/40 text-sm text-center">
          Last optimized: {new Date(lastOptimized).toLocaleTimeString()}
        </p>
      )}

      {/* Results Summary */}
      <AnimatePresence>
        {optimizationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Optimization Score */}
            <div className="glass-card p-5 text-center">
              <ProgressRing
                value={optimizationResult.optimizationScore}
                size={140}
                strokeWidth={10}
                label="Optimization"
                sublabel="Score"
                color={optimizationResult.optimizationScore > 75 ? '#22c55e' :
                       optimizationResult.optimizationScore > 50 ? '#f59e0b' : '#ef4444'}
              />
              <p className="text-white/60 mt-3 text-sm">
                Based on target achievement, site balance, and value optimization
              </p>
            </div>

            {/* Key Metrics */}
            <div className="glass-card p-5">
              <h4 className="font-semibold text-white mb-4">Optimization Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/40 text-xs">Total Allocated</p>
                  <p className="text-xl font-bold text-white">
                    {formatNumber(optimizationResult.totals.totalQuantity)} mt
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Processing Cost</p>
                  <p className="text-xl font-bold text-red-400">
                    {formatCurrency(optimizationResult.totals.totalCost)}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Total Value</p>
                  <p className="text-xl font-bold text-green-400">
                    {formatCurrency(optimizationResult.totals.totalValue)}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Net Value</p>
                  <p className="text-xl font-bold gradient-text">
                    {formatCurrency(optimizationResult.totals.totalValue - optimizationResult.totals.totalCost)}
                  </p>
                </div>
              </div>
            </div>

            {/* Target Achievement */}
            <div className="glass-card p-5">
              <h4 className="font-semibold text-white mb-4">Target Achievement</h4>
              <div className="space-y-3">
                {Object.entries(optimizationResult.targetAchievement).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70 capitalize">{key}</span>
                      <span className={value >= 100 ? 'text-green-400' : value >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                        {value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(value, 100)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          value >= 100 ? 'bg-green-500' :
                          value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card p-5">
              <h4 className="font-semibold text-white mb-4">Recommendations</h4>
              <div className="space-y-3">
                {optimizationResult.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      rec.type === 'warning' ? 'bg-red-500/10 border-red-500/30' :
                      rec.type === 'opportunity' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      rec.type === 'cost' ? 'bg-blue-500/10 border-blue-500/30' :
                      'bg-green-500/10 border-green-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Badge
                        variant={rec.type === 'warning' ? 'error' :
                                rec.type === 'opportunity' ? 'warning' :
                                rec.type === 'cost' ? 'info' : 'success'}
                        size="sm"
                      >
                        {rec.impact}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-white font-medium">{rec.title}</p>
                        <p className="text-white/60 text-sm mt-1">{rec.message}</p>
                        <p className="text-aurubis-copper text-sm mt-2 font-medium">
                          Action: {rec.action}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
