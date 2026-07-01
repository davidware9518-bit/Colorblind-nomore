# ObviStyle Native App Build Instructions

Your Capacitor-based native projects for iOS and Android are configured.
The app uses a separate SPA build for Capacitor (`build:cap`) since the main
site uses TanStack Start (SSR) which doesn't produce a static `index.html`.

## Quick Start (Local Machine)

```bash
# 1. Install dependencies
npm install

# 2. Build the static SPA for Capacitor
npm run build:cap

# 3. Sync web assets into native projects
npx cap sync

# 4. Open in Android Studio or Xcode
npx cap open android
# or
npx cap open ios
```

The `build:cap` command outputs to `dist/capacitor/`, which contains:
- `index.html` — App entry point
- `assets/index-*.js` — JavaScript bundle
- `assets/app-*.css` — Stylesheet

`capacitor.config.ts` is set to `webDir: "dist/capacitor"` and does NOT use
a live server URL — it loads the app from local files.

---

## Android Build Process

1. **Open the project:**
   ```
   npx cap open android
   ```

2. **Generate Signed Bundle / APK:**
   - Go to **Build > Generate Signed Bundle / APK...**
   - Select **Android App Bundle** (preferred for Play Store) or **APK**
   - Create a new Key Store if you don't have one (keep this file safe!)
   - Follow the wizard

3. **Submit to Play Store:**
   - Upload the `.aab` file to [Google Play Console](https://play.google.com/console/)

---

## iOS Build Process (Requires a Mac)

1. **Open the project:**
   ```
   npx cap open ios
   ```

2. **Configure Signing:**
   - In Xcode, select the **App** project → **Signing & Capabilities** tab
   - Select your Development Team

3. **Build and Archive:**
   - Select **Any iOS Device (arm64)** as the target
   - **Product > Archive**

4. **Submit to App Store:**
   - In the Organizer, click **Distribute App**
   - Follow prompts to upload to [App Store Connect](https://appstoreconnect.apple.com/)

---

## After Making Changes to the App

Whenever you update the web code:

```bash
npm run build:cap      # Rebuild the static SPA
npx cap sync           # Copy new web code into native projects
```

Then rebuild in Android Studio or Xcode.

---

## Troubleshooting

- **`npx cap sync` fails with "must contain an index.html"**
  → Run `npm run build:cap` first. The `dist/capacitor/` directory must exist
    with an `index.html` before `npx cap sync` will work.

- **App shows blank screen on device**
  → Open DevTools on the device (Chrome DevTools → Remote devices for Android,
    Safari Web Inspector for iOS) and check for console errors.
  → Make sure `npm run build:cap` completed without errors.