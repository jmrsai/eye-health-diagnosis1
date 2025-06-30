import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Users, Database, Key, FileText, Globe, Lock, Smartphone, QrCode, Download, Upload, FolderSync as Sync, Settings, Award, Building } from 'lucide-react';

interface ABHARecord {
  abhaId: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
  consentStatus: 'granted' | 'pending' | 'revoked';
  linkedRecords: number;
}

interface ComplianceStatus {
  abdm: boolean;
  nabh: boolean;
  hipaa: boolean;
  gdpr: boolean;
  iso27001: boolean;
  lastAudit: Date;
  nextAudit: Date;
  complianceScore: number;
}

const mockABHARecords: ABHARecord[] = [
  {
    abhaId: '12-3456-7890-1234',
    patientName: 'Sarah Johnson',
    phoneNumber: '+91-9876543210',
    email: 'sarah.j@email.com',
    dateOfBirth: new Date('1985-06-15'),
    gender: 'female',
    address: 'Mumbai, Maharashtra',
    verificationStatus: 'verified',
    consentStatus: 'granted',
    linkedRecords: 15
  },
  {
    abhaId: '98-7654-3210-9876',
    patientName: 'Rajesh Kumar',
    phoneNumber: '+91-8765432109',
    email: 'rajesh.k@email.com',
    dateOfBirth: new Date('1978-03-22'),
    gender: 'male',
    address: 'Delhi, India',
    verificationStatus: 'verified',
    consentStatus: 'granted',
    linkedRecords: 8
  },
  {
    abhaId: '45-6789-0123-4567',
    patientName: 'Priya Sharma',
    phoneNumber: '+91-7654321098',
    email: 'priya.s@email.com',
    dateOfBirth: new Date('1992-11-08'),
    gender: 'female',
    address: 'Bangalore, Karnataka',
    verificationStatus: 'pending',
    consentStatus: 'pending',
    linkedRecords: 3
  }
];

const complianceStatus: ComplianceStatus = {
  abdm: true,
  nabh: true,
  hipaa: true,
  gdpr: true,
  iso27001: true,
  lastAudit: new Date('2024-01-15'),
  nextAudit: new Date('2024-07-15'),
  complianceScore: 98
};

