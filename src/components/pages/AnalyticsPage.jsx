import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../ui/CircularProgress';
import { ACHIEVEMENTS, RARITY_COLORS } from '../../utils/gamification';
import { formatMinutes } from '../../utils/helpers';
import { IconBook, IconFlame, IconClock, IconTarget, IconLock } from '../ui/Icons';

function MiniBar({ value, max, color }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
      <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function ActivityHeatmap({ data }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {data.map((day, i) => (
        <div
          key={i}
          title={`${day.date}: ${day.sessions} sessions`}
          className={`w-4 h-4 rounded-sm transition-colors ${
            day.sessions === 0 ? 'bg-slate-100 dark:bg-slate-700' :
            day.sessions === 1 ? 'bg-brand-200 dark:bg-brand-900' :
            day.sessions === 2 ? 'bg-brand-400 dark:bg-brand-700' :
            'bg-brand-600 dark:bg-brand-500'
          }`}
        />
      ))}
    </div>
  );
}

const statCards = (gamification, studyMinutes) => [
  {
    label: 'Total Sessions',
    value: gamification.totalSessions,
    icon: <IconBook className="w-6 h-6" />,
    color: 'text-brand-600 dark:text-brand-400',
    bg: 'bg-brand-50 dark:bg-brand-900/20',
    iconColor: 'text-brand-500',
  },
  {
    label: 'Current Streak',
    value: `${gamification.streak} days`,
    icon: <IconFlame className="w-6 h-6" />,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-500',
  },
  {
    label: 'Total Study Time',
    value: formatMinutes(studyMinutes),
    icon: <IconClock className="w-6 h-6" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-500',
  },
  {
    label: 'Pomodoros Done',
    value: gamification.totalPomodoros,
    icon: <IconTarget className="w-6 h-6" />,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    iconColor: 'text-rose-500',
  },
];

