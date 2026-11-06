import type { CapacitorConfig } from "@capacitor/cli";

// The web bundle ships inside the APK. Which Grocery Pro server it talks to
// (Tailscale, local/emulator or a custom URL) is chosen in the app itself.
const config: CapacitorConfig = {
  appId: "ca.sekhrit.grocerypro",
  appName: "Grocery Pro",
  webDir: "dist",
  backgroundColor: "#101817",
  // The API is plain HTTP on the tailnet / loopback. Serving the bundled app
  // from http://localhost (still a secure context) avoids mixed-content
  // blocking of API calls and the live-update WebSocket.
  server: { androidScheme: "http" },
  android: { allowMixedContent: true },
  plugins: {
    SystemBars: { style: "DARK", insetsHandling: "css", initialViewportFitValueHint: "cover" },
  },
};

export default config;
