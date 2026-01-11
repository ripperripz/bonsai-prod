
import React from 'react';
import { Section, Reveal, JapaneseTitle } from '../components/UI';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-24 bg-[#F7F5F2] min-h-screen">
      <SEO 
        title={language === 'ar' ? "سياسة الخصوصية | بونساي" : "Privacy Policy | Bonsai Residences"}
        description={language === 'ar' ? "سياسة الخصوصية لمشروع مساكن بونساي." : "Privacy Policy for Bonsai Residences."}
      />
      
      <Section className="max-w-4xl mx-auto bg-white my-12 shadow-sm border border-[#0F0E0D]/5 p-8 md:p-16">
        <Reveal>
          <JapaneseTitle 
            main={language === 'ar' ? "سياسة الخصوصية" : "Privacy Policy"} 
            sub={language === 'ar' ? "البيانات" : "Legal"} 
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
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">1. مقدمة</h3>
                  <p>تحترم "مساكن بونساي" خصوصيتك وتلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند زيارة موقعنا الإلكتروني أو التواصل معنا.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">2. البيانات التي نجمعها</h3>
                  <p>قد نقوم بجمع الأنواع التالية من المعلومات:</p>
                  <ul className="list-disc pr-6 mt-2 space-y-2">
                    <li><strong>المعلومات الشخصية:</strong> الاسم، رقم الهاتف، البريد الإلكتروني، وغيرها من المعلومات التي تقدمها طوعاً عبر نماذج التواصل.</li>
                    <li><strong>بيانات الاستخدام:</strong> عنوان IP، نوع المتصفح، الصفحات التي قمت بزيارتها، ووقت الزيارة.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">3. كيفية استخدام البيانات</h3>
                  <p>نستخدم البيانات للأغراض التالية:</p>
                  <ul className="list-disc pr-6 mt-2 space-y-2">
                    <li>الرد على استفساراتك وتقديم المعلومات حول الوحدات السكنية.</li>
                    <li>تحسين تجربة المستخدم على الموقع.</li>
                    <li>إرسال تحديثات أو عروض ترويجية (يمكنك إلغاء الاشتراك في أي وقت).</li>
                    <li>الامتثال للمتطلبات القانونية والتنظيمية في المملكة العربية السعودية.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">4. مشاركة البيانات</h3>
                  <p>نحن لا نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة. قد نشارك المعلومات فقط مع:</p>
                  <ul className="list-disc pr-6 mt-2 space-y-2">
                    <li>مقدمي الخدمات الذين يساعدوننا في تشغيل الموقع (مثل خدمات الاستضافة).</li>
                    <li>الجهات الحكومية إذا كان ذلك مطلوباً بموجب القانون السعودي.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">5. أمن البيانات</h3>
                  <p>نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفشاء. ومع ذلك، لا يوجد نقل بيانات عبر الإنترنت آمن بنسبة 100%.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">6. ملفات تعريف الارتباط (Cookies)</h3>
                  <p>يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور. يمكنك تعديل إعدادات المتصفح لرفض ملفات تعريف الارتباط إذا رغبت في ذلك.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">7. اتصل بنا</h3>
                  <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر نموذج الاتصال في الموقع.</p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">1. Introduction</h3>
                  <p>Bonsai Residences respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or contact us.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">2. Information We Collect</h3>
                  <p>We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Personal Information:</strong> Name, phone number, email address, and other details you voluntarily provide via contact forms.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time of visit.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">3. How We Use Your Data</h3>
                  <p>We use your data for the following purposes:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>To respond to your inquiries and provide information about residential units.</li>
                    <li>To improve user experience on our website.</li>
                    <li>To send updates or promotional offers (you may opt-out at any time).</li>
                    <li>To comply with legal and regulatory requirements in Saudi Arabia.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">4. Data Sharing</h3>
                  <p>We do not sell or rent your personal data to third parties. We may share information only with:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Service providers who assist us in operating the website (e.g., hosting services).</li>
                    <li>Government authorities if required by Saudi law.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">5. Data Security</h3>
                  <p>We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure. However, no internet transmission is 100% secure.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">6. Cookies</h3>
                  <p>Our website uses cookies to enhance your experience and analyze traffic. You can adjust your browser settings to refuse cookies if you prefer.</p>
                </section>

                <section>
                  <h3 className="font-bold text-lg text-[#0F0E0D] mb-4">7. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us via the contact form on our website.</p>
                </section>
              </>
            )}
          </div>
        </Reveal>
      </Section>
    </div>
  );
};

export default Privacy;
