import { motion } from 'framer-motion';
import useOptimizerStore from '../../store/optimizerStore';
import Badge from '../shared/Badge';
import { formatNumber, formatCurrency, calculatePreciousMetalValue, calculateCopperValue } from '../../utils/optimizationEngine';

export default function InventoryPanel() {
  const { materials, selectMaterial, selectedMaterial } = useOptimizerStore();

  const getTypeColor = (type) => {
    switch (type) {
      case 'concentrate': return 'copper';
      case 'scrap': return 'success';
      case 'e-waste': return 'info';
      default: return 'default';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'in-transit': return 'warning';
      case 'scheduled': return 'info';
      default: return 'default';
    }
  };

  const inventoryByType = materials.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + m.quantity;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(inventoryByType).map(([type, quantity]) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 text-center"
          >
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{type}</p>
            <p className="text-2xl font-bold gradient-text">{formatNumber(quantity)}</p>
            <p className="text-white/40 text-xs">metric tons</p>
          </motion.div>
        ))}
      </div>

      {/* Material List */}
      <div className="space-y-3">
        {materials.map((material, index) => {
          const pmValue = calculatePreciousMetalValue(material);
          const copperValue = calculateCopperValue(material);
          const isSelected = selectedMaterial?.id === material.id;

          return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => selectMaterial(material.id)}
              className={`glass-card-hover p-4 cursor-pointer ${isSelected ? 'ring-2 ring-aurubis-copper' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{material.name}</h4>
                  <p className="text-white/50 text-sm">{material.supplier} • {material.source}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getTypeColor(material.type)} size="sm">{material.type}</Badge>
                  <Badge variant={getStatusVariant(material.status)} size="sm">{material.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-white/40">Quantity</p>
                  <p className="text-white font-medium">{formatNumber(material.quantity)} mt</p>
                </div>
                <div>
                  <p className="text-white/40">Cu Content</p>
                  <p className="text-white font-medium">{material.copperContent}%</p>
                </div>
                <div>
                  <p className="text-white/40">PM Value</p>
                  <p className="text-yellow-400 font-medium">{formatCurrency(pmValue.total)}</p>
                </div>
                <div>
                  <p className="text-white/40">Cu Value</p>
                  <p className="text-aurubis-copper font-medium">{formatCurrency(copperValue)}</p>
                </div>
              </div>

              {/* Precious Metals Detail */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-yellow-400">
                    Au: {material.preciousMetals.gold} g/t
                  </span>
                  <span className="text-gray-300">
                    Ag: {material.preciousMetals.silver} g/t
                  </span>
                  <span className="text-blue-300">
                    Pt: {material.preciousMetals.platinum} g/t
                  </span>
                  <span className="text-purple-300">
                    Pd: {material.preciousMetals.palladium} g/t
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
