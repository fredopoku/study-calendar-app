import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeroIllustration, TRACK_ICONS,
  IconBrain, IconBarChart, IconBriefcase,
  IconCheckCircle, IconSun, IconMoon,
  IconCheck,
} from '../ui/Icons';

const STEPS = ['Welcome', 'Choose Path', 'Your Schedule', 'Get Started'];

const HOURS_OPTIONS = [
  { value: 5, label: '5 hrs/week', sub: 'Light & steady', level: 1 },
  { value: 10, label: '10 hrs/week', sub: 'Balanced pace', level: 2, recommended: true },
  { value: 15, label: '15 hrs/week', sub: 'Fast track', level: 3 },
  { value: 20, label: '20+ hrs/week', sub: 'Intensive mode', level: 4 },
];

function HoursIcon({ level }) {
  const bars = Array.from({ length: 4 });
  return (
    <div className="flex items-end gap-0.5 h-5 w-7 mx-auto">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm transition-colors ${i < level ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-600'}`}
          style={{ height: `${(i + 1) * 25}%` }}
        />
      ))}
    </div>
  );
}

export default function OnboardingFlow() {
  const { completeOnboarding, learningTracks, darkMode } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [customGoal, setCustomGoal] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [studyTimes, setStudyTimes] = useState(['morning', 'evening']);

  const canAdvance = () => {
    if (step === 0) return name.trim().length >= 2;
    if (step === 1) return selectedTrack !== null && (selectedTrack.id !== 'custom' || customGoal.trim().length > 5);
    if (step === 2) return hoursPerWeek > 0 && studyTimes.length > 0;
    return true;
  };

  const handleFinish = () => {
    completeOnboarding({
      name: name.trim(),
      trackId: selectedTrack.id,
      trackName: selectedTrack.name,
      customGoal: selectedTrack.id === 'custom' ? customGoal.trim() : '',
      hoursPerWeek,
      studyTimes,
      createdAt: new Date().toISOString(),
    });
  };

  const toggleStudyTime = (time) => {
    setStudyTimes(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const estimatedWeeks = selectedTrack
    ? selectedTrack.id === 'custom'
      ? Math.round(60 / hoursPerWeek) + ' weeks'
      : `${Math.ceil((selectedTrack.weeks * 10) / hoursPerWeek)} weeks`
    : null;

  const features = [
    { icon: <IconBrain className="w-5 h-5 text-violet-500" />, bg: 'bg-violet-50 dark:bg-violet-900/30', label: 'AI Tutor', sub: 'Ask anything, anytime' },
    { icon: <IconBarChart className="w-5 h-5 text-brand-500" />, bg: 'bg-brand-50 dark:bg-brand-900/30', label: 'Progress Tracking', sub: 'See growth in real-time' },
    { icon: <IconBriefcase className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50 dark:bg-emerald-900/30', label: 'Career Ready', sub: 'Land your dream job' },
  ];

  const studyTimeOptions = [
    { id: 'morning', label: 'Morning', icon: <IconSun className="w-5 h-5" />, sub: '6–9 AM' },
    { id: 'afternoon', label: 'Afternoon', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ), sub: '12–3 PM' },
    { id: 'evening', label: 'Evening', icon: <IconMoon className="w-5 h-5" />, sub: '7–10 PM' },
  ];

  const planFeatures = [
    'Personalized weekly study schedule',
    'AI tutor available (3 free questions/day)',
    'Progress tracking & career readiness score',
    'Gamification: XP, streaks, achievements',
    'Upgrade to Pro anytime for unlimited AI',
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-violet-700 to-purple-800">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-1 bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 pt-5 px-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-brand-600 text-white' :
                i === step ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-900/50' :
                'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {i < step ? <IconCheck className="w-3 h-3" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full transition-all ${i < step ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="p-8">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center">
              <HeroIllustration className="w-full max-w-md mx-auto mb-5 rounded-2xl overflow-hidden" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome to <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">LearnForge</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-7 text-base">
                Your AI-powered learning companion. Build real skills, get career-ready, and break through the AI era with confidence.
              </p>
              <div className="max-w-xs mx-auto mb-7">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 text-left">
                  First, what's your name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your first name"
                  className="input text-center text-lg py-3"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && canAdvance() && setStep(1)}
                />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {features.map(f => (
                  <div key={f.label} className={`p-4 ${f.bg} rounded-2xl`}>
                    <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center mx-auto mb-2`}>
                      {f.icon}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{f.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Choose track */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                What do you want to learn, {name}?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Choose a curated path or let AI build a custom plan from your goal.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                {learningTracks.map(track => {
                  const TrackIcon = TRACK_ICONS[track.id];
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrack(track)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        selectedTrack?.id === track.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selectedTrack?.id === track.id
                            ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {TrackIcon && <TrackIcon className="w-4 h-4" />}
                        </div>
                        {track.popular && (
                          <span className="text-[9px] font-bold bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded-full">
                            {track.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{track.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{track.duration}</p>
                    </button>
                  );
                })}
              </div>
              {selectedTrack?.id === 'custom' && (
                <div className="mt-4">
                  <label className="label">What's your specific learning goal?</label>
                  <input
                    type="text"
                    value={customGoal}
                    onChange={e => setCustomGoal(e.target.value)}
                    placeholder="e.g. Become a freelance web developer in 6 months"
                    className="input"
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Schedule preferences */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                How much time can you commit?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Consistency beats intensity. Even 5 hours/week builds momentum.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {HOURS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setHoursPerWeek(opt.value)}
                    className={`relative p-4 rounded-2xl border-2 text-center transition-all ${
                      hoursPerWeek === opt.value
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.recommended && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-brand-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        Recommended
                      </span>
                    )}
                    <div className="mb-2">
                      <HoursIcon level={opt.level} />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{opt.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className="label">Preferred study times</label>
                <div className="flex gap-3">
                  {studyTimeOptions.map(t => (
                    <button
                      key={t.id}
                      onClick={() => toggleStudyTime(t.id)}
                      className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                        studyTimes.includes(t.id)
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`flex justify-center mb-1 ${studyTimes.includes(t.id) ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`}>
                        {t.icon}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{t.label}</p>
                      <p className="text-[10px] text-slate-400">{t.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center mx-auto mb-5">
                <IconCheckCircle className="w-9 h-9 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Your plan is ready, {name}!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Here's what LearnForge has built for you.
              </p>
              <div className="bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-900/20 dark:to-violet-900/20 rounded-2xl p-5 text-left mb-6 border border-brand-100 dark:border-brand-800">
                <div className="flex items-center gap-3 mb-4">
                  {selectedTrack && (() => {
                    const TrackIcon = TRACK_ICONS[selectedTrack.id];
                    return TrackIcon ? (
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                        <TrackIcon className="w-5 h-5" />
                      </div>
                    ) : null;
                  })()}
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{selectedTrack?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedTrack?.outcome}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Est. completion', value: estimatedWeeks },
                    { label: 'Weekly hours', value: `${hoursPerWeek} hrs` },
                    { label: 'Study sessions', value: `${studyTimes.length * 5}/week` },
                  ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-brand-600 dark:text-brand-400">{s.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 text-left mb-6">
                {planFeatures.map(f => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconCheck className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="btn-secondary px-5 py-2.5"
              >
                ← Back
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance()}
                className="btn bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white px-6 py-2.5 disabled:opacity-40"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="btn bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white px-8 py-2.5 text-base font-semibold"
              >
                Start Learning →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
