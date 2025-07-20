# 🔒 Security Guidelines

## 🚨 Important Security Notice

**NEVER commit sensitive credentials to Git repositories!**

## 📧 Email Configuration Security

### ✅ Secure Setup (Current)
- Email credentials are now stored in environment variables only
- No hardcoded passwords in the codebase
- Proper validation checks for missing credentials

### ❌ Previous Issue (Fixed)
- SMTP credentials were hardcoded in the source code
- This exposed sensitive information in the Git repository
- GitGuardian detected this security vulnerability

## 🔧 Environment Variables Setup

### For Netlify Deployment:
1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add the following variables:
   ```
   EMAIL_USER=anuj@synergybrandarchitect.in
   EMAIL_PASS=your-app-specific-password
   NODE_ENV=production
   ```

### For Local Development:
1. Create a `.env` file in the project root (never commit this!)
2. Add your credentials:
   ```
   EMAIL_USER=your-email@domain.com
   EMAIL_PASS=your-app-password
   NODE_ENV=development
   ```

## 🛡️ Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password (not your regular Gmail password)

## 🔍 Security Best Practices

### ✅ Do:
- Use environment variables for all sensitive data
- Use App Passwords for Gmail (never regular passwords)
- Set environment variables in your hosting platform
- Keep `.env` files in `.gitignore`
- Regularly rotate credentials

### ❌ Don't:
- Hardcode credentials in source code
- Commit `.env` files to Git
- Share credentials in plain text
- Use regular passwords for SMTP
- Store credentials in frontend code

## 🚨 If Credentials Are Compromised

1. **Immediately revoke** the exposed credentials
2. **Generate new** App Password in Gmail
3. **Update environment variables** in all deployments
4. **Remove sensitive data** from Git history if needed
5. **Monitor** for any unauthorized access

## 📞 Security Contact

If you discover a security vulnerability:
- **Email**: anuj@synergybrandarchitect.in
- **Subject**: [SECURITY] Vulnerability Report

## 🔄 Regular Security Maintenance

- [ ] Review and rotate credentials quarterly
- [ ] Monitor GitGuardian alerts
- [ ] Update dependencies regularly
- [ ] Review access logs periodically

---

**Remember: Security is everyone's responsibility!** 🛡️
