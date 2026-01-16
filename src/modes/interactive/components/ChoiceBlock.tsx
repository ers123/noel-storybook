import { motion } from 'framer-motion';

interface ChoiceBlockProps {
  chapterId: number;
  onChoice: (choice: 'A' | 'B') => void;
}

/**
 * ChoiceBlock (Build)
 *
 * Purpose: Force execution without perfection
 * Rules:
 * - Exactly two buttons
 * - Choices must be meaningfully different
 * - Neither labeled as correct
 */
const ChoiceBlock: React.FC<ChoiceBlockProps> = ({ chapterId, onChoice }) => {
  // Chapter-specific choices (PRD: meaningfully different, no "correct" label)
  const choices: Record<number, { A: string; B: string }> = {
    1: {
      A: "Look for a friend who understands",
      B: "Try to change myself to fit in"
    },
    2: {
      A: "Trust Lia and open up",
      B: "Keep my distance to stay safe"
    },
    3: {
      A: "Say thank you to Lia",
      B: "Show gratitude through actions"
    },
    4: {
      A: "Ask for help from Lia",
      B: "Try to figure it out alone"
    },
    5: {
      A: "Open the door and explore",
      B: "Walk away quietly"
    },
    6: {
      A: "Share my story with the class",
      B: "Keep it to myself for now"
    },
    7: {
      A: "Look forward to tomorrow",
      B: "Reflect on how far I've come"
    }
  };

  const choice = choices[chapterId] || {
    A: "Go forward with courage",
    B: "Take time to think more"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Choice Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
            Choice (Build)
          </div>
          <div className="text-xs text-gray-500">
            Make your decision
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
        <p className="text-lg font-medium text-gray-800">
          What should happen next?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Choose one. There's no wrong answer — just choose what feels right to you.
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="grid gap-4">
        {/* Choice A */}
        <motion.button
          onClick={() => onChoice('A')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-left overflow-hidden"
        >
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
            A
          </div>
          <div className="pr-12">
            <div className="text-lg font-semibold mb-2">
              {choice.A}
            </div>
            <div className="text-sm text-purple-100">
              Click to choose this path
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.button>

        {/* Choice B */}
        <motion.button
          onClick={() => onChoice('B')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-left overflow-hidden"
        >
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
            B
          </div>
          <div className="pr-12">
            <div className="text-lg font-semibold mb-2">
              {choice.B}
            </div>
            <div className="text-sm text-indigo-100">
              Click to choose this path
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center italic">
        💪 Don't overthink it. Just pick one and see what happens!
      </p>
    </motion.div>
  );
};

export default ChoiceBlock;
