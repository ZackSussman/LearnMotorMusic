import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/motormusic-runtime/main/audio/AudioGenerator.js',
          dest: 'audio' // gets copied to `dist/audio/AudioGenerator.js`
        }
      ]
    })
  ]
});