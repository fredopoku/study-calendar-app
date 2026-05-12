export const courseModules = [
  { id: 1, name: 'Foundations: Data Everywhere', weeks: 2, color: 'bg-blue-500', hex: '#3b82f6', textColor: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 2, name: 'Ask Questions to Make Data-Driven Decisions', weeks: 2, color: 'bg-violet-500', hex: '#8b5cf6', textColor: 'text-violet-600', lightBg: 'bg-violet-50', border: 'border-violet-200' },
  { id: 3, name: 'Prepare Data for Exploration', weeks: 2, color: 'bg-emerald-500', hex: '#10b981', textColor: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 4, name: 'Process Data from Dirty to Clean', weeks: 2, color: 'bg-orange-500', hex: '#f97316', textColor: 'text-orange-600', lightBg: 'bg-orange-50', border: 'border-orange-200' },
  { id: 5, name: 'Analyze Data to Answer Questions', weeks: 2, color: 'bg-rose-500', hex: '#f43f5e', textColor: 'text-rose-600', lightBg: 'bg-rose-50', border: 'border-rose-200' },
  { id: 6, name: 'Share Data Through Visualization', weeks: 2, color: 'bg-indigo-500', hex: '#6366f1', textColor: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'border-indigo-200' },
  { id: 7, name: 'Data Analysis with R Programming', weeks: 2, color: 'bg-pink-500', hex: '#ec4899', textColor: 'text-pink-600', lightBg: 'bg-pink-50', border: 'border-pink-200' },
  { id: 8, name: 'Google Data Analytics Capstone', weeks: 2, color: 'bg-teal-500', hex: '#14b8a6', textColor: 'text-teal-600', lightBg: 'bg-teal-50', border: 'border-teal-200' },
];

export const studyTechniques = {
  'active-learning': { name: 'Active Learning', icon: '🧠', description: 'Engage with material through practice' },
  'spaced-repetition': { name: 'Spaced Repetition', icon: '🔄', description: 'Review at increasing intervals' },
  'project-based': { name: 'Project-Based', icon: '🏗️', description: 'Learn by building real projects' },
  'peer-collaboration': { name: 'Peer Collaboration', icon: '👥', description: 'Learn through discussion and teamwork' },
  'hands-on-practice': { name: 'Hands-On Practice', icon: '⚡', description: 'Learn by doing exercises' },
  'video-learning': { name: 'Video Learning', icon: '📺', description: 'Watch instructional content' },
  'reading-comprehension': { name: 'Reading & Notes', icon: '📖', description: 'Deep reading with note-taking' },
  'assessment-prep': { name: 'Assessment Prep', icon: '📝', description: 'Focused test preparation' },
};

