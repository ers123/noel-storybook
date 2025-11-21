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
                        className="fixed top-0 left-0 bottom-0 w-80 md:w-96 bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-7 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <BookOpen className="w-7 h-7" />
                                {language === 'ko' ? '목차' : 'Contents'}
                            </h2>
                            <button onClick={onClose} className="p-2.5 hover:bg-white/20 rounded-xl transition-all hover:scale-110 active:scale-95">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-3">
                            {story.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => {
                                        onSelectChapter(index);
                                        onClose();
                                    }}
                                    className={`w-full text-left px-6 py-5 transition-all duration-300 border-b border-gray-100 last:border-0 hover:translate-x-1
                    ${chapter.id === currentChapterId
                                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-semibold border-l-4 border-l-indigo-500'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-60">Chapter {chapter.id}</div>
                                    <div className="text-lg leading-tight">{language === 'ko' ? chapter.title : chapter.titleEn}</div>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <p className="text-center text-sm text-gray-500 font-medium italic">
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
