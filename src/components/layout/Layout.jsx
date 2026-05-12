import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Toast from '../ui/Toast';
import { useApp } from '../../context/AppContext';
import OverviewPage from '../pages/OverviewPage';
import SchedulePage from '../pages/SchedulePage';
import CareerPage from '../pages/CareerPage';
import AITutorPage from '../pages/AITutorPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import PricingPage from '../pages/PricingPage';
import OnboardingFlow from '../onboarding/OnboardingFlow';

export default function Layout() {
  const { activeTab, userProfile } = useApp();

  // Show onboarding for new users
  if (!userProfile) {
    return <OnboardingFlow />;
  }

  const isFullHeight = activeTab === 'ai-tutor';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className={`flex-1 ${isFullHeight ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}>
          {isFullHeight ? (
            <AITutorPage />
          ) : (
            <div className="p-4 lg:p-6 max-w-5xl mx-auto animate-fade-in">
              {activeTab === 'overview' && <OverviewPage />}
              {activeTab === 'schedule' && <SchedulePage />}
              {activeTab === 'career' && <CareerPage />}
              {activeTab === 'analytics' && <AnalyticsPage />}
              {activeTab === 'pricing' && <PricingPage />}
            </div>
          )}
        </main>
      </div>

      <Toast />
    </div>
  );
}
