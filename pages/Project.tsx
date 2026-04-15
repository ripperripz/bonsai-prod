import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, Button, ClipReveal, Lightbox } from '../components/UI';
import { MasterplanMap } from '../components/MasterplanMap';
import { SEO } from '../components/SEO';
import { Link, useParams } from 'react-router-dom';
import { Layout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Project: React.FC = () => {
   const { t, language } = useLanguage();
   const { id } = useParams<{ id: string }>();

   // Default to 'nahda' if no ID provided or project not found
   const projectId = (id && (t as any).projectDetails[id]) ? id : 'nahda';
   const projectData = (t as any).projectDetails[projectId];

   // Safe access to project translations
   const residencesT = projectData?.residences;
   const designT = projectData?.exceptionalDesign;
   const warrantiesT = projectData?.warranties;
   const paymentT = projectData?.payment;
   const masterplanT = projectData?.masterplan;
   const brandsT = projectData?.brands;
   const techT = projectData?.techSpecs;

   // --- Residences State ---
   const [activeUnit, setActiveUnit] = useState<'studio' | 'bed2' | 'bed3'>('bed2');

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


   // Unit Data
   const units = {
      studio: {
         key: 'studio',
         area: language === 'ar' ? "80م² - 85م²" : "80m² - 85m²",
         type: "Studio",
         image: "/images/13.png"
      },
      bed2: {
         key: 'bed2',
         area: language === 'ar' ? "85م² - 100م²" : "85m² - 100m²",
         type: "2 Bedrooms",
         image: "/images/14.png"
      },
      bed3: {
         key: 'bed3',
         area: language === 'ar' ? "100م² - 130م²" : "100m² - 130m²",
         type: "3 Bedrooms",
         image: "/images/13.png"
      }
   };


   const currentUnit = units[activeUnit];

   // Safety check - if no project data, show error
   if (!projectData) {
      return (
         <div className="pt-24 min-h-screen flex items-center justify-center bg-[#F7F5F2]">
            <div className="text-center">
               <h1 className="text-4xl font-bold text-[#0F0E0D] mb-4">Project Not Found</h1>
               <p className="text-[#0F0E0D]/60">The project "{id || 'nahda'}" could not be loaded.</p>
               <Link to="/" className="mt-8 inline-block">
                  <Button variant="primary">Return Home</Button>
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="pt-24 bg-[#F7F5F2]">
         <SEO
            title={language === 'ar' ? "مشروع بونساي | المخطط العام والمرافق" : "Project Amenities & Masterplan | Bonsai Riyadh"}
            description={language === 'ar' ? "استكشف المخطط العام لبونساي، غرفة الشاي اليابانية، السينما، والمرافق الفاخرة. اطلع على قرب المشروع من مترو الرياض وخطط الدفع." : "Explore Bonsai's masterplan, Japanese tea room, cinema, amenities, and proximity to Riyadh Metro. View floor plans and payment options."}
            keywords={[
               "Bonsai Masterplan", "Bonsai Amenities", "Japanese Tea Room Riyadh", "Bonsai Payment Plan", "Bonsai Floor Plans",
               "مخطط بونساي", "مرافق بونساي", "غرفة شاي يابانية", "خطة دفع بونساي", "مسقط افقي بونساي"
            ]}
            schema={{
               "@context": "https://schema.org",
               "@type": "ApartmentComplex",
               "name": "Bonsai Residences",
               "description": "Luxury residential project in Riyadh featuring Japanese design.",
               "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Khurais Road",
                  "addressLocality": "Nahdah District",
                  "addressRegion": "Riyadh",
                  "addressCountry": "SA"
               }
            }}
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

         {/* --- 1. THE RESIDENCES (Unit Typologies) --- */}
         <Section className="bg-[#F7F5F2] min-h-screen flex items-center">
            <div className="w-full">
               <Reveal>
                  <JapaneseTitle main={residencesT?.title || "The Residences"} sub={residencesT?.sub || "Typologies"} />
               </Reveal>

               <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Unit Controls (Tabs) */}
                  <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
                     {/* Starting Price Badge */}
                     <Reveal>
                        <div className="bg-gradient-to-br from-[#C6A87C] to-[#B8956A] p-8 shadow-xl">
                           <div className="flex flex-col gap-2">
                              <span className={`text-xs font-bold uppercase tracking-widest text-white/80 ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                                 {t.projects?.startingFrom || "Starting from"}
                              </span>
                              <div className={`flex items-baseline gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                 <span className={`text-4xl md:text-5xl font-light text-white ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                                    {(t.projects?.projectsList as any)?.[projectId]?.price || "TBA"}
                                 </span>
                                 <span className={`text-xl text-white/90 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                    {t.projects?.sar || "SAR"}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </Reveal>

                     <div className={`flex flex-col gap-2 ${language === 'ar' ? 'border-r-2 pr-0' : 'border-l-2 pl-0'} border-[#0F0E0D]/10`}>
                        {Object.entries(units).map(([key, unit]) => (
                           <button
                              key={key}
                              onClick={() => setActiveUnit(key as any)}
                              className={`text-left rtl:text-right py-4 text-2xl font-sans font-light transition-all duration-300 relative group 
                           ${language === 'ar' ? 'pr-6 hover:pr-8 font-arabic font-normal' : 'pl-6 hover:pl-8'}
                           ${activeUnit === key ? (language === 'ar' ? 'text-[#0F0E0D] font-medium pr-10' : 'text-[#0F0E0D] font-normal pl-10') : 'text-[#0F0E0D]/40 hover:text-[#C6A87C]'}`}
                           >
                              <span className={`absolute top-1/2 -translate-y-1/2 h-full w-[2px] transition-all duration-500 bg-[#C6A87C] 
                             ${language === 'ar' ? 'right-[-2px]' : 'left-[-2px]'}
                             ${activeUnit === key ? 'opacity-100' : 'opacity-0'}`}></span>
                              {(residencesT as any)?.[key]?.name || unit.type}
                           </button>
                        ))}
                     </div>

                     {/* Unit Details Box */}
                     <Reveal key={activeUnit} className="bg-white p-8 md:p-12 shadow-2xl mt-8">
                        <div className="flex justify-between items-end mb-8 border-b border-[#0F0E0D]/10 pb-4">
                           <div>
                              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] block mb-2">{residencesT?.specs?.type || "Type"}</span>
                              <h3 className={`text-3xl font-sans text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(residencesT as any)?.[activeUnit]?.name || currentUnit.type}</h3>
                           </div>
                           <div className="text-right rtl:text-left">
                              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] block mb-2">{residencesT?.specs?.area || "Area"}</span>
                              <span className={`text-xl font-mono text-[#0F0E0D]/70 ${language === 'ar' ? 'font-arabic' : ''}`}>{currentUnit.area}</span>
                           </div>
                        </div>

                        <p className={`text-[#0F0E0D]/70 font-light leading-relaxed mb-8 min-h-[80px] ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {(residencesT as any)?.[activeUnit]?.desc}
                        </p>

                        <ul className="space-y-3 mb-12">
                           {((residencesT as any)?.[activeUnit]?.features as string[] || []).map((feat, i) => (
                              <li key={i} className={`flex items-center gap-3 text-sm text-[#0F0E0D]/80 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                 <div className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full"></div>
                                 {feat}
                              </li>
                           ))}
                        </ul>

                        <Link to="/brochure">
                           <Button variant="outline" className="w-full">
                              <Layout size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />
                              {residencesT?.viewPlan || "View Floor Plan"}
                           </Button>
                        </Link>
                     </Reveal>
                  </div>

                  {/* Large Unit Image */}
                  <div className="lg:col-span-8 h-[50vh] lg:h-[80vh] relative overflow-hidden order-1 lg:order-2 group">
                     <ClipReveal
                        key={activeUnit}
                        src={currentUnit.image}
                        alt={currentUnit.type}
                        className="w-full h-full object-cover rounded-sm shadow-xl"
                        direction={language === 'ar' ? "right" : "left"}
                     />
                     <div className={`absolute bottom-8 ${language === 'ar' ? 'left-8' : 'right-8'} bg-white/90 backdrop-blur px-6 py-3 shadow-lg z-20`}>
                        <span className={`text-xs font-bold uppercase tracking-widest text-[#0F0E0D] ${language === 'ar' ? 'font-arabic' : ''}`}>{projectData?.interiorPerspective}</span>
                     </div>
                  </div>
               </div>
            </div>
         </Section>

         {/* Dynamic Header */}
         <div className="pt-32 pb-20 container mx-auto px-6">
            <Reveal>
               <JapaneseTitle
                  main={(t.projects?.projectsList as any)?.[projectId]?.name || "Bonsai"}
                  sub={(t.projects?.projectsList as any)?.[projectId]?.location || "Riyadh"}
               />
               <p className={`text-xl text-gray-400 mt-6 max-w-2xl leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                  {(t.projects?.projectsList as any)?.[projectId]?.description}
               </p>
            </Reveal>
         </div>

         {/* --- 2. EXCEPTIONAL DESIGN (P7) --- */}
         <Section className="bg-[#F7F5F2] py-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5">
                  <Reveal>
                     <JapaneseTitle main={designT?.title || "Exceptional Design"} sub={designT?.sub || "Honest Design"} />
                     <p className="text-[#0F0E0D]/60 text-lg leading-relaxed mt-8 font-light italic">
                        {designT?.quote}
                     </p>
                  </Reveal>
               </div>
               <div className="lg:col-span-7 flex flex-col justify-center">
                  <Reveal delay={200}>
                     <p className="text-xl md:text-2xl font-sans font-light text-[#0F0E0D] leading-relaxed">
                        {(t.designer as any)?.honestDesignDesc}
                     </p>
                  </Reveal>
               </div>
            </div>

            {/* Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
               <Reveal delay={0}>
                  <div className="bg-white p-12 border border-[#0F0E0D]/5 h-full">
                     <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-6 block">01</span>
                     <h3 className={`font-sans font-light text-3xl mb-6 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{designT?.spaceUtilization}</h3>
                     <p className={`text-[#0F0E0D]/70 leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {designT?.spaceUtilizationDesc}
                     </p>
                  </div>
               </Reveal>

               <Reveal delay={200}>
                  <div className="bg-white p-12 border border-[#0F0E0D]/5 h-full">
                     <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-6 block">02</span>
                     <h3 className={`font-sans font-light text-3xl mb-6 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{designT?.craftsmanship}</h3>
                     <p className={`text-[#0F0E0D]/70 leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {designT?.craftsmanshipDesc}
                     </p>
                  </div>
               </Reveal>
            </div>
         </Section>

         {/* --- 3. PAYMENT OPTIONS (P15) --- */}
         <Section className="bg-[#F7F5F2] py-24">
            <div className="max-w-6xl mx-auto px-4 md:px-0">
               <Reveal>
                  <JapaneseTitle main={paymentT?.paymentOptions} sub={paymentT?.recommendation} />
               </Reveal>

               <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* SECTION 1: CASH PAYMENT */}
                  <Reveal className="h-full">
                     <div className="bg-[#EAE8E4] p-8 md:p-12 lg:p-16 rounded-sm border border-[#0F0E0D]/5 flex flex-col h-full transform hover:shadow-xl transition-all duration-500">
                        <div className="mb-8">
                           <div className="inline-block px-4 py-1.5 bg-[#C6A87C] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm mb-8">
                              {paymentT?.preferredChoice}
                           </div>
                           <h3 className={`text-4xl md:text-5xl text-[#0F0E0D] font-light mb-8 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                              {paymentT?.cash100}
                           </h3>
                           <div className={`w-16 h-0.5 bg-[#C6A87C] mb-8 ${language === 'ar' ? 'mr-0' : 'ml-0'}`}></div>
                           <p className={`text-[#0F0E0D]/70 text-lg md:text-xl leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : 'font-sans text-[1.1rem]'}`}>
                              {paymentT?.desc}
                           </p>
                        </div>
                     </div>
                  </Reveal>

                  {/* SECTION 2: INSTALLMENT PLAN */}
                  <Reveal delay={200} className="h-full">
                     <div className="bg-white p-8 md:p-12 lg:p-16 rounded-sm border border-[#0F0E0D]/5 shadow-sm h-full flex flex-col transform hover:shadow-xl transition-all duration-500">
                        <div className="mb-10">
                           <h3 className={`text-4xl md:text-5xl text-[#0F0E0D] font-light mb-3 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                              {paymentT?.installmentPlan}
                           </h3>
                           <span className={`text-[#C6A87C] text-sm uppercase tracking-widest font-bold tracking-[0.2em] opacity-70 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                              {paymentT?.paymentOptions}
                           </span>
                        </div>

                        <div className="overflow-x-auto -mx-4 md:mx-0">
                           <table className={`w-full text-center border-collapse min-w-[320px] ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
                              <thead>
                                 <tr className="bg-[#F9F8F6] text-[#0F0E0D] border-b border-[#0F0E0D]/5">
                                    <th className={`py-4 px-3 font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#0F0E0D]/40 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                       #
                                    </th>
                                    <th className={`py-4 px-3 font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#0F0E0D]/40 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                       {language === 'ar' ? 'نسبة الإنجاز' : 'Completion'}
                                    </th>
                                    <th className={`py-4 px-3 font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#0F0E0D]/40 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                       {language === 'ar' ? 'الدفعة' : 'Installment'}
                                    </th>
                                    <th className={`py-4 px-3 font-medium text-[10px] md:text-xs uppercase tracking-widest text-[#0F0E0D]/40 ${language === 'ar' ? 'font-arabic' : ''}`}>
                                       {language === 'ar' ? 'الإجمالي' : 'Total'}
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="text-[#0F0E0D]">
                                 {[
                                    { id: 1, milestone: language === 'ar' ? 'عند الحجز' : 'Booking', value: '20%', total: '20%' },
                                    { id: 2, milestone: '20%', value: '15%', total: '35%' },
                                    { id: 3, milestone: '40%', value: '15%', total: '50%' },
                                    { id: 4, milestone: '60%', value: '15%', total: '65%' },
                                    { id: 5, milestone: '80%', value: '15%', total: '80%' },
                                    { id: 6, milestone: '100%', value: '15%', total: '95%' },
                                    { id: 7, milestone: language === 'ar' ? 'الاستلام' : 'Handover', value: '5%', total: '100%' },
                                 ].map((row, index) => (
                                    <tr key={index} className="border-b border-[#0F0E0D]/5 last:border-0 hover:bg-[#F9F8F6]/50 transition-colors">
                                       <td className="py-4 px-3 text-xs md:text-sm text-[#0F0E0D]/30">{row.id}</td>
                                       <td className={`py-4 px-3 text-xs md:text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>{row.milestone}</td>
                                       <td className="py-4 px-3 text-xs md:text-sm font-medium">{row.value}</td>
                                       <td className="py-4 px-3 text-xs md:text-sm font-bold text-[#C6A87C]">{row.total}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </div>
         </Section>

         {/* --- 4. WARRANTIES (P16) --- */}
         <Section className="bg-bonsai-beige text-bonsai-dark">
            <Reveal>
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 flex flex-col justify-between">
                     <div>
                        <JapaneseTitle main={warrantiesT?.title} sub={warrantiesT?.sub} />
                        <p className={`text-bonsai-dark/60 mt-8 mb-12 text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {warrantiesT?.desc}
                        </p>
                     </div>
                     <div className="hidden lg:block">
                        <Link to="/contact">
                           <Button variant="primary">{warrantiesT?.inquire}</Button>
                        </Link>
                     </div>
                  </div>

                  <div className="lg:col-span-8">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bonsai-dark/10 border border-bonsai-dark/10">
                        {[
                           { years: "10", title: warrantiesT?.items?.structure },
                           { years: "25", title: warrantiesT?.items?.electricPanels },
                           { years: "10", title: warrantiesT?.items?.insulation },
                           { years: "5", title: warrantiesT?.items?.electricPlumbing },
                           { years: "2", title: warrantiesT?.items?.fullWarranty },
                           { years: "2", title: warrantiesT?.items?.elevatorsLights },
                           { years: "1", title: warrantiesT?.items?.doorsPaint },
                           { years: "3", title: warrantiesT?.items?.aluminium },
                        ].map((w, i) => (
                           <div key={i} className="bg-bonsai-beige p-8 aspect-square flex flex-col justify-between group hover:bg-white transition-colors">
                              <Reveal delay={i * 50}>
                                 <div className="font-sans font-extralight text-5xl md:text-6xl text-[#C6A87C] opacity-80 group-hover:opacity-100 transition-opacity">{w.years}</div>
                                 <div className="mt-4">
                                    <span className={`text-[10px] uppercase tracking-widest text-bonsai-dark/40 mb-1 block ${language === 'ar' ? 'font-arabic' : ''}`}>{warrantiesT?.years}</span>
                                    <h4 className={`font-bold text-sm leading-tight text-bonsai-dark ${language === 'ar' ? 'font-arabic' : ''}`}>{w.title}</h4>
                                 </div>
                              </Reveal>
                           </div>
                        ))}
                     </div>
                     <div className="mt-12 lg:hidden">
                        <Link to="/contact">
                           <Button variant="primary">{warrantiesT?.inquire}</Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </Reveal>
         </Section>

         {/* --- 5. MASTERPLAN (P19) --- */}
         <Section className="bg-[#F7F5F2]" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 mb-16">
               <Reveal>
                  <JapaneseTitle main={masterplanT?.title || "Masterplan"} sub={masterplanT?.sub || "Layout"} />
                  <p className={`text-[#0F0E0D]/60 max-w-2xl font-light text-xl mt-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
                     {masterplanT?.desc}
                  </p>
               </Reveal>
            </div>
            <div className="w-full bg-white border-y border-[#0F0E0D]/10 py-12 md:py-24 overflow-hidden relative group cursor-zoom-in flex justify-center">
               <MasterplanMap className="w-full max-w-6xl" />
            </div>
         </Section>

         {/* --- 6. QUALITY BRANDS --- */}
         <Section className="bg-white">
            <div className="max-w-5xl mx-auto">
               <Reveal>
                  <div className="text-center mb-16">
                     <JapaneseTitle main={brandsT?.title} sub={brandsT?.sub} />
                     <p className={`text-bonsai-dark/60 mt-8 max-w-3xl mx-auto text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {brandsT?.desc}
                     </p>
                  </div>
               </Reveal>

               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center justify-items-center">
                  {[
                     "/images/rak.png",
                     "/images/siemens.png",
                     "/images/alfanar.png",
                     "/images/fujitec.png",
                     "/images/grohe.png",
                     "/images/ikea.png",
                     "/images/jazeera.jpeg",
                     "/images/jotun.png",
                     "/images/karimoku.png",
                     "/images/lg.png"
                  ].map((src, i) => {
                     const isLargerLogo = src.includes('rak.png') || src.includes('siemens.png');
                     const sizeClass = isLargerLogo ? 'h-20 md:h-24' : 'h-14 md:h-16';
                     return (
                        <Reveal key={i} delay={i * 50}>
                           <img src={src} alt="Brand Logo" className={`${sizeClass} w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500`} />
                        </Reveal>
                     );
                  })}
               </div>

               <Reveal>
                  <p className={`text-[#0F0E0D]/30 text-[10px] uppercase tracking-widest text-center mt-16 ${language === 'ar' ? 'font-arabic' : ''}`}>
                     {brandsT?.disclaimer}
                  </p>
               </Reveal>
            </div>
         </Section>

         {/* --- 7. TECHNICAL SPECIFICATIONS --- */}
         <Section className="bg-[#F7F5F2]">
            <div className="max-w-6xl mx-auto">
               <Reveal>
                  <div className="mb-16">
                     <JapaneseTitle main={techT?.title} sub={techT?.sub} />
                  </div>
               </Reveal>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <Reveal>
                     <div className="bg-white p-8 rounded-sm shadow-sm h-full border-t-2 border-[#C6A87C]">
                        <h3 className={`text-xl font-bold mb-8 flex items-center gap-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                           <span className="w-8 h-8 rounded-full bg-[#C6A87C]/10 flex items-center justify-center text-[#C6A87C] text-sm">01</span>
                           {techT?.architectural?.title}
                        </h3>
                        <ul className="space-y-4">
                           {(techT?.architectural?.items || []).map((item: string, i: number) => (
                              <li key={i} className={`flex items-start gap-3 text-sm text-[#0F0E0D]/70 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C] mt-1.5 shrink-0" />
                                 <span>{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </Reveal>

                  <Reveal delay={100}>
                     <div className="bg-white p-8 rounded-sm shadow-sm h-full border-t-2 border-[#C6A87C]">
                        <h3 className={`text-xl font-bold mb-8 flex items-center gap-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                           <span className="w-8 h-8 rounded-full bg-[#C6A87C]/10 flex items-center justify-center text-[#C6A87C] text-sm">02</span>
                           {techT?.mechanical?.title}
                        </h3>
                        <ul className="space-y-4">
                           {(techT?.mechanical?.items || []).map((item: string, i: number) => (
                              <li key={i} className={`flex items-start gap-3 text-sm text-[#0F0E0D]/70 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C] mt-1.5 shrink-0" />
                                 <span>{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </Reveal>

                  <Reveal delay={200}>
                     <div className="bg-white p-8 rounded-sm shadow-sm h-full border-t-2 border-[#C6A87C]">
                        <h3 className={`text-xl font-bold mb-8 flex items-center gap-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                           <span className="w-8 h-8 rounded-full bg-[#C6A87C]/10 flex items-center justify-center text-[#C6A87C] text-sm">03</span>
                           {techT?.electrical?.title}
                        </h3>
                        <ul className="space-y-4">
                           {(techT?.electrical?.items || []).map((item: string, i: number) => (
                              <li key={i} className={`flex items-start gap-3 text-sm text-[#0F0E0D]/70 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C] mt-1.5 shrink-0" />
                                 <span>{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </Reveal>
               </div>
            </div>
         </Section>

         {/* --- 8. GALLERY (P17) --- */}
         <Section className="bg-white py-32" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 mb-16 flex justify-between items-end">
               <JapaneseTitle main={t.home.gallery.title} sub={t.home.gallery.sub} />
            </div>
            <div className="px-4 md:px-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(0)}>
                     <ClipReveal
                        src={galleryImages[0]}
                        alt="Exterior View"
                        className="w-full h-full object-cover"
                        direction="up"
                     />
                  </div>
                  <div className="md:col-span-4 relative group overflow-hidden h-[40vh] md:h-[60vh] rounded-sm cursor-pointer" onClick={() => openLightbox(1)}>
                     <ClipReveal
                        src={galleryImages[1]}
                        alt="Interior Vertical"
                        className="w-full h-full object-cover"
                        direction="down"
                     />
                  </div>
                  <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[45vh] rounded-sm cursor-pointer" onClick={() => openLightbox(2)}>
                     <ClipReveal
                        src={galleryImages[2]}
                        alt="Interior Living"
                        className="w-full h-full object-cover"
                        direction={language === 'ar' ? "left" : "right"}
                     />
                  </div>
                  <div className="md:col-span-6 relative group overflow-hidden h-[30vh] md:h-[45vh] rounded-sm cursor-pointer" onClick={() => openLightbox(3)}>
                     <ClipReveal
                        src={galleryImages[3]}
                        alt="Interior Space"
                        className="w-full h-full object-cover"
                        direction="up"
                     />
                  </div>
                  {galleryImages.slice(4).map((src, i) => (
                     <div key={i} className="md:col-span-3 relative group overflow-hidden h-[25vh] md:h-[30vh] rounded-sm cursor-pointer" onClick={() => openLightbox(i + 4)}>
                        <ClipReveal src={src} alt={`Gallery Image ${i + 5}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" direction="up" />
                     </div>
                  ))}
               </div>
            </div>
         </Section>

         <Lightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            images={galleryImages}
            currentIndex={lightboxIndex}
            onNext={nextImage}
            onPrev={prevImage}
         />
      </div>
   );
};

export default Project;
