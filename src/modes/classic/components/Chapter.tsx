import React from 'react';
import { motion } from 'framer-motion';
import type { Chapter as ChapterType } from '../../../shared/data/story';

import { useLanguage } from '../../../shared/context/LanguageContext';

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

    // Chapter-based theme colors
    const getChapterTheme = (chapterId: number) => {
        const themes = {
            1: { // Why Am I Like This? - Dark, lonely
                bg: 'from-slate-50/30 via-white to-gray-50/20',
                badge: 'border-slate-200 bg-white/90',
                badgeText: 'text-slate-600',
                underline: 'from-slate-400 via-gray-400 to-slate-400',
                quote: 'border-slate-300 bg-slate-50/50',
                highlight: 'bg-slate-200/70',
                nav: 'from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600',
                progress: 'bg-slate-400'
            },
            2: { // My Friend Lia - Warm, hopeful
                bg: 'from-orange-50/30 via-white to-amber-50/20',
                badge: 'border-orange-200 bg-white/90',
                badgeText: 'text-orange-600',
                underline: 'from-orange-400 via-amber-400 to-yellow-400',
                quote: 'border-orange-300 bg-orange-50/50',
                highlight: 'bg-orange-200/70',
                nav: 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
                progress: 'bg-orange-400'
            },
            3: { // Thank You Lia - Gratitude, joy
                bg: 'from-pink-50/30 via-white to-rose-50/20',
                badge: 'border-pink-200 bg-white/90',
                badgeText: 'text-pink-600',
                underline: 'from-pink-400 via-rose-400 to-pink-400',
                quote: 'border-pink-300 bg-pink-50/50',
                highlight: 'bg-pink-200/70',
                nav: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
                progress: 'bg-pink-400'
            },
            4: { // Why is Studying Hard - Growth, learning
                bg: 'from-emerald-50/30 via-white to-teal-50/20',
                badge: 'border-emerald-200 bg-white/90',
                badgeText: 'text-emerald-600',
                underline: 'from-emerald-400 via-teal-400 to-cyan-400',
                quote: 'border-emerald-300 bg-emerald-50/50',
                highlight: 'bg-emerald-200/70',
                nav: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
                progress: 'bg-emerald-400'
            },
            5: { // Door of Death - Mystery, courage
                bg: 'from-violet-50/30 via-white to-purple-50/20',
                badge: 'border-violet-200 bg-white/90',
                badgeText: 'text-violet-600',
                underline: 'from-violet-400 via-purple-400 to-indigo-400',
                quote: 'border-violet-300 bg-violet-50/50',
                highlight: 'bg-violet-200/70',
                nav: 'from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600',
                progress: 'bg-violet-400'
            },
            6: { // I'm Not Wrong - Self-acceptance, courage
                bg: 'from-blue-50/30 via-white to-indigo-50/20',
                badge: 'border-blue-200 bg-white/90',
                badgeText: 'text-blue-600',
                underline: 'from-blue-400 via-indigo-400 to-purple-400',
                quote: 'border-blue-300 bg-blue-50/50',
                highlight: 'bg-blue-200/70',
                nav: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
                progress: 'bg-blue-400'
            },
            7: { // Epilogue - Sunset, hope
                bg: 'from-red-50/30 via-orange-50/20 to-amber-50/20',
                badge: 'border-red-200 bg-white/90',
                badgeText: 'text-red-600',
                underline: 'from-red-400 via-orange-400 to-amber-400',
                quote: 'border-red-300 bg-red-50/50',
                highlight: 'bg-yellow-200/70',
                nav: 'from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
                progress: 'bg-red-400'
            }
        };
        return themes[chapterId as keyof typeof themes] || themes[1];
    };

    const theme = getChapterTheme(chapter.id);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.98 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.4 },
                scale: { duration: 0.5 }
            }}
            className="w-full h-full flex flex-col md:flex-row bg-white"
        >
            {/* Left Page: Image (Desktop) / Top (Mobile) */}
            <div className="w-full md:w-5/12 relative flex-shrink-0 bg-gray-100">
                <div className="relative w-full h-0" style={{ paddingBottom: '75%' }}>
                    <div className="absolute inset-0">
                        <motion.img
                            key={chapter.image}
                            initial={{ scale: 1.1, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1],
                                scale: { duration: 1, ease: "easeOut" }
                            }}
                            src={chapter.image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Chapter Number Badge */}
                    <motion.div
                        className="absolute top-4 left-4 md:top-6 md:left-6 z-20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                        }}
                    >
                        <div className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 backdrop-blur-sm rounded-full shadow-lg border-2 ${theme.badge}`}>
                            <span className="text-2xl">📖</span>
                            <span className={`font-bold text-sm md:text-base ${theme.badgeText}`}>Chapter {chapter.id}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Page: Content (Desktop) / Bottom (Mobile) */}
            <div className={`w-full md:w-7/12 h-full flex flex-col relative bg-gradient-to-br ${theme.bg}`}>
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                    <div className="max-w-[650px] mx-auto px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            key={language}
                        >
                            <h1 className="font-bold mb-8 md:mb-10 text-gray-900 leading-tight relative inline-block" style={{ fontSize: 'clamp(1.875rem, 5vw, 2.5rem)' }}>
                                {title}
                                <motion.div
                                    className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${theme.underline} rounded-full`}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                    style={{ transformOrigin: "left" }}
                                ></motion.div>
                            </h1>

                            <div className="prose-custom space-y-6">
                            {content.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                    className={paragraph.startsWith('>') ? 'quote-block' : 'body-paragraph'}
                                    style={{ marginBottom: '1.5em', lineHeight: '1.85' }}
                                >
                                    {paragraph.startsWith('>') ? (
                                        <span className={`block pl-6 border-l-4 ${theme.quote} italic text-gray-700 py-4 pr-6 rounded-r-xl shadow-sm`} style={{ fontSize: '1em', lineHeight: '1.75' }}>
                                            💭 {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ?
                                            <mark key={i} className={`${theme.highlight} px-1 py-0.5 rounded font-semibold text-gray-900`}>{part}</mark> :
                                            part
                                        )
                                    )}
                                </motion.p>
                            ))}
                        </div>

                        {/* End of Chapter Decoration */}
                        <motion.div
                            className="flex flex-col items-center gap-4 mt-20 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.span
                                    className="text-3xl"
                                    animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
                                    transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                                >⭐</motion.span>
                                <span className="text-sm font-medium text-gray-500">Chapter Complete</span>
                                <motion.span
                                    className="text-3xl"
                                    animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.2, 1] }}
                                    transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                                >⭐</motion.span>
                            </div>
                            <div className="flex gap-2">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            i < chapter.id ? theme.progress : 'bg-gray-200'
                                        }`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: 1 + (i * 0.08),
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className={`border-t-2 ${theme.badge.split(' ')[0]} bg-gradient-to-r from-white via-${theme.badgeText.split('-')[1]}-50/30 to-white relative z-20`}>
                    <div className="max-w-[650px] mx-auto px-6 py-5 md:px-10 md:py-6 flex items-center justify-between">
                        <button
                            onClick={onPrev}
                            disabled={isFirst}
                            className={`group flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 font-bold text-sm min-h-[48px] shadow-md hover:shadow-lg
                                ${isFirst
                                    ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                    : `text-white bg-gradient-to-r ${theme.nav} active:scale-95 hover:scale-105`
                                }`}
                        >
                            <span className="text-xl">👈</span>
                            <span>{language === 'ko' ? '이전' : 'Previous'}</span>
                        </button>

                        <div className="flex flex-col items-center">
                            <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border-2 ${theme.badge.split(' ')[0]}`}>
                                <span className="text-xl">📖</span>
                                <span className={`text-sm font-bold ${theme.badgeText}`}>
                                    {chapter.id} / 7
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onNext}
                            disabled={isLast}
                            className={`group flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 font-bold text-sm min-h-[48px] shadow-md hover:shadow-lg
                                ${isLast
                                    ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                                    : `text-white bg-gradient-to-r ${theme.nav} active:scale-95 hover:scale-105`
                                }`}
                        >
                            <span>{language === 'ko' ? '다음' : 'Next'}</span>
                            <span className="text-xl">👉</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
