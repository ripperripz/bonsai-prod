# Bonsai Residences - Email Configuration Guide

## Overview
The contact form now sends emails to **amad@bonsai.sa** using a serverless API endpoint deployed on Vercel.

## Email Service Setup

### Option 1: Resend (Recommended)
Resend is the easiest and most reliable email service for Vercel deployments.

#### Steps:
1. **Create a Resend Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account (100 emails/day free tier)

2. **Get Your API Key**
   - Navigate to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Verify Your Domain (Important)**
   - In Resend dashboard, go to Domains
   - Add `bonsai.sa` as your domain
   - Follow DNS verification instructions
   - This allows emails to be sent from `noreply@bonsai.sa`

4. **Configure Vercel Environment Variable**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add new variable:
     - **Name:** `RESEND_API_KEY`
     - **Value:** Your Resend API key (e.g., `re_123abc...`)
     - **Environments:** Production, Preview, Development

5. **Redeploy**
   - After adding the environment variable, redeploy your site
   - The contact form will now send real emails!

### Option 2: SendGrid (Alternative)
If you prefer SendGrid, modify the API endpoint to use SendGrid's API instead.

## Email Template Features

The email sent to `amad@bonsai.sa` includes:

✅ **Professional HTML Design**
- Bonsai branded header
- Clean, organized layout
- Mobile-responsive

✅ **Complete Form Data**
- Contact name (First + Last)
- Email address (clickable mailto link)
- Mobile number (formatted with +966)
- Contact objective badge (Purchase/General Inquiry)
- Conditional fields (Unit Type, Investment Objective, Payment Preference)
- Full message content
- Submission timestamp (Riyadh timezone)
- Language indicator (English/Arabic)

✅ **Professional Formatting**
- Color-coded sections using Bonsai brand colors (#0F0E0D, #C6A87C, #F7F5F2)
- Uppercase labels with proper spacing
- Clear visual hierarchy

## Testing

### Local Testing
The API endpoint won't work locally without the environment variable. To test:
1. Add `RESEND_API_KEY` to a `.env.local` file
2. The form will show an error if the API key is missing

### Production Testing
1. Deploy to Vercel with the environment variable configured
2. Submit a test form
3. Check `amad@bonsai.sa` inbox for the email

## File Structure

```
/api/send-email.ts          # Serverless function (Vercel API route)
/pages/Contact.tsx          # Updated to call the API endpoint
```

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for sending emails | `re_123abc...` |

## Security Features

✅ **Server-side Processing**
- Email sending happens on the server, not client-side
- API keys are never exposed to the browser

✅ **ReCAPTCHA Integration**
- Form includes Google reCAPTCHA v3
- Token is sent with the form submission (can be validated server-side)

✅ **Input Validation**
- Required fields are validated before submission
- Email format validation
- Server-side validation in the API endpoint

## Troubleshooting

### "Email service not configured" error
- The `RESEND_API_KEY` environment variable is missing
- Add it in Vercel dashboard and redeploy

### Emails not arriving
- Check Resend dashboard for delivery status
- Verify domain is properly configured in Resend
- Check spam folder
- Ensure `amad@bonsai.sa` is a valid email address

### API endpoint not found (404)
- Ensure the `/api` folder exists in your project root
- Vercel automatically detects files in `/api` as serverless functions
- Redeploy after adding the API file

## Next Steps

1. **Set up Resend account** (5 minutes)
2. **Add environment variable to Vercel** (2 minutes)
3. **Redeploy your site** (automatic)
4. **Test the contact form** (1 minute)

Total setup time: ~10 minutes

## Support

If you encounter any issues:
- Check Vercel deployment logs
- Check Resend dashboard for email delivery logs
- Verify environment variables are set correctly
- Ensure domain is verified in Resend
