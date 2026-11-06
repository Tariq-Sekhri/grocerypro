param([string]$Avd = 'GeoProPlay', [int]$ApiPort = 3033, [switch]$NoEmulator)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$root = $PSScriptRoot
$envFile = Join-Path $root 'backend/.env'
$apiHost = if (Test-Path $envFile) { (Get-Content $envFile | Where-Object { $_ -match '^\s*TAILSCALE_IP\s*=' } | Select-Object -First 1) -replace '^\s*TAILSCALE_IP\s*=\s*', '' -replace '["'']', '' } else { '' }
if (!$apiHost) { throw 'Set TAILSCALE_IP in backend/.env (see backend/.env.example).' }
$env:VITE_TAILSCALE_HOST = $apiHost
$runtime = Join-Path $root '.geopro'
New-Item -ItemType Directory -Force -Path $runtime | Out-Null
$stateFile = Join-Path $runtime 'processes.json'
$state = @{ processes = @(); emulator = $null }
function Save-State { $state | ConvertTo-Json -Depth 5 | Set-Content $stateFile }
function Start-Owned($Name, $Exe, $Arguments, $Directory) {
    $process = Start-Process -FilePath $Exe -ArgumentList $Arguments -WorkingDirectory $Directory -WindowStyle Hidden -PassThru -RedirectStandardOutput "$runtime/$Name.log" -RedirectStandardError "$runtime/$Name.error.log"
    $state.processes += @{ name = $Name; id = $process.Id; started = $process.StartTime.ToUniversalTime().ToString('o') }
    Save-State
    return $process
}
function Wait-Ready($Description, [scriptblock]$Check, $Seconds = 90) {
    $deadline = (Get-Date).AddSeconds($Seconds)
    do {
        try { if (& $Check) { return } } catch { }
        Start-Sleep -Seconds 2
    } while ((Get-Date) -lt $deadline)
    throw "$Description did not become ready. Check logs in $runtime."
}
function Port-Open($Port, $TargetHost = '127.0.0.1') {
    $client = New-Object Net.Sockets.TcpClient
    try { $client.Connect($TargetHost, $Port); return $true } catch { return $false } finally { $client.Dispose() }
}
function Invoke-Native([scriptblock]$Command) {
    $ErrorActionPreference = 'Continue'
    & $Command
}
function Run-Node($Directory, $Arguments) {
    Push-Location $Directory
    try { Invoke-Native { & $node @Arguments }; if ($LASTEXITCODE -ne 0) { throw "Command failed: node $Arguments" } } finally { Pop-Location }
}
if (Test-Path $stateFile) {
    $previous = Get-Content $stateFile -Raw | ConvertFrom-Json
    foreach ($entry in $previous.processes) {
        if ($entry.name -in @('mysql', 'backend')) { continue }
        $process = Get-Process -Id $entry.id -ErrorAction SilentlyContinue
        if ($process -and $process.StartTime.ToUniversalTime().ToString('o') -eq $entry.started) {
            throw 'GroceryPro is already running (or partially running). Run stop grocerypro first.'
        }
    }
    $state.processes = @($previous.processes | Where-Object { $_.name -eq 'mysql' })
}
$node = (Get-Command node -ErrorAction Stop).Source
$sdk = $env:ANDROID_SDK_ROOT
if (!$sdk) { $sdk = Join-Path $env:LOCALAPPDATA 'Android/Sdk' }
$adb = Join-Path $sdk 'platform-tools/adb.exe'
$emulator = Join-Path $sdk 'emulator/emulator.exe'
$mysql = Get-ChildItem 'C:/Program Files/MySQL/*/bin/mysqld.exe' -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
if (!$mysql) { throw 'Install MySQL Server 8 (the binaries are used without its Windows service).' }
if (!(Test-Path $adb) -or !(Test-Path $emulator)) { throw 'Install Android SDK, platform-tools, and emulator in Android Studio.' }
if (!$NoEmulator -and (Port-Open 5580)) { throw 'Emulator port 5580 is in use. Run stop grocerypro first.' }
try {
    $bootManaged = Test-Path (Join-Path $runtime 'boot-ready.json')
    if ($bootManaged) {
        Wait-Ready 'GroceryPro boot service' { (Invoke-RestMethod "http://127.0.0.1:$ApiPort/health" -TimeoutSec 3).status -eq 'ok' }
        Write-Host 'Using GroceryPro boot service; database and backend remain managed by the boot supervisor.'
    } else {
    foreach ($folder in @('backend', 'frontend')) {
        if (!(Test-Path "$root/$folder/node_modules")) {
            Push-Location "$root/$folder"
            try { Invoke-Native { & npm.cmd ci --no-audit --no-fund }; if ($LASTEXITCODE) { throw "Dependency installation failed for $folder" } } finally { Pop-Location }
        }
    }
    $configFile = Join-Path $runtime 'database.json'
    if (!(Test-Path $configFile)) {
        @{ password = [Guid]::NewGuid().ToString('N') } | ConvertTo-Json | Set-Content $configFile
    }
    $password = (Get-Content $configFile -Raw | ConvertFrom-Json).password
    $dataDir = Join-Path $runtime 'mysql'
    if (!(Test-Path "$dataDir/mysql")) {
        New-Item -ItemType Directory -Force $dataDir | Out-Null
        Write-Host 'Initializing project MySQL database...'
        & $mysql --no-defaults --initialize-insecure "--datadir=$dataDir" --console
        if ($LASTEXITCODE) { throw 'MySQL initialization failed.' }
    }
    $initFile = Join-Path $runtime 'mysql-init.sql'
    "ALTER USER 'root'@'localhost' IDENTIFIED BY '$password';" | Set-Content -Encoding Ascii $initFile
    if (!(Port-Open 3307)) {
        $state.processes = @($state.processes | Where-Object { $_.name -ne 'mysql' })
        Invoke-Native { & pm2.cmd startOrRestart "$root/ecosystem.config.cjs" --only grocerypro-mysql --update-env }
        if ($LASTEXITCODE) { throw 'Could not start GroceryPro MySQL in PM2.' }
        Invoke-Native { & pm2.cmd save }
        if ($LASTEXITCODE) { throw 'Could not save PM2 process list.' }
    }
    Wait-Ready 'MySQL' { Port-Open 3307 }
    $env:DATABASE_URL = "mysql://root:${password}@127.0.0.1:3307/grocerypro"
    Write-Host 'Preparing database schema and generated types...'
    Run-Node "$root/backend" @('node_modules/prisma/build/index.js', 'generate')
    Run-Node "$root/backend" @('node_modules/tsx/dist/cli.mjs', 'scripts/setup-db.ts')
    $env:PORT = "$ApiPort"
    # The API accepts Tailscale clients and loopback (this PC, and emulators via 10.0.2.2).
    $env:HOST = "$apiHost,127.0.0.1"
    # Bake the API port into the app's Tailscale/Local server presets.
    $env:VITE_API_PORT = "$ApiPort"
    # The backend serves the web app from frontend/dist.
    Push-Location "$root/frontend"
    try { Invoke-Native { & npm.cmd run build }; if ($LASTEXITCODE) { throw 'Web app build failed.' } } finally { Pop-Location }
    Push-Location "$root/backend"
    try { Invoke-Native { & npm.cmd run build }; if ($LASTEXITCODE) { throw 'Backend build failed.' } } finally { Pop-Location }
    Invoke-Native { & pm2.cmd startOrRestart "$root/ecosystem.config.cjs" --only grocerypro-backend --update-env }
    if ($LASTEXITCODE) { throw 'Could not start GroceryPro backend in PM2.' }
    Invoke-Native { & pm2.cmd save }
    if ($LASTEXITCODE) { throw 'Could not save PM2 process list.' }
    Wait-Ready 'API' { try { (Invoke-RestMethod "http://127.0.0.1:$ApiPort/health").app -eq 'grocerypro' } catch { $false } }
    }
    $tailscaleUp = $false
    try { $tailscaleUp = (Invoke-RestMethod "http://${apiHost}:$ApiPort/health" -TimeoutSec 5).app -eq 'grocerypro' } catch { }
    if (!$tailscaleUp) { Write-Warning "The API is not reachable on Tailscale ($apiHost). Local clients still work; connect Tailscale for phones." }
    Write-Host "Web app: http://${apiHost}:$ApiPort (Tailscale)  |  http://localhost:$ApiPort (this PC)"
    if ($NoEmulator) {
        Write-Host 'GroceryPro backend started (no emulator).'
        return
    }
    $avds = & $emulator -list-avds
    if ($Avd -notin $avds) {
        $manager = Get-ChildItem "$sdk/cmdline-tools/*/bin/avdmanager.bat" | Select-Object -Last 1 -ExpandProperty FullName
        $image = Get-ChildItem "$sdk/system-images/*/google_apis_playstore/x86_64/package.xml" | Where-Object { $_.FullName -match 'android-(3[1-6])\\' } | Sort-Object FullName -Descending | Select-Object -First 1
        if (!$image -or !$manager) { throw 'Install a Google Play x86_64 system image and Android command-line tools in Android Studio.' }
        $package = ([xml](Get-Content $image.FullName -Raw)).'ns2:repository'.localPackage.path
        if (!$package) { $package = ([xml](Get-Content $image.FullName -Raw)).SelectSingleNode('//*[local-name()="localPackage"]').GetAttribute('path') }
        'no' | & $manager create avd -n $Avd -k $package -d pixel_7
        if ($LASTEXITCODE) { throw 'Could not create GroceryPro emulator.' }
        $avdHome = $env:ANDROID_AVD_HOME
        if (!$avdHome) { $avdHome = Join-Path $env:USERPROFILE '.android/avd' }
        $avdConfig = Join-Path $avdHome "$Avd.avd/config.ini"
        if (Test-Path $avdConfig) {
            (Get-Content $avdConfig) -replace '^PlayStore.enabled\s*=.*', 'PlayStore.enabled=yes' | Set-Content -Encoding Ascii $avdConfig
        }
    }
    Write-Host "Starting Android emulator $Avd..."
    $emu = Start-Process $emulator -ArgumentList "-avd $Avd -port 5580 -no-snapshot-save" -PassThru -RedirectStandardOutput "$runtime/emulator.log" -RedirectStandardError "$runtime/emulator.error.log"
    $state.processes += @{ name = 'emulator'; id = $emu.Id; started = $emu.StartTime.ToUniversalTime().ToString('o') }
    $state.emulator = 'emulator-5580'
    $state.avd = $Avd
    Save-State
    Wait-Ready 'Android boot' { ((& $adb -s emulator-5580 shell getprop sys.boot_completed 2>$null) -join '').Trim() -eq '1' } 240
    if (!((& $adb -s emulator-5580 shell pm list packages com.tailscale.ipn) -match 'package:com.tailscale.ipn')) {
        $apk = Join-Path $runtime 'tailscale-android-universal-1.102.4.apk'
        $apkUrl = 'https://pkgs.tailscale.com/stable/tailscale-android-universal-1.102.4.apk'
        $checksum = (Invoke-RestMethod "$apkUrl.sha256").Trim().Split(' ')[0]
        if (!(Test-Path $apk) -or (Get-FileHash $apk -Algorithm SHA256).Hash -ne $checksum) {
            Write-Host 'Downloading official Tailscale Android APK...'
            Invoke-WebRequest $apkUrl -OutFile "$apk.download" -UseBasicParsing
            if ((Get-FileHash "$apk.download" -Algorithm SHA256).Hash -ne $checksum) { throw 'Tailscale APK checksum did not match.' }
            Move-Item -LiteralPath "$apk.download" -Destination $apk -Force
        }
        & $adb -s emulator-5580 install -r $apk
        if ($LASTEXITCODE) { throw 'Tailscale installation failed.' }
    }
    Write-Host 'Building and installing the GroceryPro Android app...'
    & "$root/scripts/android-debug.ps1" -Serial emulator-5580
    Write-Host 'GroceryPro started. In the emulator app choose Local (10.0.2.2, no Tailscale needed) or Tailscale if it is signed in.'
    Write-Host "Logs: $runtime. Stop the emulator with stop grocerypro.cmd."
} catch {
    Write-Warning $_
    & "$root/stop geo pro.ps1"
    throw
}