export default function ABDMIntegration() {
  const [selectedRecord, setSelectedRecord] = useState<ABHARecord | null>(null);
  const [isCreatingABHA, setIsCreatingABHA] = useState(false);
  const [consentRequests, setConsentRequests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'records' | 'compliance' | 'consent' | 'reports'>('records');

  const createABHAId = async () => {
    setIsCreatingABHA(true);
    // Simulate ABHA ID creation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreatingABHA(false);
  };

  const requestConsent = (abhaId: string) => {
    setConsentRequests([...consentRequests, abhaId]);
    // In real implementation, this would trigger consent request via ABDM
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'granted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
      case 'revoked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ABDM Integration & Compliance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ayushman Bharat Digital Mission compliance and health record management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            complianceStatus.abdm 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">
              ABDM {complianceStatus.abdm ? 'Compliant' : 'Non-Compliant'}
            </span>
          </div>
          <button
            onClick={createABHAId}
            disabled={isCreatingABHA}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <QrCode className="h-4 w-4" />
            <span>{isCreatingABHA ? 'Creating...' : 'Create ABHA ID'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'records', label: 'ABHA Records', icon: Users },
              { id: 'compliance', label: 'Compliance Status', icon: Shield },
              { id: 'consent', label: 'Consent Management', icon: Key },
              { id: 'reports', label: 'NABH Reports', icon: FileText }
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
          {activeTab === 'records' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ABHA Health Records
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-900 dark:text-blue-100 font-medium py-2 px-3 rounded-lg transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Import Records</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-800/30 text-green-900 dark:text-green-100 font-medium py-2 px-3 rounded-lg transition-colors">
                    <Sync className="h-4 w-4" />
                    <span>Sync with HIE-CM</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockABHARecords.map((record, index) => (
                  <motion.div
                    key={record.abhaId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {record.patientName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                          {record.abhaId}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.verificationStatus)}`}>
                          {record.verificationStatus}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.consentStatus)}`}>
                          {record.consentStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{record.phoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{record.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Linked Records:</span>
                        <span className="font-medium text-primary-600">{record.linkedRecords}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          requestConsent(record.abhaId);
                        }}
                        disabled={record.consentStatus === 'granted' || consentRequests.includes(record.abhaId)}
                        className="w-full text-sm bg-primary-500 hover:bg-primary-600 text-white font-medium py-1 px-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {record.consentStatus === 'granted' ? 'Consent Granted' : 
                         consentRequests.includes(record.abhaId) ? 'Request Sent' : 'Request Consent'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'ABDM Compliance', status: complianceStatus.abdm, icon: Shield, description: 'Ayushman Bharat Digital Mission' },
                  { name: 'NABH Accreditation', status: complianceStatus.nabh, icon: Award, description: 'National Accreditation Board for Hospitals' },
                  { name: 'HIPAA Compliance', status: complianceStatus.hipaa, icon: Lock, description: 'Health Insurance Portability and Accountability Act' },
                  { name: 'GDPR Compliance', status: complianceStatus.gdpr, icon: Globe, description: 'General Data Protection Regulation' },
                  { name: 'ISO 27001', status: complianceStatus.iso27001, icon: Building, description: 'Information Security Management' }
                ].map((compliance, index) => (
                  <motion.div
                    key={compliance.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${compliance.status ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                        <compliance.icon className={`h-6 w-6 ${compliance.status ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${compliance.status ? 'text-green-600' : 'text-red-600'}`}>
                        {compliance.status ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        <span className="text-sm font-medium">
                          {compliance.status ? 'Compliant' : 'Non-Compliant'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {compliance.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {compliance.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Overall Compliance Score
                  </h3>
                  <div className="text-3xl font-bold text-green-600">
                    {complianceStatus.complianceScore}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${complianceStatus.complianceScore}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Audit:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {complianceStatus.lastAudit.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Next Audit:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {complianceStatus.nextAudit.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consent' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Key className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Consent Management Framework
                    </h4>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                      <p>• Granular consent for different types of health information</p>
                      <p>• Time-bound consent with automatic expiry</p>
                      <p>• Purpose-specific data sharing permissions</p>
                      <p>• Real-time consent status tracking and management</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Consent Requests
                  </h3>
                  <div className="space-y-3">
                    {mockABHARecords.filter(r => r.consentStatus === 'pending').map((record) => (
                      <div key={record.abhaId} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {record.patientName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {record.abhaId}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                            Approve
                          </button>
                          <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors">
                            Deny
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Active Consents
                  </h3>
                  <div className="space-y-3">
                    {mockABHARecords.filter(r => r.consentStatus === 'granted').map((record) => (
                      <div key={record.abhaId} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {record.patientName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {record.linkedRecords} records accessible
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                            Revoke
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  NABH Compliance Reports
                </h3>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                  <Download className="h-4 w-4" />
                  <span>Generate Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Patient Safety', score: 95, status: 'excellent', lastUpdate: '2024-01-15' },
                  { name: 'Infection Control', score: 92, status: 'good', lastUpdate: '2024-01-10' },
                  { name: 'Quality Management', score: 88, status: 'good', lastUpdate: '2024-01-12' },
                  { name: 'Human Resources', score: 90, status: 'good', lastUpdate: '2024-01-08' },
                  { name: 'Information Management', score: 97, status: 'excellent', lastUpdate: '2024-01-14' },
                  { name: 'Facility Management', score: 85, status: 'satisfactory', lastUpdate: '2024-01-11' }
                ].map((report, index) => (
                  <motion.div
                    key={report.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        report.status === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {report.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            report.score >= 95 ? 'bg-green-500' :
                            report.score >= 85 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${report.score}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {new Date(report.lastUpdate).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Automated NABH Reporting
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Report Generation
                    </h5>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div className="font-medium text-gray-900 dark:text-white">Monthly Quality Report</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Automated generation on 1st of each month</div>
                      </button>
                      <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div className="font-medium text-gray-900 dark:text-white">Patient Safety Metrics</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Real-time incident tracking and reporting</div>
                      </button>
                      <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div className="font-medium text-gray-900 dark:text-white">Compliance Dashboard</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Live compliance status monitoring</div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Integration Status
                    </h5>
                    <div className="space-y-3">
                      {[
                        { system: 'EMR Integration', status: 'active' },
                        { system: 'LIMS Connection', status: 'active' },
                        { system: 'Pharmacy System', status: 'active' },
                        { system: 'Billing Integration', status: 'pending' }
                      ].map((integration) => (
                        <div key={integration.system} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {integration.system}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            integration.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {integration.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}