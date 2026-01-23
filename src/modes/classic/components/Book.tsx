import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, Trophy } from 'lucide-react';
import Chapter from './Chapter';
import BookLayout from './BookLayout';
import Menu from './Menu';
import ProgressBar from './ProgressBar';
import NarrationControls from './NarrationControls';
import AchievementToast from './AchievementToast';
import { story } from '../../../shared/data/story';
import { useLanguage } from '../../../shared/context/LanguageContext';
import {
  recordChapterRead,
  recordReadingSession,
  checkBilingualAchievement,
  getReadingProgress,
  type Achievement
} from '../utils/achievements';

const Book: React.FC = () => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    // Track reading session
    const sessionStartTime = useRef(Date.now());
    const chaptersReadThisSession = useRef(new Set<number>());

    // Record chapter read and check achievements
    useEffect(() => {
        const chapterId = story[currentChapterIndex].id;
        chaptersReadThisSession.current.add(chapterId);

        const { newAchievements } = recordChapterRead(chapterId);

        if (newAchievements.length > 0) {
            // Show first achievement
            setCurrentAchievement(newAchievements[0]);
            setTimeout(() => setCurrentAchievement(null), 5000);

            // Play achievement sound
            playSound('achievement');
        }
    }, [currentChapterIndex]);

    // Check bilingual achievement on language change
    useEffect(() => {
        const achievement = checkBilingualAchievement(language);
        if (achievement) {
            setCurrentAchievement(achievement);
            setTimeout(() => setCurrentAchievement(null), 5000);
            playSound('achievement');
        }
    }, [language]);

    // Record session on unmount
    useEffect(() => {
        return () => {
            const timeSpent = Math.floor((Date.now() - sessionStartTime.current) / 1000);
            recordReadingSession(chaptersReadThisSession.current.size, timeSpent);
        };
    }, []);

    // Simple sound effect system
    const playSound = (type: 'page' | 'achievement') => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (type === 'achievement') {
                // Happy melody
                [523.25, 659.25, 783.99].forEach((freq, i) => {
                    setTimeout(() => {
                        oscillator.frequency.value = freq;
                    }, i * 100);
                });
                oscillator.type = 'sine';
                gainNode.gain.value = 0.1;
            } else {
                // Page turn
                oscillator.frequency.value = 200;
                oscillator.type = 'sine';
                gainNode.gain.value = 0.05;
            }

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Silently fail if audio not supported
        }
    };

    const nextChapter = () => {
        if (currentChapterIndex < story.length - 1) {
            setCurrentChapterIndex(prev => prev + 1);
            window.scrollTo(0, 0);
            playSound('page');
        }
    };

    const prevChapter = () => {
        if (currentChapterIndex > 0) {
            setCurrentChapterIndex(prev => prev - 1);
            window.scrollTo(0, 0);
            playSound('page');
        }
    };

    const goToChapter = (index: number) => {
        setCurrentChapterIndex(index);
        window.scrollTo(0, 0);
        playSound('page');
    };

    return (
        <BookLayout>
            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                className="absolute top-3 right-[60px] md:top-4 md:right-[68px] z-50 px-2.5 py-2 md:px-3 md:py-2 bg-white/95 backdrop-blur-md rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] font-medium text-xs md:text-sm border border-gray-200 group min-h-[44px]"
                aria-label="Toggle Language"
            >
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="font-medium">{language === 'ko' ? 'EN' : 'KO'}</span>
                </span>
            </button>

            {/* Achievements Button */}
            <button
                onClick={() => setShowAchievements(!showAchievements)}
                className="absolute top-3 right-[120px] md:top-4 md:right-[136px] z-50 p-2.5 md:p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-white hover:from-yellow-500 hover:to-orange-500 active:scale-95 transition-all duration-200 shadow-sm hover:shadow min-h-[44px] min-w-[44px] group"
                aria-label="View Achievements"
                title={language === 'ko' ? '업적 보기' : 'View Achievements'}
            >
                <Trophy className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {Math.round(getReadingProgress() / 100 * 10)}
                </div>
            </button>

            {/* Menu Toggle Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2.5 md:p-3 bg-white/95 backdrop-blur-md rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] border border-gray-200 group min-h-[44px] min-w-[44px]"
                aria-label="Open Menu"
            >
                <MenuIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
            </button>

            {/* Navigation Menu */}
            <Menu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                currentChapterId={story[currentChapterIndex].id}
                onSelectChapter={goToChapter}
            />

            {/* Main Content Area */}
            <div className="w-full h-full relative">
                <AnimatePresence mode='wait'>
                    <Chapter
                        key={story[currentChapterIndex].id}
                        chapter={story[currentChapterIndex]}
                        onNext={nextChapter}
                        onPrev={prevChapter}
                        isFirst={currentChapterIndex === 0}
                        isLast={currentChapterIndex === story.length - 1}
                    />
                </AnimatePresence>

                {/* Progress Bar */}
                <ProgressBar
                    current={currentChapterIndex}
                    total={story.length}
                />
            </div>

            {/* Narration Controls */}
            <NarrationControls
                text={`${story[currentChapterIndex].title}. ${(language === 'ko' ? story[currentChapterIndex].content : story[currentChapterIndex].contentEn).join(' ')}`}
                chapterId={story[currentChapterIndex].id}
            />

            {/* Achievement Toast Notification */}
            <AchievementToast
                achievement={currentAchievement}
                onClose={() => setCurrentAchievement(null)}
            />
        </BookLayout>
    );
};

export default Book;
