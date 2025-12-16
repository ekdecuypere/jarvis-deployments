import { Component, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useOptimizerStore from './store/optimizerStore';
import StatCard from './components/shared/StatCard';
import InventoryPanel from './components/inventory/InventoryPanel';
import SitesPanel from './components/sites/SitesPanel';
import OptimizationPanel from './components/optimization/OptimizationPanel';
import AllocationResults from './components/optimization/AllocationResults';
import AllocationChart from './components/charts/AllocationChart';
import RecoveryChart from './components/charts/RecoveryChart';
import SiteUtilizationChart from './components/charts/SiteUtilizationChart';
import TargetsPanel from './components/targets/TargetsPanel';
import { formatNumber, formatCurrency, calculatePreciousMetalValue, calculateCopperValue } from './utils/optimizationEngine';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-aurubis-dark p-4">
          <div className="bg-aurubis-navy rounded-2xl p-8 max-w-lg text-center border border-red-500/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-4">An unexpected error occurred.</p>
            <pre className="text-left bg-black/30 rounded p-3 mb-4 text-xs text-red-400 overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-aurubis-copper hover:bg-aurubis-copper/80 rounded-lg text-white transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' },
  { id: 'inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 'sites', label: 'Sites', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'targets', label: 'Targets', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'optimize', label: 'Optimize', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'results', label: 'Results', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
];

function AppContent() {
  const {
    selectedView,
    setView,
    materials,
    sites,
    optimizationResult,
    runOptimization,
    getTotalInventory,
    getTotalCapacity
  } = useOptimizerStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Auto-run optimization on load
    const timer = setTimeout(() => {
      runOptimization();
      setIsInitialized(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [runOptimization]);

  // Calculate summary stats
  const totalInventory = getTotalInventory();
  const totalCapacity = getTotalCapacity();

  const totalPMValue = materials.reduce((sum, m) => {
    const pmVal = calculatePreciousMetalValue(m);
    return sum + pmVal.total;
  }, 0);

  const totalCuValue = materials.reduce((sum, m) => {
    return sum + calculateCopperValue(m);
  }, 0);

  const renderContent = () => {
    switch (selectedView) {
      case 'inventory':
        return <InventoryPanel />;
      case 'sites':
        return <SitesPanel />;
      case 'targets':
        return <TargetsPanel />;
      case 'optimize':
        return <OptimizationPanel />;
      case 'results':
        return <AllocationResults />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Inventory"
                value={`${formatNumber(totalInventory)} mt`}
                subtitle="Available raw materials"
                color="copper"
                icon={
                  <svg className="w-6 h-6 text-aurubis-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                }
              />
              <StatCard
                title="Q1 Capacity"
                value={`${formatNumber(totalCapacity)} mt`}
                subtitle="Available processing capacity"
                color="blue"
                icon={
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
              <StatCard
                title="Precious Metal Value"
                value={formatCurrency(totalPMValue)}
                subtitle="Au, Ag, Pt, Pd combined"
                color="gold"
                icon={
                  <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                title="Copper Value"
                value={formatCurrency(totalCuValue)}
                subtitle="Based on current prices"
                color="green"
                icon={
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
            </div>

            {/* Optimization Score */}
            {optimizationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Optimization Score</h3>
                    <p className="text-white/50 text-sm">Based on target achievement, site balance, and value optimization</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-5xl font-bold ${
                      optimizationResult.optimizationScore >= 80 ? 'text-green-400' :
                      optimizationResult.optimizationScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {optimizationResult.optimizationScore}
                    </div>
                    <div className="text-white/40 text-sm">/ 100</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AllocationChart />
              <RecoveryChart />
            </div>

            <SiteUtilizationChart />

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setView('optimize')}
                  className="btn-primary text-center"
                >
                  Run Optimization
                </button>
                <button
                  onClick={() => setView('results')}
                  className="btn-secondary text-center"
                >
                  View Allocations
                </button>
                <button
                  onClick={() => setView('inventory')}
                  className="btn-secondary text-center"
                >
                  Manage Inventory
                </button>
                <button
                  onClick={() => setView('targets')}
                  className="btn-secondary text-center"
                >
                  Review Targets
                </button>
              </div>
            </div>

            {/* Recommendations Preview */}
            {optimizationResult && optimizationResult.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Key Recommendations</h3>
                  <button
                    onClick={() => setView('optimize')}
                    className="text-aurubis-copper text-sm hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {optimizationResult.recommendations.slice(0, 3).map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        rec.type === 'warning' ? 'bg-red-500/10 border-red-500/30' :
                        rec.type === 'opportunity' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <p className="text-white font-medium">{rec.title}</p>
                      <p className="text-white/60 text-sm mt-1">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-aurubis-dark/50 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurubis-copper to-yellow-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-white">Aurubis</h1>
            <p className="text-xs text-white/50">Production Optimizer</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                selectedView === item.id
                  ? 'bg-aurubis-copper/20 text-aurubis-copper'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sites Status */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3 px-2">Sites Status</p>
          <div className="space-y-2">
            {sites.map(site => (
              <div key={site.id} className="flex items-center gap-2 px-2">
                <div className={`w-2 h-2 rounded-full ${
                  site.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <span className="text-white/70 text-sm">{site.name.split(' ')[0]}</span>
                <span className="text-white/40 text-xs ml-auto">{site.capacity.currentUtilization}%</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white capitalize">{selectedView}</h2>
            <p className="text-white/50">
              {selectedView === 'dashboard' && 'Multi-site production optimization overview'}
              {selectedView === 'inventory' && 'Raw material inventory management'}
              {selectedView === 'sites' && 'European processing facility status'}
              {selectedView === 'targets' && 'Q1 2025 production targets and KPIs'}
              {selectedView === 'optimize' && 'Configure and run allocation optimization'}
              {selectedView === 'results' && 'Detailed material allocation results'}
            </p>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
