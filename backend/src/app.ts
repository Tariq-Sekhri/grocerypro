import express, { Request, Response } from "express";
import 'dotenv/config';
import locationRoutes from "./routes/locationRoutes";
import ScreenRoutes from "./routes/ScreenRoutes";
import ItemRoutes from "./routes/ItemRoutes";
import GroceryRoutes from "./routes/GroceryRoutes";
import ImageRoutes, { pruneUnusedItemImages } from "./routes/ImageRoutes";
import { IMAGE_URL_PREFIX, imageRoot } from "./services/ItemImages";
import prisma from "../prisma/db";
import cors from 'cors'
import requireJson from "./middleware/requireJson";
import { createServer } from "node:http";
import { createLiveUpdates } from "./services/LiveUpdates";
import path from "node:path";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import { clientAddress, errorDetails, log, pruneLogs, requestLogger, watchEventLoop, writeClientLogs } from "./services/Logger";
import { databaseProbe } from "./services/DatabaseHealth";
const app = express();
const server = createServer(app);
const liveUpdates = createLiveUpdates(server);
app.use(requestLogger);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

const v1Router = express.Router();
v1Router.use(liveUpdates.notifyAfterWrite);
v1Router.use(requireJson);
v1Router.use("/locations", locationRoutes);
v1Router.use("/", ScreenRoutes);
v1Router.use("/item", ItemRoutes);
v1Router.use("/", GroceryRoutes);
v1Router.use("/", ImageRoutes);

v1Router.get("/all", async (req: Request, res: Response) => {
  const items = await prisma.item.findMany();
  const store_sections = await prisma.store_section.findMany();
  const item_price_historys = await prisma.item_price_history.findMany();
  const item_in_list = await prisma.item_in_list.findMany();
  const item_status = await prisma.item_status.findMany();
  const locations = await prisma.location.findMany();
  const shopping_lists = await prisma.shopping_list.findMany();
  const users = await prisma.user.findMany();
  res.send({ items, store_sections, item_in_list, item_price_historys, item_status, locations, shopping_lists, users });
});
app.use(cors())
// Devices queue their own logs while offline and upload them here later. This
// sits outside v1Router so an upload does not tell every client to refresh.
app.post("/v1/client-logs", (req, res) => {
  res.json({ stored: writeClientLogs(req.body, clientAddress(req.socket.remoteAddress)) });
});
app.use("/v1", v1Router);
// Unknown API paths end here. Otherwise the dev web middleware proxies /v1 back to
// this same server, which loops until the request times out.
app.use("/v1", (_req, res) => { res.status(404).json({ error: "Not found." }); });
// Image names change whenever the content does, so each file can be cached forever.
app.use(IMAGE_URL_PREFIX, express.static(imageRoot, { immutable: true, maxAge: "1y", index: false, dotfiles: "ignore", fallthrough: false }));

let databaseUp: boolean | null = null;
const noteDatabase = (up: boolean, error?: unknown) => {
  if (up === databaseUp) return;
  databaseUp = up;
  if (up) log("info", "database-up");
  else log("error", "database-down", errorDetails(error));
};
const checkDatabase = databaseProbe(() => prisma.$queryRaw`SELECT 1`);
app.get('/health', async (_req, res) => {
  try {
    await checkDatabase();
    noteDatabase(true);
    res.json({ status: 'ok', app: 'grocerypro' });
  } catch (error) {
    noteDatabase(false, error);
    res.setHeader('Retry-After', '3');
    res.status(503).json({ status: 'unavailable', app: 'grocerypro', error: 'Database unavailable' });
  }
});
// The web build of the Capacitor app is served from the API origin, so the
// browser version works at http://<host>:<port>/ with same-origin API calls.
const frontendRoot = path.resolve(process.env.FRONTEND_ROOT || path.join(process.cwd(), "../frontend"));
const webRoot = path.resolve(process.env.WEB_ROOT || path.join(frontendRoot, "dist"));
let closeWebDev: (() => Promise<void>) | undefined;

