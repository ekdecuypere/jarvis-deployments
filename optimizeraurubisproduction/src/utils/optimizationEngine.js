/**
 * Multi-Site Production Optimization Engine
 *
 * This engine uses a multi-objective optimization approach to:
 * 1. Maximize precious metal recovery
 * 2. Meet cathode production targets
 * 3. Minimize processing costs
 * 4. Balance site utilization
 */

import { metalPrices } from '../data/inventoryData';

// Conversion factors
const OZ_TO_GRAMS = 31.1035;

/**
 * Calculate the value of precious metals in a material batch
 */
export function calculatePreciousMetalValue(material) {
  const quantity = material.quantity;
  const pm = material.preciousMetals;

  // Convert g/t to total grams, then to oz
  const goldOz = (pm.gold * quantity / 1000) / OZ_TO_GRAMS;
  const silverOz = (pm.silver * quantity / 1000) / OZ_TO_GRAMS;
  const platinumOz = (pm.platinum * quantity / 1000) / OZ_TO_GRAMS;
  const palladiumOz = (pm.palladium * quantity / 1000) / OZ_TO_GRAMS;

  return {
    gold: goldOz * metalPrices.gold,
    silver: silverOz * metalPrices.silver,
    platinum: platinumOz * metalPrices.platinum,
    palladium: palladiumOz * metalPrices.palladium,
    total: (goldOz * metalPrices.gold) +
           (silverOz * metalPrices.silver) +
           (platinumOz * metalPrices.platinum) +
           (palladiumOz * metalPrices.palladium)
  };
}

/**
 * Calculate copper value in a material batch
 */
export function calculateCopperValue(material) {
  const copperTons = material.quantity * (material.copperContent / 100);
  const copperKg = copperTons * 1000;
  return copperKg * metalPrices.copper;
}

/**
 * Calculate processing cost for a material at a site
 */
export function calculateProcessingCost(material, site) {
  const costPerTon = site.processingCosts[material.type] || 0;
  return material.quantity * costPerTon;
}

/**
 * Calculate expected recovery for a material at a site
 */
export function calculateExpectedRecovery(material, site) {
  const pm = material.preciousMetals;
  const eff = site.efficiency;

  return {
    copper: material.quantity * (material.copperContent / 100) * (eff.copperRecovery / 100),
    gold: (pm.gold * material.quantity / 1000) * (eff.goldRecovery / 100) / 1000, // kg
    silver: (pm.silver * material.quantity / 1000) * (eff.silverRecovery / 100) / 1000, // kg
    platinum: (pm.platinum * material.quantity / 1000) * (eff.goldRecovery / 100) / 1000, // kg (use gold recovery as proxy)
    palladium: (pm.palladium * material.quantity / 1000) * (eff.goldRecovery / 100) / 1000 // kg
  };
}

/**
 * Check if a site can process a material type
 */
export function canSiteProcessMaterial(site, material) {
  const typeCapabilities = {
    'concentrate': ['smelting'],
    'scrap': ['recycling', 'refining'],
    'e-waste': ['e-waste', 'recycling']
  };

  const required = typeCapabilities[material.type] || [];
  return required.some(cap => site.capabilities.includes(cap));
}

/**
 * Calculate site compatibility score (0-100)
 */
export function calculateSiteCompatibility(material, site) {
  if (!canSiteProcessMaterial(site, material)) return 0;

  let score = 50; // Base score for compatible site

  // Specialization bonus
  const specializations = {
    'concentrate': ['high-volume-concentrate', 'complex-ores', 'concentrate-processing'],
    'scrap': ['scrap-processing'],
    'e-waste': ['e-waste-recycling', 'precious-metal-recovery']
  };

  const relevantSpecs = specializations[material.type] || [];
  const matchingSpecs = relevantSpecs.filter(s => site.specializations.includes(s));
  score += matchingSpecs.length * 15;

  // Efficiency bonus
  score += (site.efficiency.copperRecovery - 95) * 5;

  // Precious metal recovery bonus for PM-rich materials
  const pmValue = calculatePreciousMetalValue(material);
  if (pmValue.total > 10000000) {
    score += (site.efficiency.goldRecovery - 95) * 3;
  }

  // Capacity availability factor
  const capacityFactor = Math.min(site.capacity.availableCapacity / material.quantity, 1);
  score *= capacityFactor;

  return Math.min(Math.max(score, 0), 100);
}

/**
 * Main optimization function
 * Uses a greedy approach with refinement for multi-site allocation
 */
