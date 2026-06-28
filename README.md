# pushMe-APP

**推手 pushME** — 跨端 AI 项目经理：拆解任务、监督执行、质疑决策、评估复盘。  
不是软蛋式助手，是推你执行的那个人。

## Cursor Skills（不在本仓库内）

以下 skill 安装在用户级目录，Cursor 全局可用：

| Skill | 路径 |
|-------|------|
| pushme-skill | `C:\Users\PC\.cursor\skills\pushme-skill\` |
| web-design-engineer | `C:\Users\PC\.cursor\skills\web-design-engineer\` |

通用路径：`%USERPROFILE%\.cursor\skills\<skill-name>\`

激活：对话中说 **「推手」** / **「pushme」**（pushME）；网站设计时用 web-design-engineer。

## 仓库里有什么

| 路径 | 说明 |
|------|------|
| [`AGENTS.md`](AGENTS.md) | **Cursor 自动加载**：新 AI 必读规则 |
| [`.context/`](.context/04-progress.md) | 项目记忆（目的 / 架构 / 决策 / 踩坑 / **进度**） |
| [`journal/`](journal/README.md) | 对话语料（Hook 自动 + 手动「整理」） |
| [`.cursor/hooks/`](.cursor/hooks.json) | 自动采集对话与时间戳 |
| [`GITHUB_SETUP.md`](GITHUB_SETUP.md) | Git 与 GitHub 操作指南 |
| [`任务榜.xlsx`](任务榜.xlsx) | 原始任务数据（S/A/B/C） |

## 快速开始

### 开发者 / 新 AI 接手

1. 读 [`AGENTS.md`](AGENTS.md)
2. 读 [`.context/04-progress.md`](.context/04-progress.md) — **当前进度与下一步**
3. 按需读 `.context/` 其他文件

### 使用 pushME Skill

Skill 已安装在 `%USERPROFILE%\.cursor\skills\pushme-skill\`，对话中说 **「推手」** 或 **「pushme」** 即可。

### 克隆本仓库

```powershell
git clone https://github.com/Archie-Liao/pushMe-APP.git
cd pushMe-APP
```

需要 Python（Hooks 脚本）。用 Cursor 打开项目即可。

### 日常改代码后上传

```powershell
git add .
git commit -m "简述改了什么"
git push
```

## 产品路线图（摘要）

| 阶段 | 内容 | 状态 |
|------|------|------|
| Skill MVP | 本地 md + Excel 导入 + PM 人格 | 已有 |
| 上下文体系 | AGENTS / .context / journal / Hooks | 已完成 |
| APP | PWA + Supabase + DeepSeek + Web Push | 待开工 |
| 远期 | Capacitor 上架；nuwa 蒸馏「你」接入网站/APP | 规划中 |

技术细节见 [`.context/01-architecture.md`](.context/01-architecture.md)。

## 语料与蒸馏

- Hook 自动写入 `journal/corpus/*.jsonl`
- 说 **「整理」** → agent 写入 `journal/conversations/*.md`（你的原话为主）
- 语料够量后用 [nuwa-skill](https://github.com/alchaincyf/nuwa-skill) 蒸馏个人 Skill

## 链接

- 仓库：<https://github.com/Archie-Liao/pushMe-APP>
- 维护者：Archie（Archie-Liao）

## License

本仓库文档与脚本随项目维护。`pushme-skill`、`web-design-engineer` 安装在 `.cursor/skills/`，遵循各自许可。
