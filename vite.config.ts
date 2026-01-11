import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Brotli compression for better compression ratio
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024, // Only compress files > 1KB
        }),
        // Gzip fallback
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
        }),
        // Bundle analyzer (only in build mode)
        process.env.ANALYZE && visualizer({
            filename: './dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    base: './',
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                // Optimized code splitting
                manualChunks: {
                    // Vendor chunks
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['lucide-react'],
                    'map-vendor': ['leaflet'],
                    'smooth-scroll': ['@studio-freight/lenis'],
                },
                // Better file naming for caching
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
                    if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
                        return `assets/images/[name]-[hash].${ext}`
                    } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                        return `assets/fonts/[name]-[hash].${ext}`
                    }
                    return `assets/[ext]/[name]-[hash].${ext}`
                },
            },
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 500,
        cssCodeSplit: true,
        sourcemap: false,
        // Target modern browsers for smaller bundles
        target: 'es2015',
        // Optimize dependencies
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    // Optimize dev server
    server: {
        hmr: {
            overlay: true,
        },
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
        exclude: [],
    },
})
