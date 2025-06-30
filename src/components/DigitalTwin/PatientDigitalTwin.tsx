import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Eye, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Zap,
  Brain,
  Target,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Download,
  Share2,
  Layers,
  Maximize
} from 'lucide-react';

interface DigitalTwinData {
  patientId: string;
  patientName: string;
  age: number;
  gender: 'male' | 'female';
  eyeModel: {
    leftEye: EyeModelData;
    rightEye: EyeModelData;
  };
  progressionModels: {
    glaucoma: ProgressionModel;
    diabeticRetinopathy: ProgressionModel;
    amd: ProgressionModel;
  };
  treatmentSimulations: TreatmentSimulation[];
  lastUpdated: Date;
}

interface EyeModelData {
  cornealThickness: number;
  anteriorChamberDepth: number;
  lensThickness: number;
  axialLength: number;
  rnflThickness: number[];
  maculaThickness: number;
  iopHistory: { date: Date; value: number }[];
  visualFieldData: number[][];
}

interface ProgressionModel {
  currentStage: string;
  riskScore: number;
  predictedProgression: { timepoint: string; severity: number }[];
  confidenceInterval: { lower: number; upper: number }[];
}

interface TreatmentSimulation {
  id: string;
  name: string;
  type: 'medication' | 'surgery' | 'laser';
  predictedOutcome: {
    iopReduction: number;
    visualFieldPreservation: number;
    sideEffects: string[];
    successProbability: number;
  };
}

const mockDigitalTwinData: DigitalTwinData = {
  patientId: 'P001',
  patientName: 'Sarah Johnson',
  age: 58,
  gender: 'female',
  eyeModel: {
    leftEye: {
      cornealThickness: 545,
      anteriorChamberDepth: 3.2,
      lensThickness: 4.1,
      axialLength: 23.8,
      rnflThickness: [118, 85, 125, 72, 100, 95, 110, 88],
      maculaThickness: 245,
      iopHistory: [
        { date: new Date('2024-01-01'), value: 18 },
        { date: new Date('2024-02-01'), value: 17 },
        { date: new Date('2024-03-01'), value: 16 },
        { date: new Date('2024-04-01'), value: 15 }
      ],
      visualFieldData: [
        [28, 30, 32, 30, 28],
        [30, 32, 34, 32, 30],
        [32, 34, 36, 34, 32],
        [30, 32, 34, 32, 30],
        [28, 30, 32, 30, 28]
      ]
    },
    rightEye: {
      cornealThickness: 550,
      anteriorChamberDepth: 3.1,
      lensThickness: 4.0,
      axialLength: 23.9,
      rnflThickness: [120, 88, 128, 75, 102, 98, 112, 90],
      maculaThickness: 250,
      iopHistory: [
        { date: new Date('2024-01-01'), value: 19 },
        { date: new Date('2024-02-01'), value: 18 },
        { date: new Date('2024-03-01'), value: 17 },
        { date: new Date('2024-04-01'), value: 16 }
      ],
      visualFieldData: [
        [29, 31, 33, 31, 29],
        [31, 33, 35, 33, 31],
        [33, 35, 37, 35, 33],
        [31, 33, 35, 33, 31],
        [29, 31, 33, 31, 29]
      ]
    }
  },
  progressionModels: {
    glaucoma: {
      currentStage: 'Early',
      riskScore: 35,
      predictedProgression: [
        { timepoint: '6 months', severity: 38 },
        { timepoint: '1 year', severity: 42 },
        { timepoint: '2 years', severity: 48 },
        { timepoint: '5 years', severity: 58 }
      ],
      confidenceInterval: [
        { lower: 32, upper: 44 },
        { lower: 36, upper: 48 },
        { lower: 40, upper: 56 },
        { lower: 48, upper: 68 }
      ]
    },
    diabeticRetinopathy: {
      currentStage: 'Mild NPDR',
      riskScore: 25,
      predictedProgression: [
        { timepoint: '6 months', severity: 28 },
        { timepoint: '1 year', severity: 32 },
        { timepoint: '2 years', severity: 38 },
        { timepoint: '5 years', severity: 45 }
      ],
      confidenceInterval: [
        { lower: 22, upper: 34 },
        { lower: 26, upper: 38 },
        { lower: 30, upper: 46 },
        { lower: 35, upper: 55 }
      ]
    },
    amd: {
      currentStage: 'No AMD',
      riskScore: 15,
      predictedProgression: [
        { timepoint: '6 months', severity: 16 },
        { timepoint: '1 year', severity: 18 },
        { timepoint: '2 years', severity: 22 },
        { timepoint: '5 years', severity: 28 }
      ],
      confidenceInterval: [
        { lower: 12, upper: 20 },
        { lower: 14, upper: 22 },
        { lower: 16, upper: 28 },
        { lower: 20, upper: 36 }
      ]
    }
  },
  treatmentSimulations: [
    {
      id: '1',
      name: 'Latanoprost 0.005%',
      type: 'medication',
      predictedOutcome: {
        iopReduction: 25,
        visualFieldPreservation: 85,
        sideEffects: ['Iris pigmentation', 'Lash growth'],
        successProbability: 78
      }
    },
    {
      id: '2',
      name: 'Selective Laser Trabeculoplasty',
      type: 'laser',
      predictedOutcome: {
        iopReduction: 20,
        visualFieldPreservation: 90,
        sideEffects: ['Temporary inflammation'],
        successProbability: 65
      }
    },
    {
      id: '3',
      name: 'Trabeculectomy',
      type: 'surgery',
      predictedOutcome: {
        iopReduction: 40,
        visualFieldPreservation: 95,
        sideEffects: ['Infection risk', 'Hypotony'],
        successProbability: 85
      }
    }
  ],
  lastUpdated: new Date()
};

