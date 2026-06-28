---
type: architecture
title: 技术架构
timestamp: 2026-06-27T00:00:00+08:00
---

# 技术架构

## 本仓库当前结构

```
pushMe-APP/
├── AGENTS.md
├── .context/
├── journal/
├── .cursor/
│   ├── hooks/             # 对话语料自动采集
│   └── skills/            # 项目内技能
│       ├── pushme-skill/      # APP 开发参考（非日常召唤）
│       └── web-design-engineer/ # 网站设计
├── scripts/
└── 任务榜.xlsx
```

## pushME APP 方案（未实施）

| 层 | 选型 |
|----|------|
| 客户端 | React + Vite + TypeScript + Tailwind + shadcn/ui + vite-plugin-pwa |
| 双主题 | CSS 变量切换修仙 / 现代 |
| 后端 | Supabase 免费档（Postgres + Auth + Realtime + Edge Functions + pg_cron） |
| AI | DeepSeek API（仅 Edge Function 调用，key 不进浏览器） |
| 推送 | Web Push + Service Worker |
| 托管 | Vercel 或 Cloudflare Pages |
| 上架 | 后期 Capacitor 套壳 iOS/Android |

## 上下文与语料体系

- **`.context/`**：开发 agent 读的项目事实
- **`journal/corpus/`**：Hook 自动 jsonl 归档
- **`journal/conversations/`**：用户说「整理」后的 curated md
- **同步**：git + GitHub 私有库

## Skill 文件体系（pushme-skill 运行时）

默认数据目录 `~/.pushme/`（可 redirect.txt 自定义），含 `current.md`、`overview.md`、`backlog.md`、`config.md`、`plans/`、`archive/`、`check-ins/`、`patterns.md`。

APP 上线后 Postgres 表设计与上述文件概念对齐（见 APP plan）。

## OKF 对齐（轻量）

`.context/*.md` 使用 YAML frontmatter（`type`, `title`, `timestamp`），与 [Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/) 思路一致，便于日后与个人网站 wiki 共用格式。
