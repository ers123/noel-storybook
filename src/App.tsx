import { HelmetProvider, Helmet } from 'react-helmet-async';
import Book from './components/Book';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <HelmetProvider>
        <Helmet>
          <title>Noel - A Storybook</title>
          <meta name="description" content="An online storybook about Noel and Lia." />
          <meta property="og:title" content="Noel - A Storybook" />
          <meta property="og:description" content="Read the heartwarming story of Noel and Lia." />
          <meta property="og:image" content="assets/images/og-image.png" />
          <meta property="og:type" content="book" />
          <link rel="icon" type="image/png" href="assets/images/icon.png" />
        </Helmet>
        <Book />
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default App;
