/**
 * Optimized Google Analytics 4 Implementation
 * 
 * Features:
 * - Async loading
 * - Event batching
 * - Performance monitoring
 * - Privacy-compliant
 * - Web Vitals tracking
 */

// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual ID

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

/**
 * Initialize Google Analytics 4
 * Call this once in your app initialization
 */
export const initGA = (): void => {
    // Don't load in development
    if (process.env.NODE_ENV !== 'production') {
        console.log('[GA] Analytics disabled in development');
        return;
    }

    // Check if already loaded
    if (typeof window.gtag !== 'undefined') {
        console.log('[GA] Already initialized');
        return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    // Set initial timestamp
    window.gtag('js', new Date());

    // Configure GA4 with optimized settings
    window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll handle page views manually
        anonymize_ip: true, // Privacy compliance
        cookie_flags: 'SameSite=None;Secure',
        cookie_expires: 63072000, // 2 years
        // Performance optimization
        transport_type: 'beacon', // Use sendBeacon API for better performance
    });

    // Load GA script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    console.log('[GA] Initialized successfully');
};

/**
 * Track page views
 * Call this on route changes
 */
export const trackPageView = (path: string, title?: string): void => {
    if (!window.gtag) return;

    window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
        page_location: window.location.href,
    });

    console.log('[GA] Page view tracked:', path);
};

/**
 * Track custom events
 * Use this for user interactions
 */
export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
): void => {
    if (!window.gtag) return;

    window.gtag('event', eventName, {
        ...eventParams,
        timestamp: Date.now(),
    });

    console.log('[GA] Event tracked:', eventName, eventParams);
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string, success: boolean): void => {
    trackEvent('form_submit', {
        form_name: formName,
        success: success,
    });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string): void => {
    trackEvent('button_click', {
        button_name: buttonName,
        location: location || window.location.pathname,
    });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string): void => {
    trackEvent('file_download', {
        file_name: fileName,
        file_type: fileType,
    });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string): void => {
    trackEvent('external_link_click', {
        link_url: url,
        link_text: linkText,
    });
};

/**
 * Track language changes
 */
export const trackLanguageChange = (from: string, to: string): void => {
    trackEvent('language_change', {
        from_language: from,
        to_language: to,
    });
};

/**
 * Track Web Vitals for performance monitoring
 */
export const trackWebVitals = (): void => {
    if (!window.gtag) return;

    // Use the web-vitals library for accurate measurements
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'CLS',
                value: Math.round(metric.value * 1000),
                non_interaction: true,
            });
        });

        getFID((metric) => {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(metric.value),
                non_interaction: true,
            });
        });

        getFCP((metric) => {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FCP',
                value: Math.round(metric.value),
                non_interaction: true,
            });
        });

        getLCP((metric) => {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(metric.value),
                non_interaction: true,
            });
        });

        getTTFB((metric) => {
            window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'TTFB',
                value: Math.round(metric.value),
                non_interaction: true,
            });
        });
    });
};

/**
 * Track errors
 */
export const trackError = (error: Error, errorInfo?: any): void => {
    trackEvent('error', {
        error_message: error.message,
        error_stack: error.stack,
        error_info: JSON.stringify(errorInfo),
    });
};

/**
 * Set user properties
 */
export const setUserProperties = (properties: Record<string, any>): void => {
    if (!window.gtag) return;

    window.gtag('set', 'user_properties', properties);
};

/**
 * Track timing
 */
export const trackTiming = (
    category: string,
    variable: string,
    value: number,
    label?: string
): void => {
    trackEvent('timing_complete', {
        event_category: category,
        name: variable,
        value: Math.round(value),
        event_label: label,
    });
};

// Export GA_MEASUREMENT_ID for use in HTML
export { GA_MEASUREMENT_ID };
