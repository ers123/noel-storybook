import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Chapter as ChapterType, Choice } from '../data/story';

import { useLanguage } from '../context/LanguageContext';

interface ChapterProps {
    chapter: ChapterType;
    onNext: () => void;
    onPrev: () => void;
    isFirst: boolean;
    isLast: boolean;
    totalChapters: number;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, onNext, onPrev, isFirst, isLast, totalChapters }) => {
    const { language } = useLanguage();
    const title = language === 'ko' ? chapter.title : chapter.titleEn;
    const content = language === 'ko' ? chapter.content : chapter.contentEn;
    const question = language === 'ko' ? chapter.question : chapter.questionEn;
    const reflectionQuestion = language === 'ko'
        ? chapter.reflectionQuestion ?? '왜 그 선택을 했어?'
        : chapter.reflectionQuestionEn ?? 'Why did you choose that?';

    const [selectedChoice, setSelectedChoice] = useState<Choice['id'] | null>(null);
    const [showAiContinuation, setShowAiContinuation] = useState(false);
    const [reflectionText, setReflectionText] = useState('');

    const choices = useMemo(() => (
        language === 'ko'
            ? chapter.choices.map(choice => ({ ...choice, label: choice.text }))
            : chapter.choices.map(choice => ({ ...choice, label: choice.textEn }))
    ), [chapter.choices, language]);

    const aiContinuation = language === 'ko' ? chapter.aiContinuation : chapter.aiContinuationEn;

    const handleChoiceSelect = (choiceId: Choice['id']) => {
        setSelectedChoice(choiceId);
    };

    const handleSkipQuestion = () => {
        setSelectedChoice(null);
    };

    const getChapterTheme = (chapterId: number) => {
        const themes = {
            1: {
                bg: 'from-slate-50/30 via-white to-gray-50/20',
                badge: 'border-slate-200 bg-white/90',
                badgeText: 'text-slate-600',
                underline: 'from-slate-400 via-gray-400 to-slate-400',
                quote: 'border-slate-300 bg-slate-50/50',
                highlight: 'bg-slate-200/70',
                nav: 'from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600',
                progress: 'bg-slate-400',
                card: 'border-slate-200/70 bg-white/90'
            },
            2: {
                bg: 'from-orange-50/30 via-white to-amber-50/20',
                badge: 'border-orange-200 bg-white/90',
                badgeText: 'text-orange-600',
                underline: 'from-orange-400 via-amber-400 to-yellow-400',
                quote: 'border-orange-300 bg-orange-50/50',
                highlight: 'bg-orange-200/70',
                nav: 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
                progress: 'bg-orange-400',
                card: 'border-orange-200/70 bg-white/90'
            },
            3: {
                bg: 'from-pink-50/30 via-white to-rose-50/20',
                badge: 'border-pink-200 bg-white/90',
                badgeText: 'text-pink-600',
                underline: 'from-pink-400 via-rose-400 to-pink-400',
                quote: 'border-pink-300 bg-pink-50/50',
                highlight: 'bg-pink-200/70',
                nav: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
                progress: 'bg-pink-400',
                card: 'border-pink-200/70 bg-white/90'
            },
            4: {
                bg: 'from-emerald-50/30 via-white to-teal-50/20',
                badge: 'border-emerald-200 bg-white/90',
                badgeText: 'text-emerald-600',
                underline: 'from-emerald-400 via-teal-400 to-cyan-400',
                quote: 'border-emerald-300 bg-emerald-50/50',
                highlight: 'bg-emerald-200/70',
                nav: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
                progress: 'bg-emerald-400',
                card: 'border-emerald-200/70 bg-white/90'
            },
            5: {
                bg: 'from-violet-50/30 via-white to-purple-50/20',
                badge: 'border-violet-200 bg-white/90',
                badgeText: 'text-violet-600',
                underline: 'from-violet-400 via-purple-400 to-indigo-400',
                quote: 'border-violet-300 bg-violet-50/50',
                highlight: 'bg-violet-200/70',
                nav: 'from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600',
                progress: 'bg-violet-400',
                card: 'border-violet-200/70 bg-white/90'
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
                                scale: { duration: 1, ease: 'easeOut' }
                            }}
                            src={chapter.image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.div
                        className="absolute top-4 left-4 md:top-6 md:left-6 z-20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                        }}
                    >
                        <div className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 backdrop-blur-sm rounded-full shadow-lg border-2 ${theme.badge}`}>
                            <span className="text-2xl">📖</span>
                            <span className={`font-bold text-sm md:text-base ${theme.badgeText}`}>
                                {language === 'ko' ? '페이지' : 'Page'} {chapter.id}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={`w-full md:w-7/12 h-full flex flex-col relative bg-gradient-to-br ${theme.bg}`}>
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                    <div className="max-w-[650px] mx-auto px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            key={language}
                        >
                            <h1
                                className="font-bold mb-6 md:mb-8 text-gray-900 leading-tight relative inline-block"
                                style={{ fontSize: 'clamp(1.875rem, 5vw, 2.5rem)' }}
                            >
                                {title}
                                <motion.div
                                    className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${theme.underline} rounded-full`}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                    style={{ transformOrigin: 'left' }}
                                ></motion.div>
                            </h1>

                            <div className="prose-custom space-y-6">
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    className="body-paragraph"
                                    style={{ marginBottom: '1.5em', lineHeight: '1.85' }}
                                >
                                    {content}
                                </motion.p>
                            </div>

                            <div className="mt-8 space-y-6">
                                <section className={`rounded-2xl border ${theme.card} p-5 shadow-sm`}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                            Q
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={handleSkipQuestion}
                                            className="text-xs font-semibold text-gray-400 hover:text-gray-500 transition"
                                        >
                                            {language === 'ko' ? '건너뛰기' : 'Skip'}
                                        </button>
                                    </div>
                                    <p className="mt-3 text-lg font-semibold text-gray-900 leading-relaxed">{question}</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {language === 'ko'
                                            ? '정답이 없는 질문이에요. 생각만 해도 좋아요.'
                                            : 'There is no right answer. Thinking is enough.'}
                                    </p>
                                </section>

                                <section className={`rounded-2xl border ${theme.card} p-5 shadow-sm`}>
                                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                        Build
                                    </h2>
                                    <p className="mt-3 text-base text-gray-600">
                                        {language === 'ko'
                                            ? '두 가지 선택 중 하나를 골라보세요.'
                                            : 'Pick one of the two choices.'}
                                    </p>
                                    <div className="mt-4 grid gap-3">
                                        {choices.map(choice => (
                                            <button
                                                key={choice.id}
                                                type="button"
                                                onClick={() => handleChoiceSelect(choice.id)}
                                                className={`w-full text-left px-4 py-3 rounded-xl border transition-all font-semibold min-h-[52px] ${
                                                    selectedChoice === choice.id
                                                        ? `border-transparent bg-gradient-to-r ${theme.nav} text-white shadow-md`
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                                                }`}
                                            >
                                                <span className="text-sm uppercase tracking-[0.15em] opacity-70">{choice.id}</span>
                                                <span className="block mt-1 text-base leading-relaxed">{choice.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className={`rounded-2xl border ${theme.card} p-5 shadow-sm`}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                            CoLab
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => setShowAiContinuation(prev => !prev)}
                                            className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
                                        >
                                            {showAiContinuation
                                                ? language === 'ko'
                                                    ? '닫기'
                                                    : 'Hide'
                                                : language === 'ko'
                                                    ? 'AI에게 다음 장면 부탁하기'
                                                    : 'Ask AI to help'}
                                        </button>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-500">
                                        {language === 'ko'
                                            ? 'AI는 짧게 이어 쓰고, 다음 결정을 남겨둘 거예요.'
                                            : 'AI writes a short continuation and leaves room for the next choice.'}
                                    </p>
                                    {showAiContinuation && (
                                        <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                            {aiContinuation}
                                        </div>
                                    )}
                                </section>

                                <section className={`rounded-2xl border ${theme.card} p-5 shadow-sm`}>
                                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                        Reflection
                                    </h2>
                                    <p className="mt-3 text-lg font-semibold text-gray-900 leading-relaxed">{reflectionQuestion}</p>
                                    <textarea
                                        value={reflectionText}
                                        onChange={event => setReflectionText(event.target.value)}
                                        placeholder={language === 'ko'
                                            ? '여기에 생각을 적어볼까요?'
                                            : 'Write your thoughts here.'}
                                        className="mt-4 w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                                    />
                                    <p className="mt-2 text-xs text-gray-400">
                                        {language === 'ko'
                                            ? '텍스트, 음성, 혹은 보호자의 도움으로 기록할 수 있어요.'
                                            : 'Text, voice, or parent-assisted input can be captured here.'}
                                    </p>
                                </section>
                            </div>

                            <motion.div
                                className="flex flex-col items-center gap-4 mt-14 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.span
                                        className="text-3xl"
                                        animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
                                        transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' }}
                                    >⭐</motion.span>
                                    <span className="text-sm font-medium text-gray-500">
                                        {language === 'ko' ? '페이지 완료' : 'Page Complete'}
                                    </span>
                                    <motion.span
                                        className="text-3xl"
                                        animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.2, 1] }}
                                        transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' }}
                                    >⭐</motion.span>
                                </div>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalChapters }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                i < chapter.id ? theme.progress : 'bg-gray-200'
                                            }`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 1 + (i * 0.08),
                                                type: 'spring',
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
                                    {chapter.id} / {totalChapters}
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
