// Aurubis ESG Mock Data - Based on actual synthetic data from demo prep

export const emissionsData = [
  {
    id: 'hamburg',
    site: 'Hamburg',
    country: 'Germany',
    region: 'Europe',
    q4_emissions: 21974,
    target_2030: 13000,
    emissions_intensity: 3767,
    renewable_percent: 48,
    hydrogen_usage_mwh: 280,
    scope1: 14583,
    scope2: 7391,
    scope3: 45200,
    monthly: [
      { month: 'Jul', emissions: 7420, target: 4333 },
      { month: 'Aug', emissions: 7180, target: 4333 },
      { month: 'Sep', emissions: 7100, target: 4333 },
      { month: 'Oct', emissions: 7450, target: 4333 },
      { month: 'Nov', emissions: 7280, target: 4333 },
      { month: 'Dec', emissions: 7244, target: 4333 }
    ],
    initiatives: ['H2 Furnace Pilot', 'Renewable PPA Expansion'],
    status: 'critical'
  },
  {
    id: 'pirdop',
    site: 'Pirdop',
    country: 'Bulgaria',
    region: 'Europe',
    q4_emissions: 17999,
    target_2030: 11000,
    emissions_intensity: 4366,
    renewable_percent: 34,
    hydrogen_usage_mwh: 0,
    scope1: 12599,
    scope2: 5400,
    scope3: 38500,
    monthly: [
      { month: 'Jul', emissions: 6100, target: 3667 },
      { month: 'Aug', emissions: 5980, target: 3667 },
      { month: 'Sep', emissions: 5920, target: 3667 },
      { month: 'Oct', emissions: 6050, target: 3667 },
      { month: 'Nov', emissions: 5980, target: 3667 },
      { month: 'Dec', emissions: 5969, target: 3667 }
    ],
    initiatives: ['Tankhouse Efficiency', 'Solar Assessment'],
    status: 'critical'
  },
  {
    id: 'olen',
    site: 'Olen',
    country: 'Belgium',
    region: 'Europe',
    q4_emissions: 13863,
    target_2030: 8400,
    emissions_intensity: 4011,
    renewable_percent: 42,
    hydrogen_usage_mwh: 0,
    scope1: 9004,
    scope2: 4859,
    scope3: 29100,
    monthly: [
      { month: 'Jul', emissions: 4680, target: 2800 },
      { month: 'Aug', emissions: 4590, target: 2800 },
      { month: 'Sep', emissions: 4550, target: 2800 },
      { month: 'Oct', emissions: 4650, target: 2800 },
      { month: 'Nov', emissions: 4610, target: 2800 },
      { month: 'Dec', emissions: 4603, target: 2800 }
    ],
    initiatives: ['Solar Phase 2', 'Heat Recovery'],
    status: 'high'
  },
  {
    id: 'pori',
    site: 'Pori',
    country: 'Finland',
    region: 'Europe',
    q4_emissions: 10641,
    target_2030: 6100,
    emissions_intensity: 3542,
    renewable_percent: 56,
    hydrogen_usage_mwh: 0,
    scope1: 6917,
    scope2: 3724,
    scope3: 22400,
    monthly: [
      { month: 'Jul', emissions: 3580, target: 2033 },
      { month: 'Aug', emissions: 3520, target: 2033 },
      { month: 'Sep', emissions: 3490, target: 2033 },
      { month: 'Oct', emissions: 3570, target: 2033 },
      { month: 'Nov', emissions: 3540, target: 2033 },
      { month: 'Dec', emissions: 3531, target: 2033 }
    ],
    initiatives: ['Grid Optimization'],
    status: 'moderate'
  },
  {
    id: 'lunen',
    site: 'Lunen',
    country: 'Germany',
    region: 'Europe',
    q4_emissions: 7434,
    target_2030: 4300,
    emissions_intensity: 3198,
    renewable_percent: 52,
    hydrogen_usage_mwh: 120,
    scope1: 4832,
    scope2: 2602,
    scope3: 15600,
    monthly: [
      { month: 'Jul', emissions: 2510, target: 1433 },
      { month: 'Aug', emissions: 2460, target: 1433 },
      { month: 'Sep', emissions: 2440, target: 1433 },
      { month: 'Oct', emissions: 2490, target: 1433 },
      { month: 'Nov', emissions: 2470, target: 1433 },
      { month: 'Dec', emissions: 2474, target: 1433 }
    ],
    initiatives: ['H2 Pilot Planning'],
    status: 'on_track'
  },
  {
    id: 'beerse',
    site: 'Beerse',
    country: 'Belgium',
    region: 'Europe',
    q4_emissions: 3210,
    target_2030: 1800,
    emissions_intensity: 2890,
    renewable_percent: 61,
    hydrogen_usage_mwh: 0,
    scope1: 2087,
    scope2: 1123,
    scope3: 6700,
    monthly: [
      { month: 'Jul', emissions: 1090, target: 600 },
      { month: 'Aug', emissions: 1060, target: 600 },
      { month: 'Sep', emissions: 1050, target: 600 },
      { month: 'Oct', emissions: 1080, target: 600 },
      { month: 'Nov', emissions: 1070, target: 600 },
      { month: 'Dec', emissions: 1070, target: 600 }
    ],
    initiatives: ['Heat Recovery Complete'],
    status: 'on_track'
  },
  {
    id: 'richmond',
    site: 'Richmond',
    country: 'USA',
    region: 'North America',
    q4_emissions: 1332,
    target_2030: 5300,
    emissions_intensity: 2100,
    renewable_percent: 72,
    hydrogen_usage_mwh: 0,
    scope1: 866,
    scope2: 466,
    scope3: 2800,
    monthly: [
      { month: 'Jul', emissions: 180, target: 1767 },
      { month: 'Aug', emissions: 220, target: 1767 },
      { month: 'Sep', emissions: 280, target: 1767 },
      { month: 'Oct', emissions: 380, target: 1767 },
      { month: 'Nov', emissions: 420, target: 1767 },
      { month: 'Dec', emissions: 532, target: 1767 }
    ],
    initiatives: ['Green Ramp-up'],
    status: 'below_target'
  }
]

