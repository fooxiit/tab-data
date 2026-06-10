/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({ tsconfigPath: './tsconfig.lib.json' })],
    test: {
        environment: 'jsdom',
        globals: true,
    },
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'lib/main.ts'),
            name: 'tabData',
            fileName: 'tab-data',
        },
        rolldownOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'react/jsx-runtime',
                },
            },
        },
    },
});
