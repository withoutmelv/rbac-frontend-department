
- 安装依赖

```bash
corepack enable
pnpm install
```

- 修改代理地址apps/web-antd/vite.config.mts

```ts
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      nitroMock: false,
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'https://xxxxxxxxxxxxxxxxxxxxxxxxx',
            ws: true,
          },
        },
      },
    },
  };
});
```

- 运行

```bash
# ele版本
pnpm dev:ele
```

- 打包

```bash
# ele版本
pnpm build:ele
```

docker 部署
```
docker build -t rbac-frontend . -f scripts/deploy/Dockerfile

docker build -t rbac-backend:latest .

docker-compose up -d --build

docker save -o rbac-frontend.tar rbac-frontend:latest
docker save -o rbac-backend.tar rbac-backend:latest
docker save -o mysql_rbac.tar mysql:8.0.29

docker load -i rbac-frontend.tar
docker load -i rbac-backend.tar
docker load -i mysql_rbac.tar


ngnix配置代理的地址要修改

location /api/knowledge_base/ {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
      # 根据后端需求决定是否保留斜杠
      proxy_pass http://192.168.32.153:7861/knowledge_base/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

```
