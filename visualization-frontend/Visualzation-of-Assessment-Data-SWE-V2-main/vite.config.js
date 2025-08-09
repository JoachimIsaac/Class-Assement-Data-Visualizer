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
    }
})