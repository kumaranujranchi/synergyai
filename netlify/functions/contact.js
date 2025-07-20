const { z } = require("zod");
const nodemailer = require("nodemailer");

// Contact form validation schema
const insertContactSubmissionSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  service: z.string().min(1),
  projectDetails: z.string().min(1),
  budgetRange: z.string().optional(),
});

// Email template functions
function getAdminEmailTemplate(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }

        .header-content {
            position: relative;
            z-index: 1;
        }

        .rocket {
            font-size: 2.5rem;
            margin-bottom: 10px;
            display: block;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        .header h1 {
            color: white;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .company-name {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            margin-bottom: 15px;
        }

        .urgency-badge {
            background: #ff4757;
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            animation: pulse 1.5s infinite;
            box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .content {
            padding: 40px 30px;
        }

        .intro-text {
            color: #4a5568;
            font-size: 1rem;
            margin-bottom: 30px;
            text-align: center;
        }

        .form-data {
            background: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
        }

        .form-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 15px 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .form-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }

        .field-icon {
            font-size: 1.2rem;
            margin-right: 15px;
            color: #667eea;
            width: 24px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .field-label {
            color: #2d3748;
            font-weight: 600;
            font-size: 0.9rem;
            min-width: 80px;
            margin-right: 15px;
        }

        .field-value {
            color: #4a5568;
            font-size: 0.95rem;
            flex: 1;
            word-break: break-word;
        }

        .field-value.email {
            color: #667eea;
            text-decoration: none;
        }

        .field-value.phone {
            color: #38a169;
            font-weight: 500;
        }

        .actions {
            background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
            border: 2px dashed #38a169;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }

        .actions-title {
            color: #2d3748;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .actions-title::before {
            content: '⚡';
            margin-right: 8px;
            font-size: 1.2rem;
        }

        .action-button {
            display: inline-block;
            padding: 12px 24px;
            margin: 5px 10px 5px 0;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .reply-btn {
            background: #667eea;
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .reply-btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .whatsapp-btn {
            background: #25d366;
            color: white;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }

        .whatsapp-btn:hover {
            background: #22c55e;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }

        .footer {
            background: #f8fafc;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .submission-info {
            background: #dbeafe;
            color: #1e40af;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            margin-bottom: 20px;
            display: inline-block;
        }

        .footer-text {
            color: #6b7280;
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .company-branding {
            color: #667eea;
            font-weight: 600;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }

            .header {
                padding: 25px 20px;
            }

            .content {
                padding: 30px 20px;
            }

            .form-row {
                flex-direction: column;
                align-items: flex-start;
            }

            .field-label {
                margin-bottom: 5px;
                min-width: auto;
            }

            .action-button {
                display: block;
                text-align: center;
                margin: 8px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-content">
                <span class="rocket">🚀</span>
                <h1>New Contact Form Submission</h1>
                <div class="company-name">Synergy Brand Architect - Admin Notification</div>
                <div class="urgency-badge">URGENT - RESPOND WITHIN 2 HOURS</div>
            </div>
        </div>

        <div class="content">
            <p class="intro-text">A new contact form submission has been received from your website:</p>

            <div class="form-data">
                <div class="form-row">
                    <div class="field-icon">👤</div>
                    <div class="field-label">Name:</div>
                    <div class="field-value">${data.fullName}</div>
                </div>

                <div class="form-row">
                    <div class="field-icon">✉️</div>
                    <div class="field-label">Email:</div>
                    <div class="field-value email"><a href="mailto:${
                      data.email
                    }" style="color: #667eea; text-decoration: none;">${
    data.email
  }</a></div>
                </div>

                <div class="form-row">
                    <div class="field-icon">📱</div>
                    <div class="field-label">Phone:</div>
                    <div class="field-value phone"><a href="tel:${
                      data.phone
                    }" style="color: #38a169; text-decoration: none;">${
    data.phone
  }</a></div>
                </div>

                <div class="form-row">
                    <div class="field-icon">🔧</div>
                    <div class="field-label">Service:</div>
                    <div class="field-value"><strong>${
                      data.service
                    }</strong></div>
                </div>

                <div class="form-row">
                    <div class="field-icon">💰</div>
                    <div class="field-label">Budget:</div>
                    <div class="field-value">${
                      data.budgetRange || "Not specified"
                    }</div>
                </div>

                <div class="form-row">
                    <div class="field-icon">📝</div>
                    <div class="field-label">Details:</div>
                    <div class="field-value">${data.projectDetails}</div>
                </div>
            </div>

            <div class="actions">
                <div class="actions-title">Quick Actions:</div>
                <a href="mailto:${data.email}?subject=Re: Your ${
    data.service
  } Inquiry&body=Dear ${
    data.fullName
  },%0D%0A%0D%0AThank you for your interest in our ${
    data.service
  } services..." class="action-button reply-btn">📧 Reply to Customer</a>
                <a href="https://wa.me/${data.phone.replace(
                  /[^0-9]/g,
                  ""
                )}?text=Hi ${data.fullName}, thank you for your inquiry about ${
    data.service
  }. I'm from Synergy Brand Architect..." class="action-button whatsapp-btn">💬 WhatsApp Customer</a>
            </div>
        </div>

        <div class="footer">
            <div class="submission-info">
                📅 Submitted at: ${new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
            </div>

            <div class="footer-text">
                <strong class="company-branding">Synergy Brand Architect</strong> - Admin Dashboard<br>
                This is an automated notification from your website contact form.
            </div>
        </div>
    </div>
</body>
</html>`;
}

function getUserEmailTemplate(data) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🚀 Thank You for Contacting Us!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Synergy Brand Architect - India's First AI-Powered IT Solutions</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <h2>Dear ${data.fullName},</h2>
          <p>We have received your inquiry and our expert team will get back to you soon with a detailed quote and consultation.</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); border-radius: 8px; padding: 15px; margin: 15px 0; text-align: center;">
          <h3 style="margin: 0; color: #d63031;">⚡ PRIORITY RESPONSE GUARANTEED</h3>
          <p style="margin: 5px 0 0 0; color: #2d3436;">Our team will contact you within <strong>2 hours</strong> during business hours!</p>
        </div>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3>📋 Your Submission Summary:</h3>
          <div style="display: flex; margin-bottom: 12px;">
            <div style="font-weight: 600; color: #495057; min-width: 100px;">📧 Email:</div>
            <div style="color: #6c757d; flex: 1;">${data.email}</div>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <div style="font-weight: 600; color: #495057; min-width: 100px;">📱 Phone:</div>
            <div style="color: #6c757d; flex: 1;">${data.phone}</div>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <div style="font-weight: 600; color: #495057; min-width: 100px;">🛠️ Service:</div>
            <div style="color: #6c757d; flex: 1;"><strong>${
              data.service
            }</strong></div>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <div style="font-weight: 600; color: #495057; min-width: 100px;">💰 Budget:</div>
            <div style="color: #6c757d; flex: 1;">${
              data.budgetRange || "To be discussed"
            }</div>
          </div>
        </div>
        
        <div style="background-color: #e8f5e8; border-left: 4px solid #28a745; padding: 20px; margin: 20px 0;">
          <h3>⏰ What Happens Next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li><strong>Within 2 hours:</strong> Our team will review your requirements</li>
            <li><strong>Within 24 hours:</strong> You'll receive a detailed quote and project timeline</li>
            <li><strong>Free consultation:</strong> We'll schedule a call to discuss your vision</li>
            <li><strong>Custom proposal:</strong> Tailored solution with AI-powered features</li>
          </ul>
        </div>
        
        <div style="background-color: #fff3cd; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3>📞 Need Immediate Assistance?</h3>
          <p style="margin: 5px 0;"><strong>📱 Phone:</strong> <a href="tel:+919525230232" style="color: #667eea; text-decoration: none;">+91 9525 230232</a></p>
          <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:anuj@synergybrandarchitect.in" style="color: #667eea; text-decoration: none;">anuj@synergybrandarchitect.in</a></p>
          <p style="margin: 5px 0;"><strong>🌐 Website:</strong> <a href="https://synergybrandarchitect.in" style="color: #667eea; text-decoration: none;">synergybrandarchitect.in</a></p>
          
          <div style="text-align: center; margin-top: 15px;">
            <a href="https://wa.me/919525230232?text=Hi, I just submitted a contact form for ${
              data.service
            }. Looking forward to discussing my project!" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; font-weight: 600;">💬 WhatsApp Now</a>
          </div>
        </div>
        
        <div style="background-color: #e3f2fd; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #1976d2;">🎯 Why Choose Synergy Brand Architect?</h3>
          <p style="margin: 5px 0; color: #424242;">✅ India's First AI-Powered IT Solutions</p>
          <p style="margin: 5px 0; color: #424242;">✅ 100+ Successful Projects Delivered</p>
          <p style="margin: 5px 0; color: #424242;">✅ 24/7 Support & Maintenance</p>
          <p style="margin: 5px 0; color: #424242;">✅ Cutting-Edge Technology Stack</p>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <p>Follow us for updates and AI insights:</p>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-size: 18px;">📘 Facebook</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-size: 18px;">🐦 Twitter</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-size: 18px;">💼 LinkedIn</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-size: 18px;">📷 Instagram</a>
        </div>
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px;">
        <p><strong>Synergy Brand Architect</strong> - Transforming Ideas into AI-Powered Digital Solutions</p>
        <p>© 2025 Synergy Brand Architect. All rights reserved.</p>
        <p style="font-size: 12px; color: #999;">This email was sent because you submitted a contact form on our website.</p>
      </div>
    </div>
  `;
}

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const validatedData = insertContactSubmissionSchema.parse(
      JSON.parse(event.body)
    );

    // Use environment variables with fallback for immediate functionality
    const emailUser = process.env.EMAIL_USER || "anuj@synergybrandarchitect.in";
    const emailPass = process.env.EMAIL_PASS || "toeocmeifezbssin";

    console.log("Email configuration:", {
      user: emailUser ? "SET" : "NOT SET",
      pass: emailPass ? "SET" : "NOT SET",
      envVarsAvailable: Object.keys(process.env).length,
      usingFallback: !process.env.EMAIL_USER || !process.env.EMAIL_PASS,
    });

    // Setup Nodemailer transporter for Google Workspace
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    // Generate email templates
    const adminHtml = getAdminEmailTemplate(validatedData);
    const userHtml = getUserEmailTemplate(validatedData);

    // Send notification to admin
    try {
      await transporter.sendMail({
        from: "Synergy Brand Architect <anuj@synergybrandarchitect.in>",
        to: "kumaranujranchi@gmail.com", // Updated to correct email
        subject: `🚀 URGENT: New ${validatedData.service} Inquiry from ${validatedData.fullName}`,
        html: adminHtml,
      });
      console.log("Admin email sent successfully to kumaranujranchi@gmail.com");
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
      // Continue to try user email even if admin email fails
    }

    // Send confirmation to user
    try {
      await transporter.sendMail({
        from: "Synergy Brand Architect <anuj@synergybrandarchitect.in>",
        to: validatedData.email,
        subject:
          "🚀 Thank You for Contacting Synergy Brand Architect - Response Within 2 Hours!",
        html: userHtml,
      });
      console.log("User email sent successfully");
    } catch (emailError) {
      console.error("Failed to send user email:", emailError);
      // Continue to return success even if user email fails
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Contact form error:", error);

    if (error.name === "ZodError") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to submit contact form: " + error.message,
      }),
    };
  }
};
