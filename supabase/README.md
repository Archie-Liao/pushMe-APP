# Supabase 设置（阶段 0）

## 1. 执行数据库 schema

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard) → 你的项目
2. 左侧 **SQL Editor** → **New query**
3. 复制 `migrations/20260628191400_init_schema.sql` **全部内容**，粘贴执行
4. 成功后在 **Table Editor** 应看到：`profiles`、`tasks`、`plans` 等表

## 2. 开启邮箱登录（Magic Link）

1. **Authentication** → **Providers** → **Email**
2. 确认 **Enable Email provider** 已开启
3. **Authentication** → **URL Configuration**：
   - **Site URL**：开发时填 `http://localhost:5173`
   - **Redirect URLs** 添加：`http://localhost:5173/**`（本地）及日后 Vercel 域名

## 3. 本地开发

```powershell
cd d:\WorkProject\pushMe-APP\web
npm run dev
```

浏览器打开 http://localhost:5173 ，用邮箱收 Magic Link 登录。

## 4. Vercel 部署

1. [vercel.com](https://vercel.com) 导入 GitHub 仓库
2. **Root Directory** 设为 `web`
3. 环境变量（与 `.env.local` 同名）：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. 把 Vercel 域名加到 Supabase Redirect URLs
