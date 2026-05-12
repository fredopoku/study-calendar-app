import { useApp } from '../../context/AppContext';
import StatCard from '../ui/StatCard';
import ProgressBar from '../ui/ProgressBar';
import CircularProgress from '../ui/CircularProgress';
import PomodoroTimer from '../timer/PomodoroTimer';
import { getMotivationalMessage, formatMinutes, getWeekStatus } from '../../utils/helpers';
import { courseModules } from '../../data/courseData';

export default function OverviewPage() {
  const { stats, careerReadiness, studySchedule, settings, setActiveTab } = useApp();
  const weekStatus = getWeekStatus(stats.weekProgress);
  const moduleIndex = Math.min(Math.floor(settings.currentWeek / 2), courseModules.length - 1);
  const currentModule = courseModules[moduleIndex];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = studySchedule.find(d => d.fullDate === todayStr);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="space-y-6">
      {/* Hero welcome card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative">
          <p className="text-brand-200 text-sm font-medium mb-1">{greeting}!</p>
          <h2 className="text-2xl font-bold leading-tight mb-1">{settings.studyGoal}</h2>
          <p className="text-brand-200 text-sm mb-4">{getMotivationalMessage(careerReadiness.readinessScore, careerReadiness.matchedJobs, careerReadiness.potentialSalaryIncrease)}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`badge text-xs font-semibold px-3 py-1 rounded-full ${weekStatus.bg} ${weekStatus.color}`}>
              Week {stats.currentWeek} — {weekStatus.label}
            </span>
            <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {stats.overallProgress}% course complete
            </span>
            <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {careerReadiness.matchedJobs.toLocaleString()} jobs matched
            </span>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-brand-200 mb-1.5">
              <span>Overall progress</span>
              <span>{stats.overallProgress}% of 16 weeks</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-white rounded-full transition-all duration-700" style={{ width: `${stats.overallProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Week Progress" value={`${stats.weekProgress}%`} sub={`${stats.completedSessions}/${stats.totalSessions} sessions`} icon="📅" accent="indigo" />
        <StatCard label="Days Done" value={`${stats.completedDays}/7`} sub="this week" icon="✅" accent="emerald" />
        <StatCard label="Study Time" value={formatMinutes(stats.totalStudyTime)} sub="this week" icon="⏱" accent="violet" />
        <StatCard label="Career Ready" value={`${careerReadiness.readinessScore}%`} sub={`${careerReadiness.matchedJobs.toLocaleString()} jobs`} icon="🎯" accent="amber" />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current module card */}
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Current Module</p>
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-3 h-10 rounded-full flex-shrink-0 ${currentModule.color}`} />
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{currentModule.name}</h3>
              <p className={`text-xs mt-1 font-medium ${currentModule.textColor}`}>Module {moduleIndex + 1} of 8</p>
            </div>
          </div>
          <ProgressBar value={stats.weekProgress} color={`${currentModule.color.replace('bg-', 'bg-')}`} label="This week" />
          <button
            onClick={() => setActiveTab('schedule')}
            className="mt-4 w-full btn-primary text-xs py-2 rounded-xl"
          >
            View Schedule →
          </button>
        </div>

        {/* Career readiness circle */}
        <div className="card p-5 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4">Career Readiness</p>
          <CircularProgress value={careerReadiness.readinessScore} size={120} strokeWidth={10} color="#4f46e5" trackColor="rgb(226 232 240)">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{careerReadiness.readinessScore}%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">ready</div>
            </div>
          </CircularProgress>
          <div className="mt-3 space-y-1 w-full">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Potential salary lift</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+${careerReadiness.potentialSalaryIncrease.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Matched jobs</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">{careerReadiness.matchedJobs.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={() => setActiveTab('career')} className="mt-4 w-full btn-secondary text-xs py-2 rounded-xl">
            Career Dashboard →
          </button>
        </div>

        {/* Focus Timer */}
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4">Focus Timer</p>
          <PomodoroTimer />
        </div>
      </div>

      {/* Today's plan */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">
            {todayEntry ? `Today — ${todayEntry.date} (${todayEntry.day})` : "Today's Plan"}
          </h3>
          <button onClick={() => setActiveTab('schedule')} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">
            Full schedule →
          </button>
        </div>

        {!todayEntry ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No sessions scheduled for today. Enjoy your rest!</p>
        ) : todayEntry.isRestDay ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="font-medium text-emerald-800 dark:text-emerald-300">Rest Day</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Well-deserved break — see you Monday!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {todayEntry.morningSession && (
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${todayEntry.morningSession.completed ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'}`}>
                <span className="text-xl flex-shrink-0">{todayEntry.morningSession.completed ? '✅' : '🌅'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">{todayEntry.morningSession.time}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{todayEntry.morningSession.activity}</p>
                </div>
                {todayEntry.morningSession.completed && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex-shrink-0">Done</span>}
              </div>
            )}
            {todayEntry.eveningSession && (
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${todayEntry.eveningSession.completed ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800'}`}>
                <span className="text-xl flex-shrink-0">{todayEntry.eveningSession.completed ? '✅' : '🌙'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">{todayEntry.eveningSession.time}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{todayEntry.eveningSession.activity}</p>
                </div>
                {todayEntry.eveningSession.completed && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex-shrink-0">Done</span>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skills preview */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Skills Being Built</h3>
          <button onClick={() => setActiveTab('career')} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">See all →</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {careerReadiness.currentSkills.slice(0, 4).map(([skill, level]) => {
            const levelPct = { 'Advanced': 100, 'Intermediate': 65, 'Beginner': 30 }[level] || 0;
            return (
              <div key={skill} className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">{skill}</p>
                <ProgressBar value={levelPct} color="bg-brand-500" height="h-1.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{level}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
