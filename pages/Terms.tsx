
import React from 'react';
import { Section, Reveal, JapaneseTitle } from '../components/UI';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Terms: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-24 bg-[#F7F5F2] min-h-screen">
      <SEO 
        title={language === 'ar' ? "الشروط والأحكام | بونساي" : "Terms & Conditions | Bonsai Residences"}
        description={language === 'ar' ? "الشروط والأحكام لاستخدام موقع بونساي." : "Terms and Conditions for using the Bonsai Residences website."}
      />
      
      <Section className="max-w-4xl mx-auto bg-white my-12 shadow-sm border border-[#0F0E0D]/5 p-8 md:p-16">
        <Reveal>
          <JapaneseTitle 
            main={language === 'ar' ? "الشروط والأحكام" : "Terms & Conditions"} 
            sub={language === 'ar' ? "قانوني" : "Legal"} 
            center 
          />
          
          <div className={`mt-12 space-y-8 font-light leading-relaxed text-[#0F0E0D]/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
             
             {/* Last Updated */}
             <p className="text-xs uppercase tracking-widest opacity-50 mb-8">
              {language === 'ar' ? `آخر تحديث: ${new Date().toLocaleDateString('ar-SA')}` : `Last Updated: ${new Date().toLocaleDateString('en-US')}`}
            </p>

            {language === 'ar' ? (
              <>
                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">1. الموافقة على الشروط</h3>
                  <p>من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">2. الملكية الفكرية</h3>
                  <p>جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والتصاميم والشعارات والصور، هي ملكية حصرية لـ "مساكن بونساي" ومحمية بموجب قوانين حقوق النشر والعلامات التجارية.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">3. استخدام الموقع</h3>
                  <p>يُحظر عليك استخدام الموقع لأي غرض غير قانوني أو محظور بموجب هذه الشروط. لا يجوز لك محاولة الوصول غير المصرح به إلى الموقع أو الخوادم المرتبطة به.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">4. إخلاء المسؤولية</h3>
                  <p>يتم تقديم المعلومات الواردة في هذا الموقع لأغراض إعلامية عامة فقط. بينما نسعى جاهدين لضمان دقة المعلومات، فإننا لا نقدم أي ضمانات، صريحة أو ضمنية، بشأن اكتمال أو دقة أو توفر المعلومات المتعلقة بالمشروع.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">5. التعديلات</h3>
                  <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. استمرارك في استخدام الموقع بعد أي تعديلات يعتبر موافقة منك على الشروط الجديدة.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">6. القانون الواجب التطبيق</h3>
                  <p>تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية، وتخضع أي نزاعات للاختصاص القضائي الحصري لمحاكم الرياض.</p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">1. Acceptance of Terms</h3>
                  <p>By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in the Kingdom of Saudi Arabia.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">2. Intellectual Property</h3>
                  <p>All content on this website, including text, designs, logos, and images, is the exclusive property of Bonsai Residences and is protected by copyright and trademark laws.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">3. Use of Website</h3>
                  <p>You are prohibited from using the website for any unlawful purpose or any purpose prohibited by these terms. You may not attempt unauthorized access to the website or its related servers.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">4. Disclaimer</h3>
                  <p>The information provided on this website is for general informational purposes only. While we strive to ensure accuracy, we make no warranties, express or implied, regarding the completeness, accuracy, or availability of project information.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">5. Amendments</h3>
                  <p>We reserve the right to modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">6. Governing Law</h3>
                  <p>These terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, and any disputes shall be subject to the exclusive jurisdiction of the courts of Riyadh.</p>
                </section>
              </>
            )}
          </div>
        </Reveal>
      </Section>
    </div>
  );
};

export default Terms;
