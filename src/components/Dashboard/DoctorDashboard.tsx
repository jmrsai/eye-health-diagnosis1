import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Stethoscope,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const patientData = [
  { month: 'Jan', patients: 45, diagnoses: 12, followUps: 23 },
  { month: 'Feb', patients: 52, diagnoses: 18, followUps: 28 },
  { month: 'Mar', patients: 48, diagnoses: 15, followUps: 25 },
  { month: 'Apr', patients: 61, diagnoses: 22, followUps: 31 },
  { month: 'May', patients: 55, diagnoses: 19, followUps: 29 },
  { month: 'Jun', patients: 67, diagnoses: 25, followUps: 35 },
];

const diagnosisData = [
  { name: 'Diabetic Retinopathy', value: 35, color: '#ef4444' },
  { name: 'Glaucoma', value: 28, color: '#f59e0b' },
  { name: 'AMD', value: 22, color: '#3b82f6' },
  { name: 'Cataracts', value: 15, color: '#10b981' },
];

export default function DoctorDashboard() {
  const stats = [
    {
      name: 'Total Patients',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Today\'s Appointments',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'AI Diagnoses',
      value: '156',
      change: '+18%',
      changeType: 'positive',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Critical Cases',
      value: '3',
      change: '-1',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '9:00 AM',
      type: 'Follow-up',
      condition: 'Diabetic Retinopathy',
      priority: 'high',
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '10:30 AM',
      type: 'Consultation',
      condition: 'Glaucoma Screening',
      priority: 'medium',
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '2:00 PM',
      type: 'Emergency',
      condition: 'Acute Vision Loss',
      priority: 'critical',
    },
    {
      id: 4,
      patient: 'Robert Wilson',
      time: '3:30 PM',
      type: 'Routine',
      condition: 'Annual Exam',
      priority: 'low',
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Patient Sarah J. - Severe retinal hemorrhage detected',
      time: '5 min ago',
    },
    {
      id: 2,
      type: 'warning',
      message: 'AI flagged potential glaucoma in 3 patients',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'info',
      message: 'Monthly report ready for review',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-medical-500 to-primary-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Dr. Chen!</h1>
            <p className="text-medical-100 mt-1">
              You have 8 appointments today and 3 critical cases requiring attention.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Stethoscope className="h-12 w-12 text-white" />
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
                    vs last month
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
        {/* Patient Analytics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Patient Analytics
            </h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="diagnoses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Diagnosis Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Diagnosis Distribution
            </h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {diagnosisData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Appointments & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Today's Appointments
          </h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.priority === 'critical' ? 'bg-red-500' :
                      appointment.priority === 'high' ? 'bg-orange-500' :
                      appointment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {appointment.patient}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.condition} • {appointment.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {appointment.time}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    appointment.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                    appointment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {appointment.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Alerts
          </h3>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/20' :
                  alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                  'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  {alert.type === 'critical' ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  ) : alert.type === 'warning' ? (
                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}