/**
 * Custom Figma MCP Server Implementation
 * Provides Model Context Protocol interface for Figma integration
 */

const FigmaClient = require('./figma-client');

class FigmaMCPServer {
  constructor() {
    this.figmaClient = null;
    this.tools = [
      {
        name: 'figma_get_file',
        description: 'Get Figma file information and content',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' },
            options: { 
              type: 'object', 
              properties: {
                version: { type: 'string' },
                ids: { type: 'array', items: { type: 'string' } },
                depth: { type: 'number' },
                geometry: { type: 'string' }
              }
            }
          },
          required: ['fileKey']
        }
      },
      {
        name: 'figma_export_images',
        description: 'Export images from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' },
            options: {
              type: 'object',
              properties: {
                ids: { type: 'array', items: { type: 'string' } },
                scale: { type: 'number', enum: [1, 2, 3, 4] },
                format: { type: 'string', enum: ['jpg', 'png', 'svg', 'pdf'] },
                use_absolute_bounds: { type: 'boolean' }
              }
            }
          },
          required: ['fileKey']
        }
      },
      {
        name: 'figma_get_components',
        description: 'Get components from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' }
          },
          required: ['fileKey']
        }
      },
      {
        name: 'figma_get_styles',
        description: 'Get styles from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' }
          },
          required: ['fileKey']
        }
      },
      {
        name: 'figma_extract_design_tokens',
        description: 'Extract design tokens from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' }
          },
          required: ['fileKey']
        }
      },
      {
        name: 'figma_get_team_projects',
        description: 'Get projects from Figma team',
        inputSchema: {
          type: 'object',
          properties: {
            teamId: { type: 'string', description: 'Figma team ID' }
          },
          required: ['teamId']
        }
      },
      {
        name: 'figma_get_comments',
        description: 'Get comments from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileKey: { type: 'string', description: 'Figma file key' }
          },
          required: ['fileKey']
        }
      }
    ];
  }

  /**
   * Initialize the server with Figma access token
   */
  initialize(accessToken) {
    if (!accessToken) {
      throw new Error('Figma access token is required');
    }
    
    this.figmaClient = new FigmaClient(accessToken);
    console.log('Figma MCP Server initialized successfully');
  }

  /**
   * Get available tools
   */
  getTools() {
    return this.tools;
  }

  /**
   * Execute a tool
   */
  async executeTool(toolName, args) {
    if (!this.figmaClient) {
      throw new Error('Figma MCP Server not initialized. Call initialize() first.');
    }

    try {
      switch (toolName) {
        case 'figma_get_file':
          return await this.figmaClient.getFile(args.fileKey, args.options || {});

        case 'figma_export_images':
          return await this.figmaClient.exportImages(args.fileKey, args.options || {});

        case 'figma_get_components':
          return await this.figmaClient.getFileComponents(args.fileKey);

        case 'figma_get_styles':
          return await this.figmaClient.getFileStyles(args.fileKey);

        case 'figma_extract_design_tokens':
          return await this.figmaClient.extractDesignTokens(args.fileKey);

        case 'figma_get_team_projects':
          return await this.figmaClient.getTeamProjects(args.teamId);

        case 'figma_get_comments':
          return await this.figmaClient.getComments(args.fileKey);

        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }
    } catch (error) {
      console.error(`Error executing tool ${toolName}:`, error);
      throw error;
    }
  }

  /**
   * Get server capabilities
   */
  getCapabilities() {
    return {
      tools: true,
      resources: false,
      prompts: false,
      logging: true
    };
  }

  /**
   * Handle MCP protocol messages
   */
  async handleMessage(message) {
    const { method, params, id } = message;

    try {
      switch (method) {
        case 'initialize':
          return {
            id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: this.getCapabilities(),
              serverInfo: {
                name: 'figma-mcp-server',
                version: '1.0.0'
              }
            }
          };

        case 'tools/list':
          return {
            id,
            result: {
              tools: this.getTools()
            }
          };

        case 'tools/call':
          const result = await this.executeTool(params.name, params.arguments);
          return {
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2)
                }
              ]
            }
          };

        default:
          throw new Error(`Unknown method: ${method}`);
      }
    } catch (error) {
      return {
        id,
        error: {
          code: -32603,
          message: error.message
        }
      };
    }
  }

  /**
   * Start the MCP server
   */
  start() {
    console.log('Figma MCP Server started');
    
    // Initialize with environment variable if available
    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    if (accessToken) {
      this.initialize(accessToken);
    } else {
      console.warn('FIGMA_ACCESS_TOKEN not found in environment variables');
    }

    // Handle stdin/stdout for MCP protocol
    process.stdin.on('data', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        const response = await this.handleMessage(message);
        process.stdout.write(JSON.stringify(response) + '\n');
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
  }
}

// Export for use as module
module.exports = FigmaMCPServer;

// Run as standalone server if executed directly
if (require.main === module) {
  const server = new FigmaMCPServer();
  server.start();
}
