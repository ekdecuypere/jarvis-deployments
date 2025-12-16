import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import Badge from '../shared/Badge';
import { formatNumber, formatCurrency } from '../../utils/optimizationEngine';

export default function AllocationResults() {
  const { optimizationResult, sites } = useOptimizerStore();

  if (!optimizationResult) {
    return (
      <div className="glass-card p-8 text-center">
        <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-white/50">Run optimization to see allocation results</p>
      </div>
    );
  }

  const { allocations, siteAllocations } = optimizationResult;

  // Group allocations by site
  const allocationsBySite = sites.map(site => ({
    site,
    allocations: allocations.filter(a => a.siteId === site.id),
    summary: siteAllocations.find(sa => sa.siteId === site.id)
  }));

  return (
    <div className="space-y-6">
      {/* Flow Visualization Header */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-aurubis-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Material Allocation Flow
        </h3>
        <p className="text-white/60 text-sm">
          Recommended distribution of {formatNumber(optimizationResult.totals.totalQuantity)} metric tons
          across {siteAllocations.filter(s => s.allocated > 0).length} processing sites
        </p>
      </div>

      {/* Site Allocations */}
      {allocationsBySite.map(({ site, allocations: siteAllocs, summary }, siteIndex) => {
        if (!summary || summary.allocated === 0) return null;

        return (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: siteIndex * 0.1 }}
            className="glass-card overflow-hidden"
          >
            {/* Site Header */}
            <div className="p-5 bg-gradient-to-r from-aurubis-copper/20 to-transparent border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-aurubis-copper/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-aurubis-copper">
                      {site.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{site.name}</h4>
                    <p className="text-white/50 text-sm">{site.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-aurubis-copper">
                    {formatNumber(summary.allocated)} mt
                  </p>
                  <p className="text-white/50 text-sm">
                    {summary.utilization.toFixed(1)}% capacity utilized
                  </p>
                </div>
              </div>
            </div>

            {/* Material Allocations */}
            <div className="p-5 space-y-3">
              {siteAllocs.map((alloc, allocIndex) => (
                <motion.div
                  key={alloc.materialId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (siteIndex * 0.1) + (allocIndex * 0.05) }}
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-white">{alloc.materialName}</h5>
                        <Badge
                          variant={alloc.materialType === 'concentrate' ? 'copper' :
                                  alloc.materialType === 'scrap' ? 'success' : 'info'}
                          size="sm"
                        >
                          {alloc.materialType}
                        </Badge>
                      </div>
                      <p className="text-white/50 text-sm">{alloc.source}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{formatNumber(alloc.quantity)} mt</p>
                      {alloc.allocRatio < 1 && (
                        <p className="text-yellow-400 text-xs">
                          {(alloc.allocRatio * 100).toFixed(0)}% of batch
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Allocation Metrics */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-white/40 text-xs">Compatibility</p>
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${alloc.compatibility}%` }}
                          />
                        </div>
                        <span className="text-white/70">{alloc.compatibility.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Processing Cost</p>
                      <p className="text-red-400 font-medium">{formatCurrency(alloc.processingCost)}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">PM Value</p>
                      <p className="text-yellow-400 font-medium">{formatCurrency(alloc.pmValue)}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Cu Value</p>
                      <p className="text-aurubis-copper font-medium">{formatCurrency(alloc.copperValue)}</p>
                    </div>
                  </div>

                  {/* Expected Recovery */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-white/40 text-xs mb-2">Expected Recovery</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-aurubis-copper">
                        Cu: {formatNumber(alloc.expectedRecovery.copper, 1)} mt
                      </span>
                      <span className="text-yellow-400">
                        Au: {(alloc.expectedRecovery.gold * 1000).toFixed(2)} kg
                      </span>
                      <span className="text-gray-300">
                        Ag: {(alloc.expectedRecovery.silver * 1000).toFixed(1)} kg
                      </span>
                      <span className="text-blue-300">
                        Pt: {(alloc.expectedRecovery.platinum * 1000000).toFixed(1)} g
                      </span>
                      <span className="text-purple-300">
                        Pd: {(alloc.expectedRecovery.palladium * 1000000).toFixed(1)} g
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Site Summary Footer */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="grid grid-cols-5 gap-4 text-center text-sm">
                <div>
                  <p className="text-white/40 text-xs">Cu Recovery</p>
                  <p className="text-aurubis-copper font-semibold">
                    {formatNumber(summary.expectedRecovery.copper, 1)} mt
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Au Recovery</p>
                  <p className="text-yellow-400 font-semibold">
                    {(summary.expectedRecovery.gold * 1000).toFixed(2)} kg
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Ag Recovery</p>
                  <p className="text-gray-300 font-semibold">
                    {(summary.expectedRecovery.silver * 1000).toFixed(1)} kg
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Total Cost</p>
                  <p className="text-red-400 font-semibold">
                    {formatCurrency(summary.processingCost)}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">PM Value</p>
                  <p className="text-green-400 font-semibold">
                    {formatCurrency(summary.pmValue)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
