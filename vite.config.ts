import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  define: {
    'import.meta.env.VITE_APP_MODE': JSON.stringify(process.env.VITE_APP_MODE || 'designer')
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: "@mdx-js/react"
    }),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5292',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