const moduleActivities = {
  'Foundations: Data Everywhere': {
    week1: [
      { morning: 'Course Introduction & Data Analytics Overview', evening: 'Data Types & Collection Methods' },
      { morning: 'Data Analytics Process & Tools', evening: 'Spreadsheet Basics & Functions' },
      { morning: 'SQL Fundamentals', evening: 'Data Visualization Principles' },
      { morning: 'Tableau Introduction', evening: 'R Programming Basics' },
      { morning: 'Weekly Project: Data Analysis', evening: 'Peer Review & Discussion' },
    ],
    week2: [
      { morning: 'Advanced Spreadsheet Functions', evening: 'Data Cleaning Techniques' },
      { morning: 'SQL Queries & Joins', evening: 'Database Design Principles' },
      { morning: 'Statistical Concepts', evening: 'Data Ethics & Privacy' },
      { morning: 'Career Preparation', evening: 'Portfolio Development' },
      { morning: 'Module Assessment', evening: 'Career Week Activities' },
    ],
  },
  'Ask Questions to Make Data-Driven Decisions': {
    week1: [
      { morning: 'Effective Question Formulation', evening: 'SMART Methodology' },
      { morning: 'Problem-Solving Framework', evening: 'Stakeholder Communication' },
      { morning: 'Data-Driven Decision Making', evening: 'Business Intelligence Basics' },
      { morning: 'Metrics & KPIs', evening: 'Dashboard Design' },
      { morning: 'Weekly Challenge', evening: 'Peer Collaboration' },
    ],
    week2: [
      { morning: 'Advanced Analytics Questions', evening: 'Hypothesis Testing' },
      { morning: 'Survey Design & Methods', evening: 'Interview Techniques' },
      { morning: 'Quantitative vs Qualitative', evening: 'Sample Size & Bias' },
      { morning: 'Presentation Skills', evening: 'Storytelling with Data' },
      { morning: 'Module Project', evening: 'Professional Portfolio Update' },
    ],
  },
  'Prepare Data for Exploration': {
    week1: [
      { morning: 'Data Sources & Collection', evening: 'Database Types & Structures' },
      { morning: 'Data Formats & Metadata', evening: 'Bias in Data Collection' },
      { morning: 'Data Credibility & Integrity', evening: 'Open Data & Licensing' },
      { morning: 'Spreadsheet Data Sorting', evening: 'SQL Data Retrieval' },
      { morning: 'Organizing Your Dataset', evening: 'Weekly Practice Project' },
    ],
    week2: [
      { morning: 'Data Security Best Practices', evening: 'Data Privacy Regulations' },
      { morning: 'Cleaning Vs. Organizing', evening: 'Aggregation Techniques' },
      { morning: 'Spreadsheet Formatting', evening: 'SQL Filtering & Sorting' },
      { morning: 'Creating Data Documentation', evening: 'Changelog Best Practices' },
      { morning: 'Module Assessment', evening: 'Portfolio Data Project' },
    ],
  },
  'Process Data from Dirty to Clean': {
    week1: [
      { morning: 'Introduction to Data Cleaning', evening: 'Common Data Problems' },
      { morning: 'Spreadsheet Data Cleaning', evening: 'TRIM, CLEAN & Text Functions' },
      { morning: 'SQL Data Cleaning Techniques', evening: 'Handling Null Values' },
      { morning: 'Duplicate Data Removal', evening: 'Standardizing Formats' },
      { morning: 'Verification & Reporting', evening: 'Weekly Cleaning Challenge' },
    ],
    week2: [
      { morning: 'Advanced SQL Cleaning Queries', evening: 'CASE Statements in SQL' },
      { morning: 'R for Data Cleaning', evening: 'tidyverse Introduction' },
      { morning: 'Data Merging & Combining', evening: 'Pivot Tables Deep Dive' },
      { morning: 'Cleaning Workflow Automation', evening: 'QA & Verification Steps' },
      { morning: 'Module Assessment', evening: 'Clean Dataset Portfolio Project' },
    ],
  },
  'Analyze Data to Answer Questions': {
    week1: [
      { morning: 'Organizing Data for Analysis', evening: 'Formatting & Adjusting Data' },
      { morning: 'Aggregating Data in Spreadsheets', evening: 'VLOOKUP & XLOOKUP' },
      { morning: 'SQL Aggregation Functions', evening: 'GROUP BY & HAVING' },
      { morning: 'Temporary Tables in SQL', evening: 'Subqueries & CTEs' },
      { morning: 'Analysis Practice Project', evening: 'Peer Review Session' },
    ],
    week2: [
      { morning: 'Advanced SQL Joins', evening: 'Window Functions' },
      { morning: 'Statistical Analysis Basics', evening: 'Mean, Median & Distributions' },
      { morning: 'R Data Analysis with dplyr', evening: 'Data Manipulation in R' },
      { morning: 'Results Interpretation', evening: 'Communicating Findings' },
      { morning: 'Module Assessment', evening: 'Analysis Portfolio Update' },
    ],
  },
  'Share Data Through Visualization': {
    week1: [
      { morning: 'Visualizing Data Principles', evening: 'Chart Types & When to Use Them' },
      { morning: 'Tableau Basics', evening: 'Building Your First Dashboard' },
      { morning: 'Data Storytelling Techniques', evening: 'Effective Presentations' },
      { morning: 'Advanced Tableau Features', evening: 'Calculated Fields' },
      { morning: 'Dashboard Design Project', evening: 'Peer Feedback Session' },
    ],
    week2: [
      { morning: 'R Visualization with ggplot2', evening: 'Customizing ggplot Charts' },
      { morning: 'Interactive Visualizations', evening: 'Tableau Filters & Actions' },
      { morning: 'Presentation to Stakeholders', evening: 'Slide Design Best Practices' },
      { morning: 'Accessibility in Data Viz', evening: 'Color Theory & Contrast' },
      { morning: 'Module Assessment', evening: 'Visualization Portfolio Project' },
    ],
  },
  'Data Analysis with R Programming': {
    week1: [
      { morning: 'R Programming Fundamentals', evening: 'RStudio Environment Setup' },
      { morning: 'R Packages & Libraries', evening: 'tidyverse Deep Dive' },
      { morning: 'Data Frames & Tibbles', evening: 'Importing & Exporting Data' },
      { morning: 'Data Transformation with dplyr', evening: 'Filtering & Selecting' },
      { morning: 'R Practice Project', evening: 'Weekly Code Review' },
    ],
    week2: [
      { morning: 'String Manipulation with stringr', evening: 'Dates & Times in R' },
      { morning: 'Advanced ggplot2', evening: 'Facets & Multi-Panel Plots' },
      { morning: 'R Markdown Reports', evening: 'Knitting Documents' },
      { morning: 'Biases & Sampling in R', evening: 'Reproducible Research' },
      { morning: 'Module Assessment', evening: 'R Portfolio Project' },
    ],
  },
  'Google Data Analytics Capstone': {
    week1: [
      { morning: 'Capstone Overview & Case Studies', evening: 'Choosing Your Track' },
      { morning: 'Defining Your Business Problem', evening: 'Data Collection Strategy' },
      { morning: 'Data Cleaning for Capstone', evening: 'Exploratory Data Analysis' },
      { morning: 'Analysis & Visualizations', evening: 'Building Your Dashboard' },
      { morning: 'Draft Presentation', evening: 'Peer Review & Feedback' },
    ],
    week2: [
      { morning: 'Refining Your Analysis', evening: 'Portfolio Presentation Polish' },
      { morning: 'GitHub Portfolio Setup', evening: 'README & Documentation' },
      { morning: 'LinkedIn Profile Optimization', evening: 'Job Application Strategy' },
      { morning: 'Mock Interview Practice', evening: 'Final Capstone Submission' },
      { morning: 'Certificate Completion', evening: 'Career Launch Planning' },
    ],
  },
};

