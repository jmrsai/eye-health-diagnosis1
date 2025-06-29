import React from 'react';
import { X, Pause, Play, RotateCcw } from 'lucide-react';
import { BiometricGame } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GameSessionProps {
  game: BiometricGame;
  onClose: () => void;
  onComplete: (score: number, metrics: Record<string, number>) => void;
}

export default function GameSession({ game, onClose, onComplete }: GameSessionProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(game.duration * 60);
  const [score, setScore] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);

  // Game-specific state
  const [blinkCount, setBlinkCount] = React.useState(0);
  const [targetPosition, setTargetPosition] = React.useState({ x: 50, y: 50 });
  const [brightness, setBrightness] = React.useState(50);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleGameComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  // Game-specific effects
  React.useEffect(() => {
    if (game.type === 'eye_tracking' && isPlaying) {
      const interval = setInterval(() => {
        setTargetPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [game.type, isPlaying]);

  React.useEffect(() => {
    if (game.type === 'pupil_response' && isPlaying) {
      const interval = setInterval(() => {
        setBrightness(Math.random() * 80 + 20);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [game.type, isPlaying]);

  const handleGameComplete = () => {
    setIsPlaying(false);
    const finalScore = calculateScore();
    const metrics = getGameMetrics();
    onComplete(finalScore, metrics);
  };

  const calculateScore = () => {
    switch (game.type) {
      case 'blink_training':
        return Math.min(100, (blinkCount / 60) * 100); // Target: 1 blink per second
      case 'eye_tracking':
        return Math.min(100, score);
      case 'pupil_response':
        return Math.min(100, score);
      case 'focus_exercise':
        return Math.min(100, score);
      default:
        return score;
    }
  };

  const getGameMetrics = () => {
    switch (game.type) {
      case 'blink_training':
        return {
          blinkCount,
          blinkRate: blinkCount / (game.duration * 60),
          consistency: Math.random() * 20 + 80, // Mock consistency score
        };
      case 'eye_tracking':
        return {
          accuracy: score,
          smoothness: Math.random() * 20 + 80,
          reactionTime: Math.random() * 200 + 300,
        };
      case 'pupil_response':
        return {
          adaptationSpeed: Math.random() * 20 + 80,
          stability: Math.random() * 15 + 85,
          sensitivity: Math.random() * 25 + 75,
        };
      case 'focus_exercise':
        return {
          accommodationSpeed: Math.random() * 20 + 80,
          accuracy: score,
          endurance: Math.random() * 15 + 85,
        };
      default:
        return { score };
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setTimeRemaining(game.duration * 60);
    setScore(0);
    setGameStarted(false);
    setBlinkCount(0);
    setTargetPosition({ x: 50, y: 50 });
    setBrightness(50);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderGameContent = () => {
    if (!gameStarted) {
      return (
        <div className="text-center">
          <div className="text-6xl mb-6">{game.type === 'blink_training' ? '👁️' : game.type === 'eye_tracking' ? '🎯' : game.type === 'pupil_response' ? '💡' : '🔍'}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {game.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {game.description}
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Instructions:</h3>
            <ol className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2">
              {game.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Game
          </button>
        </div>
      );
    }

    switch (game.type) {
      case 'blink_training':
        return (
          <div className="text-center">
            <div className="text-8xl mb-8 animate-pulse">👁️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Blink when you see the prompt
            </h3>
            <div className="bg-primary-100 dark:bg-primary-900/20 rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                Blinks: {blinkCount}
              </div>
            </div>
            <button
              onClick={() => setBlinkCount(prev => prev + 1)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 px-8 rounded-lg text-lg"
            >
              BLINK
            </button>
          </div>
        );

      case 'eye_tracking':
        return (
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Follow the moving target with your eyes
              </p>
            </div>
            <motion.div
              animate={{
                x: `${targetPosition.x}%`,
                y: `${targetPosition.y}%`,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute w-8 h-8 bg-red-500 rounded-full shadow-lg cursor-pointer"
              style={{ transform: 'translate(-50%, -50%)' }}
              onClick={() => setScore(prev => prev + 10)}
            />
          </div>
        );

      case 'pupil_response':
        return (
          <div 
            className="h-96 rounded-lg transition-all duration-1000 flex items-center justify-center"
            style={{ 
              backgroundColor: `hsl(0, 0%, ${brightness}%)`,
              color: brightness > 50 ? '#000' : '#fff'
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">💡</div>
              <p className="text-lg font-medium">
                Let your pupils adjust to the changing brightness
              </p>
              <div className="mt-4 text-sm opacity-75">
                Brightness: {Math.round(brightness)}%
              </div>
            </div>
          </div>
        );

      case 'focus_exercise':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Focus Exercise
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Near Target</h4>
                <div className="text-2xl">📖</div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Focus here for 5 seconds
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Far Target</h4>
                <div className="text-2xl">🏔️</div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  Then focus here for 5 seconds
                </p>
              </div>
            </div>
            <button
              onClick={() => setScore(prev => prev + 5)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg"
            >
              Completed Focus Cycle
            </button>
          </div>
        );

      default:
        return <div>Game content not implemented</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {game.name}
            </h2>
            <span className="text-lg font-mono text-primary-600 dark:text-primary-400">
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {gameStarted && (
              <>
                <button
                  onClick={pauseGame}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                  onClick={resetGame}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="p-6">
          {renderGameContent()}
        </div>

        {/* Progress Bar */}
        {gameStarted && (
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-medical-500 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${((game.duration * 60 - timeRemaining) / (game.duration * 60)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}