import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email service configuration
// You'll need to set these environment variables in Vercel:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

interface ContactFormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  contactObjective: string;
  unitType?: string;
  objective?: string;
  payment?: string;
  message: string;
  language: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format the email content
    const emailSubject = 'New Contact Form Submission - Bonsai Website';
    const emailBody = formatEmailBody(formData);

    // Send email using Resend API (recommended for Vercel)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bonsai Website <onboarding@resend.dev>',
        to: ['amad@bonsai.sa'],
        subject: emailSubject,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Resend API error:', errorData);
      console.error('Response status:', emailResponse.status);
      console.error('Response statusText:', emailResponse.statusText);

      // Return specific error message to client
      return res.status(500).json({
        error: `Email service error: ${errorData.message || errorData.error || 'Unknown error'}`,
        details: errorData
      });
    }

    const data = await emailResponse.json();
    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, messageId: data.id });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function formatEmailBody(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Riyadh',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #0F0E0D;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0F0E0D 0%, #3a3937 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 2px;
        }
        .content {
          background: #F7F5F2;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #C6A87C33;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #C6A87C;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .value {
          font-size: 16px;
          color: #0F0E0D;
          font-weight: 400;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #C6A87C;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #C6A87C33;
          font-size: 12px;
          color: #0F0E0D99;
        }
        .badge {
          display: inline-block;
          background: #C6A87C;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>BONSAI RESIDENCES</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">New Contact Form Submission</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">Contact Information</div>
          <div class="value"><strong>${data.firstName} ${data.lastName}</strong></div>
        </div>

        <div class="field">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${data.email}" style="color: #C6A87C; text-decoration: none;">${data.email}</a></div>
        </div>

        <div class="field">
          <div class="label">Mobile Number</div>
          <div class="value">+966 ${data.mobile}</div>
        </div>

        <div class="field">
          <div class="label">Contact Objective</div>
          <div class="value">
            <span class="badge">${data.contactObjective === 'purchase' ? 'Purchase Inquiry' : 'General Inquiry'}</span>
          </div>
        </div>
  `;

  // Add conditional fields if purchase was selected
  if (data.contactObjective === 'purchase') {
    if (data.unitType) {
      html += `
        <div class="field">
          <div class="label">Preferred Unit Type</div>
          <div class="value">${data.unitType}</div>
        </div>
      `;
    }

    if (data.objective) {
      html += `
        <div class="field">
          <div class="label">Investment Objective</div>
          <div class="value">${data.objective}</div>
        </div>
      `;
    }

    if (data.payment) {
      html += `
        <div class="field">
          <div class="label">Payment Preference</div>
          <div class="value">${data.payment}</div>
        </div>
      `;
    }
  }

  html += `
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
        </div>

        <div class="field">
          <div class="label">Submission Details</div>
          <div class="value" style="font-size: 13px;">
            <strong>Date/Time:</strong> ${timestamp}<br>
            <strong>Language:</strong> ${data.language === 'ar' ? 'Arabic (العربية)' : 'English'}<br>
            <strong>Source:</strong> Bonsai Website Contact Form
          </div>
        </div>
      </div>

      <div class="footer">
        <p>This email was sent from the Bonsai Residences website contact form.</p>
        <p style="margin-top: 10px;">
          <a href="https://bonsai.sa" style="color: #C6A87C; text-decoration: none;">bonsai.sa</a>
        </p>
      </div>
    </body>
    </html>
  `;

  return html;
}
