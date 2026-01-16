import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Settings } from 'lucide-react';

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

  // Mock responses as fallback
  const getMockResponse = (chapterId: number, choice: 'A' | 'B'): string => {
    const mockResponses: Record<string, Record<'A' | 'B', string>> = {
      '1': {
        A: "Maybe there's someone out there who sees beyond appearances. Someone who understands what it's like to feel different.",
        B: "Perhaps changing yourself isn't the answer. Maybe being different is what makes you special."
      },
      '2': {
        A: "Trusting someone new is scary. But Lia seems genuine. What if this is the beginning of a real friendship?",
        B: "Keeping distance feels safer. But staying alone... is that really protection, or just another kind of hurt?"
      },
      '3': {
        A: "Words can be powerful. Sometimes 'thank you' is exactly what someone needs to hear.",
        B: "Actions speak louder than words. What small gesture could show Lia how much this means to you?"
      },
      '4': {
        A: "Asking for help isn't weakness. Lia offered friendship — maybe she wants to help with more than just lunch.",
        B: "Trying alone shows determination. But sometimes the bravest thing is admitting you need someone."
      },
      '5': {
        A: "Behind every door marked 'death' might be an ordinary truth waiting to be discovered. Courage means opening it anyway.",
        B: "Walking away is also a choice. Sometimes wisdom means knowing which doors to leave closed."
      },
      '6': {
        A: "Sharing your story makes you vulnerable. But vulnerability can also be strength. Who knows who might be listening?",
        B: "Privacy is valid too. You don't owe anyone your story — it's yours to tell when you're ready."
      },
      '7': {
        A: "Tomorrow holds new possibilities. You've learned that being different isn't being wrong. What comes next?",
        B: "Looking back, you've come so far. From 'wrong' to just 'different.' That journey matters."
      }
    };

    return mockResponses[chapterId]?.[choice] ||
      "The story continues in ways you might not expect. What happens next depends on your next choice.";
  };

  const handleRequestAI = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get API key from localStorage or environment variable
      const apiKey = localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('NO_API_KEY');
      }

      // Initialize Gemini AI
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

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setAiText(text);
    } catch (err: any) {
      console.error('Gemini API Error:', err);

      if (err.message === 'NO_API_KEY') {
        setError('No API key configured. Click Settings to add your Gemini API key.');
      } else {
        setError('Using fallback response (API call failed)');
        // Fallback to mock response if API fails
        const mockFallback = getMockResponse(chapterId, selectedChoice);
        setAiText(mockFallback);
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
                <div className="text-sm font-semibold text-green-700 mb-2">
                  AI's continuation:
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
