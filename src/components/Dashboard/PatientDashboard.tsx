import React from 'react';
import { 
  Activity, 
  Eye, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Gamepad2,
  Brain,
  Shield,
  Heart,
  Thermometer,
  Droplets,
  Zap
} from 'lucide-react';
import { useHealthStore } from '../../store/healthStore';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const mockHealthData = [
  { date: '2024-01-01', blinkRate: 12, eyeStrain: 4, screenTime: 8, heartRate: 72, temperature: 98.6 },
  { date: '2024-01-02', blinkRate: 15, eyeStrain: 3, screenTime: 7, heartRate: 75, temperature: 98.4 },
  { date: '2024-01-03', blinkRate: 18, eyeStrain: 2, screenTime: 6, heartRate: 73, temperature: 98.7 },
  { date: '2024-01-04', blinkRate: 16, eyeStrain: 3, screenTime: 7.5, heartRate: 74, temperature: 98.5 },
  { date: '2024-01-05', blinkRate: 20, eyeStrain: 1, screenTime: 5, heartRate: 71, temperature: 98.6 },
  { date: '2024-01-06', blinkRate: 17, eyeStrain: 2, screenTime: 6.5, heartRate: 76, temperature: 98.3 },
  { date: '2024-01-07', blinkRate: 19, eyeStrain: 1, screenTime: 5.5, heartRate: 72, temperature: 98.5 },
];

const healthScoreData = [
  { name: 'Vision Health', value: 87, color: '#2196f3' },
  { name: 'Eye Strain', value: 92, color: '#4caf50' },
  { name: 'Sleep Quality', value: 78, color: '#ff9800' },
  { name: 'Exercise', value: 85, color: '#9c27b0' },
];

