# 📧 BONSAI CONTACT FORM - COMPLETE SETUP GUIDE

## ✅ Email Updated
**Recipient Email:** arshsharmaoc@gmail.com

---

## 🚀 STEP-BY-STEP SETUP INSTRUCTIONS

### **STEP 1: Create a Resend Account** (5 minutes)

1. **Go to Resend.com**
   - Open your browser and visit: https://resend.com
   - Click "Sign Up" or "Get Started"

2. **Create Your Account**
   - Sign up with your email (can use arshsharmaoc@gmail.com)
   - Verify your email address
   - Complete the onboarding

3. **Choose the Free Plan**
   - Free tier includes: **100 emails per day**
   - Perfect for testing and small projects
   - No credit card required

---

### **STEP 2: Get Your API Key** (2 minutes)

1. **Navigate to API Keys**
   - Once logged in, click on "API Keys" in the left sidebar
   - Or go directly to: https://resend.com/api-keys

2. **Create New API Key**
   - Click "Create API Key" button
   - Give it a name: "Bonsai Website"
   - Select permissions: "Sending access"
   - Click "Create"

3. **Copy Your API Key**
   - The key will look like: `re_123abc456def...`
   - **IMPORTANT:** Copy it immediately - you won't see it again!
   - Save it somewhere safe temporarily

---

### **STEP 3: Verify Your Domain** (10 minutes) - IMPORTANT!

This step allows emails to be sent from `noreply@bonsai.sa` instead of a generic Resend address.

1. **Add Domain in Resend**
   - In Resend dashboard, click "Domains" in the sidebar
   - Click "Add Domain"
   - Enter: `bonsai.sa`
   - Click "Add"

2. **Get DNS Records**
   - Resend will show you DNS records to add
   - You'll see records like:
     - **TXT record** for verification
     - **DKIM records** for email authentication
     - **SPF record** for sender verification

3. **Add DNS Records to Your Domain**
   - Log in to your domain registrar (where you bought bonsai.sa)
   - Go to DNS settings
   - Add each record exactly as shown in Resend
   - **Common registrars:**
     - GoDaddy: Domain Settings → DNS Management
     - Namecheap: Domain List → Manage → Advanced DNS
     - Cloudflare: DNS → Records

4. **Verify Domain**
   - Back in Resend, click "Verify DNS Records"
   - This may take 5-60 minutes for DNS to propagate
   - Once verified, you'll see a green checkmark

**Note:** If you don't have access to DNS settings, you can skip this step. Emails will be sent from `onboarding@resend.dev` instead, which still works but looks less professional.

---

### **STEP 4: Deploy to Vercel** (5 minutes)

#### **Option A: If you already have a Vercel account**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Log in to your account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Import from Git (GitHub, GitLab, or Bitbucket)
   - Or upload the project folder directly

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (1-2 minutes)

#### **Option B: If you DON'T have a Vercel account**

1. **Create Vercel Account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub (recommended) or email
   - Verify your email

2. **Install Vercel CLI** (Alternative method)
   ```bash
   npm install -g vercel
   ```

3. **Deploy from Terminal**
   ```bash
   cd /Users/arshbhattarai/Downloads/bonsaifinal-main
   vercel
   ```
   - Follow the prompts
   - Link to your Vercel account
   - Choose project settings

---

### **STEP 5: Add Environment Variable to Vercel** (3 minutes)

This is the **MOST IMPORTANT STEP** - without this, emails won't send!

1. **Go to Your Project in Vercel**
   - Open Vercel dashboard
   - Click on your "bonsai" project

2. **Navigate to Settings**
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

3. **Add the API Key**
   - Click "Add New" or the "+" button
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste your Resend API key (from Step 2)
   - **Environments:** Check ALL three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click "Save"

4. **Redeploy Your Site**
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - **OR** just push a new commit to trigger automatic deployment

---

### **STEP 6: Test the Contact Form** (2 minutes)

1. **Visit Your Live Site**
   - Go to your Vercel deployment URL
   - Example: `https://bonsai-xyz.vercel.app`

2. **Navigate to Contact Page**
   - Click "Contact" in the navigation

3. **Fill Out the Form**
   - Enter test information:
     - First Name: Test
     - Last Name: User
     - Mobile: 512345678
     - Email: your-test-email@gmail.com
     - Select "General Inquiry" or "Purchase"
     - Message: "This is a test submission"

4. **Submit the Form**
   - Click "Submit"
   - You should see a green success message

5. **Check Your Email**
   - Check **arshsharmaoc@gmail.com** inbox
   - Look for email with subject: "New Contact Form Submission - Bonsai Website"
   - **Check spam folder** if you don't see it immediately