export const complianceData = [
  {
    id: 1,
    regulation: 'EU Taxonomy',
    category: 'Environmental',
    site: 'All Sites',
    status: 'Compliant',
    alignment_percent: 78,
    due_date: '2025-03-31',
    last_audit: '2024-09-15',
    notes: 'Substantial contribution to climate mitigation verified'
  },
  {
    id: 2,
    regulation: 'CSRD',
    category: 'Reporting',
    site: 'All Sites',
    status: 'In Progress',
    alignment_percent: 65,
    due_date: '2025-01-01',
    last_audit: '2024-11-01',
    notes: 'Double materiality assessment completed, data collection ongoing'
  },
  {
    id: 3,
    regulation: 'Copper Mark',
    category: 'Certification',
    site: 'Hamburg',
    status: 'Certified',
    alignment_percent: 100,
    due_date: '2026-06-30',
    last_audit: '2024-06-15',
    notes: 'Full certification achieved, annual surveillance due'
  },
  {
    id: 4,
    regulation: 'Copper Mark',
    category: 'Certification',
    site: 'Pirdop',
    status: 'Certified',
    alignment_percent: 100,
    due_date: '2026-08-15',
    last_audit: '2024-08-10',
    notes: 'Renewed certification'
  },
  {
    id: 5,
    regulation: 'Copper Mark',
    category: 'Certification',
    site: 'Olen',
    status: 'In Progress',
    alignment_percent: 82,
    due_date: '2025-03-01',
    last_audit: '2024-10-20',
    notes: 'Final audit scheduled for February 2025'
  },
  {
    id: 6,
    regulation: 'ISO 14001',
    category: 'Environmental',
    site: 'All Sites',
    status: 'Certified',
    alignment_percent: 100,
    due_date: '2026-12-31',
    last_audit: '2024-07-22',
    notes: 'Environmental management system certified'
  },
  {
    id: 7,
    regulation: 'ISO 50001',
    category: 'Energy',
    site: 'Hamburg',
    status: 'Certified',
    alignment_percent: 100,
    due_date: '2025-11-30',
    last_audit: '2024-05-18',
    notes: 'Energy management excellence'
  },
  {
    id: 8,
    regulation: 'ISO 50001',
    category: 'Energy',
    site: 'Pirdop',
    status: 'Pending',
    alignment_percent: 45,
    due_date: '2025-06-30',
    last_audit: null,
    notes: 'Certification process initiated'
  },
  {
    id: 9,
    regulation: 'EU ETS',
    category: 'Carbon',
    site: 'All EU Sites',
    status: 'Compliant',
    alignment_percent: 100,
    due_date: '2025-04-30',
    last_audit: '2024-12-01',
    notes: 'All allowances secured for 2024'
  },
  {
    id: 10,
    regulation: 'REACH',
    category: 'Chemical',
    site: 'All EU Sites',
    status: 'Compliant',
    alignment_percent: 100,
    due_date: '2025-12-31',
    last_audit: '2024-09-30',
    notes: 'All substances registered'
  },
  {
    id: 11,
    regulation: 'GRI Standards',
    category: 'Reporting',
    site: 'All Sites',
    status: 'Compliant',
    alignment_percent: 92,
    due_date: '2025-06-30',
    last_audit: '2024-08-15',
    notes: 'Comprehensive sustainability report published'
  },
  {
    id: 12,
    regulation: 'Science Based Targets',
    category: 'Climate',
    site: 'All Sites',
    status: 'Certified',
    alignment_percent: 100,
    due_date: '2030-12-31',
    last_audit: '2024-04-20',
    notes: 'SBTi validated 1.5°C pathway'
  }
]

