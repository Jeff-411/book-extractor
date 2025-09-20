/**
 * @fileoverview Path configuration constants for the test module
 * @module test/modules/paths
 */

import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Get the project root directory (two levels up from modules folder)
const rootDir = path.join(__dirname, '../..')

// Configure paths as constants for easier maintenance
const PATHS = {
  logs: path.join(rootDir, 'logs'),
  combinedLog: path.join(rootDir, 'logs', 'combined.log'),
  errorLog: path.join(rootDir, 'logs', 'error.log'),
  location1: path.join(rootDir, 'test', 'location1'),
  location2: path.join(rootDir, 'test', 'location2'),
  testFiles: {
    textFile: path.join(rootDir, 'Text1.txt'),
  },
}

export default PATHS
