import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { content } from './src/content/index.ts'
import { renderSiteHtml } from './src/content/html.ts'

export const siteMetadataPlugin = {
  name: 'site-metadata',
  transformIndexHtml: {
    order: 'pre',
    handler: (html: string) => renderSiteHtml(html, content.metadata),
  },
} satisfies Plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [siteMetadataPlugin, tailwindcss(), react()],
  server: {
    watch: {
      ignored: ['**/.tools/**', '**/coverage/**', '**/docs/**'],
    },
  },
  optimizeDeps: {
    // Keep CommonJS interop explicit while loading UI and icon ESM subpaths directly.
    noDiscovery: true,
    include: [
      'react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime',
      'use-sync-external-store/shim', 'use-sync-external-store/shim/with-selector',
      'use-sync-external-store/shim/index.js', 'use-sync-external-store/shim/with-selector.js',
    ],
    exclude: ['@hugeicons/core-free-icons'],
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 30 },
            { name: 'motion', test: /[\\/]node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/, priority: 20 },
            { name: 'aria', test: /[\\/]node_modules[\\/](@react-aria|@react-stately|@react-types|react-aria-components)[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
