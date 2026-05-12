import { useApp } from '../../context/AppContext';

const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
const styles = {
  success: 'bg-emerald-600',
  error: 'bg-rose-600',
  info: 'bg-brand-600',
  warning: 'bg-amber-500',
};

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-white text-sm font-medium shadow-modal ${styles[toast.type] || styles.info}`}>
        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
          {icons[toast.type]}
        </span>
        {toast.message}
      </div>
    </div>
  );
}
