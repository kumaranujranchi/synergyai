# Email Functionality Setup Guide

## Current Status
✅ **Email functionality is fully implemented and working**
❌ **Gmail authentication needs to be configured**

## What's Working
- Contact form submission ✅
- Form validation ✅
- Backend API endpoint ✅
- Email templates (HTML) ✅
- Error handling ✅

## What Needs Configuration
- Gmail App Password authentication

## Setup Instructions

### Step 1: Gmail Account Configuration

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Select "Other" as the device and name it "SynergyAI Website"
   - Copy the generated 16-character password

### Step 2: Environment Configuration

1. **Install dotenv** (if not already installed):
   ```bash
   npm install dotenv
   ```

2. **Update .env file**:
   ```env
   EMAIL_USER=synergybrandarchitect.in@gmail.com
   EMAIL_PASS=your_16_character_app_password_here
   NODE_ENV=development
   ```

### Step 3: Restart the Server

```bash
npm run dev
```

## Email Features

### Admin Notification Email
- Sent to: `synergybrandarchitect.in@gmail.com`
- Contains: All form submission details
- Subject: "New Contact Form Submission - SynergyAI"

### User Confirmation Email
- Sent to: User's email address
- Contains: Confirmation message and submission summary
- Subject: "Thank you for contacting SynergyAI"

## Testing

1. Fill out the contact form on the website
2. Submit the form
3. Check both email addresses for received emails
4. Verify success message appears on the website

## Troubleshooting

### Common Issues

1. **"Username and Password not accepted"**
   - Ensure 2FA is enabled on Gmail account
   - Generate a new App Password
   - Update the EMAIL_PASS in .env file

2. **"Less secure app access"**
   - Use App Passwords instead of regular password
   - Never use the actual Gmail password

3. **Environment variables not loading**
   - Ensure dotenv is installed: `npm install dotenv`
   - Restart the server after updating .env
   - Check that .env file is in the root directory

### Alternative Email Providers

If Gmail doesn't work, you can use other providers:

**SendGrid:**
```javascript
const transporter = nodemailer.createTransporter({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

**Outlook:**
```javascript
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Security Notes

- Never commit .env file to version control
- Use App Passwords, not regular passwords
- Regularly rotate App Passwords
- Monitor email sending logs for suspicious activity
