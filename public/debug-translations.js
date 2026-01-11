// Debug script to test translation structure
console.log('=== TRANSLATION DEBUG ===');
console.log('Window translations exist:', !!window.SITE_TRANSLATIONS);

if (window.SITE_TRANSLATIONS) {
    console.log('English location.cats:', window.SITE_TRANSLATIONS.en?.location?.cats);
    console.log('Arabic location.cats:', window.SITE_TRANSLATIONS.ar?.location?.cats);
    console.log('English home.location.cats:', window.SITE_TRANSLATIONS.en?.home?.location?.cats);
    console.log('Arabic home.location.cats:', window.SITE_TRANSLATIONS.ar?.home?.location?.cats);
}
