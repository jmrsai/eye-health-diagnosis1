import { create } from 'zustand';
import { User, Patient, Doctor } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Demo users for testing
const demoUsers: (Patient | Doctor)[] = [
  {
    id: '1',
    email: 'patient@neurovision.ai',
    name: 'Sarah Johnson',
    role: 'patient',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    dateOfBirth: new Date('1985-06-15'),
    medicalHistory: [],
    currentMedications: [],
    allergies: ['Penicillin'],
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1-555-0123',
      email: 'john.johnson@email.com'
    }
  },
  {
    id: '2',
    email: 'doctor@neurovision.ai',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date('2023-08-10'),
    lastLogin: new Date(),
    specialization: 'Ophthalmology',
    licenseNumber: 'MD-12345',
    hospital: 'NeuroVision Medical Center',
    patients: ['1']
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = demoUsers.find(u => u.email === email);
    
    if (user && password === 'demo123') {
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  updateProfile: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      set({ 
        user: { ...user, ...updates } 
      });
    }
  },
}));