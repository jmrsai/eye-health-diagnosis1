import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Target, 
  Crosshair, 
  Layers, 
  Settings, 
  Play, 
  Pause, 
  RotateCw,
  Maximize,
  Minimize,
  Grid3X3,
  Ruler,
  Zap,
  Camera,
  Video,
  Save
} from 'lucide-react';

interface SurgicalData {
  patientId: string;
  procedure: string;
  iolPower: number;
  iolType: string;
  incisionLocations: { x: number; y: number; angle: number }[];
  capsulorhexisSize: number;
  anteriorChamberDepth: number;
  cornealThickness: number;
  axialLength: number;
}

interface AROverlaySettings {
  opacity: number;
  gridVisible: boolean;
  measurementsVisible: boolean;
  iolPreview: boolean;
  incisionGuides: boolean;
  realTimeTracking: boolean;
}

export default function SurgicalOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [overlaySettings, setOverlaySettings] = useState<AROverlaySettings>({
    opacity: 0.7,
    gridVisible: true,
    measurementsVisible: true,
    iolPreview: true,
    incisionGuides: true,
    realTimeTracking: true
  });
  
  const [surgicalData] = useState<SurgicalData>({
    patientId: 'P001',
    procedure: 'Phacoemulsification with IOL Implantation',
    iolPower: 22.5,
    iolType: 'Monofocal Acrylic',
    incisionLocations: [
      { x: 50, y: 20, angle: 180 },
      { x: 30, y: 80, angle: 45 }
    ],
    capsulorhexisSize: 5.5,
    anteriorChamberDepth: 3.2,
    cornealThickness: 545,
    axialLength: 23.8
  });

  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isActive && canvasRef.current) {
      drawSurgicalOverlay();
    }
  }, [isActive, overlaySettings, eyePosition, zoomLevel]);

  const drawSurgicalOverlay = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set global opacity
    ctx.globalAlpha = overlaySettings.opacity;

    // Draw grid if enabled
    if (overlaySettings.gridVisible) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Draw eye anatomy outline
    drawEyeAnatomy(ctx, canvas.width, canvas.height);

    // Draw IOL preview if enabled
    if (overlaySettings.iolPreview) {
      drawIOLPreview(ctx, canvas.width, canvas.height);
    }

    // Draw incision guides if enabled
    if (overlaySettings.incisionGuides) {
      drawIncisionGuides(ctx, canvas.width, canvas.height);
    }

    // Draw measurements if enabled
    if (overlaySettings.measurementsVisible) {
      drawMeasurements(ctx, canvas.width, canvas.height);
    }

    // Draw capsulorhexis guide
    drawCapsulorhexisGuide(ctx, canvas.width, canvas.height);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const gridSize = 20;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  };

  const drawEyeAnatomy = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // Cornea outline
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Pupil
    ctx.strokeStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
    ctx.stroke();

    // Iris
    ctx.strokeStyle = '#ff8800';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawIOLPreview = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.15;

    // IOL outline
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // IOL haptics
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    // Left haptic
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX - radius * 1.5, centerY);
    ctx.stroke();

    // Right haptic
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius * 1.5, centerY);
    ctx.stroke();

    // IOL power label
    ctx.fillStyle = '#ff00ff';
    ctx.font = '14px Arial';
    ctx.fillText(`${surgicalData.iolPower}D`, centerX - 15, centerY - radius - 10);
  };

  const drawIncisionGuides = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    surgicalData.incisionLocations.forEach((incision, index) => {
      const angle = (incision.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Incision marker
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Incision line
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 10 * Math.cos(angle + Math.PI/2), y - 10 * Math.sin(angle + Math.PI/2));
      ctx.lineTo(x + 10 * Math.cos(angle + Math.PI/2), y + 10 * Math.sin(angle + Math.PI/2));
      ctx.stroke();

      // Label
      ctx.fillStyle = '#ff0000';
      ctx.font = '12px Arial';
      ctx.fillText(`${index + 1}`, x + 15, y - 5);
    });
  };

  const drawCapsulorhexisGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = (surgicalData.capsulorhexisSize / 10) * Math.min(width, height) * 0.1;

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Size label
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px Arial';
    ctx.fillText(`${surgicalData.capsulorhexisSize}mm`, centerX + radius + 10, centerY);
  };

  const drawMeasurements = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Measurement overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(10, 10, 200, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText('Surgical Parameters:', 20, 30);
    ctx.fillText(`ACD: ${surgicalData.anteriorChamberDepth}mm`, 20, 50);
    ctx.fillText(`CCT: ${surgicalData.cornealThickness}μm`, 20, 70);
    ctx.fillText(`AL: ${surgicalData.axialLength}mm`, 20, 90);
    ctx.fillText(`IOL: ${surgicalData.iolPower}D ${surgicalData.iolType}`, 20, 110);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop video recording
  };

  const captureFrame = () => {
    // In a real implementation, this would capture the current frame
    console.log('Frame captured');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AR Surgical Overlay System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time augmented reality guidance for ophthalmic surgery
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
            }`}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isActive ? 'Deactivate AR' : 'Activate AR'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AR Overlay Display */}
        <div className="lg:col-span-3">
          <div className="bg-black rounded-xl overflow-hidden relative">
            {/* Simulated surgical view */}
            <div className="aspect-video bg-gradient-to-br from-red-900 via-red-800 to-red-700 relative">
              {/* Simulated eye image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 relative">
                  {/* Iris */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                    {/* Pupil */}
                    <div className="absolute inset-16 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>

              {/* AR Overlay Canvas */}
              <AnimatePresence>
                {isActive && (
                  <motion.canvas
                    ref={canvasRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    width={800}
                    height={450}
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </AnimatePresence>

              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">REC</span>
                </div>
              )}

              {/* Status overlay */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                <div className="text-sm">
                  <div>Patient: {surgicalData.patientId}</div>
                  <div>Procedure: {surgicalData.procedure}</div>
                  <div className={`flex items-center space-x-2 mt-1 ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span>{isActive ? 'AR Active' : 'AR Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="bg-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Video className="h-4 w-4" />
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
                
                <button
                  onClick={captureFrame}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Capture</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">Zoom:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-white text-sm">{zoomLevel.toFixed(1)}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Overlay Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Overlay Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Opacity
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={overlaySettings.opacity}
                  onChange={(e) => setOverlaySettings({
                    ...overlaySettings,
                    opacity: Number(e.target.value)
                  })}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round(overlaySettings.opacity * 100)}%
                </div>
              </div>

              {[
                { key: 'gridVisible', label: 'Grid Lines', icon: Grid3X3 },
                { key: 'measurementsVisible', label: 'Measurements', icon: Ruler },
                { key: 'iolPreview', label: 'IOL Preview', icon: Eye },
                { key: 'incisionGuides', label: 'Incision Guides', icon: Target },
                { key: 'realTimeTracking', label: 'Real-time Tracking', icon: Zap }
              ].map((setting) => (
                <label key={setting.key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={overlaySettings[setting.key as keyof AROverlaySettings] as boolean}
                    onChange={(e) => setOverlaySettings({
                      ...overlaySettings,
                      [setting.key]: e.target.checked
                    })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <setting.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {setting.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Surgical Parameters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Surgical Parameters
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">IOL Power:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.iolPower}D
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">IOL Type:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.iolType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Capsulorhexis:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.capsulorhexisSize}mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">ACD:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.anteriorChamberDepth}mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">CCT:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.cornealThickness}μm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Axial Length:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {surgicalData.axialLength}mm
                </span>
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
                <Crosshair className="h-4 w-4" />
                <span>Calibrate Tracking</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-800/30 text-green-900 dark:text-green-100 font-medium py-2 px-3 rounded-lg transition-colors">
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-800/30 text-purple-900 dark:text-purple-100 font-medium py-2 px-3 rounded-lg transition-colors">
                <RotateCw className="h-4 w-4" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div>
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
              Safety Notice
            </h4>
            <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <p>• AR overlay is for guidance only and should not replace clinical judgment</p>
              <p>• Always verify measurements and calculations independently</p>
              <p>• Ensure proper calibration before each surgical procedure</p>
              <p>• System should be used only by trained ophthalmic surgeons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}