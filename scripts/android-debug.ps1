param([string]$Serial = $env:ANDROID_SERIAL, [switch]$NoBuild)
$ErrorActionPreference = 'Stop'

# Builds the debug APK and installs/launches it on a running emulator or a
# USB device.

$root = Split-Path -Parent $PSScriptRoot
$frontend = Join-Path $root 'frontend'
$sdk = $env:ANDROID_HOME
if (!$sdk) { $sdk = $env:ANDROID_SDK_ROOT }
if (!$sdk) { $sdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$env:ANDROID_HOME = $sdk
$adb = Join-Path $sdk 'platform-tools\adb.exe'
if (!(Test-Path -LiteralPath $adb)) { throw "adb not found at $adb" }
if (!$env:JAVA_HOME) {
    $studioJava = 'C:\Program Files\Android\Android Studio\jbr'
    if (Test-Path -LiteralPath $studioJava) { $env:JAVA_HOME = $studioJava }
}

function Invoke-Checked([string]$Exe, [string[]]$Arguments) {
    $ErrorActionPreference = 'Continue'
    & $Exe @Arguments
    if ($LASTEXITCODE -ne 0) { throw "$Exe $($Arguments -join ' ') failed with exit code $LASTEXITCODE" }
}

if (!$NoBuild) {
    Push-Location -LiteralPath $frontend
    try {
        if (!(Test-Path -LiteralPath 'node_modules\@capacitor\cli\package.json')) { Invoke-Checked 'npm.cmd' @('ci', '--no-audit', '--no-fund') }
        Invoke-Checked 'npm.cmd' @('run', 'build')
        Invoke-Checked 'npx.cmd' @('cap', 'sync', 'android')
        Push-Location -LiteralPath 'android'
        try { Invoke-Checked '.\gradlew.bat' @(':app:assembleDebug', '--console=plain') } finally { Pop-Location }
    } finally { Pop-Location }
}

$apk = Join-Path $frontend 'android\app\build\outputs\apk\debug\app-debug.apk'
if (!(Test-Path -LiteralPath $apk)) { throw "Debug APK not found at $apk" }
if (!$Serial) {
    $devices = @(& $adb devices | Select-String '^(\S+)\s+device$' | ForEach-Object { $_.Matches[0].Groups[1].Value })
    if ($devices.Count -eq 0) { throw 'No Android emulator or device is connected.' }
    if ($devices.Count -gt 1) { throw "Several devices are connected ($($devices -join ', ')). Pass -Serial." }
    $Serial = $devices[0]
}
Write-Host "Installing GroceryPro on $Serial..."
Invoke-Checked $adb @('-s', $Serial, 'install', '-r', $apk)
Invoke-Checked $adb @('-s', $Serial, 'shell', 'am', 'start', '-n', 'ca.sekhrit.grocerypro/.MainActivity')
Write-Host 'GroceryPro launched. It connects to the first server that answers (Local, then Tailscale).'
