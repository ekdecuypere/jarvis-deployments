import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import Badge from '../shared/Badge';
import ProgressRing from '../shared/ProgressRing';
import { formatNumber, formatCurrency } from '../../utils/optimizationEngine';

export default function SitesPanel() {
  const { sites, selectSite, selectedSite, optimizationResult } = useOptimizerStore();

  const getSiteAllocation = (siteId) => {
    if (!optimizationResult) return null;
    return optimizationResult.siteAllocations.find(sa => sa.siteId === siteId);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'primary':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'secondary':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'refining':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {sites.map((site, index) => {
        const allocation = getSiteAllocation(site.id);
        const isSelected = selectedSite?.id === site.id;
        const utilizationColor = site.capacity.currentUtilization > 85 ? '#ef4444' :
                                site.capacity.currentUtilization > 70 ? '#f59e0b' : '#22c55e';

        return (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => selectSite(site.id)}
            className={`glass-card-hover p-5 cursor-pointer ${isSelected ? 'ring-2 ring-aurubis-copper' : ''}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-aurubis-copper/20 text-aurubis-copper">
                  {getTypeIcon(site.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{site.name}</h3>
                  <p className="text-white/50 text-sm">{site.location}</p>
                </div>
              </div>
              <Badge variant={site.status === 'operational' ? 'success' : 'warning'}>
                {site.status}
              </Badge>
            </div>

            {/* Capabilities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {site.capabilities.map(cap => (
                <Badge key={cap} variant="default" size="sm">
                  {cap.replace('-', ' ')}
                </Badge>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <ProgressRing
                  value={site.capacity.currentUtilization}
                  size={80}
                  strokeWidth={6}
                  label="Utilization"
                  color={utilizationColor}
                />
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Available Q1</p>
                <p className="text-xl font-bold text-white">{formatNumber(site.capacity.availableCapacity)}</p>
                <p className="text-white/40 text-xs">metric tons</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Daily Capacity</p>
                <p className="text-xl font-bold text-white">{formatNumber(site.capacity.dailyProcessing)}</p>
                <p className="text-white/40 text-xs">mt/day</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Cu Recovery</p>
                <p className="text-xl font-bold text-green-400">{site.efficiency.copperRecovery}%</p>
                <p className="text-white/40 text-xs">efficiency</p>
              </div>
            </div>

            {/* Efficiency Metrics */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-white/5 rounded-xl mb-4">
              <div className="text-center">
                <p className="text-yellow-400 font-semibold">{site.efficiency.goldRecovery}%</p>
                <p className="text-white/40 text-xs">Au Recovery</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300 font-semibold">{site.efficiency.silverRecovery}%</p>
                <p className="text-white/40 text-xs">Ag Recovery</p>
              </div>
              <div className="text-center">
                <p className="text-blue-400 font-semibold">{site.efficiency.energyEfficiency}%</p>
                <p className="text-white/40 text-xs">Energy Eff.</p>
              </div>
              <div className="text-center">
                <p className="text-aurubis-copper font-semibold">{site.capacity.annualThroughput / 1000}K</p>
                <p className="text-white/40 text-xs">Annual mt</p>
              </div>
            </div>

            {/* Processing Costs */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white/40">Processing costs:</span>
              {site.processingCosts.concentrate > 0 && (
                <span className="text-white/70">Concentrate: €{site.processingCosts.concentrate}/mt</span>
              )}
              {site.processingCosts.scrap > 0 && (
                <span className="text-white/70">Scrap: €{site.processingCosts.scrap}/mt</span>
              )}
              {site.processingCosts.ewaste > 0 && (
                <span className="text-white/70">E-waste: €{site.processingCosts.ewaste}/mt</span>
              )}
            </div>

            {/* Allocation Result */}
            {allocation && allocation.allocated > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 bg-aurubis-copper/10 border border-aurubis-copper/30 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-aurubis-copper font-medium">Optimized Allocation</p>
                    <p className="text-white/60 text-sm">{allocation.materialCount} materials assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-aurubis-copper">{formatNumber(allocation.allocated)} mt</p>
                    <p className="text-white/40 text-xs">{allocation.utilization.toFixed(1)}% of Q1 capacity</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
