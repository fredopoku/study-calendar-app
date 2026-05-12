export default function ProgressBar({ value = 0, color = 'bg-brand-600', trackColor = 'bg-slate-200 dark:bg-slate-700', height = 'h-2', rounded = 'rounded-full', animated = false, label }) {
  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full ${trackColor} ${height} ${rounded} overflow-hidden`}>
        <div
          className={`${height} ${rounded} ${color} transition-all duration-700 ease-out ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
