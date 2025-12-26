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
                        className="fixed top-0 left-0 bottom-0 bg-white z-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col"
                        style={{ width: 'clamp(280px, 85vw, 400px)' }}
                    >
                        <div className="flex items-center justify-between bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 relative overflow-hidden" style={{ padding: 'clamp(1rem, 3vw, 1.75rem)' }}>
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                            <h2 className="font-bold text-white flex items-center gap-[clamp(0.5rem,2vw,0.75rem)] relative z-10" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
                                <div className="bg-white/20 rounded-xl backdrop-blur-sm" style={{ padding: 'clamp(0.375rem, 1vw, 0.5rem)' }}>
                                    <BookOpen style={{ width: 'clamp(1.25rem, 3vw, 1.5rem)', height: 'clamp(1.25rem, 3vw, 1.5rem)' }} />
                                </div>
                                {language === 'ko' ? '목차' : 'Contents'}
                            </h2>
                            <button onClick={onClose} className="hover:bg-white/20 rounded-xl transition-all hover:scale-110 active:scale-95 relative z-10 backdrop-blur-sm min-h-[44px] min-w-[44px]" style={{ padding: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                                <X style={{ width: 'clamp(1.25rem, 3vw, 1.75rem)', height: 'clamp(1.25rem, 3vw, 1.75rem)' }} className="text-white" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-1">
                            {story.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => {
                                        onSelectChapter(index);
                                        onClose();
                                    }}
                                    className={`group w-full text-left transition-all duration-300 border-b border-gray-100/50 last:border-0 relative
                    ${chapter.id === currentChapterId
                                            ? 'bg-gradient-to-r from-indigo-50 via-purple-50/50 to-white text-indigo-600 font-semibold shadow-sm'
                                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white'
                                        }`}
                                    style={{
                                        padding: 'clamp(0.875rem, 2.5vw, 1.25rem) clamp(0.75rem, 2vw, 1.25rem)',
                                        minHeight: 'clamp(60px, 15vw, 68px)'
                                    }}
                                >
                                    {chapter.id === currentChapterId && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-purple-600 rounded-r-full"></div>
                                    )}
                                    <div className="flex items-center ml-1" style={{ gap: 'clamp(0.625rem, 2vw, 1rem)' }}>
                                        <div
                                            className={`flex-shrink-0 rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${
                                                chapter.id === currentChapterId
                                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-300/50'
                                                    : 'bg-gray-100 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-indigo-400 group-hover:to-purple-500 group-hover:text-white'
                                            }`}
                                            style={{
                                                width: 'clamp(2.5rem, 6vw, 2.75rem)',
                                                height: 'clamp(2.5rem, 6vw, 2.75rem)',
                                                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                                            }}
                                        >
                                            {chapter.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={`font-semibold uppercase tracking-wider mb-0.5 transition-colors ${
                                                    chapter.id === currentChapterId ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-400'
                                                }`}
                                                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                                            >
                                                Chapter {chapter.id}
                                            </div>
                                            <div className="leading-snug truncate" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                                                {language === 'ko' ? chapter.title : chapter.titleEn}
                                            </div>
                                        </div>
                                        {chapter.id === currentChapterId && (
                                            <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-5 md:p-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                            <p className="text-center text-sm text-gray-600 font-medium italic relative z-10">
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
