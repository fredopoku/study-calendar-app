import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const FREE_FEATURES = [
  'Access to all 8 learning tracks',
  'AI-generated weekly study schedule',
  'Pomodoro focus timer',
  'Progress tracking & career readiness',
  '3 AI tutor messages per day',
  'Basic analytics & streaks',
  'Session notes & technique tracking',
];

const PRO_FEATURES = [
  'Everything in Free, plus:',
  'Unlimited AI tutor conversations',
  'Advanced analytics & learning insights',
  'Priority learning recommendations',
  'Interview prep with AI feedback',
  'Portfolio project guidance',
  'Export reports & certificates',
  'Early access to new features',
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingPage() {
  const { isPro, upgradeToPro, downgradeToFree } = useApp();
  const [billing, setBilling] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const monthlyPrice = 9.99;
  const annualPrice = 7.99;
  const price = billing === 'annual' ? annualPrice : monthlyPrice;
  const annualTotal = (annualPrice * 12).toFixed(2);

  const handleUpgrade = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    setDone(true);
    setTimeout(() => {
      upgradeToPro();
      setShowPaymentModal(false);
      setDone(false);
    }, 1000);
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
          <span>💎</span> Simple, transparent pricing
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Invest in your future
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Free gets you started. Pro gets you hired. No hidden fees, cancel anytime.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex gap-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              billing === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'annual'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Annual
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free */}
        <div className="card p-6 relative">
          {!isPro && (
            <span className="absolute top-4 right-4 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full">
              Current plan
            </span>
          )}
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Free</p>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-400 text-sm mb-1.5">/ forever</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Everything you need to get started
            </p>
          </div>
          <div className="space-y-2.5 mb-6">
            {FREE_FEATURES.map(f => (
              <div key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <CheckIcon />
                <span>{f}</span>
              </div>
            ))}
            <div className="flex items-start gap-2.5 text-sm text-slate-400 dark:text-slate-500">
              <XIcon />
              <span>Unlimited AI conversations</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-400 dark:text-slate-500">
              <XIcon />
              <span>Advanced analytics</span>
            </div>
          </div>
          {isPro ? (
            <button
              onClick={downgradeToFree}
              className="w-full py-2.5 btn-secondary text-sm"
            >
              Downgrade to Free
            </button>
          ) : (
            <div className="w-full py-2.5 text-center text-sm font-medium text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl">
              ✓ Your current plan
            </div>
          )}
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-violet-700" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative p-6">
            {isPro && (
              <span className="absolute top-4 right-4 text-xs font-bold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full">
                Active ✓
              </span>
            )}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-200 mb-1">Pro</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="text-brand-200 text-sm mb-1.5">
                  / {billing === 'annual' ? 'month' : 'month'}
                </span>
              </div>
              {billing === 'annual' && (
                <p className="text-brand-200 text-xs mt-1">Billed annually — ${annualTotal}/year</p>
              )}
              {billing === 'monthly' && (
                <p className="text-brand-200 text-xs mt-1">or ${annualPrice}/mo billed annually</p>
              )}
            </div>
            <div className="space-y-2.5 mb-6">
              {PRO_FEATURES.map((f, i) => (
                <div key={f} className={`flex items-start gap-2.5 text-sm ${i === 0 ? 'text-brand-200 font-medium' : 'text-white'}`}>
                  {i === 0 ? <span className="w-4 h-4 flex-shrink-0" /> : (
                    <svg className="w-4 h-4 text-brand-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <span>{f}</span>
                </div>
              ))}
            </div>
            {!isPro ? (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
              >
                Upgrade to Pro →
              </button>
            ) : (
              <div className="w-full py-3 text-center text-sm font-semibold text-white bg-white/20 rounded-xl">
                ✓ Pro Active
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stat: '40,000+', label: 'Active learners', icon: '👥' },
            { stat: '4.8★', label: 'Average rating', icon: '⭐' },
            { stat: '78%', label: 'Land jobs within 6 months', icon: '💼' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.stat}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'Sarah K.', role: 'Data Analyst at Google', text: 'LearnForge helped me go from zero SQL to landing a Google job in 5 months. The AI tutor answered every question I was too embarrassed to ask in forums.', avatar: 'SK' },
          { name: 'Marcus T.', role: 'Junior Developer at Stripe', text: "The structured schedule + Pomodoro timer combo is unreal. I tried 4 other platforms and this is the only one I actually stuck with for more than 2 weeks.", avatar: 'MT' },
        ].map(t => (
          <div key={t.name} className="card p-5">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-sm font-bold text-brand-700 dark:text-brand-300">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto card p-6">
        <h3 className="section-title mb-4">Frequently asked questions</h3>
        <div className="space-y-4">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from your settings. You keep access until the end of your billing period.' },
            { q: 'What happens to my progress if I downgrade?', a: 'Your progress, schedule, and history are always saved. Free tier restrictions only apply to AI messages.' },
            { q: 'Is there a student discount?', a: 'We offer 50% off for verified students. Use your .edu email when signing up or contact support.' },
            { q: 'What AI powers the tutor?', a: "LearnForge AI is built on advanced language models tuned specifically for education and career development." },
          ].map(faq => (
            <div key={faq.q} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">{faq.q}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && !processing && setShowPaymentModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-modal w-full max-w-md animate-scale-in">
            {done ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Welcome to Pro!</h3>
                <p className="text-slate-500 dark:text-slate-400">All features are now unlocked.</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upgrade to Pro</h3>
                    <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                      LearnForge Pro — {billing === 'annual' ? 'Annual' : 'Monthly'}
                    </span>
                    <span className="text-sm font-bold text-brand-700 dark:text-brand-300">
                      ${price}/mo
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="label">Card number</label>
                    <input
                      className="input"
                      placeholder="1234 5678 9012 3456"
                      value={cardNum}
                      onChange={e => setCardNum(formatCard(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Expiry</label>
                      <input
                        className="input"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="label">CVV</label>
                      <input
                        className="input"
                        placeholder="123"
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secured with 256-bit SSL encryption • Powered by Stripe
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={handleUpgrade}
                    disabled={processing || cardNum.length < 19 || expiry.length < 5 || cvv.length < 3}
                    className="w-full py-3 btn bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 text-white font-semibold rounded-xl disabled:opacity-50"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : `Pay $${billing === 'annual' ? annualTotal : price} ${billing === 'annual' ? '/year' : '/month'} →`}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">Cancel anytime. No hidden fees.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
