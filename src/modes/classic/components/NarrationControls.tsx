import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import { useNarration } from '../hooks/useNarration';
import { useLanguage } from '../../../shared/context/LanguageContext';
import { useState, useEffect } from 'react';

interface NarrationControlsProps {
  text: string;
  chapterId: number;
}

const NarrationControls: React.FC<NarrationControlsProps> = ({ text, chapterId }) => {
  const { language } = useLanguage();
  const narration = useNarration();
  const [isExpanded, setIsExpanded] = useState(false);

  // Stop narration when text changes (chapter change)
  useEffect(() => {
    narration.stop();
  }, [chapterId]);

  const handleSpeak = () => {
    if (narration.isPlaying) {
      narration.stop();
    } else {
      narration.speak(text, { language, rate: 0.9 });
    }
  };

  const handlePauseResume = () => {
    if (narration.isPaused) {
      narration.resume();
    } else {
      narration.pause();
    }
  };

  if (!narration.isSupported) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 right-6 z-40"
    >
      {/* Main Button */}
      <motion.button
        onClick={() => {
          if (!narration.isPlaying) {
            handleSpeak();
          }
          setIsExpanded(!isExpanded);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-white relative group"
        aria-label={narration.isPlaying ? 'Stop narration' : 'Start narration'}
      >
        {narration.isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {language === 'ko' ? '읽어주기' : 'Read Aloud'}
          <div className="absolute top-full right-4 border-4 border-transparent border-t-black" />
        </div>

        {/* Progress Ring */}
        {narration.isPlaying && (
          <svg className="absolute inset-0 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray={163}
              initial={{ strokeDashoffset: 163 }}
              animate={{ strokeDashoffset: 163 - (163 * narration.progress) / 100 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        )}
      </motion.button>

      {/* Expanded Controls */}
      <AnimatePresence>
        {isExpanded && narration.isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-4 min-w-[200px]"
          >
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{language === 'ko' ? '진행 중' : 'Playing'}</span>
                  <span>{Math.round(narration.progress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${narration.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePauseResume}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  {narration.isPaused ? (
                    <>
                      <Play className="w-4 h-4" />
                      <span className="text-sm">{language === 'ko' ? '재생' : 'Play'}</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="text-sm">{language === 'ko' ? '일시정지' : 'Pause'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    narration.stop();
                    narration.speak(text, { language, rate: 0.9 });
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    narration.stop();
                    setIsExpanded(false);
                  }}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NarrationControls;
