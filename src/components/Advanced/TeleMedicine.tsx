import React, { useState } from 'react';
import { Video, Phone, MessageSquare, Calendar, Users, Clock, Shield, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface Consultation {
  id: string;
  patientName: string;
  patientId: string;
  scheduledTime: Date;
  duration: number;
  type: 'routine' | 'follow_up' | 'urgent' | 'second_opinion';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meetingLink: string;
  notes?: string;
}

const mockConsultations: Consultation[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientId: 'P001',
    scheduledTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    duration: 30,
    type: 'follow_up',
    status: 'scheduled',
    meetingLink: 'https://meet.neurovision.ai/room/abc123',
    notes: 'Post-operative follow-up for cataract surgery'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientId: 'P002',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 45,
    type: 'routine',
    status: 'scheduled',
    meetingLink: 'https://meet.neurovision.ai/room/def456',
    notes: 'Annual diabetic retinopathy screening'
  },
  {
    id: '3',
    patientName: 'Emily Davis',
    patientId: 'P003',
    scheduledTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    duration: 60,
    type: 'urgent',
    status: 'completed',
    meetingLink: 'https://meet.neurovision.ai/room/ghi789',
    notes: 'Sudden vision loss evaluation - referred for emergency care'
  }
];

export default function TeleMedicine() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'in_progress' | 'completed'>('upcoming');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'follow_up': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'routine': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'second_opinion': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const startConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsInCall(true);
  };

  const endConsultation = () => {
    setIsInCall(false);
    setSelectedConsultation(null);
  };

  const filteredConsultations = mockConsultations.filter(consultation => {
    switch (activeTab) {
      case 'upcoming': return consultation.status === 'scheduled';
      case 'in_progress': return consultation.status === 'in_progress';
      case 'completed': return consultation.status === 'completed';
      default: return true;
    }
  });

  if (isInCall && selectedConsultation) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50">
        {/* Video Call Interface */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {selectedConsultation.patientName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium">{selectedConsultation.patientName}</h3>
                <p className="text-gray-300 text-sm">Patient ID: {selectedConsultation.patientId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">● Connected</span>
              <span className="text-gray-300 text-sm">15:23</span>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 relative bg-gray-900">
            {/* Main video */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-4xl font-medium">
                    {selectedConsultation.patientName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white text-xl font-medium">{selectedConsultation.patientName}</h3>
                <p className="text-gray-400">Audio only - Camera disabled</p>
              </div>
            </div>

            {/* Self video */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-medical-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg font-medium">DC</span>
                </div>
                <p className="text-white text-sm">Dr. Chen</p>
              </div>
            </div>

            {/* Screen sharing indicator */}
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Sharing: Medical Records</span>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-center space-x-6">
              <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white transition-colors">
                <Monitor className="h-5 w-5" />
              </button>
              <button 
                onClick={endConsultation}
                className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Phone className="h-5 w-5 transform rotate-135" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            TeleMedicine Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            HIPAA-compliant video consultations and remote patient care
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
            <Video className="h-4 w-4" />
            <span>Start Instant Call</span>
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 dark:text-green-100">
              HIPAA-Compliant Platform
            </h4>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              All consultations are encrypted end-to-end and comply with healthcare privacy regulations. 
              No recordings are stored without explicit consent.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'upcoming', label: 'Upcoming', count: mockConsultations.filter(c => c.status === 'scheduled').length },
              { id: 'in_progress', label: 'In Progress', count: mockConsultations.filter(c => c.status === 'in_progress').length },
              { id: 'completed', label: 'Completed', count: mockConsultations.filter(c => c.status === 'completed').length }
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
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {consultation.patientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {consultation.patientName}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(consultation.scheduledTime)} at {formatTime(consultation.scheduledTime)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {consultation.duration} min
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
                          {consultation.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                      {consultation.status.replace('_', ' ')}
                    </span>
                    
                    {consultation.status === 'scheduled' && (
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => startConsultation(consultation)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          <Video className="h-4 w-4" />
                          <span>Join</span>
                        </button>
                      </div>
                    )}

                    {consultation.status === 'completed' && (
                      <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-all duration-200">
                        <Clock className="h-4 w-4" />
                        <span>Review</span>
                      </button>
                    )}
                  </div>
                </div>

                {consultation.notes && (
                  <div className="mt-3 pl-16">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Notes:</strong> {consultation.notes}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}

            {filteredConsultations.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No consultations found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {activeTab === 'upcoming' && 'No upcoming consultations scheduled.'}
                  {activeTab === 'in_progress' && 'No consultations currently in progress.'}
                  {activeTab === 'completed' && 'No completed consultations to show.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Calls</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">32m</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Patients Seen</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}