
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { MenuItem } from '../types';
import { BonsaiLogo } from './UI';
import { useLanguage } from '../contexts/LanguageContext';
import { SocialLinks } from './SocialIcons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, toggleLanguage, language, showProjects } = useLanguage();
  const menuScrollRef = useRef<HTMLDivElement>(null);

  // Check if we are on the home page
  const isHome = location.pathname === '/';

  const menuItems: MenuItem[] = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.designer, path: '/designer' },
    { label: t.nav.serenity, path: '/serenity' },
    { label: t.nav.amenities, path: '/amenities' },
    { label: t.nav.residences, path: '/project/nahda' },
    ...(showProjects ? [{ label: t.nav.projects, path: '/projects' }] : []),
    { label: t.nav.location, path: '/location' },
    { label: t.nav.brochure, path: '/brochure' },
    { label: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position when opening menu
      if (menuScrollRef.current) {
        menuScrollRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Logic: 
  // 1. If menu is open -> Dark text
  // 2. If scrolled -> Dark text (on glass background)
  // 3. If NOT home page -> Dark text (because background is likely light)
  // 4. If Home page AND at top -> White text (over dark hero)
  const navTextColor = isOpen || scrolled || !isHome ? 'text-bonsai-dark' : 'text-white';

  const navBg = scrolled ? 'bg-bonsai-white/90 backdrop-blur-md border-b border-bonsai-dark/5 py-4' : 'bg-transparent border-transparent py-8';



  // Language Button Text Logic: ONLY 'عربي' in English UI and ONLY 'English' in Arabic UI
  const languageButtonText = language === 'en' ? 'عربي' : 'English';

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/' && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-luxury ${navBg}`}
      >
        <div className="px-6 md:px-12 lg:px-24 flex justify-between items-center">
          {/* Logo - Hides when mobile menu is open for cleaner look */}
          <Link
            to="/"
            className={`flex items-center gap-3 z-[100] relative transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'opacity-100'}`}
            onClick={(e) => handleHomeClick(e, '/')}
          >
            <BonsaiLogo className="w-16 h-16 md:w-20 md:h-20" />
          </Link>

          {/* Desktop Menu - Visible only on LG and above (Tablets use Burger) */}
          <div className={`hidden lg:flex items-center gap-8 lg:gap-10 ${navTextColor}`}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:text-bonsai-copper transition-colors relative group py-2 ${language === 'ar' ? 'font-arabic' : ''}`}
                onClick={(e) => handleHomeClick(e, item.path)}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bonsai-copper transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className={`h-4 w-[1px] mx-2 transition-colors ${scrolled || !isHome ? 'bg-bonsai-dark/20' : 'bg-white/30'}`}></div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-bonsai-copper transition-colors"
            >
              <Globe size={14} />
              <span className={language === 'en' ? 'font-arabic font-bold' : 'font-sans'}>{languageButtonText}</span>
            </button>
          </div>

          {/* Mobile/Tablet Toggle - Visible on LG and below */}
          <button
            className={`lg:hidden z-[100] relative transition-colors ${navTextColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F7F5F2] z-[90] transition-all duration-[1s] ease-luxury flex flex-col ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>

        {/* Background decoration */}
        <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none select-none">
          <BonsaiLogo className="w-[400px] h-[400px]" />
        </div>

        {/* Increased top padding to pt-32 to allow space, clean look */}
        <div className="flex-grow flex flex-col items-center justify-center px-8 md:px-16 overflow-y-auto pt-32 pb-12 w-full relative z-10" ref={menuScrollRef}>
          <div className="flex flex-col gap-2 md:gap-4 max-w-2xl mx-auto w-full">
            {menuItems.map((item, index) => (
              <div key={item.path} className="overflow-hidden py-1">
                <Link
                  to={item.path}
                  className={`block text-5xl sm:text-6xl md:text-7xl ${language === 'ar' ? 'font-arabic font-light translate-y-2' : 'font-sans font-light'} text-bonsai-dark hover:text-bonsai-copper transition-colors duration-500 transform origin-left leading-tight`}
                  style={{
                    transitionDelay: `${200 + (index * 100)}ms`,
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isOpen ? 1 : 0
                  }}
                  onClick={(e) => {
                    handleHomeClick(e, item.path);
                    if (item.path !== '/') setIsOpen(false);
                  }}
                >
                  <span className="block transition-transform duration-500">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-bonsai-dark/10 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards opacity-0" style={{ animationDelay: '500ms', opacity: isOpen ? 1 : 0 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <button onClick={toggleLanguage} className="text-sm font-bold uppercase tracking-widest text-bonsai-dark flex items-center gap-3 hover:text-bonsai-copper transition-colors px-4 py-2 border border-bonsai-dark/10 rounded-full">
                <Globe size={18} />
                <span className={language === 'en' ? 'font-arabic' : ''}>{languageButtonText}</span>
              </button>

              {/* Mobile Social Icons */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-widest text-bonsai-dark/50">{t.common.followUs}</span>
                <SocialLinks className="gap-6 text-bonsai-dark" iconClassName="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
