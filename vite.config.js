import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // DON'T CHANGE, IF YOU DO YOU NEED TO ALSO UPDATE jsconfig.json in root
            // these map file import aliases
            '@': path.resolve(__dirname, '.'),
            '@src': path.resolve(__dirname, './src/'),
            '@components': path.resolve(__dirname, './src/components/'),
        },

    },
    // This will forward fetch requests to /api/* to connect to the backend server
    // running or port 4000
    server: {
        proxy: {
            '/api': 'http://localhost:4000',
            '/ws': {
                target: 'ws://localhost:4000',
                ws: true,
            },
        },
    },
});