async function startWebServer() {
  if (process.env.WEB_DEV === "true") {
    const viteEntry = pathToFileURL(path.join(frontendRoot, "node_modules/vite/dist/node/index.js")).href;
    const loadModule = new Function("specifier", "return import(specifier)") as (specifier: string) => Promise<{ createServer: (options: unknown) => Promise<{ middlewares: express.RequestHandler; close: () => Promise<void> }> }>;
    const { createServer: createViteServer } = await loadModule(viteEntry);
    const vite = await createViteServer({
      root: frontendRoot,
      configFile: path.join(frontendRoot, "vite.config.ts"),
      // Android builds write thousands of files; watching them stalls the API and reloads every browser.
      server: { middlewareMode: true, hmr: { server }, watch: { ignored: ["**/android/**", "**/dist/**"] } },
      appType: "spa",
    });
    closeWebDev = () => vite.close();
    app.use(vite.middlewares);
    console.log(`Serving live web source from ${frontendRoot}; browser updates are automatic`);
  } else if (fs.existsSync(path.join(webRoot, "index.html"))) {
    app.use(express.static(webRoot, {
      maxAge: "1h",
      setHeaders: (res, file) => { if (file.endsWith(".html")) res.setHeader("Cache-Control", "no-cache"); },
    }));
    // Direct links and reloads on client routes must serve the app shell.
    app.get(/.*/, (req, res, next) => {
      if (!req.accepts("html") || path.extname(req.path)) { next(); return; }
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(webRoot, "index.html"));
    });
    console.log(`Serving web app from ${webRoot}`);
  } else {
    console.warn(`Web app build not found at ${webRoot}; run "npm run build" in frontend.`);
  }
}

app.use((error: Error & { status?: number; type?: string }, req: Request, res: Response, _next: express.NextFunction) => {
  if (error.type === 'entity.too.large') { res.status(413).json({ error: req.path.endsWith('/image') ? 'This image is too large.' : 'Request too large.' }); return; }
  // Missing or refused static files (e.g. an image path with "..") read as not found.
  if (error.status === 403 || error.status === 404) { res.status(404).json({ error: 'Not found.' }); return; }
  log("error", "request-failed", { method: req.method, path: req.originalUrl, ip: clientAddress(req.socket.remoteAddress), ...errorDetails(error) });
  // Database outages read differently on devices than code errors do.
  if (/^P10[0-9]{2}$/.test(String((error as { code?: unknown }).code)) || error.name === 'PrismaClientInitializationError') {
    res.status(503).json({ error: 'The server database is not responding.' });
    return;
  }
  res.status(500).json({ error: 'The server could not complete the request.' });
});
const port = Number(process.env.PORT || 3000);
// HOST is a comma-separated list of local addresses allowed to accept clients.
// The default is TAILSCALE_IP from backend/.env (phones and browsers on the
// tailnet) plus loopback (this PC, and Android emulators through 10.0.2.2).
const allowedHosts = (process.env.HOST || [process.env.TAILSCALE_IP, '127.0.0.1'].filter(Boolean).join(','))
  .split(',').map(h => h.trim()).filter(Boolean);
const normalizeAddress = (address: string | undefined) => (address ?? '').replace(/^::ffff:/, '');
server.on('connection', socket => {
  // Listening on all interfaces lets loopback work even if Tailscale is down;
  // connections that arrive on any other interface (e.g. LAN) are dropped.
  if (!allowedHosts.includes(normalizeAddress(socket.localAddress))) socket.destroy();
});
void pruneUnusedItemImages().catch(error => log("warn", "image-prune-failed", errorDetails(error)));
pruneLogs();
setInterval(pruneLogs, 86400000).unref();
watchEventLoop();
process.on('uncaughtException', error => { log("error", "uncaught-exception", errorDetails(error)); process.exit(1); });
process.on('unhandledRejection', error => log("error", "unhandled-rejection", errorDetails(error)));
void startWebServer().then(() => {
  server.listen(port, '0.0.0.0', () => {
    log("info", "server-started", { port, hosts: allowedHosts, pid: process.pid });
  });
}).catch(error => {
  log("error", "server-start-failed", errorDetails(error));
  process.exitCode = 1;
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => liveUpdates.io.close(async () => {
    log("info", "server-stopping", { signal });
    await closeWebDev?.();
    await prisma.$disconnect();
    process.exit(0);
  }));
}
process.on('message', message => {
  if (message === 'shutdown') process.emit('SIGTERM');
});
