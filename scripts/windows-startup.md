# Windows startup

On this PC, the `GroceryPro Boot` scheduled task runs `backend/scripts/run-boot.cjs` as SYSTEM at Windows boot. GroceryPro and its database are excluded from the user's PM2 restore list to avoid competing owners. The task supervises the MySQL wrapper and API wrapper, while an exclusive named pipe prevents duplicate supervisors across sessions.

The API wrapper waits for an authenticated `SELECT 1` against the existing GroceryPro database before loading the server. It does not initialize data, apply migrations, or build at boot. `/health` queries the database and returns HTTP 503 with `Retry-After` when it is unavailable. Pool and connection waits are bounded. Sustained failed health checks restart the API; the database is preserved.

MySQL binds loopback port 3307. The API allows loopback and the configured Tailscale address on port 3033. Existing live-source web behavior remains enabled. Logs and readiness timestamps are in `.geopro/boot-*`. The normal development launcher reuses the installed boot service; the development stop command leaves managed services running.

Machine setup, delayed desktop-app tasks, verification results and rollback configuration are in `C:\Users\hulks\Tools\StartupOptimization`. The latest startup monitor captures are in `%LOCALAPPDATA%\StartupTiming\Summaries`.
