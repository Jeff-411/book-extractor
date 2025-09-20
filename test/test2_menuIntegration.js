/**
 * @fileoverview Test script that automates menu integration testing using PowerShell.
 * Executes a PowerShell script and reports on the results.
 * @module test/test2_menuIntegration
 */
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

console.log('Starting PowerShell test automation...')

// Set and log path to the PowerShell script (in root directory)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptPath = path.join(__dirname, 'test2-menu-integration.ps1')
console.log(`Executing PowerShell script at: ${scriptPath}`)

/**
 * Spawn PowerShell process with execution policy bypass to run the integration test script
 * @type {ChildProcess}
 */
const powershell = spawn('powershell.exe', [
  '-ExecutionPolicy',
  'Bypass',
  '-NoProfile',
  '-File',
  scriptPath,
])

/**
 * Handle standard output from PowerShell
 * @listens powershell.stdout#data
 */
powershell.stdout.on('data', data => {
  console.log(`PowerShell output: ${data.toString().trim()}`)
})

/**
 * Handle error output from PowerShell
 * @listens powershell.stderr#data
 */
powershell.stderr.on('data', data => {
  console.error(`PowerShell error: ${data.toString().trim()}`)
})

/**
 * Handle error output from PowerShell
 * @listens powershell.stderr#data
 */
powershell.on('error', error => {
  console.error(`Failed to start PowerShell process: ${error.message}`)
})

/**
 * Handle process completion
 * @listens powershell#close
 */
powershell.on('close', code => {
  if (code === 0) {
    console.log('PowerShell test completed successfully')
  } else {
    console.error(`PowerShell test failed with exit code: ${code}`)
  }
})
