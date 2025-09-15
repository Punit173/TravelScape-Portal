import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SOSProvider } from '../context/SOSContext';
import TouristTracking from '../components/TouristTracking';
import AlertSystem from '../components/AlertSystem';
import Reports from '../components/Reports';
import SOSList from '../components/SOSList';
import EFIRForm from '../components/EFIR';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('sos');
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <SOSProvider>
      <div className="min-h-screen bg-black">
        {/* Navbar */}
        <nav className="bg-black shadow-lg border-b border-yellow-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-yellow-500">TravelScape</h2>
                <div className="ml-10 flex space-x-4">
                  <button
                    onClick={() => setActiveTab('sos')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'sos'
                        ? 'bg-yellow-500 text-black'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    SOS Monitoring
                  </button>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'tracking'
                        ? 'bg-yellow-500 text-black'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    Tourist Tracking
                  </button>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'alerts'
                        ? 'bg-yellow-500 text-black'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    Alert System
                  </button>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'reports'
                        ? 'bg-yellow-500 text-black'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    Reports
                  </button>
                  <button
                    onClick={() => setActiveTab('efir')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'efir'
                        ? 'bg-yellow-500 text-black'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    E-FIR
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-yellow-500">{currentUser?.email}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Error */}
        {error && (
          <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {activeTab === 'sos' && <SOSList />}
            {activeTab === 'tracking' && <TouristTracking />}
            {activeTab === 'alerts' && <AlertSystem />}
            {activeTab === 'reports' && <Reports />}
            {activeTab === 'efir' && <EFIRForm />}
          </div>
        </main>
      </div>
    </SOSProvider>
  );
}
