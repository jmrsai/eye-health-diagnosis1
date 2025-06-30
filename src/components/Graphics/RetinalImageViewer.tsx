import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCw, Move, Ruler, Eye, Download } from 'lucide-react';

interface Annotation {
  id: string;
  x: number;
  y: number;
  type: 'microaneurysm' | 'hemorrhage' | 'exudate' | 'drusen' | 'neovascularization';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
}

interface RetinalImageViewerProps {
  imageUrl?: string;
  annotations?: Annotation[];
  interactive?: boolean;
  showMeasurements?: boolean;
}

export default function RetinalImageViewer({
  imageUrl = 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800',
  annotations = [],
  interactive = true,
  showMeasurements = false
}: RetinalImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [tool, setTool] = useState<'pan' | 'measure' | 'annotate'>('pan');
  const imageRef = useRef<HTMLDivElement>(null);

  const mockAnnotations: Annotation[] = [
    {
      id: '1',
      x: 45,
      y: 35,
      type: 'microaneurysm',
      severity: 'mild',
      description: 'Small microaneurysm in superior temporal quadrant'
    },
    {
      id: '2',
      x: 60,
      y: 55,
      type: 'hemorrhage',
      severity: 'moderate',
      description: 'Dot hemorrhage near macula'
    },
    {
      id: '3',
      x: 30,
      y: 70,
      type: 'exudate',
      severity: 'mild',
      description: 'Hard exudate in inferior nasal area'
    }
  ];

  const allAnnotations = [...annotations, ...mockAnnotations];

  const getAnnotationColor = (type: string, severity: string) => {
    const colors = {
      microaneurysm: { mild: '#fbbf24', moderate: '#f59e0b', severe: '#d97706' },
      hemorrhage: { mild: '#f87171', moderate: '#ef4444', severe: '#dc2626' },
      exudate: { mild: '#60a5fa', moderate: '#3b82f6', severe: '#2563eb' },
      drusen: { mild: '#a78bfa', moderate: '#8b5cf6', severe: '#7c3aed' },
      neovascularization: { mild: '#34d399', moderate: '#10b981', severe: '#059669' }
    };
    return colors[type as keyof typeof colors]?.[severity as keyof typeof colors.microaneurysm] || '#6b7280';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool === 'pan') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && tool === 'pan') {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTool('pan')}
              className={`p-2 rounded-lg transition-colors ${
                tool === 'pan'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
              }`}
            >
              <Move className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTool('measure')}
              className={`p-2 rounded-lg transition-colors ${
                tool === 'measure'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
              }`}
            >
              <Ruler className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTool('annotate')}
              className={`p-2 rounded-lg transition-colors ${
                tool === 'annotate'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
            >
              Reset
            </button>
            <button className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div
          ref={imageRef}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div
            className="relative"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <img
              src={imageUrl}
              alt="Retinal fundus"
              className="max-w-none h-80 rounded-lg"
              draggable={false}
            />
            
            {/* Annotations */}
            {allAnnotations.map((annotation) => (
              <motion.div
                key={annotation.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${annotation.x}%`,
                  top: `${annotation.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedAnnotation(
                  selectedAnnotation === annotation.id ? null : annotation.id
                )}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{
                    backgroundColor: getAnnotationColor(annotation.type, annotation.severity)
                  }}
                />
                {selectedAnnotation === annotation.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10"
                  >
                    <div className="font-medium">{annotation.type.replace('_', ' ')}</div>
                    <div className="text-gray-300">{annotation.severity}</div>
                    <div className="text-gray-400 mt-1">{annotation.description}</div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-900"></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            {/* Measurement overlay */}
            {showMeasurements && (
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#fbbf24" strokeWidth="2" />
                  <circle cx="50%" cy="50%" r="30" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,5" />
                  <text x="52%" y="48%" fill="#fbbf24" fontSize="12" className="font-medium">
                    Optic Disc
                  </text>
                </svg>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Zoom indicator */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {Math.round(zoom * 100)}% | {rotation}°
        </div>
      </div>

      {/* Annotation Legend */}
      {allAnnotations.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Annotations ({allAnnotations.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {allAnnotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedAnnotation === annotation.id
                    ? 'bg-primary-100 dark:bg-primary-900/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedAnnotation(
                  selectedAnnotation === annotation.id ? null : annotation.id
                )}
              >
                <div
                  className="w-3 h-3 rounded-full border border-white"
                  style={{
                    backgroundColor: getAnnotationColor(annotation.type, annotation.severity)
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                    {annotation.type.replace('_', ' ')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {annotation.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}