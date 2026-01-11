# cPanel Deployment Guide for Bonsai Residences

## Pre-Deployment Checklist

✅ **Build completed successfully**
✅ **All translations updated (English & Arabic)**
✅ **iOS Arabic font fix implemented (Tajawal)**
✅ **Category names localized**
✅ **Metro map and location data updated**
✅ **Brand logos optimized**

---

## Deployment Steps

### 1. Upload Files to cPanel

**Option A: File Manager (Recommended for first-time deployment)**

1. Log in to your cPanel account
2. Navigate to **File Manager**
3. Go to `public_html` directory (or your domain's root directory)
4. **IMPORTANT**: Backup existing files if any
5. Upload the entire contents of the `dist` folder to `public_html`
   - Upload `index.html`
   - Upload `assets` folder
   - Upload `images` folder
   - Upload `translations.js`
   - Upload `sw.js` (Service Worker)
   - Upload `.htaccess` file (see below)

**Option B: FTP/SFTP**

1. Connect to your server via FTP client (FileZilla, Cyberduck, etc.)
2. Navigate to `public_html`
3. Upload all files from the `dist` folder

**Option C: Terminal/SSH (Advanced)**

```bash
# From your local machine
cd /Users/arshbhattarai/Downloads/bonsaimain-main
scp -r dist/* username@yourdomain.com:~/public_html/
```

---

### 2. Create/Update .htaccess File

Create a file named `.htaccess` in your `public_html` directory with the following content:

```apache
# Enable Rewrite Engine for SPA routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect HTTP to HTTPS (if SSL is installed)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Handle SPA routing - redirect all requests to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Enable Brotli Compression (if available)
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  
  # HTML (short cache for updates)
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # X-Frame-Options
  Header always set X-Frame-Options "SAMEORIGIN"
  
  # X-Content-Type-Options
  Header always set X-Content-Type-Options "nosniff"
  
  # X-XSS-Protection
  Header always set X-XSS-Protection "1; mode=block"
  
  # Referrer Policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Cache Control for static assets
  <FilesMatch "\.(js|css|png|jpg|jpeg|webp|svg|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# Prevent directory browsing
Options -Indexes

# Custom Error Pages (optional)
ErrorDocument 404 /index.html
</IfModule>
```

---

### 3. Verify File Structure

After upload, your `public_html` should look like this:

```
public_html/
├── .htaccess
├── index.html
├── sw.js
├── translations.js
├── assets/
│   ├── css/
│   │   └── index-*.css
│   └── js/
│       ├── index-*.js
│       ├── react-vendor-*.js
│       ├── Home-*.js
│       ├── Location-*.js
│       └── ... (other chunks)
└── images/
    ├── 1.webp
    ├── 10.webp
    └── ... (all image files)
```

---

### 4. SSL Certificate Setup (Highly Recommended)

1. In cPanel, go to **SSL/TLS Status**
2. Enable **AutoSSL** for your domain
3. Or install a **Let's Encrypt** certificate (free)
4. Verify HTTPS is working by visiting `https://yourdomain.com`

---

### 5. DNS Configuration

Ensure your domain DNS is pointing to your cPanel server:

- **A Record**: Points to your server IP
- **CNAME (www)**: Points to your main domain

Check with your hosting provider if unsure.

---

### 6. Post-Deployment Testing

Visit your website and test the following:

**✅ Core Functionality:**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Language toggle (EN ↔ AR) works
- [ ] Images load properly
- [ ] Metro map is interactive
- [ ] Contact form submits (if email is configured)

**✅ Localization:**
- [ ] Arabic text displays with connected letters (iOS Safari)
- [ ] Category names show in both languages
- [ ] All translations are correct

**✅ Performance:**
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized (WebP format)
- [ ] Gzip/Brotli compression is active

**✅ Mobile Testing:**
- [ ] Responsive design works on mobile
- [ ] Touch interactions work
- [ ] Arabic RTL layout is correct

**✅ SEO:**
- [ ] Meta titles and descriptions are present
- [ ] Open Graph tags work (test with Facebook Debugger)
- [ ] Sitemap is accessible (if generated)

---

### 7. Common Issues & Solutions

**Issue: "Page not found" on refresh**
- **Solution**: Ensure `.htaccess` rewrite rules are in place

**Issue: Images not loading**
- **Solution**: Check file paths are relative, not absolute
- Verify images folder uploaded correctly

**Issue: Arabic text broken on iOS**
- **Solution**: Verify Tajawal font is loading from Google Fonts
- Check `index.html` has the font preload link

**Issue: Slow loading**
- **Solution**: Enable Gzip/Brotli compression in `.htaccess`
- Verify browser caching headers are set

**Issue: Contact form not working**
- **Solution**: Email functionality requires server-side setup
- See `EMAIL_SETUP_GUIDE.md` for Resend/SMTP configuration

---

### 8. Performance Optimization (Optional)

**Enable HTTP/2:**
- Most cPanel servers support HTTP/2 automatically with SSL
- Verify in cPanel → Apache Configuration

**CDN Setup (Advanced):**
- Consider Cloudflare for global CDN
- Free plan includes DDoS protection and caching

**Database Optimization:**
- Not applicable (this is a static site)

---

### 9. Maintenance & Updates

**To update the website:**

1. Make changes locally
2. Run `npm run build`
3. Upload only changed files from `dist/` to `public_html/`
4. Clear browser cache to see changes

**To update translations:**

1. Edit `public/translations.js`
2. Upload to `public_html/translations.js`
3. No rebuild needed (external translations)

---

### 10. Backup Strategy

**Before any changes:**
- Download a backup of `public_html` via cPanel File Manager
- Or use cPanel Backup Wizard

**Automated backups:**
- Enable cPanel automatic backups (if available)
- Store backups off-site (Google Drive, Dropbox)

---

## Quick Deployment Checklist

- [ ] Build project: `npm run build`
- [ ] Upload `dist/*` to `public_html/`
- [ ] Create/update `.htaccess`
- [ ] Enable SSL certificate
- [ ] Test all pages and functionality
- [ ] Test on mobile devices
- [ ] Test Arabic/English switching
- [ ] Verify iOS Arabic text rendering
- [ ] Check contact form (if configured)
- [ ] Run Google PageSpeed Insights
- [ ] Submit sitemap to Google Search Console

---

## Support & Resources

- **cPanel Documentation**: https://docs.cpanel.net/
- **Apache .htaccess Guide**: https://httpd.apache.org/docs/current/howto/htaccess.html
- **Let's Encrypt SSL**: https://letsencrypt.org/
- **Google PageSpeed Insights**: https://pagespeed.web.dev/

---

## Contact

For deployment issues or questions, refer to:
- `SERVER_CONFIGURATION.md` - Server setup details
- `OPTIMIZATION_README.md` - Performance optimization guide
- `EMAIL_SETUP_GUIDE.md` - Email configuration

---

**Last Updated**: January 5, 2026
**Build Version**: Production-ready with all fixes applied