export const generateModuleActivities = (moduleName, isFirstWeek, dayIndex) => {
  const activities = moduleActivities[moduleName] || moduleActivities['Foundations: Data Everywhere'];
  const weekKey = isFirstWeek ? 'week1' : 'week2';
  return activities[weekKey][dayIndex - 1] || { morning: 'Course Content Review', evening: 'Practice Exercises' };
};

export const generateResources = (activity) => {
  if (activity.includes('SQL')) return [
    { name: 'SQL Practice Platform', url: '#', type: 'coding' },
    { name: 'Database Schema Reference', url: '#', type: 'guide' },
  ];
  if (activity.includes('Project') || activity.includes('Challenge')) return [
    { name: 'Project Template', url: '#', type: 'template' },
    { name: 'Dataset for Analysis', url: '#', type: 'dataset' },
  ];
  if (activity.includes('Assessment') || activity.includes('Quiz')) return [
    { name: 'Practice Quiz', url: '#', type: 'quiz' },
    { name: 'Study Guide', url: '#', type: 'guide' },
  ];
  return [
    { name: `Video: ${activity}`, url: '#', type: 'video' },
    { name: `Reading: ${activity} Guide`, url: '#', type: 'reading' },
  ];
};

export const getJobMarketData = () => ({
  totalJobs: 2847,
  averageSalary: 68500,
  salaryGrowth: 18.5,
  topSkills: [
    { name: 'SQL', demand: 92, salaryImpact: 15000 },
    { name: 'Tableau', demand: 85, salaryImpact: 12000 },
    { name: 'Excel', demand: 78, salaryImpact: 5000 },
    { name: 'Data Visualization', demand: 89, salaryImpact: 10000 },
    { name: 'Statistics', demand: 71, salaryImpact: 8000 },
    { name: 'Python', demand: 67, salaryImpact: 18000 },
    { name: 'Power BI', demand: 56, salaryImpact: 10000 },
    { name: 'R Programming', demand: 45, salaryImpact: 15000 },
  ],
  industryData: [
    { name: 'Technology', percentage: 35, avgSalary: 75000, growth: 22 },
    { name: 'Finance', percentage: 25, avgSalary: 78000, growth: 18 },
    { name: 'Healthcare', percentage: 15, avgSalary: 70000, growth: 25 },
    { name: 'Retail / E-commerce', percentage: 12, avgSalary: 65000, growth: 20 },
    { name: 'Consulting', percentage: 8, avgSalary: 80000, growth: 15 },
    { name: 'Other', percentage: 5, avgSalary: 68000, growth: 12 },
  ],
  salaryProgression: [
    { year: 0, title: 'Junior Data Analyst', salary: 55000 },
    { year: 1, title: 'Data Analyst', salary: 68000 },
    { year: 3, title: 'Senior Data Analyst', salary: 85000 },
    { year: 5, title: 'Analytics Manager', salary: 105000 },
    { year: 7, title: 'Director of Analytics', salary: 130000 },
  ],
  marketTrends: {
    remoteWork: 75,
    contractWork: 15,
    entryLevelDemand: 'High',
    skillsGapOpportunity: 'Significant',
  },
});

