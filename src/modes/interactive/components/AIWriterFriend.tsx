import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Settings } from 'lucide-react';
import { getMockAIResponse } from '../data/prompts';

interface AIWriterFriendProps {
  chapterId: number;
  selectedChoice: 'A' | 'B';
  storyContext: string;
  onContinue: (aiText: string | null) => void;
  onOpenSettings?: () => void;
}

/**
 * AIWriterFriend (CoLab)
 *
 * Purpose: Introduce AI as a collaborator, not an answer engine
 * Rules:
 * - Optional button
 * - Max 3 sentences output
 * - Must leave room for next decision
 */
const AIWriterFriend: React.FC<AIWriterFriendProps> = ({
  chapterId,
  selectedChoice,
  storyContext,
  onContinue,
  onOpenSettings
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiText, setAiText] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockResponse, setIsMockResponse] = useState(false);

  const handleRequestAI = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get API key from localStorage or environment variable
      const apiKey = localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('NO_API_KEY');
      }

      // Initialize Gemini AI with timeout
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Create prompt for AI
      const prompt = `You are a creative writing assistant helping a child (ages 5-10) continue a story.

Context: ${storyContext}

The child chose: Option ${selectedChoice}

Write ONE short paragraph (maximum 3 sentences) that continues this story based on their choice.
Remember:
- Write for children ages 5-10
- Keep it simple and engaging
- Leave room for the next decision (don't complete the story)
- Match the emotional tone of the original story
- Don't give answers, just add possibilities to think about

Continue the story:`;

      // Add timeout to API call (15 seconds)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), 15000)
      );

      const apiPromise = model.generateContent(prompt);

      const result = await Promise.race([apiPromise, timeoutPromise]) as any;
      const response = result.response;
      const text = response.text();

      setAiText(text);
      setIsMockResponse(false); // Real AI response
    } catch (err: any) {
      console.error('Gemini API Error:', err);

      // Detailed error handling (Issue #5)
      let errorMessage = '';
      let shouldUseFallback = false;

      if (err.message === 'NO_API_KEY') {
        errorMessage = 'No API key configured. Click Settings to add your Gemini API key.';
      } else if (err.message === 'TIMEOUT') {
        errorMessage = 'AI took too long to respond. Using a sample response instead.';
        shouldUseFallback = true;
      } else if (err.status === 429 || err.message?.includes('429')) {
        errorMessage = 'Too many requests to AI. Please wait a moment and try again, or use the sample response below.';
        shouldUseFallback = true;
      } else if (err.status === 403 || err.status === 401 || err.message?.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your API key in Settings.';
      } else if (err.message?.includes('quota') || err.message?.includes('RESOURCE_EXHAUSTED')) {
        errorMessage = 'API quota exceeded. Using a sample response instead.';
        shouldUseFallback = true;
      } else if (err.message?.includes('fetch') || err.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection. Using a sample response instead.';
        shouldUseFallback = true;
      } else {
        errorMessage = 'AI request failed. Using a sample response instead.';
        shouldUseFallback = true;
      }

      setError(errorMessage);

      // Use mock fallback for recoverable errors (Issue #11: centralized prompts)
      if (shouldUseFallback) {
        const mockFallback = getMockAIResponse(chapterId, selectedChoice);
        setAiText(mockFallback);
        setIsMockResponse(true); // Using sample response, not real AI
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipAI = () => {
    onContinue(null);
  };

  const handleContinueWithAI = () => {
    onContinue(aiText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* AI Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
            AI Writer Friend (CoLab)
          </div>
          <div className="text-xs text-gray-500">
            Optional collaboration
          </div>
        </div>
      </div>

      {!showAI && !aiText && (
        <>
          {/* Explanation */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Want to see what AI thinks could happen next?
            </p>
            <p className="text-sm text-gray-600">
              The AI is like a friend who helps you write the next part of the story.
              It won't tell you what's "right" — it just adds ideas for you to think about.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm text-yellow-800">{error}</p>
                  {error.includes('Settings') && onOpenSettings && (
                    <button
                      onClick={onOpenSettings}
                      className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Open Settings</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSkipAI}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              No thanks, I'll imagine it myself
            </button>
            <button
              onClick={() => {
                setShowAI(true);
                handleRequestAI();
              }}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
            >
              Ask AI to help write →
            </button>
          </div>
        </>
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center"
        >
          <div className="inline-block animate-spin text-4xl mb-4">🤖</div>
          <p className="text-gray-700 font-medium">AI is thinking...</p>
          <p className="text-sm text-gray-500 mt-2">Writing the next part of the story</p>
        </motion.div>
      )}

      {aiText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* AI Response */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-semibold text-green-700">
                    {isMockResponse ? 'Sample continuation:' : 'AI\'s continuation:'}
                  </div>
                  {isMockResponse && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                      Sample Response
                    </span>
                  )}
                  {!isMockResponse && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                      Generated by AI
                    </span>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed italic">
                  {aiText}
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinueWithAI}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            Continue to Reflection →
          </button>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center italic">
            🧠 The AI gave you an idea. Now it's time to think about YOUR choice.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AIWriterFriend;
