

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { BonsaiLogo, Reveal } from './UI';
import { useLanguage } from '../contexts/LanguageContext';
import { SocialLinks } from './SocialIcons';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navKeys = ['home', 'designer', 'serenity', 'amenities', 'residences', 'location', 'brochure', 'contact'];

  return (
    <footer className="bg-bonsai-stone text-bonsai-dark pt-12 md:pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-bonsai-dark/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className={`absolute top-0 -mt-24 w-96 h-96 opacity-[0.03] pointer-events-none ${language === 'ar' ? 'left-0 -ml-24' : 'right-0 -mr-24'}`}>
        <BonsaiLogo className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-12 relative z-10">

        {/* Top Row: Brand & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <Reveal>
            <div className={`flex flex-col items-center lg:items-start text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
              <BonsaiLogo className="w-16 h-16 mb-4" />
              <p className={`text-bonsai-dark/70 font-light text-sm max-w-xs ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.footer.subDesc}
              </p>
            </div>
          </Reveal>

          {/* Compact Nav - Perfectly spaced with pipe separators */}
          <Reveal delay={100} className="w-full lg:w-auto">
            <nav className={`flex flex-wrap justify-center lg:justify-end items-center gap-y-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {navKeys.map((key, index) => (
                <React.Fragment key={key}>
                  <Link
                    to={key === 'home' ? '/' : key === 'residences' ? '/project' : `/${key}`}
                    className="text-xs uppercase tracking-widest hover:text-[#C6A87C] transition-colors py-2 leading-none"
                  >
                    {(t.nav as any)[key]}
                  </Link>
                  {/* Separator - Hidden on last item */}
                  {index < navKeys.length - 1 && (
                    <span className="px-4 text-bonsai-dark/20 hidden md:inline-block select-none leading-none">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </Reveal>
        </div>

        {/* Middle Row: Info & Socials */}
        <div className="border-t border-bonsai-dark/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <Reveal delay={200}>
            <div className={`flex flex-col md:flex-row items-center gap-6 text-[10px] uppercase tracking-widest text-bonsai-dark/50 font-mono ${language === 'ar' ? 'font-arabic' : ''}`}>
              <p><span className="font-bold text-bonsai-dark/70">{t.footer.licenses.fal}:</span> 1200019448</p>
              <span className="hidden md:block w-1 h-1 bg-bonsai-dark/20 rounded-full"></span>
              <p><span className="font-bold text-bonsai-dark/70">{t.footer.licenses.ad}:</span> 7200666566</p>
              <span className="hidden md:block w-1 h-1 bg-bonsai-dark/20 rounded-full"></span>
              <p><span className="font-bold text-bonsai-dark/70">{t.footer.licenses.wafi}:</span> 47/439</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <SocialLinks className="gap-6 opacity-80" iconClassName="w-4 h-4" />
          </Reveal>
        </div>

        {/* Bottom Row: Copyright & Credits */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-[10px] text-bonsai-dark/40 uppercase tracking-widest pt-4">
          <div className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center ${language === 'ar' ? 'md:text-right font-arabic' : 'md:text-left'}`}>
            <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-bonsai-dark transition-colors">{t.footer.privacy}</Link>
              <Link to="/terms" className="hover:text-bonsai-dark transition-colors">{t.footer.terms}</Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className={`flex flex-col md:flex-row items-center gap-2 md:gap-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="opacity-70">{t.footer.developer}:</span>
                <a href="https://alramzre.com" target="_blank" rel="noreferrer" className="text-bonsai-dark hover:text-bonsai-copper transition-colors">
                  alramzre.com
                </a>
              </div>
              <span className="hidden md:block w-[1px] h-3 bg-bonsai-dark/20"></span>
              <div className="flex items-center gap-2">
                <span className="opacity-70">{t.footer.brandOwner}:</span>
                <a href="https://bonsai.sa" target="_blank" rel="noreferrer" className="text-bonsai-dark hover:text-bonsai-copper transition-colors">
                  bonsai.sa
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 hover:text-[#C6A87C] transition-colors group px-3 py-1 border border-transparent hover:border-bonsai-dark/5 rounded-full ${language === 'ar' ? 'font-arabic' : ''}`}
              aria-label="Back to Top"
            >
              <span>{t.footer.backToTop || "Top"}</span>
              <div className="w-5 h-5 rounded-full border border-bonsai-dark/20 flex items-center justify-center group-hover:border-[#C6A87C] group-hover:bg-[#C6A87C] group-hover:text-white transition-all">
                <ArrowUp size={10} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
