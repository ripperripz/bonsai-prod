
import React from 'react';
import { Reveal, Button, JapaneseTitle } from '../components/UI';
import { SEO } from '../components/SEO';
import { Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Brochure: React.FC = () => {
  const { language, t } = useLanguage();

  const handleDownload = () => {
    // Correct PDF links
    const brochureUrl = language === 'ar'
      ? "https://shorturl.at/j0bIF" // Arabic PDF
      : "https://shorturl.at/oXLv0"; // English PDF

    window.open(brochureUrl, '_blank');
  };

  return (
    // Updated layout: min-h-screen and py-32 to fix top spacing issues
    <div className="min-h-screen py-32 flex items-center justify-center bg-[#F7F5F2] relative">
      <SEO
        title={language === 'ar' ? "تحميل الكتيب | مساكن بونساي" : "Download Brochure | Bonsai Residences"}
        description={language === 'ar' ? "قم بتنزيل كتيب بونساي الكامل للاطلاع على المخططات والمواصفات الفنية." : "Download the full Bonsai Residences brochure for detailed floor plans, specifications, and investment information."}
        keywords={[
          "Bonsai Brochure", "Bonsai Floor Plans", "Real Estate Brochure Riyadh",
          "كتيب بونساي", "مخططات بونساي", "بروشور بونساي"
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Download Brochure",
          "description": "Bonsai Residences digital brochure download page."
        }}
      />
      <Reveal>
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Title: 'Download' instead of 'View' for sub */}
          <JapaneseTitle main={language === 'ar' ? "الكتيب الرقمي" : "The Brochure"} sub={language === 'ar' ? "تحميل" : "Download"} center />

          <p className="text-bonsai-dark/60 mb-16 max-w-lg mx-auto leading-relaxed mt-4 font-light text-lg">
            {language === 'ar'
              ? "اكتشف التفاصيل الكاملة، والمخططات، والمواصفات الفنية لمساكن بونساي في كتيبنا الرقمي الشامل."
              : "Discover the full details, floor plans, and technical specifications of Bonsai Residences in our comprehensive digital brochure."
            }
          </p>

          {/* 3D Booklet Mockup */}
          <div className="perspective-1000 inline-block mb-12 group cursor-pointer" onClick={handleDownload}>
            <div className="relative w-[300px] h-[420px] md:w-[350px] md:h-[500px] transition-all duration-500 ease-out transform group-hover:-translate-y-4 group-hover:rotate-x-2 group-hover:rotate-y-2 preserve-3d">

              {/* Book Spine Shadow/Depth */}
              <div className="absolute inset-0 bg-[#0F0E0D] transform translate-x-3 translate-y-3 rounded-sm opacity-20 blur-md"></div>

              {/* The Cover */}
              <div className="relative w-full h-full bg-white shadow-2xl rounded-sm overflow-hidden border border-[#0F0E0D]/5">
                <img
                  src="https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfYJj49i4GSvl0lhWYDdRYEd89mxFWiR3m0cCDYBQrAbvSiYLvqLIx6moVpn2e497OMRVT8OtoK5r698moFLyEiQmBZpk5vxcwJHH1VftDFFRUXeLg6qn_796r_n_IWA0E=s2048?key=mtp0HJ7MvOLW-1kzK49C-A"
                  alt="Bonsai Brochure Cover"
                  className="w-full h-full object-cover"
                />

                {/* Glossy Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none"></div>

                {/* Spine Crease */}
                <div className={`absolute top-0 w-[2px] h-full bg-black/10 ${language === 'ar' ? 'right-2' : 'left-2'}`}></div>

                {/* Download Badge Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                  <div className={`text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.brochure.pdf}</p>
                    <p className="text-sm font-light">12.4 MB</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-[#0F0E0D] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Download size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleDownload} variant="primary">
              <Download size={18} className={language === 'ar' ? "ml-2" : "mr-2"} />
              {/* Specific text requested: 'تحميل الكتيب' for Arabic, 'Download Brochure' for English */}
              {language === 'ar' ? "تحميل الكتيب" : "Download Brochure"}
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Brochure;
