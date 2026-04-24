const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.post('/api/send-message', async (req, res) => {
  try {
    const { user_name, user_email, user_phone, service, message } = req.body;

    if (!user_name || !user_email || !service || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to company email
      subject: `New Contact Form Submission from ${user_name}`,
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f9d58 0%, #0b7a44 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 24px;">New Message from Your Website</h2>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Cruise-Way Engineering Limited</p>
          </div>
          
          <div style="background: #f7faf8; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #d8e4dc;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b7c72; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Sender Information</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0f9d58;">
                <p style="margin: 0 0 10px 0;"><strong style="color: #0d1b14;">Name:</strong> ${escapeHtml(user_name)}</p>
                <p style="margin: 0 0 10px 0;"><strong style="color: #0d1b14;">Email:</strong> <a href="mailto:${escapeHtml(user_email)}" style="color: #0f9d58; text-decoration: none;">${escapeHtml(user_email)}</a></p>
                ${user_phone ? `<p style="margin: 0;"><strong style="color: #0d1b14;">Phone:</strong> ${escapeHtml(user_phone)}</p>` : ''}
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b7c72; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Service Interest</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0f9d58;">
                <p style="margin: 0; color: #0d1b14;"><strong>${escapeHtml(service)}</strong></p>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b7c72; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0f9d58;">
                <p style="margin: 0; color: #2d3a32; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #d8e4dc;">
              <p style="margin: 0; color: #6b7c72; font-size: 12px;">
                <strong>Quick Reply:</strong> Click the email address above to respond directly to the sender.
              </p>
              <p style="margin: 10px 0 0 0; color: #a8b5af; font-size: 11px;">
                This message was sent from your website contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: user_email,
      subject: 'We Received Your Message - Cruise-Way Engineering',
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f9d58 0%, #0b7a44 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 24px;">Thank You for Reaching Out!</h2>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Cruise-Way Engineering Limited</p>
          </div>
          
          <div style="background: #f7faf8; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #d8e4dc;">
            <p style="margin: 0 0 20px 0; color: #2d3a32; font-size: 16px;">Hi ${escapeHtml(user_name)},</p>
            
            <p style="margin: 0 0 15px 0; color: #6b7c72; line-height: 1.6;">
              Thank you for contacting Cruise-Way Engineering Limited. We have received your message and appreciate your interest in our services.
            </p>

            <p style="margin: 0 0 15px 0; color: #6b7c72; line-height: 1.6;">
              Our team will review your inquiry and get back to you within 24 hours. If your matter is urgent, feel free to reach us via WhatsApp at <strong>0905 463 3401</strong>.
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0f9d58; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #0d1b14;"><strong>Your Message Summary:</strong></p>
              <p style="margin: 0 0 8px 0; color: #6b7c72; font-size: 14px;"><strong>Service:</strong> ${escapeHtml(service)}</p>
              <p style="margin: 0; color: #6b7c72; font-size: 14px; white-space: pre-wrap;"><strong>Message:</strong> ${escapeHtml(message.substring(0, 200))}${message.length > 200 ? '...' : ''}</p>
            </div>

            <p style="margin: 0 0 15px 0; color: #6b7c72; line-height: 1.6;">
              Best regards,<br/>
              <strong style="color: #0f9d58;">Cruise-Way Engineering Limited</strong><br/>
              RC-1931813
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #d8e4dc;">
              <p style="margin: 0; color: #a8b5af; font-size: 11px; text-align: center;">
                © ${new Date().getFullYear()} Cruise-Way Engineering Limited. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER}`);
});

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
