/**
 * Figma API Client for Synergy Brand Architect
 * Provides integration with Figma designs and assets
 */

class FigmaClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.figma.com/v1';
    this.headers = {
      'X-Figma-Token': accessToken,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Make API request to Figma
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: this.headers,
        ...options
      });

      if (!response.ok) {
        throw new Error(`Figma API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Figma API request failed:', error);
      throw error;
    }
  }

  /**
   * Get file information
   */
  async getFile(fileKey, options = {}) {
    const params = new URLSearchParams();
    
    if (options.version) params.append('version', options.version);
    if (options.ids) params.append('ids', options.ids.join(','));
    if (options.depth) params.append('depth', options.depth);
    if (options.geometry) params.append('geometry', options.geometry);
    if (options.plugin_data) params.append('plugin_data', options.plugin_data);
    if (options.branch_data) params.append('branch_data', options.branch_data);

    const query = params.toString();
    const endpoint = `/files/${fileKey}${query ? `?${query}` : ''}`;
    
    return await this.request(endpoint);
  }

  /**
   * Get file nodes
   */
  async getFileNodes(fileKey, nodeIds, options = {}) {
    const params = new URLSearchParams();
    params.append('ids', nodeIds.join(','));
    
    if (options.version) params.append('version', options.version);
    if (options.depth) params.append('depth', options.depth);
    if (options.geometry) params.append('geometry', options.geometry);
    if (options.plugin_data) params.append('plugin_data', options.plugin_data);

    const endpoint = `/files/${fileKey}/nodes?${params.toString()}`;
    return await this.request(endpoint);
  }

  /**
   * Export images from Figma
   */
  async exportImages(fileKey, options = {}) {
    const params = new URLSearchParams();
    
    if (options.ids) params.append('ids', options.ids.join(','));
    if (options.scale) params.append('scale', options.scale);
    if (options.format) params.append('format', options.format);
    if (options.svg_outline_text) params.append('svg_outline_text', options.svg_outline_text);
    if (options.svg_include_id) params.append('svg_include_id', options.svg_include_id);
    if (options.svg_include_node_id) params.append('svg_include_node_id', options.svg_include_node_id);
    if (options.svg_simplify_stroke) params.append('svg_simplify_stroke', options.svg_simplify_stroke);
    if (options.use_absolute_bounds) params.append('use_absolute_bounds', options.use_absolute_bounds);
    if (options.version) params.append('version', options.version);

    const endpoint = `/images/${fileKey}?${params.toString()}`;
    return await this.request(endpoint);
  }

  /**
   * Get team projects
   */
  async getTeamProjects(teamId) {
    const endpoint = `/teams/${teamId}/projects`;
    return await this.request(endpoint);
  }

  /**
   * Get project files
   */
  async getProjectFiles(projectId, options = {}) {
    const params = new URLSearchParams();
    if (options.branch_data) params.append('branch_data', options.branch_data);

    const query = params.toString();
    const endpoint = `/projects/${projectId}/files${query ? `?${query}` : ''}`;
    return await this.request(endpoint);
  }

  /**
   * Get file components
   */
  async getFileComponents(fileKey) {
    const endpoint = `/files/${fileKey}/components`;
    return await this.request(endpoint);
  }

  /**
   * Get component sets
   */
  async getComponentSets(fileKey) {
    const endpoint = `/files/${fileKey}/component_sets`;
    return await this.request(endpoint);
  }

  /**
   * Get file styles
   */
  async getFileStyles(fileKey) {
    const endpoint = `/files/${fileKey}/styles`;
    return await this.request(endpoint);
  }

  /**
   * Get team styles
   */
  async getTeamStyles(teamId, options = {}) {
    const params = new URLSearchParams();
    if (options.page_size) params.append('page_size', options.page_size);
    if (options.after) params.append('after', options.after);

    const query = params.toString();
    const endpoint = `/teams/${teamId}/styles${query ? `?${query}` : ''}`;
    return await this.request(endpoint);
  }

  /**
   * Get team components
   */
  async getTeamComponents(teamId, options = {}) {
    const params = new URLSearchParams();
    if (options.page_size) params.append('page_size', options.page_size);
    if (options.after) params.append('after', options.after);

    const query = params.toString();
    const endpoint = `/teams/${teamId}/components${query ? `?${query}` : ''}`;
    return await this.request(endpoint);
  }

  /**
   * Get comments on a file
   */
  async getComments(fileKey) {
    const endpoint = `/files/${fileKey}/comments`;
    return await this.request(endpoint);
  }

  /**
   * Post a comment on a file
   */
  async postComment(fileKey, message, clientMeta) {
    const endpoint = `/files/${fileKey}/comments`;
    return await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        message,
        client_meta: clientMeta
      })
    });
  }

  /**
   * Get user information
   */
  async getMe() {
    const endpoint = '/me';
    return await this.request(endpoint);
  }

  /**
   * Get version history
   */
  async getVersions(fileKey) {
    const endpoint = `/files/${fileKey}/versions`;
    return await this.request(endpoint);
  }

  /**
   * Helper: Extract design tokens from styles
   */
  async extractDesignTokens(fileKey) {
    try {
      const styles = await this.getFileStyles(fileKey);
      const tokens = {
        colors: {},
        typography: {},
        effects: {},
        grids: {}
      };

      // Process styles and convert to design tokens
      if (styles.meta && styles.meta.styles) {
        for (const style of Object.values(styles.meta.styles)) {
          switch (style.style_type) {
            case 'FILL':
              tokens.colors[style.name] = this.extractColorToken(style);
              break;
            case 'TEXT':
              tokens.typography[style.name] = this.extractTextToken(style);
              break;
            case 'EFFECT':
              tokens.effects[style.name] = this.extractEffectToken(style);
              break;
            case 'GRID':
              tokens.grids[style.name] = this.extractGridToken(style);
              break;
          }
        }
      }

      return tokens;
    } catch (error) {
      console.error('Failed to extract design tokens:', error);
      throw error;
    }
  }

  /**
   * Helper: Extract color token
   */
  extractColorToken(style) {
    // Implementation would depend on Figma's style structure
    return {
      name: style.name,
      description: style.description,
      type: 'color',
      // Add color extraction logic here
    };
  }

  /**
   * Helper: Extract text token
   */
  extractTextToken(style) {
    return {
      name: style.name,
      description: style.description,
      type: 'typography',
      // Add typography extraction logic here
    };
  }

  /**
   * Helper: Extract effect token
   */
  extractEffectToken(style) {
    return {
      name: style.name,
      description: style.description,
      type: 'effect',
      // Add effect extraction logic here
    };
  }

  /**
   * Helper: Extract grid token
   */
  extractGridToken(style) {
    return {
      name: style.name,
      description: style.description,
      type: 'grid',
      // Add grid extraction logic here
    };
  }
}

module.exports = FigmaClient;
