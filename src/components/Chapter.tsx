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
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-[#e6dcc3]">
                <div className="absolute inset-0 bg-black/10 z-10 md:hidden"></div> {/* Mobile overlay for text contrast if needed, but we are splitting */}
                <motion.img
                    key={chapter.image}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={chapter.image}
                    alt={title}
                    className="w-full h-full object-cover sepia-[0.2]"
                />
                {/* Chapter Number Overlay */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2c2420] font-serif text-sm font-bold tracking-widest uppercase rounded shadow-sm">
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
                        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#2c2420] font-serif leading-tight">
                            {title}
                        </h1>

                        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[#5c4b51] font-serif">
                            {content.map((paragraph, index) => (
                                <p key={index} className={paragraph.startsWith('>') ? '' : 'text-justify'}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-6 border-l-4 border-[#d97706] italic text-[#8c7b75] my-6 py-1 bg-[#fcfaf5] pr-4 rounded-r-lg">
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
                <div className="p-6 border-t border-[#e6dcc3] bg-[#fcfaf5] flex items-center justify-between relative z-20">
                    <button
                        onClick={onPrev}
                        disabled={isFirst}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-serif font-medium
                            ${isFirst
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-[#5c4b51] hover:bg-[#f0e6d2] hover:text-[#2c2420] active:scale-95'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">{language === 'ko' ? '이전' : 'Previous'}</span>
                    </button>

                    <span className="text-[#b45309] font-serif font-bold text-sm tracking-widest">
                        {chapter.id} <span className="text-[#e6dcc3] mx-2">/</span> 7
                    </span>

                    <button
                        onClick={onNext}
                        disabled={isLast}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-serif font-medium
                            ${isLast
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-[#5c4b51] hover:bg-[#f0e6d2] hover:text-[#2c2420] active:scale-95'
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
