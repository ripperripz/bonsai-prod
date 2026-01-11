import React, { useState } from 'react';
import { Section, Reveal, JapaneseTitle, Button } from '../components/UI';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    contactObjective: '', // Start empty to hide fields
    unitType: '',
    objective: '',
    payment: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Clear global error if user interacts
    if (formError) setFormError(null);
  };

  const handleSelection = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (formError) setFormError(null);
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, contactObjective: val }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = t.form.errors.required;
    if (!formData.lastName.trim()) newErrors.lastName = t.form.errors.required;
    if (!formData.mobile.trim()) newErrors.mobile = t.form.errors.required;
    // Basic email validation
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = t.form.errors.required;

    // Only validate conditional fields if "Purchase" is selected
    if (formData.contactObjective === 'purchase') {
      if (!formData.unitType) newErrors.unitType = t.form.errors.required;
      if (!formData.objective) newErrors.objective = t.form.errors.required;
      if (!formData.payment) newErrors.payment = t.form.errors.required;
    }

    if (!formData.message.trim()) newErrors.message = t.form.errors.required;

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // Create readable list of missing fields
      const missingFields = Object.keys(validationErrors).map(key => {
        // Map field keys to readable names based on translations (simple mapping fallback)
        const fieldNameMap: Record<string, string> = {
          firstName: t.form.firstName,
          lastName: t.form.lastName,
          mobile: t.form.mobile,
          email: t.form.email,
          unitType: t.form.unitType,
          objective: t.form.objective,
          payment: t.form.payment,
          message: t.form.message
        };
        return fieldNameMap[key] || key;
      }).join(', ');

      setFormError(`${t.form.errors.general} ${missingFields}`);

      // Auto-scroll to first error
      const keys = ['firstName', 'lastName', 'mobile', 'email', 'unitType', 'objective', 'payment', 'message'];
      for (const key of keys) {
        if (validationErrors[key]) {
          const el = document.getElementById(key);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
          }
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // ReCAPTCHA v3 Execution with Timeout and Graceful Fallback
      let recaptchaToken = '';
      if (window.grecaptcha) {
        await Promise.race([
          new Promise<void>((resolve) => {
            window.grecaptcha.ready(async () => {
              try {
                recaptchaToken = await window.grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action: 'submit' });
                console.log("ReCAPTCHA Token:", recaptchaToken);
              } catch (err) {
                console.warn("ReCAPTCHA execution failed (preview mode):", err);
              } finally {
                resolve();
              }
            });
          }),
          new Promise<void>(resolve => setTimeout(resolve, 1500))
        ]);
      } else {
        console.warn("ReCAPTCHA not loaded");
      }

      // Send email using Vercel serverless function
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          contactObjective: formData.contactObjective, // Send raw value ('purchase' or 'inquiry') or map it if needed, but the interface expects 'contactObjective'
          unitType: formData.unitType,
          objective: formData.objective,
          payment: formData.payment,
          message: formData.message,
          language: language
        })
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email. Please try again.');
      }

      console.log('Email sent successfully via PHP Backend');

      // Success - reset form
      setIsSuccess(true);
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        contactObjective: '',
        unitType: '',
        objective: '',
        payment: '',
        message: ''
      });
      setErrors({});

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);

      // Provide detailed error message
      let errorMessage = "Something went wrong. Please try again.";

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFormError(errorMessage);
    }
  };

  const SelectionGroup = ({ label, options, fieldKey }: { label: string, options: string[], fieldKey: 'unitType' | 'objective' | 'payment' }) => (
    <div id={fieldKey} className="scroll-mt-32">
      <label className={`block text-[10px] font-bold uppercase tracking-widest mb-4 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>
        {label} <span className="text-[#C6A87C]">{t.form.required}</span>
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelection(fieldKey, option)}
            className={`px-6 py-3 text-sm border transition-all duration-300 ${language === 'ar' ? 'font-arabic' : ''} ${formData[fieldKey] === option
              ? 'bg-[#0F0E0D] text-white border-[#0F0E0D]'
              : 'bg-transparent text-[#0F0E0D]/70 border-[#0F0E0D]/10 hover:border-[#C6A87C] hover:text-[#0F0E0D]'
              } ${errors[fieldKey] ? 'border-red-500 bg-red-50' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      {errors[fieldKey] && <p className="text-red-500 text-xs mt-2 font-medium">{errors[fieldKey]}</p>}
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-[#F7F5F2]">
      <SEO
        title={language === 'ar' ? "تواصل معنا | بونساي" : "Contact Us | Bonsai Residences"}
        description={language === 'ar' ? "تواصل مع بونساي للاستفسار عن مشروعنا السكني في الرياض." : "Contact Bonsai Residences for inquiries about our luxury apartments in Riyadh."}
        keywords={[
          "Register Bonsai", "Waiting List Riyadh", "Real Estate Investment Saudi", "Contact Bonsai",
          "التسجيل في بونساي", "قائمة انتظار بونساي", "استثمار عقاري الرياض", "تواصل مع بونساي"
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Bonsai",
          "description": "Contact page for Bonsai Residences."
        }}
      />

      <Section>
        {/* Mobile: Form first (Order 1), Info second (Order 2) */}
        {/* Desktop: Info left (Order 1), Form right (Order 2) */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-32">

          {/* Left Side (Desktop) / Bottom (Mobile) - Info */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <JapaneseTitle main={t.form.title} sub="Contact" />
              <p className={`text-[#0F0E0D]/70 mb-8 text-lg font-light leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.home.contact.joinDesc}
              </p>

              <div className={`space-y-12 font-sans font-light text-xl mt-16 border-t border-[#0F0E0D]/10 pt-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <div className="flex flex-col gap-4">
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-widest text-[#C6A87C] ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.projectLocation}</span>
                  {/* Fixed: Updated to show specific address using the new translation key */}
                  <span>{t.home.contact.address}</span>

                  <a href="https://maps.app.goo.gl/eMLR2QyXFUscTpjx6" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full md:w-auto mt-4">
                      <MapPin size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />
                      {t.home.contact.visit}
                    </Button>
                  </a>

                  <a href="https://maps.app.goo.gl/eMLR2QyXFUscTpjx6" target="_blank" rel="noreferrer" className={`text-xs font-sans uppercase tracking-wider text-[#0F0E0D]/40 hover:text-[#0F0E0D] transition-colors mt-1 block ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t.home.location.button}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side (Desktop) / Top (Mobile) - Form */}
          <div className="order-1 lg:order-2">
            <Reveal delay={200}>
              <form onSubmit={handleSubmit} className={`bg-white p-8 md:p-12 shadow-2xl border-t-4 border-[#C6A87C] relative ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className={`font-sans font-light text-3xl mb-8 text-[#0F0E0D] ${language === 'ar' ? 'font-arabic font-normal' : ''}`}>{t.form.title}</h3>

                {isSuccess ? (
                  <div className="bg-[#E6F4EA] border border-[#137333] text-[#137333] p-6 rounded-sm text-sm font-medium animate-in fade-in zoom-in-95 duration-500 mb-8 flex items-start gap-3">
                    <div className="mt-0.5">✓</div>
                    {t.form.success}
                  </div>
                ) : null}

                <div className="space-y-8">
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div id="firstName" className="scroll-mt-32">
                      <label className={`block text-[10px] font-bold uppercase tracking-widest mb-3 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.firstName} <span className="text-[#C6A87C]">*</span></label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        type="text"
                        className={`w-full border-b py-2 focus:outline-none focus:border-[#C6A87C] transition-colors bg-transparent placeholder-[#0F0E0D]/20 font-light ${errors.firstName ? 'border-red-500 bg-red-50/10' : 'border-[#0F0E0D]/10'}`}
                        placeholder={t.form.firstName}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.firstName}</p>}
                    </div>
                    <div id="lastName" className="scroll-mt-32">
                      <label className={`block text-[10px] font-bold uppercase tracking-widest mb-3 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.lastName} <span className="text-[#C6A87C]">*</span></label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        type="text"
                        className={`w-full border-b py-2 focus:outline-none focus:border-[#C6A87C] transition-colors bg-transparent placeholder-[#0F0E0D]/20 font-light ${errors.lastName ? 'border-red-500 bg-red-50/10' : 'border-[#0F0E0D]/10'}`}
                        placeholder={t.form.lastName}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-2 font-medium">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div id="mobile" className="scroll-mt-32">
                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-3 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.mobile} <span className="text-[#C6A87C]">*</span></label>
                    <div className="flex items-end gap-4">
                      <span className={`text-[#0F0E0D]/50 py-2 border-b border-[#0F0E0D]/10 ${language === 'ar' ? 'order-last' : ''}`}>+966</span>
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        type="tel"
                        className={`w-full border-b py-2 focus:outline-none focus:border-[#C6A87C] transition-colors bg-transparent placeholder-[#0F0E0D]/20 font-light text-left rtl:text-right ${errors.mobile ? 'border-red-500 bg-red-50/10' : 'border-[#0F0E0D]/10'}`}
                        placeholder="5X XXX XXXX"
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-2 font-medium">{errors.mobile}</p>}
                  </div>

                  <div id="email" className="scroll-mt-32">
                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-3 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.email} <span className="text-[#C6A87C]">*</span></label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      className={`w-full border-b py-2 focus:outline-none focus:border-[#C6A87C] transition-colors bg-transparent placeholder-[#0F0E0D]/20 font-light ${errors.email ? 'border-red-500 bg-red-50/10' : 'border-[#0F0E0D]/10'}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
                  </div>

                  {/* Contact Objective Radio Buttons */}
                  <div className="pt-4 border-t border-[#0F0E0D]/5">
                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-4 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {t.form.contactObjective}
                    </label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border border-[#0F0E0D]/30 flex items-center justify-center group-hover:border-[#C6A87C] ${formData.contactObjective === 'purchase' ? 'border-[#C6A87C]' : ''}`}>
                          {formData.contactObjective === 'purchase' && <div className="w-2 h-2 bg-[#C6A87C] rounded-full"></div>}
                        </div>
                        <input
                          type="radio"
                          name="contactObjective"
                          value="purchase"
                          checked={formData.contactObjective === 'purchase'}
                          onChange={handleObjectiveChange}
                          className="hidden"
                        />
                        <span className={`text-sm ${formData.contactObjective === 'purchase' ? 'text-[#0F0E0D] font-medium' : 'text-[#0F0E0D]/60'} ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.options.purchase}</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border border-[#0F0E0D]/30 flex items-center justify-center group-hover:border-[#C6A87C] ${formData.contactObjective === 'inquiry' ? 'border-[#C6A87C]' : ''}`}>
                          {formData.contactObjective === 'inquiry' && <div className="w-2 h-2 bg-[#C6A87C] rounded-full"></div>}
                        </div>
                        <input
                          type="radio"
                          name="contactObjective"
                          value="inquiry"
                          checked={formData.contactObjective === 'inquiry'}
                          onChange={handleObjectiveChange}
                          className="hidden"
                        />
                        <span className={`text-sm ${formData.contactObjective === 'inquiry' ? 'text-[#0F0E0D] font-medium' : 'text-[#0F0E0D]/60'} ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.options.inquiry}</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Fields - Only show if Purchase is explicitly selected */}
                  {formData.contactObjective === 'purchase' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                      <SelectionGroup
                        label={t.form.unitType}
                        options={[t.form.options.studio, t.form.options.bed2, t.form.options.bed3]}
                        fieldKey="unitType"
                      />

                      <SelectionGroup
                        label={t.form.objective}
                        options={[t.form.options.live, t.form.options.invest]}
                        fieldKey="objective"
                      />

                      <SelectionGroup
                        label={t.form.payment}
                        options={[t.form.options.cash, t.form.options.installments]}
                        fieldKey="payment"
                      />
                    </div>
                  )}

                  <div id="message" className="scroll-mt-32 pt-4">
                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-3 text-[#0F0E0D]/50 ${language === 'ar' ? 'font-arabic' : ''}`}>{t.form.message} <span className="text-[#C6A87C]">{t.form.required}</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full border-b py-2 focus:outline-none focus:border-[#C6A87C] transition-colors bg-transparent placeholder-[#0F0E0D]/20 font-light resize-none ${errors.message ? 'border-red-500 bg-red-50/10' : 'border-[#0F0E0D]/10'}`}
                      placeholder="..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-2 font-medium">{errors.message}</p>}
                  </div>

                  {/* Error Summary Banner - Near Submit Button */}
                  {formError && (
                    <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 p-4 rounded-sm text-sm animate-in fade-in">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* ReCAPTCHA Disclaimer */}
                  <div className={`text-[10px] text-[#0F0E0D]/40 leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {((t.form as any).recaptcha || "").split(/(<[12]>.*?<\/[12]>)/g).map((part: string, i: number) => {
                      if (part.startsWith("<1>")) {
                        return <a key={i} href="https://policies.google.com/privacy" className="underline hover:text-[#C6A87C]">{part.replace(/<\/?1>/g, "")}</a>;
                      }
                      if (part.startsWith("<2>")) {
                        return <a key={i} href="https://policies.google.com/terms" className="underline hover:text-[#C6A87C]">{part.replace(/<\/?2>/g, "")}</a>;
                      }
                      return part;
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-[#0F0E0D] text-white border border-[#0F0E0D] uppercase tracking-[0.15em] text-xs font-bold hover:bg-[#C6A87C] hover:border-[#C6A87C] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t.form.sending : t.form.submit}
                    </button>
                    <span className={`text-[10px] text-[#0F0E0D]/30 uppercase tracking-widest ${language === 'ar' ? 'font-arabic' : ''}`}>{t.common.requiredFields}</span>
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
