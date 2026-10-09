import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy/cinemahub': {
        target: 'https://bot.cinemahub.biz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/cinemahub/, '/status')
      },
      '/api/proxy/streamdrop': {
        target: 'https://streamdrop.site',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/streamdrop/, '/api/status')
      },
      '/api/proxy/sharebox': {
        target: 'https://sharebox.buzz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/sharebox/, '/api/status')
      },
      '/api/report-proxy': {
        target: 'https://report-bot-leze.onrender.com',
        changeOrigin: true,
        // Rewrite by extracting the `endpoint` query parameter, so `/api/report-proxy?endpoint=/api/services` becomes `/api/services`
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
             // Extract endpoint from query string
             const url = new URL(req.url, 'http://localhost');
             const endpoint = url.searchParams.get('endpoint');
             if (endpoint) {
                 proxyReq.path = endpoint;
             }
             // Inject API Key
             proxyReq.setHeader('X-API-Key', 'univora_api_2026_xyz123abcdefg');
          });
        }
      }
    }
  }
})
