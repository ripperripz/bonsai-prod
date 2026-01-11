# Server Configuration for Optimal Performance

This guide covers server-side configurations to maximize the performance gains from your optimized build.

## Table of Contents
1. [Apache Configuration](#apache-configuration)
2. [Nginx Configuration](#nginx-configuration)
3. [cPanel Configuration](#cpanel-configuration)
4. [Vercel Configuration](#vercel-configuration)
5. [Cloudflare Configuration](#cloudflare-configuration)

---

## Apache Configuration

### .htaccess File

Create or update `.htaccess` in your web root:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Serve Brotli compressed files if available
  RewriteCond %{HTTP:Accept-Encoding} br
  RewriteCond %{REQUEST_FILENAME}\.br -f
  RewriteRule ^(.*)$ $1.br [L]
  
  # Serve Gzip compressed files if available
  RewriteCond %{HTTP:Accept-Encoding} gzip
  RewriteCond %{REQUEST_FILENAME}\.gz -f
  RewriteRule ^(.*)$ $1.gz [L]
  
  # Fallback to index.html for SPA routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  # Compress HTML, CSS, JavaScript, Text, XML and fonts
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
  AddOutputFilterByType DEFLATE application/x-font
  AddOutputFilterByType DEFLATE application/x-font-opentype
  AddOutputFilterByType DEFLATE application/x-font-otf
  AddOutputFilterByType DEFLATE application/x-font-truetype
  AddOutputFilterByType DEFLATE application/x-font-ttf
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE font/opentype
  AddOutputFilterByType DEFLATE font/otf
  AddOutputFilterByType DEFLATE font/ttf
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE image/x-icon
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # Video
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType video/webm "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  
  # Fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  
  # HTML
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Cache Control Headers
<IfModule mod_headers.c>
  # Set proper MIME types for compressed files
  <FilesMatch "\.js\.gz$">
    Header set Content-Type "application/javascript"
    Header set Content-Encoding "gzip"
  </FilesMatch>
  
  <FilesMatch "\.css\.gz$">
    Header set Content-Type "text/css"
    Header set Content-Encoding "gzip"
  </FilesMatch>
  
  <FilesMatch "\.js\.br$">
    Header set Content-Type "application/javascript"
    Header set Content-Encoding "br"
  </FilesMatch>
  
  <FilesMatch "\.css\.br$">
    Header set Content-Type "text/css"
    Header set Content-Encoding "br"
  </FilesMatch>
  
  # Cache-Control for static assets
  <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=2592000, immutable"
  </FilesMatch>
  
  <FilesMatch "\.(woff|woff2|ttf|otf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  # No cache for HTML
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
  </FilesMatch>
  
  # Security Headers
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # CORS for fonts
  <FilesMatch "\.(ttf|ttc|otf|eot|woff|woff2|font.css)$">
    Header set Access-Control-Allow-Origin "*"
  </FilesMatch>
</IfModule>

# Security
<IfModule mod_headers.c>
  # Prevent clickjacking
  Header always set X-Frame-Options "SAMEORIGIN"
  
  # Prevent MIME sniffing
  Header always set X-Content-Type-Options "nosniff"
  
  # Enable XSS protection
  Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Disable directory browsing
Options -Indexes

# Prevent access to hidden files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>
```

---

## Nginx Configuration

### nginx.conf or site configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html;
    index index.html;

    # Enable Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/xhtml+xml
        application/x-font-ttf
        application/x-font-opentype
        application/vnd.ms-fontobject
        image/svg+xml
        image/x-icon
        font/ttf
        font/otf
        font/woff
        font/woff2;

    # Enable Brotli compression (if module installed)
    brotli on;
    brotli_comp_level 6;
    brotli_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/xhtml+xml
        application/x-font-ttf
        application/x-font-opentype
        application/vnd.ms-fontobject
        image/svg+xml
        image/x-icon
        font/ttf
        font/otf
        font/woff
        font/woff2;

    # Browser caching for static assets
    location ~* \.(jpg|jpeg|png|gif|ico|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(css|js)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(woff|woff2|ttf|otf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";
    }

    # No cache for HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # SPA routing - fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Serve pre-compressed files
    location ~ \.(js|css|svg|json)$ {
        gzip_static on;
        brotli_static on;
    }

    # Service Worker
    location /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Service-Worker-Allowed "/";
    }
}
```

---

## cPanel Configuration

### Via File Manager

1. **Upload optimized build**
   - Build your project: `npm run build`
   - Upload contents of `dist` folder to `public_html`

2. **Create .htaccess**
   - Use the Apache configuration above
   - Place in `public_html/.htaccess`

3. **Enable compression in cPanel**
   - Go to cPanel → Software → Optimize Website
   - Select "Compress All Content"

4. **Configure caching**
   - The .htaccess file handles this automatically

### Via Terminal (if SSH access available)

```bash
# Navigate to public_html
cd ~/public_html

# Create .htaccess with Apache config
nano .htaccess
# Paste the Apache configuration from above

# Set proper permissions
chmod 644 .htaccess

# Verify compression is working
curl -H "Accept-Encoding: gzip,deflate" -I https://yourdomain.com
```

---

## Vercel Configuration

### vercel.json

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or deploy to production
vercel --prod
```

---

## Cloudflare Configuration

### DNS Setup

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Enable "Proxied" (orange cloud) for your domain

### Performance Settings

1. **Speed → Optimization**
   - Auto Minify: ✅ JavaScript, CSS, HTML
   - Brotli: ✅ Enable
   - Early Hints: ✅ Enable
   - Rocket Loader: ❌ Disable (conflicts with React)

2. **Caching → Configuration**
   - Caching Level: Standard
   - Browser Cache TTL: 1 year
   - Always Online: ✅ Enable

3. **Caching → Cache Rules**
   
   Create rule for static assets:
   ```
   If URI Path matches: /assets/*
   Then:
     - Cache Level: Cache Everything
     - Edge Cache TTL: 1 year
     - Browser Cache TTL: 1 year
   ```

4. **Speed → Page Rules**
   
   Create page rule:
   ```
   URL: yourdomain.com/*
   Settings:
     - Browser Cache TTL: 1 year
     - Cache Level: Cache Everything
     - Edge Cache TTL: 1 month
   ```

5. **Network → HTTP/2**
   - HTTP/2: ✅ Enable
   - HTTP/3 (QUIC): ✅ Enable

### Workers (Advanced)

Create a Cloudflare Worker for advanced caching:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Cache static assets aggressively
  if (url.pathname.startsWith('/assets/')) {
    const cache = caches.default
    let response = await cache.match(request)
    
    if (!response) {
      response = await fetch(request)
      const headers = new Headers(response.headers)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      })
      
      event.waitUntil(cache.put(request, response.clone()))
    }
    
    return response
  }
  
  // Default behavior
  return fetch(request)
}
```

---

## Testing Your Configuration

### 1. Test Compression

```bash
# Test Gzip
curl -H "Accept-Encoding: gzip" -I https://yourdomain.com

# Test Brotli
curl -H "Accept-Encoding: br" -I https://yourdomain.com

# Should see: Content-Encoding: gzip or br
```

### 2. Test Caching

```bash
# Check cache headers
curl -I https://yourdomain.com/assets/js/main.js

# Should see: Cache-Control: public, max-age=31536000, immutable
```

### 3. Test Performance

Use these online tools:

1. **GTmetrix**: https://gtmetrix.com
   - Should score A (90+)
   - Fully loaded time < 2s

2. **WebPageTest**: https://www.webpagetest.org
   - First Byte Time < 200ms
   - Start Render < 1s

3. **Google PageSpeed Insights**: https://pagespeed.web.dev
   - Mobile score: 90+
   - Desktop score: 95+

4. **Pingdom**: https://tools.pingdom.com
   - Performance grade: A
   - Load time < 1s

---

## Troubleshooting

### Compression not working?

**Apache:**
```bash
# Check if mod_deflate is enabled
apachectl -M | grep deflate

# Enable if not active
a2enmod deflate
systemctl restart apache2
```

**Nginx:**
```bash
# Check if gzip module is compiled
nginx -V 2>&1 | grep -o with-http_gzip_static_module

# Install brotli module
apt-get install nginx-module-brotli
```

### Caching not working?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Test in incognito mode
3. Check server headers with curl
4. Verify .htaccess is being read (Apache)
5. Check nginx error logs (Nginx)

### CORS errors for fonts?

Add to your server config:
```apache
# Apache
<FilesMatch "\.(ttf|ttc|otf|eot|woff|woff2)$">
  Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

```nginx
# Nginx
location ~* \.(ttf|ttc|otf|eot|woff|woff2)$ {
  add_header Access-Control-Allow-Origin "*";
}
```

---

## Monitoring

### Set up monitoring for:

1. **Uptime**: Use UptimeRobot or Pingdom
2. **Performance**: Google Analytics 4 (Web Vitals)
3. **Errors**: Sentry or LogRocket
4. **CDN**: Cloudflare Analytics

### Weekly checks:

- [ ] Check GTmetrix score
- [ ] Review GA4 Web Vitals
- [ ] Check error logs
- [ ] Monitor bandwidth usage
- [ ] Review cache hit ratio

---

## Summary

### Checklist

- [ ] Server compression enabled (Gzip/Brotli)
- [ ] Cache headers configured
- [ ] Security headers added
- [ ] SPA routing configured
- [ ] Service worker allowed
- [ ] CORS configured for fonts
- [ ] CDN configured (if using)
- [ ] Monitoring set up
- [ ] Performance tested
- [ ] All scores > 90

### Expected Results

With proper server configuration:
- **TTFB**: < 200ms
- **FCP**: < 1s
- **LCP**: < 2s
- **Lighthouse**: 90+
- **GTmetrix**: Grade A

---

**Need help?** Check server error logs or contact your hosting provider for assistance with server configuration.
