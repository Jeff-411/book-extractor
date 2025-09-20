/**
 * @fileoverview Automates menu integration testing using PowerShell.
 * @module test/suites/menu-integration/test
 */
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

console.log('Starting PowerShell test automation...')

// Path to the PowerShell script in the suite's scripts folder
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptPath = path.join(__dirname, 'scripts', 'test2-menu-integration.ps1')
console.log(`Executing PowerShell script at: ${scriptPath}`)

/**
 * Spawn PowerShell process with execution policy bypass to run the integration test script
 */
const powershell = spawn('powershell.exe', [
  '-ExecutionPolicy',
  'Bypass',
  '-NoProfile',
  '-File',
  scriptPath,
])

powershell.stdout.on('data', data => {
  console.log(`PowerShell output: ${data.toString().trim()}`)
})

powershell.stderr.on('data', data => {
  console.error(`PowerShell error: ${data.toString().trim()}`)
})

powershell.on('error', error => {
  console.error(`Failed to start PowerShell process: ${error.message}`)
})

powershell.on('close', code => {
  if (code === 0) {
    console.log('PowerShell test completed successfully')
  } else {
    console.error(`PowerShell test failed with exit code: ${code}`)
  }
})
