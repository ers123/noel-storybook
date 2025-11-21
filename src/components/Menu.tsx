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
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-80 bg-[#fdf6e3] z-50 shadow-2xl border-r border-[#e6dcc3] flex flex-col"
                    >
                        <div className="p-6 border-b border-[#e6dcc3] flex items-center justify-between bg-[#f0e6d2]">
                            <h2 className="text-2xl font-bold text-[#2c2420] font-serif flex items-center gap-2">
                                <BookOpen className="w-6 h-6" />
                                {language === 'ko' ? '목차' : 'Table of Contents'}
                            </h2>
                            <button onClick={onClose} className="p-3 hover:bg-[#e6dcc3] rounded-full transition-all hover:scale-110 active:scale-95">
                                <X className="w-6 h-6 text-[#5c4b51]" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            {story.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => {
                                        onSelectChapter(index);
                                        onClose();
                                    }}
                                    className={`w-full text-left px-6 py-5 transition-all font-serif border-b border-[#f0e6d2] last:border-0 hover:scale-[1.02] active:scale-[0.98]
                    ${chapter.id === currentChapterId
                                            ? 'bg-[#f0e6d2] text-[#b45309] font-bold border-l-4 border-l-[#b45309] shadow-sm'
                                            : 'text-[#5c4b51] hover:bg-[#fcfaf5] hover:text-[#2c2420]'
                                        }`}
                                >
                                    <div className="text-sm uppercase tracking-wider mb-1 opacity-70">Chapter {chapter.id}</div>
                                    <div className="text-xl leading-tight">{language === 'ko' ? chapter.title : chapter.titleEn}</div>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 border-t border-[#e6dcc3] bg-[#f0e6d2] text-center text-sm text-[#5c4b51]/70 font-serif italic">
                            {language === 'ko' ? '"나는 틀린 게 아니고 다른 거야."' : '"I am not wrong, just different."'}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Menu;
