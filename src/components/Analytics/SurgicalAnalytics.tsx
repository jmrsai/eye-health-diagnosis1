import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Scale as Scalpel, TrendingUp, Award, Clock, Target, Eye, Activity, Users, Calendar, Download, Filter, Play, Pause } from 'lucide-react';

interface SurgicalMetrics {
  surgeonId: string;
  surgeonName: string;
  procedure: string;
  date: Date;
  duration: number; // minutes
  complications: string[];
  outcome: 'excellent' | 'good' | 'fair' | 'poor';
  skillScores: {
    efficiency: number;
    precision: number;
    safety: number;
    technique: number;
    overall: number;
  };
  videoAnalysis: {
    instrumentHandling: number;
    tissueManipulation: number;
    fluidMovements: number;
    decisionMaking: number;
  };
}

const mockSurgicalData: SurgicalMetrics[] = [
  {
    surgeonId: 'S001',
    surgeonName: 'Dr. Sarah Chen',
    procedure: 'Phacoemulsification',
    date: new Date('2024-01-15'),
    duration: 18,
    complications: [],
    outcome: 'excellent',
    skillScores: {
      efficiency: 92,
      precision: 95,
      safety: 98,
      technique: 94,
      overall: 95
    },
    videoAnalysis: {
      instrumentHandling: 94,
      tissueManipulation: 96,
      fluidMovements: 93,
      decisionMaking: 95
    }
  },
  {
    surgeonId: 'S001',
    surgeonName: 'Dr. Sarah Chen',
    procedure: 'Vitrectomy',
    date: new Date('2024-01-20'),
    duration: 45,
    complications: ['Minor bleeding'],
    outcome: 'good',
    skillScores: {
      efficiency: 88,
      precision: 91,
      safety: 95,
      technique: 89,
      overall: 91
    },
    videoAnalysis: {
      instrumentHandling: 89,
      tissueManipulation: 92,
      fluidMovements: 87,
      decisionMaking: 90
    }
  },
  {
    surgeonId: 'S002',
    surgeonName: 'Dr. Michael Rodriguez',
    procedure: 'Phacoemulsification',
    date: new Date('2024-01-18'),
    duration: 22,
    complications: [],
    outcome: 'excellent',
    skillScores: {
      efficiency: 89,
      precision: 92,
      safety: 96,
      technique: 91,
      overall: 92
    },
    videoAnalysis: {
      instrumentHandling: 91,
      tissueManipulation: 93,
      fluidMovements: 89,
      decisionMaking: 92
    }
  }
];

const procedureOutcomes = [
  { name: 'Excellent', value: 65, color: '#10b981' },
  { name: 'Good', value: 25, color: '#3b82f6' },
  { name: 'Fair', value: 8, color: '#f59e0b' },
  { name: 'Poor', value: 2, color: '#ef4444' }
];

const monthlyTrends = [
  { month: 'Jan', surgeries: 45, avgDuration: 22, complications: 2 },
  { month: 'Feb', surgeries: 52, avgDuration: 20, complications: 1 },
  { month: 'Mar', surgeries: 48, avgDuration: 19, complications: 3 },
  { month: 'Apr', surgeries: 61, avgDuration: 18, complications: 1 },
  { month: 'May', surgeries: 55, avgDuration: 17, complications: 2 },
  { month: 'Jun', surgeries: 67, avgDuration: 16, complications: 1 }
];

