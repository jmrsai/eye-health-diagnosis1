import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Eye, 
  Calendar,
  User,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ReportData {
  patient: {
    name: string;
    id: string;
    dob: string;
    gender: string;
  };
  examination: {
    date: string;
    examiner: string;
    chiefComplaint: string;
    visualAcuity: {
      od: string;
      os: string;
      near: string;
    };
    refraction: {
      od: string;
      os: string;
    };
    iop: {
      od: number;
      os: number;
    };
    findings: string[];
    diagnosis: string[];
    plan: string[];
  };
  aiAnalysis: {
    confidence: number;
    riskFactors: string[];
    recommendations: string[];
  };
}

const mockReportData: ReportData = {
  patient: {
    name: 'Sarah Johnson',
    id: 'P001',
    dob: '1965-03-15',
    gender: 'Female'
  },
  examination: {
    date: '2024-01-15',
    examiner: 'Dr. Michael Chen, MD',
    chiefComplaint: 'Blurred vision and difficulty reading for the past 3 months',
    visualAcuity: {
      od: '20/40',
      os: '20/30',
      near: 'J2'
    },
    refraction: {
      od: '-1.25 -0.50 x 90',
      os: '-1.00 -0.25 x 85'
    },
    iop: {
      od: 16,
      os: 15
    },
    findings: [
      'Mild nuclear sclerotic cataracts bilateral',
      'Early diabetic retinopathy changes OS',
      'Cup-to-disc ratio 0.3 bilateral',
      'Macula appears intact'
    ],
    diagnosis: [
      'Nuclear sclerotic cataracts, bilateral',
      'Mild non-proliferative diabetic retinopathy, OS',
      'Myopia with astigmatism'
    ],
    plan: [
      'Cataract surgery consultation',
      'Diabetic retinopathy monitoring every 6 months',
      'Updated spectacle prescription',
      'Diabetes management optimization'
    ]
  },
  aiAnalysis: {
    confidence: 94.2,
    riskFactors: [
      'Diabetes mellitus (12 years)',
      'Age > 55 years',
      'Suboptimal glycemic control'
    ],
    recommendations: [
      'Priority cataract surgery within 3 months',
      'Enhanced diabetic monitoring',
      'HbA1c optimization target < 7%'
    ]
  }
};

export default function MedicalReporting() {
  const [reportType, setReportType] = useState<'comprehensive' | 'summary' | 'referral'>('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const downloadReport = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Medical Report Content';
    element.download = `${mockReportData.patient.name}_Report_${mockReportData.examination.date}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Medical Reporting System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate comprehensive medical reports with AI-powered insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="comprehensive">Comprehensive Report</option>
            <option value="summary">Summary Report</option>
            <option value="referral">Referral Letter</option>
          </select>
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <FileText className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
          </button>
        </div>
      </div>

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Generating Medical Report</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Compiling examination data and AI analysis...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-primary-500 to-medical-500 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">NeuroVision AI Medical Report</h2>
                  <p className="text-primary-100">Comprehensive Eye Examination</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Report Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm">Report ID: NV-{Date.now().toString(36).toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{mockReportData.patient.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Patient ID:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{mockReportData.patient.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Date of Birth:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{mockReportData.patient.dob}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Gender:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{mockReportData.patient.gender}</p>
                  </div>
                </div>
              </section>

              {/* Examination Details */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Examination Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Examination Date:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{mockReportData.examination.date}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Examiner:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{mockReportData.examination.examiner}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Chief Complaint:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{mockReportData.examination.chiefComplaint}</p>
                  </div>
                </div>
              </section>

              {/* Test Results */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Test Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Visual Acuity</h4>
                    <div className="space-y-1 text-sm">
                      <p>OD: {mockReportData.examination.visualAcuity.od}</p>
                      <p>OS: {mockReportData.examination.visualAcuity.os}</p>
                      <p>Near: {mockReportData.examination.visualAcuity.near}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Refraction</h4>
                    <div className="space-y-1 text-sm">
                      <p>OD: {mockReportData.examination.refraction.od}</p>
                      <p>OS: {mockReportData.examination.refraction.os}</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Intraocular Pressure</h4>
                    <div className="space-y-1 text-sm">
                      <p>OD: {mockReportData.examination.iop.od} mmHg</p>
                      <p>OS: {mockReportData.examination.iop.os} mmHg</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clinical Findings */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Clinical Findings
                </h3>
                <ul className="space-y-2">
                  {mockReportData.examination.findings.map((finding, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{finding}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* AI Analysis */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  AI Analysis & Insights
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900 dark:text-white">AI Confidence Score</span>
                    <span className="text-2xl font-bold text-blue-600">{mockReportData.aiAnalysis.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${mockReportData.aiAnalysis.confidence}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Risk Factors</h4>
                      <ul className="space-y-1">
                        {mockReportData.aiAnalysis.riskFactors.map((factor, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Recommendations</h4>
                      <ul className="space-y-1">
                        {mockReportData.aiAnalysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <TrendingUp className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Diagnosis & Plan */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Diagnosis
                    </h3>
                    <ol className="space-y-2">
                      {mockReportData.examination.diagnosis.map((diagnosis, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium px-2 py-1 rounded-full">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{diagnosis}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Treatment Plan
                    </h3>
                    <ol className="space-y-2">
                      {mockReportData.examination.plan.map((plan, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{plan}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
            </div>

            {/* Report Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-xl">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p>This report was generated using NeuroVision AI clinical software</p>
                  <p>Report generated on {new Date().toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p>Digital signature: Dr. Michael Chen, MD</p>
                  <p>License: MD-12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Report Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={downloadReport}
                className="w-full flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button className="w-full flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
                <Printer className="h-4 w-4" />
                <span>Print Report</span>
              </button>
              <button className="w-full flex items-center space-x-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
                <Share2 className="h-4 w-4" />
                <span>Share Report</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Report Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pages</span>
                <span className="font-medium text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sections</span>
                <span className="font-medium text-gray-900 dark:text-white">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">AI Insights</span>
                <span className="font-medium text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Compliance</span>
                <span className="font-medium text-green-600">HIPAA</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Report Quality Score
            </h4>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">96%</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Excellent report quality with comprehensive data and AI insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}