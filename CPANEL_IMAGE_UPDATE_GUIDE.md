# cPanel Image Update Guide for Bonsai Website

## 📦 Deployment Package Ready
**File**: `bonsai-cpanel-deployment.zip`
**Location**: `/Users/arshbhattarai/Downloads/bonsaimain-main/bonsai-cpanel-deployment.zip`

---

## 🚀 How to Deploy to cPanel

1. **Login to cPanel**
   - Go to your hosting provider's cPanel
   - Navigate to **File Manager**

2. **Upload the Zip File**
   - Navigate to `public_html` (or your domain's root directory)
   - Click **Upload** button
   - Select `bonsai-cpanel-deployment.zip`
   - Wait for upload to complete

3. **Extract the Files**
   - Right-click on `bonsai-cpanel-deployment.zip`
   - Select **Extract**
   - Choose to extract to current directory
   - Delete the zip file after extraction

4. **Verify Deployment**
   - Visit your website URL
   - Check that all pages load correctly
   - Test both English and Arabic versions

---

## 🖼️ How Clients Can Update Images from cPanel

### Method 1: Direct File Manager Upload (Easiest)

#### For Serenity Page Gallery Images:

1. **Access File Manager**
   - Login to cPanel
   - Open **File Manager**
   - Navigate to: `public_html/images/serenity/`

2. **Upload New Images**
   - Click **Upload** button
   - Select your new image files
   - **Important**: Name them exactly as follows:
     - `2.png` - Incense burner
     - `3.png` - Moss texture
     - `4.png` - Billiard table
     - `5.png` - Water feature
     - `6.png` - Stone landscaping
     - `7.png` - Bonsai tree
     - `8.png` - Olive tree trunk
     - `9.png` - Wood grain
     - `10.png` - Minimalist interior

3. **Replace Existing Files**
   - When uploading, choose **Overwrite** if prompted
   - The website will automatically use the new images

4. **Image Requirements**
   - **Format**: PNG or JPG
   - **Recommended Size**: 800x800 pixels (square)
   - **Max File Size**: Keep under 500KB for best performance
   - **Naming**: Must match exact filenames above

#### For Other Images:

**Homepage Images**: `public_html/images/1.png` through `15.png`
**Designer Photo**: `public_html/images/designer.png`
**Bonsai Tree**: `public_html/images/bonsai tree.png`
**Logos**: 
- `public_html/images/bonsaienglish.png`
- `public_html/images/bonsaiarabic.png`

**Material Images**:
- `public_html/images/copper.jpeg`
- `public_html/images/wood.png`
- `public_html/images/stone.png`
- `public_html/images/water.jpeg`
- `public_html/images/courtyard.jpeg`
- `public_html/images/shoji.jpg`
- `public_html/images/tokonoma.jpg`
- `public_html/images/tatami.jpg`

---

### Method 2: FTP Upload (For Bulk Updates)

1. **Get FTP Credentials**
   - From cPanel, go to **FTP Accounts**
   - Create or use existing FTP account

2. **Use FTP Client**
   - Download FileZilla (free) or any FTP client
   - Connect using your FTP credentials
   - Navigate to `/public_html/images/`

3. **Upload Images**
   - Drag and drop new images
   - Overwrite existing files
   - Maintain exact filenames

---

## 🎨 Image Optimization Tips

Before uploading images to cPanel:

1. **Resize Images**
   - Use online tools like TinyPNG or Squoosh
   - Target: 800x800px for gallery images
   - Keep file size under 500KB

2. **Compress Images**
   - Use tools like ImageOptim (Mac) or TinyPNG
   - Aim for 70-80% quality for JPEGs
   - Use PNG for images with transparency

3. **Naming Convention**
   - Use exact filenames as listed above
   - No spaces in filenames
   - Use lowercase for consistency

---

## ⚠️ Important Notes

1. **Cache Clearing**
   - After uploading new images, clients may need to clear browser cache
   - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

2. **Backup First**
   - Always download existing images before replacing
   - Keep backups in a safe location

3. **File Permissions**
   - Images should have 644 permissions
   - Folders should have 755 permissions
   - cPanel File Manager usually sets these automatically

4. **Testing**
   - After uploading, check both desktop and mobile views
   - Test in different browsers
   - Verify both English and Arabic versions

---

## 📱 Quick Reference: Image Locations

| Page | Image Location | Filename Pattern |
|------|---------------|------------------|
| Serenity Gallery | `/images/serenity/` | `2.png` to `10.png` |
| Homepage Gallery | `/images/` | `1.png` to `15.png` |
| Designer | `/images/` | `designer.png` |
| Materials | `/images/` | `copper.jpeg`, `wood.png`, etc. |
| Logos | `/images/` | `bonsai*.png` |
| Metro Map | `/images/metro/` | Various PNG files |

---

## 🆘 Troubleshooting

**Images not updating?**
- Clear browser cache (Ctrl+F5)
- Check filename matches exactly
- Verify file uploaded to correct folder
- Check file permissions (should be 644)

**Images look blurry?**
- Upload higher resolution images
- Ensure images are at least 800x800px
- Use PNG for better quality

**Page loading slow?**
- Compress images before uploading
- Keep file sizes under 500KB
- Use JPG for photos, PNG for graphics

---

## 📞 Support

For technical assistance with image updates:
1. Check this guide first
2. Verify file paths and names
3. Contact your hosting provider's support if issues persist

---

**Last Updated**: January 2026
**Website**: Bonsai Luxury Residences
**Version**: 1.1.0
