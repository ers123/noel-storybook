import { useState } from 'react';
import { motion } from 'framer-motion';

interface ReflectionBlockProps {
  selectedChoice: 'A' | 'B';
  onSubmit: (reflection: string) => void;
}

/**
 * ReflectionBlock
 *
 * Purpose: Close the loop and return to Q
 * Default Question: "Why did you choose that?"
 * Input: Text OR voice OR parent-assisted
 */
const ReflectionBlock: React.FC<ReflectionBlockProps> = ({
  selectedChoice,
  onSubmit
}) => {
  const [reflection, setReflection] = useState('');
  const [reflectionLength, setReflectionLength] = useState(0);

  const handleReflectionChange = (text: string) => {
    setReflection(text);
    setReflectionLength(text.trim().split(/\s+/).filter(w => w.length > 0).length);
  };

  const handleSubmit = () => {
    onSubmit(reflection);
  };

  const handleSkip = () => {
    onSubmit(''); // Allow skip but log it
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Reflection Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
          <span className="text-2xl">💭</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
            Reflection
          </div>
          <div className="text-xs text-gray-500">
            Think about your choice
          </div>
        </div>
      </div>

      {/* Choice Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
        <div className="text-sm text-gray-600 mb-1">You chose:</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
            {selectedChoice}
          </div>
          <div className="text-gray-700 font-medium">Option {selectedChoice}</div>
        </div>
      </div>

      {/* Main Question */}
      <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-xl">
        <p className="text-xl font-medium text-gray-800">
          Why did you choose that?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Take a moment to think about what made you pick option {selectedChoice}.
        </p>
      </div>

      {/* Reflection Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your reflection:
        </label>
        <textarea
          value={reflection}
          onChange={(e) => handleReflectionChange(e.target.value)}
          placeholder="I chose this because..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring focus:ring-pink-200 transition-all resize-none"
          rows={5}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            {reflectionLength > 0 ? (
              <span className="text-pink-600 font-medium">
                {reflectionLength} {reflectionLength === 1 ? 'word' : 'words'}
              </span>
            ) : (
              'Start typing your thoughts...'
            )}
          </div>
          {reflectionLength > 10 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium"
            >
              ✓ Great thinking!
            </motion.div>
          )}
        </div>
      </div>

      {/* Prompts to help thinking (optional helpers) */}
      <div className="bg-blue-50 p-4 rounded-xl">
        <div className="text-sm font-medium text-gray-700 mb-2">
          💡 Need help? Think about:
        </div>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>What feeling did you have when you made this choice?</li>
          <li>Did something in the story make you think this way?</li>
          <li>If you could choose again, would you pick the same one?</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
          disabled={reflectionLength === 0}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
            reflectionLength > 0
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {reflectionLength > 0 ? 'Continue to Next Page →' : 'Write something first'}
        </button>
      </div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 italic">
          🌟 The more you reflect, the better you understand your own thinking!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ReflectionBlock;
