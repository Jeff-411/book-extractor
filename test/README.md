<!-- test/README.md -->

# Test Module Documentation

This document provides comprehensive information about the testing environment for the Book Extractor utility, which extracts `.docx` files from zip archives and organizes them according to specified output directories.

## Overview

The test directory contains scripts and sample data designed to verify the core functionality of the utility. These tests ensure proper operation of file extraction, path resolution, and File Explorer context menu integration. The testing framework provides automated verification of the application's key features to maintain reliability across different environments and use cases.

The test directory also contains a `clearTestData` script that removes all test artifacts and resets the test environment to a clean state. This functionality ensures test isolation and prevents cross-test contamination that could lead to unreliable test results.

## Test Directory Structure

The test directory is organized with the following structure:

```
test/
├── books/
├── docs/
│     ├── Refactoring the clearTestData.js File for Improved.md
│     ├── test-functions-explainer.md
│     ├── test-module-dev-guide.md
│     └── thread-summary.md
├── location1/
├── location2/
├── sample-zip-file/
│     └── sample-zip-file.zip
├── clearTestData.js
├── README.md
├── test2_menuIntegration.js
└── test2-menu-integration.ps1
```

Each component serves a specific purpose in the testing framework. The `location1` and `location2` directories are created dynamically during testing to verify proper path resolution, while the `sample-zip-file` directory contains test data used across multiple test scenarios.

## Test Components

### test1_pathResolution.js

This [script](./test1_pathResolution.js) focuses on testing the path resolution functionality of the `extract.js` utility. It verifies that when extracting zip files from different locations, non-docx files are correctly extracted to the directory containing the original zip file.

The test executes the following operations:

1. Clears the application logs to ensure clean test results
2. Creates test directories (`location1` and `location2`)
3. Copies sample zip files to these locations
4. Runs the extract utility on each test zip
5. Analyzes the application logs to verify correct extraction paths
6. Reports whether the actual extraction directory matches the expected directory

This test is essential for ensuring that the application maintains proper file organization across different scenarios and accurately extracts files to their intended locations.

### test2-menu-integration.ps1

This PowerShell [script](./test2-menu-integration.ps1) simulates the File Explorer context menu integration by:

1. Copying a sample zip file to the root directory
2. Using the Windows Shell.Application COM object to access the file's context menu
3. Finding and executing the "EXTRACT BOOK" verb (context menu action)

The script enables automated testing of the File Explorer integration without requiring manual interaction with the context menu. This approach ensures that the application's context menu functionality can be verified in an automated testing environment.

### test2_menuIntegration.js

This [script](./test2_menuIntegration.js) tests the File Explorer context menu integration functionality of the application. It verifies that the "EXTRACT BOOK" context menu option works correctly when right-clicking on zip files in File Explorer.

The test works by spawning a PowerShell process that executes the `test2-menu-integration.ps1` [script](./test2-menu-integration.ps1), which simulates the context menu action. The test validates that the application correctly responds to context menu triggers, ensuring a seamless user experience when extracting books from the Windows file explorer interface.

The script outputs detailed logs of the PowerShell execution process and reports success or failure based on the PowerShell script's exit code. This test is crucial for ensuring that the application integrates properly with the Windows operating system environment.

### clearTestData.js

The `clearTestData` [script](./clearTestData.js) performs the following operations:

1. Clears the contents of log files in the `logs/` directory:

   - `combined.log` - Contains all application logs
   - `error.log` - Contains only error-level log entries

2. Removes all files from test directories:

   - `test/books/` - The `Doc1.docx` file created by both test functions
   - `books/` - Any files in the root books directory
   - `test/location1/` - Test files created during path resolution testing
   - `test/location2/` - Additional test files for path resolution validation

3. Deletes specific test files:
   - `Text1.txt` in the project root directory, which is created during menu integration testing

This command should be executed before running tests to ensure a clean environment or after tests to clean up generated artifacts.

## Usage

### Available Test Commands

The test suite includes the following commands:

```bash
# Test correct path resolution for extracted files
npm run path 
# Test File Explorer context menu integration    
npm run menu 
# Clear all test data and logs
npm run clear 
```

## Test Data

The test directory includes a sample zip file `sample-zip-file.zip` [file](./sample-zip-file/sample-zip-file.zip) that contains a mix of docx and non-docx files. This sample file is used across different test scenarios to verify the application's extraction behavior. The test scripts automatically copy this sample file to different locations as needed for testing.

## Test Output

Test results are displayed in the console during execution. Additionally, the application logs extraction activities to log files located in the `logs` directory at the project root. These logs can be reviewed to debug test failures or verify correct application behavior.

The `test1_pathResolution.js` [script](./test1_pathResolution.js) specifically analyzes these logs to verify that extraction paths match expectations. The test output clearly indicates whether each test passed or failed, making it easy to identify and address any issues with the application's path resolution logic.

## Troubleshooting

If tests fail, consider the following steps:

1. Check the application logs in the `logs` directory
2. Verify that the `.env` file is properly configured with the correct `OUTPUT_FOLDER` path
3. Ensure that the test directories are accessible and writable
4. For context menu tests, verify that the application is properly registered with File Explorer [1]

[1] For app registration details and debugging see the `key-register.bat` and `key-delete.bat` files in the app's root directory.

## Docs

- For a more detailed evaluation of the role played by each approach click [here](./docs/test-functions-explainer.md)

- For additional onboarding guidance click [here](./docs/test-module-dev-guide.md).

- For a local copy of the main Test Development thread click [here](./docs/Refactoring%20the%20clearTestData.js%20File%20for%20Improved.md)

- For a summary of the main Test Development thread click [here](./docs/thread-summary.md)