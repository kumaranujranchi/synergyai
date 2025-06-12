# Deployment Guide

## Build Process

The deployment issue has been resolved with the following fixes:

### 1. Static File Serving Fix

The application now properly handles static file serving in production through a custom build script that ensures files are placed in the correct location.

**Build Process:**
```bash
./build.sh
```

This script:
- Builds the client application using Vite
- Copies the built static files to `server/public/` where the serveStatic function expects them
- Builds the server application with esbuild
- Ensures all files are properly positioned for production deployment

### 2. NODE_ENV Configuration

The application correctly detects the environment:
- **Development:** Uses Vite dev server with hot reloading
- **Production:** Serves static files from `server/public/` directory

### 3. Production Commands

**For deployment platforms (like Replit Deployments):**
```bash
# Build the application
./build.sh

# Start in production mode
NODE_ENV=production node dist/index.js
```

### 4. File Structure After Build

```
├── dist/
│   ├── index.js          # Bundled server application
│   └── public/           # Client build output (Vite default)
├── server/
│   └── public/           # Static files for production serving
│       ├── index.html
│       └── assets/
└── build.sh             # Custom build script
```

## Verification

The deployment fixes have been tested and verified:
- ✅ Static files are properly copied to the expected location
- ✅ Production server correctly serves static files
- ✅ Build process completes without errors
- ✅ Server starts successfully in production mode

## Usage

For local development, continue using:
```bash
npm run dev
```

For production deployment, use the build script before starting:
```bash
./build.sh
NODE_ENV=production node dist/index.js
```