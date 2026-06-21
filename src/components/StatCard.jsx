import { forwardRef } from 'react';

const StatCard = forwardRef(function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = 'blue', 
  bgColor = 'bg-charcoal-900',
  borderColor = 'border-charcoal-900',
  trend,
  trendLabel,
  className = '',
  ...props 
}, ref) {
  const iconColors = {
    blue: 'text-pitch-black bg-cobalt-blue',
    green: 'text-pitch-black bg-toxic-green',
    orange: 'text-pitch-black bg-ember-orange',
    red: 'text-pitch-black bg-ember-orange',
    purple: 'text-pitch-black bg-iris-violet',
    yellow: 'text-pitch-black bg-schoolbus-yellow',
    indigo: 'text-pitch-black bg-iris-violet',
  };

  const iconBg = iconColors[iconColor] || iconColors.blue;

  return (
    <div
      ref={ref}
      className={`rounded-[25px] border shadow-none relative overflow-hidden p-6 transition-all hover:border-warm-cream/20 ${borderColor} ${bgColor} ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-warm-cream/60">{title}</p>
          <p className="mt-2 text-3xl font-black text-warm-cream tracking-tight font-oldschoolgrotesk">{value}</p>
          {trend !== undefined && (
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
              <span
                className={`font-black ${
                  trend >= 0 ? 'text-acid-lime' : 'text-ember-orange'
                }`}
              >
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-warm-cream/40">{trendLabel || 'vs last month'}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`flex-shrink-0 rounded-[15px] p-3 ${iconBg}`}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;