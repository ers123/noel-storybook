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
                className="absolute top-4 right-20 z-50 px-4 py-3 bg-[#fdf6e3]/90 backdrop-blur-sm rounded-full text-[#5c4b51] hover:bg-[#e6dcc3] hover:text-[#2c2420] transition-all shadow-md hover:shadow-lg hover:scale-110 active:scale-95 font-serif font-bold text-base"
                aria-label="Toggle Language"
            >
                {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Menu Toggle Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="absolute top-4 right-4 z-50 p-3 bg-[#fdf6e3]/90 backdrop-blur-sm rounded-full text-[#5c4b51] hover:bg-[#e6dcc3] hover:text-[#2c2420] transition-all shadow-md hover:shadow-lg hover:scale-110 active:scale-95"
                aria-label="Open Menu"
            >
                <MenuIcon className="w-6 h-6" />
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
