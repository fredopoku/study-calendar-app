import { useApp } from '../../context/AppContext';
import StatCard from '../ui/StatCard';
import ProgressBar from '../ui/ProgressBar';
import CircularProgress from '../ui/CircularProgress';
import PomodoroTimer from '../timer/PomodoroTimer';
import { getMotivationalMessage, formatMinutes, getWeekStatus } from '../../utils/helpers';
import { courseModules } from '../../data/courseData';
import {
  IconCalendar, IconFlame, IconBook, IconTarget, IconBrain,
  IconChevronRight, IconCheckCircle, IconSun, IconMoon,
  IconBriefcase,
} from '../ui/Icons';

function SessionRow({ session, type, onNavigate }) {
  if (!session) return null;
  const isMorning = type === 'morning';
  const completed = session.completed;

  const borderBg = completed
    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
    : isMorning
      ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
      : 'bg-violet-50 dark:bg-violet-900/10 border-violet-200 dark:border-violet-800';

  const timeColor = completed
    ? 'text-emerald-600 dark:text-emerald-400'
    : isMorning ? 'text-orange-600 dark:text-orange-400' : 'text-violet-600 dark:text-violet-400';

  const Icon = completed
    ? <IconCheckCircle className="w-5 h-5 text-emerald-500" />
    : isMorning
      ? <IconSun className="w-5 h-5 text-orange-500" />
      : <IconMoon className="w-5 h-5 text-violet-500" />;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${borderBg}`}>
      <span className="flex-shrink-0">{Icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-semibold ${timeColor}`}>{session.time}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{session.activity}</p>
      </div>
      {completed
        ? <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex-shrink-0">Done</span>
        : <button onClick={onNavigate} className="text-xs text-brand-600 dark:text-brand-400 font-medium flex-shrink-0 hover:underline">Start</button>
      }
    </div>
  );
}

