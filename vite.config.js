import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({
    command
}) => ({
    plugins: [react()],
    // Only use the base path for production builds (GitHub Pages)
    // In dev mode, use root path so you don't get the redirect message
    base: command === 'build' ? '/admin-e-portor/' : '/',
}))