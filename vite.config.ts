import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


let https: any = false;
if (process.env.VITE_USE_HTTPS === 'true') {
    https = {
        key:  process.env.VITE_HTTPS_KEY_PATH,
        cert: process.env.VITE_HTTPS_CERT_PATH,
    }
}


// https://vite.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.VITE_SERVER_PORT) ?? 8080,
        https,
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
    plugins: [
        react(),
        tailwindcss(),
    ],
})
