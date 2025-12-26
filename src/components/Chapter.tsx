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
            <div className="w-full md:w-2/5 min-h-[25vh] max-h-[30vh] md:min-h-full md:max-h-full md:h-full relative overflow-hidden flex-shrink-0">
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
                <div className="absolute top-[clamp(0.75rem,2vw,1.5rem)] left-[clamp(0.75rem,2vw,1.5rem)] z-20">
                    <div className="flex items-center gap-[clamp(0.375rem,1vw,0.5rem)] px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.375rem,1vw,0.625rem)] bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg backdrop-blur-sm">
                        <div className="w-[clamp(0.375rem,1vw,0.5rem)] h-[clamp(0.375rem,1vw,0.5rem)] bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold text-[clamp(0.75rem,2vw,1rem)] tracking-wide">Chapter {chapter.id}</span>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-3/5 h-full flex flex-col relative bg-gradient-to-br from-gray-50 to-white">
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,3vw,3.5rem)] scrollbar-thin">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        key={language}
                    >
                        <h1 className="font-bold mb-[clamp(1rem,3vw,2.5rem)] text-gray-900 leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
                            {title}
                        </h1>

                        <div className="space-y-[clamp(0.75rem,2vw,1.25rem)] leading-relaxed text-gray-700" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-left'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-[clamp(0.75rem,2vw,1.25rem)] border-l-4 border-indigo-400 italic text-gray-600 my-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] bg-indigo-50/50 pr-[clamp(0.75rem,2vw,1.25rem)] rounded-r-xl backdrop-blur-sm" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}>
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
                <div className="p-[clamp(0.75rem,2vw,1.5rem)] border-t border-gray-200/50 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between gap-2 relative z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`group flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)] px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.625rem,1.5vw,0.875rem)] rounded-xl transition-all duration-300 font-bold min-h-[44px] min-w-[44px]
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:-translate-x-0.5'
                            }`}
                        style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
                    >
                        <ArrowLeft className="transition-transform" style={{ width: 'clamp(1.25rem, 2.5vw, 1.5rem)', height: 'clamp(1.25rem, 2.5vw, 1.5rem)' }} />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Prev'}</span>
                    </button>

                    <div className="flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
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
                        <div className="flex items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] px-[clamp(0.625rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.625rem)] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full border border-indigo-100">
                            <span className="text-indigo-600 font-bold" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>{chapter.id}</span>
                            <span className="text-gray-400" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>/</span>
                            <span className="text-gray-500 font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>7</span>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`group flex items-center justify-center gap-[clamp(0.375rem,1vw,0.5rem)] px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.625rem,1.5vw,0.875rem)] rounded-xl transition-all duration-300 font-bold min-h-[44px] min-w-[44px]
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100/70'
                                : 'text-white bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30 hover:shadow-xl active:scale-95 hover:scale-[1.03] hover:translate-x-0.5'
                            }`}
                        style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
                    >
                        <span className="hidden sm:inline">{language === 'ko' ? '다음' : 'Next'}</span>
                        <ArrowRight className="transition-transform" style={{ width: 'clamp(1.25rem, 2.5vw, 1.5rem)', height: 'clamp(1.25rem, 2.5vw, 1.5rem)' }} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
