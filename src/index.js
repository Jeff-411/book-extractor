/**
 * Wendy's Book Extractor
 *
 * This application adds an additional "EXTRACT BOOK" option to the File Explorer
 * context menu for ZIP files to extract their content based on file types:
 * - .docx files are saved to the configured output folder (usually Documents > BOOKS)
 * - Other file types are saved to the directory containing the ZIP file
 *
 * @module index
 * @author Jeff-411
 * @see {@link https://github.com/Jeff-411/unzip-wendy-click|GitHub Repository}
 */

import { hideConsole } from 'node-hide-console-window'
import logger from './logger.js'
import { validateConfig } from './config.js'
import { processZipFile } from './fileProcessor.js'
import { playNotificationSound } from './notification.js'

// Hide the console window when running as a context menu option
hideConsole()

// Get the ZIP file path from command line arguments
const zipFilePath = process.argv[2]
logger.info(`zipFilePath: ${zipFilePath}`)

/**
 * Main application entry point
 * Processes the ZIP file specified in command line arguments generated
 * by the "Extract Book" option in the File Explorer ZIP file context menu,
 * and provides appropriate audio notifications based on results
 *
 * @async
 * @function main
 * @returns {Promise<void>}
 */
const main = async () => {
  try {
    // Validate environment configuration
    validateConfig()

    // Ensure a ZIP file path was provided
    if (!zipFilePath) {
      logger.error('No ZIP file path provided.')
      process.exit(1)
    }

    // Process the ZIP file
    const result = await processZipFile(zipFilePath)

    logger.info('Success!')

    // Play appropriate notification sounds based on processing results
    if (result.hasNonDocxFiles) {
      if (result.processedDocxCount > 0) {
        // Play success sound followed by info sound if both docx and non-docx files were processed
        playNotificationSound('success')
        setTimeout(() => {
          playNotificationSound('info')
        }, 2000)
      } else {
        // Play only info sound if only non-docx files were processed
        playNotificationSound('info')
      }
    } else {
      // Play success sound if only docx files were processed
      playNotificationSound('success')
    }
  } catch (error) {
    // Log error and play error notification sound
    logger.error(`\n*****\nError processing file: ${error.message}\n*****\n`)
    playNotificationSound('error')
  }
}

// Execute the main function
main()
