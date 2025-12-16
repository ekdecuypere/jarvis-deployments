export default function Badge({ children, variant = 'default', size = 'md' }) {
  const variants = {
    default: 'bg-white/10 text-white/80',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    copper: 'bg-aurubis-copper/20 text-aurubis-copper border border-aurubis-copper/30',
    gold: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    silver: 'bg-gray-300/20 text-gray-300 border border-gray-300/30'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
