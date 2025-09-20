# Guide to the Test Module Code

## Introduction

This guide provides a comprehensive overview of the Test Module codebase to help developers quickly understand, maintain, and extend the testing framework. The Test Module is designed to verify the functionality of the Book Extractor utility through automated tests.

## Module Structure

The Test Module is structured as follows:

```
test/
├── modules/                     # Reusable components
│   ├── helpers.js               # Helper functions
│   ├── paths.js                 # Path constants
│   └── warnings.js              # Warning messages
├── sample-zip-file/             # Test assets
│   └── sample-zip-file.zip      # Sample file for testing
├── clearTestData.js             # Main cleanup utility
├── test1_pathResolution.js      # Path resolution test
├── test2_menuIntegration.js     # Menu integration test
└── test2-menu-integration.ps1   # PowerShell script for menu tests
```

## Core Test Files

### 1. Path Resolution Test (`test1_pathResolution.js`)

Tests that the application correctly extracts files to the same location as the source zip file.

**Key functions:**

- `clearLog()` - Resets the log file before testing
- `prepareTestZips()` - Creates test zip files in different locations
- `runExtractBookAndAnalyzeLogs()` - Executes the extraction and analyzes logs
- `testPathResolution()` - Main test function that orchestrates the test flow

**Test flow:**

1. Clear log files
2. Copy sample zip files to test locations
3. Run extraction on each zip file
4. Verify that files are extracted to the expected directories

### 2. Menu Integration Test (`test2_menuIntegration.js` and `test2-menu-integration.ps1`)

Tests Windows shell context menu integration by automating right-click "EXTRACT BOOK" functionality.

**JavaScript component:**

- Spawns a PowerShell process to execute the integration test
- Captures and logs output from the PowerShell script
- Reports test success or failure

**PowerShell component:**

- Copies a sample zip file to the root directory
- Accesses the context menu via Shell.Application COM object
- Finds and executes the "EXTRACT BOOK" verb
- The extracted file is created in the working directory

## Supporting Modules

### Paths Module (`paths.js`)

Centralizes path definitions used throughout the test suite to ensure consistency.

```javascript
const PATHS = {
  logs: path.join(rootDir, 'logs'),
  combinedLog: path.join(rootDir, 'logs', 'combined.log'),
  errorLog: path.join(rootDir, 'logs', 'error.log'),
  location1: path.join(rootDir, 'test', 'location1'),
  location2: path.join(rootDir, 'test', 'location2'),
  testFiles: {
    textFile: path.join(rootDir, 'Text1.txt'),
  },
}
```

### Warnings Module (`warnings.js`)

Contains standardized warning messages for test conditions.

```javascript
const WARNINGS = {
  test1FoldersMissing: 'Warning: No Test1 path folders... Run "npm run path" to test paths.',
  test1FoldersEmpty: 'Warning: Test1 path folders are empty... Run "npm run path" to test paths.',
}
```

### Helpers Module (`helpers.js`)

Provides utility functions for common test operations.

**Key functions:**

- `validateTest1TextFiles()` - Checks if test files/directories exist
- `deleteFileIfExists()` - Safely removes test files based on test type
- `ensureDirectoryExists()` - Creates directories if needed
- `getDocxPath()` - Resolves the path to output DOCX files

## Cleanup Utility (`clearTestData.js`)

Resets the test environment by removing test artifacts and logs.

**Primary functions:**

- `clearTextFiles_test1()` - Cleans up Path Resolution test artifacts
- `clearTextFile_test2()` - Cleans up Menu Integration test artifacts
- `clearDocxFile()` - Removes DOCX files created during testing
- `clearLogFiles()` - Resets log files
- `clearAllTestData()` - Main function that orchestrates cleanup

## Test Flow

The typical test flow works as follows:

1. **Setup**: Test files create necessary directories and sample files
2. **Execution**: The Book Extractor is run against test inputs
3. **Verification**: Test results are validated against expected outcomes
4. **Cleanup**: `clearTestData.js` removes all test artifacts

## Running Tests

Tests can be executed using npm scripts defined in `package.json`:

```
npm run clear   # Clear all test artifacts
npm run path    # Run path resolution test (Test1)
npm run menu    # Run menu integration test (Test2)
```

## Extending the Test Module

### Adding a New Test

To add a new test (e.g., "Test3"):

1. Create a new test file (e.g., `test3_newFeature.js`)
2. Add cleanup functionality to `clearTestData.js`:

   ```javascript
   async function clearNewFeatureData() {
     // Your cleanup code here
   }

   // Update clearAllTestData function
   async function clearAllTestData() {
     try {
       // Existing code...
       await clearNewFeatureData()
       // Existing code...
     } catch (error) {
       // Error handling
     }
   }
   ```

3. Add new constants to modules if needed:

   - New paths in `paths.js`
   - New warning messages in `warnings.js`
   - New helper functions in `helpers.js`

4. Add npm script to `package.json`:
   ```json
   "scripts": {
     "newfeature": "node test/test3_newFeature.js"
   }
   ```

### Modifying Existing Tests

When modifying existing tests:

1. Update corresponding cleanup functions in `clearTestData.js`
2. Ensure path constants remain consistent across the codebase
3. Run all tests to verify changes don't affect other tests

## Troubleshooting

### Common Issues

1. **"File does not exist" warnings**

   - This is normal if you run cleanup without running tests first
   - Solution: Run the relevant test before cleanup

2. **PowerShell execution errors**

   - Check PowerShell execution policy: `Get-ExecutionPolicy`
   - Solution: Ensure policy allows script execution

3. **Missing directories**

   - The helper functions will create necessary directories
   - Check permissions if directory creation fails

4. **Lingering test artifacts**
   - Run `npm run clear` to remove all test artifacts
   - Check for permission issues if files cannot be deleted

## Environment Requirements

- Node.js environment
- PowerShell (for menu integration tests)
- Appropriate file permissions in test directories
- Properly configured .env file with OUTPUT_FOLDER defined

## Best Practices

1. Always run cleanup after tests to maintain a clean environment
2. Keep test files modular and focused on specific functionality
3. Reuse helper functions instead of duplicating code
4. Maintain consistent error handling across test files
5. Document any changes to the test flow or structure

---

By following this guide, you should now have a solid understanding of the Test Module structure and be ready to maintain and extend the codebase as needed.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/8d6d7fcd-9ef6-4cd8-a7b5-5c67b5b5268e/helpers.js
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/4b4584f0-57cd-46bb-898f-6dec8687c365/warnings.js
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/fd4b410a-ec88-49f2-8f1c-cf7406f8bab2/paths.js
[4] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/87fe1ade-d4b0-401f-a0cd-83caeebc12c2/test2_menuIntegration.js
[5] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/a342b33c-0004-4717-9a7f-78ffe92a13c1/test1_pathResolution.js
[6] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/18441009/5ac9b49f-0ba1-4b63-bf95-de5b5c8da47e/clearTestData.js

---

Answer from Perplexity: pplx.ai/share
