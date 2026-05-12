export default function StatCard({ label, value, sub, icon, accent = 'indigo', trend }) {
  const accents = {
    indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400', value: 'text-indigo-600 dark:text-indigo-400' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400', value: 'text-emerald-600 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400', value: 'text-amber-600 dark:text-amber-400' },
    violet: { bg: 'bg-violet-50 dark:bg-violet-900/20', icon: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400', value: 'text-violet-600 dark:text-violet-400' },
    rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400', value: 'text-rose-600 dark:text-rose-400' },
    sky: { bg: 'bg-sky-50 dark:bg-sky-900/20', icon: 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400', value: 'text-sky-600 dark:text-sky-400' },
  };
  const a = accents[accent] || accents.indigo;

  return (
    <div className={`card p-4 flex items-center gap-4 animate-fade-in`}>
      {icon && (
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${a.icon}`}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">{label}</p>
        <p className={`text-2xl font-bold leading-tight ${a.value}`}>{value}</p>
        {(sub || trend !== undefined) && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {sub}
            {trend !== undefined && (
              <span className={trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                {' '}{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
