import { useApp } from '../../context/AppContext';
import { formatTime } from '../../utils/helpers';
import CircularProgress from '../ui/CircularProgress';

export default function PomodoroTimer({ compact = false }) {
  const { timerActive, timerPaused, timeLeft, isBreakTime, todayPomodoros, startTimer, pauseTimer, stopTimer, stats, notificationsEnabled, requestNotifications } = useApp();

  const totalSeconds = isBreakTime ? 5 * 60 : 25 * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const color = isBreakTime ? '#10b981' : timerActive ? '#4f46e5' : '#94a3b8';

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <CircularProgress value={progress} size={44} strokeWidth={4} color={color} trackColor="rgba(255,255,255,0.15)">
          <span className="text-[9px] font-bold text-white leading-none">{formatTime(timeLeft)}</span>
        </CircularProgress>
        <div>
          <p className="text-xs font-semibold text-white leading-none mb-0.5">{isBreakTime ? 'Break' : 'Focus'}</p>
          <p className="text-[10px] text-slate-400">{todayPomodoros} today</p>
        </div>
        <button
          onClick={timerActive ? (timerPaused ? startTimer : pauseTimer) : startTimer}
          className="ml-auto w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center transition-colors"
        >
          {timerActive && !timerPaused ? '⏸' : '▶'}
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <CircularProgress
          value={progress}
          size={160}
          strokeWidth={10}
          color={color}
          trackColor="rgba(255,255,255,0.1)"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white tabular-nums">{formatTime(timeLeft)}</div>
            <div className="text-xs text-slate-400 mt-0.5">{isBreakTime ? '☕ Break' : '📚 Focus'}</div>
          </div>
        </CircularProgress>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        {!timerActive ? (
          <button onClick={startTimer} className="btn bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 text-sm rounded-xl">
            ▶ Start Focus
          </button>
        ) : (
          <>
            <button onClick={pauseTimer} className="btn bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm rounded-xl">
              {timerPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={stopTimer} className="btn bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 text-sm rounded-xl">
              ⏹ Stop
            </button>
          </>
        )}
      </div>

      <div className="space-y-1 text-xs text-slate-400">
        <div className="flex justify-between px-2">
          <span>Today's sessions</span>
          <span className="font-semibold text-white">{todayPomodoros}</span>
        </div>
        <div className="flex justify-between px-2">
          <span>Study time this week</span>
          <span className="font-semibold text-white">{stats.totalStudyTime}m</span>
        </div>
        {!notificationsEnabled && (
          <button onClick={requestNotifications} className="w-full mt-2 text-[10px] text-slate-500 hover:text-slate-300 transition-colors py-1">
            Enable desktop notifications
          </button>
        )}
      </div>
    </div>
  );
}
