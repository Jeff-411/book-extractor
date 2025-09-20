/**
 * Sound notification module for Wendy's Book Extractor
 * Provides audio feedback for different application events
 * @module notification
 */

import { exec } from 'child_process'
import logger from './logger.js'
import { CONFIG } from './config.js'

/**
 * Plays a notification sound based on the specified type
 * Available sound types:
 * - success: Plays when .docx files are successfully extracted
 * - info: Plays when non-docx files are found in the ZIP
 * - error: Plays when an error occurs during processing
 *
 * @param {string} type - The type of notification sound to play ('success', 'info', or 'error')
 * @returns {void}
 */
export function playNotificationSound(type) {
  const sounds = CONFIG.audioAssets

  // Validate the requested sound type exists
  if (!sounds[type]) {
    logger.error(`Invalid sound type: ${type}`)
    return
  }

  // Prepare the PowerShell command to play the sound
  const soundPath = sounds[type].replace(/\\/g, '\\\\')
  const command = `powershell -c (New-Object Media.SoundPlayer '${soundPath}').PlaySync()`

  // Execute the command to play the sound
  exec(command, err => {
    if (err) {
      logger.error(`Error playing ${type} sound: ${err}`)
    } else {
      logger.info(`Played ${type} notification sound\n`)
    }
  })
}