export const initiativesData = [
  {
    id: 1,
    name: 'Hamburg H2 Furnace Scale-up',
    site: 'Hamburg',
    category: 'Hydrogen',
    status: 'Active',
    investment_eur: 45000000,
    expected_reduction_tons: 4500,
    start_date: '2024-01-15',
    target_completion: '2026-12-31',
    progress_percent: 35,
    roi_years: 6,
    description: 'Scale hydrogen furnace pilot to full anode furnace conversion'
  },
  {
    id: 2,
    name: 'Pirdop Solar Installation',
    site: 'Pirdop',
    category: 'Renewable',
    status: 'In Progress',
    investment_eur: 38000000,
    expected_reduction_tons: 3200,
    start_date: '2024-06-01',
    target_completion: '2026-06-30',
    progress_percent: 22,
    roi_years: 8,
    description: '50 MW on-site solar installation to reduce Scope 2 emissions'
  },
  {
    id: 3,
    name: 'Olen Heat Recovery',
    site: 'Olen',
    category: 'Efficiency',
    status: 'Active',
    investment_eur: 12000000,
    expected_reduction_tons: 1800,
    start_date: '2024-03-01',
    target_completion: '2025-09-30',
    progress_percent: 68,
    roi_years: 4,
    description: 'Waste heat capture from smelting operations'
  },
  {
    id: 4,
    name: 'Olen Solar Phase 2',
    site: 'Olen',
    category: 'Renewable',
    status: 'Active',
    investment_eur: 10000000,
    expected_reduction_tons: 2000,
    start_date: '2024-04-15',
    target_completion: '2025-06-30',
    progress_percent: 55,
    roi_years: 5,
    description: 'Additional 25 MW solar capacity'
  },
  {
    id: 5,
    name: 'Lunen H2 Pilot',
    site: 'Lunen',
    category: 'Hydrogen',
    status: 'Planning',
    investment_eur: 8000000,
    expected_reduction_tons: 1200,
    start_date: '2025-01-01',
    target_completion: '2026-06-30',
    progress_percent: 15,
    roi_years: 5,
    description: 'Hydrogen furnace pilot program'
  },
  {
    id: 6,
    name: 'Hamburg Renewable PPA',
    site: 'Hamburg',
    category: 'Renewable',
    status: 'Active',
    investment_eur: 5000000,
    expected_reduction_tons: 2200,
    start_date: '2024-02-01',
    target_completion: '2025-03-31',
    progress_percent: 78,
    roi_years: 3,
    description: 'Expand renewable energy PPA from 48% to 75%'
  },
  {
    id: 7,
    name: 'Pori Grid Optimization',
    site: 'Pori',
    category: 'Efficiency',
    status: 'Active',
    investment_eur: 3500000,
    expected_reduction_tons: 800,
    start_date: '2024-05-01',
    target_completion: '2025-04-30',
    progress_percent: 62,
    roi_years: 4,
    description: 'Smart grid integration for optimal renewable usage'
  },
  {
    id: 8,
    name: 'Richmond Green Ramp-up',
    site: 'Richmond',
    category: 'Renewable',
    status: 'Active',
    investment_eur: 15000000,
    expected_reduction_tons: 0,
    start_date: '2024-01-01',
    target_completion: '2025-12-31',
    progress_percent: 45,
    roi_years: 7,
    description: 'New plant designed for carbon-neutral operations from start'
  },
  {
    id: 9,
    name: 'Fleet Electrification',
    site: 'All Sites',
    category: 'Transport',
    status: 'In Progress',
    investment_eur: 6000000,
    expected_reduction_tons: 450,
    start_date: '2024-07-01',
    target_completion: '2026-12-31',
    progress_percent: 28,
    roi_years: 6,
    description: 'Convert internal logistics fleet to electric vehicles'
  },
  {
    id: 10,
    name: 'Process Digitalization',
    site: 'All Sites',
    category: 'Efficiency',
    status: 'Active',
    investment_eur: 4500000,
    expected_reduction_tons: 650,
    start_date: '2024-04-01',
    target_completion: '2025-12-31',
    progress_percent: 42,
    roi_years: 3,
    description: 'AI-powered process optimization for energy efficiency'
  }
]

