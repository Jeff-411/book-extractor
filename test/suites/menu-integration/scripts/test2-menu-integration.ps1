<#
.SYNOPSIS
    Automates the extraction of a book from a zip file using Windows shell context menu integration.
#>

# Define file paths
$sourceZipPath = "test\fixtures\sample-zip-file.zip"    # CRITICAL: shared fixture location
$destZipPath   = "sample-zip-file.zip"

# Step 1: Copy the zip file to the root directory
Copy-Item -Path $sourceZipPath -Destination $destZipPath -Force

# Step 2: Access context menu via Shell.Application
$shell  = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace((Get-Location).Path)
$zipFile = $folder.ParseName($destZipPath)

# Step 3: Find and execute the "EXTRACT BOOK" verb
$contextMenuOptions = $zipFile.Verbs()
foreach ($option in $contextMenuOptions) {
    if ($option.Name -match "EXTRACT BOOK") {
        $option.DoIt()
        break
    }
}