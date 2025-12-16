import { create } from 'zustand'
import { emissionsData, complianceData, initiativesData, getSiteById, getEmissionsTrend, calculateNetworkTotals } from '../data/mockData'

const useESGStore = create((set, get) => ({
  // Data
  emissions: emissionsData,
  compliance: complianceData,
  initiatives: initiativesData,

  // UI State
  selectedSite: null,
  selectedPeriod: 'Q4 2024',
  isLoading: false,

  // Filters
  filters: {
    dateRange: { start: '2024-07-01', end: '2024-12-31' },
    sites: [],
    status: 'all'
  },

  // Actions
  setSelectedSite: (siteId) => set({ selectedSite: siteId }),

  setSelectedPeriod: (period) => set({ selectedPeriod: period }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  clearFilters: () => set({
    filters: {
      dateRange: { start: '2024-07-01', end: '2024-12-31' },
      sites: [],
      status: 'all'
    }
  }),

  // Computed values
  getNetworkTotals: () => {
    return calculateNetworkTotals()
  },

  getSiteDetails: (siteId) => {
    return getSiteById(siteId)
  },

  getEmissionsTrendData: () => {
    return getEmissionsTrend()
  },

  getTopEmitters: () => {
    const { emissions } = get()
    return [...emissions]
      .sort((a, b) => b.q4_emissions - a.q4_emissions)
      .slice(0, 5)
  },

  getSitesOffTrack: () => {
    const { emissions } = get()
    return emissions.filter(site => {
      const gap = site.q4_emissions - site.target_2030
      const gapPercent = (gap / site.target_2030) * 100
      return gapPercent > 50
    })
  },

  getComplianceStatus: () => {
    const { compliance } = get()
    const total = compliance.length
    const compliant = compliance.filter(c => c.status === 'Compliant' || c.status === 'Certified').length
    const pending = compliance.filter(c => c.status === 'In Progress' || c.status === 'Pending').length
    const attention = compliance.filter(c => c.status === 'Action Required' || c.status === 'Expired').length

    return {
      total,
      compliant,
      pending,
      attention,
      complianceRate: Math.round((compliant / total) * 100)
    }
  },

  getActiveInitiatives: () => {
    const { initiatives } = get()
    return initiatives.filter(i => i.status === 'Active' || i.status === 'In Progress')
  },

  getTotalInvestment: () => {
    const { initiatives } = get()
    return initiatives.reduce((sum, i) => sum + i.investment_eur, 0)
  },

  getExpectedReduction: () => {
    const { initiatives } = get()
    return initiatives.reduce((sum, i) => sum + i.expected_reduction_tons, 0)
  }
}))

export default useESGStore
