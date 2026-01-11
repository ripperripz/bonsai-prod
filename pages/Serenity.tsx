import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, ClipReveal, ParallaxText, MaskText, VideoModal } from '../components/UI';
import { SEO } from '../components/SEO';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Serenity: React.FC = () => {
   const [videoPlaying, setVideoPlaying] = useState(false);
   const { language, t } = useLanguage();

   const oasisImages = [
      "/images/serenity/1.png",
      "/images/serenity/2.png",
      "/images/serenity/3.png",
      "/images/serenity/4.png",
      "/images/serenity/5.png",
      "/images/serenity/6.png",
      "/images/serenity/7.png",
      "/images/serenity/8.png",
      "/images/serenity/9.png",
      "/images/serenity/10.png"
   ];

   return (
      <div className="pt-24 bg-[#F7F5F2]">
         <SEO
            title={language === 'ar' ? "واحة السكينة | تجربة بونساي" : "Oasis of Serenity | Bonsai Sensory Experience"}
            description={language === 'ar' ? "بونساي ليس مجرد مكان للعيش، بل هو تجربة معيشية متكاملة. اكتشف فلسفتنا في السكينة وتصميم الحدائق اليابانية." : "Bonsai is not just a place to live, it is a lived experience. Discover our philosophy of serenity, zen gardens, and sensory design."}
            keywords={[
               "Bonsai Serenity", "Zen Gardens Riyadh", "Japanese Design Philosophy", "Bonsai Sensory Experience",
               "سكينة بونساي", "حدائق يابانية الرياض", "فلسفة التصميم الياباني", "تجربة بونساي"
            ]}
            schema={{
               "@context": "https://schema.org",
               "@type": "WebPage",
               "name": "Oasis of Serenity",
               "description": "A sensory journey into the Japanese philosophy of Bonsai and serenity."
            }}
         />

         {/* Video Modal Component */}
         <VideoModal
            isOpen={videoPlaying}
            videoId="ji2qfRRIdlg"
            onClose={() => setVideoPlaying(false)}
         />

         {/* --- 1. BONSAI TREE (P2) - Definition --- */}
         <Section className="min-h-[80vh] flex items-center overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               {/* Tree Image - Clean, Organic, Cut-off Edge */}
               <div className={`relative order-2 lg:order-1 mt-12 lg:mt-0 ${language === 'ar' ? 'lg:-mr-32 xl:-mr-48' : 'lg:-ml-32 xl:-ml-48'}`}>
                  {/* Minimalist Presentation - No Frame, No Border, No Shadow */}
                  {/* Scale > 100% and negative margin to create bleed effect */}
                  <div className="relative z-10 w-[120%] lg:w-[130%] transform ltr:-translate-x-[15%] rtl:translate-x-[15%]">
                     <img
                        src="/images/bonsai tree.png"
                        alt="Bonsai Tree Definition"
                        className="h-full w-full object-contain filter contrast-[1.05]"
                     />
                  </div>
               </div>

               <Reveal className="order-1 lg:order-2">
                  <div className="mb-12">
                     <span className="text-[#C6A87C] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t.serenity?.treeDefinition || "Definition"}</span>
                     <h1 className="font-sans font-extralight text-7xl md:text-8xl text-[#0F0E0D] leading-[0.8] tracking-tight">{t.serenity?.treeTitleMain || "BONSAI"}</h1>
                  </div>
                  <p className="text-xl leading-relaxed font-light text-[#0F0E0D] mb-8">
                     {t.serenity?.treeDesc1 || "It is an art that blends horticulture, design, and meditation, requiring patience, precision, and skill."}
                  </p>
                  <div className="space-y-6 text-[#0F0E0D]/70 font-light leading-relaxed text-sm">
                     <p>
                        {t.serenity?.treeDesc2 || "Bonsai is a traditional Japanese art that involves growing trees in small containers. It is a craft passed down from generation to generation, rooted in a spirit of respect and contemplation. This quiet passion has become a reflection of refined taste."}
                     </p>
                     <p className="italic text-[#0F0E0D] border-l-2 border-[#C6A87C] pl-6 py-2">
                        {t.serenity?.treeQuote || "\"Owning a bonsai tree in Japan is considered a symbol of sophistication, calm presence, and deep appreciation for silent beauty.\""}
                     </p>
                  </div>
                  <div className="mt-8">
                     <p className="font-jp text-xs text-[#0F0E0D]/40 leading-relaxed">
                        {t.serenity?.treeJapanese || "盆栽は、小さな鉢の中で樹木を育てる日本の伝統芸術です。それは、栽培と造形、そして静かな瞑想を融合させた深い芸術であり、忍耐と精密さ、そして高度な技が求められます。"}
                     </p>
                  </div>
               </Reveal>
            </div>
         </Section>

         {/* --- 2. BONSAI PHILOSOPHY (P3) - Copied from Home --- */}
         <Section className="bg-[#F7F5F2] py-32 border-t border-[#0F0E0D]/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
               <div className="md:col-span-6 lg:col-span-5 relative z-10">
                  <Reveal>
                     <JapaneseTitle main={t.serenity?.philosophyTitle || "Philosophy"} sub={t.serenity?.philosophySub || "Bonsai Tree"} />
                  </Reveal>
                  <Reveal delay={200}>
                     <p className="text-2xl md:text-3xl font-sans font-light text-[#0F0E0D] mb-8 leading-tight">
                        {t.serenity?.philosophyQuote || "\"Beauty in simplicity. It is the heart of a timeless Japanese art form.\""}
                     </p>
                     <p className="text-[#0F0E0D]/60 font-light leading-relaxed mb-12">
                        {t.serenity?.philosophyDesc || "Bonsai is not just a small tree in a pot — it embodies harmony between nature and human presence. At Bonsai, we bring this philosophy to life through our residential projects — compact spaces designed with thoughtful intention."}
                     </p>
                     <div className="font-jp text-xs text-[#0F0E0D]/40 leading-relaxed mt-8">
                        盆栽は、ただの鉢に植えられた小さな木ではありません。それは、自然と人間の調和を体現する。
                     </div>
                  </Reveal>
               </div>

               <div className="md:col-span-6 lg:col-span-7 relative pl-0 md:pl-12">
                  {/* Editorial Image Composition */}
                  <div className="relative">
                     <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-[#E6E2DD] rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
                     <ParallaxText speed={-0.05}>
                        {/* Specific Bonsai Image */}
                        <ClipReveal
                           src="https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/35fda616-b056-490e-9343-a21989e818ab/The-Philosophy-Behind-Bonsai.jpg?format=2500w"
                           alt="Bonsai Tree Philosophy"
                           className="w-full aspect-[4/3] object-cover rounded-sm shadow-2xl"
                           direction="left"
                        />
                     </ParallaxText>
                  </div>
               </div>
            </div>
         </Section>

         {/* --- 3. SERENITY VIDEO (P5) - Updated to Light Theme --- */}
         <div className="w-full bg-[#EAE8E4] relative z-20 overflow-hidden py-12">
            <Reveal className="w-full">
               <div className="relative h-[50vh] md:h-[90vh] w-full overflow-hidden group cursor-none" data-cursor-text={'PLAY'}>
                  <div
                     className="relative w-full h-full"
                     onClick={() => setVideoPlaying(true)}
                  >
                     <ClipReveal
                        src="https://img.youtube.com/vi/ji2qfRRIdlg/maxresdefault.jpg"
                        className="w-full h-full object-cover"
                        direction="up"
                        alt="Serenity Video Cover"
                     />
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-white/10 transition-all duration-1000"></div>

                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-30">
                        <span className="text-white text-xs uppercase tracking-[0.4em] mb-4 block font-bold shadow-black drop-shadow-md">{t.hero?.film || "Watch Film"}</span>
                        <h2 className="text-white font-sans font-light text-6xl md:text-8xl drop-shadow-lg">{t.hero?.videoTitle || "Serenity"}</h2>
                        <div className="mt-8 w-24 h-24 rounded-full border border-white/60 flex items-center justify-center mx-auto scale-0 group-hover:scale-100 transition-transform duration-500 ease-luxury bg-white/20 backdrop-blur-md shadow-xl">
                           <Play className="fill-white text-white ml-1 w-8 h-8" />
                        </div>
                     </div>

                     <div className="absolute bottom-12 left-6 md:left-24 z-20 pointer-events-none">
                        <p className="text-white text-sm max-w-md font-light leading-relaxed drop-shadow-md">
                           {t.hero?.videoDesc || "Discover how serenity at Bonsai transforms into a sensory experience filled with tranquility and quiet beauty."}
                        </p>
                     </div>
                  </div>
               </div>
            </Reveal>
         </div>

         {/* --- 4. OASIS OF SERENITY (P4) - Sensory Experience --- */}
         <Section className="bg-white py-0" fullWidth>
            <div className="py-24 px-6 md:px-12 lg:px-24">
               <Reveal>
                  <JapaneseTitle main={t.serenity?.oasisTitle || "Oasis of Serenity"} sub={t.serenity?.oasisSub || "The Concept"} center />

                  {/* New Split Layout: Designer + Text */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 mb-24 items-center">

                     {/* Designer Image Side */}
                     <div className="lg:col-span-5 relative h-[60vh] lg:h-[70vh] overflow-hidden rounded-sm order-2 lg:order-1">
                        <ClipReveal
                           src="/images/designer.png"
                           alt="Keiji Ashizawa"
                           className="w-full h-full"
                           imgClassName="object-top" // Aligns image to top to fix head cutoff
                           direction="right"
                        />
                     </div>

                     {/* Text Side */}
                     <div className="lg:col-span-7 order-1 lg:order-2">
                        <p className="text-3xl md:text-4xl font-sans font-light text-[#0F0E0D] leading-tight mb-8">
                           <MaskText>{t.serenity?.oasisQuoteMain || "\"Our spaces are meticulously designed to offer a peaceful escape from the noise of the city — where calm becomes a language that speaks to every part of you.\""}</MaskText>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                           <div className="text-[#0F0E0D]/70 font-light leading-relaxed text-lg">
                              <p className="mb-6">
                                 {language === 'ar' ? "المصمم الياباني كيجي أتشيزاوا يعتقد أن السكينة الحقيقية تُشعر بها من خلال الحواس. ما تراه يعكس النقاء في اللون والتوازن في الشكل. ما تلمسه يشع دفئاً وراحة." : "Japanese designer Keiji Ashizawa believes that true serenity is felt through the senses. What you see reflects purity in color and balance in form. What you touch radiates warmth and comfort."}
                              </p>
                              <p>
                                 {language === 'ar' ? "ما تسمعه يهمس برقة من الطبيعة. حتى الروائح التي تملأ الهواء تم اختيارها بعناية لتستيقظ شعوراً عميقاً من الانسجام والراحة." : "What you hear whispers with the gentleness of nature. Even the scents that fill the air are carefully curated to awaken a deep sense of harmony and ease."}
                              </p>
                           </div>
                           <div className="font-jp text-sm text-[#0F0E0D]/60 leading-loose">
                              <p className="mb-4">
                                 盆栽において、静けさは住まいの体験の本質です。空間は都市の喧騒から離れた避難所となるよう、細部まで丁寧に設計されており、そこでは静けさが心と身体すべてに語りかける言葉となります。
                              </p>
                              <p>
                                 日本の建築家芦沢は、真の静けさは五感によって感じられると信じています。目に映るのは色彩の澄み切った調和、手に触れるものは温もりと安らぎを伝え、耳に届くのはまるで自然のささやきのような優しい音。
                              </p>
                           </div>
                        </div>
                        <div className="mt-12 text-[#0F0E0D]/80 italic border-t border-[#0F0E0D]/10 pt-8">
                           {t.serenity?.sensoryExperienceDesc || "\"This is not just a place to live — it is a lived experience that embraces all of you.\""}
                        </div>
                     </div>
                  </div>
               </Reveal>
            </div>

            {/* --- Creative Grid Layout for Images (Bento/Box Style) --- */}
            <div className="px-6 md:px-12 lg:px-24 pb-24">
               <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
                  {oasisImages.map((src, index) => {
                     // Grid Configuration for 10 images to form a 4x4 rectangular box
                     const spanClass = [
                        "md:col-span-2 md:row-span-2", // 0: Large Square Top-Left
                        "md:col-span-1 md:row-span-1", // 1: Small
                        "md:col-span-1 md:row-span-1", // 2: Small
                        "md:col-span-1 md:row-span-1", // 3: Small
                        "md:col-span-1 md:row-span-1", // 4: Small
                        "md:col-span-1 md:row-span-1", // 5: Small
                        "md:col-span-1 md:row-span-1", // 6: Small
                        "md:col-span-2 md:row-span-2", // 7: Large Square Bottom-Right
                        "md:col-span-1 md:row-span-1", // 8: Small
                        "md:col-span-1 md:row-span-1", // 9: Small
                     ][index] || "md:col-span-1 md:row-span-1";

                     return (
                        <div key={index} className={`relative group overflow-hidden rounded-sm ${spanClass} cursor-default`}>
                           <ClipReveal
                              src={src}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                              alt={`Oasis sensory ${index + 1}`}
                              direction="up"
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Section>
      </div>
   );
};

export default Serenity;