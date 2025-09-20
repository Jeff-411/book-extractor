/**
 * Logging module for Wendy's Book Extractor
 * @module logger
 */

import winston from 'winston'
import path from 'path'
import { CONFIG } from './config.js'

const { logsDir } = CONFIG
const errorLogPath = path.join(logsDir, 'error.log')
const combinedLogPath = path.join(logsDir, 'combined.log')

/**
 * Winston logger configuration
 * Creates a logger that writes to console and files:
 * - error.log: Contains only error level logs
 * - combined.log: Contains all logs regardless of level
 *
 * @constant {winston.Logger}
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    new winston.transports.File({ filename: combinedLogPath }),
    new winston.transports.Console(),
  ],
})

export default logger
