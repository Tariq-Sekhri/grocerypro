import { writeFile } from 'node:fs/promises';

// The source artwork already includes adaptive-icon safe-area padding.
// Capacitor Assets adds another 16.7% inset, making the basket too small.
const xml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`;

for (const name of ['ic_launcher', 'ic_launcher_round']) {
  await writeFile(new URL(`../frontend/android/app/src/main/res/mipmap-anydpi-v26/${name}.xml`, import.meta.url), xml);
}
