import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Noel Storybook',
        short_name: 'Noel',
        description: 'An online storybook about Noel and Lia.',
        theme_color: '#fdf6e3',
        icons: [
          {
            src: 'assets/images/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/images/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: './', // Use relative base for GitHub Pages compatibility
});
