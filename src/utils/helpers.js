export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const getWeekStatus = (progress) => {
  if (progress === 100) return { label: 'Complete', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' };
  if (progress >= 80) return { label: 'Nearly Done', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' };
  if (progress >= 50) return { label: 'Good Progress', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/30' };
  if (progress >= 25) return { label: 'Getting Started', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' };
  return { label: 'Just Started', color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800' };
};

export const getMotivationalMessage = (readinessScore, matchedJobs, potentialSalary) => {
  if (readinessScore < 20) return `Building your foundation — ${matchedJobs.toLocaleString()} data roles await`;
  if (readinessScore < 40) return `Great momentum! You qualify for ${matchedJobs.toLocaleString()} data analyst roles`;
  if (readinessScore < 60) return `Building serious expertise — ${matchedJobs.toLocaleString()} jobs match your skills`;
  if (readinessScore < 80) return `You're highly competitive for ${matchedJobs.toLocaleString()} positions`;
  return `Career-ready! ${matchedJobs.toLocaleString()} roles & +$${potentialSalary.toLocaleString()} earning potential`;
};

export const formatMinutes = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const getToday = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return { border: 'border-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' };
    case 'medium': return { border: 'border-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' };
    default: return { border: 'border-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' };
  }
};

export const getApplicationStatusStyle = (status) => {
  switch (status) {
    case 'interview': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300';
    case 'offered': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300';
    case 'rejected': return 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300';
    default: return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
  }
};
