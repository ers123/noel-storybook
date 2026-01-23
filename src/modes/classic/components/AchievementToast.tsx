import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../shared/context/LanguageContext';
import type { Achievement } from '../utils/achievements';
import { getRarityColor } from '../utils/achievements';
import { Sparkles } from 'lucide-react';

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  const { language } = useLanguage();

  if (!achievement) return null;

  const title = language === 'ko' ? achievement.title : achievement.titleEn;
  const description = language === 'ko' ? achievement.description : achievement.descriptionEn;

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.3 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-full px-4"
        >
          <div className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} p-1 rounded-2xl shadow-2xl`}>
            <div className="bg-white rounded-xl p-5 relative overflow-hidden">
              {/* Confetti Background */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                    initial={{
                      x: Math.random() * 300,
                      y: -10,
                      opacity: 1,
                      scale: Math.random() * 1.5
                    }}
                    animate={{
                      y: 400,
                      opacity: 0,
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                    className="text-4xl"
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        {language === 'ko' ? '업적 달성!' : 'Achievement Unlocked!'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">{description}</p>

                {/* Rarity Badge */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white text-xs font-bold rounded-full`}>
                    <span className="capitalize">{achievement.rarity}</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {language === 'ko' ? '닫기' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
