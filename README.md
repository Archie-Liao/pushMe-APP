# pushMe-APP

**推手 pushME** — 跨端 AI 项目经理：拆解任务、监督执行、质疑决策、评估复盘。

## 仓库里有什么

| 路径 | 说明 |
|------|------|
| [`AGENTS.md`](AGENTS.md) | **Cursor 自动加载**：新 AI 必读规则 |
| [`.context/`](.context/04-progress.md) | 项目记忆（目的 / 架构 / 决策 / 踩坑 / **进度**） |
| [`journal/`](journal/README.md) | 对话语料（Hook 自动 + 手动「整理」） |
| [`.cursor/skills/`](.cursor/skills/README.md) | 项目内技能（见下） |
| [`.cursor/hooks/`](.cursor/hooks.json) | 自动采集对话与时间戳 |
| [`GITHUB_SETUP.md`](GITHUB_SETUP.md) | Git 与 GitHub 操作指南 |
| [`任务榜.xlsx`](任务榜.xlsx) | 原始任务数据（S/A/B/C） |

### `.cursor/skills/` 里的技能

| Skill | 作用 |
|-------|------|
| `pushme-skill/` | **开发参考** — APP 的产品逻辑、PM 人格、评估框架（不用于日常召唤） |
| `web-design-engineer/` | **网站开发** — UI 设计与样式配方 |

## 快速开始

### 开发者 / 新 AI 接手

1. 读 [`AGENTS.md`](AGENTS.md)
2. 读 [`.context/04-progress.md`](.context/04-progress.md)
3. 开发 APP 时读 [`.cursor/skills/pushme-skill/SKILL.md`](.cursor/skills/pushme-skill/SKILL.md) 作需求与人格参考

### 克隆本仓库

```powershell
git clone https://github.com/Archie-Liao/pushMe-APP.git
cd pushMe-APP
```

需要 Python（Hooks）。用 Cursor 打开项目即可；skills 在 `.cursor/skills/` 自动随项目加载。

### 日常改代码后上传

```powershell
git add .
git commit -m "简述改了什么"
git push
```

## 产品路线图（摘要）

| 阶段 | 内容 | 状态 |
|------|------|------|
| Skill 原型 | `pushme-skill/` 作 APP 开发参考 | 已归档于 `.cursor/skills/` |
| 上下文体系 | AGENTS / .context / journal / Hooks | 已完成 |
| APP | PWA + Supabase + DeepSeek + Web Push | 待开工 |

技术细节见 [`.context/01-architecture.md`](.context/01-architecture.md)。

## 链接

- 仓库：<https://github.com/Archie-Liao/pushMe-APP>
