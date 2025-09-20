/**
 * @fileoverview Utility module for cleaning up test data and log files generated
 * by `test/suites/path-resolution/test.js` and `test/suites/menu-integration/test.js`
 * @module test/tools/clearTestData
 */
import fs from 'fs/promises'
import PATHS from '../modules/paths.js'
import HELPERS from '../modules/helpers.js'

async function clearTextFiles_test1() {
  const testDataStatus = await HELPERS.validateTest1TextFiles()
  if (testDataStatus === true) {
    await HELPERS.deleteFileIfExists(PATHS.location1, 'test1')
    await HELPERS.deleteFileIfExists(PATHS.location2, 'test1')
  } else {
    console.warn(testDataStatus)
  }
}

async function clearTextFile_test2() {
  await HELPERS.deleteFileIfExists(PATHS.testFiles.textFile, 'test2')
}

async function clearDocxFile() {
  try {
    const docxPath = await HELPERS.getDocxPath()
    await HELPERS.deleteFileIfExists(docxPath)
  } catch (error) {
    console.error('Error clearing DOCX test data:', error)
    throw error
  }
}

async function clearLogFiles() {
  try {
    await HELPERS.ensureDirectoryExists(PATHS.logs)
    await fs.writeFile(PATHS.combinedLog, '', { flag: 'w' })
    console.log('Cleared combined.log')
    await fs.writeFile(PATHS.errorLog, '', { flag: 'w' })
    console.log('Cleared error.log')
  } catch (error) {
    console.error('Error clearing log files:', error)
    throw error
  }
}

async function clearAllTestData() {
  console.log('Starting to clear test data...')
  try {
    await clearTextFiles_test1()
    await clearTextFile_test2()
    await clearDocxFile()
    await clearLogFiles()
    console.log('Test data cleared successfully!')
  } catch (error) {
    console.error('Error clearing test data:', error)
    process.exit(1)
  }
}

clearAllTestData()