// Helper functions
export function getSiteById(siteId) {
  return emissionsData.find(s => s.id === siteId)
}

export function getEmissionsTrend() {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(month => {
    const total = emissionsData.reduce((sum, site) => {
      const monthData = site.monthly.find(m => m.month === month)
      return sum + (monthData?.emissions || 0)
    }, 0)
    const target = emissionsData.reduce((sum, site) => {
      const monthData = site.monthly.find(m => m.month === month)
      return sum + (monthData?.target || 0)
    }, 0)
    return { month, emissions: total, target }
  })
}

export function calculateNetworkTotals() {
  const totalEmissions = emissionsData.reduce((sum, s) => sum + s.q4_emissions, 0)
  const totalTarget = emissionsData.reduce((sum, s) => sum + s.target_2030, 0)
  const avgIntensity = Math.round(emissionsData.reduce((sum, s) => sum + s.emissions_intensity, 0) / emissionsData.length)
  const avgRenewable = Math.round(emissionsData.reduce((sum, s) => sum + s.renewable_percent, 0) / emissionsData.length)
  const totalH2 = emissionsData.reduce((sum, s) => sum + s.hydrogen_usage_mwh, 0)
  const totalScope1 = emissionsData.reduce((sum, s) => sum + s.scope1, 0)
  const totalScope2 = emissionsData.reduce((sum, s) => sum + s.scope2, 0)
  const totalScope3 = emissionsData.reduce((sum, s) => sum + s.scope3, 0)

  return {
    totalEmissions,
    totalTarget,
    gap: totalEmissions - totalTarget,
    gapPercent: Math.round(((totalEmissions - totalTarget) / totalTarget) * 100),
    avgIntensity,
    avgRenewable,
    totalH2,
    totalScope1,
    totalScope2,
    totalScope3,
    siteCount: emissionsData.length,
    sitesOnTrack: emissionsData.filter(s => s.status === 'on_track' || s.status === 'below_target').length,
    sitesOffTrack: emissionsData.filter(s => s.status === 'critical' || s.status === 'high').length
  }
}

export function getComplianceByCategory() {
  const categories = [...new Set(complianceData.map(c => c.category))]
  return categories.map(category => {
    const items = complianceData.filter(c => c.category === category)
    const compliant = items.filter(c => c.status === 'Compliant' || c.status === 'Certified').length
    return {
      category,
      total: items.length,
      compliant,
      rate: Math.round((compliant / items.length) * 100)
    }
  })
}

export function getInitiativesByCategory() {
  const categories = [...new Set(initiativesData.map(i => i.category))]
  return categories.map(category => {
    const items = initiativesData.filter(i => i.category === category)
    const totalInvestment = items.reduce((sum, i) => sum + i.investment_eur, 0)
    const totalReduction = items.reduce((sum, i) => sum + i.expected_reduction_tons, 0)
    return {
      category,
      count: items.length,
      investment: totalInvestment,
      reduction: totalReduction
    }
  })
}
