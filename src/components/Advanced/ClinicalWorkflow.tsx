import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Calendar, 
  FileText, 
  Eye, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Camera,
  Stethoscope,
  Brain,
  Printer
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  duration: number; // in minutes
  required: boolean;
  data?: any;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  appointmentTime: Date;
  chiefComplaint: string;
  medicalHistory: string[];
}

const mockPatient: Patient = {
  id: 'P001',
  name: 'Sarah Johnson',
  age: 58,
  gender: 'female',
  appointmentTime: new Date(),
  chiefComplaint: 'Blurred vision and difficulty reading',
  medicalHistory: ['Type 2 Diabetes', 'Hypertension', 'Previous cataract surgery OD']
};

const workflowSteps: WorkflowStep[] = [
  {
    id: 'registration',
    title: 'Patient Registration',
    description: 'Verify patient information and insurance',
    icon: User,
    status: 'completed',
    duration: 5,
    required: true
  },
  {
    id: 'history',
    title: 'Medical History',
    description: 'Review medical history and current medications',
    icon: FileText,
    status: 'completed',
    duration: 10,
    required: true
  },
  {
    id: 'visual_acuity',
    title: 'Visual Acuity Test',
    description: 'Measure distance and near visual acuity',
    icon: Eye,
    status: 'completed',
    duration: 15,
    required: true,
    data: { od: '20/40', os: '20/30', near: 'J2' }
  },
  {
    id: 'refraction',
    title: 'Refraction',
    description: 'Determine optimal lens prescription',
    icon: Activity,
    status: 'in_progress',
    duration: 20,
    required: true
  },
  {
    id: 'tonometry',
    title: 'Intraocular Pressure',
    description: 'Measure eye pressure for glaucoma screening',
    icon: Stethoscope,
    status: 'pending',
    duration: 5,
    required: true
  },
  {
    id: 'imaging',
    title: 'Retinal Imaging',
    description: 'Fundus photography and OCT scanning',
    icon: Camera,
    status: 'pending',
    duration: 15,
    required: false
  },
  {
    id: 'examination',
    title: 'Clinical Examination',
    description: 'Comprehensive eye examination by physician',
    icon: Eye,
    status: 'pending',
    duration: 30,
    required: true
  },
  {
    id: 'ai_analysis',
    title: 'AI Analysis',
    description: 'Automated analysis of test results and images',
    icon: Brain,
    status: 'pending',
    duration: 5,
    required: false
  },
  {
    id: 'diagnosis',
    title: 'Diagnosis & Plan',
    description: 'Final diagnosis and treatment planning',
    icon: CheckCircle,
    status: 'pending',
    duration: 15,
    required: true
  }
];

export default function ClinicalWorkflow() {
  const [currentStep, setCurrentStep] = useState('refraction');
  const [steps, setSteps] = useState(workflowSteps);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500 animate-pulse';
      case 'pending': return 'bg-gray-300 dark:bg-gray-600';
      case 'skipped': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-white" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-white animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'skipped': return <AlertTriangle className="h-4 w-4 text-white" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const completeStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'completed' as const }
        : step
    ));
    
    // Move to next step
    const currentIndex = steps.findIndex(s => s.id === stepId);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep.id);
      setSteps(prev => prev.map(step => 
        step.id === nextStep.id 
          ? { ...step, status: 'in_progress' as const }
          : step
      ));
    }
  };

  const skipStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'skipped' as const }
        : step
    ));
  };

  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
  const completedDuration = steps
    .filter(step => step.status === 'completed')
    .reduce((sum, step) => sum + step.duration, 0);
  const progress = (completedDuration / totalDuration) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Clinical Workflow Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Streamlined patient examination workflow with real-time progress tracking
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Printer className="h-4 w-4" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Current Patient
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Appointment: {mockPatient.appointmentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {mockPatient.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {mockPatient.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {mockPatient.age} years old, {mockPatient.gender}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chief Complaint
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mockPatient.chiefComplaint}
            </p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Medical History
            </h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {mockPatient.medicalHistory.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Examination Progress
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% Complete ({completedDuration}/{totalDuration} min)
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-medical-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {steps.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {steps.filter(s => s.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {steps.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Workflow Steps
        </h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                step.id === currentStep
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <step.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </h4>
                    {step.required && (
                      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {step.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Duration: {step.duration} min
                    </span>
                    {step.data && (
                      <button
                        onClick={() => setShowDetails(showDetails === step.id ? null : step.id)}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View Results
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                {step.status === 'in_progress' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => completeStep(step.id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Complete
                    </button>
                    {!step.required && (
                      <button
                        onClick={() => skipStep(step.id)}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Skip
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Step details */}
              <AnimatePresence>
                {showDetails === step.id && step.data && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      Test Results
                    </h5>
                    {step.id === 'visual_acuity' && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Right Eye:</span>
                          <span className="ml-2 font-medium">{step.data.od}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Left Eye:</span>
                          <span className="ml-2 font-medium">{step.data.os}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Near:</span>
                          <span className="ml-2 font-medium">{step.data.near}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Calendar className="h-4 w-4" />
            <span>Schedule Follow-up</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <FileText className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Brain className="h-4 w-4" />
            <span>AI Consultation</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200">
            <CheckCircle className="h-4 w-4" />
            <span>Complete Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
}