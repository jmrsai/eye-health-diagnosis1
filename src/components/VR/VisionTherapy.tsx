import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Eye, 
  Target, 
  Gamepad2,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Brain,
  Activity
} from 'lucide-react';

interface VRSession {
  id: string;
  type: 'visual_field' | 'amblyopia' | 'convergence' | 'tracking' | 'depth_perception';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  accuracy: number;
  improvements: string[];
  date: Date;
}

interface TherapyExercise {
  id: string;
  name: string;
  description: string;
  type: 'visual_field' | 'amblyopia' | 'convergence' | 'tracking' | 'depth_perception';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string[];
  benefits: string[];
}

const therapyExercises: TherapyExercise[] = [
  {
    id: '1',
    name: 'VR Visual Field Mapping',
    description: 'Immersive visual field testing with engaging 3D environments',
    type: 'visual_field',
    duration: 15,
    difficulty: 'medium',
    instructions: [
      'Put on the VR headset and adjust for comfort',
      'Look straight ahead at the central fixation point',
      'Press the controller button when you see peripheral lights',
      'Keep your head still throughout the test'
    ],
    benefits: [
      'More engaging than traditional perimetry',
      'Better patient compliance',
      'Reduced test anxiety',
      'More accurate results'
    ]
  },
  {
    id: '2',
    name: 'Amblyopia Adventure',
    description: 'Gamified vision therapy for lazy eye treatment',
    type: 'amblyopia',
    duration: 20,
    difficulty: 'easy',
    instructions: [
      'Wear the VR headset with the stronger eye occluded',
      'Navigate through the virtual world using your weaker eye',
      'Complete tasks and collect rewards',
      'Practice daily for best results'
    ],
    benefits: [
      'Improves visual acuity in amblyopic eye',
      'Enhances binocular vision',
      'Increases treatment compliance',
      'Tracks progress automatically'
    ]
  },
  {
    id: '3',
    name: 'Convergence Training',
    description: 'Strengthen eye coordination and focusing abilities',
    type: 'convergence',
    duration: 10,
    difficulty: 'medium',
    instructions: [
      'Focus on objects moving closer and farther away',
      'Maintain single, clear vision throughout',
      'Follow the guided breathing exercises',
      'Complete all convergence challenges'
    ],
    benefits: [
      'Improves convergence insufficiency',
      'Reduces eye strain and fatigue',
      'Enhances reading comfort',
      'Better depth perception'
    ]
  },
  {
    id: '4',
    name: 'Eye Tracking Challenge',
    description: 'Improve smooth pursuit and saccadic movements',
    type: 'tracking',
    duration: 12,
    difficulty: 'hard',
    instructions: [
      'Follow moving targets with your eyes only',
      'Keep your head still during exercises',
      'Complete both smooth and rapid movements',
      'Maintain accuracy throughout'
    ],
    benefits: [
      'Enhances eye movement control',
      'Improves reading fluency',
      'Better sports performance',
      'Reduced motion sickness'
    ]
  },
  {
    id: '5',
    name: 'Depth Perception Training',
    description: 'Enhance stereoscopic vision and spatial awareness',
    type: 'depth_perception',
    duration: 18,
    difficulty: 'medium',
    instructions: [
      'Navigate through 3D obstacle courses',
      'Judge distances accurately',
      'Complete depth-based puzzles',
      'Use both eyes together effectively'
    ],
    benefits: [
      'Improves stereoscopic vision',
      'Better spatial awareness',
      'Enhanced hand-eye coordination',
      'Improved driving safety'
    ]
  }
];

