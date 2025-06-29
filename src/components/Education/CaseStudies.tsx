import React, { useState } from 'react';
import { 
  BookOpen, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  FileText,
  TrendingUp,
  Brain,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  id: string;
  title: string;
  category: 'diabetic_retinopathy' | 'glaucoma' | 'amd' | 'cataracts' | 'retinal_detachment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  patient: {
    age: number;
    gender: 'male' | 'female';
    ethnicity: string;
    medicalHistory: string[];
  };
  presentation: {
    chiefComplaint: string;
    symptoms: string[];
    duration: string;
    severity: 'mild' | 'moderate' | 'severe';
  };
  examination: {
    visualAcuity: { right: string; left: string };
    iop: { right: number; left: number };
    fundusFindings: string[];
    additionalTests: string[];
  };
  aiAnalysis: {
    confidence: number;
    primaryDiagnosis: string;
    differentialDiagnosis: string[];
    riskFactors: string[];
    recommendations: string[];
    urgency: 'low' | 'medium' | 'high' | 'urgent';
  };
  clinicalOutcome: {
    finalDiagnosis: string;
    treatment: string[];
    followUp: string;
    prognosis: string;
  };
  learningPoints: string[];
  references: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Progressive Vision Loss in Type 2 Diabetes',
    category: 'diabetic_retinopathy',
    difficulty: 'intermediate',
    patient: {
      age: 58,
      gender: 'male',
      ethnicity: 'Hispanic',
      medicalHistory: ['Type 2 Diabetes (12 years)', 'Hypertension', 'Hyperlipidemia']
    },
    presentation: {
      chiefComplaint: 'Gradual blurring of vision in left eye over 3 months',
      symptoms: ['Blurred vision', 'Difficulty reading', 'Occasional floaters', 'No pain'],
      duration: '3 months',
      severity: 'moderate'
    },
    examination: {
      visualAcuity: { right: '20/25', left: '20/60' },
      iop: { right: 16, left: 18 },
      fundusFindings: [
        'Multiple microaneurysms bilateral',
        'Dot and blot hemorrhages in all quadrants',
        'Hard exudates near macula OS',
        'Cotton wool spots superior arcade OD'
      ],
      additionalTests: ['OCT macula', 'Fluorescein angiography', 'HbA1c: 8.2%']
    },
    aiAnalysis: {
      confidence: 94.7,
      primaryDiagnosis: 'Moderate Non-Proliferative Diabetic Retinopathy with Macular Edema',
      differentialDiagnosis: [
        'Severe NPDR',
        'Proliferative Diabetic Retinopathy',
        'Hypertensive Retinopathy'
      ],
      riskFactors: [
        'Poor glycemic control (HbA1c 8.2%)',
        '12-year diabetes duration',
        'Hypertension',
        'Male gender'
      ],
      recommendations: [
        'Immediate ophthalmologic referral',
        'Anti-VEGF therapy consideration',
        'Improved glycemic control',
        'Blood pressure optimization'
      ],
      urgency: 'high'
    },
    clinicalOutcome: {
      finalDiagnosis: 'Moderate NPDR with Clinically Significant Macular Edema',
      treatment: [
        'Intravitreal ranibizumab injections (monthly x 3)',
        'Metformin dose optimization',
        'ACE inhibitor initiation',
        'Dietary counseling'
      ],
      followUp: 'Monthly for 3 months, then every 3 months',
      prognosis: 'Good with treatment compliance and glycemic control'
    },
    learningPoints: [
      'Early diabetic retinopathy screening is crucial for all diabetic patients',
      'Macular edema can occur at any stage of diabetic retinopathy',
      'Systemic control of diabetes and hypertension is essential',
      'Anti-VEGF therapy has revolutionized diabetic macular edema treatment'
    ],
    references: [
      'Diabetic Retinopathy Clinical Research Network',
      'American Academy of Ophthalmology Preferred Practice Pattern',
      'ETDRS Research Group Guidelines'
    ]
  },
  {
    id: '2',
    title: 'Silent Vision Thief: Early Glaucoma Detection',
    category: 'glaucoma',
    difficulty: 'advanced',
    patient: {
      age: 45,
      gender: 'female',
      ethnicity: 'African American',
      medicalHistory: ['Family history of glaucoma (mother)', 'Myopia (-4.00 D)', 'No systemic diseases']
    },
    presentation: {
      chiefComplaint: 'Routine eye examination, no visual complaints',
      symptoms: ['Asymptomatic', 'Occasional mild headaches', 'No visual field defects noted by patient'],
      duration: 'N/A',
      severity: 'mild'
    },
    examination: {
      visualAcuity: { right: '20/20', left: '20/20' },
      iop: { right: 24, left: 22 },
      fundusFindings: [
        'Cup-to-disc ratio 0.6 bilateral',
        'Inferior notching of neuroretinal rim OD',
        'RNFL thinning inferior quadrant',
        'Asymmetric cupping'
      ],
      additionalTests: ['Visual field testing', 'OCT RNFL', 'Gonioscopy', 'Central corneal thickness']
    },
    aiAnalysis: {
      confidence: 89.3,
      primaryDiagnosis: 'Primary Open-Angle Glaucoma Suspect',
      differentialDiagnosis: [
        'Normal tension glaucoma',
        'Ocular hypertension',
        'Physiologic cupping'
      ],
      riskFactors: [
        'African American ethnicity',
        'Family history of glaucoma',
        'Elevated IOP',
        'Myopia',
        'Age > 40 years'
      ],
      recommendations: [
        'Comprehensive glaucoma evaluation',
        'Visual field testing',
        'Consider IOP-lowering therapy',
        'Close monitoring'
      ],
      urgency: 'medium'
    },
    clinicalOutcome: {
      finalDiagnosis: 'Early Primary Open-Angle Glaucoma',
      treatment: [
        'Topical prostaglandin analog (latanoprost)',
        'Target IOP < 18 mmHg',
        'Patient education on compliance',
        'Lifestyle modifications'
      ],
      followUp: 'Every 3 months initially, then every 6 months if stable',
      prognosis: 'Excellent with early detection and treatment'
    },
    learningPoints: [
      'Glaucoma is often asymptomatic in early stages',
      'Family history and ethnicity are important risk factors',
      'Structural changes may precede functional visual field defects',
      'Early detection and treatment can prevent vision loss'
    ],
    references: [
      'American Glaucoma Society Guidelines',
      'European Glaucoma Society Terminology',
      'Ocular Hypertension Treatment Study'
    ]
  },
  {
    id: '3',
    title: 'Central Vision Distortion in Elderly Patient',
    category: 'amd',
    difficulty: 'intermediate',
    patient: {
      age: 72,
      gender: 'male',
      ethnicity: 'Caucasian',
      medicalHistory: ['Smoking (40 pack-years)', 'Cardiovascular disease', 'Family history of AMD']
    },
    presentation: {
      chiefComplaint: 'Straight lines appear wavy, difficulty recognizing faces',
      symptoms: ['Metamorphopsia', 'Central scotoma', 'Difficulty reading', 'Color vision changes'],
      duration: '2 weeks',
      severity: 'severe'
    },
    examination: {
      visualAcuity: { right: '20/80', left: '20/30' },
      iop: { right: 14, left: 16 },
      fundusFindings: [
        'Large soft drusen bilateral',
        'Subretinal fluid OD',
        'Choroidal neovascularization OD',
        'Geographic atrophy OS'
      ],
      additionalTests: ['OCT macula', 'Fluorescein angiography', 'Amsler grid testing']
    },
    aiAnalysis: {
      confidence: 96.2,
      primaryDiagnosis: 'Wet Age-Related Macular Degeneration (Neovascular AMD)',
      differentialDiagnosis: [
        'Polypoidal choroidal vasculopathy',
        'Central serous chorioretinopathy',
        'Diabetic macular edema'
      ],
      riskFactors: [
        'Advanced age (>70 years)',
        'Smoking history',
        'Caucasian ethnicity',
        'Family history of AMD',
        'Cardiovascular disease'
      ],
      recommendations: [
        'Urgent anti-VEGF therapy',
        'Smoking cessation counseling',
        'AREDS2 vitamin supplementation',
        'Fellow eye monitoring'
      ],
      urgency: 'urgent'
    },
    clinicalOutcome: {
      finalDiagnosis: 'Wet AMD with Choroidal Neovascularization',
      treatment: [
        'Intravitreal aflibercept injections',
        'Monthly injections x 3, then PRN',
        'AREDS2 vitamins',
        'Smoking cessation program'
      ],
      followUp: 'Monthly for 6 months, then every 2 months',
      prognosis: 'Visual improvement expected with prompt treatment'
    },
    learningPoints: [
      'Wet AMD requires urgent treatment to prevent irreversible vision loss',
      'Anti-VEGF therapy has dramatically improved outcomes',
      'Smoking is the most modifiable risk factor for AMD',
      'Regular monitoring of the fellow eye is essential'
    ],
    references: [
      'Age-Related Eye Disease Study (AREDS)',
      'MARINA and ANCHOR Clinical Trials',
      'American Academy of Ophthalmology Retina Guidelines'
    ]
  }
];

