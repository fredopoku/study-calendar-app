import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Toast from '../ui/Toast';
import { useApp } from '../../context/AppContext';
import OverviewPage from '../pages/OverviewPage';
import SchedulePage from '../pages/SchedulePage';
import CareerPage from '../pages/CareerPage';

export default function Layout() {
  const { activeTab } = useApp();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fade-in">
            {activeTab === 'overview' && <OverviewPage />}
            {activeTab === 'schedule' && <SchedulePage />}
            {activeTab === 'career' && <CareerPage />}
          </div>
        </main>
      </div>

      <Toast />
    </div>
  );
}