export function optimizeAllocation(materials, sites, targets, options = {}) {
  const {
    prioritizePreciousMetals = true,
    balanceSiteLoad = true,
    minimizeCost = false
  } = options;

  // Filter available materials
  const availableMaterials = materials.filter(m =>
    m.status === 'available' || m.status === 'in-transit'
  );

  // Initialize site allocations
  const siteAllocations = {};
  sites.forEach(site => {
    siteAllocations[site.id] = {
      site,
      materials: [],
      totalQuantity: 0,
      remainingCapacity: site.capacity.availableCapacity,
      expectedRecovery: {
        copper: 0,
        gold: 0,
        silver: 0,
        platinum: 0,
        palladium: 0
      },
      processingCost: 0,
      pmValue: 0
    };
  });

  // Score and sort materials by precious metal value (if prioritizing PM)
  const scoredMaterials = availableMaterials.map(material => ({
    material,
    pmValue: calculatePreciousMetalValue(material),
    copperValue: calculateCopperValue(material),
    pmDensity: calculatePreciousMetalValue(material).total / material.quantity
  }));

  if (prioritizePreciousMetals) {
    scoredMaterials.sort((a, b) => b.pmDensity - a.pmDensity);
  }

  // Allocate materials to sites
  const allocations = [];

  for (const { material, pmValue, copperValue, pmDensity } of scoredMaterials) {
    // Find best site for this material
    let bestSite = null;
    let bestScore = -1;
    let bestAllocation = null;

    for (const site of sites) {
      const compatibility = calculateSiteCompatibility(material, site);
      if (compatibility === 0) continue;

      const siteAlloc = siteAllocations[site.id];
      if (siteAlloc.remainingCapacity < material.quantity * 0.1) continue; // Need at least 10% capacity

      // Calculate allocation quantity (may be partial)
      const allocQuantity = Math.min(material.quantity, siteAlloc.remainingCapacity);
      const allocRatio = allocQuantity / material.quantity;

      // Calculate score
      let score = compatibility;

      // Cost factor
      const processingCost = calculateProcessingCost(
        { ...material, quantity: allocQuantity },
        site
      );
      if (minimizeCost) {
        score -= processingCost / 1000000; // Normalize cost impact
      }

      // Load balancing factor
      if (balanceSiteLoad) {
        const utilizationAfter = (siteAlloc.totalQuantity + allocQuantity) /
                                  site.capacity.availableCapacity;
        if (utilizationAfter > 0.95) {
          score *= 0.7; // Penalize overloading
        } else if (utilizationAfter < 0.5) {
          score *= 1.1; // Bonus for underutilized sites
        }
      }

      // Precious metal recovery bonus
      if (prioritizePreciousMetals && pmDensity > 100) {
        score += site.efficiency.goldRecovery * 0.5;
      }

      if (score > bestScore) {
        bestScore = score;
        bestSite = site;
        bestAllocation = {
          materialId: material.id,
          materialName: material.name,
          materialType: material.type,
          source: material.source,
          siteId: site.id,
          siteName: site.name,
          quantity: allocQuantity,
          originalQuantity: material.quantity,
          allocRatio,
          compatibility,
          score,
          processingCost,
          expectedRecovery: calculateExpectedRecovery(
            { ...material, quantity: allocQuantity },
            site
          ),
          pmValue: pmValue.total * allocRatio,
          copperValue: copperValue * allocRatio
        };
      }
    }

    if (bestAllocation) {
      allocations.push(bestAllocation);

      // Update site allocation tracking
      const siteAlloc = siteAllocations[bestSite.id];
      siteAlloc.materials.push(bestAllocation);
      siteAlloc.totalQuantity += bestAllocation.quantity;
      siteAlloc.remainingCapacity -= bestAllocation.quantity;
      siteAlloc.processingCost += bestAllocation.processingCost;
      siteAlloc.pmValue += bestAllocation.pmValue;

      // Add to expected recovery
      Object.keys(bestAllocation.expectedRecovery).forEach(metal => {
        siteAlloc.expectedRecovery[metal] += bestAllocation.expectedRecovery[metal];
      });
    }
  }

  // Calculate totals and target achievement
  const totals = {
    copper: 0,
    gold: 0,
    silver: 0,
    platinum: 0,
    palladium: 0,
    totalQuantity: 0,
    totalCost: 0,
    totalValue: 0
  };

  allocations.forEach(alloc => {
    totals.copper += alloc.expectedRecovery.copper;
    totals.gold += alloc.expectedRecovery.gold;
    totals.silver += alloc.expectedRecovery.silver;
    totals.platinum += alloc.expectedRecovery.platinum;
    totals.palladium += alloc.expectedRecovery.palladium;
    totals.totalQuantity += alloc.quantity;
    totals.totalCost += alloc.processingCost;
    totals.totalValue += alloc.pmValue + alloc.copperValue;
  });

  // Calculate target achievement percentages
  const targetAchievement = {
    cathode: (totals.copper / targets.cathodeProduction.target) * 100,
    gold: (totals.gold * 1000 / targets.preciousMetals.gold.target) * 100, // Convert to mt
    silver: (totals.silver * 1000 / targets.preciousMetals.silver.target) * 100,
    platinum: (totals.platinum * 1000 / targets.preciousMetals.platinum.target) * 100,
    palladium: (totals.palladium * 1000 / targets.preciousMetals.palladium.target) * 100
  };

  // Site utilization summary
  const siteUtilization = Object.values(siteAllocations).map(sa => ({
    siteId: sa.site.id,
    siteName: sa.site.name,
    allocated: sa.totalQuantity,
    capacity: sa.site.capacity.availableCapacity,
    utilization: (sa.totalQuantity / sa.site.capacity.availableCapacity) * 100,
    materialCount: sa.materials.length,
    expectedRecovery: sa.expectedRecovery,
    processingCost: sa.processingCost,
    pmValue: sa.pmValue
  }));

  return {
    allocations,
    siteAllocations: siteUtilization,
    totals,
    targetAchievement,
    recommendations: generateRecommendations(allocations, siteUtilization, targetAchievement, targets),
    optimizationScore: calculateOptimizationScore(targetAchievement, siteUtilization, totals)
  };
}

