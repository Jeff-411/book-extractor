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

  // Test1 work directories (moved under suites/path-resolution/work)
  location1: path.join(rootDir, 'test', 'suites', 'path-resolution', 'work', 'location1'),
  location2: path.join(rootDir, 'test', 'suites', 'path-resolution', 'work', 'location2'),

  // Shared test files
  testFiles: {
    textFile: path.join(rootDir, 'Text1.txt'),
  },

  // Shared fixtures
  fixtures: {
    sampleZip: path.join(rootDir, 'test', 'fixtures', 'sample-zip-file.zip'),
  },
}

export default PATHS
