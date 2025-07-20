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
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">🚀 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0;">Synergy Brand Architect - Admin Notification</p>
        <span style="background-color: #ff4757; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: 600;">URGENT - RESPOND WITHIN 2 HOURS</span>
      </div>
      <div style="padding: 30px;">
        <p>A new contact form submission has been received from your website:</p>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">👤 Name:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;">${
              data.fullName
            }</div>
          </div>
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">📧 Email:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;"><a href="mailto:${
              data.email
            }" style="color: #667eea; text-decoration: none;">${
    data.email
  }</a></div>
          </div>
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">📱 Phone:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;"><a href="tel:${
              data.phone
            }" style="color: #667eea; text-decoration: none;">${
    data.phone
  }</a></div>
          </div>
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">🛠️ Service:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;"><strong>${
              data.service
            }</strong></div>
          </div>
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">💰 Budget:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;">${
              data.budgetRange || "Not specified"
            }</div>
          </div>
          <div style="display: flex; margin-bottom: 15px; border-bottom: 1px solid #e9ecef; padding-bottom: 10px;">
            <div style="font-weight: 600; color: #495057; min-width: 120px;">📝 Details:</div>
            <div style="color: #6c757d; flex: 1; word-break: break-word;">${
              data.projectDetails
            }</div>
          </div>
        </div>
        
        <div style="background-color: #e8f5e8; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #155724;">⚡ Quick Actions:</h3>
          <p style="margin: 5px 0;"><a href="mailto:${
            data.email
          }?subject=Re: Your ${data.service} Inquiry&body=Dear ${
    data.fullName
  },%0D%0A%0D%0AThank you for your interest in our ${
    data.service
  } services..." style="color: #28a745; text-decoration: none; font-weight: 600;">📧 Reply to Customer</a></p>
          <p style="margin: 5px 0;"><a href="https://wa.me/${data.phone.replace(
            /[^0-9]/g,
            ""
          )}?text=Hi ${data.fullName}, thank you for your inquiry about ${
    data.service
  }. I'm Anuj from Synergy Brand Architect..." style="color: #25d366; text-decoration: none; font-weight: 600;">💬 WhatsApp Customer</a></p>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: center; color: #1976d2;">
          ⏰ Submitted at: ${new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </div>
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px;">
        <p><strong>Synergy Brand Architect</strong> - Admin Dashboard</p>
        <p>This is an automated notification from your website contact form.</p>
      </div>
    </div>
  `;
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

    // Use environment variables or fallback to hardcoded (temporary)
    const emailUser = process.env.EMAIL_USER || "anuj@synergybrandarchitect.in";
    const emailPass = process.env.EMAIL_PASS || "toeocmeifezbssin";

    console.log("Email configuration:", {
      user: emailUser ? "SET" : "NOT SET",
      pass: emailPass ? "SET" : "NOT SET",
      envVarsAvailable: Object.keys(process.env).length,
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
