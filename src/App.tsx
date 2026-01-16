import { useState, useEffect } from 'react';
import ClassicApp from './modes/classic/ClassicApp';
import InteractiveApp from './modes/interactive/InteractiveApp';

type AppMode = 'classic' | 'interactive';

function App() {
  const [mode, setMode] = useState<AppMode>('interactive'); // Default to interactive for MVP development

  useEffect(() => {
    // Check URL parameters for mode
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode') as AppMode;
    if (urlMode === 'classic' || urlMode === 'interactive') {
      setMode(urlMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'classic' ? 'interactive' : 'classic';
    setMode(newMode);

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    window.history.pushState({}, '', url);
  };

  return (
    <>
      {/* Development Mode Toggle Button */}
      <button
        onClick={toggleMode}
        className="fixed top-4 left-4 z-[100] px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-xs uppercase tracking-wide hover:scale-105 active:scale-95 flex items-center gap-2"
        aria-label="Toggle App Mode"
      >
        <span className="text-lg">{mode === 'classic' ? '📖' : '🤔'}</span>
        <span>{mode === 'classic' ? 'Classic' : 'Interactive'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>

      {/* Render appropriate app based on mode */}
      {mode === 'classic' ? <ClassicApp /> : <InteractiveApp />}
    </>
  );
}

export default App;
