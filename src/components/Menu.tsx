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
                        <div className="p-5 md:p-6 flex items-center justify-between bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden border-b border-amber-200/50">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2.5 relative z-10">
                                <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm shadow-sm">
                                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                                </div>
                                {language === 'ko' ? '목차' : 'Contents'}
                            </h2>
                            <button onClick={onClose} className="p-2.5 hover:bg-white/60 rounded-lg transition-all hover:scale-110 active:scale-95 relative z-10 backdrop-blur-sm min-h-[44px] min-w-[44px] shadow-sm">
                                <X className="w-6 h-6 text-gray-700" />
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
                                    className={`group w-full text-left px-4 md:px-5 py-4 md:py-5 transition-all duration-300 border-b border-gray-100/50 last:border-0 relative min-h-[68px]
                    ${chapter.id === currentChapterId
                                            ? 'bg-gradient-to-r from-amber-50 via-orange-50/50 to-white text-amber-700 font-semibold shadow-sm'
                                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-white'
                                        }`}
                                >
                                    {chapter.id === currentChapterId && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 rounded-r-full"></div>
                                    )}
                                    <div className="flex items-center gap-3 md:gap-3.5">
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                                                chapter.id === currentChapterId
                                                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-300/50'
                                                    : 'bg-gray-100 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-amber-300 group-hover:to-orange-400 group-hover:text-white'
                                            }`}
                                        >
                                            {chapter.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
                                                    chapter.id === currentChapterId ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-500'
                                                }`}
                                            >
                                                Chapter {chapter.id}
                                            </div>
                                            <div className="text-sm md:text-base leading-snug truncate font-medium">
                                                {language === 'ko' ? chapter.title : chapter.titleEn}
                                            </div>
                                        </div>
                                        {chapter.id === currentChapterId && (
                                            <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-7 border-t border-amber-100 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5"></div>
                            <p className="text-center text-sm md:text-base text-gray-700 font-medium italic relative z-10 leading-relaxed">
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
