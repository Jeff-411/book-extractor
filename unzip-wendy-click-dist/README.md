# EXTRACT BOOK - ZIP File Processor

## Overview

This application adds an "EXTRACT BOOK" option to your Windows Explorer context menu for ZIP files. Click this new option to extract Word files to your BOOKS folder.

## Installation

1. Unzip the contents of this folder to a location of your choice on your computer.
2. Open the extracted folder and double-click the `key-register.bat` file.
3. If a pop up window opens, click "Yes".
4. You should see a command prompt window briefly appear and then close. This means the installation was successful.

## How to Use

1. Find a ZIP file containing books (.docx files) in Windows Explorer.
2. Right-click on the ZIP file.
3. In the context menu that appears, click on "EXTRACT BOOK".
4. The application will process the ZIP file:
   - All .docx files will be extracted to your "Documents > BOOKS" folder.
   - Any other file types will be extracted to the same folder as the ZIP file.
   - The original ZIP file will be deleted after extraction.

## Sound Notifications

The application uses sound to indicate the result of the extraction:

- A "Ta-Da" sound means success: .docx files were found and extracted.
- A "Tinkly" sound means other types of files were also extracted (to the same folder as the ZIP file).
- A "Buzz" sound means an error occurred during processing.

## Troubleshooting

If you encounter any issues or hear the error (Buzz) sound, please contact your IT support for assistance.

## Uninstalling

If you need to remove this application:

1. Double-click the `key-delete.bat` file in this folder.
2. If prompted by User Account Control, click "Yes" to allow the script to run.
3. A command prompt window will open to report on the success of the uninstallation.
4. Press any key to close the window.
5. You can then delete this folder and its contents.
