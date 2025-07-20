// Test endpoint to check environment variables
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const envStatus = {
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT SET',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET',
      totalEnvVars: Object.keys(process.env).length,
      availableVars: Object.keys(process.env).filter(key => 
        key.includes('EMAIL') || key.includes('NODE') || key.includes('NETLIFY')
      )
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        environment: envStatus,
        message: 'Environment variables check completed'
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      }),
    };
  }
};
