import React, { useState, useEffect } from 'react';

const StudyCalendarApp = () => {
  // Get current date and week info
  const getCurrentWeekInfo = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek, currentWeek: Math.floor((now - startOfWeek) / (7 * 24 * 60 * 60 * 1000)) };
  };

  // Course modules for professional tracking
  const courseModules = [
    { id: 1, name: 'Foundations: Data Everywhere', weeks: 2, color: 'bg-blue-500' },
    { id: 2, name: 'Ask Questions to Make Data-Driven Decisions', weeks: 2, color: 'bg-green-500' },
    { id: 3, name: 'Prepare Data for Exploration', weeks: 2, color: 'bg-purple-500' },
    { id: 4, name: 'Process Data from Dirty to Clean', weeks: 2, color: 'bg-orange-500' },
    { id: 5, name: 'Analyze Data to Answer Questions', weeks: 2, color: 'bg-red-500' },
    { id: 6, name: 'Share Data Through Visualization', weeks: 2, color: 'bg-indigo-500' },
    { id: 7, name: 'Data Analysis with R Programming', weeks: 2, color: 'bg-pink-500' },
    { id: 8, name: 'Google Data Analytics Capstone', weeks: 2, color: 'bg-teal-500' }
  ];

  // Generate week schedule based on current date and week number
  const generateWeekSchedule = (weekOffset = 0) => {
    const { startOfWeek } = getCurrentWeekInfo();
    const weekStart = new Date(startOfWeek);
    weekStart.setDate(weekStart.getDate() + (weekOffset * 7));

    const moduleIndex = Math.floor(weekOffset / 2);
    const currentModule = courseModules[moduleIndex] || courseModules[0];
    const isFirstWeekOfModule = weekOffset % 2 === 0;

    const schedule = [];

    // Generate 5 study days (Monday-Friday)
    for (let i = 1; i <= 5; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);

      const dateStr = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });

      const dayName = currentDate.toLocaleDateString('en-US', {
        weekday: 'long'
      });

      // Generate content based on module and week
      const activities = generateModuleActivities(currentModule, isFirstWeekOfModule, i);

      schedule.push({
        id: `week${weekOffset}-day${i}`,
        date: dateStr,
        day: dayName,
        fullDate: currentDate.toISOString().split('T')[0],
        module: currentModule.name,
        moduleColor: currentModule.color,
        week: weekOffset + 1,
        morningSession: {
          time: '6:00–9:00 AM',
          startTime: '06:00',
          activity: activities.morning,
          completed: false,
          timeSpent: 0,
          notes: '',
          difficulty: 0,
          technique: '',
          resources: generateResources(activities.morning)
        },
        eveningSession: {
          time: '7:00–10:00 PM',
          startTime: '19:00',
          activity: activities.evening,
          completed: false,
          timeSpent: 0,
          notes: '',
          difficulty: 0,
          technique: '',
          resources: generateResources(activities.evening)
        },
        dayCompleted: false
      });
    }

    // Add weekend rest days
    const saturday = new Date(weekStart);
    saturday.setDate(weekStart.getDate() + 6);
    const sunday = new Date(weekStart);
    sunday.setDate(weekStart.getDate() + 7);

    schedule.push({
      id: `week${weekOffset}-day6`,
      date: saturday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      day: 'Saturday',
      fullDate: saturday.toISOString().split('T')[0],
      module: 'Optional Review',
      moduleColor: 'bg-gray-400',
      week: weekOffset + 1,
      morningSession: null,
      eveningSession: {
        time: '2:00–4:00 PM',
        startTime: '14:00',
        activity: 'Review & Practice (Optional)',
        completed: false,
        timeSpent: 0,
        notes: '',
        difficulty: 0,
        technique: '',
        resources: []
      },
      dayCompleted: false
    });

    schedule.push({
      id: `week${weekOffset}-day7`,
      date: sunday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      day: 'Sunday',
      fullDate: sunday.toISOString().split('T')[0],
      module: 'Rest Day',
      moduleColor: 'bg-green-400',
      week: weekOffset + 1,
      morningSession: null,
      eveningSession: null,
      dayCompleted: true
    });

    return schedule;
  };

  // Generate realistic activities based on module progression
  const generateModuleActivities = (module, isFirstWeek, dayIndex) => {
    const moduleActivities = {
      'Foundations: Data Everywhere': {
        week1: [
          { morning: 'Course Introduction & Data Analytics Overview', evening: 'Data Types & Collection Methods' },
          { morning: 'Data Analytics Process & Tools', evening: 'Spreadsheet Basics & Functions' },
          { morning: 'SQL Fundamentals', evening: 'Data Visualization Principles' },
          { morning: 'Tableau Introduction', evening: 'R Programming Basics' },
          { morning: 'Weekly Project: Data Analysis', evening: 'Peer Review & Discussion' }
        ],
        week2: [
          { morning: 'Advanced Spreadsheet Functions', evening: 'Data Cleaning Techniques' },
          { morning: 'SQL Queries & Joins', evening: 'Database Design Principles' },
          { morning: 'Statistical Concepts', evening: 'Data Ethics & Privacy' },
          { morning: 'Career Preparation', evening: 'Portfolio Development' },
          { morning: 'Module Assessment', evening: 'Career Week Activities' }
        ]
      },
      'Ask Questions to Make Data-Driven Decisions': {
        week1: [
          { morning: 'Effective Question Formulation', evening: 'SMART Methodology' },
          { morning: 'Problem-Solving Framework', evening: 'Stakeholder Communication' },
          { morning: 'Data-Driven Decision Making', evening: 'Business Intelligence Basics' },
          { morning: 'Metrics & KPIs', evening: 'Dashboard Design' },
          { morning: 'Weekly Challenge', evening: 'Peer Collaboration' }
        ],
        week2: [
          { morning: 'Advanced Analytics Questions', evening: 'Hypothesis Testing' },
          { morning: 'Survey Design & Methods', evening: 'Interview Techniques' },
          { morning: 'Quantitative vs Qualitative', evening: 'Sample Size & Bias' },
          { morning: 'Presentation Skills', evening: 'Storytelling with Data' },
          { morning: 'Module Project', evening: 'Professional Portfolio Update' }
        ]
      }
    };

    const activities = moduleActivities[module.name] || moduleActivities['Foundations: Data Everywhere'];
    const weekKey = isFirstWeek ? 'week1' : 'week2';

    return activities[weekKey][dayIndex - 1] || {
      morning: 'Course Content Review',
      evening: 'Practice Exercises'
    };
  };

  // Generate realistic resources
  const generateResources = (activity) => {
    const resourceTypes = {
      'Course': [
        { name: `Video: ${activity}`, url: '#', type: 'video' },
        { name: `Reading: ${activity} Guide`, url: '#', type: 'reading' }
      ],
      'SQL': [
        { name: 'SQL Practice Platform', url: '#', type: 'coding' },
        { name: 'Database Schema Reference', url: '#', type: 'guide' }
      ],
      'Project': [
        { name: 'Project Template', url: '#', type: 'template' },
        { name: 'Dataset for Analysis', url: '#', type: 'dataset' }
      ],
      'Assessment': [
        { name: 'Practice Quiz', url: '#', type: 'quiz' },
        { name: 'Study Guide', url: '#', type: 'guide' }
      ]
    };

    if (activity.includes('SQL')) return resourceTypes.SQL;
    if (activity.includes('Project') || activity.includes('Challenge')) return resourceTypes.Project;
    if (activity.includes('Assessment') || activity.includes('Quiz')) return resourceTypes.Assessment;
    return resourceTypes.Course;
  };

  // Job market data simulation
  const getJobMarketData = () => {
    const baseJobs = 2847;
    const variation = Math.floor(Math.random() * 200) - 100;
    const currentJobs = baseJobs + variation;

    return {
      totalJobs: currentJobs,
      averageSalary: 68500,
      salaryGrowth: 18.5,
      topSkills: [
        { name: 'SQL', demand: 92, salaryImpact: 15000 },
        { name: 'Tableau', demand: 85, salaryImpact: 12000 },
        { name: 'Excel', demand: 78, salaryImpact: 5000 },
        { name: 'Python', demand: 67, salaryImpact: 18000 },
        { name: 'R Programming', demand: 45, salaryImpact: 15000 },
        { name: 'Power BI', demand: 56, salaryImpact: 10000 },
        { name: 'Statistics', demand: 71, salaryImpact: 8000 },
        { name: 'Data Visualization', demand: 89, salaryImpact: 10000 }
      ]
    };
  };

  const studyTechniques = {
    'active-learning': { name: 'Active Learning', icon: '🧠', description: 'Engage with material through practice' },
    'spaced-repetition': { name: 'Spaced Repetition', icon: '🔄', description: 'Review at increasing intervals' },
    'project-based': { name: 'Project-Based', icon: '🏗️', description: 'Learn by building real projects' },
    'peer-collaboration': { name: 'Peer Collaboration', icon: '👥', description: 'Learn through discussion and teamwork' },
    'hands-on-practice': { name: 'Hands-On Practice', icon: '⚡', description: 'Learn by doing exercises' },
    'video-learning': { name: 'Video Learning', icon: '📺', description: 'Watch instructional content' },
    'reading-comprehension': { name: 'Reading & Notes', icon: '📖', description: 'Deep reading with note-taking' },
    'assessment-prep': { name: 'Assessment Prep', icon: '📝', description: 'Focused test preparation' }
  };

  // Load or initialize settings
  const [settings, setSettings] = useState({
    startDate: new Date().toISOString().split('T')[0],
    currentWeek: 0,
    studyGoal: 'Google Data Analytics Certificate',
    studyHoursPerWeek: 15,
    completedWeeks: []
  });

  // All state variables
  const [studySchedule, setStudySchedule] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionDifficulty, setSessionDifficulty] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule');

  // State for computed values
  const [stats, setStats] = useState({
    completedSessions: 0,
    totalSessions: 0,
    completedDays: 0,
    totalStudyTime: 0,
    currentStreak: 0,
    weekProgress: 0,
    overallProgress: 0,
    currentWeek: 1,
    totalWeeks: 16
  });

  const [careerReadiness, setCareerReadiness] = useState({
    readinessScore: 15,
    matchedJobs: 342,
    potentialSalaryIncrease: 8500,
    currentSkills: [['Excel', 'Beginner']],
    nextPrioritySkill: { name: 'SQL', demand: 92, salaryImpact: 15000 },
    skillsMap: {},
    marketData: getJobMarketData()
  });

  // Portfolio Projects Management
  const [portfolioProjects, setPortfolioProjects] = useState([
    {
      id: 1,
      title: 'Customer Churn Analysis',
      description: 'Analyze customer retention patterns using SQL and Tableau',
      status: 'not-started',
      weekUnlocked: 4,
      skills: ['SQL', 'Tableau', 'Data Analysis'],
      estimatedHours: 15,
      actualHours: 0,
      githubUrl: '',
      liveUrl: '',
      completedDate: null,
      difficulty: 3
    },
    {
      id: 2,
      title: 'Sales Performance Dashboard',
      description: 'Build interactive dashboard tracking KPIs and trends',
      status: 'not-started',
      weekUnlocked: 8,
      skills: ['Tableau', 'Excel', 'Data Visualization'],
      estimatedHours: 20,
      actualHours: 0,
      githubUrl: '',
      liveUrl: '',
      completedDate: null,
      difficulty: 4
    },
    {
      id: 3,
      title: 'A/B Testing Analysis',
      description: 'Statistical analysis of marketing campaign effectiveness',
      status: 'not-started',
      weekUnlocked: 12,
      skills: ['Statistics', 'R Programming', 'Hypothesis Testing'],
      estimatedHours: 25,
      actualHours: 0,
      githubUrl: '',
      liveUrl: '',
      completedDate: null,
      difficulty: 5
    }
  ]);

  const [jobApplications, setJobApplications] = useState([]);

  const [interviewPrep, setInterviewPrep] = useState({
    commonQuestions: [
      { question: "Tell me about yourself", practiced: false, notes: '' },
      { question: "Why do you want to be a data analyst?", practiced: false, notes: '' },
      { question: "Describe your experience with SQL", practiced: false, notes: '' },
      { question: "How do you handle missing data?", practiced: false, notes: '' },
      { question: "Walk me through a data analysis project", practiced: false, notes: '' }
    ],
    technicalQuestions: [
      { question: "What's the difference between a left and inner join?", practiced: false, notes: '' },
      { question: "How would you identify outliers in a dataset?", practiced: false, notes: '' },
      { question: "Explain the difference between correlation and causation", practiced: false, notes: '' }
    ],
    behavioralQuestions: [
      { question: "Describe a time you had to analyze complex data", practiced: false, notes: '' },
      { question: "How do you prioritize multiple projects?", practiced: false, notes: '' }
    ]
  });

  const professionalNetwork = {
    linkedinConnections: 0,
    industryEvents: 0,
    mentorships: 0,
    dataCommunitiesMember: []
  };

  // Initialize study schedule on mount
  useEffect(() => {
    setStudySchedule(generateWeekSchedule(settings.currentWeek));
  }, [settings.currentWeek]);

  // Calculate stats when schedule changes
  useEffect(() => {
    if (studySchedule.length > 0) {
      const completedSessions = studySchedule.filter(day =>
        (day.morningSession?.completed || false) || (day.eveningSession?.completed || false)
      ).length;

      const totalSessions = studySchedule.filter(day =>
        day.morningSession || day.eveningSession
      ).length;

      const completedDays = studySchedule.filter(day => day.dayCompleted).length;
      const totalStudyTime = studySchedule.reduce((total, day) => {
        const morningTime = day.morningSession?.timeSpent || 0;
        const eveningTime = day.eveningSession?.timeSpent || 0;
        return total + morningTime + eveningTime;
      }, 0);

      const currentStreak = settings.completedWeeks.length + (completedDays >= 5 ? 1 : 0);
      const weekProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
      const overallProgress = Math.round(((settings.completedWeeks.length * 2) + completedSessions) / (courseModules.reduce((sum, m) => sum + m.weeks, 0) * 10) * 100);

      setStats({
        completedSessions,
        totalSessions,
        completedDays,
        totalStudyTime,
        currentStreak,
        weekProgress,
        overallProgress,
        currentWeek: settings.currentWeek + 1,
        totalWeeks: courseModules.reduce((sum, m) => sum + m.weeks, 0)
      });
    }
  }, [studySchedule, settings.currentWeek, settings.completedWeeks]);

  // Calculate career readiness when schedule or settings change
  useEffect(() => {
    if (studySchedule.length > 0) {
      const marketData = getJobMarketData();
      const completedSessions = studySchedule.filter(day =>
        (day.morningSession?.completed || false) || (day.eveningSession?.completed || false)
      ).length;

      const skillsMap = {
        'SQL': completedSessions >= 4 ? 'Intermediate' : completedSessions >= 2 ? 'Beginner' : 'None',
        'Excel': completedSessions >= 2 ? 'Advanced' : completedSessions >= 1 ? 'Intermediate' : 'Beginner',
        'Tableau': completedSessions >= 6 ? 'Intermediate' : completedSessions >= 4 ? 'Beginner' : 'None',
        'Statistics': completedSessions >= 5 ? 'Intermediate' : completedSessions >= 3 ? 'Beginner' : 'None',
        'Data Visualization': completedSessions >= 4 ? 'Intermediate' : completedSessions >= 2 ? 'Beginner' : 'None',
        'Python': settings.currentWeek >= 8 ? 'Beginner' : 'None',
        'R Programming': settings.currentWeek >= 12 ? 'Beginner' : 'None',
        'Power BI': settings.currentWeek >= 10 ? 'Beginner' : 'None'
      };

      let readinessScore = 0;
      let potentialSalaryIncrease = 0;

      marketData.topSkills.forEach(skill => {
        const userLevel = skillsMap[skill.name];
        if (userLevel === 'Advanced') {
          readinessScore += skill.demand * 1.0;
          potentialSalaryIncrease += skill.salaryImpact;
        } else if (userLevel === 'Intermediate') {
          readinessScore += skill.demand * 0.7;
          potentialSalaryIncrease += skill.salaryImpact * 0.7;
        } else if (userLevel === 'Beginner') {
          readinessScore += skill.demand * 0.4;
          potentialSalaryIncrease += skill.salaryImpact * 0.4;
        }
      });

      const maxPossibleScore = marketData.topSkills.reduce((sum, skill) => sum + skill.demand, 0);
      readinessScore = Math.min(Math.round((readinessScore / maxPossibleScore) * 100), 100);
      const matchedJobs = Math.floor(marketData.totalJobs * (readinessScore / 100) * 0.6);

      const missingSkills = marketData.topSkills.filter(skill =>
        skillsMap[skill.name] === 'None' || skillsMap[skill.name] === 'Beginner'
      ).sort((a, b) => (b.demand * b.salaryImpact) - (a.demand * a.salaryImpact));

      setCareerReadiness({
        readinessScore,
        matchedJobs,
        potentialSalaryIncrease: Math.round(potentialSalaryIncrease),
        currentSkills: Object.entries(skillsMap).filter(([_, level]) => level !== 'None'),
        nextPrioritySkill: missingSkills[0],
        skillsMap,
        marketData
      });
    }
  }, [studySchedule, settings.currentWeek]);

  // Week navigation functions
  const goToNextWeek = () => {
    if (stats.weekProgress >= 80) {
      const newWeek = settings.currentWeek + 1;
      const newSettings = {
        ...settings,
        currentWeek: newWeek,
        completedWeeks: [...settings.completedWeeks, settings.currentWeek]
      };
      setSettings(newSettings);
    }
  };

  const goToPreviousWeek = () => {
    if (settings.currentWeek > 0) {
      const newWeek = settings.currentWeek - 1;
      setSettings({ ...settings, currentWeek: newWeek });
    }
  };

  const jumpToWeek = (weekNumber) => {
    setSettings({ ...settings, currentWeek: weekNumber });
    setShowWeekSelector(false);
  };

  // Timer functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimerActive(true);
    setTimerPaused(false);
  };

  const pauseTimer = () => {
    setTimerPaused(!timerPaused);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimerPaused(false);
    setTimeLeft(25 * 60);
  };

  // Session management
  const completeSession = (dayId, sessionType, session) => {
    setSelectedSession({ dayId, sessionType, session });
    setSessionNotes(session.notes || '');
    setSessionDifficulty(session.difficulty || 0);
    setSelectedTechnique(session.technique || '');
    setShowNotesModal(true);
  };

  const saveSessionNotes = () => {
    setStudySchedule(prev => prev.map(day => {
      if (day.id === selectedSession.dayId) {
        const updatedDay = { ...day };
        const sessionKey = selectedSession.sessionType === 'morning' ? 'morningSession' : 'eveningSession';

        updatedDay[sessionKey] = {
          ...updatedDay[sessionKey],
          completed: true,
          notes: sessionNotes,
          difficulty: sessionDifficulty,
          technique: selectedTechnique,
          timeSpent: Math.max(pomodoroCount * 25, 30)
        };

        const morningDone = !updatedDay.morningSession || updatedDay.morningSession.completed;
        const eveningDone = !updatedDay.eveningSession || updatedDay.eveningSession.completed;
        updatedDay.dayCompleted = morningDone && eveningDone;

        return updatedDay;
      }
      return day;
    }));

    setShowNotesModal(false);
    setPomodoroCount(0);
  };

  const toggleSession = (dayId, sessionType) => {
    const day = studySchedule.find(d => d.id === dayId);
    const session = sessionType === 'morning' ? day.morningSession : day.eveningSession;

    if (!session.completed) {
      completeSession(dayId, sessionType, session);
    } else {
      setStudySchedule(prev => prev.map(d => {
        if (d.id === dayId) {
          const updatedDay = { ...d };
          const sessionKey = sessionType === 'morning' ? 'morningSession' : 'eveningSession';
          updatedDay[sessionKey] = {
            ...updatedDay[sessionKey],
            completed: false,
            notes: '',
            difficulty: 0,
            timeSpent: 0
          };
          updatedDay.dayCompleted = false;
          return updatedDay;
        }
        return d;
      }));
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (timerActive && !timerPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      if (isBreakTime) {
        setIsBreakTime(false);
        setTimeLeft(25 * 60);
        if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Break Over! 📚', { body: 'Time to get back to studying!' });
        }
      } else {
        setPomodoroCount(count => count + 1);
        setIsBreakTime(true);
        setTimeLeft(5 * 60);
        if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Great Work! ☕', { body: 'Time for a 5-minute break!' });
        }
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerPaused, timeLeft, isBreakTime, notificationsEnabled]);

  // Notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
      }
    }
  };

  // Career-focused motivational messages
  const getMotivationalMessage = () => {
    const readiness = careerReadiness.readinessScore;
    const matchedJobs = careerReadiness.matchedJobs;

    if (readiness < 20) return `🚀 Just getting started! You're building valuable data skills for ${matchedJobs.toLocaleString()} potential jobs`;
    if (readiness < 40) return `💪 Great progress! You're now qualified for ${matchedJobs.toLocaleString()} data analyst roles`;
    if (readiness < 60) return `🔥 You're building serious expertise! ${matchedJobs.toLocaleString()} jobs match your growing skillset`;
    if (readiness < 80) return `⭐ Excellent! You're becoming highly competitive for ${matchedJobs.toLocaleString()} positions`;
    return `🏆 Outstanding! You're ready for ${matchedJobs.toLocaleString()} roles with ${careerReadiness.potentialSalaryIncrease.toLocaleString()} earning potential!`;
  };

  // Get week status
  const getWeekStatus = () => {
    if (stats.weekProgress === 100) return "Complete";
    if (stats.weekProgress >= 80) return "Nearly Done";
    if (stats.weekProgress >= 50) return "Good Progress";
    if (stats.weekProgress >= 25) return "Getting Started";
    return "Just Started";
  };

  // AI Recommendations
  const generateAIRecommendations = () => {
    const recommendations = [];

    if (stats.weekProgress < 50 && settings.currentWeek > 2) {
      recommendations.push({
        type: 'study',
        priority: 'high',
        title: 'Boost Study Consistency',
        description: `You're at ${stats.weekProgress}% completion this week. Consider breaking sessions into smaller chunks and using the Pomodoro timer more frequently.`,
        action: 'Use 25-min focused sessions',
        impact: 'Improve retention by 40%'
      });
    }

    if (careerReadiness.readinessScore < 30) {
      recommendations.push({
        type: 'skill',
        priority: 'high',
        title: 'Focus on High-Impact Skills',
        description: `Your job readiness is at ${careerReadiness.readinessScore}%. Prioritize SQL and Excel mastery for immediate market impact.`,
        action: 'Complete SQL fundamentals',
        impact: '+15% job readiness'
      });
    }

    return recommendations;
  };

  // Career Dashboard Component
  const CareerDashboard = () => {
    const aiRecommendations = generateAIRecommendations();

    return (
      <div className="space-y-4 md:space-y-6">
        {/* AI Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2 md:mr-3">🤖</span>
            AI Career Recommendations
          </h2>

          <div className="space-y-3 md:space-y-4">
            {aiRecommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className={`border-l-4 p-3 md:p-4 rounded-lg ${
                rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 flex items-center text-sm md:text-base">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        rec.priority === 'high' ? 'bg-red-500' :
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      {rec.title}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{rec.description}</p>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1 md:space-y-0 mt-2">
                      <span className="text-xs md:text-sm font-medium text-blue-600">📋 {rec.action}</span>
                      <span className="text-xs md:text-sm text-green-600">📈 {rec.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Projects */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 md:mr-3">🎯</span>
            Portfolio Projects
          </h3>

          <div className="space-y-3 md:space-y-4">
            {portfolioProjects.map((project) => (
              <div key={project.id} className={`border rounded-lg p-3 md:p-4 ${
                project.status === 'completed' ? 'bg-green-50 border-green-200' :
                project.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                settings.currentWeek >= project.weekUnlocked ? 'bg-gray-50 border-gray-200' :
                'bg-gray-100 border-gray-300 opacity-50'
              }`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm md:text-base">{project.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header - Mobile Responsive */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-2 md:p-3 bg-blue-600 rounded-lg self-start">
                <span className="text-white text-lg md:text-2xl">📊</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 truncate">Study Calendar Pro</h1>
                <p className="text-sm md:text-base text-gray-600 truncate">{settings.studyGoal}</p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1">
                  <span className="text-xs md:text-sm text-blue-600 font-medium">
                    Week {stats.currentWeek} of {stats.totalWeeks}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">•</span>
                  <span className="text-xs md:text-sm text-green-600 font-medium">
                    {getWeekStatus()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-2 text-xs md:text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-orange-600">🎯</span>
                    <span className="text-gray-700">Job Readiness:</span>
                    <span className="font-semibold text-orange-600">{careerReadiness.readinessScore}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-600">💼</span>
                    <span className="text-gray-700">Market Match:</span>
                    <span className="font-semibold text-purple-600">{careerReadiness.matchedJobs.toLocaleString()} jobs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-green-600">💰</span>
                    <span className="text-gray-700">Potential:</span>
                    <span className="font-semibold text-green-600">+${careerReadiness.potentialSalaryIncrease.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg md:text-2xl font-bold text-orange-600">
                  <span>🔥</span>
                  <span>{stats.currentStreak}</span>
                </div>
                <div className="text-xs text-gray-600">Week Streak</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg md:text-2xl font-bold text-green-600">
                  <span>🎯</span>
                  <span>{careerReadiness.readinessScore}%</span>
                </div>
                <div className="text-xs text-gray-600">Career Ready</div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    if (notificationsEnabled) {
                      setNotificationsEnabled(false);
                    } else {
                      requestNotificationPermission();
                    }
                  }}
                  className={`flex items-center justify-center space-x-1 px-2 py-1 rounded-lg transition-colors text-xs md:text-sm font-medium ${
                    notificationsEnabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{notificationsEnabled ? '🔔' : '🔕'}</span>
                  <span className="hidden sm:inline">
                    {notificationsEnabled ? 'On' : 'Off'}
                  </span>
                </button>
              </div>

              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-blue-600">{stats.weekProgress}%</div>
                <div className="text-xs text-gray-600">Week Progress</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-4 md:mt-6 border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-4 md:space-x-8 min-w-max">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 Study Schedule
              </button>
              <button
                onClick={() => setActiveTab('career')}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'career'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                💼 Career Dashboard
              </button>
            </nav>
          </div>

          {/* Course Progress Bar */}
          <div className="mt-4 md:mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-xs md:text-sm text-gray-600">{stats.overallProgress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 md:h-3 rounded-full transition-all duration-300"
                style={{ width: `${stats.overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <button
                onClick={goToPreviousWeek}
                disabled={settings.currentWeek === 0}
                className="px-3 py-1 text-xs md:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous Week
              </button>

              <button
                onClick={() => setShowWeekSelector(!showWeekSelector)}
                className="px-3 py-1 text-xs md:text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                Jump to Week...
              </button>

              <button
                onClick={goToNextWeek}
                disabled={stats.weekProgress < 80}
                className="px-3 py-1 text-xs md:text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Week →
              </button>
            </div>

            <p className="text-sm md:text-lg text-gray-700 italic text-center md:text-right">
              {getMotivationalMessage()}
            </p>
          </div>

          {/* Week Selector */}
          {showWeekSelector && (
            <div className="mt-4 p-3 md:p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base md:text-lg font-semibold mb-3">Jump to Week</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {Array.from({ length: stats.totalWeeks }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToWeek(i)}
                    className={`p-2 text-xs md:text-sm rounded ${
                      i === settings.currentWeek
                        ? 'bg-blue-600 text-white'
                        : settings.completedWeeks.includes(i)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Week {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'schedule' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 md:space-y-6">
              {/* Focus Timer */}
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">⏰</span>
                  Focus Timer
                </h2>

                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                    {formatTime(timeLeft)}
                  </div>

                  <div className="text-base md:text-lg text-gray-600 mb-4">
                    {isBreakTime ? '☕ Break Time' : '📚 Study Time'}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-4">
                    {!timerActive ? (
                      <button
                        onClick={startTimer}
                        className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                      >
                        <span>▶️</span>
                        <span>Start Focus</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={pauseTimer}
                          className="flex items-center justify-center space-x-2 bg-yellow-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-yellow-600 transition-colors text-sm md:text-base"
                        >
                          <span>{timerPaused ? '▶️' : '⏸️'}</span>
                          <span>{timerPaused ? 'Resume' : 'Pause'}</span>
                        </button>
                        <button
                          onClick={stopTimer}
                          className="flex items-center justify-center space-x-2 bg-red-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
                        >
                          <span>⏹️</span>
                          <span>Stop</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">
                      🍅 Today's Focus Sessions: {pomodoroCount}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      ⏱️ Weekly Study Time: {stats.totalStudyTime} min
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  This Week
                </h3>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Sessions Complete</span>
                    <span className="font-semibold text-blue-600 text-sm md:text-base">{stats.completedSessions}/{stats.totalSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Days Complete</span>
                    <span className="font-semibold text-green-600 text-sm md:text-base">{stats.completedDays}/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Study Time</span>
                    <span className="font-semibold text-purple-600 text-sm md:text-base">{stats.totalStudyTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Progress</span>
                    <span className="font-semibold text-orange-600 text-sm md:text-base">{stats.weekProgress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Schedule */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                    <div>
                      <h2 className="text-lg md:text-2xl font-semibold flex items-center">
                        <span className="mr-2 md:mr-3">📋</span>
                        Week {stats.currentWeek} Schedule
                      </h2>
                      <p className="text-blue-100 mt-1 text-sm md:text-base">
                        {studySchedule[0]?.module} • {getWeekStatus()}
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-2xl md:text-3xl font-bold">{stats.weekProgress}%</div>
                      <div className="text-blue-100 text-xs md:text-sm">Complete</div>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {studySchedule.map((day) => (
                    <div key={day.id} className={`p-4 md:p-6 transition-all ${
                      day.dayCompleted ? 'bg-green-50' : 'hover:bg-gray-50'
                    }`}>
                      {/* Day Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                            {day.dayCompleted ?
                              <span className="text-green-600 text-lg md:text-2xl">✅</span> :
                              <span className="text-gray-400 text-lg md:text-2xl">📅</span>
                            }
                          </div>
                          <div>
                            <h3 className="text-base md:text-xl font-semibold text-gray-800">
                              {day.date} ({day.day})
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-block w-2 h-2 md:w-3 md:h-3 rounded-full ${day.moduleColor}`}></span>
                              <p className="text-xs md:text-sm text-blue-600 font-medium">{day.module}</p>
                            </div>
                          </div>
                        </div>
                        {day.dayCompleted && <span className="text-2xl md:text-3xl">🏆</span>}
                      </div>

                      {/* Sessions */}
                      {day.module === 'Rest Day' ? (
                        <div className="text-center py-6 md:py-8 text-gray-500 italic">
                          <span className="text-3xl md:text-4xl mb-2 block">🌟</span>
                          Well-deserved rest day!
                        </div>
                      ) : (
                        <div className="space-y-3 md:space-y-4">
                          {/* Morning Session */}
                          {day.morningSession && (
                            <div className={`border rounded-lg transition-all ${
                              day.morningSession.completed
                                ? 'bg-green-50 border-green-200'
                                : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                            }`}>
                              <div className="p-3 md:p-4">
                                <div className="flex items-center space-x-3 md:space-x-4">
                                  <button
                                    onClick={() => toggleSession(day.id, 'morning')}
                                    className="transition-colors flex-shrink-0"
                                  >
                                    {day.morningSession.completed ?
                                      <span className="text-green-600 text-lg md:text-xl">✅</span> :
                                      <span className="text-gray-400 text-lg md:text-xl hover:text-green-600">⬜</span>
                                    }
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-orange-600 text-base md:text-lg">🌅</span>
                                      <span className="font-semibold text-orange-800 text-sm md:text-base">{day.morningSession.time}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mt-1 text-sm md:text-base">
                                      {day.morningSession.activity}
                                    </div>
                                  </div>
                                  {!day.morningSession.completed && (
                                    <button
                                      onClick={() => startTimer()}
                                      className="text-orange-600 hover:text-orange-800 transition-colors flex-shrink-0"
                                      title="Start focus timer"
                                    >
                                      <span className="text-xl md:text-2xl">⏰</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Evening Session */}
                          {day.eveningSession && (
                            <div className={`border rounded-lg transition-all ${
                              day.eveningSession.completed
                                ? 'bg-green-50 border-green-200'
                                : 'bg-purple-50 border-purple-200 hover:border-purple-300'
                            }`}>
                              <div className="p-3 md:p-4">
                                <div className="flex items-center space-x-3 md:space-x-4">
                                  <button
                                    onClick={() => toggleSession(day.id, 'evening')}
                                    className="transition-colors flex-shrink-0"
                                  >
                                    {day.eveningSession.completed ?
                                      <span className="text-green-600 text-lg md:text-xl">✅</span> :
                                      <span className="text-gray-400 text-lg md:text-xl hover:text-green-600">⬜</span>
                                    }
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-purple-600 text-base md:text-lg">🌙</span>
                                      <span className="font-semibold text-purple-800 text-sm md:text-base">{day.eveningSession.time}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mt-1 text-sm md:text-base">
                                      {day.eveningSession.activity}
                                    </div>
                                  </div>
                                  {!day.eveningSession.completed && (
                                    <button
                                      onClick={() => startTimer()}
                                      className="text-purple-600 hover:text-purple-800 transition-colors flex-shrink-0"
                                      title="Start focus timer"
                                    >
                                      <span className="text-xl md:text-2xl">⏰</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Week Completion Actions */}
                {stats.weekProgress >= 80 && (
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold">🎉 Week {stats.currentWeek} Nearly Complete!</h3>
                        <p className="text-green-100 text-sm md:text-base">Ready to advance to next week?</p>
                      </div>
                      <button
                        onClick={goToNextWeek}
                        className="bg-white text-green-600 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-sm md:text-base self-start md:self-auto"
                      >
                        Continue to Week {stats.currentWeek + 1} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CareerDashboard />
        )}

        {/* Session Notes Modal */}
        {showNotesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg md:text-2xl font-semibold mb-2 flex items-center">
                <span className="mr-2 md:mr-3">🎯</span>
                Session Complete!
              </h3>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">💼 Career Impact</h4>
                <div className="space-y-1 text-xs md:text-sm">
                  <div className="text-green-700">✅ +3% job readiness improvement</div>
                  <div className="text-blue-700">📈 Progress toward {careerReadiness.nextPrioritySkill?.name || 'next skill'}</div>
                  <div className="text-purple-700">💰 Building ${careerReadiness.nextPrioritySkill?.salaryImpact.toLocaleString() || '10,000'}+ earning potential</div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Study Technique Used
                  </label>
                  <select
                    value={selectedTechnique}
                    onChange={(e) => setSelectedTechnique(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select technique...</option>
                    {Object.entries(studyTechniques).map(([key, technique]) => (
                      <option key={key} value={key}>
                        {technique.icon} {technique.name} - {technique.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulty Level (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSessionDifficulty(star)}
                        className="transition-colors text-2xl md:text-3xl"
                      >
                        {star <= sessionDifficulty ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    1 = Very Easy, 3 = Just Right, 5 = Very Challenging
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Session Notes & Career Reflections
                  </label>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="What did you learn? How will this help in your data analyst career? Key insights? Portfolio project ideas?"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSessionNotes}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors font-semibold"
                >
                  Complete & Advance Career ✅
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyCalendarApp;