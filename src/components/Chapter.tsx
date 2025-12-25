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
            <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-full relative overflow-hidden flex-shrink-0">
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
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide">Chapter {chapter.id}</span>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-3/5 h-full flex flex-col relative bg-gradient-to-br from-gray-50 to-white">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 lg:p-14 scrollbar-thin">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        key={language}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-10 text-gray-900 leading-tight">
                            {title}
                        </h1>

                        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-left'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-3 sm:pl-4 md:pl-5 border-l-4 border-indigo-400 italic text-gray-600 my-4 sm:my-5 md:my-6 py-2 sm:py-2.5 md:py-3 bg-indigo-50/50 pr-3 sm:pr-4 md:pr-5 rounded-r-xl text-base sm:text-lg md:text-xl backdrop-blur-sm">
                                            {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i} className="font-bold text-indigo-600">{part}</strong> : part
                                        )
                                    )}
                                </p>
                            ))}
                        </div>

                        {/* End of Chapter Decoration */}
                        <div className="flex justify-center my-10">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Footer */}
                <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200/50 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between gap-2 relative z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-xl transition-all duration-300 font-bold text-sm sm:text-base md:text-lg min-h-[48px] min-w-[48px]
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:-translate-x-0.5'
                            }`}
                    >
                        <ArrowLeft className={`w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform ${!isFirst && 'group-hover:-translate-x-1'}`} />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Prev'}</span>
                    </button>

                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        <div className="hidden md:flex gap-2">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        i === chapter.id - 1
                                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 w-10 shadow-md shadow-indigo-300/50'
                                            : i < chapter.id - 1
                                            ? 'bg-gradient-to-r from-indigo-300 to-purple-300 w-2'
                                            : 'bg-gray-200 w-2'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full border border-indigo-100">
                            <span className="text-indigo-600 font-bold text-base sm:text-lg md:text-xl">{chapter.id}</span>
                            <span className="text-gray-400 text-xs sm:text-sm">/</span>
                            <span className="text-gray-500 font-medium text-base sm:text-lg md:text-xl">7</span>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-xl transition-all duration-300 font-bold text-sm sm:text-base md:text-lg min-h-[48px] min-w-[48px]
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:translate-x-0.5'
                            }`}
                    >
                        <span className="hidden sm:inline">{language === 'ko' ? '다음' : 'Next'}</span>
                        <ArrowRight className={`w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform ${!isLast && 'group-hover:translate-x-1'}`} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
