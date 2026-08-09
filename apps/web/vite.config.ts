import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['brand/chitchatlogo.svg'],
      manifest: {
        name: 'ChitChat',
        short_name: 'ChitChat',
        description: 'Private real-time messaging for friends and family',
        theme_color: '#063ac1',
        background_color: '#f8f9fd',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/brand/chitchatlogo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
