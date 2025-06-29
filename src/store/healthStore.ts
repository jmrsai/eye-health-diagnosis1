import { create } from 'zustand';
import { HealthMetrics, EyeTestResult, GameSession, BiometricGame } from '../types';

interface HealthState {
  metrics: HealthMetrics | null;
  testResults: EyeTestResult[];
  gameSessions: GameSession[];
  availableGames: BiometricGame[];
  updateMetrics: (metrics: Partial<HealthMetrics>) => void;
  addTestResult: (result: EyeTestResult) => void;
  addGameSession: (session: GameSession) => void;
  getGameById: (id: string) => BiometricGame | undefined;
}

const defaultGames: BiometricGame[] = [
  {
    id: '1',
    name: 'Blink Training Pro',
    description: 'Improve your natural blink rate and reduce dry eye symptoms',
    type: 'blink_training',
    difficulty: 'easy',
    duration: 5,
    instructions: [
      'Sit comfortably in front of your screen',
      'Follow the blinking prompts on screen',
      'Try to maintain a steady rhythm',
      'Complete 3 sets of 20 blinks each'
    ]
  },
  {
    id: '2',
    name: 'Eye Tracking Challenge',
    description: 'Enhance visual coordination and tracking accuracy',
    type: 'eye_tracking',
    difficulty: 'medium',
    duration: 10,
    instructions: [
      'Keep your head still and follow the moving target',
      'Use only your eyes to track the object',
      'Maintain smooth, continuous movement',
      'Complete all tracking patterns'
    ]
  },
  {
    id: '3',
    name: 'Pupil Response Test',
    description: 'Train pupil response and light adaptation',
    type: 'pupil_response',
    difficulty: 'medium',
    duration: 8,
    instructions: [
      'Look directly at the center of the screen',
      'Allow your pupils to adjust to brightness changes',
      'Do not look away during the test',
      'Blink normally throughout the exercise'
    ]
  },
  {
    id: '4',
    name: 'Focus Master',
    description: 'Improve accommodation and focusing ability',
    type: 'focus_exercise',
    difficulty: 'hard',
    duration: 15,
    instructions: [
      'Alternate focus between near and far targets',
      'Hold focus for the specified duration',
      'Avoid squinting or straining',
      'Complete all focus transitions smoothly'
    ]
  }
];

export const useHealthStore = create<HealthState>((set, get) => ({
  metrics: {
    blinkRate: 15,
    screenTime: 6.5,
    eyeStrain: 3,
    dryEyeSymptoms: 2,
    visualAcuity: {
      left: 20/20,
      right: 20/20
    },
    lastUpdated: new Date()
  },
  testResults: [],
  gameSessions: [],
  availableGames: defaultGames,

  updateMetrics: (newMetrics: Partial<HealthMetrics>) => {
    const { metrics } = get();
    if (metrics) {
      set({
        metrics: {
          ...metrics,
          ...newMetrics,
          lastUpdated: new Date()
        }
      });
    }
  },

  addTestResult: (result: EyeTestResult) => {
    set(state => ({
      testResults: [...state.testResults, result]
    }));
  },

  addGameSession: (session: GameSession) => {
    set(state => ({
      gameSessions: [...state.gameSessions, session]
    }));
  },

  getGameById: (id: string) => {
    const { availableGames } = get();
    return availableGames.find(game => game.id === id);
  },
}));