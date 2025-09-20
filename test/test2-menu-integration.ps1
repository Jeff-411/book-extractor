<#
.SYNOPSIS
    Automates the extraction of a book from a zip file using Windows shell context menu integration.

.DESCRIPTION
    This script demonstrates integration with the Windows shell context menu by:
    1. Copying a sample zip file to the root directory
    2. Accessing the context menu for the zip file via Shell.Application COM object
    3. Finding and executing the "EXTRACT BOOK" verb from the context menu options

.NOTES
    File Name      : test2-menu-integration.ps1
    Prerequisite   : PowerShell V3 or later

.EXAMPLE
    PS> .\test2-menu-integration.ps1
    Executes the script to extract a book from the sample zip file.
#>

# Define file paths
$sourceZipPath = "test\sample-zip-file\sample-zip-file.zip"
$destZipPath = "sample-zip-file.zip"

# Step 1: Copy the zip file to the root directory
# Copies the sample zip file to the current directory for processing
Copy-Item -Path $sourceZipPath -Destination $destZipPath -Force

# Step 2: Access context menu via Shell.Application
# Creates COM objects to interact with the Windows shell
$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace((Get-Location).Path)
$zipFile = $folder.ParseName($destZipPath)

# Step 3: Find and execute the "EXTRACT BOOK" verb
# Iterates through available context menu verbs and executes the "EXTRACT BOOK" option
$contextMenuOptions = $zipFile.Verbs()
foreach ($option in $contextMenuOptions) {
    # Searches for the specific menu option containing "EXTRACT BOOK"
    if ($option.Name -match "EXTRACT BOOK") {
        # Executes the selected context menu option
        $option.DoIt()
        break
    }
}
