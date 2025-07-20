/**
 * Figma Integration Usage Examples
 * Demonstrates how to use the Figma MCP server with Synergy Brand Architect
 */

const FigmaClient = require('../lib/figma-client');
const FigmaMCPServer = require('../lib/figma-mcp-server');

// Example 1: Basic file access
async function getFileExample() {
  const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
  
  try {
    // Replace with your actual Figma file key
    const fileKey = 'your-figma-file-key';
    const fileData = await client.getFile(fileKey);
    
    console.log('File Name:', fileData.name);
    console.log('Last Modified:', fileData.lastModified);
    console.log('Version:', fileData.version);
    
    return fileData;
  } catch (error) {
    console.error('Error getting file:', error.message);
  }
}

// Example 2: Export brand assets
async function exportBrandAssets() {
  const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
  
  try {
    const fileKey = 'your-figma-file-key';
    
    // Get file to find logo components
    const fileData = await client.getFile(fileKey);
    
    // Find logo nodes (you'll need to identify these in your file)
    const logoNodeIds = ['logo-node-id-1', 'logo-node-id-2'];
    
    // Export logos as SVG
    const logoExports = await client.exportImages(fileKey, {
      ids: logoNodeIds,
      format: 'svg',
      scale: 2
    });
    
    console.log('Logo exports:', logoExports);
    
    // Export as PNG for different uses
    const pngExports = await client.exportImages(fileKey, {
      ids: logoNodeIds,
      format: 'png',
      scale: 3
    });
    
    console.log('PNG exports:', pngExports);
    
    return { svg: logoExports, png: pngExports };
  } catch (error) {
    console.error('Error exporting assets:', error.message);
  }
}

// Example 3: Extract design tokens
async function extractDesignTokens() {
  const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
  
  try {
    const fileKey = 'your-figma-file-key';
    const tokens = await client.extractDesignTokens(fileKey);
    
    console.log('Design Tokens:');
    console.log('Colors:', Object.keys(tokens.colors));
    console.log('Typography:', Object.keys(tokens.typography));
    console.log('Effects:', Object.keys(tokens.effects));
    
    // Generate CSS variables
    const cssVariables = generateCSSVariables(tokens);
    console.log('\nCSS Variables:');
    console.log(cssVariables);
    
    return tokens;
  } catch (error) {
    console.error('Error extracting tokens:', error.message);
  }
}

// Example 4: Get team components
async function getTeamComponents() {
  const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
  
  try {
    const teamId = process.env.FIGMA_TEAM_ID;
    if (!teamId) {
      console.log('FIGMA_TEAM_ID not set, skipping team components example');
      return;
    }
    
    const components = await client.getTeamComponents(teamId);
    
    console.log('Team Components:');
    components.meta.components.forEach(component => {
      console.log(`- ${component.name} (${component.description || 'No description'})`);
    });
    
    return components;
  } catch (error) {
    console.error('Error getting team components:', error.message);
  }
}

// Example 5: Using MCP Server
async function useMCPServer() {
  const server = new FigmaMCPServer();
  
  try {
    // Initialize with access token
    server.initialize(process.env.FIGMA_ACCESS_TOKEN);
    
    // Get available tools
    const tools = server.getTools();
    console.log('Available MCP Tools:');
    tools.forEach(tool => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });
    
    // Execute a tool
    const fileKey = 'your-figma-file-key';
    const fileResult = await server.executeTool('figma_get_file', { fileKey });
    console.log('File via MCP:', fileResult.name);
    
    return tools;
  } catch (error) {
    console.error('Error using MCP server:', error.message);
  }
}

// Helper function to generate CSS variables from design tokens
function generateCSSVariables(tokens) {
  let css = ':root {\n';
  
  // Colors
  Object.entries(tokens.colors).forEach(([name, token]) => {
    const cssName = name.toLowerCase().replace(/\s+/g, '-');
    css += `  --color-${cssName}: ${token.value || '#000000'};\n`;
  });
  
  // Typography
  Object.entries(tokens.typography).forEach(([name, token]) => {
    const cssName = name.toLowerCase().replace(/\s+/g, '-');
    css += `  --font-${cssName}: ${token.fontFamily || 'inherit'};\n`;
    css += `  --font-size-${cssName}: ${token.fontSize || '16px'};\n`;
    css += `  --font-weight-${cssName}: ${token.fontWeight || '400'};\n`;
  });
  
  css += '}';
  return css;
}

// Example 6: Synergy Brand Architect specific workflow
async function synergyBrandWorkflow() {
  const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
  
  try {
    console.log('🎨 Synergy Brand Architect - Figma Integration Workflow\n');
    
    // 1. Get brand file
    const brandFileKey = 'your-brand-file-key';
    console.log('1. Fetching brand file...');
    const brandFile = await client.getFile(brandFileKey);
    console.log(`   ✅ Loaded: ${brandFile.name}`);
    
    // 2. Extract brand colors
    console.log('2. Extracting brand colors...');
    const styles = await client.getFileStyles(brandFileKey);
    console.log(`   ✅ Found ${Object.keys(styles.meta.styles).length} styles`);
    
    // 3. Get components for UI library
    console.log('3. Getting UI components...');
    const components = await client.getFileComponents(brandFileKey);
    console.log(`   ✅ Found ${Object.keys(components.meta.components).length} components`);
    
    // 4. Export logo variations
    console.log('4. Exporting logo variations...');
    // You'll need to replace these with actual node IDs from your Figma file
    const logoNodes = ['logo-primary', 'logo-secondary', 'logo-icon'];
    const logoExports = await client.exportImages(brandFileKey, {
      ids: logoNodes,
      format: 'svg',
      scale: 1
    });
    console.log(`   ✅ Exported ${Object.keys(logoExports.images).length} logo variations`);
    
    // 5. Generate design system
    console.log('5. Generating design system...');
    const designTokens = await client.extractDesignTokens(brandFileKey);
    const cssVariables = generateCSSVariables(designTokens);
    
    // Save to file (you might want to write this to a CSS file)
    console.log('   ✅ Generated CSS variables');
    
    console.log('\n🎉 Synergy Brand Architect workflow completed successfully!');
    
    return {
      brandFile,
      styles,
      components,
      logoExports,
      designTokens,
      cssVariables
    };
    
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
  }
}

// Run examples if executed directly
async function runExamples() {
  if (!process.env.FIGMA_ACCESS_TOKEN) {
    console.error('❌ FIGMA_ACCESS_TOKEN not found in environment variables');
    console.log('Please run: npm run figma:setup');
    return;
  }
  
  console.log('🎨 Running Figma Integration Examples\n');
  
  try {
    // Test connection first
    const client = new FigmaClient(process.env.FIGMA_ACCESS_TOKEN);
    const userInfo = await client.getMe();
    console.log(`✅ Connected to Figma as: ${userInfo.handle}\n`);
    
    // Run examples (uncomment the ones you want to test)
    // await getFileExample();
    // await exportBrandAssets();
    // await extractDesignTokens();
    // await getTeamComponents();
    // await useMCPServer();
    await synergyBrandWorkflow();
    
  } catch (error) {
    console.error('❌ Examples failed:', error.message);
  }
}

if (require.main === module) {
  runExamples();
}

module.exports = {
  getFileExample,
  exportBrandAssets,
  extractDesignTokens,
  getTeamComponents,
  useMCPServer,
  synergyBrandWorkflow,
  generateCSSVariables
};
