import { useApp } from '../../context/AppContext';
import PomodoroTimer from '../timer/PomodoroTimer';

const navItems = [
  { id: 'overview', label: 'Overview', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
  { id: 'schedule', label: 'Study Schedule', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )},
  { id: 'career', label: 'Career Hub', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )},
];

export default function Sidebar() {
  const { activeTab, setActiveTab, darkMode, setDarkMode, stats, sidebarOpen, setSidebarOpen, settings } = useApp();

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40 flex flex-col
        bg-slate-900 border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Study Calendar</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pro Edition</p>
            </div>
          </div>
        </div>

        {/* Course progress pill */}
        <div className="px-4 pt-4">
          <div className="bg-slate-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Course Progress</span>
              <span className="text-[10px] font-bold text-brand-400">Week {stats.currentWeek}/16</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-700"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">{stats.overallProgress}% complete — {16 - settings.currentWeek} weeks left</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full nav-item ${activeTab === item.id ? 'nav-item-active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'schedule' && stats.weekProgress > 0 && stats.weekProgress < 100 && (
                <span className="ml-auto text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full">
                  {stats.weekProgress}%
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Timer section */}
        <div className="px-4 py-4 border-t border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 mb-3">Focus Timer</p>
          <PomodoroTimer compact />
        </div>

        {/* Dark mode + bottom */}
        <div className="px-4 py-3 border-t border-slate-800">
          <button
            onClick={() => setDarkMode(d => !d)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
