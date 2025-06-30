import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import GameCard from './components/Games/GameCard';
import GameSession from './components/Games/GameSession';
import VisionChartGenerator from './components/VisionChart/VisionChartGenerator';
import CaseStudies from './components/Education/CaseStudies';
import DiagnosticsCalculator from './components/Advanced/DiagnosticsCalculator';
import OCTAnalysis from './components/Advanced/OCTAnalysis';
import TeleMedicine from './components/Advanced/TeleMedicine';
import { useHealthStore } from './store/healthStore';
import { motion } from 'framer-motion';

// Games Page Component
function GamesPage() {
  const { availableGames, addGameSession } = useHealthStore();
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);

  const handlePlayGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleGameComplete = (score: number, metrics: Record<string, number>) => {
    const session = {
      id: Date.now().toString(),
      gameId: selectedGame!,
      patientId: '1', // Mock patient ID
      startTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      endTime: new Date(),
      score,
      metrics,
      improvements: ['Improved blink rate', 'Better eye coordination'],
    };
    
    addGameSession(session);
    setSelectedGame(null);
  };

  const selectedGameData = availableGames.find(game => game.id === selectedGame);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Vision Training Games
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Improve your eye health through interactive exercises
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GameCard
              game={game}
              onPlay={handlePlayGame}
              bestScore={Math.floor(Math.random() * 100)}
              timesPlayed={Math.floor(Math.random() * 20)}
            />
          </motion.div>
        ))}
      </div>

      {selectedGame && selectedGameData && (
        <GameSession
          game={selectedGameData}
          onClose={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
        />
      )}
    </div>
  );
}

// Placeholder components for other routes
function HealthPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Metrics</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">Health metrics and monitoring tools coming soon...</p>
      </div>
    </div>
  );
}

function AppointmentsPage() {
  return <TeleMedicine />;
}

function RecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">Medical records and history coming soon...</p>
      </div>
    </div>
  );
}

function AIAnalysisPage() {
  return <OCTAnalysis />;
}

function PatientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">Patient management coming soon...</p>
      </div>
    </div>
  );
}

function DiagnosticsPage() {
  return <DiagnosticsCalculator />;
}

function AdvancedPage() {
  return <VisionChartGenerator />;
}

function SecurityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">Security and privacy settings coming soon...</p>
      </div>
    </div>
  );
}

function EducationPage() {
  return <CaseStudies />;
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Login Route Component
function LoginRoute() {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Router>
      <LoginForm />
    </Router>
  );
}

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="dashboard" 
            element={user?.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />} 
          />
          
          {/* Patient Routes */}
          {user?.role === 'patient' && (
            <>
              <Route path="health" element={<HealthPage />} />
              <Route path="games" element={<GamesPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="records" element={<RecordsPage />} />
              <Route path="ai-analysis" element={<AIAnalysisPage />} />
            </>
          )}
          
          {/* Doctor Routes */}
          {user?.role === 'doctor' && (
            <>
              <Route path="patients" element={<PatientsPage />} />
              <Route path="diagnostics" element={<DiagnosticsPage />} />
              <Route path="ai-tools" element={<AIAnalysisPage />} />
              <Route path="test-results" element={<RecordsPage />} />
              <Route path="telemedicine" element={<AppointmentsPage />} />
              <Route path="research" element={<RecordsPage />} />
              <Route path="analytics" element={<HealthPage />} />
            </>
          )}
          
          {/* Common Routes */}
          <Route path="advanced" element={<AdvancedPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="education" element={<EducationPage />} />
        </Route>
        
        {/* Catch all route - redirect to login if not authenticated, dashboard if authenticated */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;