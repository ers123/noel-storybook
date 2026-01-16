import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Settings as SettingsIcon } from 'lucide-react';
import { LanguageProvider } from '../../shared/context/LanguageContext';
import InteractivePage from './components/InteractivePage';
import Settings from './components/Settings';
import { story } from '../../shared/data/story';

/**
 * InteractiveApp - Q-Build-CoLab MVP
 *
 * Core Loop:
 * 1. Question (Q) - Trigger metacognition
 * 2. Choice (Build) - Force execution without perfection
 * 3. AI Collaboration (CoLab) - Optional AI co-writing
 * 4. Reflection - Close the loop
 */
function InteractiveApp() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load session data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('interactive_session_data');
    const savedPage = localStorage.getItem('interactive_current_page');

    if (savedData) {
      try {
        setSessionData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load session data', e);
      }
    }

    if (savedPage) {
      try {
        setCurrentPageIndex(parseInt(savedPage, 10));
      } catch (e) {
        console.error('Failed to load page index', e);
      }
    }
  }, []);

  // Save session data to localStorage whenever it changes
  useEffect(() => {
    if (sessionData.length > 0) {
      localStorage.setItem('interactive_session_data', JSON.stringify(sessionData));
    }
  }, [sessionData]);

  // Save current page index
  useEffect(() => {
    localStorage.setItem('interactive_current_page', currentPageIndex.toString());
  }, [currentPageIndex]);

  const handlePageComplete = (pageData: any) => {
    // Log interaction data
    const newData = {
      pageIndex: currentPageIndex,
      timestamp: new Date().toISOString(),
      ...pageData
    };

    setSessionData(prev => [...prev, newData]);

    // Move to next page
    if (currentPageIndex < story.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <LanguageProvider>
      <HelmetProvider>
        <Helmet>
          <title>Noel - Interactive Thinking Trainer</title>
          <meta name="description" content="Practice questioning, choosing, and collaborating with AI through stories." />
          <meta property="og:title" content="Noel - Interactive Thinking Trainer" />
          <meta property="og:description" content="A thinking trainer where children practice the Q-Build-CoLab loop." />
          <meta property="og:image" content="assets/images/og-image.png" />
          <meta property="og:type" content="website" />
          <link rel="icon" type="image/png" href="assets/images/icon.png" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="fixed top-20 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border-2 border-purple-200"
            aria-label="Open Settings"
          >
            <SettingsIcon className="w-5 h-5 text-purple-600" />
          </button>

          {/* Settings Panel */}
          <Settings
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />

          <InteractivePage
            chapter={story[currentPageIndex]}
            pageIndex={currentPageIndex}
            totalPages={story.length}
            onComplete={handlePageComplete}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Debug Panel (Development Only) */}
          {import.meta.env.DEV && (
            <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs max-h-48 overflow-auto">
              <div className="font-bold mb-2">Session Data ({sessionData.length} interactions)</div>
              <pre className="text-[10px]">{JSON.stringify(sessionData, null, 2)}</pre>
            </div>
          )}
        </div>
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default InteractiveApp;
