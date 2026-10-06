# ==============================================================================
# sync-navbar.ps1
# Synchronize the centralized navbar across all HTML pages in the project.
# Run via: .\sync-navbar.ps1
# ==============================================================================

$PSScriptRoot = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
$NodeScript = Join-Path $PSScriptRoot "sync-navbar.js"

if (Get-Command node -ErrorAction SilentlyContinue) {
    node $NodeScript
} else {
    Write-Error "Node.js is required to execute navbar synchronization."
    exit 1
}
