import React from 'react';
import { Play, Clock, Trophy, Star } from 'lucide-react';
import { BiometricGame } from '../../types';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: BiometricGame;
  onPlay: (gameId: string) => void;
  bestScore?: number;
  timesPlayed?: number;
}

export default function GameCard({ game, onPlay, bestScore, timesPlayed = 0 }: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getGameIcon = (type: string) => {
    switch (type) {
      case 'blink_training':
        return '👁️';
      case 'eye_tracking':
        return '🎯';
      case 'pupil_response':
        return '💡';
      case 'focus_exercise':
        return '🔍';
      default:
        return '🎮';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{getGameIcon(game.type)}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {game.name}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
              {game.difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {game.duration}m
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {game.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {bestScore && (
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {bestScore}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {timesPlayed} plays
            </span>
          </div>
        </div>
      </div>

      {/* Instructions Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Instructions:
        </h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {game.instructions.slice(0, 2).map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              {instruction}
            </li>
          ))}
          {game.instructions.length > 2 && (
            <li className="text-gray-500 dark:text-gray-500 italic">
              +{game.instructions.length - 2} more steps...
            </li>
          )}
        </ul>
      </div>

      {/* Play Button */}
      <button
        onClick={() => onPlay(game.id)}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        <Play className="h-4 w-4" />
        <span>Start Game</span>
      </button>
    </motion.div>
  );
}