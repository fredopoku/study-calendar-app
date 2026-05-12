import { useApp } from '../../context/AppContext';
import { studyTechniques } from '../../data/courseData';

export default function SessionModal() {
  const { showSessionModal, setShowSessionModal, selectedSession, sessionNotes, setSessionNotes, sessionDifficulty, setSessionDifficulty, selectedTechnique, setSelectedTechnique, saveSession, careerReadiness } = useApp();

  if (!showSessionModal || !selectedSession) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setShowSessionModal(false)}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Session Complete!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedSession.sessionType === 'morning' ? '🌅 Morning' : '🌙 Evening'} — {selectedSession.session.time}
              </p>
            </div>
            <button onClick={() => setShowSessionModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Career impact strip */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 border border-emerald-100 dark:border-emerald-800">
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5">Career Impact</p>
            <div className="space-y-0.5 text-xs">
              <p className="text-emerald-700 dark:text-emerald-400">✓ +3% job readiness improvement</p>
              <p className="text-brand-700 dark:text-brand-400">↑ Building toward: {careerReadiness.nextPrioritySkill?.name || 'next skill'}</p>
              <p className="text-violet-700 dark:text-violet-400">$ +${(careerReadiness.nextPrioritySkill?.salaryImpact || 10000).toLocaleString()} earning potential</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Technique */}
          <div>
            <label className="label">Study Technique Used</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(studyTechniques).map(([key, tech]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTechnique(key)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    selectedTechnique === key
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-base block mb-0.5">{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="label">How difficult was this session?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setSessionDifficulty(n)}
                  className={`flex-1 py-2.5 rounded-xl border text-lg transition-all ${
                    n <= sessionDifficulty
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-amber-300'
                  }`}
                >
                  {n <= sessionDifficulty ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              {sessionDifficulty === 0 && 'Select difficulty'}
              {sessionDifficulty === 1 && 'Very easy — review familiar material'}
              {sessionDifficulty === 2 && 'Easy — mostly comfortable'}
              {sessionDifficulty === 3 && 'Just right — ideal challenge'}
              {sessionDifficulty === 4 && 'Challenging — pushed your limits'}
              {sessionDifficulty === 5 && 'Very challenging — excellent work!'}
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="label">Session Notes & Reflections</label>
            <textarea
              value={sessionNotes}
              onChange={e => setSessionNotes(e.target.value)}
              placeholder="What did you learn? Key insights? How will this help your data analyst career? Portfolio ideas?"
              className="input resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={() => setShowSessionModal(false)} className="btn-secondary flex-1 py-2.5">Cancel</button>
          <button
            onClick={saveSession}
            className="flex-1 py-2.5 btn bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-sm"
          >
            Save & Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}
