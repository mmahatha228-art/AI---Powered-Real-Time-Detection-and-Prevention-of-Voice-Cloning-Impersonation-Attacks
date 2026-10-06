import { AppProvider, useApp } from './context/AppContext';
import Sidebar, { MobileNav, TopBar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LiveDetection from './pages/LiveDetection';
import UploadAudio from './pages/UploadAudio';
import DetectionResult from './pages/DetectionResult';
import DetectionHistory from './pages/DetectionHistory';
import SecurityAlerts from './pages/SecurityAlerts';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'live':
      return <LiveDetection />;
    case 'upload':
      return <UploadAudio />;
    case 'result':
      return <DetectionResult />;
    case 'history':
      return <DetectionHistory />;
    case 'alerts':
      return <SecurityAlerts />;
    default:
      return <Dashboard />;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
          <div key={useApp().currentPage} className="animate-fade-in">
            <PageRouter />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
