/**
 * @fileoverview Tests path resolution functionality by creating test zip files
 * in different locations and verifying that they are extracted to the correct paths.
 * @module test/test1_pathResolution
 */
import { spawn } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logPath = path.resolve(__dirname, '../logs/combined.log')

/**
 * Clears log file at the start of testing
 * @async
 * @function clearLog
 * @returns {Promise<void>} Promise that resolves when logs are cleared
 */
async function clearLog() {
  await fs.writeFile(logPath, '')
  console.log('Logs cleared')
}

/**
 * Prepares test zip files in different directories by copying a sample zip
 * @async
 * @function prepareTestZips
 * @returns {Promise<string[]>} Array of paths to created test zip files
 */
async function prepareTestZips() {
  const sourceZip = path.join(__dirname, './sample-zip-file/sample-zip-file.zip')
  const locations = [path.join(__dirname, 'location1'), path.join(__dirname, 'location2')]
  const testZips = []

  for (let [index, dir] of locations.entries()) {
    await fs.mkdir(dir, { recursive: true })
    const targetPath = path.join(dir, `test-${index}.zip`)
    await fs.copyFile(sourceZip, targetPath)
    testZips.push(targetPath)
  }

  return testZips
}

/**
 * Runs the extraction process on a zip file and analyzes logs
 * @async
 * @function runExtractBookAndAnalyzeLogs
 * @param {string} zipPath - Path to the zip file to extract
 * @returns {Promise<string>} Path where the file was extracted to
 * @throws {Error} If extraction fails or log analysis cannot find the extraction path
 */
async function runExtractBookAndAnalyzeLogs(zipPath) {
  const nodeExe = 'C:\\Program Files\\nodejs\\node.exe'
  const extractJs = path.resolve(__dirname, '../src/index.js')

  return new Promise((resolve, reject) => {
    const process = spawn(nodeExe, [extractJs, zipPath])

    process.on('close', async code => {
      if (code === 0) {
        const logs = await fs.readFile(logPath, 'utf8')

        // Find the specific log section for this zip file
        const logSections = logs.split('zipFilePath:')

        // Find the section containing our zipPath
        const relevantSection = logSections.find(section => section.includes(zipPath))

        if (relevantSection) {
          const match = relevantSection.match(/Extracted non-docx file: .* to (.*)/)
          if (match && match[1]) {
            resolve(match[1])
          } else {
            reject(new Error(`Found log section but no extraction path for ${zipPath}`))
          }
        } else {
          reject(new Error(`Could not find log section for ${zipPath}`))
        }
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}

/**
 * Main test function for path resolution with single log clearing
 * @async
 * @function testPathResolution
 * @returns {Promise<void>} Promise that resolves when all tests are complete
 * @throws {Error} If test preparation or execution fails
 */
async function testPathResolution() {
  try {
    await clearLog()
    const testZips = await prepareTestZips()

    for (const zipPath of testZips) {
      const extractedDir = await runExtractBookAndAnalyzeLogs(zipPath)
      const expectedDir = path.dirname(zipPath)

      console.log(`Test for ${zipPath}:`)
      console.log(`- Expected directory: ${expectedDir}`)
      console.log(`- Actual directory: ${extractedDir}`)

      if (extractedDir === expectedDir) {
        console.log('✅ PASSED: extractDir matches zip file location\n')
      } else {
        console.error('❌ FAILED: extractDir does not match zip file location\n')
      }
    }
  } catch (err) {
    console.error('Test failed:', err)
  }
}

testPathResolution()
