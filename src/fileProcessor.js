/**
 * File processing module for Wendy's Book Extractor
 * Handles extraction of ZIP files and sorting of their contents
 * @module fileProcessor
 */

import path from 'path'
import { promises as fs } from 'fs'
import AdmZip from 'adm-zip'
import logger from './logger.js'
import { CONFIG } from './config.js'

/**
 * Processes a ZIP file, extracting its contents to appropriate directories
 * - Extracts .docx files to the configured output folder
 * - Extracts non-docx files to the same directory as the ZIP file
 * - Deletes the original ZIP file after successful extraction
 *
 * @async
 * @param {string} filePath - Full path to the ZIP file to process
 * @returns {Promise<Object>} Result object with processing statistics
 * @property {boolean} success - Whether processing completed successfully
 * @property {boolean} hasNonDocxFiles - Whether non-docx files were found
 * @property {string} filename - Name of the processed ZIP file
 * @property {number} processedFiles - Total number of files processed
 * @property {number} processedDocxCount - Number of .docx files processed
 * @throws {Error} If there's an issue accessing or extracting the ZIP file
 */
export async function processZipFile(filePath) {
  try {
    const fileName = path.basename(filePath)
    logger.info(`Processing file: ${fileName}`)

    let hasNonDocxFiles = false
    let processedFiles = 0
    let processedDocxCount = 0

    // Create destination directory if it doesn't exist
    await fs.mkdir(CONFIG.outputFolder, { recursive: true })

    // Open and process the ZIP file
    const zip = new AdmZip(filePath)

    // Process each entry in the ZIP file
    for (const entry of zip.getEntries()) {
      const extension = path.extname(entry.entryName).toLowerCase()

      if (extension === '.docx') {
        // Extract .docx files to the configured output folder
        const outputPath = path.join(CONFIG.outputFolder, entry.entryName)
        zip.extractEntryTo(entry, CONFIG.outputFolder, false, true)
        logger.info(`Extracted .docx file: ${entry.entryName} to ${outputPath}`)
        processedFiles++
        processedDocxCount++
      } else {
        // Extract non-docx files to the same directory as the ZIP file
        const extractDir = path.dirname(filePath)
        zip.extractEntryTo(entry, extractDir, false, true)
        logger.info(`Extracted non-docx file: ${entry.entryName} to ${extractDir}`)
        hasNonDocxFiles = true
        processedFiles++
      }
    }

    // Delete the original ZIP file
    await fs.unlink(filePath)
    logger.info('File deleted successfully')

    // Return processing results
    return {
      success: true,
      hasNonDocxFiles,
      filename: fileName,
      processedFiles,
      processedDocxCount,
    }
  } catch (error) {
    logger.error(`Error processing file ${filePath}: ${error.message}`)
    throw error
  }
}
