import React from 'react';
import { motion } from 'framer-motion';
import type { Chapter as ChapterType } from '../data/story';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ChapterProps {
    chapter: ChapterType;
    onNext: () => void;
    onPrev: () => void;
    isFirst: boolean;
    isLast: boolean;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, onNext, onPrev, isFirst, isLast }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#fdf6e3] text-[#5c4b51]"
        >
            <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-amber-800 font-serif">{chapter.title}</h2>
                        <div className="space-y-4 text-lg leading-relaxed font-serif text-gray-700 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200">
                            {chapter.content.map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph.startsWith('>') ? (
                                        <span className="block pl-4 border-l-4 border-amber-400 italic text-gray-600 my-2">
                                            {paragraph.replace(/^>\s*/, '')}
                                        </span>
                                    ) : (
                                        paragraph
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                        <button
                            onClick={onPrev}
                            disabled={isFirst}
                            className={`flex items-center px-4 py-2 rounded-full transition-colors ${isFirst
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-amber-700 hover:bg-amber-50'
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" /> Prev
                        </button>
                        <span className="text-gray-400 self-center text-sm">
                            {chapter.id} / 7
                        </span>
                        <button
                            onClick={onNext}
                            disabled={isLast}
                            className={`flex items-center px-4 py-2 rounded-full transition-colors ${isLast
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-amber-700 hover:bg-amber-50'
                                }`}
                        >
                            Next <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Chapter;
