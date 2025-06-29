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
  Shield
} from 'lucide-react';
import { useHealthStore } from '../../store/healthStore';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockHealthData = [
  { date: '2024-01-01', blinkRate: 12, eyeStrain: 4, screenTime: 8 },
  { date: '2024-01-02', blinkRate: 15, eyeStrain: 3, screenTime: 7 },
  { date: '2024-01-03', blinkRate: 18, eyeStrain: 2, screenTime: 6 },
  { date: '2024-01-04', blinkRate: 16, eyeStrain: 3, screenTime: 7.5 },
  { date: '2024-01-05', blinkRate: 20, eyeStrain: 1, screenTime: 5 },
  { date: '2024-01-06', blinkRate: 17, eyeStrain: 2, screenTime: 6.5 },
  { date: '2024-01-07', blinkRate: 19, eyeStrain: 1, screenTime: 5.5 },
];

export default function PatientDashboard() {
  const { metrics } = useHealthStore();

  const stats = [
    {
      name: 'Blink Rate',
      value: `${metrics?.blinkRate || 0}/min`,
      change: '+12%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Screen Time',
      value: `${metrics?.screenTime || 0}h`,
      change: '-8%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Eye Strain',
      value: `${metrics?.eyeStrain || 0}/10`,
      change: '-15%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Health Score',
      value: '87/100',
      change: '+5%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'game',
      title: 'Completed Blink Training Pro',
      description: 'Improved blink rate by 15%',
      time: '2 hours ago',
      icon: Gamepad2,
      color: 'text-blue-600',
    },
    {
      id: 2,
      type: 'analysis',
      title: 'AI Health Analysis Complete',
      description: 'No concerning findings detected',
      time: '4 hours ago',
      icon: Brain,
      color: 'text-green-600',
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Upcoming Appointment',
      description: 'Dr. Chen - Tomorrow at 2:00 PM',
      time: '1 day',
      icon: Calendar,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-medical-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Sarah!</h1>
            <p className="text-primary-100 mt-1">
              Your eye health is looking great today. Keep up the good work!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Eye className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Health Trends
            </h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
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
                />
                <Line 
                  type="monotone" 
                  dataKey="blinkRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="eyeStrain" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Screen Time Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Screen Time Analysis
            </h3>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHealthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [`${value}h`, 'Screen Time']}
                />
                <Area 
                  type="monotone" 
                  dataKey="screenTime" 
                  stroke="#06b6d4" 
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all duration-200">
              <div className="flex items-center">
                <Gamepad2 className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Start Vision Game
                </span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all duration-200">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">
                  AI Health Check
                </span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all duration-200">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Book Appointment
                </span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all duration-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Security Check
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}