export const defaultPortfolioProjects = [
  {
    id: 1,
    title: 'Customer Churn Analysis',
    description: 'Analyze customer retention patterns using SQL and Tableau to identify at-risk segments.',
    status: 'not-started',
    weekUnlocked: 4,
    skills: ['SQL', 'Tableau', 'Data Analysis'],
    estimatedHours: 15,
    actualHours: 0,
    githubUrl: '',
    liveUrl: '',
    completedDate: null,
    difficulty: 3,
  },
  {
    id: 2,
    title: 'Sales Performance Dashboard',
    description: 'Build an interactive dashboard tracking KPIs and revenue trends across regions.',
    status: 'not-started',
    weekUnlocked: 8,
    skills: ['Tableau', 'Excel', 'Data Visualization'],
    estimatedHours: 20,
    actualHours: 0,
    githubUrl: '',
    liveUrl: '',
    completedDate: null,
    difficulty: 4,
  },
  {
    id: 3,
    title: 'A/B Testing Analysis',
    description: 'Statistical analysis of marketing campaign effectiveness using hypothesis testing in R.',
    status: 'not-started',
    weekUnlocked: 12,
    skills: ['Statistics', 'R Programming', 'Hypothesis Testing'],
    estimatedHours: 25,
    actualHours: 0,
    githubUrl: '',
    liveUrl: '',
    completedDate: null,
    difficulty: 5,
  },
];

export const defaultInterviewPrep = {
  commonQuestions: [
    { question: 'Tell me about yourself', practiced: false, notes: '' },
    { question: 'Why do you want to be a data analyst?', practiced: false, notes: '' },
    { question: 'Describe your experience with SQL', practiced: false, notes: '' },
    { question: 'How do you handle missing data?', practiced: false, notes: '' },
    { question: 'Walk me through a data analysis project', practiced: false, notes: '' },
  ],
  technicalQuestions: [
    { question: "What's the difference between a LEFT and INNER JOIN?", practiced: false, notes: '' },
    { question: 'How would you identify outliers in a dataset?', practiced: false, notes: '' },
    { question: 'Explain the difference between correlation and causation', practiced: false, notes: '' },
  ],
  behavioralQuestions: [
    { question: 'Describe a time you had to analyze complex data under pressure', practiced: false, notes: '' },
    { question: 'How do you prioritize multiple projects with competing deadlines?', practiced: false, notes: '' },
  ],
};
