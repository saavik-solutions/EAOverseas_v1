import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
    },
    plugins: [
        react(),
        /* Sitemap({
          hostname: 'https://eduwoy.com',
          generateRobotsTxt: true,
          dynamicRoutes: [
            '/about',
            '/colleges',
            '/countries',
            '/blogs',
            '/contact-us',
            '/courses',
          ]
        }) */
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@workspace/common": path.resolve(__dirname, "../../packages/common/src"),
            "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react-dom'))
                            return 'vendor-react-dom';
                        if (id.includes('framer-motion'))
                            return 'vendor-framer';
                        if (id.includes('lucide-react'))
                            return 'vendor-icons';
                        if (id.includes('socket.io-client'))
                            return 'vendor-socket';
                        if (id.includes('bytez.js'))
                            return 'vendor-bytez';
                        if (id.includes('lodash'))
                            return 'vendor-lodash';
                        if (id.includes('react'))
                            return 'vendor-react';
                        return 'vendor';
                    }
                }
            }
        }
    }
});
