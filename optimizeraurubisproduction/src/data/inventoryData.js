// Raw Material Inventory Data
export const rawMaterials = [
  {
    id: 'conc-chile-001',
    name: 'Chilean Copper Concentrate',
    type: 'concentrate',
    source: 'Chile',
    supplier: 'Codelco',
    quantity: 45000, // metric tons
    copperContent: 28.5, // percentage
    preciousMetals: {
      gold: 0.8, // g/t
      silver: 85, // g/t
      platinum: 0.02, // g/t
      palladium: 0.01 // g/t
    },
    impurities: {
      sulfur: 32,
      iron: 28,
      arsenic: 0.3,
      lead: 0.1
    },
    arrivalDate: '2024-12-15',
    storageLocation: 'Hamburg Port Terminal A',
    status: 'available',
    estimatedValue: 125000000 // EUR
  },
  {
    id: 'conc-chile-002',
    name: 'High-Grade Chilean Concentrate',
    type: 'concentrate',
    source: 'Chile',
    supplier: 'Antofagasta',
    quantity: 28000,
    copperContent: 32.1,
    preciousMetals: {
      gold: 1.2,
      silver: 120,
      platinum: 0.03,
      palladium: 0.02
    },
    impurities: {
      sulfur: 30,
      iron: 25,
      arsenic: 0.2,
      lead: 0.08
    },
    arrivalDate: '2024-12-20',
    storageLocation: 'Hamburg Port Terminal B',
    status: 'available',
    estimatedValue: 98000000
  },
  {
    id: 'scrap-de-001',
    name: 'German Industrial Scrap',
    type: 'scrap',
    source: 'Germany',
    supplier: 'Recycling Partners DE',
    quantity: 12500,
    copperContent: 92,
    preciousMetals: {
      gold: 0.1,
      silver: 15,
      platinum: 0.001,
      palladium: 0.001
    },
    impurities: {
      tin: 2.5,
      zinc: 1.8,
      lead: 0.5,
      nickel: 0.3
    },
    arrivalDate: '2024-12-10',
    storageLocation: 'Lunen Facility',
    status: 'available',
    estimatedValue: 85000000
  },
  {
    id: 'scrap-de-002',
    name: 'Automotive Copper Scrap',
    type: 'scrap',
    source: 'Germany',
    supplier: 'AutoRecycle GmbH',
    quantity: 8200,
    copperContent: 88,
    preciousMetals: {
      gold: 0.05,
      silver: 8,
      platinum: 0.15,
      palladium: 0.25
    },
    impurities: {
      tin: 1.2,
      zinc: 2.1,
      lead: 0.8,
      nickel: 0.5
    },
    arrivalDate: '2024-12-12',
    storageLocation: 'Lunen Facility',
    status: 'available',
    estimatedValue: 52000000
  },
  {
    id: 'ewaste-us-001',
    name: 'Richmond E-Waste - Circuit Boards',
    type: 'e-waste',
    source: 'USA (Richmond)',
    supplier: 'Aurubis Richmond',
    quantity: 3800,
    copperContent: 22,
    preciousMetals: {
      gold: 250,
      silver: 1200,
      platinum: 8,
      palladium: 45
    },
    impurities: {
      tin: 4.5,
      lead: 2.8,
      nickel: 1.2,
      zinc: 1.5
    },
    arrivalDate: '2024-12-18',
    storageLocation: 'Hamburg Processing Center',
    status: 'in-transit',
    estimatedValue: 145000000
  },
  {
    id: 'ewaste-us-002',
    name: 'Richmond E-Waste - Mixed Electronics',
    type: 'e-waste',
    source: 'USA (Richmond)',
    supplier: 'Aurubis Richmond',
    quantity: 5200,
    copperContent: 15,
    preciousMetals: {
      gold: 180,
      silver: 850,
      platinum: 5,
      palladium: 32
    },
    impurities: {
      tin: 3.8,
      lead: 3.2,
      nickel: 0.9,
      zinc: 2.1
    },
    arrivalDate: '2024-12-22',
    storageLocation: 'Pending',
    status: 'scheduled',
    estimatedValue: 112000000
  }
];

