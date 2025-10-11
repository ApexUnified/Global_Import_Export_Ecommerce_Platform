import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',

        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    pdf: ["html2pdf.js"],
                    react: ["react", "react-dom"],
                    inertia: ["@inertiajs/react", "@inertiajs/core"],
                    vendor: ["axios", "lodash"],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            'asset': path.resolve(__dirname, 'public'),
        }
    }
});

