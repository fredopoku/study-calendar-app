import { useApp } from '../../context/AppContext';

const pageTitles = {
  overview: 'Overview',
  schedule: 'Study Schedule',
  'ai-tutor': 'AI Tutor',
  career: 'Career Hub',
  analytics: 'Analytics',
  pricing: 'Upgrade to Pro',
};

const pageSubtitles = {
  overview: 'Track your progress at a glance',
  schedule: 'Your daily learning plan',
  'ai-tutor': 'Ask anything — learn faster with AI',
  career: 'Career readiness & job market insights',
  analytics: 'Learning patterns & achievements',
  pricing: 'Unlock the full LearnForge experience',
};

export default function TopBar() {
  const { activeTab, setSidebarOpen, careerReadiness, gamification, currentLevel, isPro, aiMessagesLeft } = useApp();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0 sticky top-0 z-20">
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
        <h1 className="text-sm font-semibold text-slate-900 dark:text-white leading-none truncate">
          {pageTitles[activeTab] || 'LearnForge'}
        </h1>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block truncate">
          {pageSubtitles[activeTab] || ''}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Date */}
        <span className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-full">
          {today}
        </span>

        {/* Streak */}
        {gamification.streak > 0 && (
          <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2.5 py-1.5 rounded-full">
            🔥 {gamification.streak}
          </span>
        )}

        {/* Level */}
        <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2.5 py-1.5 rounded-full">
          {currentLevel.icon} Lv.{currentLevel.level}
        </span>

        {/* AI messages or Pro badge */}
        {activeTab === 'ai-tutor' && !isPro && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full ${
            aiMessagesLeft === 0
              ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
              : 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30'
          }`}>
            🤖 {aiMessagesLeft}/3
          </span>
        )}

        {isPro && (
          <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400 px-2.5 py-1.5 rounded-full">
            ✦ Pro
          </span>
        )}

        {/* Career readiness */}
        <span className="hidden md:flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1.5 rounded-full">
          {careerReadiness.readinessScore}%
          <span className="font-normal text-emerald-500 hidden lg:inline">ready</span>
        </span>
      </div>
    </header>
  );
}
