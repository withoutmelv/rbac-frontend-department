import { defineConfig } from '@vben/vite-config';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      // assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg'],
      server: {
        proxy: {
          '/api/knowledge_base': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''), 
            // mock代理目标地址
            // mock代理目标地址
            target: 'http://192.168.32.153:7861/',
            ws: true,
          },
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://127.0.0.1:3000/',
            ws: true,
          },
        },
      },
    },
  };
});
