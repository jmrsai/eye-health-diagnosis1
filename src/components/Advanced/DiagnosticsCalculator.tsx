import React, { useState } from 'react';
import { Calculator, Eye, Activity, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  calculateVisualAcuity,
  assessIntraocularPressure,
  calculateDiabeticRetinopathyRisk,
  assessGlaucoma,
  calculateComprehensiveEyeHealthScore,
  assessColorVision,
  analyzeRetinalThickness
} from '../../utils/eyeCalculations';

interface CalculatorState {
  activeCalculator: 'visual_acuity' | 'iop' | 'diabetic_risk' | 'glaucoma' | 'comprehensive' | 'color_vision' | 'retinal_thickness';
  results: any;
}

export default function DiagnosticsCalculator() {
  const [state, setState] = useState<CalculatorState>({
    activeCalculator: 'visual_acuity',
    results: null
  });

  const [visualAcuityInputs, setVisualAcuityInputs] = useState({
    distance: 20,
    smallestLine: 20
  });

  const [iopInputs, setIopInputs] = useState({
    pressure: 15,
    age: 50,
    cornealThickness: 550
  });

  const [diabeticInputs, setDiabeticInputs] = useState({
    duration: 5,
    hba1c: 7.5,
    systolic: 130,
    diastolic: 80,
    cholesterol: 200,
    smoking: false
  });

  const [glaucomaInputs, setGlaucomaInputs] = useState({
    iop: 18,
    cupDiscRatio: 0.4,
    rnflThickness: 95,
    visualFieldMD: -1,
    age: 55,
    familyHistory: false,
    ethnicity: 'caucasian' as const
  });

  const [comprehensiveInputs, setComprehensiveInputs] = useState({
    visualAcuityLeft: 1.0,
    visualAcuityRight: 1.0,
    iopLeft: 16,
    iopRight: 15,
    centralThickness: 250,
    averageThickness: 280,
    visualFieldMD: -0.5,
    visualFieldPSD: 1.8,
    age: 45,
    diabetes: false,
    hypertension: false,
    smoking: false,
    familyHistory: false,
    myopia: 0
  });

  const [colorVisionInputs, setColorVisionInputs] = useState({
    ishiharaScore: 15,
    farnsworthScore: 1.0,
    testType: 'screening' as const
  });

  const [retinalInputs, setRetinalInputs] = useState({
    centralThickness: 250,
    averageThickness: 280,
    volumeData: [8.5, 8.7, 8.6, 8.8, 8.4, 8.9, 8.5, 8.6],
    age: 60,
    gender: 'female' as const
  });

  const calculators = [
    { id: 'visual_acuity', name: 'Visual Acuity', icon: Eye, description: 'Calculate visual acuity metrics' },
    { id: 'iop', name: 'IOP Assessment', icon: Activity, description: 'Intraocular pressure evaluation' },
    { id: 'diabetic_risk', name: 'Diabetic Retinopathy', icon: TrendingUp, description: 'Risk assessment calculator' },
    { id: 'glaucoma', name: 'Glaucoma Assessment', icon: AlertTriangle, description: 'Comprehensive glaucoma evaluation' },
    { id: 'comprehensive', name: 'Eye Health Score', icon: CheckCircle, description: 'Overall eye health assessment' },
    { id: 'color_vision', name: 'Color Vision', icon: Eye, description: 'Color blindness assessment' },
    { id: 'retinal_thickness', name: 'Retinal Analysis', icon: Activity, description: 'OCT thickness analysis' }
  ];

  const calculateResults = () => {
    let results;

    switch (state.activeCalculator) {
      case 'visual_acuity':
        results = calculateVisualAcuity(visualAcuityInputs.distance, visualAcuityInputs.smallestLine);
        break;
      case 'iop':
        results = assessIntraocularPressure(iopInputs.pressure, iopInputs.age, iopInputs.cornealThickness);
        break;
      case 'diabetic_risk':
        results = calculateDiabeticRetinopathyRisk(
          diabeticInputs.duration,
          diabeticInputs.hba1c,
          { systolic: diabeticInputs.systolic, diastolic: diabeticInputs.diastolic },
          diabeticInputs.cholesterol,
          diabeticInputs.smoking
        );
        break;
      case 'glaucoma':
        results = assessGlaucoma(
          glaucomaInputs.iop,
          glaucomaInputs.cupDiscRatio,
          glaucomaInputs.rnflThickness,
          glaucomaInputs.visualFieldMD,
          glaucomaInputs.age,
          glaucomaInputs.familyHistory,
          glaucomaInputs.ethnicity
        );
        break;
      case 'comprehensive':
        results = calculateComprehensiveEyeHealthScore(
          { left: comprehensiveInputs.visualAcuityLeft, right: comprehensiveInputs.visualAcuityRight },
          { left: comprehensiveInputs.iopLeft, right: comprehensiveInputs.iopRight },
          { central: comprehensiveInputs.centralThickness, average: comprehensiveInputs.averageThickness },
          { md: comprehensiveInputs.visualFieldMD, psd: comprehensiveInputs.visualFieldPSD },
          comprehensiveInputs.age,
          {
            diabetes: comprehensiveInputs.diabetes,
            hypertension: comprehensiveInputs.hypertension,
            smoking: comprehensiveInputs.smoking,
            familyHistory: comprehensiveInputs.familyHistory,
            myopia: comprehensiveInputs.myopia
          }
        );
        break;
      case 'color_vision':
        results = assessColorVision(
          colorVisionInputs.ishiharaScore,
          colorVisionInputs.farnsworthScore,
          colorVisionInputs.testType
        );
        break;
      case 'retinal_thickness':
        results = analyzeRetinalThickness(
          retinalInputs.centralThickness,
          retinalInputs.averageThickness,
          retinalInputs.volumeData,
          retinalInputs.age,
          retinalInputs.gender
        );
        break;
    }

    setState({ ...state, results });
  };

  const renderInputs = () => {
    switch (state.activeCalculator) {
      case 'visual_acuity':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Distance (feet)
              </label>
              <input
                type="number"
                value={visualAcuityInputs.distance}
                onChange={(e) => setVisualAcuityInputs({ ...visualAcuityInputs, distance: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Smallest Line Read
              </label>
              <select
                value={visualAcuityInputs.smallestLine}
                onChange={(e) => setVisualAcuityInputs({ ...visualAcuityInputs, smallestLine: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={200}>20/200</option>
                <option value={100}>20/100</option>
                <option value={70}>20/70</option>
                <option value={50}>20/50</option>
                <option value={40}>20/40</option>
                <option value={30}>20/30</option>
                <option value={25}>20/25</option>
                <option value={20}>20/20</option>
                <option value={15}>20/15</option>
              </select>
            </div>
          </div>
        );

      case 'iop':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                IOP (mmHg)
              </label>
              <input
                type="number"
                value={iopInputs.pressure}
                onChange={(e) => setIopInputs({ ...iopInputs, pressure: Number(e.target.value) })}
                min="5"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={iopInputs.age}
                onChange={(e) => setIopInputs({ ...iopInputs, age: Number(e.target.value) })}
                min="18"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Central Corneal Thickness (μm)
              </label>
              <input
                type="number"
                value={iopInputs.cornealThickness}
                onChange={(e) => setIopInputs({ ...iopInputs, cornealThickness: Number(e.target.value) })}
                min="400"
                max="700"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        );

      case 'diabetic_risk':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Diabetes Duration (years)
              </label>
              <input
                type="number"
                value={diabeticInputs.duration}
                onChange={(e) => setDiabeticInputs({ ...diabeticInputs, duration: Number(e.target.value) })}
                min="0"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                HbA1c (%)
              </label>
              <input
                type="number"
                value={diabeticInputs.hba1c}
                onChange={(e) => setDiabeticInputs({ ...diabeticInputs, hba1c: Number(e.target.value) })}
                min="4"
                max="15"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Systolic BP
                </label>
                <input
                  type="number"
                  value={diabeticInputs.systolic}
                  onChange={(e) => setDiabeticInputs({ ...diabeticInputs, systolic: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diastolic BP
                </label>
                <input
                  type="number"
                  value={diabeticInputs.diastolic}
                  onChange={(e) => setDiabeticInputs({ ...diabeticInputs, diastolic: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                value={diabeticInputs.cholesterol}
                onChange={(e) => setDiabeticInputs({ ...diabeticInputs, cholesterol: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={diabeticInputs.smoking}
                  onChange={(e) => setDiabeticInputs({ ...diabeticInputs, smoking: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Current smoker
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return <div>Select a calculator to begin</div>;
    }
  };

  const renderResults = () => {
    if (!state.results) return null;

    switch (state.activeCalculator) {
      case 'visual_acuity':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Snellen</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{state.results.snellen}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100">LogMAR</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{state.results.logMAR.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Category</h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                state.results.category === 'normal' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                state.results.category === 'mild_impairment' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {state.results.category.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        );

      case 'iop':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Corrected IOP</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{state.results.pressure.toFixed(1)} mmHg</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Risk Level</h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                state.results.risk === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                state.results.risk === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {state.results.risk.toUpperCase()}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommendation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{state.results.recommendation}</p>
            </div>
          </div>
        );

      case 'diabetic_risk':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 dark:text-red-100">Risk Score</h4>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{state.results.toFixed(1)}%</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  state.results < 25 ? 'bg-green-500' :
                  state.results < 50 ? 'bg-yellow-500' :
                  state.results < 75 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(state.results, 100)}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {state.results < 25 ? 'Low risk - Continue routine monitoring' :
               state.results < 50 ? 'Moderate risk - Enhanced screening recommended' :
               state.results < 75 ? 'High risk - Frequent monitoring required' :
               'Very high risk - Immediate intervention needed'}
            </div>
          </div>
        );

      default:
        return <div>Results will appear here</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Diagnostics Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional-grade eye health calculation tools
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calculator Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Calculators
            </h3>
            <div className="space-y-2">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setState({ ...state, activeCalculator: calc.id as any, results: null })}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    state.activeCalculator === calc.id
                      ? 'bg-gradient-to-r from-primary-500 to-medical-500 text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <calc.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{calc.name}</div>
                    <div className="text-xs opacity-75">{calc.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Panel */}
        <div className="lg:col-span-2">
          <motion.div
            key={state.activeCalculator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {calculators.find(c => c.id === state.activeCalculator)?.name}
              </h3>
              <Calculator className="h-5 w-5 text-primary-500" />
            </div>

            {renderInputs()}

            <button
              onClick={calculateResults}
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Calculate Results
            </button>
          </motion.div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Results
            </h3>
            {renderResults()}
          </div>
        </div>
      </div>

      {/* Clinical Information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Clinical Guidelines
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>• All calculations are based on peer-reviewed clinical research and established guidelines</p>
              <p>• Results should be interpreted in conjunction with comprehensive clinical examination</p>
              <p>• These tools are intended for healthcare professionals and educational purposes</p>
              <p>• Always consider individual patient factors and clinical context</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}