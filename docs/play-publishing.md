# Google Play Internal testing automation

Push to `main`, or manually run **Android Internal testing release** on `main`,
to build the Capacitor web assets, sign an Android App Bundle and publish it to
Google Play Internal testing. Server selection remains inside the bundled app.
Production promotion remains a separate Play Console action.

CI uses version code `100000 + GITHUB_RUN_NUMBER` and version name
`<frontend npm version>-ci.<run number>`. Local builds retain configured versions.
Future manual uploads must have a higher version code than the last CI release.

The `build` job saves `grocerypro-play-bundle` for 30 days. If the separate
`publish` job fails, choose **Re-run failed jobs** to retry the saved signed bundle
without rebuilding. Do not rerun a release already accepted by Play.

Signing uses the existing upload key, stored in the repository's
`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, and
`ANDROID_KEY_PASSWORD` Actions secrets. Local keys remain under `.geopro/signing`.

`GCP_SERVICE_ACCOUNT` identifies `grocerypro-play-publisher` in project
`project-33477e16-5086-4c11-933`. `GCP_WORKLOAD_IDENTITY_PROVIDER` points to
`projects/837350808864/locations/global/workloadIdentityPools/android-apps-github/providers/github`.
Google verifies owner ID `34610622`, repository ID `1447990986`, and `main`.
Only that repository can impersonate the app publisher, which has view and
testing-release access only for `ca.sekhrit.grocerypro`.

Publishing uses a short-lived GitHub OIDC token without a stored Google account
key. The build does not connect to the production Grocery Pro server or database.
