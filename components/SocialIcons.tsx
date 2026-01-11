import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const SocialLinks: React.FC<{ className?: string, iconClassName?: string }> = ({ className = "", iconClassName = "w-5 h-5" }) => {
  const links = [
    { icon: <Instagram className={iconClassName} />, url: "https://www.instagram.com/bonsai.ksa/", label: "Instagram" },
    { icon: <XIcon className={iconClassName} />, url: "https://x.com/Bonsai_sa", label: "X" },
    { icon: <TikTokIcon className={iconClassName} />, url: "https://www.tiktok.com/@bonsai.ksa", label: "TikTok" },
    { icon: <Youtube className={iconClassName} />, url: "https://www.youtube.com/@Bonsai_sa", label: "YouTube" },
    { icon: <Facebook className={iconClassName} />, url: "https://www.facebook.com/bonsai.sa", label: "Facebook" },
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-[#C6A87C] transition-colors duration-300 transform hover:scale-110"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};