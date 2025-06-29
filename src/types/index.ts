export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: Date;
  medicalHistory: MedicalRecord[];
  currentMedications: Medication[];
  allergies: string[];
  emergencyContact: EmergencyContact;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  hospital: string;
  patients: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  type: 'diagnosis' | 'test_result' | 'prescription' | 'note';
  title: string;
  description: string;
  attachments?: string[];
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
  instructions: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface EyeTestResult {
  id: string;
  patientId: string;
  testType: 'visual_acuity' | 'color_blindness' | 'peripheral_vision' | 'eye_pressure' | 'fundus_exam';
  date: Date;
  results: Record<string, any>;
  aiAnalysis?: AIAnalysis;
  doctorNotes?: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
}

export interface AIAnalysis {
  confidence: number;
  findings: string[];
  recommendations: string[];
  riskFactors: string[];
  followUpRequired: boolean;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
}

export interface BiometricGame {
  id: string;
  name: string;
  description: string;
  type: 'blink_training' | 'eye_tracking' | 'pupil_response' | 'focus_exercise';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  instructions: string[];
}

export interface GameSession {
  id: string;
  gameId: string;
  patientId: string;
  startTime: Date;
  endTime?: Date;
  score: number;
  metrics: Record<string, number>;
  improvements: string[];
}

export interface HealthMetrics {
  blinkRate: number;
  screenTime: number;
  eyeStrain: number;
  dryEyeSymptoms: number;
  visualAcuity: {
    left: number;
    right: number;
  };
  lastUpdated: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  duration: number;
  type: 'consultation' | 'follow_up' | 'emergency' | 'telemedicine';
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  meetingLink?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'medication' | 'test_result' | 'system' | 'emergency';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}