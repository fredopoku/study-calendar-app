import { useApp } from '../../context/AppContext';
import ProgressBar from '../ui/ProgressBar';
import { getWeekStatus } from '../../utils/helpers';
import SessionModal from '../modals/SessionModal';

function SessionCard({ session, type, dayId, isOptional }) {
  const { toggleSession, startTimer } = useApp();
  if (!session) return null;

  const isMorning = type === 'morning';
  const icon = session.completed ? '✅' : (isMorning ? '🌅' : '🌙');
  const borderClass = session.completed
    ? 'border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20'
    : isMorning
      ? 'border-orange-200 dark:border-orange-700/50 bg-orange-50/60 dark:bg-orange-900/10 hover:border-orange-300 dark:hover:border-orange-600'
      : 'border-violet-200 dark:border-violet-700/50 bg-violet-50/60 dark:bg-violet-900/10 hover:border-violet-300 dark:hover:border-violet-600';
  const timeColor = session.completed ? 'text-emerald-600 dark:text-emerald-400' : (isMorning ? 'text-orange-600 dark:text-orange-400' : 'text-violet-600 dark:text-violet-400');

  return (
    <div className={`border rounded-xl p-4 transition-all duration-200 ${borderClass}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleSession(dayId, type)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-lg"
          aria-label={session.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {icon}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs font-semibold ${timeColor}`}>{session.time}</span>
            {isOptional && <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full">Optional</span>}
          </div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{session.activity}</p>
          {session.completed && session.technique && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {session.difficulty > 0 && '⭐'.repeat(session.difficulty)} {session.technique.replace(/-/g, ' ')}
            </p>
          )}
          {session.completed && session.notes && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic line-clamp-2">"{session.notes}"</p>
          )}
        </div>

        {!session.completed && (
          <button
            onClick={startTimer}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
            title="Start focus timer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function DayCard({ day }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = day.fullDate === todayStr;

  return (
    <div className={`card p-5 transition-all duration-200 animate-slide-up ${day.dayCompleted ? 'ring-1 ring-emerald-200 dark:ring-emerald-700' : ''} ${isToday ? 'ring-2 ring-brand-400 dark:ring-brand-500' : ''}`}>
      {/* Day header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${day.moduleColor} text-white text-sm font-bold`}>
            {day.day.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {day.date}
                {isToday && <span className="ml-1.5 text-[10px] bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded-full font-semibold">TODAY</span>}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-2 h-2 rounded-full ${day.moduleColor}`} />
              <p className={`text-[11px] font-medium ${day.moduleTextColor}`}>{day.module}</p>
            </div>
          </div>
        </div>
        {day.dayCompleted && !day.isRestDay && (
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span>🏆</span>
            <span className="hidden sm:inline">Complete</span>
          </div>
        )}
      </div>

      {/* Sessions */}
      {day.isRestDay ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <span className="text-2xl">🌿</span>
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Rest & Recharge</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500">Well-deserved break — you've earned it!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <SessionCard session={day.morningSession} type="morning" dayId={day.id} />
          <SessionCard session={day.eveningSession} type="evening" dayId={day.id} isOptional={day.isOptional} />
        </div>
      )}
    </div>
  );
}

export default function SchedulePage() {
  const { studySchedule, stats, settings, showWeekSelector, setShowWeekSelector, goToPreviousWeek, goToNextWeek, jumpToWeek, showSessionModal } = useApp();
  const weekStatus = getWeekStatus(stats.weekProgress);
  const moduleIndex = Math.min(Math.floor(settings.currentWeek / 2), 7);

  const moduleColors = ['from-blue-500 to-blue-600', 'from-violet-500 to-violet-600', 'from-emerald-500 to-emerald-600', 'from-orange-500 to-orange-600', 'from-rose-500 to-rose-600', 'from-indigo-500 to-indigo-600', 'from-pink-500 to-pink-600', 'from-teal-500 to-teal-600'];
  const gradientClass = moduleColors[moduleIndex] || moduleColors[0];

  return (
    <div className="space-y-5">
      {/* Week header card */}
      <div className={`rounded-2xl bg-gradient-to-r ${gradientClass} p-5 text-white shadow-lg`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/70 text-xs font-medium mb-0.5">
              {studySchedule[0]?.module}
            </p>
            <h2 className="text-xl font-bold">Week {stats.currentWeek} of {stats.totalWeeks}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge text-xs px-2.5 py-1 rounded-full bg-white/20 text-white`}>{weekStatus.label}</span>
              <span className="text-white/70 text-xs">{stats.completedSessions}/{stats.totalSessions} sessions done</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{stats.weekProgress}%</div>
            <div className="text-white/70 text-xs mt-0.5">complete</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-white rounded-full transition-all duration-700" style={{ width: `${stats.weekProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Week navigation */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={goToPreviousWeek}
              disabled={settings.currentWeek === 0}
              className="btn-secondary text-xs px-3 py-2 disabled:opacity-40"
            >
              ← Prev
            </button>

            <button
              onClick={() => setShowWeekSelector(s => !s)}
              className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Week {stats.currentWeek}
              <svg className={`w-3 h-3 transition-transform ${showWeekSelector ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={goToNextWeek}
              disabled={stats.weekProgress < 80 || settings.currentWeek >= 15}
              className="btn-secondary text-xs px-3 py-2 disabled:opacity-40"
              title={stats.weekProgress < 80 ? 'Complete 80% to advance' : ''}
            >
              Next →
            </button>

            {stats.weekProgress < 80 && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                {80 - stats.weekProgress}% more to unlock next week
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:w-40 w-full">
            <div className="flex-1">
              <ProgressBar
                value={stats.overallProgress}
                color="bg-brand-500"
                height="h-1.5"
                rounded="rounded-full"
              />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{stats.overallProgress}%</span>
          </div>
        </div>

        {/* Week selector grid */}
        {showWeekSelector && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Jump to Week</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {Array.from({ length: 16 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => jumpToWeek(i)}
                  className={`py-2 text-xs font-medium rounded-xl transition-all ${
                    i === settings.currentWeek
                      ? 'bg-brand-600 text-white shadow-sm'
                      : settings.completedWeeks.includes(i)
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  W{i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Day cards */}
      <div className="space-y-4">
        {studySchedule.map(day => <DayCard key={day.id} day={day} />)}
      </div>

      {/* Week complete banner */}
      {stats.weekProgress >= 80 && settings.currentWeek < 15 && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white shadow-lg animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">Week {stats.currentWeek} nearly complete!</h3>
              <p className="text-emerald-100 text-sm">You've hit 80% — ready to advance to Week {stats.currentWeek + 1}?</p>
            </div>
            <button
              onClick={goToNextWeek}
              className="bg-white text-emerald-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors text-sm flex-shrink-0"
            >
              Next Week →
            </button>
          </div>
        </div>
      )}

      {showSessionModal && <SessionModal />}
    </div>
  );
}
