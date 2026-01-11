
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/UI';
import Home from './pages/Home';
import Designer from './pages/Designer';
import Serenity from './pages/Serenity';
import Project from './pages/Project';
import LocationPage from './pages/Location';
import Brochure from './pages/Brochure';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { direction, language } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <div key={language} className={`flex flex-col min-h-screen overflow-hidden selection:bg-bonsai-copper selection:text-white relative ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Router>
          <ScrollToTop />
          <Layout>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/designer" element={<Designer />} />
                <Route path="/serenity" element={<Serenity />} />
                <Route path="/project" element={<Project />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/brochure" element={<Brochure />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </Layout>
        </Router>
      </SmoothScroll>
    </LanguageProvider>
  );
};

export default App;
