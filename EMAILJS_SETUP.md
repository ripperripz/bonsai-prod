# 📧 EmailJS Setup Guide for Bonsai Contact Form

## ✅ What I've Done:
I've updated your Contact.tsx to use EmailJS instead of Resend. This means:
- ✅ You can send to ANY email address (no domain verification needed)
- ✅ Works on localhost AND deployed sites
- ✅ Free: 200 emails per month
- ✅ Simpler setup

---

## 🚀 Setup Steps (10 minutes)

### **Step 1: Create EmailJS Account** (2 minutes)

1. Go to: **https://www.emailjs.com**
2. Click **"Sign Up"**
3. Use `arshsharmaoc@gmail.com` (or any email)
4. Verify your email
5. Log in

---

### **Step 2: Add Gmail Service** (3 minutes)

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with Gmail (use `arshsharmaoc@gmail.com`)
6. Allow EmailJS to access your Gmail
7. Give it a name: "Bonsai Contact Form"
8. Click **"Create Service"**
9. **COPY THE SERVICE ID** (looks like `service_abc123xyz`)
   - Save it somewhere - you'll need it in Step 4

---

### **Step 3: Create Email Template** (3 minutes)

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Delete everything** in the template editor
4. **Paste this template:**

```
Subject: New Contact Form Submission - Bonsai Website

From: {{from_name}}
Email: {{from_email}}
Mobile: +966 {{mobile}}

Contact Objective: {{contact_objective}}
Unit Type: {{unit_type}}
Investment Objective: {{objective}}
Payment Preference: {{payment}}

Message:
{{message}}

---
Submitted: {{submission_date}}
Language: {{language}}
Source: Bonsai Website Contact Form
```

5. Click **"Save"**
6. **COPY THE TEMPLATE ID** (looks like `template_xyz789abc`)
   - Save it somewhere - you'll need it in Step 4

---

### **Step 4: Get Public Key** (1 minute)

1. Click **"Account"** in the left sidebar
2. Click **"General"**
3. Find **"Public Key"** section
4. **COPY THE PUBLIC KEY** (looks like `abcdefg1234567`)
   - Save it somewhere - you'll need it in Step 5

---

### **Step 5: Add Credentials to Your Code** (2 minutes)

Now you have 3 values:
- **Service ID**: `service_abc123xyz`
- **Template ID**: `template_xyz789abc`
- **Public Key**: `abcdefg1234567`

**Open this file:**
`/Users/arshbhattarai/Downloads/bonsaifinal-main/pages/Contact.tsx`

**Find these lines (around line 155-157):**
```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

**Replace with your actual values:**
```typescript
const EMAILJS_SERVICE_ID = 'service_abc123xyz'; // Your actual Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789abc'; // Your actual Template ID
const EMAILJS_PUBLIC_KEY = 'abcdefg1234567'; // Your actual Public Key
```

**Save the file!**

---

### **Step 6: Test It!** (1 minute)

1. **Run locally:**
   ```bash
   npm run dev
   ```

2. **Go to:** http://localhost:5173/contact

3. **Fill out the form** and submit

4. **Check `arshsharmaoc@gmail.com` inbox**
   - You should receive the email!
   - Check spam folder if you don't see it

5. **If it works locally, deploy:**
   ```bash
   vercel --prod
   ```

---

## 🎯 **What Happens Now:**

When someone submits the contact form:
1. EmailJS sends the email through your Gmail account
2. The email arrives at `arshsharmaoc@gmail.com`
3. You see all the form details in a nice format

---

## ✅ **Benefits of EmailJS:**

- ✅ **No domain verification needed**
- ✅ **Send to any email address**
- ✅ **Works on localhost** (great for testing)
- ✅ **Works on deployed site**
- ✅ **Free tier: 200 emails/month**
- ✅ **No backend/serverless function needed**

---

## 📊 **Free Tier Limits:**

- **200 emails per month**
- **50 emails per day**
- **2 email services**
- **2 email templates**

This should be more than enough for a contact form!

---

## 🔒 **Security Note:**

The EmailJS credentials (Service ID, Template ID, Public Key) will be visible in your client-side code. This is normal and safe because:
- EmailJS Public Key is designed to be public
- You can set up rate limiting in EmailJS dashboard
- You can restrict which domains can use your EmailJS account

**To add domain restriction (optional):**
1. EmailJS Dashboard → Account → Security
2. Add your domain (e.g., `yourdomain.vercel.app`)
3. Only that domain can use your EmailJS account

---

## 🐛 **Troubleshooting:**

### **"Failed to send email"**
- Check that you replaced the placeholder values with your actual credentials
- Make sure you copied the IDs correctly (no extra spaces)
- Check browser console for detailed error

### **Email not arriving**
- Check spam folder
- Verify Gmail service is connected in EmailJS dashboard
- Check EmailJS dashboard → Emails → Recent sends for status

### **"Invalid user_id"**
- You didn't replace `YOUR_PUBLIC_KEY` with your actual public key
- Go back to Step 4 and copy the correct value

---

## 📧 **Email Will Look Like:**

```
Subject: New Contact Form Submission - Bonsai Website

From: John Doe
Email: john@example.com
Mobile: +966 512345678

Contact Objective: Purchase Inquiry
Unit Type: 2 Bedroom
Investment Objective: Personal Use
Payment Preference: Cash

Message:
I'm interested in purchasing a unit...

---
Submitted: Tuesday, December 15, 2024 at 10:53:00 AM GMT+3
Language: English
Source: Bonsai Website Contact Form
```

---

## 🎉 **You're Done!**

Once you complete Step 5 (adding your credentials), the contact form will work perfectly!

**Need help?** Let me know which step you're stuck on.

---

## 📝 **Quick Checklist:**

- [ ] Created EmailJS account
- [ ] Connected Gmail service
- [ ] Copied Service ID
- [ ] Created email template
- [ ] Copied Template ID
- [ ] Copied Public Key
- [ ] Updated Contact.tsx with all 3 credentials
- [ ] Tested locally
- [ ] Deployed to Vercel
- [ ] Tested on live site

---

**Total time: ~10 minutes** ⏱️
