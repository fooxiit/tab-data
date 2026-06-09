/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
    },
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/lib/main.ts'),
            name: 'tabData',
            fileName: 'tab-data',
        },
        rolldownOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
