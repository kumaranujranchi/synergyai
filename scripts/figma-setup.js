#!/usr/bin/env node

/**
 * Figma Integration Setup Script
 * Helps configure Figma MCP server for Synergy Brand Architect
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupFigmaIntegration() {
  console.log('🎨 Figma Integration Setup for Synergy Brand Architect\n');

  try {
    // Get Figma access token
    const accessToken = await question('Enter your Figma access token: ');
    
    if (!accessToken) {
      console.log('❌ Access token is required. Exiting...');
      process.exit(1);
    }

    // Optional: Get team ID
    const teamId = await question('Enter your Figma team ID (optional): ');

    // Optional: Get project ID
    const projectId = await question('Enter your Figma project ID (optional): ');

    // Update .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Add or update Figma configuration
    const figmaConfig = [
      '# Figma Integration Configuration',
      `FIGMA_ACCESS_TOKEN=${accessToken}`,
      teamId ? `FIGMA_TEAM_ID=${teamId}` : '# FIGMA_TEAM_ID=your_team_id',
      projectId ? `FIGMA_PROJECT_ID=${projectId}` : '# FIGMA_PROJECT_ID=your_project_id',
      ''
    ].join('\n');

    // Remove existing Figma config if present
    envContent = envContent.replace(/# Figma Integration Configuration[\s\S]*?(?=\n#|\n[A-Z]|$)/g, '');
    
    // Add new config
    envContent += '\n' + figmaConfig;

    fs.writeFileSync(envPath, envContent);

    // Update MCP server config
    const mcpConfigPath = path.join(process.cwd(), 'mcp-server-config.json');
    const mcpConfig = {
      mcpServers: {
        figma: {
          command: 'node',
          args: ['lib/figma-mcp-server.js'],
          env: {
            FIGMA_ACCESS_TOKEN: accessToken
          }
        }
      }
    };

    if (teamId) {
      mcpConfig.mcpServers.figma.env.FIGMA_TEAM_ID = teamId;
    }

    if (projectId) {
      mcpConfig.mcpServers.figma.env.FIGMA_PROJECT_ID = projectId;
    }

    fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));

    console.log('\n✅ Figma integration configured successfully!');
    console.log('\n📋 Configuration Summary:');
    console.log(`   • Access Token: ${accessToken.substring(0, 10)}...`);
    console.log(`   • Team ID: ${teamId || 'Not specified'}`);
    console.log(`   • Project ID: ${projectId || 'Not specified'}`);
    console.log(`   • Config files updated: .env, mcp-server-config.json`);

    console.log('\n🚀 Next Steps:');
    console.log('   1. Test the connection: npm run figma:test');
    console.log('   2. Extract design tokens: npm run figma:tokens');
    console.log('   3. Export assets: npm run figma:assets');

    // Test connection
    const testConnection = await question('\nWould you like to test the connection now? (y/n): ');
    
    if (testConnection.toLowerCase() === 'y') {
      console.log('\n🔍 Testing Figma connection...');
      
      try {
        const FigmaClient = require('../lib/figma-client');
        const client = new FigmaClient(accessToken);
        
        const userInfo = await client.getMe();
        console.log(`✅ Connection successful! Welcome, ${userInfo.handle || 'Figma User'}`);
        
        if (teamId) {
          const projects = await client.getTeamProjects(teamId);
          console.log(`📁 Found ${projects.projects?.length || 0} projects in your team`);
        }
      } catch (error) {
        console.log(`❌ Connection failed: ${error.message}`);
        console.log('Please check your access token and try again.');
      }
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run setup if executed directly
if (require.main === module) {
  setupFigmaIntegration();
}

module.exports = { setupFigmaIntegration };
