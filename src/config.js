// src/config.js - v1.0.1
/**
 * Configuration module for Wendy's Book Extractor
 * @module config
 *
 * History:
 * - v1.0.1: Prefer .env and logs next to the running module (dist) when present; fallback to project root.
 */

import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs' // security: used only for existence checks
import { fileURLToPath } from 'url'

/**
 * Set __dirname equivalent for ES modules
 * @constant {string} __dirname - Directory name of the current module
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

// Prefer .env next to the running module (works for the bundle), else fall back to project root
const localEnv = path.join(__dirname, '.env')
const envPath = fs.existsSync(localEnv)
  ? localEnv
  : path.join(rootDir, process.env.NODE_ENV === 'production' ? '.env.production' : '.env')

// Load environment variables
dotenv.config({ path: envPath })

/**
 * Application configuration object
 * @constant {Object} CONFIG - Configuration settings for the application
 * @property {string} outputFolder - Folder path where extracted books will be saved
 * @property {string} logsDir - Directory path for log files
 * @property {Object} audioAssets - Paths to audio notification files
 */
export const CONFIG = {
  outputFolder: process.env.OUTPUT_FOLDER,
  // Prefer logs next to the running module when present; else project-level logs/
  logsDir: fs.existsSync(path.join(__dirname, 'logs'))
    ? path.join(__dirname, 'logs')
    : path.resolve(rootDir, 'logs'),
  audioAssets: {
    success: path.join(__dirname, 'assets/audio/success.wav'),
    info: path.join(__dirname, 'assets/audio/info.wav'),
    error: path.join(__dirname, 'assets/audio/error.wav'),
  },
}

/**
 * Validates that required environment variables are present
 * @throws {Error} If OUTPUT_FOLDER environment variable is not set
 */
export const validateConfig = () => {
  if (!process.env.OUTPUT_FOLDER) {
    throw new Error('Missing environment variable. Please check your .env file.')
  }
}
