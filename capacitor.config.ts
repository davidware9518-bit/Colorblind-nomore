import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.obvistyle.app',
  appName: 'ObviStyle',
  webDir: 'dist/capacitor',
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;