---

## 🔍 TROUBLESHOOTING

### Problem: "Email service not configured" error

**Solution:**
- The `RESEND_API_KEY` environment variable is missing
- Go back to Step 5 and add it
- Make sure to redeploy after adding

### Problem: Form submits but no email arrives

**Possible causes:**

1. **Check Resend Dashboard**
   - Go to: https://resend.com/emails
   - Check if the email was sent
   - Look for error messages

2. **Check Spam Folder**
   - Gmail might mark it as spam initially
   - Mark as "Not Spam" to whitelist

3. **Verify API Key**
   - Make sure you copied the full API key
   - It should start with `re_`
   - No extra spaces or characters

4. **Check Vercel Logs**
   - Go to Vercel → Your Project → Deployments
   - Click on latest deployment
   - Click "Functions" tab
   - Look for `/api/send-email` logs
   - Check for error messages

### Problem: "Failed to send email" error

**Solution:**
- Check Resend account status
- Verify you haven't exceeded free tier limit (100 emails/day)
- Check API key is valid and not expired

### Problem: Email sends from "onboarding@resend.dev" instead of "noreply@bonsai.sa"

**Solution:**
- Domain verification (Step 3) is not complete
- Check DNS records are properly added
- Wait for DNS propagation (can take up to 48 hours)
- Verify domain in Resend dashboard

---

## 📊 MONITORING YOUR EMAILS

### **Resend Dashboard**
- View all sent emails: https://resend.com/emails
- See delivery status, open rates, etc.
- Check for bounces or errors

### **Email Logs**
- Each email shows:
  - ✅ Delivered
  - ⏳ Pending
  - ❌ Failed
- Click on any email to see details

---

## 💰 PRICING (Current as of 2024)

### **Free Tier**
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ All features included
- ✅ No credit card required

### **Paid Plans** (if you need more)
- **Pro:** $20/month - 50,000 emails/month
- **Business:** Custom pricing

For the Bonsai website, the **free tier should be more than enough** unless you're getting 100+ contact form submissions per day.

---

## 🎯 QUICK CHECKLIST

Before going live, make sure:

- [ ] Resend account created
- [ ] API key generated and saved
- [ ] Domain added to Resend (optional but recommended)
- [ ] DNS records added (optional but recommended)
- [ ] Project deployed to Vercel
- [ ] `RESEND_API_KEY` environment variable added to Vercel
- [ ] Site redeployed after adding environment variable
- [ ] Test email sent successfully
- [ ] Email received at arshsharmaoc@gmail.com
- [ ] Email not in spam folder

---

## 📧 WHAT THE EMAIL LOOKS LIKE

When someone submits the contact form, you'll receive a professional email with:

**Subject:** New Contact Form Submission - Bonsai Website

**Content:**
- 🎨 Bonsai branded header with gradient
- 👤 Contact name (First + Last)
- 📧 Email address (clickable)
- 📱 Mobile number (+966 formatted)
- 🏷️ Contact objective badge (Purchase/General Inquiry)
- 🏠 Unit preferences (if Purchase selected)
- 💰 Payment preferences (if Purchase selected)
- 💬 Full message
- 🕐 Submission date/time (Riyadh timezone)
- 🌐 Language used (English/Arabic)

---

## 🔐 SECURITY FEATURES

✅ **Server-side processing** - API keys never exposed to browser
✅ **Input validation** - Both client and server-side
✅ **ReCAPTCHA integration** - Spam protection
✅ **Environment variables** - Secure credential storage
✅ **HTTPS encryption** - All data transmitted securely

---

## 📞 NEED HELP?

If you encounter any issues:

1. **Check Vercel Function Logs**
   - Most detailed error information

2. **Check Resend Dashboard**
   - See if emails are being sent

3. **Review Environment Variables**
   - Make sure `RESEND_API_KEY` is set correctly

4. **Test Locally** (Optional)
   - Create `.env.local` file
   - Add: `RESEND_API_KEY=your_key_here`
   - Run: `npm run dev`
   - Test the form locally

---

## ⏱️ TOTAL SETUP TIME

- **Minimum:** ~15 minutes (without domain verification)
- **Complete:** ~30 minutes (with domain verification)

---

## 🎉 YOU'RE DONE!

Once you complete all steps, your contact form will be fully functional and sending emails to **arshsharmaoc@gmail.com**!

Every form submission will arrive as a beautifully formatted email with all the details you need to follow up with potential clients.

---

**Last Updated:** December 15, 2024
**Email Recipient:** arshsharmaoc@gmail.com
**Email Service:** Resend (resend.com)
**Hosting:** Vercel (vercel.com)
