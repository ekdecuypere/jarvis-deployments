import { create } from 'zustand';
import { rawMaterials, processingSites, productionTargets } from '../data/inventoryData';
import { optimizeAllocation } from '../utils/optimizationEngine';

const useOptimizerStore = create((set, get) => ({
  // Data
  materials: rawMaterials,
  sites: processingSites,
  targets: productionTargets,

  // Optimization settings
  settings: {
    prioritizePreciousMetals: true,
    balanceSiteLoad: true,
    minimizeCost: false
  },

  // Results
  optimizationResult: null,
  isOptimizing: false,
  lastOptimized: null,

  // UI State
  selectedView: 'dashboard',
  selectedMaterial: null,
  selectedSite: null,
  showAllocationDetails: false,

  // Actions
  setView: (view) => set({ selectedView: view }),

  selectMaterial: (materialId) => set({
    selectedMaterial: get().materials.find(m => m.id === materialId) || null
  }),

  selectSite: (siteId) => set({
    selectedSite: get().sites.find(s => s.id === siteId) || null
  }),

  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  toggleAllocationDetails: () => set((state) => ({
    showAllocationDetails: !state.showAllocationDetails
  })),

  // Run optimization
  runOptimization: () => {
    const { materials, sites, targets, settings } = get();

    set({ isOptimizing: true });

    // Simulate async processing
    setTimeout(() => {
      const result = optimizeAllocation(materials, sites, targets, settings);

      set({
        optimizationResult: result,
        isOptimizing: false,
        lastOptimized: new Date().toISOString()
      });
    }, 800);
  },

  // Update material quantity (for scenario planning)
  updateMaterialQuantity: (materialId, newQuantity) => set((state) => ({
    materials: state.materials.map(m =>
      m.id === materialId ? { ...m, quantity: newQuantity } : m
    ),
    optimizationResult: null // Clear results when data changes
  })),

  // Update material status
  updateMaterialStatus: (materialId, newStatus) => set((state) => ({
    materials: state.materials.map(m =>
      m.id === materialId ? { ...m, status: newStatus } : m
    ),
    optimizationResult: null
  })),

  // Update site capacity
  updateSiteCapacity: (siteId, newCapacity) => set((state) => ({
    sites: state.sites.map(s =>
      s.id === siteId
        ? { ...s, capacity: { ...s.capacity, availableCapacity: newCapacity } }
        : s
    ),
    optimizationResult: null
  })),

  // Reset to defaults
  resetData: () => set({
    materials: rawMaterials,
    sites: processingSites,
    targets: productionTargets,
    optimizationResult: null,
    settings: {
      prioritizePreciousMetals: true,
      balanceSiteLoad: true,
      minimizeCost: false
    }
  }),

  // Get computed values
  getTotalInventory: () => {
    const materials = get().materials;
    return materials.reduce((sum, m) => sum + m.quantity, 0);
  },

  getInventoryByType: () => {
    const materials = get().materials;
    return materials.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + m.quantity;
      return acc;
    }, {});
  },

  getTotalCapacity: () => {
    const sites = get().sites;
    return sites.reduce((sum, s) => sum + s.capacity.availableCapacity, 0);
  },

  getAvailableMaterials: () => {
    return get().materials.filter(m =>
      m.status === 'available' || m.status === 'in-transit'
    );
  }
}));

export default useOptimizerStore;