export default function OverviewPage() {
  const {
    stats, careerReadiness, studySchedule, settings, setActiveTab,
    gamification, currentLevel, xpProgress, xpToNextLevel, isPro,
    userProfile, currentTrack,
  } = useApp();

  const weekStatus = getWeekStatus(stats.weekProgress);
  const moduleIndex = Math.min(Math.floor(settings.currentWeek / 2), courseModules.length - 1);
  const currentModule = courseModules[moduleIndex];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = studySchedule.find(d => d.fullDate === todayStr);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const name = userProfile?.name ? `, ${userProfile.name}` : '';
  const studyMinutes = gamification.totalSessions * 45;

  const quickActions = [
    { icon: <IconBrain className="w-4 h-4" />, label: 'Ask AI Tutor', tab: 'ai-tutor' },
    { icon: <IconCalendar className="w-4 h-4" />, label: 'View Schedule', tab: 'schedule' },
    { icon: <IconBriefcase className="w-4 h-4" />, label: 'Career Hub', tab: 'career' },
  ];

  return (
    <div className="space-y-5">
      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-brand-200 text-sm font-medium">{greeting}{name}!</p>
              <h2 className="text-xl font-bold leading-tight mt-0.5">
                {userProfile?.trackId === 'custom' && userProfile?.customGoal
                  ? userProfile.customGoal
                  : currentTrack?.name || settings.studyGoal}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
                <span className="text-lg">{currentLevel.icon}</span>
                <div>
                  <p className="text-xs font-bold leading-none">Lv.{currentLevel.level}</p>
                  <p className="text-[10px] text-brand-200">{currentLevel.name}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-brand-200 text-sm mb-4">
            {getMotivationalMessage(careerReadiness.readinessScore, careerReadiness.matchedJobs, careerReadiness.potentialSalaryIncrease)}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {gamification.streak > 0 && (
              <span className="flex items-center gap-1.5 bg-orange-500/30 text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                <IconFlame className="w-3 h-3" />
                {gamification.streak}-day streak
              </span>
            )}
            <span className={`badge text-xs font-semibold px-2.5 py-1 rounded-full ${weekStatus.bg} ${weekStatus.color}`}>
              Week {stats.currentWeek} — {weekStatus.label}
            </span>
            <span className="badge bg-white/15 text-white text-xs px-2.5 py-1 rounded-full">
              {stats.overallProgress}% complete
            </span>
            {!isPro && (
              <button
                onClick={() => setActiveTab('pricing')}
                className="badge bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs px-2.5 py-1 rounded-full transition-colors font-semibold"
              >
                ✦ Upgrade to Pro
              </button>
            )}
          </div>

          <div>
            <div className="flex justify-between text-xs text-brand-200 mb-1.5">
              <span>{gamification.xp} XP</span>
              <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to Level ${currentLevel.level + 1}` : 'Max Level'}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-white rounded-full transition-all duration-700" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Week Progress" value={`${stats.weekProgress}%`} sub={`${stats.completedSessions}/${stats.totalSessions} sessions`} icon={<IconCalendar className="w-5 h-5" />} accent="indigo" />
        <StatCard label="Study Streak" value={`${gamification.streak}d`} sub={gamification.streak > 0 ? 'Keep it going!' : 'Start today!'} icon={<IconFlame className="w-5 h-5" />} accent="amber" />
        <StatCard label="Total Sessions" value={gamification.totalSessions} sub={formatMinutes(studyMinutes) + ' studied'} icon={<IconBook className="w-5 h-5" />} accent="emerald" />
        <StatCard label="Career Ready" value={`${careerReadiness.readinessScore}%`} sub={`${careerReadiness.matchedJobs?.toLocaleString()} jobs`} icon={<IconTarget className="w-5 h-5" />} accent="violet" />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Current track/module */}
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Current Module</p>
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-3 h-10 rounded-full flex-shrink-0 ${currentModule.color}`} />
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">{currentModule.name}</h3>
              <p className={`text-xs mt-1 font-medium ${currentModule.textColor}`}>Module {moduleIndex + 1} of 8</p>
            </div>
          </div>
          <ProgressBar value={stats.weekProgress} color={currentModule.color} label="This week" />
          <button
            onClick={() => setActiveTab('schedule')}
            className="mt-4 w-full btn-primary text-xs py-2 rounded-xl"
          >
            View Schedule →
          </button>
        </div>

        {/* Career readiness */}
        <div className="card p-5 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Career Readiness</p>
          <CircularProgress value={careerReadiness.readinessScore} size={110} strokeWidth={10} color="#4f46e5">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{careerReadiness.readinessScore}%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">ready</div>
            </div>
          </CircularProgress>
          <div className="mt-3 space-y-1 w-full">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Salary lift potential</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+${careerReadiness.potentialSalaryIncrease?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Jobs matched</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">{careerReadiness.matchedJobs?.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={() => setActiveTab('career')} className="mt-3 w-full btn-secondary text-xs py-2 rounded-xl">
            Career Dashboard →
          </button>
        </div>

        {/* Focus Timer */}
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4">Focus Timer</p>
          <PomodoroTimer />
        </div>
      </div>

      {/* AI Tutor CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-brand-600 p-5 text-white relative overflow-hidden">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
          <IconBrain className="w-20 h-20" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <IconBrain className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg">Your AI Tutor is Ready</h3>
            </div>
            <p className="text-violet-200 text-sm">
              Stuck? Curious? Ask your AI tutor anything about your studies — get clear, instant explanations.
            </p>
            {!isPro && (
              <p className="text-violet-300 text-xs mt-1">3 free questions per day. Upgrade for unlimited.</p>
            )}
          </div>
          <button
            onClick={() => setActiveTab('ai-tutor')}
            className="flex-shrink-0 bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors text-sm"
          >
            Ask AI Tutor →
          </button>
        </div>
      </div>

      {/* Today's plan */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">
            {todayEntry ? `Today — ${todayEntry.date}` : "Today's Plan"}
          </h3>
          <button onClick={() => setActiveTab('schedule')} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">
            Full schedule →
          </button>
        </div>

        {!todayEntry ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No sessions scheduled today. Rest up!</p>
        ) : todayEntry.isRestDay ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-emerald-800 dark:text-emerald-300">Rest Day</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Well-deserved break — see you tomorrow!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <SessionRow session={todayEntry.morningSession} type="morning" onNavigate={() => setActiveTab('schedule')} />
            <SessionRow session={todayEntry.eveningSession} type="evening" onNavigate={() => setActiveTab('schedule')} />
          </div>
        )}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Skills */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Skills Building</h3>
            <button onClick={() => setActiveTab('career')} className="text-[10px] text-brand-500 hover:underline">See all</button>
          </div>
          <div className="space-y-2">
            {careerReadiness.currentSkills?.slice(0, 3).map(([skill, level]) => {
              const pct = { 'Advanced': 100, 'Intermediate': 65, 'Beginner': 30 }[level] || 0;
              return (
                <div key={skill}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{skill}</span>
                    <span className="text-slate-400">{level}</span>
                  </div>
                  <ProgressBar value={pct} color="bg-brand-500" height="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements preview */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Achievements</h3>
            <button onClick={() => setActiveTab('analytics')} className="text-[10px] text-brand-500 hover:underline">View all</button>
          </div>
          {gamification.achievements?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {gamification.achievements.slice(0, 6).map(id => {
                const a = require('../../utils/gamification').ACHIEVEMENTS.find(x => x.id === id);
                return a ? (
                  <span key={id} title={a.name} className="text-xl" role="img" aria-label={a.name}>{a.icon}</span>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500">Complete sessions to unlock achievements!</p>
          )}
          <p className="text-[10px] text-slate-400 mt-2">{gamification.achievements?.length || 0} unlocked</p>
        </div>

        {/* Quick actions */}
        <div className="card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Quick Actions</h3>
          <div className="space-y-1.5">
            {quickActions.map(a => (
              <button
                key={a.tab}
                onClick={() => setActiveTab(a.tab)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
              >
                <span className="text-slate-500 dark:text-slate-400">{a.icon}</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{a.label}</span>
                <IconChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
