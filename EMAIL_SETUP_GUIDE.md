# Email Notification Setup Guide

This guide will help you set up email notifications for your contact form using EmailJS.

## What is EmailJS?

EmailJS is a free service that allows you to send emails directly from your frontend without needing a backend server. It's perfect for static websites like this one.

## Step-by-Step Setup

### 1. Sign Up for EmailJS

1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### 2. Create an Email Service

1. After logging in, go to **Email Services** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for most users)
   - **Outlook**
   - **Yahoo Mail**
   - Or use a custom SMTP server
4. Follow the authentication steps
5. Copy your **Service ID** (looks like: `service_xxxxxxxxx`)

### 3. Create an Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **"Create New Template"**
3. Set up your template with the following variables:

**Template Name:** Contact Form Notification

**Subject:** New Message from {{user_name}}

**HTML Content:**
```html
<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> {{user_name}}</p>
<p><strong>Email:</strong> {{user_email}}</p>
<p><strong>Phone:</strong> {{user_phone}}</p>
<p><strong>Service Interested In:</strong> {{service}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>This message was sent from your website contact form.</em></p>
```

4. Save the template and copy your **Template ID** (looks like: `template_xxxxxxxxx`)

### 4. Get Your Public Key

1. Go to **Account** in the left sidebar
2. Click on **API Keys**
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

### 5. Update Your Code

Open `eng.js` and replace the following placeholders with your actual credentials:

```javascript
// Line 7: Replace with your Public Key
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line 10: Replace with your Service ID
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";

// Line 11: Replace with your Template ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";

// Line 115: Replace with your email address (where you want to receive messages)
to_email: "your-email@example.com"
```

### Example:
```javascript
emailjs.init("pk_test_abc123def456ghi789");
const EMAILJS_SERVICE_ID = "service_abc123";
const EMAILJS_TEMPLATE_ID = "template_xyz789";
```

## How It Works

1. **User fills out the form** with their name, email, phone, service interest, and message
2. **Form is submitted** and validated
3. **Email is sent** to your configured email address using EmailJS
4. **User sees a success message** confirming their message was sent
5. **WhatsApp link opens** as a backup communication method

## Features Included

✅ **Email Notifications** - Receive messages directly in your inbox
✅ **Form Validation** - Required fields are marked with asterisks
✅ **Success/Error Messages** - Users get feedback on submission status
✅ **Beautiful UI** - Enhanced contact form styling with animations
✅ **Fallback WhatsApp** - If EmailJS isn't configured, WhatsApp opens as backup
✅ **Responsive Design** - Works on mobile and desktop

## Testing

1. Fill out the contact form with test data
2. Submit the form
3. Check your email inbox for the notification
4. You should receive an email within a few seconds

## Troubleshooting

### Email not arriving?
- Check your spam/junk folder
- Verify your Service ID and Template ID are correct
- Make sure your email service (Gmail, Outlook, etc.) is properly authenticated in EmailJS

### "EmailJS not configured" message?
- This means the credentials haven't been set up yet
- The form will still work and open WhatsApp as a fallback
- Follow the setup steps above to enable email notifications

### Form not submitting?
- Check the browser console (F12 → Console tab) for error messages
- Verify all required fields are filled
- Make sure you're using HTTPS (EmailJS requires secure connections)

## Security Notes

- Your Public Key is safe to share (it's meant to be public)
- Never share your Private Key or API Keys
- EmailJS handles all email sending securely
- No sensitive data is stored on your website

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/contact/](https://www.emailjs.com/contact/)

## Free Plan Limits

The free EmailJS plan includes:
- **200 emails per month**
- Unlimited templates
- Full feature access

If you need more, you can upgrade to a paid plan.

---

**Setup Time:** ~5 minutes
**Cost:** Free (with paid options available)
**Difficulty:** Easy
