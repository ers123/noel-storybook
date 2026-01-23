import { useState } from 'react';
import { motion } from 'framer-motion';
import { getQuestion } from '../data/prompts';

interface QuestionBlockProps {
  chapterId: number;
  onContinue: (answered: boolean) => void;
}

/**
 * QuestionBlock (Q)
 *
 * Purpose: Trigger metacognition before action
 * Rules:
 * - No correct answers
 * - Skippable, but logged
 */
const QuestionBlock: React.FC<QuestionBlockProps> = ({ chapterId, onContinue }) => {
  const [answer, setAnswer] = useState('');

  // Get question from centralized prompts (Issue #11)
  const questionPrompt = getQuestion(chapterId);
  const question = questionPrompt.question;
  const helpText = questionPrompt.helpText;

  const handleSkip = () => {
    onContinue(false);
  };

  const handleContinue = () => {
    onContinue(answer.trim().length > 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Question Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-2xl">❓</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Question (Q)
          </div>
          <div className="text-xs text-gray-500">
            Take a moment to think
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
        <p className="text-xl font-medium text-gray-800 mb-2">
          {question}
        </p>
        {helpText && (
          <p className="text-sm text-gray-600 italic">
            💡 {helpText}
          </p>
        )}
      </div>

      {/* Answer Input (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your thoughts (optional):
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your thoughts here, or skip to continue..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all resize-none"
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
        >
          Skip
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          {answer.trim().length > 0 ? 'Continue →' : 'Think Later →'}
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center italic">
        💡 There's no right or wrong answer. Just think!
      </p>
    </motion.div>
  );
};

export default QuestionBlock;
