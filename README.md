# Book Extractor

## Description

This app adds an additional option to the **File Explorer** context menu for ZIP files. When clicked, this additional option:

1. Extracts zipped files into file-type-specific directories:
   - `.docx` files are extracted into the `Documents/BOOKS` folder.
   - Other files are extracted into the folder containing the ZIP file.
2. Deletes the ZIP file after it has been processed.

## Project Structure

You can access a tree view of the full project structure click [here](./docs/project-structure.md), but the project is basically organized in four main sections:

1. The root folder holds the build script (`build-distribution.js`), the Development `.env` file and the two `.bat` files used to install/uninstall the app.
2. The `src/` folder holds the project assets and the app's main entry point (`index.js` ) and modules.
3. The `test` folder contains the scripts used in developing and testing the app.
4. The `unzip-wendy-click-dist` folder contains a user-specific version of the app that can be zipped and distributed.

## Setup

### Step 1: Install: `npm install`

### Step 2: Configure:

Create or update the `.env` file (in root) to set the path to your dev output folder, e.g. `C:/Users/johnj/OneDrive/_DEPLOYED/BOOK_UNZIPPER/book-unzipper/test/books`.

### Step 3: Add the "EXTRACT BOOKS" option to the context menu:

1. Open **File Explorer** and navigate to the `key-register.bat` file.
2. Double-click the `key-register.bat` file.
3. Click "Yes" on the UAC confirm dialog.

#### Verify Step 3:

1. Open **File Explorer** and navigate to the `test/sample-zip-file` folder.
2. Right-click on the `sample-zip-file.zip` file.
   - A new "EXTRACT BOOK" option should appear in the pop-up context menu.
   - Do NOT click the new "EXTRACT BOOK" at this time.

### Step 4: Remove the "EXTRACT BOOKS" option from the context menu:

1. Open **File Explorer** and navigate to the `key-delete.bat` file.
2. Double-click the `key-delete.bat` file.
3. Click "Yes" on the UAC confirm dialog.
   - A Command Prompt window will open to report success or failure.
4. Press any key to close the window.

#### Verify Step 4:

1. Open **File Explorer** and navigate to the `test/sample-zip-file` folder.
2. Right-click on the `sample-zip-file.zip` file.
   - The new "EXTRACT BOOK" option created in Step 3 should NOT appear in the pop-up context menu.

## Test

To test the app (or further develop it) see the test [README](./test/README.md) file, and the associated documentation it points to.

## Distribute

To distribute the app as a ZIP file:

1. Run `npm run build`.
2. **In the project root directory** -> right-click on the `unzip-wendy-click-dist` folder.
3. Click the "Reveal in File Explorer" option.
4. **In File Explorer** -> right-click on the `unzip-wendy-click-dist` folder.
5. Hover the "Send to" option to open a menu.
6. Click the "compressed (zipped) folder" to create the ZIP file (`unzip-wendy-click-dist.zip`).
7. Upload to OneDrive, and share the link.

## Utilities

**Tests**: App tests are located in the `test` directory. Click [here](./test/README.md) for test details and usage.

**Distribution**: Run `npm run build` to create the dist package (`unzip-wendy-click-dist`).

**Remove Registry Key**

1. Open **File Explorer** and navigate to the `key-delete.bat` file.
2. Double-click the `key-delete.bat` file.
3. Click "Yes" on the UAC confirm dialog.
4. A Command Prompt window will open to report success or failure.
5. Press any key to close the window.
