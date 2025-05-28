import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Static asset handling configuration
  publicDir: 'public',
  build: {
    // Ensure favicon and other assets are properly copied
    assetsInlineLimit: 4096, // 4kb - files smaller will be inlined as base64
    rollupOptions: {
      output: {
        // Organize build assets
        assetFileNames: (assetInfo) => {
          // Keep favicon in root directory
          if (assetInfo.name === 'favicon.png') {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    // Enable hot reload for favicon changes
    watch: {
      usePolling: true,
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Your existing exclusion
  }
});