// Test the Netlify function locally
const { handler } = require("./netlify/functions/contact.js");

async function testNetlifyFunction() {
  console.log("🧪 Testing Netlify Function Locally...\n");

  const testEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
      fullName: "Test User",
      email: "test@example.com",
      phone: "+91 9876543210",
      service: "AI-Powered Web Development",
      projectDetails: "Testing Netlify function with beautiful email templates",
      budgetRange: "₹50,000 - ₹1,00,000",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const testContext = {};

  try {
    console.log("📧 Testing Netlify function...");

    const result = await handler(testEvent, testContext);

    console.log("📊 Function Response:");
    console.log("Status Code:", result.statusCode);
    console.log("Headers:", result.headers);

    const responseBody = JSON.parse(result.body);
    console.log("Response Body:", responseBody);

    if (result.statusCode === 200 && responseBody.success) {
      console.log("\n✅ Netlify Function Test Successful!");
      console.log("🎉 Email system is working correctly");
      console.log("📧 Both admin and user emails should be sent");
    } else {
      console.log("\n❌ Netlify Function Test Failed");
      console.log("Error:", responseBody);
    }
  } catch (error) {
    console.log("\n❌ Netlify Function Test Error:");
    console.log(error.message);
  }
}

// Run the test
testNetlifyFunction();
