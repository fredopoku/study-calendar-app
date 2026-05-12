import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  courseModules, generateModuleActivities, generateResources,
  getJobMarketData, defaultPortfolioProjects, defaultInterviewPrep,
} from '../data/courseData';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }) => {
  // ── Persisted state ───────────────────────────────────────────────────────
  const [settings, setSettings] = useLocalStorage('scp_settings', {
    currentWeek: 0,
    completedWeeks: [],
    studyGoal: 'Google Data Analytics Certificate',
    studyHoursPerWeek: 15,
  });

  const [darkMode, setDarkMode] = useLocalStorage('scp_dark', false);

  const [scheduleStore, setScheduleStore] = useLocalStorage('scp_schedule', {});
  const [portfolioProjects, setPortfolioProjects] = useLocalStorage('scp_portfolio', defaultPortfolioProjects);
  const [jobApplications, setJobApplications] = useLocalStorage('scp_jobs', []);
  const [interviewPrep, setInterviewPrep] = useLocalStorage('scp_interview', defaultInterviewPrep);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('scp_notifs', false);
  const [pomodoroTotalToday, setPomodoroTotalToday] = useLocalStorage('scp_pomodoro_today', { date: '', count: 0 });

  // ── UI state (not persisted) ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionDifficulty, setSessionDifficulty] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Timer state ───────────────────────────────────────────────────────────
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const timerRef = useRef(null);

  // ── Dark mode effect ──────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // ── Schedule generation ───────────────────────────────────────────────────
  const generateWeekSchedule = useCallback((weekOffset) => {
    const stored = scheduleStore[weekOffset];
    if (stored) return stored;

    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);

    const weekStart = new Date(startOfWeek);
    weekStart.setDate(weekStart.getDate() + weekOffset * 7);

    const moduleIndex = Math.min(Math.floor(weekOffset / 2), courseModules.length - 1);
    const currentModule = courseModules[moduleIndex];
    const isFirstWeekOfModule = weekOffset % 2 === 0;

    const schedule = [];

    for (let i = 1; i <= 5; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const activities = generateModuleActivities(currentModule.name, isFirstWeekOfModule, i);

      schedule.push({
        id: `w${weekOffset}-d${i}`,
        date: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        day: d.toLocaleDateString('en-US', { weekday: 'long' }),
        fullDate: d.toISOString().split('T')[0],
        module: currentModule.name,
        moduleColor: currentModule.color,
        moduleHex: currentModule.hex,
        moduleTextColor: currentModule.textColor,
        moduleLightBg: currentModule.lightBg,
        moduleBorder: currentModule.border,
        week: weekOffset + 1,
        isRestDay: false,
        isOptional: false,
        morningSession: {
          time: '6:00 – 9:00 AM',
          activity: activities.morning,
          completed: false,
          timeSpent: 0,
          notes: '',
          difficulty: 0,
          technique: '',
          resources: generateResources(activities.morning),
        },
        eveningSession: {
          time: '7:00 – 10:00 PM',
          activity: activities.evening,
          completed: false,
          timeSpent: 0,
          notes: '',
          difficulty: 0,
          technique: '',
          resources: generateResources(activities.evening),
        },
        dayCompleted: false,
      });
    }

    // Saturday
    const sat = new Date(weekStart);
    sat.setDate(weekStart.getDate() + 6);
    schedule.push({
      id: `w${weekOffset}-d6`,
      date: sat.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      day: 'Saturday',
      fullDate: sat.toISOString().split('T')[0],
      module: 'Optional Review',
      moduleColor: 'bg-slate-400',
      moduleHex: '#94a3b8',
      moduleTextColor: 'text-slate-500',
      moduleLightBg: 'bg-slate-50',
      moduleBorder: 'border-slate-200',
      week: weekOffset + 1,
      isRestDay: false,
      isOptional: true,
      morningSession: null,
      eveningSession: {
        time: '2:00 – 4:00 PM',
        activity: 'Review & Practice (Optional)',
        completed: false,
        timeSpent: 0,
        notes: '',
        difficulty: 0,
        technique: '',
        resources: [],
      },
      dayCompleted: false,
    });

    // Sunday
    const sun = new Date(weekStart);
    sun.setDate(weekStart.getDate() + 7);
    schedule.push({
      id: `w${weekOffset}-d7`,
      date: sun.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      day: 'Sunday',
      fullDate: sun.toISOString().split('T')[0],
      module: 'Rest Day',
      moduleColor: 'bg-emerald-400',
      moduleHex: '#34d399',
      moduleTextColor: 'text-emerald-600',
      moduleLightBg: 'bg-emerald-50',
      moduleBorder: 'border-emerald-200',
      week: weekOffset + 1,
      isRestDay: true,
      isOptional: false,
      morningSession: null,
      eveningSession: null,
      dayCompleted: true,
    });

    return schedule;
  }, [scheduleStore]);

  // ── Derived schedule (current week) ───────────────────────────────────────
  const [studySchedule, setStudySchedule] = useState(() =>
    generateWeekSchedule(settings.currentWeek)
  );

  useEffect(() => {
    setStudySchedule(generateWeekSchedule(settings.currentWeek));
  }, [settings.currentWeek, generateWeekSchedule]);

  // ── Persist schedule changes ──────────────────────────────────────────────
  useEffect(() => {
    if (studySchedule.length > 0) {
      setScheduleStore(prev => ({ ...prev, [settings.currentWeek]: studySchedule }));
    }
  }, [studySchedule, settings.currentWeek, setScheduleStore]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    if (!studySchedule.length) return { completedSessions: 0, totalSessions: 0, completedDays: 0, totalStudyTime: 0, weekProgress: 0, overallProgress: 0, currentWeek: 1, totalWeeks: 16 };

    const activeDays = studySchedule.filter(d => !d.isRestDay);
    let completedSessions = 0, totalSessions = 0;

    activeDays.forEach(day => {
      if (day.morningSession) { totalSessions++; if (day.morningSession.completed) completedSessions++; }
      if (day.eveningSession) { totalSessions++; if (day.eveningSession.completed) completedSessions++; }
    });

    const completedDays = studySchedule.filter(d => d.dayCompleted).length;
    const totalStudyTime = studySchedule.reduce((t, d) => t + (d.morningSession?.timeSpent || 0) + (d.eveningSession?.timeSpent || 0), 0);
    const weekProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    const totalPossibleSessions = 16 * 10;
    const completedInPastWeeks = settings.completedWeeks.length * 10;
    const overallProgress = Math.min(Math.round(((completedInPastWeeks + completedSessions) / totalPossibleSessions) * 100), 100);

    return { completedSessions, totalSessions, completedDays, totalStudyTime, weekProgress, overallProgress, currentWeek: settings.currentWeek + 1, totalWeeks: 16 };
  }, [studySchedule, settings.currentWeek, settings.completedWeeks]);

  // ── Career Readiness ──────────────────────────────────────────────────────
  const careerReadiness = useMemo(() => {
    const marketData = getJobMarketData();
    const completedSessions = stats.completedSessions + settings.completedWeeks.length * 10;

    const skillsMap = {
      'SQL': completedSessions >= 4 ? 'Intermediate' : completedSessions >= 2 ? 'Beginner' : 'None',
      'Excel': completedSessions >= 2 ? 'Advanced' : completedSessions >= 1 ? 'Intermediate' : 'Beginner',
      'Tableau': completedSessions >= 6 ? 'Intermediate' : completedSessions >= 4 ? 'Beginner' : 'None',
      'Statistics': completedSessions >= 5 ? 'Intermediate' : completedSessions >= 3 ? 'Beginner' : 'None',
      'Data Visualization': completedSessions >= 4 ? 'Intermediate' : completedSessions >= 2 ? 'Beginner' : 'None',
      'Python': settings.currentWeek >= 8 ? 'Beginner' : 'None',
      'Power BI': settings.currentWeek >= 10 ? 'Beginner' : 'None',
      'R Programming': settings.currentWeek >= 12 ? 'Beginner' : 'None',
    };

    let readinessScore = 0, potentialSalaryIncrease = 0;
    const levelMultiplier = { 'Advanced': 1.0, 'Intermediate': 0.7, 'Beginner': 0.4, 'None': 0 };

    marketData.topSkills.forEach(skill => {
      const level = skillsMap[skill.name];
      const mult = levelMultiplier[level] || 0;
      readinessScore += skill.demand * mult;
      potentialSalaryIncrease += skill.salaryImpact * mult;
    });

    const maxScore = marketData.topSkills.reduce((s, sk) => s + sk.demand, 0);
    readinessScore = Math.min(Math.round((readinessScore / maxScore) * 100), 100);
    const matchedJobs = Math.floor(marketData.totalJobs * (readinessScore / 100) * 0.6);
    const currentSkills = Object.entries(skillsMap).filter(([, l]) => l !== 'None');
    const missingSkills = marketData.topSkills
      .filter(sk => !skillsMap[sk.name] || skillsMap[sk.name] === 'None' || skillsMap[sk.name] === 'Beginner')
      .sort((a, b) => b.demand * b.salaryImpact - a.demand * a.salaryImpact);

    return { readinessScore, matchedJobs, potentialSalaryIncrease: Math.round(potentialSalaryIncrease), currentSkills, skillsMap, nextPrioritySkill: missingSkills[0], marketData };
  }, [stats, settings.currentWeek, settings.completedWeeks]);

  // ── Session management ────────────────────────────────────────────────────
  const openSessionModal = (dayId, sessionType, session) => {
    setSelectedSession({ dayId, sessionType, session });
    setSessionNotes(session.notes || '');
    setSessionDifficulty(session.difficulty || 0);
    setSelectedTechnique(session.technique || '');
    setShowSessionModal(true);
  };

  const saveSession = () => {
    setStudySchedule(prev => prev.map(day => {
      if (day.id !== selectedSession.dayId) return day;
      const key = selectedSession.sessionType === 'morning' ? 'morningSession' : 'eveningSession';
      const updatedSession = { ...day[key], completed: true, notes: sessionNotes, difficulty: sessionDifficulty, technique: selectedTechnique, timeSpent: Math.max(pomodoroCount * 25, 30) };
      const updatedDay = { ...day, [key]: updatedSession };
      const mDone = !updatedDay.morningSession || updatedDay.morningSession.completed;
      const eDone = !updatedDay.eveningSession || updatedDay.eveningSession.completed;
      updatedDay.dayCompleted = mDone && eDone;
      return updatedDay;
    }));
    setShowSessionModal(false);
    setPomodoroCount(0);
    showToast('Session completed! Great work.', 'success');
  };

  const toggleSession = (dayId, sessionType) => {
    const day = studySchedule.find(d => d.id === dayId);
    if (!day) return;
    const session = sessionType === 'morning' ? day.morningSession : day.eveningSession;
    if (!session) return;

    if (!session.completed) {
      openSessionModal(dayId, sessionType, session);
    } else {
      setStudySchedule(prev => prev.map(d => {
        if (d.id !== dayId) return d;
        const key = sessionType === 'morning' ? 'morningSession' : 'eveningSession';
        return { ...d, [key]: { ...d[key], completed: false, notes: '', difficulty: 0, timeSpent: 0 }, dayCompleted: false };
      }));
    }
  };

  // ── Week navigation ───────────────────────────────────────────────────────
  const goToNextWeek = () => {
    if (stats.weekProgress < 80) return;
    const newWeek = settings.currentWeek + 1;
    if (newWeek >= 16) return;
    setSettings(s => ({ ...s, currentWeek: newWeek, completedWeeks: [...new Set([...s.completedWeeks, s.currentWeek])] }));
    showToast(`Advanced to Week ${newWeek + 1}!`, 'success');
  };

  const goToPreviousWeek = () => {
    if (settings.currentWeek <= 0) return;
    setSettings(s => ({ ...s, currentWeek: s.currentWeek - 1 }));
  };

  const jumpToWeek = (weekNumber) => {
    setSettings(s => ({ ...s, currentWeek: weekNumber }));
    setShowWeekSelector(false);
  };

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerActive && !timerPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            if (isBreakTime) {
              setIsBreakTime(false);
              setTimeLeft(25 * 60);
              if (notificationsEnabled && Notification.permission === 'granted') {
                new Notification('Break Over! 📚', { body: 'Time to get back to studying!' });
              }
              showToast('Break over — back to it!', 'info');
            } else {
              setPomodoroCount(c => c + 1);
              const today = new Date().toISOString().split('T')[0];
              setPomodoroTotalToday(p => ({ date: today, count: p.date === today ? p.count + 1 : 1 }));
              setIsBreakTime(true);
              setTimeLeft(5 * 60);
              if (notificationsEnabled && Notification.permission === 'granted') {
                new Notification('Great Work! ☕', { body: 'Time for a 5-minute break!' });
              }
              showToast('Pomodoro complete! Take a 5-min break.', 'success');
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, timerPaused, isBreakTime, notificationsEnabled, setPomodoroTotalToday]);

  const startTimer = () => { setTimerActive(true); setTimerPaused(false); };
  const pauseTimer = () => setTimerPaused(p => !p);
  const stopTimer = () => { setTimerActive(false); setTimerPaused(false); setTimeLeft(25 * 60); setIsBreakTime(false); };

  const requestNotifications = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') { setNotificationsEnabled(true); showToast('Notifications enabled!', 'success'); }
    }
  };

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  // ── AI Recommendations ────────────────────────────────────────────────────
  const aiRecommendations = useMemo(() => {
    const recs = [];
    if (stats.weekProgress < 50 && settings.currentWeek > 2) {
      recs.push({ type: 'study', priority: 'high', title: 'Boost Study Consistency', description: `You're at ${stats.weekProgress}% completion this week. Break sessions into 25-min Pomodoro blocks for better retention.`, action: 'Use 25-min focused sessions', impact: 'Improve retention by 40%' });
    }
    if (careerReadiness.readinessScore < 30) {
      recs.push({ type: 'skill', priority: 'high', title: 'Focus on High-Impact Skills', description: `Job readiness at ${careerReadiness.readinessScore}%. Prioritize SQL and Excel for immediate market impact.`, action: 'Complete SQL fundamentals module', impact: '+15% job readiness' });
    }
    const completedProjects = portfolioProjects.filter(p => p.status === 'completed').length;
    if (settings.currentWeek >= 4 && completedProjects === 0) {
      recs.push({ type: 'portfolio', priority: 'medium', title: 'Start Portfolio Project', description: "You're ready for hands-on projects. Begin Customer Churn Analysis to demonstrate SQL skills.", action: 'Begin first project', impact: '+25% interview callbacks' });
    }
    if (careerReadiness.readinessScore >= 60 && jobApplications.length === 0) {
      recs.push({ type: 'application', priority: 'medium', title: 'Begin Job Applications', description: `At ${careerReadiness.readinessScore}% readiness you're competitive for entry-level positions. Start applying.`, action: 'Apply to 5 junior analyst roles', impact: 'Gain market feedback early' });
    }
    const practiced = interviewPrep.commonQuestions.filter(q => q.practiced).length;
    if (careerReadiness.readinessScore >= 40 && practiced < 3) {
      recs.push({ type: 'interview', priority: 'medium', title: 'Practice Interview Questions', description: 'Prepare for technical and behavioral questions to increase confidence.', action: 'Practice 5 questions weekly', impact: '+30% interview success rate' });
    }
    recs.push({ type: 'network', priority: 'low', title: 'Expand Your Network', description: 'Connect with data professionals and join analytics communities.', action: 'Join 3 data communities', impact: '60% of jobs come from networking' });
    return recs.sort((a, b) => ({ high: 3, medium: 2, low: 1 }[b.priority] - { high: 3, medium: 2, low: 1 }[a.priority]));
  }, [stats, careerReadiness, portfolioProjects, jobApplications, interviewPrep, settings.currentWeek]);

  const todayPomodoros = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return pomodoroTotalToday.date === today ? pomodoroTotalToday.count : 0;
  }, [pomodoroTotalToday]);

  return (
    <AppContext.Provider value={{
      settings, setSettings,
      darkMode, setDarkMode,
      studySchedule,
      stats,
      careerReadiness,
      portfolioProjects, setPortfolioProjects,
      jobApplications, setJobApplications,
      interviewPrep, setInterviewPrep,
      notificationsEnabled, setNotificationsEnabled, requestNotifications,
      activeTab, setActiveTab,
      showWeekSelector, setShowWeekSelector,
      showSessionModal, setShowSessionModal,
      selectedSession,
      sessionNotes, setSessionNotes,
      sessionDifficulty, setSessionDifficulty,
      selectedTechnique, setSelectedTechnique,
      sidebarOpen, setSidebarOpen,
      toast,
      timerActive, timerPaused, timeLeft, isBreakTime,
      pomodoroCount, todayPomodoros,
      startTimer, pauseTimer, stopTimer,
      toggleSession, saveSession,
      goToNextWeek, goToPreviousWeek, jumpToWeek,
      aiRecommendations,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};
