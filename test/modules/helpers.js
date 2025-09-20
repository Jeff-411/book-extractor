// test/modules/helpers.js - v1.0.1
/**
 * @fileoverview Helper functions for test data operations
 * @module test/modules/helpers
 *
 * History:
 * - v1.0.1: Fix project root resolution to load .env from repo root and correct relative path logging
 */

import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import PATHS from './paths.js'
import WARNINGS from './warnings.js'

// Extract project root for dotenv and relative path logging
// CRITICAL: must resolve to repo root; PATHS.logs lives at "<repo>/logs"
const rootDir = path.dirname(PATHS.logs)

const HELPERS = {
  /**
   * Checks if "Test1: Path resolution" has generated:
   *  1. the `test/location1/` directory, and
   *  2. the `test/location1/Text1.txt` file
   * @async
   * @function validateTest1TextFiles
   * @returns {Promise} Cases:
   *  1. both directory and file exist -> true
   *  2. no directory exists -> warning message: `WARNINGS.test1FoldersMissing`
   *  3. empty directory exists -> warning message: `WARNINGS.test1FoldersEmpty`
   */
  validateTest1TextFiles: async function () {
    try {
      await fs.access(PATHS.location1)
      try {
        const files = await fs.readdir(PATHS.location1)
        if (files.length === 0) {
          return WARNINGS.test1FoldersEmpty
        }
        return true
      } catch (error) {
        console.error(`Error reading directory ${PATHS.location1}:`, error)
        throw error
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        return WARNINGS.test1FoldersMissing
      }
      console.error(`Error accessing directory ${PATHS.location1}:`, error)
      throw error
    }
  },

  /**
   * Safely deletes a file if it exists
   * @async
   * @function deleteFileIfExists
   * @param {string} filePath - Path to the file or directory to process
   * @param {string} typeOfTest - test1 | test2 | "" (deletes test/books/Doc1.docx)
   * @returns {Promise}
   */
  deleteFileIfExists: async function (filePath, typeOfTest) {
    try {
      let targetPath = filePath

      // For test1, we need to get the file inside the directory
      if (typeOfTest === 'test1') {
        const files = await fs.readdir(filePath)
        targetPath = path.join(filePath, files[0])
      }

      // Check if file exists and delete it
      await fs.access(targetPath)
      await fs.unlink(targetPath)

      // Log with the appropriate format based on typeOfTest
      if (typeOfTest === 'test2') {
        console.log(`Deleted file: root\\${path.relative(rootDir, targetPath)}`)
      } else {
        console.log(`Deleted file: ${path.relative(rootDir, targetPath)}`)
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Format the "file not found" message based on typeOfTest
        const relativePath = path.relative(rootDir, filePath)
        const prefix = typeOfTest === 'test2' ? 'root\\' : ''
        console.log(`File does not exist: ${prefix}${relativePath}`)
      } else {
        console.error(`Error processing file ${filePath}:`, error)
        throw error
      }
    }
  },

  /**
   * Ensures a directory exists, creating it if necessary
   * @async
   * @function ensureDirectoryExists
   * @param {string} directoryPath - Path to the directory
   * @returns {Promise}
   */
  ensureDirectoryExists: async function (directoryPath) {
    try {
      await fs.access(directoryPath)
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(directoryPath, { recursive: true })
        console.log(`Created directory: ${path.relative(rootDir, directoryPath)}`)
      } else {
        throw error
      }
    }
  },

  /**
   * Gets the full path to a document file in the OUTPUT_FOLDER
   * @async
   * @function getDocxPath
   * @param {string} filename - Name of the file (defaults to 'Doc1.docx')
   * @returns {Promise} Full path to the file
   * @throws {Error} If OUTPUT_FOLDER environment variable is not defined
   */
  getDocxPath: async function (filename = 'Doc1.docx') {
    // Load environment variables from the repo root .env
    dotenv.config({ path: path.join(rootDir, '.env') })
    // Check if OUTPUT_FOLDER is defined
    if (!process.env.OUTPUT_FOLDER) {
      throw new Error('OUTPUT_FOLDER environment variable is not defined in .env file')
    }
    // Get OUTPUT_FOLDER environment variable
    const outputFolderPath = process.env.OUTPUT_FOLDER
    // Resolve the path - if it's absolute, use it directly, otherwise join with rootDir
    const outputFolder = path.isAbsolute(outputFolderPath)
      ? outputFolderPath
      : path.join(rootDir, outputFolderPath)
    // Return the full path to the file
    return path.join(outputFolder, filename)
  },
}

export default HELPERS