export default function AnalyticsPage() {
  const { gamification, currentLevel, xpProgress, xpToNextLevel, careerReadiness, studySchedule, isPro, setActiveTab } = useApp();

  const activityData = useMemo(() => {
    const days = [];
    const completedDates = new Set();
    studySchedule.forEach(day => {
      if (day.morningSession?.completed || day.eveningSession?.completed) {
        completedDates.add(day.fullDate);
      }
    });

    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split('T')[0];
      const sessions = completedDates.has(str) ? Math.floor(Math.random() * 2) + 1 : 0;
      days.push({ date: str, sessions });
    }
    return days;
  }, [studySchedule]);

  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      sessions: Math.max(0, Math.floor((gamification.totalSessions / 7) * (0.6 + Math.sin(i) * 0.4))),
    }));
  }, [gamification.totalSessions]);

  const maxWeekly = Math.max(...weeklyData.map(d => d.sessions), 1);

  const unlockedAchievements = ACHIEVEMENTS.filter(a => (gamification.achievements || []).includes(a.id));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !(gamification.achievements || []).includes(a.id));

  const studyMinutes = gamification.totalSessions * 45;
  const avgSessionMinutes = gamification.totalSessions > 0 ? Math.round(studyMinutes / gamification.totalSessions) : 0;

  const cards = statCards(gamification, studyMinutes);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Learning Analytics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your progress, habits, and achievements</p>
        </div>
        {!isPro && (
          <button
            onClick={() => setActiveTab('pricing')}
            className="btn bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs px-4 py-2"
          >
            Unlock Full Analytics →
          </button>
        )}
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(s => (
          <div key={s.label} className={`card p-4 text-center`}>
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3 ${s.iconColor}`}>
              {s.icon}
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Level + XP */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Level Progress</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">{gamification.xp} XP total</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 text-center">
            <div className="text-4xl mb-1">{currentLevel.icon}</div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Lv. {currentLevel.level}</p>
            <p className={`text-xs ${currentLevel.color}`}>{currentLevel.name}</p>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Level {currentLevel.level}</span>
              <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to Level ${currentLevel.level + 1}` : 'Max Level!'}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-700"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { label: '+50 XP', sub: 'per session' },
                { label: '+20 XP', sub: 'per pomodoro' },
                { label: '+5 XP', sub: 'per AI chat' },
                { label: '+15 XP', sub: 'streak bonus' },
              ].map(tip => (
                <div key={tip.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-2.5 py-1.5 text-center">
                  <p className="text-xs font-bold text-brand-600 dark:text-brand-400">{tip.label}</p>
                  <p className="text-[10px] text-slate-400">{tip.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity heatmap + weekly chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="section-title mb-4">28-Day Activity</h3>
          <ActivityHeatmap data={activityData} />
          <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
            <span>Less</span>
            {['bg-slate-100 dark:bg-slate-700', 'bg-brand-200 dark:bg-brand-900', 'bg-brand-400 dark:bg-brand-700', 'bg-brand-600 dark:bg-brand-500'].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="section-title mb-4">Weekly Sessions</h3>
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative flex items-end" style={{ height: '100px' }}>
                  <div
                    className="w-full bg-brand-500 rounded-t-lg transition-all duration-700 min-h-[4px]"
                    style={{ height: `${maxWeekly > 0 ? (d.sessions / maxWeekly) * 100 : 4}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Skill Development</h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{careerReadiness.readinessScore}% job ready</span>
        </div>
        <div className="space-y-3">
          {careerReadiness.marketData?.topSkills?.slice(0, 6).map(skill => {
            const level = careerReadiness.skillsMap?.[skill.name] || 'None';
            const pct = { 'Advanced': 100, 'Intermediate': 65, 'Beginner': 30, 'None': 0 }[level];
            const colors = { 'Advanced': 'bg-emerald-500', 'Intermediate': 'bg-brand-500', 'Beginner': 'bg-amber-500', 'None': 'bg-slate-300 dark:bg-slate-600' };
            return (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="w-28 text-xs font-medium text-slate-700 dark:text-slate-300 flex-shrink-0">{skill.name}</span>
                <MiniBar value={pct} max={100} color={colors[level]} />
                <span className={`text-xs font-semibold w-20 text-right ${
                  level === 'Advanced' ? 'text-emerald-600 dark:text-emerald-400' :
                  level === 'Intermediate' ? 'text-brand-600 dark:text-brand-400' :
                  level === 'Beginner' ? 'text-amber-600 dark:text-amber-400' :
                  'text-slate-400'
                }`}>{level}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Career readiness circle */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Career Readiness</h3>
          <button onClick={() => setActiveTab('career')} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Full report →</button>
        </div>
        <div className="flex items-center gap-6">
          <CircularProgress value={careerReadiness.readinessScore} size={100} strokeWidth={8} color="#4f46e5">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900 dark:text-white">{careerReadiness.readinessScore}%</div>
              <div className="text-[10px] text-slate-400">ready</div>
            </div>
          </CircularProgress>
          <div className="flex-1 space-y-2">
            {[
              { label: 'Jobs matched', value: careerReadiness.matchedJobs?.toLocaleString(), color: 'text-brand-600 dark:text-brand-400' },
              { label: 'Salary potential', value: `+$${careerReadiness.potentialSalaryIncrease?.toLocaleString()}`, color: 'text-emerald-600 dark:text-emerald-400' },
              { label: 'Avg session time', value: `${avgSessionMinutes} min`, color: 'text-violet-600 dark:text-violet-400' },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                <span className={`font-semibold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Achievements</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {unlockedAchievements.length}/{ACHIEVEMENTS.length} unlocked
          </span>
        </div>
        {unlockedAchievements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Unlocked</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {unlockedAchievements.map(a => (
                <div key={a.id} className={`border rounded-xl p-3 ${RARITY_COLORS[a.rarity]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{a.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {lockedAchievements.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Locked</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {lockedAchievements.slice(0, 6).map(a => (
                <div key={a.id} className="border border-slate-100 dark:border-slate-700 rounded-xl p-3 opacity-50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <IconLock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{a.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
