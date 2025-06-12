#!/bin/bash

# Build script to handle static file deployment
echo "Building client application..."
vite build

echo "Ensuring server/public directory exists..."
mkdir -p server/public

echo "Copying built files to server/public for static serving..."
cp -r dist/public/* server/public/

echo "Building server application..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build complete! Static files are ready for deployment."