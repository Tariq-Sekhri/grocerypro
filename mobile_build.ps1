$ErrorActionPreference = 'Stop'

# Builds the signed GroceryPro Android App Bundle (Capacitor) for Play Store
# upload. The web app is bundled inside; each install picks its server
# (Tailscale, Local or custom) on first launch.

function Invoke-BuildCommand {
    param([string]$Command, [string[]]$CommandArguments)
    $resolvedCommand = (Get-Command $Command -ErrorAction Stop).Source
    # Windows PowerShell can turn harmless native stderr into terminating errors
    # when the caller redirects build logs. Native exit codes decide success.
    $ErrorActionPreference = 'Continue'
    & $resolvedCommand @CommandArguments
    if ($LASTEXITCODE -ne 0) { throw "$Command failed with exit code $LASTEXITCODE" }
}

$projectRoot = (Resolve-Path -LiteralPath $PSScriptRoot).Path
$frontendRoot = Join-Path $projectRoot 'frontend'
$sdkRoot = $env:ANDROID_HOME
if (!$sdkRoot) { $sdkRoot = $env:ANDROID_SDK_ROOT }
if (!$sdkRoot) { $sdkRoot = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
if (!(Test-Path -LiteralPath $sdkRoot)) { throw 'Android SDK not found. Set ANDROID_HOME.' }
$env:ANDROID_HOME = $sdkRoot
if (!$env:JAVA_HOME) {
    $studioJava = 'C:\Program Files\Android\Android Studio\jbr'
    if (Test-Path -LiteralPath $studioJava) { $env:JAVA_HOME = $studioJava }
}

Invoke-BuildCommand 'node' @((Join-Path $projectRoot 'scripts\ensure-signing-key.cjs'))
Push-Location -LiteralPath $frontendRoot
try {
    if (!(Test-Path -LiteralPath 'node_modules\@capacitor\cli\package.json')) {
        Invoke-BuildCommand 'npm.cmd' @('ci', '--no-audit', '--no-fund')
    }
    Write-Host 'Building GroceryPro web bundle...'
    Invoke-BuildCommand 'npm.cmd' @('run', 'build')
    Write-Host 'Syncing Capacitor Android project...'
    Invoke-BuildCommand 'npx.cmd' @('cap', 'sync', 'android')
    Write-Host 'Building signed GroceryPro Android App Bundle...'
    Push-Location -LiteralPath 'android'
    try {
        Invoke-BuildCommand '.\gradlew.bat' @('clean', ':app:bundleRelease', '--console=plain')
    } finally { Pop-Location }
    $aabPath = Join-Path $frontendRoot 'android\app\build\outputs\bundle\release\app-release.aab'
    if (!(Test-Path -LiteralPath $aabPath)) { throw 'Signed release AAB was not produced.' }
    $jarsigner = 'jarsigner.exe'
    if ($env:JAVA_HOME) { $jarsigner = Join-Path $env:JAVA_HOME 'bin\jarsigner.exe' }
    $ErrorActionPreference = 'Continue'
    $verification = & $jarsigner '-J-Duser.language=en' '-J-Duser.country=US' -verify $aabPath 2>&1
    $ErrorActionPreference = 'Stop'
    if (($verification -join "`n") -notmatch 'jar verified\.') {
        $verification | Write-Output
        throw 'Release AAB signature verification failed.'
    }
    $publishedAabPath = Join-Path $projectRoot 'app-release.aab'
    Copy-Item -LiteralPath $aabPath -Destination $publishedAabPath -Force
    $aab = Get-Item -LiteralPath $publishedAabPath
    Write-Host "Signed release AAB ready: $($aab.FullName) ($([math]::Round($aab.Length / 1MB, 2)) MB)"
} finally {
    Pop-Location
}
