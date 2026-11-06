// Runs the web app against a fake backend for screenshots: http://127.0.0.1:5180/
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const frontend = fileURLToPath(new URL("../frontend", import.meta.url));
const child = spawn("npx vite --host 127.0.0.1 --port 5180 --strictPort", {
  cwd: frontend, stdio: "inherit", shell: true, env: { ...process.env, GROCERYPRO_DEMO: "1" },
});
child.on("exit", code => process.exit(code ?? 0));
