import React from 'react';
import { motion } from 'framer-motion';
import type { Chapter as ChapterType } from '../data/story';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface ChapterProps {
    chapter: ChapterType;
    onNext: () => void;
    onPrev: () => void;
    isFirst: boolean;
    isLast: boolean;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, onNext, onPrev, isFirst, isLast }) => {
    const { language } = useLanguage();
    const title = language === 'ko' ? chapter.title : chapter.titleEn;
    const content = language === 'ko' ? chapter.content : chapter.contentEn;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full flex flex-col md:flex-row bg-white"
        >
            {/* Left Page: Image (Desktop) / Top (Mobile) */}
            <div className="w-full md:w-5/12 h-[30vh] md:h-full relative overflow-hidden flex-shrink-0">
                <motion.img
                    key={chapter.image}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={chapter.image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Chapter Number Badge */}
                <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-gray-900/75 text-white rounded-lg shadow-lg backdrop-blur-sm">
                        <span className="font-medium text-xs md:text-sm tracking-wide">Chapter {chapter.id}</span>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-7/12 h-full flex flex-col relative bg-white">
                <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 md:py-8 lg:px-14 lg:py-10 scrollbar-thin flex items-start justify-center">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        key={language}
                        className="w-full max-w-[65ch]"
                    >
                        <h1 className="font-bold mb-5 md:mb-6 lg:mb-8 text-gray-900 leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 2.5rem)' }}>
                            {title}
                        </h1>

                        <div className="text-gray-800" style={{ fontSize: 'clamp(1rem, 1vw + 0.75rem, 1.25rem)', lineHeight: '1.7' }}>
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? 'my-6' : 'mb-5'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-5 border-l-3 border-gray-300 italic text-gray-600 py-2 bg-gray-50/80 pr-5 rounded-r" style={{ fontSize: 'clamp(0.9rem, 1vw + 0.65rem, 1.1rem)', lineHeight: '1.6' }}>
                                            {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
                                        )
                                    )}
                                </p>
                            ))}
                        </div>

                        {/* End of Chapter Decoration */}
                        <div className="flex justify-center my-12 md:my-14">
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Footer */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-t border-gray-200 bg-white flex items-center justify-between gap-2 relative z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`group flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base min-h-[44px] min-w-[44px]
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                : 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform" />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Prev'}</span>
                    </button>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden md:flex gap-2">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        i === chapter.id - 1
                                            ? 'bg-gray-700 w-10'
                                            : i < chapter.id - 1
                                            ? 'bg-gray-400 w-2'
                                            : 'bg-gray-200 w-2'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1.5 md:px-3.5 md:py-2 bg-gray-100 rounded-full">
                            <span className="text-gray-900 font-semibold text-sm md:text-base">{chapter.id}</span>
                            <span className="text-gray-400 text-xs">/</span>
                            <span className="text-gray-600 font-medium text-sm md:text-base">7</span>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`group flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-4 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-base min-h-[44px] min-w-[44px]
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                : 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        <span className="hidden sm:inline">{language === 'ko' ? '다음' : 'Next'}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
