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
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full flex flex-col md:flex-row bg-[#fdf6e3]"
        >
            {/* Left Page: Image (Desktop) / Top (Mobile) */}
            <div className="w-full md:w-1/2 h-80 md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-[#e6dcc3]">
                <div className="absolute inset-0 bg-black/5 z-10 md:hidden"></div> {/* Mobile overlay for text contrast if needed, but we are splitting */}
                <motion.img
                    key={chapter.image}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={chapter.image}
                    alt={title}
                    className="w-full h-full object-cover sepia-[0.15]"
                />
                {/* Chapter Number Overlay */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="inline-block px-4 py-2 bg-[#d97706] text-white font-serif text-base md:text-lg font-bold tracking-wider uppercase rounded-lg shadow-lg">
                        Chapter {chapter.id}
                    </span>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className="w-full md:w-1/2 h-full flex flex-col relative">
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 scrollbar-thin scrollbar-thumb-[#d6cbb3] scrollbar-track-transparent">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        key={language} // Re-animate on language change
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-[#2c2420] font-serif leading-tight">
                            {title}
                        </h1>

                        <div className="space-y-7 text-xl md:text-2xl leading-loose text-[#3d3028] font-serif">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-left'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-6 border-l-4 border-[#d97706] italic text-[#6b5d52] my-8 py-2 bg-[#fcfaf5] pr-4 rounded-r-lg text-lg md:text-xl">
                                            {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i} className="font-bold text-[#b45309]">{part}</strong> : part
                                        )
                                    )}
                                </p>
                            ))}
                        </div>

                        {/* End of Chapter Decoration */}
                        <div className="flex justify-center my-12 opacity-30">
                            <div className="w-16 h-1 bg-[#2c2420] rounded-full"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Footer */}
                <div className="p-6 md:p-8 border-t border-[#e6dcc3] bg-[#fcfaf5] flex items-center justify-between relative z-20">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-full transition-all font-serif font-medium text-base md:text-lg shadow-sm
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                : 'text-[#5c4b51] bg-white hover:bg-[#f0e6d2] hover:text-[#2c2420] hover:shadow-md active:scale-95 hover:scale-105'
                            }`}
                    >
                        <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Previous'}</span>
                    </button>

                    <span className="text-[#b45309] font-serif font-bold text-base md:text-lg tracking-widest bg-[#fdf6e3] px-4 py-2 rounded-full shadow-sm">
                        {chapter.id} <span className="text-[#d97706] mx-2">/</span> 7
                    </span>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-full transition-all font-serif font-medium text-base md:text-lg shadow-sm
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                : 'text-[#5c4b51] bg-white hover:bg-[#f0e6d2] hover:text-[#2c2420] hover:shadow-md active:scale-95 hover:scale-105'
                            }`}
                    >
                        <span className="hidden sm:inline">{language === 'ko' ? '다음' : 'Next'}</span>
                        <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
