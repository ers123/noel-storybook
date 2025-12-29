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
            <div className="w-full md:w-2/5 h-[28vh] md:h-full relative overflow-hidden flex-shrink-0">
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
                    <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold text-xs md:text-sm tracking-wide">Chapter {chapter.id}</span>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-3/5 h-full flex flex-col relative bg-white">
                <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 md:py-8 lg:px-14 lg:py-10 scrollbar-thin">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        key={language}
                    >
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-6 lg:mb-8 text-gray-900 leading-tight">
                            {title}
                        </h1>

                        <div className="space-y-4 md:space-y-5 text-base md:text-lg lg:text-xl leading-loose text-gray-800">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-left'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-4 md:pl-5 border-l-4 border-amber-400 italic text-gray-600 my-5 md:my-6 py-3 md:py-3.5 bg-amber-50/50 pr-4 md:pr-5 rounded-r-xl text-sm md:text-base lg:text-lg backdrop-blur-sm leading-loose">
                                            {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i} className="font-bold text-amber-700">{part}</strong> : part
                                        )
                                    )}
                                </p>
                            ))}
                        </div>

                        {/* End of Chapter Decoration */}
                        <div className="flex justify-center my-12 md:my-10">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Footer */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-t border-gray-200 bg-white flex items-center justify-between gap-2 relative z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`group flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl transition-all duration-300 font-semibold text-sm md:text-base min-h-[44px] min-w-[44px]
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 hover:from-amber-500 hover:via-orange-600 hover:to-orange-700 shadow-md hover:shadow-amber-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:-translate-x-0.5'
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
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                        i === chapter.id - 1
                                            ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 w-10 shadow-md shadow-amber-300/50'
                                            : i < chapter.id - 1
                                            ? 'bg-gradient-to-r from-amber-300 to-orange-300 w-2'
                                            : 'bg-gray-200 w-2'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full border border-amber-200">
                            <span className="text-amber-700 font-bold text-sm md:text-base">{chapter.id}</span>
                            <span className="text-gray-400 text-xs">/</span>
                            <span className="text-gray-500 font-medium text-sm md:text-base">7</span>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`group flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl transition-all duration-300 font-semibold text-sm md:text-base min-h-[44px] min-w-[44px]
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 hover:from-amber-500 hover:via-orange-600 hover:to-orange-700 shadow-md hover:shadow-amber-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:translate-x-0.5'
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
