# pushME 项目 — Agent 行为契约

> Cursor 自动加载本文件。新对话、新电脑上的 agent **必须先遵守**以下规则。

## 第一步：读什么（渐进式披露）

| 顺序 | 文件 | 说明 |
|------|------|------|
| 1 | **本文件** | 行为规则 |
| 2 | [.context/04-progress.md](.context/04-progress.md) | **当前进度 + 下一步**（必读） |
| 3 | 按需 | [00-overview](.context/00-overview.md) / [01-architecture](.context/01-architecture.md) / [03-gotchas](.context/03-gotchas.md) / [02-decisions](.context/02-decisions.md) |

**不要读** `journal/corpus/*.jsonl`（原始语料归档，仅供蒸馏；体积大且不是你的项目说明书）。

开发 APP 时**按需读** [`.cursor/skills/pushme-skill/SKILL.md`](.cursor/skills/pushme-skill/SKILL.md) 及 `references/`（产品与人格**参考**，不是日常召唤的 Skill）。

## 第二步：更新什么（会话结束前检查）

| 文件 | 何时更新 |
|------|----------|
| `04-progress.md` | 本次有实质进展，或用户说「更新进度」 |
| `02-decisions.md` | 做了影响方案的重要决策 |
| `03-gotchas.md` | 踩坑并解决后 |
| `01-architecture.md` | 技术栈或目录结构变更 |
| `journal/conversations/YYYY-MM-DD.md` | 用户说「**整理**」时（见下） |

会话结束前，**主动提议**是否更新 `04-progress.md`。

## 时间戳规则（写文件时必须遵守）

凡在文件中**记录日期或时间**（frontmatter `timestamp`、进度更新说明、`journal/conversations/` 标题、决策记录日期等）：

1. **必须先执行终端命令**读取当前电脑时间，**禁止凭记忆或估算**。
2. **精确到秒**。
3. **以电脑北京时间为准**（本机应已设为 UTC+8；若命令输出带 `+08:00` 可一并写入 frontmatter）。
4. **推荐命令**（PowerShell，在项目目录执行）：

```powershell
Get-Date -Format "yyyy-MM-dd HH:mm:ss"
```

frontmatter 示例：`timestamp: 2026-06-28 16:45:23` 或 `timestamp: 2026-06-28T16:45:23+08:00`

对话整理标题示例：`## 2026-06-28 16:45:23 · 你`

## 「整理」是什么意思

用户说「整理」时：

1. 用终端 `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` 取**电脑北京时间**（精确到秒，见上节）
2. 将本轮对话写入 `journal/conversations/YYYY-MM-DD.md`
3. 格式：用户原文**完整保真**（禁止用 `……` 或「等」省略未写出的内容）；agent 回复压到 **1～2 句**要点
4. 不修改 `corpus/*.jsonl`（Hook 已自动归档）

## 语料与 Hooks

- `journal/corpus/` 由 Cursor Hooks **自动写入**（用户发消息 / AI 回复时）
- 配置见 [.cursor/hooks.json](.cursor/hooks.json)
- 排查：Cursor 设置 → Hooks；输出面板 → Hooks 通道

## 项目速览

- **产品**：推手 pushME — AI 项目经理（拆解、监督、质疑、评估）
- **参考**：`.cursor/skills/pushme-skill/` — APP 开发时的产品/人格参考（用户不再日常召唤）
- **仓库**：APP 代码与上下文体系；APP 尚未 scaffold
- **用户**：AI 应用层初学者，不懂编程，规划强、执行弱
- **详细方案**：见 Cursor plan 或 `.context/` 各文件

## 禁止

- 编造进度或假装读过未打开的文件
- 把 `journal/corpus` 当上下文塞进每次对话
- 未经用户确认推送 force 到 main
