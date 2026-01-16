import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Chapter } from '../../../shared/data/story';
import { useLanguage } from '../../../shared/context/LanguageContext';
import QuestionBlock from './QuestionBlock';
import ChoiceBlock from './ChoiceBlock';
import AIWriterFriend from './AIWriterFriend';
import ReflectionBlock from './ReflectionBlock';

interface InteractivePageProps {
  chapter: Chapter;
  pageIndex: number;
  totalPages: number;
  onComplete: (data: any) => void;
}

type PageState = 'story' | 'question' | 'choice' | 'ai' | 'reflection';

const InteractivePage: React.FC<InteractivePageProps> = ({
  chapter,
  pageIndex,
  totalPages,
  onComplete
}) => {
  const { language } = useLanguage();
  const title = language === 'ko' ? chapter.title : chapter.titleEn;
  const content = language === 'ko' ? chapter.content : chapter.contentEn;

  // Extract first 2-4 sentences for story text (PRD: keep it short)
  const storyText = content.slice(0, 3).join(' ');

  const [pageState, setPageState] = useState<PageState>('story');
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [aiContinuation, setAiContinuation] = useState<string | null>(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const handleQuestionContinue = (answered: boolean) => {
    setQuestionAnswered(answered);
    setPageState('choice');
  };

  const handleChoice = (choice: 'A' | 'B') => {
    setSelectedChoice(choice);
    setPageState('ai');
  };

  const handleAIContinue = (aiText: string | null) => {
    setAiContinuation(aiText);
    setPageState('reflection');
  };

  const handleReflectionSubmit = (reflectionText: string) => {
    // Collect all interaction data
    const interactionData = {
      chapterId: chapter.id,
      chapterTitle: title,
      questionAnswered,
      selectedChoice,
      usedAI: !!aiContinuation,
      aiContinuation,
      reflection: reflectionText,
      timeSpent: Date.now() // Could track actual time spent
    };

    onComplete(interactionData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Progress Indicator */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i < pageIndex ? 'w-8 bg-blue-500' :
                i === pageIndex ? 'w-12 bg-purple-500' :
                'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="text-sm font-medium text-gray-600">
          Page {pageIndex + 1} / {totalPages}
        </div>
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Story Section - Always Visible */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          {/* Image */}
          <div className="w-full mb-6 rounded-xl overflow-hidden shadow-lg">
            <img
              src={chapter.image}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h1>

          {/* Short Story Text (2-4 sentences) */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {storyText}
          </p>
        </div>

        {/* Interactive Blocks */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {pageState === 'story' && (
              <motion.div
                key="story-continue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={() => setPageState('question')}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Thinking 🤔
                </button>
              </motion.div>
            )}

            {pageState === 'question' && (
              <QuestionBlock
                chapterId={chapter.id}
                onContinue={handleQuestionContinue}
              />
            )}

            {pageState === 'choice' && (
              <ChoiceBlock
                chapterId={chapter.id}
                onChoice={handleChoice}
              />
            )}

            {pageState === 'ai' && (
              <AIWriterFriend
                chapterId={chapter.id}
                selectedChoice={selectedChoice!}
                storyContext={storyText}
                onContinue={handleAIContinue}
              />
            )}

            {pageState === 'reflection' && (
              <ReflectionBlock
                selectedChoice={selectedChoice!}
                onSubmit={handleReflectionSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractivePage;
