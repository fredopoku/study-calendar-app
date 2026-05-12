import { useApp } from '../../context/AppContext';

const pageTitles = {
  overview: 'Overview',
  schedule: 'Study Schedule',
  career: 'Career Hub',
};

const pageSubtitles = {
  overview: 'Track your progress at a glance',
  schedule: 'Your daily learning plan',
  career: 'Career readiness & job market insights',
};

export default function TopBar() {
  const { activeTab, setSidebarOpen, stats, careerReadiness } = useApp();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0 sticky top-0 z-20">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-slate-900 dark:text-white leading-none truncate">
          {pageTitles[activeTab]}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block truncate">{pageSubtitles[activeTab]}</p>
      </div>

      {/* Right side pills */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {today}
        </span>

        <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-3 py-1.5 rounded-full">
          W{stats.currentWeek}
          <span className="font-normal text-brand-400 dark:text-brand-500">/{stats.totalWeeks}</span>
        </span>

        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
          {careerReadiness.readinessScore}%
          <span className="font-normal text-emerald-500 hidden sm:inline">ready</span>
        </span>
      </div>
    </header>
  );
}
