import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = ((current + 1) / total) * 100;

    // Chapter-based theme colors for progress bar
    const getProgressTheme = (chapterIndex: number) => {
        const chapterId = chapterIndex + 1;
        const themes = {
            1: { bg: 'from-slate-100 via-gray-100 to-slate-100', bar: 'from-slate-500 via-gray-500 to-slate-500' },
            2: { bg: 'from-orange-100 via-amber-100 to-orange-100', bar: 'from-orange-500 via-amber-500 to-orange-500' },
            3: { bg: 'from-pink-100 via-rose-100 to-pink-100', bar: 'from-pink-500 via-rose-500 to-pink-500' },
            4: { bg: 'from-emerald-100 via-teal-100 to-emerald-100', bar: 'from-emerald-500 via-teal-500 to-emerald-500' },
            5: { bg: 'from-violet-100 via-purple-100 to-violet-100', bar: 'from-violet-500 via-purple-500 to-violet-500' },
            6: { bg: 'from-blue-100 via-indigo-100 to-blue-100', bar: 'from-blue-500 via-indigo-500 to-blue-500' },
            7: { bg: 'from-red-100 via-orange-100 to-amber-100', bar: 'from-red-500 via-orange-500 to-amber-500' }
        };
        return themes[chapterId as keyof typeof themes] || themes[1];
    };

    const theme = getProgressTheme(current);

    return (
        <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${theme.bg} z-30`}>
            <div
                className={`h-full bg-gradient-to-r ${theme.bar} transition-all duration-700 ease-out relative overflow-hidden`}
                style={{ width: `${progress}%` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
        </div>
    );
};

export default ProgressBar;
