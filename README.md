# GroceryPro

A Capacitor app (React + Vite web app, wrapped for Android) with an Express API and
MySQL database. The same frontend runs in the browser and as the Android app.

## Run on Windows

Double-click **start grocerypro.cmd** in this folder. It installs dependencies if missing,
generates Prisma's client, prepares a project database, builds the web app, starts the
API (which also serves the web app), boots the dedicated **GeoProPlay** Android emulator,
installs Tailscale in it if missing, then builds and installs the GroceryPro Android app.

Double-click **stop grocerypro.cmd** to shut down the development emulator. The PM2
backend and project MySQL stay running. Database and emulator data are retained.

```powershell
& '.\start geopro.ps1'                 # everything
& '.\start geopro.ps1' -NoEmulator     # database + API + web app only
& '.\start geopro.ps1' -ApiPort 3034 -Avd GeoProPlay
& '.\stop geo pro.ps1'
```

The backend is a compiled Node.js service, managed by PM2 as `grocerypro-backend`
through `ecosystem.config.cjs`. Use `pm2 restart grocerypro-backend` after rebuilding
the backend or the web app. The project MySQL instance must be running before the API
can access data; after a computer restart, use the launcher to start it again.
Database credentials are loaded from the ignored `.geopro/database.json`.
GeoPro is an internal identifier only (legacy script paths, runtime folder, and AVD).

Prerequisites: Node.js 22.19 or newer, MySQL Server 8 binaries under
`C:\Program Files\MySQL`, Android Studio's SDK (emulator, platform-tools, command-line
tools, a Google Play x86_64 image for API 31–36) and JDK 21 (`JAVA_HOME`, or Android
Studio's bundled JBR).

Default ports: API and web app **3033**, project MySQL **3307**, emulator **5580**.

## Servers: Tailscale or Local

The API listens on this PC's Tailscale IP (`TAILSCALE_IP` in `backend/.env`) and on **127.0.0.1**.
Connections arriving on any other interface (e.g. the LAN) are dropped. Set `HOST`
to a comma-separated list to change the allowed addresses.

Each client chooses its server on the **Server** screen. The Android app asks on first
launch; afterwards it is reachable from the server button on the profile picker or the
gear on the store list. Each option shows whether it is online.

| Option | Address | Use it for |
| --- | --- | --- |
| Tailscale | `http://<TAILSCALE_IP>:3033` | Phones and emulators signed into the tailnet |
| Local | `http://10.0.2.2:3033` in the app, `http://localhost:3033` in a browser | Emulators without Tailscale (10.0.2.2 is the host PC) |
| Custom | any address | Another machine or port |
| This website | same origin | Browser only; the default for the web app |

The Tailscale preset comes from `VITE_TAILSCALE_HOST` in `frontend/.env` (copy
`frontend/.env.example`); the Play workflow reads the `GROCERYPRO_TAILSCALE_HOST` repository
variable. Build-time defaults can be overridden with `VITE_TAILSCALE_URL`, `VITE_LOCAL_URL`
or `VITE_API_PORT` when running `npm run build` in `frontend`.

## Web

The web app is at **http://&lt;TAILSCALE_IP&gt;:3033** on the tailnet and
**http://localhost:3033** on this PC. The backend serves the Vite development app with
hot reload, so frontend edits update open browser pages automatically. API calls and
the live-update socket stay on the same address. Run `npm run build` in `frontend`
when you need a static production bundle.

## Android

```powershell
cd frontend
npm run android:debug    # build web app, cap sync, assemble debug APK, install + launch
npm run android:open     # open the native project in Android Studio
npm run android:icons    # regenerate icons/splash from frontend/assets
```

`android:debug` installs on the only connected emulator/device (or pass `-Serial`
to `scripts/android-debug.ps1`). The web bundle ships inside the APK; only API calls
go to the chosen server. The Android back button closes open sheets and dialogs,
then goes back through screens, then returns to the profile picker, then exits.

## Android release build

From the repository root, run `.\mobile_build.ps1`. It builds the web app, syncs
Capacitor, builds a signed release App Bundle and verifies its signature. The output
is `app-release.aab` in this folder.

Releases are signed with the key in the ignored `.geopro/signing` folder (created on
the first build if missing). Back up that folder: future releases must use the same key.

Run `.\bump.ps1 p` (patch), `mi` (minor), or `ma` (major) before subsequent builds.
It updates the frontend package/lock versions and the Android `versionCode` and
`versionName` in `frontend/android/app/build.gradle`. The first Capacitor release is
`0.1.0` / versionCode `2` (the Expo build was `0.0.1` / `1`).

## Development checks

```powershell
cd backend
npm run build
npm run test:sync
cd ../frontend
npm run typecheck
npm run lint
npm run build
```

Prisma stays on the latest 6.x patch to preserve this project's MySQL schema/client integration.

Shopping lists load from the project database. The dark mobile UI includes store management,
catalog item creation/editing, adding items with quantities and buyers, editing list entries,
buyer/aisle filters, and list history with a per-buyer price breakdown. New catalog items and
regular prices save together; prices are stored in cents. History totals are estimates based
on recorded prices at the trip date, with unpriced items called out separately.

## Live sync

While the app is open, shopping lists, the store picker, catalogs and history update
automatically through a shared Socket.IO connection. Successful API writes notify
connected clients after the response finishes; clients quietly fetch committed data.
Existing HTTP save endpoints remain in use. The connection catches up on reconnect
and when the app returns to the foreground. WebSocket failures can fall back to
Socket.IO polling, plus a three-second read fallback while disconnected or after
a failed read. A fifteen-second safety read repairs missed notifications.

Edit forms keep their unsaved input instead of applying remote updates while being
edited. Returning to the list fetches the latest shared state. Closed or suspended
apps catch up when reopened; this does not add background push or offline editing.
Out-of-band database imports are picked up by the safety read.

Run `cd backend; npm run test:sync` for the two-client notification regression check.

On launch, choose a profile from the picker. Tap the current profile name in the header
to switch profiles. No passwords are required. Profiles live in the database; none are
built in. On a new database anyone can add the first profile, which becomes the admin.
After that only an admin sees **Edit profiles** on the picker, which adds profiles (family
member, shared, or admin) and deletes them; the server enforces this. An admin can't delete
the profile they are using. Deleting a profile removes its favourites and leaves its list
entries without a buyer. New list entries default to the selected profile as buyer.

## Favourites

Personal catalog and favourites imports live in `backend/data/` and
`backend/scripts/import-*` locally and are not committed.

The Add Items screen shows
the active profile's favourites first, alphabetically within each group, and
stars let that person save or remove favourites independently of the trip buyer.