// European Processing Sites
export const processingSites = [
  {
    id: 'hamburg',
    name: 'Hamburg Smelter',
    location: 'Hamburg, Germany',
    coordinates: { lat: 53.5511, lng: 9.9937 },
    type: 'primary',
    capabilities: ['smelting', 'converting', 'refining', 'precious-metals'],
    capacity: {
      annualThroughput: 450000, // mt/year
      currentUtilization: 78, // percentage
      availableCapacity: 99000, // mt for Q1
      dailyProcessing: 1400
    },
    efficiency: {
      copperRecovery: 98.5,
      goldRecovery: 96.2,
      silverRecovery: 95.8,
      energyEfficiency: 92
    },
    processingCosts: {
      concentrate: 145, // EUR/mt
      scrap: 85,
      ewaste: 280
    },
    specializations: ['high-volume-concentrate', 'complex-ores'],
    currentProjects: ['Flash smelter upgrade', 'Emissions reduction'],
    status: 'operational'
  },
  {
    id: 'lunen',
    name: 'Lünen Recycling Center',
    location: 'Lünen, Germany',
    coordinates: { lat: 51.6167, lng: 7.5167 },
    type: 'secondary',
    capabilities: ['recycling', 'refining', 'precious-metals', 'e-waste'],
    capacity: {
      annualThroughput: 300000,
      currentUtilization: 82,
      availableCapacity: 54000,
      dailyProcessing: 900
    },
    efficiency: {
      copperRecovery: 99.1,
      goldRecovery: 98.5,
      silverRecovery: 97.2,
      energyEfficiency: 88
    },
    processingCosts: {
      concentrate: 0, // not processed here
      scrap: 65,
      ewaste: 195
    },
    specializations: ['scrap-processing', 'e-waste-recycling', 'precious-metal-recovery'],
    currentProjects: ['E-waste line expansion', 'AI sorting implementation'],
    status: 'operational'
  },
  {
    id: 'pirdop',
    name: 'Pirdop Smelter',
    location: 'Pirdop, Bulgaria',
    coordinates: { lat: 42.7000, lng: 24.1833 },
    type: 'primary',
    capabilities: ['smelting', 'converting', 'acid-production'],
    capacity: {
      annualThroughput: 280000,
      currentUtilization: 71,
      availableCapacity: 81200,
      dailyProcessing: 850
    },
    efficiency: {
      copperRecovery: 97.8,
      goldRecovery: 94.5,
      silverRecovery: 93.2,
      energyEfficiency: 85
    },
    processingCosts: {
      concentrate: 118,
      scrap: 95,
      ewaste: 0 // not processed here
    },
    specializations: ['concentrate-processing', 'sulfuric-acid-production'],
    currentProjects: ['Capacity expansion', 'Water treatment upgrade'],
    status: 'operational'
  },
  {
    id: 'olen',
    name: 'Olen Plant',
    location: 'Olen, Belgium',
    coordinates: { lat: 51.1500, lng: 4.8667 },
    type: 'refining',
    capabilities: ['refining', 'rod-production', 'precious-metals'],
    capacity: {
      annualThroughput: 380000,
      currentUtilization: 85,
      availableCapacity: 57000,
      dailyProcessing: 1150
    },
    efficiency: {
      copperRecovery: 99.7,
      goldRecovery: 99.2,
      silverRecovery: 98.8,
      energyEfficiency: 94
    },
    processingCosts: {
      concentrate: 0, // receives blister copper
      scrap: 72,
      ewaste: 0
    },
    specializations: ['electrolytic-refining', 'copper-rod-production', 'high-purity-cathodes'],
    currentProjects: ['Cathode quality improvement', 'Automation upgrade'],
    status: 'operational'
  }
];

// Q1 Production Targets
export const productionTargets = {
  quarter: 'Q1 2025',
  cathodeProduction: {
    target: 280000, // metric tons
    minimum: 265000,
    stretch: 295000,
    currentForecast: 0,
    unit: 'mt'
  },
  preciousMetals: {
    gold: {
      target: 42, // metric tons
      minimum: 38,
      stretch: 45,
      unit: 'mt'
    },
    silver: {
      target: 850,
      minimum: 780,
      stretch: 920,
      unit: 'mt'
    },
    platinum: {
      target: 0.8,
      minimum: 0.7,
      stretch: 0.9,
      unit: 'mt'
    },
    palladium: {
      target: 1.2,
      minimum: 1.0,
      stretch: 1.4,
      unit: 'mt'
    }
  },
  qualityMetrics: {
    cathodeGrade: 'Grade A (99.99%)',
    targetPurity: 99.99,
    maxImpurities: 0.01
  },
  sustainability: {
    recycledContentTarget: 45, // percentage
    co2ReductionTarget: 8, // percentage vs last year
    energyEfficiencyTarget: 3 // percentage improvement
  }
};

// Metal Prices (EUR per kg unless specified)
export const metalPrices = {
  copper: 8.45, // EUR/kg
  gold: 58500, // EUR/oz
  silver: 27.80, // EUR/oz
  platinum: 920, // EUR/oz
  palladium: 950, // EUR/oz
  lastUpdated: '2024-12-14T09:30:00Z'
};
