# Quick Deployment Instructions

## Upload to cPanel - Quick Steps

1. **Build the project** (already done ✅)
   ```bash
   npm run build
   ```

2. **Access cPanel File Manager**
   - Log in to your cPanel account
   - Click on "File Manager"
   - Navigate to `public_html` directory

3. **Upload Files**
   - Click "Upload" button
   - Select ALL files from the `dist` folder:
     - `index.html`
     - `sw.js`
     - `translations.js`
     - `.htaccess`
     - `assets` folder (entire folder)
     - `images` folder (entire folder)
   
   **OR** compress and upload:
   ```bash
   cd dist
   zip -r bonsai-deployment.zip .
   # Upload bonsai-deployment.zip to public_html
   # Extract in cPanel File Manager
   ```

4. **Verify .htaccess**
   - Ensure `.htaccess` file is in `public_html`
   - If not visible, enable "Show Hidden Files" in File Manager settings

5. **Set Permissions** (if needed)
   - Files: 644
   - Folders: 755

6. **Test the Website**
   - Visit: `https://yourdomain.com`
   - Test: `https://yourdomain.com/ar` (Arabic)
   - Test: `https://yourdomain.com/location` (Location page)
   - Test: `https://yourdomain.com/contact` (Contact page)

## Important Notes

✅ **SSL Certificate**: Ensure HTTPS is enabled in cPanel
✅ **Domain DNS**: Verify domain points to your cPanel server
✅ **File Structure**: All files from `dist/` go directly to `public_html/`
✅ **Arabic Font**: Tajawal font loads from Google Fonts (no server config needed)
✅ **Translations**: Both English and Arabic are ready

## Troubleshooting

**Problem**: 404 errors on page refresh
**Solution**: Verify `.htaccess` file exists and mod_rewrite is enabled

**Problem**: Images not loading
**Solution**: Check that `images` folder uploaded correctly

**Problem**: Slow loading
**Solution**: Enable Gzip compression (already in .htaccess)

## File Checklist

After upload, verify these files exist in `public_html`:

```
✅ index.html
✅ .htaccess
✅ sw.js
✅ translations.js
✅ assets/css/index-*.css
✅ assets/js/index-*.js
✅ assets/js/react-vendor-*.js
✅ images/1.webp
✅ images/10.webp
✅ (all other image files)
```

## Next Steps After Deployment

1. Test all pages thoroughly
2. Test language switching (EN ↔ AR)
3. Test on mobile devices
4. Test on iOS Safari (Arabic text)
5. Submit sitemap to Google Search Console
6. Set up Google Analytics (if not already done)

---

**Deployment Ready**: ✅ All files are in the `dist` folder
**Last Build**: January 5, 2026
