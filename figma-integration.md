# 🎨 Figma MCP Server Integration

## 📋 Overview

The Figma MCP (Model Context Protocol) server allows you to integrate Figma designs directly into your development workflow, enabling seamless design-to-code processes.

## 🚀 Setup Instructions

### 1. Install Figma MCP Server

```bash
npm install -g @modelcontextprotocol/server-figma
```

### 2. Get Figma Access Token

1. **Go to Figma** → [Account Settings](https://www.figma.com/settings)
2. **Personal Access Tokens** section
3. **Generate new token**
4. **Copy the token** (keep it secure!)

### 3. Configure Environment Variables

Add to your `.env` file:
```env
FIGMA_ACCESS_TOKEN=your_figma_token_here
```

### 4. Update MCP Configuration

The `mcp-server-config.json` file has been created with Figma server configuration.

## 🛠️ Available Features

### 📁 File Operations
- **Get file details**: Access Figma file metadata
- **List components**: Get all components from a file
- **Export assets**: Download images, SVGs, PDFs
- **Get styles**: Access color styles, text styles, effects

### 🎨 Design System Integration
- **Component library**: Access design system components
- **Style guide**: Get brand colors, typography, spacing
- **Asset management**: Download and organize design assets
- **Version control**: Track design changes and updates

### 🔄 Workflow Automation
- **Design tokens**: Extract design tokens for CSS/SCSS
- **Component generation**: Auto-generate React components
- **Asset optimization**: Optimize images and SVGs
- **Sync updates**: Keep designs and code in sync

## 📖 Usage Examples

### Basic File Access
```javascript
// Get file information
const fileInfo = await figma.getFile('file-key');

// Get specific node
const node = await figma.getNode('file-key', 'node-id');

// Export assets
const assets = await figma.exportAssets('file-key', {
  ids: ['node-id-1', 'node-id-2'],
  format: 'svg',
  scale: 2
});
```

### Component Integration
```javascript
// Get all components
const components = await figma.getComponents('file-key');

// Generate React component from Figma
const reactComponent = await figma.generateComponent('component-id', {
  framework: 'react',
  typescript: true,
  styled: 'styled-components'
});
```

### Design Token Extraction
```javascript
// Extract color tokens
const colors = await figma.getColorStyles('file-key');

// Extract typography tokens
const typography = await figma.getTextStyles('file-key');

// Generate CSS variables
const cssVariables = await figma.generateTokens('file-key', {
  format: 'css',
  prefix: '--synergy'
});
```

## 🎯 Integration with Synergy Brand Architect

### Brand Assets
- **Logo variations**: Download different logo formats
- **Brand colors**: Extract exact brand color codes
- **Typography**: Get font specifications and weights
- **Icons**: Export icon library as SVGs

### Component Library
- **UI components**: Generate React components from designs
- **Layout systems**: Extract grid and spacing systems
- **Interactive elements**: Convert buttons, forms, cards
- **Responsive designs**: Get mobile and desktop variants

### Workflow Benefits
- **Design consistency**: Ensure pixel-perfect implementation
- **Faster development**: Auto-generate components
- **Real-time updates**: Sync design changes automatically
- **Quality assurance**: Match designs exactly

## 🔧 Configuration Options

### Server Settings
```json
{
  "figma": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-figma"],
    "env": {
      "FIGMA_ACCESS_TOKEN": "your_token",
      "FIGMA_TEAM_ID": "optional_team_id",
      "FIGMA_PROJECT_ID": "optional_project_id"
    }
  }
}
```

### Export Settings
```javascript
const exportConfig = {
  format: 'svg', // svg, png, jpg, pdf
  scale: 2, // 1x, 2x, 3x, 4x
  useAbsoluteBounds: true,
  version: 'latest' // or specific version ID
};
```

## 🛡️ Security Best Practices

### Token Management
- **Environment variables**: Store tokens securely
- **Access control**: Limit token permissions
- **Rotation**: Regularly rotate access tokens
- **Team management**: Use team tokens for shared projects

### File Access
- **Permission levels**: Ensure appropriate file access
- **Version control**: Track design file versions
- **Backup**: Regular backup of design assets
- **Documentation**: Document design decisions

## 📞 Support & Resources

### Documentation
- [Figma API Documentation](https://www.figma.com/developers/api)
- [MCP Server Documentation](https://github.com/modelcontextprotocol/servers)
- [Design System Guidelines](https://www.figma.com/design-systems/)

### Community
- [Figma Community](https://www.figma.com/community)
- [Design Tokens Community](https://design-tokens.github.io/community-group/)
- [MCP Protocol Discussions](https://github.com/modelcontextprotocol/specification)

---

**Ready to streamline your design-to-code workflow with Figma integration!** 🎨✨
