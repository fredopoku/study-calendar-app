import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../ui/CircularProgress';
import ProgressBar from '../ui/ProgressBar';
import { getPriorityColor, getApplicationStatusStyle } from '../../utils/helpers';

// ── Skills Matrix ─────────────────────────────────────────────────────────────
function SkillsMatrix() {
  const { careerReadiness } = useApp();
  const { skillsMap, marketData } = careerReadiness;

  const levelPct = { 'Advanced': 100, 'Intermediate': 65, 'Beginner': 30, 'None': 0 };
  const levelColor = {
    'Advanced': 'bg-emerald-500',
    'Intermediate': 'bg-brand-500',
    'Beginner': 'bg-amber-500',
    'None': 'bg-slate-200 dark:bg-slate-700',
  };

  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">Skills Progress</h3>
      <div className="space-y-3">
        {marketData.topSkills.map(skill => {
          const level = skillsMap[skill.name] || 'None';
          const pct = levelPct[level];
          return (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    level === 'None' ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400' :
                    level === 'Beginner' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' :
                    level === 'Intermediate' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400' :
                    'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    {level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Demand: {skill.demand}%</span>
                  <span className="text-emerald-600 dark:text-emerald-400">+${(skill.salaryImpact / 1000).toFixed(0)}k</span>
                </div>
              </div>
              <ProgressBar value={pct} color={levelColor[level]} height="h-1.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── AI Recommendations ────────────────────────────────────────────────────────
function AIRecommendations() {
  const { aiRecommendations } = useApp();

  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">AI Career Recommendations</h3>
      <div className="space-y-3">
        {aiRecommendations.map((rec, i) => {
          const c = getPriorityColor(rec.priority);
          return (
            <div key={i} className={`border-l-4 ${c.border} ${c.bg} rounded-r-xl p-4`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                  {rec.title}
                </h4>
                <span className={`badge text-[10px] flex-shrink-0 ${c.badge}`}>{rec.priority.toUpperCase()}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{rec.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <span className="text-brand-600 dark:text-brand-400 font-medium">→ {rec.action}</span>
                <span className="text-emerald-600 dark:text-emerald-400">↑ {rec.impact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Portfolio Projects ────────────────────────────────────────────────────────
function PortfolioProjects() {
  const { portfolioProjects, setPortfolioProjects, settings } = useApp();

  const updateStatus = (id, status) =>
    setPortfolioProjects(prev => prev.map(p => p.id === id ? { ...p, status, completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : p.completedDate } : p));

  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">Portfolio Projects</h3>
      <div className="space-y-4">
        {portfolioProjects.map(project => {
          const unlocked = settings.currentWeek >= project.weekUnlocked;
          return (
            <div key={project.id} className={`border rounded-xl p-4 transition-all ${
              project.status === 'completed' ? 'border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/10' :
              project.status === 'in-progress' ? 'border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/10' :
              unlocked ? 'border-slate-200 dark:border-slate-700' :
              'border-slate-200 dark:border-slate-700 opacity-50'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{project.title}</h4>
                    {project.status === 'completed' && <span className="text-base">✅</span>}
                    {project.status === 'in-progress' && <span className="text-base">🚧</span>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.skills.map(s => (
                      <span key={s} className="text-[10px] bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>{'⭐'.repeat(project.difficulty)} difficulty</span>
                    <span>~{project.estimatedHours}h</span>
                    {!unlocked && <span className="text-amber-600 dark:text-amber-400">Unlocks Week {project.weekUnlocked}</span>}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {project.status === 'not-started' && unlocked && (
                    <button onClick={() => updateStatus(project.id, 'in-progress')} className="btn-primary text-xs px-3 py-1.5">Start</button>
                  )}
                  {project.status === 'in-progress' && (
                    <button onClick={() => updateStatus(project.id, 'completed')} className="text-xs px-3 py-1.5 btn bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Complete</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Job Applications ──────────────────────────────────────────────────────────
function JobApplications() {
  const { jobApplications, setJobApplications } = useApp();
  const [form, setForm] = useState({ company: '', position: 'Data Analyst', salary: '', status: 'applied' });
  const [showForm, setShowForm] = useState(false);

  const addApplication = () => {
    if (!form.company.trim() || !form.position.trim()) return;
    setJobApplications(prev => [{ ...form, id: Date.now(), appliedDate: new Date().toISOString().split('T')[0], notes: '' }, ...prev]);
    setForm({ company: '', position: 'Data Analyst', salary: '', status: 'applied' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => setJobApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Job Applications</h3>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary text-xs px-3 py-1.5">
          {showForm ? '✕ Cancel' : '+ Add'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-3 animate-slide-up">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-xs">Company</label>
              <input className="input text-xs" placeholder="Company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            </div>
            <div>
              <label className="label text-xs">Position</label>
              <input className="input text-xs" placeholder="Position title" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-xs">Salary Range</label>
              <input className="input text-xs" placeholder="e.g. 65k–75k" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} />
            </div>
            <div>
              <label className="label text-xs">Status</label>
              <select className="input text-xs" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button onClick={addApplication} className="btn-primary w-full text-xs py-2">Add Application</button>
        </div>
      )}

      {jobApplications.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Ready to start applying?</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track your job applications here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {jobApplications.map(app => (
            <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{app.position}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{app.company} {app.salary && `· ${app.salary}`}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{app.appliedDate}</p>
              </div>
              <select
                value={app.status}
                onChange={e => updateStatus(app.id, e.target.value)}
                className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${getApplicationStatusStyle(app.status)}`}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Interview Prep ────────────────────────────────────────────────────────────
function InterviewPrep() {
  const { interviewPrep, setInterviewPrep } = useApp();
  const [activeSection, setActiveSection] = useState('common');

  const toggleQ = (section, index) => {
    setInterviewPrep(prev => ({
      ...prev,
      [section]: prev[section].map((q, i) => i === index ? { ...q, practiced: !q.practiced } : q),
    }));
  };

  const sections = [
    { key: 'commonQuestions', label: 'Common', count: interviewPrep.commonQuestions.filter(q => q.practiced).length, total: interviewPrep.commonQuestions.length },
    { key: 'technicalQuestions', label: 'Technical', count: interviewPrep.technicalQuestions.filter(q => q.practiced).length, total: interviewPrep.technicalQuestions.length },
    { key: 'behavioralQuestions', label: 'Behavioral', count: interviewPrep.behavioralQuestions.filter(q => q.practiced).length, total: interviewPrep.behavioralQuestions.length },
  ];

  const activeQuestions = interviewPrep[activeSection === 'common' ? 'commonQuestions' : activeSection === 'technical' ? 'technicalQuestions' : 'behavioralQuestions'];
  const activeKey = activeSection === 'common' ? 'commonQuestions' : activeSection === 'technical' ? 'technicalQuestions' : 'behavioralQuestions';

  const totalPracticed = sections.reduce((s, sec) => s + sec.count, 0);
  const totalQuestions = sections.reduce((s, sec) => s + sec.total, 0);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="section-title">Interview Prep</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">{totalPracticed}/{totalQuestions} practiced</span>
      </div>
      <ProgressBar value={(totalPracticed / totalQuestions) * 100} color="bg-brand-500" height="h-1.5" />

      <div className="flex gap-1 mt-4 mb-4">
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.label.toLowerCase())}
            className={`flex-1 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeSection === s.label.toLowerCase()
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {s.label} ({s.count}/{s.total})
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {activeQuestions.map((q, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${q.practiced ? 'border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/15' : 'border-slate-100 dark:border-slate-700'}`}>
            <button
              onClick={() => toggleQ(activeKey, i)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${q.practiced ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}
            >
              {q.practiced && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <p className="text-xs text-slate-700 dark:text-slate-300 flex-1">{q.question}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 text-center">
        Practice 2–3 questions weekly for best results
      </p>
    </div>
  );
}

// ── Market Intelligence ───────────────────────────────────────────────────────
function MarketIntelligence() {
  const { careerReadiness } = useApp();
  const { marketData } = careerReadiness;

  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">Market Intelligence</h3>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Top Industries Hiring</p>
          <div className="space-y-2">
            {marketData.industryData.slice(0, 4).map(ind => (
              <div key={ind.name} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{ind.name}</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">${(ind.avgSalary / 1000).toFixed(0)}k avg</span>
                  </div>
                  <ProgressBar value={ind.percentage * 2.5} height="h-1" />
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 w-8 text-right">{ind.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Career Salary Path</p>
          <div className="space-y-2">
            {marketData.salaryProgression.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">{step.year === 0 ? 'Now' : `${step.year}y`}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{step.title}</p>
                </div>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 flex-shrink-0">${(step.salary / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Market Trends</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-center">
              <p className="text-xl font-bold text-brand-600 dark:text-brand-400">{marketData.marketTrends.remoteWork}%</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Remote positions</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-center">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{marketData.marketTrends.entryLevelDemand}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Entry-level demand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Professional Network ──────────────────────────────────────────────────────
function ProfessionalNetwork() {
  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">Professional Development</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Communities to Join</p>
          <div className="space-y-2">
            {['r/analytics (Reddit)', 'Data Science Central', 'Kaggle Learn', 'Local Data Meetups'].map(c => (
              <div key={c} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Action Items</p>
          <div className="space-y-2">
            {[['📱', 'Optimize LinkedIn profile'], ['🗣️', 'Attend a virtual meetup'], ['💼', 'Create GitHub portfolio'], ['✍️', 'Write a data blog post']].map(([icon, item]) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span>{icon}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Why It Matters</p>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium mb-1">60% of jobs</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400">come from networking and referrals — start building connections now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Career Page ───────────────────────────────────────────────────────────────
export default function CareerPage() {
  const { careerReadiness } = useApp();
  const { readinessScore, matchedJobs, potentialSalaryIncrease } = careerReadiness;

  return (
    <div className="space-y-5">
      {/* Hero score card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <CircularProgress value={readinessScore} size={140} strokeWidth={12} color="#4f46e5" trackColor="rgb(226 232 240)">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{readinessScore}%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Career<br/>Ready</div>
            </div>
          </CircularProgress>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Career Readiness Dashboard</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {readinessScore < 30 ? 'Keep building your foundation — great jobs await!' :
               readinessScore < 60 ? 'Great progress! Focus on high-demand skills.' :
               readinessScore < 80 ? "You're competitive — start applying soon!" :
               "Outstanding! You're ready for the job market."}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                <p className="text-lg font-bold text-brand-600 dark:text-brand-400">{readinessScore}%</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Readiness Score</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{matchedJobs.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Jobs Matched</p>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">+${(potentialSalaryIncrease / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Salary Lift</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recs + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AIRecommendations />
        <SkillsMatrix />
      </div>

      {/* Portfolio + Market */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PortfolioProjects />
        <MarketIntelligence />
      </div>

      {/* Jobs + Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <JobApplications />
        <InterviewPrep />
      </div>

      {/* Network */}
      <ProfessionalNetwork />
    </div>
  );
}
