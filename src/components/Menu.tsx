import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { story } from '../data/story';

import { useLanguage } from '../context/LanguageContext';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentChapterId: number;
    onSelectChapter: (index: number) => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, currentChapterId, onSelectChapter }) => {
    const { language } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 left-0 bottom-0 w-[300px] md:w-80 bg-white z-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col"
                    >
                        <div className="p-5 md:p-6 flex items-center justify-between bg-white relative overflow-hidden border-b border-gray-200">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center gap-2.5 relative z-10">
                                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                                {language === 'ko' ? '목차' : 'Contents'}
                            </h2>
                            <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] relative z-10 min-h-[44px] min-w-[44px]">
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-2">
                            {story.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => {
                                        onSelectChapter(index);
                                        onClose();
                                    }}
                                    className={`group w-full text-left px-4 md:px-5 py-4 md:py-5 transition-all duration-200 border-b border-gray-100 last:border-0 relative min-h-[68px]
                    ${chapter.id === currentChapterId
                                            ? 'bg-gray-50 text-gray-900 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {chapter.id === currentChapterId && (
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-900"></div>
                                    )}
                                    <div className="flex items-center gap-3 md:gap-3.5">
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-200 ${
                                                chapter.id === currentChapterId
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                            }`}
                                        >
                                            {chapter.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={`text-[10px] md:text-xs font-medium uppercase tracking-wider mb-1 transition-colors ${
                                                    chapter.id === currentChapterId ? 'text-gray-600' : 'text-gray-400'
                                                }`}
                                            >
                                                Chapter {chapter.id}
                                            </div>
                                            <div className="text-sm md:text-base leading-snug truncate font-medium">
                                                {language === 'ko' ? chapter.title : chapter.titleEn}
                                            </div>
                                        </div>
                                        {chapter.id === currentChapterId && (
                                            <div className="flex-shrink-0 w-2 h-2 bg-gray-900 rounded-full"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-7 border-t border-gray-200 bg-gray-50 relative overflow-hidden">
                            <p className="text-center text-sm md:text-base text-gray-600 font-medium italic relative z-10 leading-relaxed">
                                {language === 'ko' ? '"나는 틀린 게 아니고 다른 거야."' : '"I am not wrong, just different."'}
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Menu;
