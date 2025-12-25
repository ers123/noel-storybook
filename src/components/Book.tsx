import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon } from 'lucide-react';
import Chapter from './Chapter';
import BookLayout from './BookLayout';
import Menu from './Menu';
import ProgressBar from './ProgressBar';
import { story } from '../data/story';

import { useLanguage } from '../context/LanguageContext';

const Book: React.FC = () => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const nextChapter = () => {
        if (currentChapterIndex < story.length - 1) {
            setCurrentChapterIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevChapter = () => {
        if (currentChapterIndex > 0) {
            setCurrentChapterIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const goToChapter = (index: number) => {
        setCurrentChapterIndex(index);
        window.scrollTo(0, 0);
    };

    return (
        <BookLayout>
            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                className="absolute top-3 right-14 sm:top-4 sm:right-16 md:top-5 md:right-20 z-50 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md rounded-xl text-gray-700 hover:bg-gradient-to-br hover:from-indigo-500 hover:via-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:shadow-lg hover:scale-105 active:scale-95 font-bold text-xs sm:text-sm md:text-base border border-gray-200/50 hover:border-transparent group min-h-[44px] sm:min-h-[48px]"
                aria-label="Toggle Language"
            >
                <span className="flex items-center gap-1 sm:gap-1.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-xs sm:text-sm font-bold">{language === 'ko' ? 'EN' : 'KO'}</span>
                </span>
            </button>

            {/* Menu Toggle Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-50 p-2.5 sm:p-3 md:p-3.5 bg-white/95 backdrop-blur-md rounded-xl text-gray-700 hover:bg-gradient-to-br hover:from-indigo-500 hover:via-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:shadow-lg hover:scale-105 active:scale-95 border border-gray-200/50 hover:border-transparent group min-h-[44px] min-w-[44px] sm:min-h-[48px] sm:min-w-[48px]"
                aria-label="Open Menu"
            >
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
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
        </BookLayout>
    );
};

export default Book;
