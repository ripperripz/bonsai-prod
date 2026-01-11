import React from 'react';
import { Section, Reveal, JapaneseTitle, Button, ClipReveal } from '../components/UI';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
   const { t, language } = useLanguage();
   // Cast to any to avoid TS errors as types update dynamically
   const projectsT = t.projects;
   const list = (projectsT as any).projectsList;

   // Define project order
   const projectKeys = ['nahda', 'aredh', 'remal', 'tower'];

   return (
      <div className="pt-24 bg-[#F7F5F2] min-h-screen">
         <SEO
            title={projectsT.seo.title}
            description={projectsT.seo.description}
            keywords={language === 'ar' ?
               ["مشاريع بونساي", "شقق تمليك الرياض", "مشاريع عقارية فاخرة"] :
               ["Bonsai Projects", "Riyadh Real Estate", "Luxury Apartments"]
            }
         />

         <Section className="pb-16" fullWidth>
            <div className="px-6 md:px-12 lg:px-24">
               <Reveal>
                  <div className="text-center mb-20">
                     <JapaneseTitle main={projectsT.title} sub={projectsT.sub} center />
                     <p className={`text-bonsai-dark/60 mt-8 max-w-2xl mx-auto text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {projectsT.desc}
                     </p>
                  </div>
               </Reveal>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                  {projectKeys.map((key, index) => {
                     const project = list[key];
                     if (!project) return null;

                     const isAvailable = project.status === 'available';

                     return (
                        <Reveal key={key} delay={index * 100}>
                           <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full border border-[#0F0E0D]/5 transform hover:-translate-y-1">
                              {/* Image Container */}
                              <div className="relative h-[400px] overflow-hidden">
                                 <ClipReveal
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full"
                                    imgClassName="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    direction="up"
                                 />
                                 {/* Overlay */}
                                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>

                                 {/* Status Badge */}
                                 <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'} z-20`}>
                                    <span className={`px-4 py-1.5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg border border-white/20
                                       ${isAvailable ? 'bg-emerald-600/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                                       {isAvailable ? projectsT.available : projectsT.comingSoon}
                                    </span>
                                 </div>
                              </div>

                              {/* Content */}
                              <div className="p-8 md:p-10 flex flex-col flex-grow relative bg-white">
                                 <div className="flex justify-between items-start mb-6">
                                    <div>
                                       <span className="text-xs text-[#C6A87C] uppercase tracking-widest block mb-2 font-bold">{project.location}</span>
                                       <h3 className={`text-3xl text-[#0F0E0D] font-light mb-2 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                                          {project.name}
                                       </h3>
                                    </div>
                                 </div>

                                 <p className={`text-[#0F0E0D]/60 mb-8 flex-grow leading-relaxed font-light ${language === 'ar' ? 'font-arabic' : ''}`} style={{ minHeight: '4.5em' }}>
                                    {project.description}
                                 </p>

                                 {/* Specs Grid */}
                                 <div className="grid grid-cols-2 gap-8 mb-10 border-y border-[#0F0E0D]/5 py-6">
                                    <div>
                                       <span className="text-[10px] uppercase tracking-widest text-[#0F0E0D]/40 block mb-2">{projectsT.units}</span>
                                       <span className={`text-xl font-medium text-[#0F0E0D] ${language === 'ar' ? 'font-arabic' : 'font-mono'}`}>{project.units}</span>
                                    </div>
                                    <div className={`${language === 'ar' ? 'text-left' : 'text-right'}`}>
                                       <span className="text-[10px] uppercase tracking-widest text-[#0F0E0D]/40 block mb-2">{projectsT.startingFrom}</span>
                                       <div className="flex items-baseline gap-1 justify-end">
                                          <span className={`text-xl font-bold text-[#C6A87C] ${language === 'ar' ? 'font-arabic' : 'font-mono'}`}>
                                             {project.price}
                                          </span>
                                          {project.price !== 'TBA' && project.price !== 'سيُعلن قريباً' && (
                                             <span className="text-xs text-[#0F0E0D]/40">{projectsT.sar}</span>
                                          )}
                                       </div>
                                    </div>
                                 </div>

                                 {/* Action Button */}
                                 <div className="mt-auto">
                                    {isAvailable ? (
                                       <Link to={project.link} className="block w-full">
                                          <Button variant="primary" className="w-full">
                                             {language === 'ar' ? 'عرض المشروع' : 'View Project'}
                                          </Button>
                                       </Link>
                                    ) : (
                                       <Button variant="outline" className="w-full opacity-40 cursor-not-allowed border-gray-300 text-gray-400 hover:border-gray-300 hover:text-gray-400">
                                          {projectsT.comingSoon}
                                       </Button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </Reveal>
                     );
                  })}
               </div>
            </div>
         </Section>
      </div>
   );
};

export default Projects;
