import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  schema?: object;
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  image = "https://images.squarespace-cdn.com/content/v1/687e6fecc1541a12c017e920/1722378948.659844-XFHPVDLZKRWQPRZZDPRI/imgg-od3-6clwzapc.png?format=2500w", 
  type = 'website',
  schema,
  keywords = []
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://bonsai.sa';
  const fullUrl = canonical ? canonical : siteUrl;

  const defaultKeywords = [
    "Bonsai Residences", "Luxury Apartments Riyadh", "Keiji Ashizawa", "Real Estate Saudi Arabia", 
    "Nahdah District", "بونساي", "شقق تمليك الرياض", "حي النهضة", "عقارات الرياض"
  ];
  
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(", ");

  return (
    <>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Bonsai Residences" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
};