export default function PatientDigitalTwin() {
  const [selectedEye, setSelectedEye] = useState<'left' | 'right'>('left');
  const [selectedCondition, setSelectedCondition] = useState<'glaucoma' | 'diabeticRetinopathy' | 'amd'>('glaucoma');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [timeProjection, setTimeProjection] = useState(12); // months
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'cross-section' | 'data'>('3d');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && viewMode === '3d') {
      draw3DEyeModel();
    }
  }, [selectedEye, viewMode]);

  const draw3DEyeModel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const eyeData = selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye : mockDigitalTwinData.eyeModel.rightEye;

    // Draw 3D eye model
    drawEyeStructures(ctx, centerX, centerY, eyeData);
  };

  const drawEyeStructures = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, eyeData: EyeModelData) => {
    // Cornea
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI);
    ctx.stroke();

    // Anterior chamber
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 70, 0, 2 * Math.PI);
    ctx.stroke();

    // Lens
    ctx.strokeStyle = '#ffeb3b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 25, 35, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Retina with RNFL visualization
    const rnflColors = eyeData.rnflThickness.map(thickness => {
      if (thickness > 100) return '#4caf50';
      if (thickness > 80) return '#ff9800';
      return '#f44336';
    });

    rnflColors.forEach((color, index) => {
      const angle = (index / rnflColors.length) * 2 * Math.PI;
      const startAngle = angle - Math.PI / rnflColors.length;
      const endAngle = angle + Math.PI / rnflColors.length;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, startAngle, endAngle);
      ctx.stroke();
    });

    // Optic disc
    ctx.fillStyle = '#ffc107';
    ctx.beginPath();
    ctx.arc(centerX + 30, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Macula
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - 20, centerY, 12, 0, 2 * Math.PI);
    ctx.stroke();

    // Add measurements
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(`CCT: ${eyeData.cornealThickness}μm`, centerX - 100, centerY - 120);
    ctx.fillText(`ACD: ${eyeData.anteriorChamberDepth}mm`, centerX - 100, centerY - 105);
    ctx.fillText(`AL: ${eyeData.axialLength}mm`, centerX - 100, centerY - 90);
    ctx.fillText(`Macula: ${eyeData.maculaThickness}μm`, centerX - 100, centerY - 75);
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    // Simulate progression modeling
    setTimeout(() => {
      setSimulationRunning(false);
    }, 3000);
  };

  const getTreatmentColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'laser': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'surgery': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const progressionData = mockDigitalTwinData.progressionModels[selectedCondition];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Digital Twin
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Dynamic 3D model for personalized treatment simulation and disease progression
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={runSimulation}
            disabled={simulationRunning}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {simulationRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{simulationRunning ? 'Simulating...' : 'Run Simulation'}</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Share2 className="h-4 w-4" />
            <span>Share Model</span>
          </button>
        </div>
      </div>

      {/* Patient Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {mockDigitalTwinData.patientName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {mockDigitalTwinData.age} years old, {mockDigitalTwinData.gender}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Patient ID: {mockDigitalTwinData.patientId}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {mockDigitalTwinData.lastUpdated.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Eye Model */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                3D Eye Model
              </h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedEye}
                  onChange={(e) => setSelectedEye(e.target.value as 'left' | 'right')}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="left">Left Eye</option>
                  <option value="right">Right Eye</option>
                </select>
                <div className="flex items-center space-x-1">
                  {['3d', 'cross-section', 'data'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === mode
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {mode === '3d' ? '3D' : mode === 'cross-section' ? 'Cross' : 'Data'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode === '3d' && (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-auto bg-gray-900 rounded-lg"
                />
                {simulationRunning && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Simulating disease progression...</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'data' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Structural Data</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Corneal Thickness:</span>
                      <span className="font-medium">{selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye.cornealThickness : mockDigitalTwinData.eyeModel.rightEye.cornealThickness}μm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">ACD:</span>
                      <span className="font-medium">{selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye.anteriorChamberDepth : mockDigitalTwinData.eyeModel.rightEye.anteriorChamberDepth}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Axial Length:</span>
                      <span className="font-medium">{selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye.axialLength : mockDigitalTwinData.eyeModel.rightEye.axialLength}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Macula Thickness:</span>
                      <span className="font-medium">{selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye.maculaThickness : mockDigitalTwinData.eyeModel.rightEye.maculaThickness}μm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">RNFL Thickness</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {(selectedEye === 'left' ? mockDigitalTwinData.eyeModel.leftEye.rnflThickness : mockDigitalTwinData.eyeModel.rightEye.rnflThickness).map((thickness, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Sector {index + 1}:</span>
                        <span className={`font-medium ${thickness > 100 ? 'text-green-600' : thickness > 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {thickness}μm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls & Settings */}
        <div className="space-y-6">
          {/* Condition Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Disease Models
            </h3>
            
            <div className="space-y-3">
              {Object.entries(mockDigitalTwinData.progressionModels).map(([condition, model]) => (
                <button
                  key={condition}
                  onClick={() => setSelectedCondition(condition as any)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCondition === condition
                      ? 'bg-primary-100 dark:bg-primary-900/20 border border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {condition.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {model.currentStage}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        model.riskScore < 30 ? 'text-green-600' :
                        model.riskScore < 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        Risk: {model.riskScore}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progression Prediction */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark: border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Progression Prediction
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Projection: {timeProjection} months
                </label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={timeProjection}
                  onChange={(e) => setTimeProjection(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                {progressionData.predictedProgression.map((point, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{point.timepoint}:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            point.severity < 30 ? 'bg-green-500' :
                            point.severity < 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${point.severity}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {point.severity}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-900 dark:text-blue-100 font-medium py-2 px-3 rounded-lg transition-colors">
                <Calendar className="h-4 w-4" />
                <span>Schedule Follow-up</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-800/30 text-green-900 dark:text-green-100 font-medium py-2 px-3 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Model</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-800/30 text-purple-900 dark:text-purple-100 font-medium py-2 px-3 rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
                <span>Model Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Simulations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Treatment Simulations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockDigitalTwinData.treatmentSimulations.map((treatment) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedTreatment === treatment.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => setSelectedTreatment(selectedTreatment === treatment.id ? null : treatment.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {treatment.name}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTreatmentColor(treatment.type)}`}>
                  {treatment.type}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">IOP Reduction:</span>
                  <span className="font-medium text-green-600">{treatment.predictedOutcome.iopReduction}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">VF Preservation:</span>
                  <span className="font-medium text-blue-600">{treatment.predictedOutcome.visualFieldPreservation}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                  <span className="font-medium text-purple-600">{treatment.predictedOutcome.successProbability}%</span>
                </div>
              </div>
              
              <AnimatePresence>
                {selectedTreatment === treatment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
                  >
                    <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Potential Side Effects:
                    </h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {treatment.predictedOutcome.sideEffects.map((effect, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              AI-Powered Insights
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>• Digital twin model shows 95% accuracy in predicting disease progression</p>
              <p>• Current treatment response is better than expected (78% vs 65% predicted)</p>
              <p>• Recommended optimization: Consider combination therapy for enhanced IOP control</p>
              <p>• Model suggests 85% probability of maintaining current vision with proper treatment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}