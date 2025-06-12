#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testProductionDeployment() {
  console.log('🔧 Testing production deployment setup...\n');

  // Test 1: Check if build script exists and is executable
  console.log('1. Checking build script...');
  const buildScriptPath = join(__dirname, 'build.sh');
  if (!fs.existsSync(buildScriptPath)) {
    console.error('❌ build.sh not found');
    return false;
  }
  
  try {
    fs.accessSync(buildScriptPath, fs.constants.X_OK);
    console.log('✅ build.sh exists and is executable');
  } catch (error) {
    console.error('❌ build.sh is not executable');
    return false;
  }

  // Test 2: Check static files after build
  console.log('\n2. Checking static file locations...');
  const serverPublicPath = join(__dirname, 'server', 'public');
  const distPublicPath = join(__dirname, 'dist', 'public');
  
  if (fs.existsSync(serverPublicPath) && fs.existsSync(join(serverPublicPath, 'index.html'))) {
    console.log('✅ Static files found in server/public/');
  } else {
    console.log('⚠️  Static files not found in server/public/');
  }

  if (fs.existsSync(distPublicPath)) {
    console.log('✅ Build output found in dist/public/');
  } else {
    console.log('⚠️  Build output not found in dist/public/');
  }

  // Test 3: Check server build
  console.log('\n3. Checking server build...');
  const serverBuildPath = join(__dirname, 'dist', 'index.js');
  if (fs.existsSync(serverBuildPath)) {
    console.log('✅ Server build found at dist/index.js');
  } else {
    console.log('❌ Server build not found at dist/index.js');
    return false;
  }

  // Test 4: Check package.json scripts
  console.log('\n4. Checking package.json configuration...');
  const packageJsonPath = join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.scripts.start && packageJson.scripts.start.includes('NODE_ENV=production')) {
    console.log('✅ Production start script configured correctly');
  } else {
    console.log('⚠️  Production start script configuration needs verification');
  }

  console.log('\n🎉 Production deployment test completed!');
  console.log('\n📋 Deployment Instructions:');
  console.log('   1. Run: ./build.sh');
  console.log('   2. Set NODE_ENV=production');
  console.log('   3. Start: node dist/index.js');
  console.log('\n🚀 Ready for deployment!');
  
  return true;
}

testProductionDeployment().catch(console.error);