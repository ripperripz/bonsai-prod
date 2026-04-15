
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/UI';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { initGA, trackPageView, trackWebVitals } from './utils/analytics';

// Lazy load pages for better code splitting
const Home = lazy(() => import('./pages/Home'));
const Designer = lazy(() => import('./pages/Designer'));
const Serenity = lazy(() => import('./pages/Serenity'));
const Project = lazy(() => import('./pages/Project'));
const Amenities = lazy(() => import('./pages/Amenities'));
const Projects = lazy(() => import('./pages/Projects'));
const LocationPage = lazy(() => import('./pages/Location'));
const Brochure = lazy(() => import('./pages/Brochure'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));

// Loading fallback component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-bonsai-copper text-lg">Loading...</div>
    </div>
);

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        // Track page view on route change
        trackPageView(pathname);
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

const ProjectRoutes: React.FC = () => {
    const { showProjects } = useLanguage();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/designer" element={<Designer />} />
            <Route path="/serenity" element={<Serenity />} />
            {/* Direct access to project detail by ID */}
            <Route path="/project/:id" element={<Project />} />
            {/* Fallback for the old route, defaults to nahda */}
            <Route path="/project" element={<Project />} />
            <Route path="/amenities" element={<Amenities />} />
            {showProjects && <Route path="/projects" element={<Projects />} />}
            <Route path="/location" element={<LocationPage />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

const App: React.FC = () => {
    useEffect(() => {
        // Initialize Google Analytics on app mount
        initGA();

        // Track Web Vitals for performance monitoring
        trackWebVitals();
    }, []);

    return (
        <LanguageProvider>
            <SmoothScroll>
                <Router>
                    <ScrollToTop />
                    <Layout>
                        <Navbar />
                        <main className="flex-grow">
                            <Suspense fallback={<PageLoader />}>
                                <ProjectRoutes />
                            </Suspense>
                        </main>
                        <Footer />
                    </Layout>
                </Router>
            </SmoothScroll>
        </LanguageProvider>
    );
};

export default App;
