import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const MasterplanMap: React.FC<{ className?: string }> = ({ className }) => {
  const { language } = useLanguage();

  const imgSrc = language === 'ar'
    ? '/images/arabicmasterplan.png'
    : '/images/englishmasterplan.png';

  return (
    <div className={`flex justify-center transition-opacity duration-700 ${className || ''}`}>
      <div className="relative w-full max-w-4xl">
        <img
          src={imgSrc}
          alt="Masterplan"
          className="w-full h-auto object-contain shadow-sm"
        />
      </div>
    </div>
  );
};
