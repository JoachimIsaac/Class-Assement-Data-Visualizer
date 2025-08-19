import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
    
export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      hostname:"localhost"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  build: {
    // Ensure CSS is extracted to prevent FOUC
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Ensure CSS is loaded before JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})