export default function SurgicalAnalytics() {
  const [selectedSurgeon, setSelectedSurgeon] = useState<string>('all');
  const [selectedProcedure, setSelectedProcedure] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('6months');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredData = mockSurgicalData.filter(surgery => {
    if (selectedSurgeon !== 'all' && surgery.surgeonId !== selectedSurgeon) return false;
    if (selectedProcedure !== 'all' && surgery.procedure !== selectedProcedure) return false;
    return true;
  });

  const avgSkillScores = filteredData.reduce((acc, surgery) => {
    Object.keys(surgery.skillScores).forEach(key => {
      acc[key] = (acc[key] || 0) + surgery.skillScores[key as keyof typeof surgery.skillScores];
    });
    return acc;
  }, {} as Record<string, number>);

  Object.keys(avgSkillScores).forEach(key => {
    avgSkillScores[key] = Math.round(avgSkillScores[key] / filteredData.length);
  });

  const radarData = [
    { skill: 'Efficiency', score: avgSkillScores.efficiency || 0, fullMark: 100 },
    { skill: 'Precision', score: avgSkillScores.precision || 0, fullMark: 100 },
    { skill: 'Safety', score: avgSkillScores.safety || 0, fullMark: 100 },
    { skill: 'Technique', score: avgSkillScores.technique || 0, fullMark: 100 }
  ];

  const startVideoAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI video analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI-Powered Surgical Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced video analysis and skill assessment for surgical performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={startVideoAnalysis}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {isAnalyzing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Video'}</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex items-center space-x-4">
            <select
              value={selectedSurgeon}
              onChange={(e) => setSelectedSurgeon(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Surgeons</option>
              <option value="S001">Dr. Sarah Chen</option>
              <option value="S002">Dr. Michael Rodriguez</option>
            </select>
            
            <select
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Procedures</option>
              <option value="Phacoemulsification">Phacoemulsification</option>
              <option value="Vitrectomy">Vitrectomy</option>
              <option value="Trabeculectomy">Trabeculectomy</option>
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: 'Total Surgeries',
            value: filteredData.length.toString(),
            change: '+12%',
            changeType: 'positive',
            icon: Scalpel,
            color: 'from-blue-500 to-blue-600',
          },
          {
            name: 'Avg Duration',
            value: `${Math.round(filteredData.reduce((sum, s) => sum + s.duration, 0) / filteredData.length || 0)}min`,
            change: '-8%',
            changeType: 'positive',
            icon: Clock,
            color: 'from-green-500 to-green-600',
          },
          {
            name: 'Success Rate',
            value: `${Math.round((filteredData.filter(s => s.outcome === 'excellent' || s.outcome === 'good').length / filteredData.length) * 100 || 0)}%`,
            change: '+5%',
            changeType: 'positive',
            icon: Target,
            color: 'from-purple-500 to-purple-600',
          },
          {
            name: 'Avg Skill Score',
            value: `${avgSkillScores.overall || 0}/100`,
            change: '+3%',
            changeType: 'positive',
            icon: Award,
            color: 'from-orange-500 to-orange-600',
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {metric.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Assessment Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Skill Assessment
            </h3>
            <Activity className="h-5 w-5 text-primary-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Outcome Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Surgical Outcomes
            </h3>
            <Eye className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={procedureOutcomes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {procedureOutcomes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {procedureOutcomes.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Trends
          </h3>
          <TrendingUp className="h-5 w-5 text-blue-500" />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="surgeries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgDuration" stroke="#ef4444" strokeWidth={3} name="Avg Duration (min)" />
              <Line yAxisId="right" type="monotone" dataKey="complications" stroke="#f59e0b" strokeWidth={2} name="Complications" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Video Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Video Analysis
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnalyzing 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {isAnalyzing ? 'Analyzing' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Video Player Placeholder */}
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isAnalyzing ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">AI analyzing surgical technique...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Play className="h-16 w-16 text-white mb-4 mx-auto" />
                    <p className="text-white">Select a surgical video to analyze</p>
                  </div>
                )}
              </div>
              
              {/* Analysis Overlay */}
              {isAnalyzing && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>Analyzing: Instrument handling</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Instrument Handling', score: 94, color: 'text-blue-600' },
                { label: 'Tissue Manipulation', score: 96, color: 'text-green-600' },
                { label: 'Fluid Movements', score: 93, color: 'text-purple-600' },
                { label: 'Decision Making', score: 95, color: 'text-orange-600' }
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.score}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Surgeries */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Surgeries
          </h3>
          
          <div className="space-y-4">
            {filteredData.slice(0, 5).map((surgery, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {surgery.procedure}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {surgery.surgeonName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {surgery.date.toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    surgery.outcome === 'excellent' ? 'text-green-600' :
                    surgery.outcome === 'good' ? 'text-blue-600' :
                    surgery.outcome === 'fair' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {surgery.skillScores.overall}/100
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {surgery.duration}min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              AI Performance Insights
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>• Surgical efficiency has improved by 15% over the last quarter</p>
              <p>• Instrument handling scores are consistently above 90th percentile</p>
              <p>• Recommended focus area: Reduce average procedure time by 2-3 minutes</p>
              <p>• Complication rate is 60% below national average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}