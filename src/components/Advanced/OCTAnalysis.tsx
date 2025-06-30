import React, { useState, useRef } from 'react';
import { Upload, Eye, Activity, TrendingUp, AlertTriangle, Download, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface OCTData {
  id: string;
  patientId: string;
  scanDate: Date;
  scanType: 'macula' | 'optic_disc' | 'rnfl' | 'ganglion_cell';
  measurements: {
    centralThickness: number;
    averageThickness: number;
    volume: number;
    rnflThickness: {
      superior: number;
      nasal: number;
      inferior: number;
      temporal: number;
      average: number;
    };
  };
  analysis: {
    abnormalities: string[];
    severity: 'normal' | 'borderline' | 'outside_normal' | 'severe';
    recommendations: string[];
    aiConfidence: number;
  };
}

const mockOCTData: OCTData = {
  id: 'oct-001',
  patientId: 'patient-001',
  scanDate: new Date(),
  scanType: 'macula',
  measurements: {
    centralThickness: 245,
    averageThickness: 278,
    volume: 8.6,
    rnflThickness: {
      superior: 118,
      nasal: 85,
      inferior: 125,
      temporal: 72,
      average: 100
    }
  },
  analysis: {
    abnormalities: ['Mild retinal thinning in temporal quadrant'],
    severity: 'borderline',
    recommendations: [
      'Follow-up in 6 months',
      'Monitor for progression',
      'Consider additional imaging if symptoms develop'
    ],
    aiConfidence: 94.2
  }
};

const thicknessMapData = [
  { sector: 'Central', thickness: 245, normal: 250, percentile: 45 },
  { sector: 'Inner Superior', thickness: 315, normal: 320, percentile: 48 },
  { sector: 'Inner Nasal', thickness: 325, normal: 330, percentile: 52 },
  { sector: 'Inner Inferior', thickness: 318, normal: 325, percentile: 46 },
  { sector: 'Inner Temporal', thickness: 310, normal: 315, percentile: 44 },
  { sector: 'Outer Superior', thickness: 285, normal: 290, percentile: 42 },
  { sector: 'Outer Nasal', thickness: 295, normal: 300, percentile: 48 },
  { sector: 'Outer Inferior', thickness: 288, normal: 295, percentile: 45 },
  { sector: 'Outer Temporal', thickness: 275, normal: 280, percentile: 41 }
];

const rnflTrendData = [
  { visit: 'Baseline', superior: 125, nasal: 88, inferior: 130, temporal: 75, average: 104.5 },
  { visit: '6 months', superior: 122, nasal: 86, inferior: 128, temporal: 74, average: 102.5 },
  { visit: '12 months', superior: 120, nasal: 85, inferior: 126, temporal: 73, average: 101 },
  { visit: '18 months', superior: 118, nasal: 85, inferior: 125, temporal: 72, average: 100 },
];

export default function OCTAnalysis() {
  const [selectedScan, setSelectedScan] = useState<OCTData>(mockOCTData);
  const [analysisMode, setAnalysisMode] = useState<'thickness' | 'volume' | 'progression' | 'comparison'>('thickness');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'borderline': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'outside_normal': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'severe': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getThicknessColor = (thickness: number, normal: number) => {
    const ratio = thickness / normal;
    if (ratio > 1.1) return '#ef4444'; // Red - thick
    if (ratio > 1.05) return '#f59e0b'; // Orange - borderline thick
    if (ratio < 0.9) return '#ef4444'; // Red - thin
    if (ratio < 0.95) return '#f59e0b'; // Orange - borderline thin
    return '#10b981'; // Green - normal
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            OCT Analysis Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced optical coherence tomography analysis with AI-powered insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            <Upload className="h-4 w-4" />
            <span>Upload OCT</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,.img,.oct"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">AI Analysis in Progress</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Processing OCT scan with advanced neural networks...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Mode Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          {[
            { id: 'thickness', name: 'Thickness Map', icon: Eye },
            { id: 'volume', name: 'Volume Analysis', icon: Activity },
            { id: 'progression', name: 'Progression', icon: TrendingUp },
            { id: 'comparison', name: 'Comparison', icon: AlertTriangle }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAnalysisMode(mode.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                analysisMode === mode.id
                  ? 'bg-gradient-to-r from-primary-500 to-medical-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <mode.icon className="h-4 w-4" />
              <span>{mode.name}</span>
            </button>
          ))}
        </div>

        {/* Analysis Content */}
        {analysisMode === 'thickness' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Thickness Map Visualization */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Retinal Thickness Map
              </h3>
              <div className="relative">
                <div className="grid grid-cols-3 gap-2 aspect-square max-w-sm mx-auto">
                  {thicknessMapData.map((sector, index) => (
                    <div
                      key={sector.sector}
                      className="relative rounded-lg p-3 text-center text-white font-medium text-xs"
                      style={{
                        backgroundColor: getThicknessColor(sector.thickness, sector.normal),
                        opacity: index === 0 ? 1 : 0.9
                      }}
                    >
                      <div className="font-bold">{sector.thickness}μm</div>
                      <div className="text-xs opacity-90">{sector.percentile}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Borderline</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Abnormal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Measurements
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Central Thickness
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedScan.measurements.centralThickness}μm
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(selectedScan.measurements.centralThickness / 400) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Normal range: 200-300μm
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Average Thickness
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedScan.measurements.averageThickness}μm
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(selectedScan.measurements.averageThickness / 350) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Normal range: 250-320μm
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Macular Volume
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedScan.measurements.volume}mm³
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(selectedScan.measurements.volume / 12) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Normal range: 8.0-10.5mm³
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisMode === 'progression' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              RNFL Thickness Progression
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rnflTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="visit" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[60, 140]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="superior" stroke="#3b82f6" strokeWidth={2} name="Superior" />
                  <Line type="monotone" dataKey="nasal" stroke="#10b981" strokeWidth={2} name="Nasal" />
                  <Line type="monotone" dataKey="inferior" stroke="#f59e0b" strokeWidth={2} name="Inferior" />
                  <Line type="monotone" dataKey="temporal" stroke="#ef4444" strokeWidth={2} name="Temporal" />
                  <Line type="monotone" dataKey="average" stroke="#8b5cf6" strokeWidth={3} name="Average" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Rate of Change</div>
                <div className="text-lg font-bold text-red-600">-1.2μm/year</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Fastest Sector</div>
                <div className="text-lg font-bold text-orange-600">Temporal</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Progression Risk</div>
                <div className="text-lg font-bold text-yellow-600">Moderate</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Next Follow-up</div>
                <div className="text-lg font-bold text-blue-600">3 months</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Analysis Results
            </h3>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {selectedScan.analysis.aiConfidence}% confidence
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Overall Assessment
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedScan.analysis.severity)}`}>
                  {selectedScan.analysis.severity.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detected Abnormalities
              </h4>
              <ul className="space-y-1">
                {selectedScan.analysis.abnormalities.map((abnormality, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{abnormality}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Recommendations
              </h4>
              <ul className="space-y-1">
                {selectedScan.analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            RNFL Quadrant Analysis
          </h3>
          <div className="space-y-4">
            {Object.entries(selectedScan.measurements.rnflThickness).filter(([key]) => key !== 'average').map(([quadrant, thickness]) => (
              <div key={quadrant} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {quadrant}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        thickness > 100 ? 'bg-green-500' :
                        thickness > 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((thickness / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">
                    {thickness}μm
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  Average
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedScan.measurements.rnflThickness.average / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">
                    {selectedScan.measurements.rnflThickness.average}μm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export and Actions */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Export & Actions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generate reports and share analysis results
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
              <Eye className="h-4 w-4" />
              <span>Share Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}