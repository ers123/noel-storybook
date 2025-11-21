import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Chapter from './Chapter';
import { story } from '../data/story';

const Book: React.FC = () => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

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

    return (
        <div className="min-h-screen bg-[#fdf6e3]">
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
        </div>
    );
};

export default Book;
