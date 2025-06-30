import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VisionFieldData {
  points: number[][];
  threshold: number;
  md: number; // Mean Deviation
  psd: number; // Pattern Standard Deviation
  vfi: number; // Visual Field Index
}

interface VisionFieldVisualizerProps {
  data?: VisionFieldData;
  type?: 'threshold' | 'deviation' | 'probability';
  interactive?: boolean;
}

const defaultData: VisionFieldData = {
  points: [
    [-2, -1, 0, 1, 2, 1, 0, -1, -2],
    [-1, 0, 2, 3, 4, 3, 2, 0, -1],
    [0, 2, 4, 6, 8, 6, 4, 2, 0],
    [1, 3, 6, 10, 12, 10, 6, 3, 1],
    [2, 4, 8, 12, 15, 12, 8, 4, 2],
    [1, 3, 6, 10, 12, 10, 6, 3, 1],
    [0, 2, 4, 6, 8, 6, 4, 2, 0],
    [-1, 0, 2, 3, 4, 3, 2, 0, -1],
    [-2, -1, 0, 1, 2, 1, 0, -1, -2]
  ],
  threshold: 30,
  md: -2.5,
  psd: 3.2,
  vfi: 92
};

export default function VisionFieldVisualizer({ 
  data = defaultData, 
  type = 'threshold',
  interactive = true 
}: VisionFieldVisualizerProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{x: number, y: number, value: number} | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColorForValue = (value: number, maxValue: number) => {
    const normalized = Math.max(0, Math.min(1, value / maxValue));
    
    if (type === 'threshold') {
      // Green to red gradient for threshold values
      const red = Math.floor(255 * (1 - normalized));
      const green = Math.floor(255 * normalized);
      return `rgb(${red}, ${green}, 0)`;
    } else if (type === 'deviation') {
      // Blue to red for deviation
      if (value > 0) {
        return `rgb(${Math.floor(255 * normalized)}, 0, 0)`;
      } else {
        return `rgb(0, 0, ${Math.floor(255 * Math.abs(normalized))})`;
      }
    } else {
      // Probability - grayscale
      const gray = Math.floor(255 * normalized);
      return `rgb(${gray}, ${gray}, ${gray})`;
    }
  };

  const getInterpretation = () => {
    if (data.md > -2) return { level: 'Normal', color: 'text-green-600' };
    if (data.md > -6) return { level: 'Mild Defect', color: 'text-yellow-600' };
    if (data.md > -12) return { level: 'Moderate Defect', color: 'text-orange-600' };
    return { level: 'Severe Defect', color: 'text-red-600' };
  };

  const interpretation = getInterpretation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Visual Field Analysis
        </h3>
        <div className="flex items-center space-x-2">
          {['threshold', 'deviation', 'probability'].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                type === t
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Field Map */}
        <div className="relative">
          <div className="aspect-square bg-black rounded-lg p-4 relative overflow-hidden">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Background circle */}
              <circle cx="150" cy="150" r="140" fill="#1f2937" stroke="#374151" strokeWidth="2" />
              
              {/* Grid lines */}
              <g stroke="#4b5563" strokeWidth="0.5" opacity="0.3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <line key={`h${i}`} x1="10" y1={10 + i * 35} x2="290" y2={10 + i * 35} />
                ))}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <line key={`v${i}`} x1={10 + i * 35} y1="10" x2={10 + i * 35} y2="290" />
                ))}
              </g>
              
              {/* Fixation point */}
              <circle cx="150" cy="150" r="3" fill="#ef4444" />
              <text x="150" y="165" textAnchor="middle" fill="#ef4444" fontSize="8">Fixation</text>
              
              {/* Blind spot */}
              <circle cx="200" cy="150" r="8" fill="#000000" stroke="#6b7280" strokeWidth="1" />
              <text x="200" y="170" textAnchor="middle" fill="#6b7280" fontSize="6">Blind Spot</text>
              
              {/* Data points */}
              {data.points.map((row, y) =>
                row.map((value, x) => {
                  const centerX = 45 + x * 25;
                  const centerY = 45 + y * 25;
                  const maxValue = Math.max(...data.points.flat());
                  const color = getColorForValue(value, maxValue);
                  
                  return (
                    <motion.circle
                      key={`${x}-${y}`}
                      cx={centerX}
                      cy={centerY}
                      r="8"
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: animationPhase === 0 ? 1 : 0.7 + 0.3 * Math.sin((x + y + animationPhase) * 0.5)
                      }}
                      transition={{ delay: (x + y) * 0.05 }}
                      onMouseEnter={() => interactive && setHoveredPoint({ x, y, value })}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer"
                    />
                  );
                })
              )}
            </svg>
            
            {/* Hover tooltip */}
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm"
              >
                <div>Position: ({hoveredPoint.x}, {hoveredPoint.y})</div>
                <div>Value: {hoveredPoint.value} dB</div>
              </motion.div>
            )}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Reduced</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Defect</span>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Global Indices
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mean Deviation (MD)
                  </span>
                  <span className={`text-lg font-bold ${interpretation.color}`}>
                    {data.md.toFixed(1)} dB
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.md > -2 ? 'bg-green-500' :
                      data.md > -6 ? 'bg-yellow-500' :
                      data.md > -12 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(0, (data.md + 20) / 20 * 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Normal: > -2 dB
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pattern Standard Deviation (PSD)
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {data.psd.toFixed(1)} dB
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.psd < 2 ? 'bg-green-500' :
                      data.psd < 4 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, data.psd / 8 * 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Normal: &lt; 2 dB
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Visual Field Index (VFI)
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {data.vfi}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.vfi > 95 ? 'bg-green-500' :
                      data.vfi > 85 ? 'bg-yellow-500' :
                      data.vfi > 70 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.vfi}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Normal: > 95%
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              Clinical Interpretation
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  interpretation.level === 'Normal' ? 'bg-green-500' :
                  interpretation.level === 'Mild Defect' ? 'bg-yellow-500' :
                  interpretation.level === 'Moderate Defect' ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-medium ${interpretation.color}`}>
                  {interpretation.level}
                </span>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {interpretation.level === 'Normal' && 'Visual field within normal limits. Continue routine monitoring.'}
                {interpretation.level === 'Mild Defect' && 'Mild visual field defect detected. Consider additional testing and close monitoring.'}
                {interpretation.level === 'Moderate Defect' && 'Moderate visual field defect present. Treatment optimization and frequent monitoring recommended.'}
                {interpretation.level === 'Severe Defect' && 'Severe visual field defect identified. Immediate intervention and aggressive treatment indicated.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}