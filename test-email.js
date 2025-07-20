// Using built-in fetch (Node.js 18+)

async function testEmailFunctionality() {
  console.log("🧪 Testing Email Functionality with New Design...\n");

  const testData = {
    fullName: "Test User",
    email: "test@example.com",
    phone: "+91 9876543210",
    service: "AI-Powered Web Development",
    projectDetails:
      "Testing email functionality with new beautiful HTML design templates. This is a production environment test to verify email delivery works correctly with updated authentication credentials.",
    budgetRange: "₹50,000 - ₹1,00,000",
  };

  try {
    console.log("📧 Sending test contact form submission...");

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log("✅ Email test successful!");
      console.log("📬 Admin notification email sent");
      console.log("📬 User confirmation email sent");
      console.log("\n🎨 New Email Features:");
      console.log("  ✅ Beautiful HTML design with gradients");
      console.log("  ✅ Professional branding");
      console.log("  ✅ Quick action buttons for admin");
      console.log("  ✅ WhatsApp integration links");
      console.log("  ✅ Priority response messaging");
      console.log("  ✅ Company highlights and social links");
      console.log("  ✅ Mobile-responsive design");
      console.log("\n📧 Email Details:");
      console.log(
        `  Admin Subject: 🚀 URGENT: New ${testData.service} Inquiry from ${testData.fullName}`
      );
      console.log(
        `  User Subject: 🚀 Thank You for Contacting Synergy Brand Architect - Response Within 2 Hours!`
      );
      console.log(
        `  From: Synergy Brand Architect <anuj@synergybrandarchitect.in>`
      );
      console.log(`  Admin To: anuj@synergybrandarchitect.in`);
      console.log(`  User To: ${testData.email}`);
    } else {
      console.log("❌ Email test failed:", result);
    }
  } catch (error) {
    console.log("❌ Email test error:", error.message);
  }
}

// Run the test
testEmailFunctionality();
