// build-distribution.js - v1.0.1
/**
 * @module BuildDistribution
 * @description Handles bundling and production distribution package creation
 * @author Jeff-411
 * @version 1.0.1
 * @license MIT
 *
 * History:
 * - v1.0.1: Bundle all JS deps except node-hide-console-window; copy native addon into dist/node_modules;
 *           fix registry target path expectations.
 * - v1.0.0: Initial version
 */

import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @function cleanDistributionFolder
 * @description Cleans and recreates the distribution directory
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If directory cleanup fails
 */
async function cleanDistributionFolder() {
  const distributionDir = path.join(__dirname, 'unzip-wendy-click-dist')
  if (fs.existsSync(distributionDir)) {
    fs.rmSync(distributionDir, { recursive: true, force: true })
  }
  fs.mkdirSync(distributionDir)
}

/**
 * @function copyAssets
 * @description Copies static assets to distribution directory
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If asset copy operation fails
 */
async function copyAssets() {
  const assetDir = path.join(__dirname, 'src', 'assets')
  const distAssetDir = path.join(__dirname, 'unzip-wendy-click-dist', 'assets')
  fs.mkdirSync(distAssetDir, { recursive: true })

  // Copy audio files
  const audioDir = path.join(assetDir, 'audio')
  const distAudioDir = path.join(distAssetDir, 'audio')
  fs.mkdirSync(distAudioDir, { recursive: true })
  const audioFiles = fs.readdirSync(audioDir)
  for (const file of audioFiles) {
    fs.copyFileSync(path.join(audioDir, file), path.join(distAudioDir, file))
  }
}

/**
 * @function copyAdditionalFiles
 * @description Copies additional files needed for distribution
 * @returns {void}
 * @throws {Error} If file copy operation fails
 */
function copyAdditionalFiles() {
  const distributionDir = path.join(__dirname, 'unzip-wendy-click-dist')

  // Copy .env.production as .env (critical: keep filename exact)
  fs.copyFileSync(path.join(__dirname, '.env.production'), path.join(distributionDir, '.env'))

  // Copy bat files (critical: registry path hard-coded in key-register.bat)
  fs.copyFileSync(
    path.join(__dirname, 'key-register.bat'),
    path.join(distributionDir, 'key-register.bat')
  )
  fs.copyFileSync(
    path.join(__dirname, 'key-delete.bat'),
    path.join(distributionDir, 'key-delete.bat')
  )

  // Copy production README.md from src/assets
  fs.copyFileSync(
    path.join(__dirname, 'src', 'assets', 'README.md'),
    path.join(distributionDir, 'README.md')
  )

  // Ensure externals are available in dist (only node-hide-console-window)
  const moduleName = 'node-hide-console-window' // critical: native addon
  const srcModulePath = path.join(__dirname, 'node_modules', moduleName)
  const distNodeModules = path.join(distributionDir, 'node_modules')
  const distModulePath = path.join(distNodeModules, moduleName)
  fs.mkdirSync(distNodeModules, { recursive: true })
  fs.cpSync(srcModulePath, distModulePath, { recursive: true })
}

/**
 * @function buildDistribution
 * @description Main process to build the distribution package
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If distribution creation fails
 */
async function buildDistribution() {
  try {
    // Clean and create distribution directory
    await cleanDistributionFolder()

    // Bundle JavaScript directly to distribution folder
    await esbuild.build({
      entryPoints: ['src/index.js'],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile: 'unzip-wendy-click-dist/unzip-wendy-bundle.mjs',
      // Bundle JS deps; leave only the native addon external
      external: ['node-hide-console-window'],
      sourcemap: true,
    })

    // Copy assets to distribution folder
    await copyAssets()

    // Copy additional files (readme, .env, bat files, and native addon)
    copyAdditionalFiles()

    console.log('Distribution created successfully!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Execute distribution creation
buildDistribution()
