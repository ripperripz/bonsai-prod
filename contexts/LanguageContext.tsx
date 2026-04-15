
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: typeof translations['en'];
  showProjects: boolean;
}

declare global {
  interface Window {
    SITE_TRANSLATIONS?: typeof translations;
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic
  const [showProjects, setShowProjects] = useState<boolean>(true);

  useEffect(() => {
    // Fetch global config
    fetch('/config.json')
      .then(res => res.json())
      .then(config => {
        if (config && typeof config.showProjects === 'boolean') {
          setShowProjects(config.showProjects);
        }
      })
      .catch(err => console.error('Failed to load visibility config:', err));

    // Check localStorage for saved preference
    const savedLang = localStorage.getItem('bonsai_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('bonsai_lang', newLang);
  };

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  // Use external translations if available (allows client updates without rebuild), else fallback to built-in
  // Simple deep merge utility to ensure we don't break the app if external translations are incomplete
  const deepMerge = (target: any, source: any): any => {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };

  const isObject = (item: any) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
  };

  // Merge bundled translations with external ones (external overrides internal)
  const internal = translations[language];
  const external = (window.SITE_TRANSLATIONS && window.SITE_TRANSLATIONS[language]) || {};

  // We merge external INTO internal (so internal is the base, external overrides matching keys)
  // Casting to any to avoid complex TS recursion issues in this simple implementation
  const t = deepMerge(internal, external) as typeof translations['en'];

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t, showProjects }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
