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
            <div className="w-full md:w-5/12 relative overflow-hidden flex-shrink-0">
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    <motion.img
                        key={chapter.image}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        src={chapter.image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Chapter Number Badge */}
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-gray-900/75 text-white rounded-lg shadow-lg backdrop-blur-sm">
                            <span className="font-medium text-xs md:text-sm tracking-wide">Chapter {chapter.id}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-7/12 h-full flex flex-col relative bg-white">
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                    <div className="max-w-[680px] mx-auto px-8 py-8 md:px-12 md:py-10 lg:px-14 lg:py-12">
                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            key={language}
                        >
                            <h1 className="font-bold mb-6 md:mb-8 text-gray-900" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', lineHeight: '1.2' }}>
                                {title}
                            </h1>

                            <div className="prose-custom">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? 'quote-block' : 'body-paragraph'} style={{ marginBottom: '1em' }}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-5 border-l-2 border-gray-300 italic text-gray-600 py-3 bg-gray-50 pr-5" style={{ fontSize: '0.95em', lineHeight: '1.6', marginTop: '1.5em', marginBottom: '1.5em' }}>
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
                        <div className="flex justify-center mt-16 mb-8">
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-200 bg-white relative z-20">
                    <div className="max-w-[680px] mx-auto px-8 py-4 md:px-12 md:py-5 flex items-center justify-between">
                        <button
                            onClick={onPrev}
                            disabled={isFirst}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm min-h-[44px]
                                ${isFirst
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{language === 'ko' ? '이전' : 'Previous'}</span>
                        </button>

                        <div className="text-sm text-gray-500 font-medium">
                            Chapter {chapter.id} / 7
                        </div>

                        <button
                            onClick={onNext}
                            disabled={isLast}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm min-h-[44px]
                                ${isLast
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                                }`}
                        >
                            <span>{language === 'ko' ? '다음' : 'Next'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