const CATEGORY_INFO = {
  diabetic_retinopathy: {
    name: 'Diabetic Retinopathy',
    color: 'from-red-500 to-red-600',
    icon: '🩸'
  },
  glaucoma: {
    name: 'Glaucoma',
    color: 'from-blue-500 to-blue-600',
    icon: '👁️'
  },
  amd: {
    name: 'Age-Related Macular Degeneration',
    color: 'from-yellow-500 to-yellow-600',
    icon: '🟡'
  },
  cataracts: {
    name: 'Cataracts',
    color: 'from-gray-500 to-gray-600',
    icon: '☁️'
  },
  retinal_detachment: {
    name: 'Retinal Detachment',
    color: 'from-purple-500 to-purple-600',
    icon: '⚡'
  }
};

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeTab, setActiveTab] = useState<'presentation' | 'examination' | 'analysis' | 'outcome'>('presentation');
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredCases = CASE_STUDIES.filter(caseStudy => 
    filter === 'all' || caseStudy.difficulty === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Clinical Case Studies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive case studies for medical education and training
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty:
          </span>
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === level
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {!selectedCase ? (
        /* Case Study Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCase(caseStudy)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">
                  {CATEGORY_INFO[caseStudy.category].icon}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(caseStudy.difficulty)}`}>
                  {caseStudy.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {caseStudy.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-2" />
                  {caseStudy.patient.age}yo {caseStudy.patient.gender} {caseStudy.patient.ethnicity}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {caseStudy.presentation.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <AlertTriangle className={`h-4 w-4 mr-2 ${getUrgencyColor(caseStudy.aiAnalysis.urgency)}`} />
                  {caseStudy.aiAnalysis.urgency} urgency
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {caseStudy.presentation.chiefComplaint}
              </p>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${CATEGORY_INFO[caseStudy.category].color} text-white`}>
                  {CATEGORY_INFO[caseStudy.category].name}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Brain className="h-4 w-4 mr-1" />
                  {caseStudy.aiAnalysis.confidence}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Case Study Detail View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedCase(null)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Cases
              </button>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(selectedCase.difficulty)}`}>
                {selectedCase.difficulty}
              </span>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-4xl">
                {CATEGORY_INFO[selectedCase.category].icon}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCase.title}
                </h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {selectedCase.patient.age}yo {selectedCase.patient.gender} {selectedCase.patient.ethnicity}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedCase.presentation.duration}
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className={`h-4 w-4 mr-1 ${getUrgencyColor(selectedCase.aiAnalysis.urgency)}`} />
                    {selectedCase.aiAnalysis.urgency} urgency
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'presentation', label: 'Presentation', icon: FileText },
                  { id: 'examination', label: 'Examination', icon: Stethoscope },
                  { id: 'analysis', label: 'AI Analysis', icon: Brain },
                  { id: 'outcome', label: 'Outcome', icon: CheckCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'presentation' && (
                  <motion.div
                    key="presentation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Chief Complaint
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        "{selectedCase.presentation.chiefComplaint}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Patient Information
                        </h4>
                        <div className="space-y-2">
                          <p><strong>Age:</strong> {selectedCase.patient.age} years</p>
                          <p><strong>Gender:</strong> {selectedCase.patient.gender}</p>
                          <p><strong>Ethnicity:</strong> {selectedCase.patient.ethnicity}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Medical History
                        </h4>
                        <ul className="space-y-1">
                          {selectedCase.patient.medicalHistory.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary-500 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Symptoms
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedCase.presentation.symptoms.map((symptom, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg text-sm">
                            {symptom}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'examination' && (
                  <motion.div
                    key="examination"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Visual Acuity
                        </h4>
                        <div className="space-y-2">
                          <p><strong>Right Eye:</strong> {selectedCase.examination.visualAcuity.right}</p>
                          <p><strong>Left Eye:</strong> {selectedCase.examination.visualAcuity.left}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Intraocular Pressure
                        </h4>
                        <div className="space-y-2">
                          <p><strong>Right Eye:</strong> {selectedCase.examination.iop.right} mmHg</p>
                          <p><strong>Left Eye:</strong> {selectedCase.examination.iop.left} mmHg</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Fundus Findings
                      </h4>
                      <ul className="space-y-2">
                        {selectedCase.examination.fundusFindings.map((finding, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Additional Tests
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCase.examination.additionalTests.map((test, index) => (
                          <div key={index} className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg text-sm">
                            {test}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analysis' && (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          AI Confidence Score
                        </h4>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedCase.aiAnalysis.confidence}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${selectedCase.aiAnalysis.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Primary Diagnosis
                      </h4>
                      <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        {selectedCase.aiAnalysis.primaryDiagnosis}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Differential Diagnosis
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.aiAnalysis.differentialDiagnosis.map((diagnosis, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-500 mr-2">•</span>
                              {diagnosis}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Risk Factors
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.aiAnalysis.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        AI Recommendations
                      </h4>
                      <div className="space-y-2">
                        {selectedCase.aiAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {recommendation}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'outcome' && (
                  <motion.div
                    key="outcome"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Final Diagnosis
                      </h4>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        {selectedCase.clinicalOutcome.finalDiagnosis}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Treatment Plan
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.clinicalOutcome.treatment.map((treatment, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Follow-up & Prognosis
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow-up:</p>
                            <p className="text-gray-600 dark:text-gray-400">{selectedCase.clinicalOutcome.followUp}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Prognosis:</p>
                            <p className="text-gray-600 dark:text-gray-400">{selectedCase.clinicalOutcome.prognosis}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Key Learning Points
                      </h4>
                      <div className="space-y-3">
                        {selectedCase.learningPoints.map((point, index) => (
                          <div key={index} className="flex items-start bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <BookOpen className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        References
                      </h4>
                      <ul className="space-y-1">
                        {selectedCase.references.map((reference, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            {index + 1}. {reference}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}