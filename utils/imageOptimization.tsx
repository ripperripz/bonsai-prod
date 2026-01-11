/**
 * Image Optimization Utilities
 * 
 * Provides lazy loading and responsive image support
 */

import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
    onLoad?: () => void;
}

/**
 * Lazy loading image component with blur placeholder
 */
export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
    onLoad,
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before image enters viewport
            }
        );

        observer.observe(imgRef.current);

        return () => {
            observer.disconnect();
        };
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            loading="lazy"
        />
    );
};

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (
    basePath: string,
    sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
    return sizes
        .map((size) => {
            const extension = basePath.split('.').pop();
            const pathWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));
            return `${pathWithoutExt}-${size}w.${extension} ${size}w`;
        })
        .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Convert image to WebP format (client-side check)
 */
export const supportsWebP = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

/**
 * Get optimized image URL based on device pixel ratio
 */
export const getOptimizedImageUrl = (
    basePath: string,
    width: number
): string => {
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.round(width * dpr);
    const extension = basePath.split('.').pop();
    const pathWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));

    return `${pathWithoutExt}-${targetWidth}w.${extension}`;
};
