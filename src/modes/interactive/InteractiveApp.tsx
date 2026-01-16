import { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { LanguageProvider } from '../../shared/context/LanguageContext';
import InteractivePage from './components/InteractivePage';
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

  const handlePageComplete = (pageData: any) => {
    // Log interaction data
    setSessionData(prev => [...prev, {
      pageIndex: currentPageIndex,
      timestamp: new Date().toISOString(),
      ...pageData
    }]);

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
          <InteractivePage
            chapter={story[currentPageIndex]}
            pageIndex={currentPageIndex}
            totalPages={story.length}
            onComplete={handlePageComplete}
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