export default function PatientDashboard() {
  const { metrics } = useHealthStore();

  const vitalSigns = [
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      change: '+2%',
      changeType: 'positive',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      trend: 'stable'
    },
    {
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      change: 'Normal',
      changeType: 'positive',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      trend: 'stable'
    },
    {
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      change: 'Normal',
      changeType: 'positive',
      icon: Thermometer,
      color: 'from-orange-500 to-red-500',
      trend: 'stable'
    },
    {
      name: 'Oxygen Sat',
      value: '98',
      unit: '%',
      change: '+1%',
      changeType: 'positive',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500',
      trend: 'improving'
    },
  ];

  const eyeHealthMetrics = [
    {
      name: 'Blink Rate',
      value: `${metrics?.blinkRate || 0}/min`,
      change: '+12%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      description: 'Healthy blinking pattern'
    },
    {
      name: 'Screen Time',
      value: `${metrics?.screenTime || 0}h`,
      change: '-8%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      description: 'Reduced digital exposure'
    },
    {
      name: 'Eye Strain',
      value: `${metrics?.eyeStrain || 0}/10`,
      change: '-15%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Minimal discomfort'
    },
    {
      name: 'Health Score',
      value: '87/100',
      change: '+5%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      description: 'Excellent overall health'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'game',
      title: 'Completed Blink Training Pro',
      description: 'Improved blink rate by 15% - Great progress!',
      time: '2 hours ago',
      icon: Gamepad2,
      color: 'text-blue-600',
      score: 95
    },
    {
      id: 2,
      type: 'analysis',
      title: 'AI Health Analysis Complete',
      description: 'No concerning findings detected. All metrics normal.',
      time: '4 hours ago',
      icon: Brain,
      color: 'text-green-600',
      confidence: 94
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Upcoming Appointment',
      description: 'Dr. Chen - Tomorrow at 2:00 PM',
      time: '1 day',
      icon: Calendar,
      color: 'text-purple-600',
      type_label: 'Follow-up'
    },
    {
      id: 4,
      type: 'security',
      title: 'Security Scan Complete',
      description: 'All health data encrypted and secure',
      time: '6 hours ago',
      icon: Shield,
      color: 'text-emerald-600',
      status: 'Protected'
    },
  ];

  return (
    <div className="space-y-medical-lg">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="medical-card-elevated bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 p-medical-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-medical-3xl font-medium mb-2">Good morning, Sarah!</h1>
              <p className="text-primary-100 text-medical-lg mb-medical-sm">
                Your eye health is looking excellent today. Keep up the great work!
              </p>
              <div className="flex items-center space-x-medical-md">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span className="text-medical-sm text-primary-100">All systems healthy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-medical-sm text-primary-100">AI monitoring active</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-medical-xl p-medical-lg">
                <Eye className="h-16 w-16 text-white animate-pulse-medical" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
      </motion.div>

      {/* Vital Signs */}
      <div>
        <h2 className="text-medical-xl font-medium text-neutral-900 dark:text-neutral-100 mb-medical-md">
          Vital Signs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-medical-md">
          {vitalSigns.map((vital, index) => (
            <motion.div
              key={vital.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="medical-card group hover:shadow-medical-elevated transition-all duration-300"
            >
              <div className="p-medical-lg">
                <div className="flex items-center justify-between mb-medical-md">
                  <div className={`p-3 rounded-medical-lg bg-gradient-to-r ${vital.color} shadow-elevation-2`}>
                    <vital.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-medical-xs font-medium ${
                    vital.trend === 'improving' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400' :
                    vital.trend === 'stable' ? 'bg-info-100 text-info-800 dark:bg-info-900/20 dark:text-info-400' :
                    'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400'
                  }`}>
                    {vital.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-medical-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {vital.name}
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-medical-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {vital.value}
                    </p>
                    <p className="text-medical-sm text-neutral-500 dark:text-neutral-400">
                      {vital.unit}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-medical-sm font-medium ${
                      vital.changeType === 'positive' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                    }`}>
                      {vital.change}
                    </span>
                    <span className="text-medical-sm text-neutral-500 dark:text-neutral-400">
                      vs last week
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Eye Health Metrics */}
      <div>
        <h2 className="text-medical-xl font-medium text-neutral-900 dark:text-neutral-100 mb-medical-md">
          Eye Health Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-medical-md">
          {eyeHealthMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="medical-card group hover:shadow-medical-elevated transition-all duration-300"
            >
              <div className="p-medical-lg">
                <div className="flex items-center justify-between mb-medical-md">
                  <div className={`p-3 rounded-medical-lg bg-gradient-to-r ${metric.color} shadow-elevation-2`}>
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-medical-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {metric.name}
                  </p>
                  <p className="text-medical-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    {metric.value}
                  </p>
                  <p className="text-medical-xs text-neutral-500 dark:text-neutral-400">
                    {metric.description}
                  </p>
                  <div className="flex items-center space-x-1 pt-1">
                    <span className={`text-medical-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-medical-sm text-neutral-500 dark:text-neutral-400">
                      vs last week
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-medical-lg">
        {/* Health Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 medical-card"
        >
          <div className="p-medical-lg">
            <div className="flex items-center justify-between mb-medical-lg">
              <h3 className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100">
                Health Trends
              </h3>
              <TrendingUp className="h-5 w-5 text-success-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHealthData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [value, name === 'blinkRate' ? 'Blink Rate' : name === 'eyeStrain' ? 'Eye Strain' : 'Screen Time']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blinkRate" 
                    stroke="#2196f3" 
                    strokeWidth={3}
                    dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
                    name="Blink Rate"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="eyeStrain" 
                    stroke="#f44336" 
                    strokeWidth={3}
                    dot={{ fill: '#f44336', strokeWidth: 2, r: 4 }}
                    name="Eye Strain"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Health Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="medical-card"
        >
          <div className="p-medical-lg">
            <div className="flex items-center justify-between mb-medical-lg">
              <h3 className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100">
                Health Score
              </h3>
              <Activity className="h-5 w-5 text-primary-500" />
            </div>
            <div className="h-48 mb-medical-md">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {healthScoreData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-medical-sm text-neutral-600 dark:text-neutral-400">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-medical-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-medical-lg">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="lg:col-span-2 medical-card"
        >
          <div className="p-medical-lg">
            <h3 className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100 mb-medical-lg">
              Recent Activity
            </h3>
            <div className="space-y-medical-md">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-start space-x-medical-md p-medical-md rounded-medical-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-200 group"
                >
                  <div className={`p-2 rounded-medical-lg bg-neutral-100 dark:bg-neutral-800 ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-medical-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {activity.title}
                      </p>
                      <p className="text-medical-xs text-neutral-500 dark:text-neutral-400">
                        {activity.time}
                      </p>
                    </div>
                    <p className="text-medical-sm text-neutral-600 dark:text-neutral-300 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-medical-sm mt-2">
                      {activity.score && (
                        <span className="medical-chip-success">
                          Score: {activity.score}%
                        </span>
                      )}
                      {activity.confidence && (
                        <span className="medical-chip-info">
                          Confidence: {activity.confidence}%
                        </span>
                      )}
                      {activity.type_label && (
                        <span className="medical-chip-primary">
                          {activity.type_label}
                        </span>
                      )}
                      {activity.status && (
                        <span className="medical-chip-success">
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="medical-card"
        >
          <div className="p-medical-lg">
            <h3 className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100 mb-medical-lg">
              Quick Actions
            </h3>
            <div className="space-y-medical-sm">
              <button className="w-full btn-medical-primary">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Start Vision Game
              </button>
              
              <button className="w-full btn-medical-outlined">
                <Brain className="h-4 w-4 mr-2" />
                AI Health Check
              </button>
              
              <button className="w-full btn-medical-outlined">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </button>
              
              <button className="w-full btn-medical-text">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </button>
            </div>

            {/* Health Tip */}
            <div className="mt-medical-lg p-medical-md bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-medical-lg border border-primary-200 dark:border-primary-800">
              <h4 className="text-medical-sm font-medium text-primary-900 dark:text-primary-100 mb-1">
                💡 Today's Health Tip
              </h4>
              <p className="text-medical-xs text-primary-800 dark:text-primary-200">
                Take a 20-second break every 20 minutes to look at something 20 feet away. This helps reduce eye strain from screen time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}