/**
 * Generate actionable recommendations based on optimization results
 */
function generateRecommendations(allocations, siteUtilization, achievement, targets) {
  const recommendations = [];

  // Check cathode production target
  if (achievement.cathode < 100) {
    recommendations.push({
      type: 'warning',
      category: 'production',
      title: 'Cathode Production Gap',
      message: `Current allocation achieves ${achievement.cathode.toFixed(1)}% of Q1 cathode target. Consider sourcing additional concentrate or scrap.`,
      impact: 'high',
      action: 'Source additional raw materials'
    });
  }

  // Check precious metal targets
  if (achievement.gold < 90) {
    recommendations.push({
      type: 'opportunity',
      category: 'precious-metals',
      title: 'Gold Recovery Opportunity',
      message: `Gold recovery at ${achievement.gold.toFixed(1)}% of target. Prioritize e-waste processing at Lünen for higher gold yields.`,
      impact: 'high',
      action: 'Shift e-waste allocation to high-recovery sites'
    });
  }

  // Check site utilization balance
  const underutilized = siteUtilization.filter(s => s.utilization < 50);
  const overutilized = siteUtilization.filter(s => s.utilization > 90);

  if (underutilized.length > 0) {
    recommendations.push({
      type: 'optimization',
      category: 'capacity',
      title: 'Underutilized Capacity',
      message: `${underutilized.map(s => s.siteName).join(', ')} operating below 50% capacity. Consider redirecting materials for better load balance.`,
      impact: 'medium',
      action: 'Rebalance allocations'
    });
  }

  if (overutilized.length > 0) {
    recommendations.push({
      type: 'warning',
      category: 'capacity',
      title: 'Near-Capacity Operations',
      message: `${overutilized.map(s => s.siteName).join(', ')} approaching maximum capacity. Plan for potential bottlenecks.`,
      impact: 'medium',
      action: 'Monitor throughput closely'
    });
  }

  // E-waste specific recommendations
  const ewasteAllocations = allocations.filter(a => a.materialType === 'e-waste');
  const lunenEwaste = ewasteAllocations.filter(a => a.siteId === 'lunen');

  if (ewasteAllocations.length > 0 && lunenEwaste.length === 0) {
    recommendations.push({
      type: 'optimization',
      category: 'precious-metals',
      title: 'E-Waste Routing Optimization',
      message: 'E-waste not allocated to Lünen recycling center. Consider routing to Lünen for optimal precious metal recovery (98.5% gold recovery rate).',
      impact: 'high',
      action: 'Route e-waste through Lünen'
    });
  }

  // Cost optimization
  const avgCostPerTon = allocations.reduce((sum, a) => sum + a.processingCost, 0) /
                        allocations.reduce((sum, a) => sum + a.quantity, 0);

  if (avgCostPerTon > 150) {
    recommendations.push({
      type: 'cost',
      category: 'efficiency',
      title: 'Processing Cost Optimization',
      message: `Average processing cost of €${avgCostPerTon.toFixed(0)}/mt is elevated. Consider shifting more volume to Pirdop (€118/mt for concentrate).`,
      impact: 'medium',
      action: 'Optimize cost allocation'
    });
  }

  return recommendations;
}

/**
 * Calculate overall optimization score (0-100)
 */
function calculateOptimizationScore(achievement, siteUtilization, totals) {
  let score = 0;

  // Target achievement (40% weight)
  const targetScore = (
    Math.min(achievement.cathode, 100) * 0.5 +
    Math.min(achievement.gold, 100) * 0.2 +
    Math.min(achievement.silver, 100) * 0.15 +
    Math.min(achievement.platinum, 100) * 0.075 +
    Math.min(achievement.palladium, 100) * 0.075
  );
  score += targetScore * 0.4;

  // Site balance (30% weight)
  const avgUtilization = siteUtilization.reduce((sum, s) => sum + s.utilization, 0) / siteUtilization.length;
  const utilizationVariance = siteUtilization.reduce((sum, s) =>
    sum + Math.pow(s.utilization - avgUtilization, 2), 0) / siteUtilization.length;
  const balanceScore = Math.max(0, 100 - Math.sqrt(utilizationVariance));
  score += balanceScore * 0.3;

  // Value optimization (30% weight)
  const valueScore = Math.min(100, (totals.totalValue / totals.totalCost) * 10);
  score += valueScore * 0.3;

  return Math.round(score);
}

/**
 * Format large numbers for display
 */
export function formatNumber(num, decimals = 0) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(decimals);
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
