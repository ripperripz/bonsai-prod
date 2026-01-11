import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, ImageParallax, ClipReveal, VideoModal } from '../components/UI';
import { SEO } from '../components/SEO';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Designer: React.FC = () => {
   const [activeVideo, setActiveVideo] = useState<string | null>(null);
   const { language, t } = useLanguage();

   return (
      <div className="pt-24 bg-[#F7F5F2]">
         <SEO
            title={language === 'ar' ? "كيجي أتشيزاوا | مصمم بونساي" : "Keiji Ashizawa | Designer of Bonsai Residences"}
            description={language === 'ar' ? "تعرف على كيجي أتشيزاوا، المهندس المعماري الياباني الشهير وراء مساكن بونساي. استكشف فلسفتنا في التصميم الصادق." : "Meet Keiji Ashizawa, the world-renowned Japanese architect behind Bonsai Residences. Explore his philosophy of honest design and global collaborations."}
            keywords={[
               "Keiji Ashizawa", "Japanese Architect Riyadh", "Honest Design Philosophy", "Bonsai Architect",
               "كيجي اشيزاوا", "معماري ياباني", "تصميم صادق", "مصمم بونساي"
            ]}
            schema={{
               "@context": "https://schema.org",
               "@type": "Person",
               "name": "Keiji Ashizawa",
               "jobTitle": "Architect",
               "nationality": "Japanese",
               "url": "https://www.keijidesign.com/",
               "sameAs": ["https://www.instagram.com/keijiashizawa/", "https://en.wikipedia.org/wiki/Keiji_Ashizawa"]
            }}
         />

         {/* Video Modal Component */}
         <VideoModal
            isOpen={!!activeVideo}
            videoId={activeVideo || ""}
            onClose={() => setActiveVideo(null)}
         />

         {/* Bio Section (P6) */}
         <Section className="pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
               <Reveal>
                  {/* Adjusted leading and margin to prevent cut-off. Increased padding significantly. */}
                  <div className="overflow-visible pb-8">
                     <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-extralight text-[#0F0E0D] mb-12 leading-none pb-4">
                        {(t.designer as any)?.nameFirst || "KEIJI"} <br />
                        <span className={`font-light text-[#C6A87C] inline-block ${language === 'ar' ? 'mr-4 md:mr-12' : 'ml-4 md:ml-12'}`}>{(t.designer as any)?.nameLast || "ASHIZAWA"}</span>
                        <span className={`block font-jp text-3xl md:text-4xl mt-6 text-[#0F0E0D] font-light tracking-wide opacity-80 ${language === 'ar' ? 'mr-4 md:mr-12' : 'ml-4 md:ml-12'}`}>{t.designer?.bioJapanese || '芦沢 啓治'}</span>
                     </h1>
                  </div>
                  <div className={`flex gap-4 items-start border-[#C6A87C] mt-12 ${language === 'ar' ? 'border-r-2 pr-6' : 'border-l-2 pl-6'}`}>
                     <div className="text-lg leading-relaxed text-[#0F0E0D]/80 font-light max-w-lg space-y-6">
                        <p>{t.designer?.bio1}</p>
                        <p>{t.designer?.bio2}</p>
                        <p>{t.designer?.bio3}</p>
                     </div>
                  </div>
                  <div className="mt-12 grid grid-cols-2 gap-8 text-xs uppercase tracking-widest text-[#0F0E0D]/50">
                     <div>
                        <strong className="block text-[#0F0E0D] mb-1">{t.designer?.roleLabel}</strong>
                        {t.designer?.roleValue}
                     </div>
                     <div>
                        <strong className="block text-[#0F0E0D] mb-1">{t.designer?.collaborationsLabel}</strong>
                        {t.designer?.collaborationsValue}
                     </div>
                  </div>
               </Reveal>

               {/* Architect Image - Cutout / Lifelike Effect */}
               <div className="relative mt-20 lg:mt-0">
                  {/* Decorative Background Frame - Offset to create depth */}
                  <div className={`absolute top-12 w-full h-[90%] border-2 border-[#C6A87C]/30 z-0 ${language === 'ar' ? '-left-6' : '-right-6'}`}></div>

                  {/* Main Image Container - No Overflow Hidden, Floating Effect */}
                  <div className="relative z-10 w-full h-[60vh] md:h-[80vh] -mt-12 lg:-mt-24 shadow-2xl transform transition-transform duration-700 hover:-translate-y-2">
                     <img
                        src="/images/designer.png"
                        alt="Keiji Ashizawa"
                        className="h-full w-full object-cover object-top rounded-sm"
                        style={{ objectPosition: 'top center' }}
                     />
                  </div>
               </div>
            </div>
         </Section>

         {/* Bonsai Story Video (P5) */}
         <div className="w-full bg-bonsai-stone relative z-20 overflow-hidden py-24">
            <Section fullWidth className="py-0">
               <Reveal>
                  <JapaneseTitle main={t.designer?.storyTitle || "Bonsai Story"} sub={t.designer?.storySubtitle || "The Journey"} center />
               </Reveal>
               <div className="relative h-[40vh] md:h-[80vh] w-full max-w-7xl mx-auto mt-12 overflow-hidden group cursor-none border border-bonsai-dark/5" data-cursor-text={'PLAY'}>
                  <div
                     className="relative w-full h-full bg-black"
                     onClick={() => setActiveVideo("2Di2M-psck4")}
                  >
                     <ClipReveal
                        src="https://img.youtube.com/vi/2Di2M-psck4/maxresdefault.jpg"
                        className="w-full h-full object-cover"
                        direction="up"
                        alt="Bonsai Story Video Cover"
                     />
                     <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-all duration-1000"></div>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/30 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-luxury bg-white/10 backdrop-blur-sm z-30">
                        <Play className="fill-white text-white ml-1 w-8 h-8" />
                     </div>
                     <div className={`absolute bottom-8 md:bottom-12 z-30 pointer-events-none w-full text-center md:text-left md:w-auto ${language === 'ar' ? 'right-0 md:right-12' : 'left-0 md:left-12'}`}>
                        <p className="text-white font-sans font-light text-xl md:text-3xl italic shadow-black drop-shadow-md px-4">{t.designer?.storyQuote || '"A vision tailored for Riyadh"'}</p>
                     </div>
                  </div>
               </div>
            </Section>
         </div>

         {/* Designer Touches (P12) */}
         <Section className="bg-bonsai-beige text-bonsai-dark py-0" fullWidth>
            <div className="px-6 md:px-12 lg:px-24 pt-24 pb-12">
               <Reveal>
                  <JapaneseTitle main={t.designer?.materialityTitle || "Materiality"} sub={t.designer?.materialitySub || "Touch"} />
                  <p className="max-w-3xl mb-12 opacity-80 font-light text-lg leading-relaxed">
                     {t.designer?.materialityDesc || "We don't just build residential units — we craft spaces with a distinct spirit, born from meticulous attention to detail. In every corner, every texture, and every finish, we embed thoughtful design and care that transforms living into an exceptional experience beyond the ordinary."}
                  </p>
               </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 min-h-[90vh]">
               {[
                  {
                     title: t.designer?.copperTitle || "Copper",
                     sub: t.designer?.copperSub || "Elegance",
                     desc: t.designer?.copperDesc || "A touch of copper adds a warm glow and timeless elegance...",
                     img: "/images/copper.jpeg"
                  },
                  {
                     title: t.designer?.woodTitle || "Wood",
                     sub: t.designer?.woodSub || "Warmth",
                     desc: t.designer?.woodDesc || "Natural wood brings warmth and nostalgia...",
                     img: "/images/wood.png"
                  },
                  {
                     title: t.designer?.stoneTitle || "Stone",
                     sub: t.designer?.stoneSub || "Authenticity",
                     desc: t.designer?.stoneDesc || "A touch of stone gives the unit...",
                     img: "/images/stone.png"
                  },
               ].map((item, i) => (
                  <div key={i} className={`group relative cursor-none overflow-hidden h-[60vh] md:h-auto ${language === 'ar' ? 'border-l' : 'border-r'} border-bonsai-dark/5`} data-cursor-text="FEEL">
                     <div className="absolute inset-0 z-0">
                        <ImageParallax src={item.img} alt={item.title} className="w-full h-full object-cover" speed={0.1} />
                     </div>

                     <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
                     <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                        <span className="text-[#C6A87C] uppercase tracking-widest text-xs mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-bold bg-white/80 w-fit px-2 py-1 shadow-sm">{item.sub}</span>
                        <h3 className="font-sans font-light text-5xl md:text-6xl text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 drop-shadow-md">{item.title}</h3>
                        <p className="text-sm text-white font-light leading-relaxed max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 drop-shadow-md bg-black/20 p-4 backdrop-blur-sm rounded-sm">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </Section>

         {/* World Renowned Section (Video) */}
         <div className="w-full bg-[#EAE8E4] relative z-20 overflow-hidden py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
               <Reveal>
                  <JapaneseTitle main={t.designer?.worldRenownedTitle || "World Renowned"} sub={t.designer?.worldRenownedSub || "Global Reach"} />
                  <p className="text-[#0F0E0D]/70 text-lg leading-relaxed mb-8 max-w-2xl">
                     {t.designer?.worldRenownedDesc || "Ashizawa designs furniture for some of the world's leading furniture brands, such as IKEA and Karimoku, in collaboration with renowned international designers."}
                  </p>
               </Reveal>

               <div className="relative h-[40vh] md:h-[70vh] w-full mt-12 overflow-hidden group cursor-none rounded-sm shadow-2xl" data-cursor-text={'PLAY'}>
                  <div
                     className="relative w-full h-full bg-black"
                     onClick={() => setActiveVideo("_iFlIdJNM54")}
                  >
                     <ClipReveal
                        src="https://lh7-rt.googleusercontent.com/slidesz/AGV_vUemiyjYWCG_9X0Wi6gLn1c4xg6wMN4VVDP9Wh5ZooEFHzlOupxJQi-fPEshEoA7Ab9FTs8j2k6YuQIKvCfXGwwahe5KUXJ7vihNv809fNO2VxqnBy04oM7DpThmir0a0gk=s2048?key=mtp0HJ7MvOLW-1kzK49C-A&cb=1764431821781"
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                        direction="up"
                        alt="Furniture Design Video Cover"
                     />
                     <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-all duration-1000"></div>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/50 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-500 ease-luxury bg-black/20 backdrop-blur-sm z-30">
                        <Play className="fill-white text-white ml-1 w-6 h-6" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bridge Between Cultures (P18) */}
         <div className="bg-[#E6E2DD] text-[#0F0E0D] py-32 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-24">
               <Reveal>
                  <JapaneseTitle main={t.designer?.bridgeTitle || "Bridge Between Cultures"} sub={t.designer?.bridgeSub || "Fusion"} />
                  <p className="max-w-3xl text-lg font-light leading-relaxed">
                     {t.designer?.bridgeDesc || "The Bonsai project represents a unique bridge between Japanese depth and Saudi authenticity — drawing inspiration from the rich traditions and architectural philosophies of both cultures, united by their shared respect for simplicity, detail, and the harmonious relationship between human and space."}
                  </p>
               </Reveal>
            </div>

            {/* Side by Side Comparison Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
               {/* Saudi Side */}
               <div className={`px-6 md:px-12 lg:px-24 pb-24 ${language === 'ar' ? 'border-l' : 'border-r'} border-[#0F0E0D]/5`}>
                  <div className="flex items-center gap-4 mb-16 opacity-50">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/2560px-Flag_of_Saudi_Arabia.svg.png" alt="Saudi" className="w-6" />
                     <span className={`text-xs uppercase tracking-[0.3em] font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>{t.designer?.saudiInspiration || "Inspiration from Saudi Culture"}</span>
                  </div>

                  <div className="space-y-24">
                     {[
                        {
                           title: (t.designer as any)?.saudiCourtyard || "Courtyard (فناء)",
                           desc: (t.designer as any)?.saudiCourtyardDesc || "We’ve revived the spirit of the traditional Saudi courtyard...",
                           img: "/images/courtyard.jpeg"
                        },
                        {
                           title: (t.designer as any)?.saudiCopper || "Copper (نحاس)",
                           desc: (t.designer as any)?.saudiCopperDesc || "Copper — long used to adorn...",
                           img: "/images/copper.jpeg"
                        },
                        {
                           title: (t.designer as any)?.saudiWater || "Water (ماء)",
                           desc: (t.designer as any)?.saudiWaterDesc || "We drew inspiration from the presence of water...",
                           img: "/images/water.jpeg"
                        },
                     ].map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="mb-6 overflow-hidden h-[300px]">
                              <ImageParallax src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" speed={0.05} />
                           </div>
                           <h3 className="font-sans font-light text-3xl mb-4 flex items-center gap-4">{item.title}</h3>
                           <p className="text-sm leading-loose opacity-70 max-w-sm text-justify">{item.desc}</p>
                        </Reveal>
                     ))}
                  </div>
               </div>

               {/* Japanese Side */}
               <div className="px-6 md:px-12 lg:px-24 pb-24 mt-24 lg:mt-0">
                  <div className="flex items-center gap-4 mb-16 opacity-50">
                     <div className="w-6 h-4 bg-white border border-gray-200 flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                     </div>
                     <span className={`text-xs uppercase tracking-[0.3em] font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>{t.designer?.japaneseInspiration || "Inspiration from Japanese Culture"}</span>
                  </div>

                  <div className="space-y-24">
                     {[
                        {
                           title: (t.designer as any)?.japaneseShoji || "Shoji (障子)",
                           desc: (t.designer as any)?.japaneseShojDesc || "We drew inspiration from the spirit of Japanese shoji...",
                           img: "/images/shoji.jpg"
                        },
                        {
                           title: (t.designer as any)?.japaneseTokonoma || "Tokonoma (床の間)",
                           desc: (t.designer as any)?.japaneseTokonoDesc || "At the heart of the Japanese tea room...",
                           img: "/images/tokonoma.jpg"
                        },
                        {
                           title: (t.designer as any)?.japaneseTatami || "Tatami (畳)",
                           desc: (t.designer as any)?.japaneseTatamiDesc || "With a touch inspired by Japanese culture...",
                           img: "/images/tatami.jpg"
                        },
                     ].map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="mb-6 overflow-hidden h-[300px]">
                              <ImageParallax src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" speed={0.05} />
                           </div>
                           <h3 className="font-sans font-light text-3xl mb-4 flex items-center gap-4">{item.title}</h3>
                           <p className="text-sm leading-loose opacity-70 max-w-sm text-justify">{item.desc}</p>
                        </Reveal>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Exceptional Design (P7) */}
         <Section className="bg-white">
            <div className="max-w-6xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-5">
                     <Reveal>
                        <JapaneseTitle main={t.designer?.honestDesignTitle || "Honest Design"} sub={t.designer?.honestDesignSub || "Philosophy"} />
                     </Reveal>
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-center">
                     <Reveal delay={200}>
                        <p className="text-xl md:text-2xl font-sans font-light text-[#0F0E0D] leading-relaxed">
                           {t.designer?.honestDesignDesc || "Ashizawa embraces a philosophy of honest design, where simplicity meets functionality and essence takes precedence over ornamentation. In his work, every line has meaning, and every material is left in its natural state — resulting in a pure design that speaks the language of honesty and balance."}
                        </p>
                     </Reveal>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0F0E0D]/10 border border-[#0F0E0D]/10 mt-24">
                  <div className="bg-white p-12 hover:bg-[#F7F5F2] transition-colors">
                     <Reveal delay={200}>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-4 block">01</span>
                        <h3 className={`font-sans font-light text-3xl mb-4 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.designer as any)?.spaceUtilizationTitle}</h3>
                        <p className={`text-sm text-[#0F0E0D]/70 leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {(t.designer as any)?.spaceUtilizationDesc}
                        </p>
                     </Reveal>
                  </div>
                  <div className="bg-white p-12 hover:bg-[#F7F5F2] transition-colors">
                     <Reveal delay={300}>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C6A87C] mb-4 block">02</span>
                        <h3 className={`font-sans font-light text-3xl mb-4 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{(t.designer as any)?.craftsmanshipTitle}</h3>
                        <p className={`text-sm text-[#0F0E0D]/70 leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                           {(t.designer as any)?.craftsmanshipDesc}
                        </p>
                     </Reveal>
                  </div>
               </div>
            </div>
         </Section>
      </div>
   );
};

export default Designer;
