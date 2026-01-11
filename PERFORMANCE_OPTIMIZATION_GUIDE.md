# Website Performance Optimization Guide

## Executive Summary
This guide provides comprehensive strategies to make your Bonsai website significantly faster, including Google Analytics optimization.

## Current Performance Issues

### 1. **Bundle Size & Loading**
- Large translations file (51KB) loaded synchronously
- No route-based code splitting
- All pages loaded upfront
- External scripts blocking render

### 2. **Google Analytics**
- Not yet implemented (or needs optimization)
- Should use GA4 with proper async loading
- Event tracking needs optimization

### 3. **Asset Loading**
- Fonts loaded from Google CDN
- External libraries (Leaflet, Lenis) not optimized
- No image lazy loading strategy
- Missing resource hints

## Optimization Strategies

### Phase 1: Immediate Wins (1-2 hours)

#### 1.1 Optimize Vite Build Configuration
- Enable compression
- Optimize chunk splitting
- Add preload directives
- Enable CSS minification

#### 1.2 Implement Google Analytics 4 (Optimized)
- Use gtag.js with async loading
- Implement event batching
- Add performance monitoring
- Use Google Tag Manager for better control

#### 1.3 Lazy Load Routes
- Implement React.lazy() for all routes
- Add Suspense boundaries
- Preload critical routes

#### 1.4 Optimize External Scripts
- Defer non-critical scripts
- Use async where possible
- Load reCAPTCHA only on Contact page

### Phase 2: Advanced Optimizations (2-4 hours)

#### 2.1 Image Optimization
- Convert images to WebP/AVIF
- Implement lazy loading
- Add responsive images
- Use blur placeholders

#### 2.2 Font Optimization
- Self-host critical fonts
- Use font-display: swap
- Preload critical fonts
- Subset fonts for Arabic/English

#### 2.3 Translation Optimization
- Split translations by route
- Lazy load non-critical translations
- Compress translation data
- Use dynamic imports

#### 2.4 Caching Strategy
- Implement service worker
- Add cache headers
- Use CDN for static assets
- Enable browser caching

### Phase 3: Advanced Performance (4-8 hours)

#### 3.1 Code Splitting
- Split vendor bundles
- Route-based splitting
- Component-level splitting
- Dynamic imports for heavy components

#### 3.2 Performance Monitoring
- Add Web Vitals tracking
- Implement error tracking
- Monitor bundle sizes
- Track user interactions

#### 3.3 Server Optimization
- Enable Brotli compression
- Add HTTP/2 push
- Implement CDN
- Optimize server response time

## Implementation Details

### Google Analytics 4 Setup (Optimized)

**Benefits:**
- 40-60% faster than traditional GA
- Better privacy compliance
- Enhanced event tracking
- Real-time performance monitoring

**Implementation:**
```html
<!-- Optimized GA4 Script -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', {
    'send_page_view': false, // Manual page view tracking
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

### Expected Performance Improvements

| Metric | Current | After Phase 1 | After Phase 2 | After Phase 3 |
|--------|---------|---------------|---------------|---------------|
| First Contentful Paint | ~2.5s | ~1.2s | ~0.8s | ~0.6s |
| Largest Contentful Paint | ~4.0s | ~2.0s | ~1.5s | ~1.0s |
| Time to Interactive | ~5.0s | ~2.5s | ~1.8s | ~1.2s |
| Total Bundle Size | ~800KB | ~400KB | ~250KB | ~180KB |
| Google Analytics Load | N/A | ~15KB | ~12KB | ~10KB |

## Quick Wins Checklist

- [ ] Enable Vite compression
- [ ] Implement route-based code splitting
- [ ] Add Google Analytics 4 with async loading
- [ ] Defer non-critical scripts
- [ ] Optimize font loading
- [ ] Add resource hints (preconnect, dns-prefetch)
- [ ] Enable CSS code splitting
- [ ] Lazy load images
- [ ] Split translation files
- [ ] Add service worker for caching
- [ ] Enable Brotli compression on server
- [ ] Implement Web Vitals tracking
- [ ] Optimize third-party scripts
- [ ] Add loading states for better UX
- [ ] Implement progressive enhancement

## Monitoring & Maintenance

### Tools to Use:
1. **Lighthouse** - Regular performance audits
2. **WebPageTest** - Detailed performance analysis
3. **Google Analytics 4** - User experience monitoring
4. **Bundle Analyzer** - Track bundle size
5. **Chrome DevTools** - Performance profiling

### Regular Checks:
- Weekly: Check Core Web Vitals in GA4
- Monthly: Run Lighthouse audit
- Quarterly: Review and optimize bundle size
- Continuous: Monitor error rates and performance

## Next Steps

1. **Immediate**: Implement Phase 1 optimizations (biggest impact)
2. **This Week**: Complete Phase 2 optimizations
3. **This Month**: Implement Phase 3 for maximum performance
4. **Ongoing**: Monitor and maintain performance

## Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

---

**Note**: Each optimization should be tested individually to measure impact. Use Lighthouse and WebPageTest before and after each change.
