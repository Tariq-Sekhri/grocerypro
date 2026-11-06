$ErrorActionPreference = 'Stop'
$stateFile = Join-Path $PSScriptRoot '.geopro/processes.json'
if (!(Test-Path $stateFile)) { Write-Host 'GroceryPro development UI is already stopped.'; exit 0 }
$state = Get-Content $stateFile -Raw | ConvertFrom-Json
& pm2.cmd describe grocerypro-backend *> $null
$managedBackend = $LASTEXITCODE -eq 0
$bootManaged = Test-Path (Join-Path $PSScriptRoot '.geopro/boot-ready.json')
$managedBackend = $managedBackend -or $bootManaged
# Match process creation time as well as PID to avoid stopping reused PIDs.
foreach ($entry in @($state.processes | Sort-Object { switch ($_.name) { frontend { 0 } backend { 1 } emulator { 2 } mysql { 3 } } })) {
    if ($managedBackend -and $entry.name -in @('backend', 'mysql')) { continue }
    $process = Get-Process -Id $entry.id -ErrorAction SilentlyContinue
    if (!$process -or $process.StartTime.ToUniversalTime().ToString('o') -ne $entry.started) { continue }
    Write-Host "Stopping $($entry.name)..."
    if ($entry.name -eq 'mysql') {
        $admin = Get-ChildItem 'C:/Program Files/MySQL/*/bin/mysqladmin.exe' | Select-Object -First 1 -ExpandProperty FullName
        $config = Join-Path $PSScriptRoot '.geopro/database.json'
        $oldPassword = $env:MYSQL_PWD
        try {
            $env:MYSQL_PWD = (Get-Content $config -Raw | ConvertFrom-Json).password
            & $admin --no-defaults --host=127.0.0.1 --port=3307 --user=root shutdown
            if ($LASTEXITCODE) { throw 'MySQL graceful shutdown failed; database process left running.' }
        } finally { $env:MYSQL_PWD = $oldPassword }
    } elseif ($entry.name -eq 'emulator') {
        $sdk = $env:ANDROID_SDK_ROOT
        if (!$sdk) { $sdk = Join-Path $env:LOCALAPPDATA 'Android/Sdk' }
        try { & "$sdk/platform-tools/adb.exe" -s $state.emulator emu kill; if ($LASTEXITCODE) { throw 'Emulator console unavailable' } } catch {
            & taskkill.exe /PID $entry.id /T /F | Out-Null
        }
    } else {
        & taskkill.exe /PID $entry.id /T /F | Out-Null
    }
    if (!$process.WaitForExit(20000)) { throw "$($entry.name) did not stop. Process records retained; retry stop." }
}
if ($managedBackend) {
    $state.processes = @($state.processes | Where-Object { $_.name -eq 'mysql' })
    $state | ConvertTo-Json -Depth 5 | Set-Content $stateFile
} else {
    Remove-Item -LiteralPath $stateFile
}
if ($managedBackend) {
    Write-Host 'GroceryPro development UI stopped. Managed backend and its database remain running.'
} else {
    Write-Host 'GroceryPro stopped. Database and emulator data are retained.'
}
