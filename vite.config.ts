import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const srcDir = resolve(import.meta.dirname, 'src');

export default defineConfig({
    root: srcDir,
    // without this, unknown urls fall back to index.html instead of returning 404
    appType: 'mpa',
    // css and img stay in /public and are served unchanged from the site root
    publicDir: resolve(import.meta.dirname, 'public'),
    build: {
        outDir: resolve(import.meta.dirname, 'dist'),
        emptyOutDir: true,
        rolldownOptions: {
            // multi-page app: every html page is its own entry point
            input: {
                index: resolve(srcDir, 'index.html'),
                knightProblem: resolve(srcDir, 'KnightProblem.html'),
                description: resolve(srcDir, 'Description.html'),
            },
        },
    },
    test: {
        // tests live outside the app root (src), so vitest runs from the project root
        root: import.meta.dirname,
        include: ['test/**/*.test.{js,ts}'],
    },
});
