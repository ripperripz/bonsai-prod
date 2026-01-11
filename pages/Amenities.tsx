import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, ClipReveal, ImageParallax, Lightbox } from '../components/UI';
import { SEO } from '../components/SEO';

import { Flower2, Sparkles, Gamepad2, Armchair, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Amenities: React.FC = () => {
   const { t, language } = useLanguage();

   // Lightbox State
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState(0);

   const galleryImages = [
      "/images/1.webp",
      "/images/2.webp",
      "/images/3.webp",
      "/images/4.webp",
      "/images/5.png",
      "/images/6.webp",
      "/images/7.webp",
      "/images/8.webp",
      "/images/9.webp",
      "/images/10.webp",
      "/images/11.webp",
      "/images/12.webp",
      "/images/13.webp",
      "/images/14.png",
      "/images/15.webp"
   ];

   const openLightbox = (index: number) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
   };

   const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
   const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

   return (
      <div className="pt-24 bg-[#F7F5F2]">
         <SEO
            title={language === 'ar' ? "المميزات | مشروع بونساي" : "Amenities | Bonsai Project"}
            description={language === 'ar' ? "استكشف مرافق بونساي الفاخرة، من غرفة الشاي اليابانية والحدائق الغناء إلى قاعة السينما ومساحات العمل المشتركة." : "Explore Bonsai's luxury amenities, from the Japanese tea room and lush gardens to the cinema and co-working spaces."}
            keywords={["Bonsai Amenities", "Japanese Tea Room", "Luxury Living Riyadh", "مرافق بونساي", "غرفة شاي يابانية"]}
         />

         {/* Lightbox */}
         <Lightbox
            isOpen={lightboxOpen}
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={nextImage}
            onPrev={prevImage}
         />

         {/* --- 1. AMENITIES (P9) --- */}
         <Section className="bg-white">
            <Reveal>
               <JapaneseTitle main={t.project.amenities?.title || "Amenities"} sub={t.project.amenities?.sub || "Elevated Living"} />
            </Reveal>

            <div className="mt-24 border-t border-[#0F0E0D]/10">
               {[
                  {
                     icon: <Flower2 size={40} strokeWidth={1} />,
                     categoryKey: "serenity",
                     itemsKey: "serenityItems"
                  },
                  {
                     icon: <Sparkles size={40} strokeWidth={1} />,
                     categoryKey: "highlights",
                     itemsKey: "highlightsItems"
                  },
                  {
                     icon: <Gamepad2 size={40} strokeWidth={1} />,
                     categoryKey: "entertainment",
                     itemsKey: "entertainmentItems"
                  },
                  {
                     icon: <Armchair size={40} strokeWidth={1} />,
                     categoryKey: "amenitiesLabel",
                     itemsKey: "amenitiesItems"
                  },
                  {
                     icon: <ShoppingBag size={40} strokeWidth={1} />,
                     categoryKey: "services",
                     itemsKey: "servicesItems"
                  },
                  {
                     icon: <ShieldCheck size={40} strokeWidth={1} />,
                     categoryKey: "features",
                     itemsKey: "featuresItems"
                  }
               ].map((group, i) => (
                  <Reveal key={i} delay={i * 50} className="w-full">
                     <div className="group border-b border-[#0F0E0D]/10 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:bg-[#F7F5F2] transition-colors duration-500 px-4 md:px-8 cursor-default">
                        <div className={`md:col-span-1 text-[#C6A87C] opacity-50 group-hover:opacity-100 transition-opacity flex justify-center ${language === 'ar' ? 'md:justify-end' : 'md:justify-start'}`}>
                           {group.icon}
                        </div>
                        <div className={`md:col-span-4 text-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                           <h3 className={`font-sans font-light text-3xl md:text-4xl text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.amenities as any)?.[group.categoryKey]}</h3>
                        </div>
                        <div className={`md:col-span-7 flex flex-col md:flex-row flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-2 ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'}`}>
                           {((t.project.amenities as any)?.[group.itemsKey] || []).map((item: string, idx: number) => (
                              <span key={idx} className={`text-sm uppercase tracking-widest text-[#0F0E0D]/60 flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                 <span className="w-1 h-1 bg-[#C6A87C] rounded-full shrink-0"></span>
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>
                  </Reveal>
               ))}
            </div>
         </Section>

         {/* --- 2. CLUBHOUSE (P10) --- */}
         <div className="bg-bonsai-beige text-bonsai-dark overflow-hidden">
            <Section className="pb-0">
               <Reveal>
                  <JapaneseTitle main={t.project.clubhouse?.title || "The Clubhouse"} sub={t.project.clubhouse?.sub || "Community"} />
               </Reveal>
            </Section>

            <div className="flex flex-col">
               {[
                  {
                     titleKey: "teaRoom",
                     descKey: "teaRoomDesc",
                     img: "/images/7.webp",
                     imgPosition: "0% 50%"
                  },
                  {
                     titleKey: "gardens",
                     descKey: "gardensDesc",
                     img: "/images/9.webp",
                     imgPosition: "100% 50%"
                  },
                  {
                     titleKey: "library",
                     descKey: "libraryDesc",
                     img: "/images/4.webp",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "cinema",
                     descKey: "cinemaDesc",
                     img: "/images/cinema.jpeg",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "workspace",
                     descKey: "workspaceDesc",
                     img: "/images/5.png",
                     imgPosition: "center"
                  },
                  {
                     titleKey: "recreation",
                     descKey: "recreationDesc",
                     img: "/images/6.png",
                     imgPosition: "center"
                  },
               ].map((item, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
                     <div className={`relative h-[50vh] md:h-auto overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                        <ImageParallax
                           src={item.img}
                           alt={(t.project.clubhouse as any)?.[item.titleKey] || ''}
                           className="w-full h-full object-cover"
                           speed={0.1}
                           imgStyle={{ objectPosition: item.imgPosition }}
                        />
                     </div>
                     <div className={`flex flex-col justify-center p-12 md:p-24 bg-bonsai-stone z-10 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                        <Reveal>
                           <span className="text-[#C6A87C] font-mono text-xs uppercase tracking-widest mb-4 block">0{i + 1}</span>
                           <h3 className={`font-sans font-light text-4xl md:text-5xl text-bonsai-dark mb-8 ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.project.clubhouse as any)?.[item.titleKey]}</h3>
                           <p className={`text-lg text-bonsai-dark/60 leading-relaxed font-light max-w-md ${language === 'ar' ? 'font-arabic' : ''}`}>{(t.project.clubhouse as any)?.[item.descKey]}</p>
                        </Reveal>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* --- 3. GALLERY PREVIEW --- */}
         <Section className="bg-white py-32" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 mb-16">
               <JapaneseTitle main={t.home.gallery.title} sub={t.home.gallery.sub} />
            </div>
            <div className="px-4 md:px-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((src, i) => (
                     <div key={i} className="relative group overflow-hidden h-[30vh] md:h-[40vh] rounded-sm cursor-pointer" onClick={() => openLightbox(i)}>
                        <ClipReveal src={src} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" direction="up" />
                     </div>
                  ))}
               </div>
            </div>
         </Section>
      </div>
   );
};

export default Amenities;
