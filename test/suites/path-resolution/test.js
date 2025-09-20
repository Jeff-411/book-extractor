/**
 * @fileoverview Tests path resolution by creating test zip files in two locations
 * and verifying that they are extracted to the correct paths.
 * @module test/suites/path-resolution/test
 */
import { spawn } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import PATHS from '../../modules/paths.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Clears combined log at the start of testing
 * @async
 */
async function clearLog() {
  await fs.writeFile(PATHS.combinedLog, '')
  console.log('Logs cleared')
}

/**
 * Prepares test zip files in different directories by copying a shared sample zip
 * @async
 * @returns {Promise<string[]>} Array of paths to created test zip files
 */
async function prepareTestZips() {
  const locations = [PATHS.location1, PATHS.location2]
  const testZips = []

  for (let [index, dir] of locations.entries()) {
    await fs.mkdir(dir, { recursive: true })
    const targetPath = path.join(dir, `test-${index}.zip`)
    await fs.copyFile(PATHS.fixtures.sampleZip, targetPath)
    testZips.push(targetPath)
  }

  return testZips
}

/**
 * Runs the extraction process on a zip file and analyzes logs
 * @async
 * @param {string} zipPath - Path to the zip file to extract
 * @returns {Promise<string>} Path where the file was extracted to
 */
async function runExtractBookAndAnalyzeLogs(zipPath) {
  const nodeExe = 'C:\\Program Files\\nodejs\\node.exe' // CRITICAL: Node location
  const extractJs = path.resolve(__dirname, '../../../src/index.js') // CRITICAL: App entry

  return new Promise((resolve, reject) => {
    const child = spawn(nodeExe, [extractJs, zipPath])

    child.on('close', async code => {
      if (code === 0) {
        const logs = await fs.readFile(PATHS.combinedLog, 'utf8')

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
 * Main test function for path resolution
 * @async
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