export default function VisionTherapy() {
  const [selectedExercise, setSelectedExercise] = useState<TherapyExercise | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [vrConnected, setVrConnected] = useState(false);
  const [sessionData, setSessionData] = useState<VRSession[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate VR headset connection
    const checkVRConnection = () => {
      setVrConnected(Math.random() > 0.3); // 70% chance of being connected
    };
    
    checkVRConnection();
    const connectionInterval = setInterval(checkVRConnection, 5000);
    
    return () => clearInterval(connectionInterval);
  }, []);

  useEffect(() => {
    if (isSessionActive) {
      intervalRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
        // Simulate score and accuracy changes
        setCurrentScore(prev => prev + Math.floor(Math.random() * 10));
        setCurrentAccuracy(prev => Math.max(70, prev + (Math.random() - 0.5) * 5));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSessionActive]);

  const startSession = (exercise: TherapyExercise) => {
    setSelectedExercise(exercise);
    setIsSessionActive(true);
    setSessionTime(0);
    setCurrentScore(0);
    setCurrentAccuracy(100);
  };

  const pauseSession = () => {
    setIsSessionActive(false);
  };

  const endSession = () => {
    if (selectedExercise) {
      const newSession: VRSession = {
        id: Date.now().toString(),
        type: selectedExercise.type,
        duration: sessionTime,
        difficulty: selectedExercise.difficulty,
        score: currentScore,
        accuracy: currentAccuracy,
        improvements: [
          'Improved visual tracking',
          'Better eye coordination',
          'Enhanced focus duration'
        ],
        date: new Date()
      };
      
      setSessionData(prev => [...prev, newSession]);
    }
    
    setIsSessionActive(false);
    setSelectedExercise(null);
    setSessionTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'visual_field': return Target;
      case 'amblyopia': return Eye;
      case 'convergence': return Zap;
      case 'tracking': return Activity;
      case 'depth_perception': return Brain;
      default: return Gamepad2;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            VR Vision Therapy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Immersive virtual reality exercises for vision improvement and rehabilitation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            vrConnected 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            <Headphones className="h-4 w-4" />
            <span className="text-sm font-medium">
              VR {vrConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Active Session */}
      <AnimatePresence>
        {isSessionActive && selectedExercise && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-primary-500 to-medical-500 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
                <p className="text-primary-100">Session in progress</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatTime(sessionTime)}</div>
                  <div className="text-sm text-primary-100">Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentScore}</div>
                  <div className="text-sm text-primary-100">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(currentAccuracy)}%</div>
                  <div className="text-sm text-primary-100">Accuracy</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={pauseSession}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </button>
              <button
                onClick={endSession}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>End Session</span>
              </button>
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(sessionTime / (selectedExercise.duration * 60)) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercise Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Available Exercises
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapyExercises.map((exercise, index) => {
                const IconComponent = getExerciseIcon(exercise.type);
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => !isSessionActive && startSession(exercise)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {exercise.name}
                          </h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {exercise.duration}min
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {exercise.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Benefits:
                      </h5>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {exercise.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      disabled={isSessionActive || !vrConnected}
                      className="w-full mt-4 flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Exercise</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress & Stats */}
        <div className="space-y-6">
          {/* Session History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Sessions
            </h3>
            
            {sessionData.length > 0 ? (
              <div className="space-y-3">
                {sessionData.slice(-5).reverse().map((session) => {
                  const IconComponent = getExerciseIcon(session.type);
                  return (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {session.type.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(session.duration)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.score}pts
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round(session.accuracy)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No sessions completed yet
                </p>
              </div>
            )}
          </div>

          {/* Weekly Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Weekly Progress
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {sessionData.length}/7
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-medical-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((sessionData.length / 7) * 100, 100)}%` }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {sessionData.reduce((sum, session) => sum + session.duration, 0)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {sessionData.length > 0 
                      ? Math.round(sessionData.reduce((sum, session) => sum + session.accuracy, 0) / sessionData.length)
                      : 0}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Avg Accuracy</div>
                </div>
              </div>
            </div>
          </div>

          {/* VR Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              VR Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comfort Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Comfortable</option>
                  <option>Moderate</option>
                  <option>Intensive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Reminders
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Daily notifications
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Calibrate VR Headset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VR Connection Notice */}
      {!vrConnected && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <Headphones className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                VR Headset Not Connected
              </h4>
              <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <p>• Ensure your VR headset is properly connected</p>
                <p>• Check that VR software is running</p>
                <p>• Verify headset permissions in browser settings</p>
                <p>• Some exercises may be available in 2D mode</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}