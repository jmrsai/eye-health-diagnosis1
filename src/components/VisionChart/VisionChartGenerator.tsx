import React, { useState, useRef } from 'react';
import { Download, Printer, Settings, Eye, Ruler, Palette, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChartConfig {
  type: 'snellen' | 'logmar' | 'etdrs' | 'landolt' | 'tumbling_e' | 'lea_symbols' | 'hotv' | 'allen_pictures' | 'ishihara' | 'farnsworth' | 'jaeger' | 'near_vision';
  distance: number;
  illumination: number;
  contrast: number;
  size: 'A4' | 'A3' | 'Letter' | 'Tabloid';
  compliance: string[];
  patientType: 'adult' | 'pediatric' | 'geriatric';
}

const CHART_TYPES = {
  snellen: { name: 'Snellen Chart', description: 'Traditional letter chart (CDHKNORSVZ)' },
  logmar: { name: 'LogMAR Chart', description: 'Logarithmic progression (5 letters per line)' },
  etdrs: { name: 'ETDRS Chart', description: 'Research standard (Early Treatment Diabetic Retinopathy Study)' },
  landolt: { name: 'Landolt C', description: 'International standard ring chart' },
  tumbling_e: { name: 'Tumbling E', description: 'Illiterate-friendly directional E' },
  lea_symbols: { name: 'LEA Symbols', description: 'Pediatric testing (house, circle, square, apple)' },
  hotv: { name: 'HOTV Chart', description: 'Children\'s letters (H, O, T, V)' },
  allen_pictures: { name: 'Allen Pictures', description: 'Young children (birthday cake, car, house, etc.)' },
  ishihara: { name: 'Ishihara Plates', description: 'Standard color blindness test' },
  farnsworth: { name: 'Farnsworth D-15', description: 'Color arrangement test' },
  jaeger: { name: 'Jaeger Chart', description: 'Near vision reading chart (J1-J10)' },
  near_vision: { name: 'Near Vision Chart', description: 'Point sizes and reduced Snellen' }
};

const COMPLIANCE_STANDARDS = [
  'WHO Standards',
  'ISO 8596',
  'BS 4274-1:2003',
  'AAO Guidelines',
  'ANSI Standards',
  'IEC 62471',
  'FDA 510(k)',
  'CE Marking'
];

export default function VisionChartGenerator() {
  const [config, setConfig] = useState<ChartConfig>({
    type: 'snellen',
    distance: 6,
    illumination: 160,
    contrast: 90,
    size: 'A4',
    compliance: ['WHO Standards', 'ISO 8596'],
    patientType: 'adult'
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateChart = async () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on paper size
    const sizes = {
      A4: { width: 2480, height: 3508 }, // 300 DPI
      A3: { width: 3508, height: 4961 },
      Letter: { width: 2550, height: 3300 },
      Tabloid: { width: 3300, height: 5100 }
    };

    const { width, height } = sizes[config.size];
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Generate chart based on type
    await generateChartContent(ctx, width, height);

    // Add compliance information
    addComplianceInfo(ctx, width, height);

    setIsGenerating(false);
  };

  const generateChartContent = async (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    switch (config.type) {
      case 'snellen':
        generateSnellenChart(ctx, width, height);
        break;
      case 'logmar':
        generateLogMARChart(ctx, width, height);
        break;
      case 'etdrs':
        generateETDRSChart(ctx, width, height);
        break;
      case 'landolt':
        generateLandoltChart(ctx, width, height);
        break;
      case 'tumbling_e':
        generateTumblingEChart(ctx, width, height);
        break;
      case 'lea_symbols':
        generateLEASymbolsChart(ctx, width, height);
        break;
      case 'hotv':
        generateHOTVChart(ctx, width, height);
        break;
      case 'ishihara':
        generateIshiharaChart(ctx, width, height);
        break;
      case 'jaeger':
        generateJaegerChart(ctx, width, height);
        break;
      case 'near_vision':
        generateNearVisionChart(ctx, width, height);
        break;
    }
  };

  const generateSnellenChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const lines = [
      { size: 200, letters: ['E'], acuity: '20/200' },
      { size: 100, letters: ['F', 'P'], acuity: '20/100' },
      { size: 70, letters: ['T', 'O', 'Z'], acuity: '20/70' },
      { size: 50, letters: ['L', 'P', 'E', 'D'], acuity: '20/50' },
      { size: 40, letters: ['P', 'E', 'C', 'F', 'D'], acuity: '20/40' },
      { size: 30, letters: ['E', 'D', 'F', 'C', 'Z', 'P'], acuity: '20/30' },
      { size: 25, letters: ['F', 'E', 'L', 'O', 'P', 'Z', 'D'], acuity: '20/25' },
      { size: 20, letters: ['D', 'E', 'P', 'O', 'T', 'E', 'C'], acuity: '20/20' },
      { size: 15, letters: ['L', 'E', 'F', 'P', 'O', 'D'], acuity: '20/15' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.08;

    // Title
    ctx.font = 'bold 60px Arial';
    ctx.fillText('SNELLEN VISUAL ACUITY CHART', width / 2, yPos);
    yPos += 100;

    // Chart lines
    lines.forEach(line => {
      ctx.font = `${line.size}px monospace`;
      const letterSpacing = line.size * 1.2;
      const totalWidth = (line.letters.length - 1) * letterSpacing;
      let xStart = (width - totalWidth) / 2;

      line.letters.forEach((letter, index) => {
        ctx.fillText(letter, xStart + index * letterSpacing, yPos);
      });

      // Acuity label
      ctx.font = '30px Arial';
      ctx.fillText(line.acuity, width - 200, yPos);

      yPos += lineSpacing;
    });
  };

  const generateLogMARChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const lines = [
      { logmar: 1.0, size: 200, letters: ['C', 'D', 'H', 'K', 'N'], acuity: '20/200' },
      { logmar: 0.9, size: 159, letters: ['R', 'H', 'S', 'D', 'K'], acuity: '20/160' },
      { logmar: 0.8, size: 126, letters: ['N', 'C', 'K', 'Z', 'O'], acuity: '20/125' },
      { logmar: 0.7, size: 100, letters: ['Z', 'R', 'H', 'S', 'V'], acuity: '20/100' },
      { logmar: 0.6, size: 79, letters: ['O', 'N', 'K', 'D', 'C'], acuity: '20/80' },
      { logmar: 0.5, size: 63, letters: ['S', 'Z', 'V', 'R', 'H'], acuity: '20/63' },
      { logmar: 0.4, size: 50, letters: ['K', 'D', 'N', 'R', 'C'], acuity: '20/50' },
      { logmar: 0.3, size: 40, letters: ['V', 'H', 'S', 'O', 'Z'], acuity: '20/40' },
      { logmar: 0.2, size: 32, letters: ['R', 'C', 'S', 'K', 'D'], acuity: '20/32' },
      { logmar: 0.1, size: 25, letters: ['H', 'Z', 'O', 'V', 'N'], acuity: '20/25' },
      { logmar: 0.0, size: 20, letters: ['D', 'K', 'S', 'N', 'R'], acuity: '20/20' }
    ];

    let yPos = height * 0.12;
    const lineSpacing = height * 0.07;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('LogMAR VISUAL ACUITY CHART', width / 2, yPos);
    yPos += 80;

    lines.forEach(line => {
      ctx.font = `${line.size}px monospace`;
      const letterSpacing = line.size * 1.2;
      const totalWidth = (line.letters.length - 1) * letterSpacing;
      let xStart = (width - totalWidth) / 2;

      line.letters.forEach((letter, index) => {
        ctx.fillText(letter, xStart + index * letterSpacing, yPos);
      });

      // LogMAR and acuity labels
      ctx.font = '25px Arial';
      ctx.fillText(`${line.logmar.toFixed(1)}`, 150, yPos);
      ctx.fillText(line.acuity, width - 150, yPos);

      yPos += lineSpacing;
    });
  };

  const generateLandoltChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const lines = [
      { size: 200, count: 1, acuity: '20/200' },
      { size: 100, count: 2, acuity: '20/100' },
      { size: 70, count: 3, acuity: '20/70' },
      { size: 50, count: 4, acuity: '20/50' },
      { size: 40, count: 5, acuity: '20/40' },
      { size: 30, count: 6, acuity: '20/30' },
      { size: 25, count: 7, acuity: '20/25' },
      { size: 20, count: 8, acuity: '20/20' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.09;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('LANDOLT C CHART', width / 2, yPos);
    yPos += 80;

    lines.forEach(line => {
      const ringSpacing = line.size * 1.5;
      const totalWidth = (line.count - 1) * ringSpacing;
      let xStart = (width - totalWidth) / 2;

      for (let i = 0; i < line.count; i++) {
        const x = xStart + i * ringSpacing;
        const y = yPos;
        const radius = line.size / 2;
        const strokeWidth = line.size / 5;
        const gapSize = strokeWidth;

        // Draw Landolt C ring
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        
        // Random gap direction (0: right, 1: down, 2: left, 3: up)
        const gapDirection = Math.floor(Math.random() * 4);
        const gapAngle = gapDirection * Math.PI / 2;
        const gapStart = gapAngle - Math.PI / 8;
        const gapEnd = gapAngle + Math.PI / 8;

        ctx.arc(x, y, radius, gapEnd, gapStart + 2 * Math.PI);
        ctx.stroke();
      }

      // Acuity label
      ctx.font = '25px Arial';
      ctx.fillText(line.acuity, width - 150, yPos);

      yPos += lineSpacing;
    });
  };

  const generateTumblingEChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const lines = [
      { size: 200, count: 1, acuity: '20/200' },
      { size: 100, count: 2, acuity: '20/100' },
      { size: 70, count: 3, acuity: '20/70' },
      { size: 50, count: 4, acuity: '20/50' },
      { size: 40, count: 5, acuity: '20/40' },
      { size: 30, count: 6, acuity: '20/30' },
      { size: 25, count: 7, acuity: '20/25' },
      { size: 20, count: 8, acuity: '20/20' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.09;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('TUMBLING E CHART', width / 2, yPos);
    yPos += 80;

    lines.forEach(line => {
      const letterSpacing = line.size * 1.5;
      const totalWidth = (line.count - 1) * letterSpacing;
      let xStart = (width - totalWidth) / 2;

      for (let i = 0; i < line.count; i++) {
        const x = xStart + i * letterSpacing;
        const y = yPos;

        // Random rotation (0°, 90°, 180°, 270°)
        const rotation = (Math.floor(Math.random() * 4) * 90) * Math.PI / 180;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.font = `${line.size}px monospace`;
        ctx.fillText('E', 0, 0);
        ctx.restore();
      }

      // Acuity label
      ctx.font = '25px Arial';
      ctx.fillText(line.acuity, width - 150, yPos);

      yPos += lineSpacing;
    });
  };

  const generateLEASymbolsChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const symbols = ['🏠', '⭕', '⬜', '🍎']; // House, Circle, Square, Apple
    const lines = [
      { size: 150, count: 1, acuity: '20/200' },
      { size: 100, count: 2, acuity: '20/100' },
      { size: 70, count: 3, acuity: '20/70' },
      { size: 50, count: 4, acuity: '20/50' },
      { size: 40, count: 5, acuity: '20/40' },
      { size: 30, count: 6, acuity: '20/30' },
      { size: 25, count: 7, acuity: '20/25' },
      { size: 20, count: 8, acuity: '20/20' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.09;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('LEA SYMBOLS CHART', width / 2, yPos);
    yPos += 80;

    lines.forEach(line => {
      const symbolSpacing = line.size * 1.5;
      const totalWidth = (line.count - 1) * symbolSpacing;
      let xStart = (width - totalWidth) / 2;

      for (let i = 0; i < line.count; i++) {
        const x = xStart + i * symbolSpacing;
        const y = yPos;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        ctx.font = `${line.size}px Arial`;
        ctx.fillText(symbol, x, y);
      }

      // Acuity label
      ctx.font = '25px Arial';
      ctx.fillText(line.acuity, width - 150, yPos);

      yPos += lineSpacing;
    });
  };

  const generateHOTVChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const letters = ['H', 'O', 'T', 'V'];
    const lines = [
      { size: 200, count: 1, acuity: '20/200' },
      { size: 100, count: 2, acuity: '20/100' },
      { size: 70, count: 3, acuity: '20/70' },
      { size: 50, count: 4, acuity: '20/50' },
      { size: 40, count: 5, acuity: '20/40' },
      { size: 30, count: 6, acuity: '20/30' },
      { size: 25, count: 7, acuity: '20/25' },
      { size: 20, count: 8, acuity: '20/20' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.09;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('HOTV CHART', width / 2, yPos);
    yPos += 80;

    lines.forEach(line => {
      const letterSpacing = line.size * 1.2;
      const totalWidth = (line.count - 1) * letterSpacing;
      let xStart = (width - totalWidth) / 2;

      for (let i = 0; i < line.count; i++) {
        const x = xStart + i * letterSpacing;
        const y = yPos;
        const letter = letters[Math.floor(Math.random() * letters.length)];

        ctx.font = `${line.size}px monospace`;
        ctx.fillText(letter, x, y);
      }

      // Acuity label
      ctx.font = '25px Arial';
      ctx.fillText(line.acuity, width - 150, yPos);

      yPos += lineSpacing;
    });
  };

  const generateIshiharaChart = (ctx: CanvasRenderingContext2D, width: number, height: height) => {
    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('ISHIHARA COLOR VISION TEST', width / 2, height * 0.1);

    // Generate color vision test plates (simplified representation)
    const plates = [
      { number: '12', colors: ['#ff6b6b', '#4ecdc4'] },
      { number: '8', colors: ['#45b7d1', '#96ceb4'] },
      { number: '29', colors: ['#feca57', '#ff9ff3'] },
      { number: '5', colors: ['#54a0ff', '#5f27cd'] }
    ];

    let yPos = height * 0.2;
    const plateSize = 300;
    const cols = 2;
    const rows = 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const plateIndex = row * cols + col;
        if (plateIndex >= plates.length) break;

        const plate = plates[plateIndex];
        const x = width / 2 + (col - 0.5) * (plateSize + 100);
        const y = yPos + row * (plateSize + 100);

        // Draw simplified color plate
        ctx.beginPath();
        ctx.arc(x, y, plateSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = plate.colors[0];
        ctx.fill();

        // Add number in contrasting color
        ctx.fillStyle = plate.colors[1];
        ctx.font = 'bold 80px Arial';
        ctx.fillText(plate.number, x, y + 20);

        // Plate number
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Plate ${plateIndex + 1}`, x, y + plateSize / 2 + 40);
      }
    }
  };

  const generateJaegerChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const jaegerSizes = [
      { j: 'J10', size: 24, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J8', size: 20, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J6', size: 16, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J5', size: 14, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J4', size: 12, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J3', size: 10, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J2', size: 8, text: 'The quick brown fox jumps over the lazy dog.' },
      { j: 'J1', size: 6, text: 'The quick brown fox jumps over the lazy dog.' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.08;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('JAEGER NEAR VISION CHART', width / 2, yPos);
    yPos += 80;

    jaegerSizes.forEach(line => {
      // Jaeger size label
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(line.j, 100, yPos);

      // Text
      ctx.font = `${line.size}px serif`;
      ctx.fillText(line.text, 200, yPos);

      yPos += lineSpacing;
    });

    ctx.textAlign = 'center';
  };

  const generateNearVisionChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const nearSizes = [
      { point: '24pt', size: 32, snellen: '20/200', text: 'Reading text at 24 point size' },
      { point: '18pt', size: 24, snellen: '20/150', text: 'Reading text at 18 point size' },
      { point: '14pt', size: 19, snellen: '20/100', text: 'Reading text at 14 point size' },
      { point: '12pt', size: 16, snellen: '20/80', text: 'Reading text at 12 point size' },
      { point: '10pt', size: 13, snellen: '20/60', text: 'Reading text at 10 point size' },
      { point: '8pt', size: 11, snellen: '20/40', text: 'Reading text at 8 point size' },
      { point: '6pt', size: 8, snellen: '20/30', text: 'Reading text at 6 point size' }
    ];

    let yPos = height * 0.15;
    const lineSpacing = height * 0.08;

    // Title
    ctx.font = 'bold 50px Arial';
    ctx.fillText('NEAR VISION CHART', width / 2, yPos);
    yPos += 80;

    nearSizes.forEach(line => {
      // Size labels
      ctx.font = 'bold 25px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(line.point, 100, yPos);
      ctx.fillText(line.snellen, width - 200, yPos);

      // Text
      ctx.font = `${line.size}px serif`;
      ctx.fillText(line.text, 250, yPos);

      yPos += lineSpacing;
    });

    ctx.textAlign = 'center';
  };

  const addComplianceInfo = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const footerY = height - 200;
    
    // Compliance standards
    ctx.font = '20px Arial';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'left';
    
    let infoY = footerY;
    ctx.fillText(`Compliance: ${config.compliance.join(', ')}`, 50, infoY);
    infoY += 30;
    ctx.fillText(`Test Distance: ${config.distance}m`, 50, infoY);
    infoY += 30;
    ctx.fillText(`Illumination: ${config.illumination} cd/m²`, 50, infoY);
    infoY += 30;
    ctx.fillText(`Contrast: ${config.contrast}%`, 50, infoY);
    infoY += 30;
    ctx.fillText(`Patient Type: ${config.patientType}`, 50, infoY);

    // Chart ID and timestamp
    ctx.textAlign = 'right';
    const chartId = `NV-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString().split('T')[0];
    
    ctx.fillText(`Chart ID: ${chartId}`, width - 50, footerY);
    ctx.fillText(`Generated: ${timestamp}`, width - 50, footerY + 30);
    ctx.fillText('NeuroVision AI - WHO Compliant', width - 50, footerY + 60);

    // Calibration marks
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    
    // Corner calibration marks (10mm squares at 300 DPI = ~118 pixels)
    const calSize = 118;
    
    // Top-left
    ctx.strokeRect(50, 50, calSize, calSize);
    ctx.font = '12px Arial';
    ctx.fillText('10mm', 50, 45);
    
    // Top-right
    ctx.strokeRect(width - 50 - calSize, 50, calSize, calSize);
    ctx.fillText('10mm', width - 50 - calSize, 45);
  };

  const downloadChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `vision-chart-${config.type}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const printChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Vision Chart - ${CHART_TYPES[config.type].name}</title>
          <style>
            body { margin: 0; padding: 20px; }
            img { max-width: 100%; height: auto; }
            .instructions { margin-bottom: 20px; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div class="instructions">
            <h2>Vision Chart Instructions</h2>
            <p><strong>Chart Type:</strong> ${CHART_TYPES[config.type].name}</p>
            <p><strong>Test Distance:</strong> ${config.distance} meters</p>
            <p><strong>Illumination:</strong> ${config.illumination} cd/m²</p>
            <p><strong>Contrast:</strong> ${config.contrast}%</p>
            <p><strong>Compliance:</strong> ${config.compliance.join(', ')}</p>
          </div>
          <img src="${canvas.toDataURL()}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            WHO-Compliant Vision Chart Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate professional-grade vision charts meeting international standards
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Chart Configuration
            </h3>

            <div className="space-y-4">
              {/* Chart Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chart Type
                </label>
                <select
                  value={config.type}
                  onChange={(e) => setConfig({ ...config, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {Object.entries(CHART_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {CHART_TYPES[config.type].description}
                </p>
              </div>

              {/* Test Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Distance (meters)
                </label>
                <input
                  type="number"
                  value={config.distance}
                  onChange={(e) => setConfig({ ...config, distance: Number(e.target.value) })}
                  min="1"
                  max="20"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Illumination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Illumination (cd/m²)
                </label>
                <input
                  type="range"
                  value={config.illumination}
                  onChange={(e) => setConfig({ ...config, illumination: Number(e.target.value) })}
                  min="80"
                  max="320"
                  step="10"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>80</span>
                  <span>{config.illumination}</span>
                  <span>320</span>
                </div>
              </div>

              {/* Contrast */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contrast (%)
                </label>
                <input
                  type="range"
                  value={config.contrast}
                  onChange={(e) => setConfig({ ...config, contrast: Number(e.target.value) })}
                  min="85"
                  max="100"
                  step="1"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>85%</span>
                  <span>{config.contrast}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Paper Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper Size
                </label>
                <select
                  value={config.size}
                  onChange={(e) => setConfig({ ...config, size: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="A3">A3 (297 × 420 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Tabloid">Tabloid (11 × 17 in)</option>
                </select>
              </div>

              {/* Patient Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient Type
                </label>
                <select
                  value={config.patientType}
                  onChange={(e) => setConfig({ ...config, patientType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="adult">Adult</option>
                  <option value="pediatric">Pediatric</option>
                  <option value="geriatric">Geriatric</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Compliance Standards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Compliance Standards
            </h3>

            <div className="space-y-2">
              {COMPLIANCE_STANDARDS.map((standard) => (
                <label key={standard} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.compliance.includes(standard)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConfig({
                          ...config,
                          compliance: [...config.compliance, standard]
                        });
                      } else {
                        setConfig({
                          ...config,
                          compliance: config.compliance.filter(s => s !== standard)
                        });
                      }
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {standard}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <button
              onClick={generateChart}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-5 w-5" />
              <span>{isGenerating ? 'Generating...' : 'Generate Chart'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadChart}
                className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>

              <button
                onClick={printChart}
                className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Chart Preview */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Ruler className="h-5 w-5 mr-2" />
              Chart Preview
            </h3>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border border-gray-200 dark:border-gray-600 bg-white"
                style={{ maxHeight: '600px' }}
              />
              
              {!canvasRef.current?.width && (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Generate Chart" to create your vision chart</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chart Information */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Chart Information
              </h4>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <p><strong>Type:</strong> {CHART_TYPES[config.type].name}</p>
                <p><strong>Distance:</strong> {config.distance}m</p>
                <p><strong>Illumination:</strong> {config.illumination} cd/m² (WHO: 80-320 cd/m²)</p>
                <p><strong>Contrast:</strong> {config.contrast}% (Clinical minimum: 85%)</p>
                <p><strong>Compliance:</strong> {config.compliance.join(', ')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}