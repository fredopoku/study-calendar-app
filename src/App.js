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

  // Career tracking and job market simulation
  const [careerData, setCareerData] = useState(() => {
    return {
      targetRole: 'Data Analyst',
      targetLocation: 'Remote/US',
      currentSalary: 45000,
      targetSalary: 68500,
      skillsAcquired: [],
      jobApplications: 0,
      interviewsScheduled: 0,
      portfolioProjects: 0
    };
  });

  // Job market data simulation (in real app, this would come from APIs)
  const getJobMarketData = () => {
    // Simulate real-time job market data
    const baseJobs = 2847;
    const variation = Math.floor(Math.random() * 200) - 100;
    const currentJobs = baseJobs + variation;

    return {
      totalJobs: currentJobs,
      averageSalary: 68500,
      salaryGrowth: 18.5, // % increase year over year
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

  // Calculate career readiness based on study progress
  const calculateCareerReadiness = () => {
    const marketData = getJobMarketData();
    const completedSessions = studySchedule.filter(day =>
      (day.morningSession?.completed || false) || (day.eveningSession?.completed || false)
    ).length;

    // Map study progress to skills acquired
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

    // Calculate job readiness score
    let readinessScore = 0;
    let matchedJobs = 0;
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

    // Normalize readiness score to percentage
    const maxPossibleScore = marketData.topSkills.reduce((sum, skill) => sum + skill.demand, 0);
    readinessScore = Math.min(Math.round((readinessScore / maxPossibleScore) * 100), 100);

    // Calculate jobs that match current skill level
    matchedJobs = Math.floor(marketData.totalJobs * (readinessScore / 100) * 0.6); // 60% of jobs at readiness level

    // Identify next priority skill
    const missingSkills = marketData.topSkills.filter(skill =>
      skillsMap[skill.name] === 'None' || skillsMap[skill.name] === 'Beginner'
    ).sort((a, b) => (b.demand * b.salaryImpact) - (a.demand * a.salaryImpact));

    return {
      readinessScore,
      matchedJobs,
      potentialSalaryIncrease: Math.round(potentialSalaryIncrease),
      currentSkills: Object.entries(skillsMap).filter(([_, level]) => level !== 'None'),
      nextPrioritySkill: missingSkills[0],
      skillsMap,
      marketData
    };
  };

  // Career readiness state
  const [careerReadiness, setCareerReadiness] = useState(() => {
    return {
      readinessScore: 15,
      matchedJobs: 342,
      potentialSalaryIncrease: 8500,
      currentSkills: [['Excel', 'Beginner']],
      nextPrioritySkill: { name: 'SQL', demand: 92, salaryImpact: 15000 },
      skillsMap: {},
      marketData: getJobMarketData()
    };
  });

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
  const [settings, setSettings] = useState(() => {
    return {
      startDate: new Date().toISOString().split('T')[0],
      currentWeek: 0,
      studyGoal: 'Google Data Analytics Certificate',
      studyHoursPerWeek: 15,
      completedWeeks: []
    };
  });

  // Generate current week schedule
  const [studySchedule, setStudySchedule] = useState(() => {
    return generateWeekSchedule(settings.currentWeek);
  });

  // App state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Session management
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionDifficulty, setSessionDifficulty] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState('');

  // Week navigation
  const [showWeekSelector, setShowWeekSelector] = useState(false);

  // Phase 2: Career Dashboard State
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' or 'career'
  const [showCareerDashboard, setShowCareerDashboard] = useState(false);

  // Portfolio Projects Management
  const [portfolioProjects, setPortfolioProjects] = useState(() => {
    return [
      {
        id: 1,
        title: 'Customer Churn Analysis',
        description: 'Analyze customer retention patterns using SQL and Tableau',
        status: 'not-started', // 'not-started', 'in-progress', 'completed'
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
    ];
  });

  // Job Applications Tracking
  const [jobApplications, setJobApplications] = useState([]);

  // Interview Preparation
  const [interviewPrep, setInterviewPrep] = useState(() => {
    return {
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
    };
  });

  // Professional Network
  const [professionalNetwork, setProfessionalNetwork] = useState(() => {
    return {
      linkedinConnections: 0,
      industryEvents: 0,
      mentorships: 0,
      dataCommunitiesMember: []
    };
  });

  // Update career readiness when study progress changes
  useEffect(() => {
    setCareerReadiness(calculateCareerReadiness());
  }, [studySchedule, settings.currentWeek]);

  // Phase 2: AI-Powered Career Recommendations
  const generateAIRecommendations = () => {
    const completedSessions = studySchedule.filter(day =>
      (day.morningSession?.completed || false) || (day.eveningSession?.completed || false)
    ).length;

    const weekProgress = stats.weekProgress;
    const currentWeek = settings.currentWeek;
    const readinessScore = careerReadiness.readinessScore;
    const completedProjects = portfolioProjects.filter(p => p.status === 'completed').length;

    const recommendations = [];

    // Study Performance Analysis
    if (weekProgress < 50 && currentWeek > 2) {
      recommendations.push({
        type: 'study',
        priority: 'high',
        title: 'Boost Study Consistency',
        description: `You're at ${weekProgress}% completion this week. Consider breaking sessions into smaller chunks and using the Pomodoro timer more frequently.`,
        action: 'Use 25-min focused sessions',
        impact: 'Improve retention by 40%'
      });
    }

    // Career Readiness Optimization
    if (readinessScore < 30) {
      recommendations.push({
        type: 'skill',
        priority: 'high',
        title: 'Focus on High-Impact Skills',
        description: `Your job readiness is at ${readinessScore}%. Prioritize SQL and Excel mastery for immediate market impact.`,
        action: 'Complete SQL fundamentals',
        impact: '+15% job readiness'
      });
    }

    // Portfolio Development
    if (currentWeek >= 4 && completedProjects === 0) {
      recommendations.push({
        type: 'portfolio',
        priority: 'medium',
        title: 'Start Portfolio Project',
        description: 'You\'re ready to begin hands-on projects. Start with Customer Churn Analysis to demonstrate SQL skills.',
        action: 'Begin first project',
        impact: '+25% interview callbacks'
      });
    }

    // Job Application Timing
    if (readinessScore >= 60 && jobApplications.length === 0) {
      recommendations.push({
        type: 'application',
        priority: 'medium',
        title: 'Begin Job Applications',
        description: `At ${readinessScore}% readiness, you're competitive for entry-level positions. Start applying to build interview experience.`,
        action: 'Apply to 5 junior roles',
        impact: 'Gain market feedback'
      });
    }

    // Networking Recommendations
    if (professionalNetwork.linkedinConnections < 50) {
      recommendations.push({
        type: 'network',
        priority: 'low',
        title: 'Expand Professional Network',
        description: 'Connect with data professionals and join analytics communities to discover opportunities.',
        action: 'Join 3 data communities',
        impact: '60% of jobs come from networking'
      });
    }

    // Interview Preparation
    const practicedQuestions = interviewPrep.commonQuestions.filter(q => q.practiced).length;
    if (readinessScore >= 40 && practicedQuestions < 3) {
      recommendations.push({
        type: 'interview',
        priority: 'medium',
        title: 'Practice Interview Questions',
        description: 'Prepare for technical and behavioral questions to increase confidence.',
        action: 'Practice 5 questions weekly',
        impact: '+30% interview success'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  // Enhanced Job Market Analysis
  const getDetailedJobMarketData = () => {
    const baseData = getJobMarketData();

    // Simulate location-based data
    const locationData = {
      'Remote/US': { multiplier: 1.0, competition: 'High', salaryBonus: 5000 },
      'San Francisco': { multiplier: 1.4, competition: 'Very High', salaryBonus: 25000 },
      'New York': { multiplier: 1.3, competition: 'Very High', salaryBonus: 20000 },
      'Austin': { multiplier: 1.1, competition: 'Medium', salaryBonus: 8000 },
      'Denver': { multiplier: 1.05, competition: 'Medium', salaryBonus: 5000 },
      'Chicago': { multiplier: 1.15, competition: 'High', salaryBonus: 12000 }
    };

    // Industry breakdown
    const industryData = [
      { name: 'Technology', percentage: 35, avgSalary: 75000, growth: 22 },
      { name: 'Finance', percentage: 25, avgSalary: 78000, growth: 18 },
      { name: 'Healthcare', percentage: 15, avgSalary: 70000, growth: 25 },
      { name: 'Retail/E-commerce', percentage: 12, avgSalary: 65000, growth: 20 },
      { name: 'Consulting', percentage: 8, avgSalary: 80000, growth: 15 },
      { name: 'Other', percentage: 5, avgSalary: 68000, growth: 12 }
    ];

    // Company size analysis
    const companySizeData = [
      { size: 'Startup (1-50)', percentage: 20, avgSalary: 68000, workLifeBalance: 3.2, learningOpportunity: 4.5 },
      { size: 'Small (51-200)', percentage: 25, avgSalary: 70000, workLifeBalance: 3.8, learningOpportunity: 4.2 },
      { size: 'Medium (201-1000)', percentage: 30, avgSalary: 72000, workLifeBalance: 3.6, learningOpportunity: 3.8 },
      { size: 'Large (1000+)', percentage: 25, avgSalary: 75000, workLifeBalance: 3.4, learningOpportunity: 3.5 }
    ];

    // Salary progression forecast
    const salaryProgression = [
      { year: 0, title: 'Junior Data Analyst', salary: 55000 },
      { year: 1, title: 'Data Analyst', salary: 68000 },
      { year: 3, title: 'Senior Data Analyst', salary: 85000 },
      { year: 5, title: 'Data Analytics Manager', salary: 105000 },
      { year: 7, title: 'Senior Manager/Director', salary: 130000 }
    ];

    return {
      ...baseData,
      locationData,
      industryData,
      companySizeData,
      salaryProgression,
      marketTrends: {
        remoteWork: 75, // % of remote positions
        contractWork: 15, // % of contract positions
        entryLevelDemand: 'High',
        skillsGapOpportunity: 'Significant'
      }
    };
  };

  // Calculate study statistics
  const calculateStats = () => {
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
    const weekProgress = Math.round((completedSessions / totalSessions) * 100);
    const overallProgress = Math.round(((settings.completedWeeks.length * 2) + completedSessions) / (courseModules.reduce((sum, m) => sum + m.weeks, 0) * 10) * 100);

    return {
      completedSessions,
      totalSessions,
      completedDays,
      totalStudyTime,
      currentStreak,
      weekProgress,
      overallProgress,
      currentWeek: settings.currentWeek + 1,
      totalWeeks: courseModules.reduce((sum, m) => sum + m.weeks, 0)
    };
  };

  const stats = calculateStats();

  // Week navigation functions
  const goToNextWeek = () => {
    if (stats.weekProgress >= 80) { // Allow advancement if 80% complete
      const newWeek = settings.currentWeek + 1;
      const newSettings = {
        ...settings,
        currentWeek: newWeek,
        completedWeeks: [...settings.completedWeeks, settings.currentWeek]
      };
      setSettings(newSettings);
      setStudySchedule(generateWeekSchedule(newWeek));
    }
  };

  const goToPreviousWeek = () => {
    if (settings.currentWeek > 0) {
      const newWeek = settings.currentWeek - 1;
      setSettings({ ...settings, currentWeek: newWeek });
      setStudySchedule(generateWeekSchedule(newWeek));
    }
  };

  const jumpToWeek = (weekNumber) => {
    setSettings({ ...settings, currentWeek: weekNumber });
    setStudySchedule(generateWeekSchedule(weekNumber));
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
          timeSpent: Math.max(pomodoroCount * 25, 30) // Minimum 30 min
        };

        // Check if day is complete
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

  // Phase 2: Career Dashboard Component
  const CareerDashboard = () => {
    const aiRecommendations = generateAIRecommendations();
    const detailedMarketData = getDetailedJobMarketData();

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
                  <span className={`px-2 py-1 text-xs font-medium rounded self-start ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {'⭐'.repeat(project.difficulty)} Difficulty
                        </span>
                        <span className="text-xs text-gray-600">
                          {project.estimatedHours}h estimated
                        </span>
                        {settings.currentWeek < project.weekUnlocked && (
                          <span className="text-xs text-orange-600">
                            Unlocks Week {project.weekUnlocked}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:ml-4 self-start">
                      {project.status === 'completed' && <span className="text-2xl">✅</span>}
                      {project.status === 'in-progress' && <span className="text-2xl">🚧</span>}
                      {project.status === 'not-started' && settings.currentWeek >= project.weekUnlocked &&
                        <button
                          onClick={() => {
                            setPortfolioProjects(prev => prev.map(p =>
                              p.id === project.id ? { ...p, status: 'in-progress' } : p
                            ));
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Start
                        </button>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Market Intelligence */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2 md:mr-3">📊</span>
              Market Intelligence
            </h3>

            <div className="space-y-4">
              {/* Industry Breakdown */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Top Industries Hiring</h4>
                <div className="space-y-2">
                  {detailedMarketData.industryData.slice(0, 4).map((industry) => (
                    <div key={industry.name} className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-gray-700">{industry.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs md:text-sm font-medium text-green-600">
                          ${industry.avgSalary.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {industry.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Progression */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Career Path & Salary</h4>
                <div className="space-y-2">
                  {detailedMarketData.salaryProgression.slice(0, 3).map((step) => (
                    <div key={step.year} className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-gray-700">
                        {step.year === 0 ? 'Entry' : `${step.year}y`} - {step.title}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-blue-600">
                        ${step.salary.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Trends */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Market Trends</h4>
                <div className="space-y-1 text-xs md:text-sm text-gray-600">
                  <div>🏠 {detailedMarketData.marketTrends.remoteWork}% remote positions</div>
                  <div>📈 {detailedMarketData.marketTrends.entryLevelDemand} entry-level demand</div>
                  <div>🎯 {detailedMarketData.marketTrends.skillsGapOpportunity} opportunity gap</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Job Applications Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
              <h3 className="text-lg md:text-xl font-semibold flex items-center">
                <span className="mr-2 md:mr-3">📝</span>
                Job Applications
              </h3>
              <button
                onClick={() => {
                  const newApp = {
                    id: Date.now(),
                    company: 'New Company',
                    position: 'Data Analyst',
                    status: 'applied',
                    appliedDate: new Date().toISOString().split('T')[0],
                    salary: '65000-75000',
                    notes: ''
                  };
                  setJobApplications(prev => [newApp, ...prev]);
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-start md:self-auto"
              >
                + Add Application
              </button>
            </div>

            {jobApplications.length === 0 ? (
              <div className="text-center py-6 md:py-8 text-gray-500">
                <span className="text-3xl md:text-4xl block mb-2">🎯</span>
                <p className="text-sm md:text-base">Ready to start applying?</p>
                <p className="text-xs md:text-sm">Track your applications here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobApplications.slice(0, 5).map((app) => (
                  <div key={app.id} className="border rounded-lg p-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">{app.position}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{app.company}</p>
                        <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded self-start ${
                        app.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'offered' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interview Preparation */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2 md:mr-3">🎤</span>
              Interview Prep
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Common Questions</h4>
                <div className="space-y-2">
                  {interviewPrep.commonQuestions.slice(0, 3).map((q, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-700 flex-1 pr-2">{q.question}</span>
                      <button
                        onClick={() => {
                          setInterviewPrep(prev => ({
                            ...prev,
                            commonQuestions: prev.commonQuestions.map((question, i) =>
                              i === index ? { ...question, practiced: !question.practiced } : question
                            )
                          }));
                        }}
                        className={`text-lg ${q.practiced ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {q.practiced ? '✅' : '⬜'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Technical Skills</h4>
                <div className="space-y-2">
                  {interviewPrep.technicalQuestions.slice(0, 2).map((q, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-700 flex-1 pr-2">{q.question}</span>
                      <button
                        onClick={() => {
                          setInterviewPrep(prev => ({
                            ...prev,
                            technicalQuestions: prev.technicalQuestions.map((question, i) =>
                              i === index ? { ...question, practiced: !question.practiced } : question
                            )
                          }));
                        }}
                        className={`text-lg ${q.practiced ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {q.practiced ? '✅' : '⬜'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="text-xs md:text-sm text-gray-600">
                  <div>📊 Progress: {Math.round((interviewPrep.commonQuestions.filter(q => q.practiced).length / interviewPrep.commonQuestions.length) * 100)}% practiced</div>
                  <div className="mt-1">🎯 Recommendation: Practice 2-3 questions weekly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Network & Resources */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 md:mr-3">🌐</span>
            Professional Development
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3 text-sm md:text-base">Networking Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">LinkedIn Connections</span>
                  <span className="text-xs md:text-sm font-medium">{professionalNetwork.linkedinConnections}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Industry Events</span>
                  <span className="text-xs md:text-sm font-medium">{professionalNetwork.industryEvents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Data Communities</span>
                  <span className="text-xs md:text-sm font-medium">{professionalNetwork.dataCommunitiesMember.length}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3 text-sm md:text-base">Recommended Communities</h4>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="text-gray-700">• r/analytics (Reddit)</div>
                <div className="text-gray-700">• Data Science Central</div>
                <div className="text-gray-700">• Kaggle Learn</div>
                <div className="text-gray-700">• Local Data Science Meetups</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3 text-sm md:text-base">Next Steps</h4>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">📱</span>
                  <span>Update LinkedIn profile</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">🗣️</span>
                  <span>Attend virtual meetup</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-2">💼</span>
                  <span>Create GitHub portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header with Career Integration - Mobile Responsive */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          {/* Header Content - Stacked on Mobile */}
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
                {/* Career Status Integration - Responsive */}
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
                    <span className="font-semibold text-green-600">+${(careerReadiness.potentialSalaryIncrease).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6">
              {/* Study Streak */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg md:text-2xl font-bold text-orange-600">
                  <span>🔥</span>
                  <span>{stats.currentStreak}</span>
                </div>
                <div className="text-xs text-gray-600">Week Streak</div>
              </div>

              {/* Career Readiness Score */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg md:text-2xl font-bold text-green-600">
                  <span>🎯</span>
                  <span>{careerReadiness.readinessScore}%</span>
                </div>
                <div className="text-xs text-gray-600">Career Ready</div>
              </div>

              {/* Notifications */}
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

              {/* Progress Stats */}
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-blue-600">{stats.weekProgress}%</div>
                <div className="text-xs text-gray-600">Week Progress</div>
              </div>
            </div>
          </div>

          {/* Phase 2: Tab Navigation - Mobile Responsive */}
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

          {/* Week Navigation - Mobile Responsive */}
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

          {/* Week Selector - Mobile Responsive */}
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
            {/* Focus Timer & Stats - Mobile Responsive */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 md:space-y-6">
              {/* Professional Focus Timer */}
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

              {/* Weekly Stats with Career Integration */}
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

                  {/* Career Progress Section */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">🎯 Career Skills</span>
                      <span className="font-semibold text-green-600 text-sm md:text-base">+{careerReadiness.currentSkills.length} gained</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">💼 Job Match</span>
                      <span className="font-semibold text-purple-600 text-sm md:text-base">{Math.round(careerReadiness.readinessScore)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Insights Panel - Mobile Responsive */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-4 md:p-6 border border-green-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">💼</span>
                  Career Insights
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {/* Job Readiness Score */}
                  <div className="bg-white rounded-lg p-3 md:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700">Job Readiness</span>
                      <span className="text-base md:text-lg font-bold text-green-600">{careerReadiness.readinessScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${careerReadiness.readinessScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Ready for {careerReadiness.matchedJobs.toLocaleString()} jobs
                    </p>
                  </div>

                  {/* Skills Acquired */}
                  <div className="bg-white rounded-lg p-3 md:p-4">
                    <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">✅ Skills You Have</h4>
                    <div className="space-y-2">
                      {careerReadiness.currentSkills.slice(0, 3).map(([skill, level]) => {
                        const skillData = careerReadiness.marketData.topSkills.find(s => s.name === skill);
                        return (
                          <div key={skill} className="flex justify-between text-xs md:text-sm">
                            <span className="text-gray-700">{skill} ({level})</span>
                            <span className="text-green-600 font-medium">
                              {skillData ? `${skillData.demand}%` : 'N/A'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Next Priority */}
                  {careerReadiness.nextPrioritySkill && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                      <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">🎯 Focus Next</h4>
                      <div className="text-xs md:text-sm">
                        <div className="font-medium text-yellow-800">
                          {careerReadiness.nextPrioritySkill.name}
                        </div>
                        <div className="text-yellow-700 text-xs mt-1">
                          {careerReadiness.nextPrioritySkill.demand}% of jobs • +${careerReadiness.nextPrioritySkill.salaryImpact.toLocaleString()} potential
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Market Stats */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                    <h4 className="text-xs md:text-sm font-medium text-gray-700 mb-2">📊 Market Data</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>💼 {careerReadiness.marketData.totalJobs.toLocaleString()} Data Analyst jobs</div>
                      <div>💰 ${careerReadiness.marketData.averageSalary.toLocaleString()} avg salary</div>
                      <div>📈 +{careerReadiness.marketData.salaryGrowth}% growth this year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Schedule - Mobile Responsive */}
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
                      {/* Day Header - Mobile Responsive */}
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

                      {/* Sessions - Mobile Responsive */}
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
                                    {day.morningSession.completed && (
                                      <div className="mt-2 text-xs md:text-sm text-gray-600">
                                        {day.morningSession.timeSpent > 0 && (
                                          <span>⏱️ {day.morningSession.timeSpent} min • </span>
                                        )}
                                        {day.morningSession.difficulty > 0 && (
                                          <span>{'⭐'.repeat(day.morningSession.difficulty)} • </span>
                                        )}
                                        {day.morningSession.notes && (
                                          <span>📝 Notes added</span>
                                        )}
                                      </div>
                                    )}
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
                                    {day.eveningSession.completed && (
                                      <div className="mt-2 text-xs md:text-sm text-gray-600">
                                        {day.eveningSession.timeSpent > 0 && (
                                          <span>⏱️ {day.eveningSession.timeSpent} min • </span>
                                        )}
                                        {day.eveningSession.difficulty > 0 && (
                                          <span>{'⭐'.repeat(day.eveningSession.difficulty)} • </span>
                                        )}
                                        {day.eveningSession.notes && (
                                          <span>📝 Notes added</span>
                                        )}
                                      </div>
                                    )}
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

                {/* Week Completion Actions - Mobile Responsive */}
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
          /* Phase 2: Career Dashboard */
          <CareerDashboard />
        )}

        {/* Professional Session Notes Modal with Career Context - Mobile Responsive */}
        {showNotesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg md:text-2xl font-semibold mb-2 flex items-center">
                <span className="mr-2 md:mr-3">🎯</span>
                Session Complete!
              </h3>

              {/* Career Impact Preview - Mobile Responsive */}
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