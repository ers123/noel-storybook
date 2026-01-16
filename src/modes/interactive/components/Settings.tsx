import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Save, AlertCircle } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Settings Component
 *
 * Allows users to configure their Gemini API key for AI features
 * API key is stored in localStorage for PWA offline use
 */
const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on mount
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[95] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                  <p className="text-sm text-gray-500">Configure AI features</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Settings"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">About AI Writer Friend</p>
                    <p>
                      This app uses Google's Gemini Flash (free tier) to generate story continuations.
                      Your API key is stored locally on your device and never sent to our servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Key Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all font-mono text-sm"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Get your free API key from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline font-semibold"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              {/* How to Get API Key */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  📝 How to get your API key:
                </p>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Visit Google AI Studio</li>
                  <li>Sign in with your Google account</li>
                  <li>Click "Get API key"</li>
                  <li>Create a new API key (it's free!)</li>
                  <li>Copy and paste it here</li>
                </ol>
              </div>

              {/* Usage Info */}
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-green-800 mb-2">
                  ✅ Free Tier Limits:
                </p>
                <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                  <li>15 requests per minute</li>
                  <li>1 million tokens per minute</li>
                  <li>1,500 requests per day</li>
                </ul>
                <p className="text-xs text-green-600 mt-2">
                  More than enough for casual storybook use!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim() || saved}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    saved
                      ? 'bg-green-500 text-white'
                      : apiKey.trim()
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {saved ? (
                    <>
                      <span>✓</span>
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  🔒 <span className="font-semibold">Privacy:</span> Your API key is stored only in your browser's localStorage.
                  It never leaves your device. AI requests are sent directly from your browser to Google's servers.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Settings;
