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
            <div className="w-full md:w-2/5 h-80 md:h-full relative overflow-hidden">
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
                <div className="absolute top-6 left-6 z-20">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold text-sm tracking-wide">Chapter {chapter.id}</span>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-3/5 h-full flex flex-col relative bg-gradient-to-br from-gray-50 to-white">
                <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-14 scrollbar-thin">
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        key={language}
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 text-gray-900 leading-tight">
                            {title}
                        </h1>

                        <div className="space-y-5 text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-left'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-5 border-l-4 border-indigo-400 italic text-gray-600 my-6 py-3 bg-indigo-50/50 pr-5 rounded-r-xl text-base md:text-lg lg:text-xl backdrop-blur-sm">
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
                <div className="p-6 md:p-7 border-t border-gray-100 bg-white/80 backdrop-blur-sm flex items-center justify-between relative z-20">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-base
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                                : 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95 hover:scale-[1.02]'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Previous'}</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        i === chapter.id - 1
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 w-8'
                                            : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-500 font-semibold text-sm ml-2">
                            {chapter.id}/7
                        </span>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-base
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                                : 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95 hover:scale-[1.02]'
                            }`}
                    >
                        <span className="hidden sm:inline">{language === 'ko' ? '다음' : 'Next'}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
