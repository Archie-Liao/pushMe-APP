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

对话整理标题示例：`## 2026-06-28 16:45:23 · Archie` / `## 2026-06-28 16:45:24 · AI`

## 「整理」与 Hook 自动采集（两件事，别混）

| 机制 | 触发 | 写什么 | 谁发起 |
|------|------|--------|--------|
| **Hook 自动** | 你发消息 / AI 回复 / 会话结束 | `journal/corpus/*.jsonl` 无损归档 | Cursor 系统 |
| **手动「整理」** | 你说 **「整理」** | `journal/conversations/*.md` 精修版 | 你 |

整理**不会**自动发生；Hook **不会**写 conversations md。

## 「整理」是什么意思

用户说「整理」时：

1. 用终端 `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` 取**电脑北京时间**（精确到秒，见上节）
2. 将本轮对话写入 `journal/conversations/YYYY-MM-DD.md`
3. 格式：**Archie** 段落原文完整保真（禁止 `……` 缩写）；**AI** 段落压到 1～2 句
4. **排序**：**最新一轮对话写在文件最上面**（`# 对话整理` 标题和说明段之下），更早轮次往下排——匹配用户从上到下阅读习惯
5. 不修改 `corpus/*.jsonl`（Hook 已自动归档）

## 语料与 Hooks

- `journal/corpus/` 由 Cursor Hooks **自动写入**（用户发消息 / AI 回复时）
- 配置见 [.cursor/hooks.json](.cursor/hooks.json)
- 排查：Cursor 设置 → Hooks；输出面板 → Hooks 通道

## 产品经理定位（pushME 该怎么想）

pushME 是**主动的项目经理/管家**，不是被动记事本：

- **规划与执行是一轮闭环**：先弄清为什么做、终点是什么、怎么验收 → 拆成可执行步骤 → 监督执行 → 评估效果 → 下一轮规划调整
- **反对的是**：用「重新规划」逃避执行、同一任务反复打磨计划却不动手、规划与优先级脱离你的真实时间
- **真推送**见 `.context/01-architecture.md`（Web Push，非微信/钉钉默认方案）

## 项目速览

- **产品**：推手 pushME — AI 项目经理（拆解、监督、质疑、评估）
- **参考**：`.cursor/skills/pushme-skill/` — APP 开发时的产品/人格参考（用户不再日常召唤）
- **仓库**：APP 代码与上下文体系；APP 尚未 scaffold
- **用户**：AI 应用层初学者，不懂编程，规划强、执行弱
- **详细方案**：见 Cursor plan 或 `.context/` 各文件

## Git 与 GitHub

**默认**：改文件 ≠ commit ≠ push。未经用户明确要求，**禁止** `git commit`、**禁止** `git push`。

| 用户说什么 | Agent 做什么 |
|------------|--------------|
| 整理、更新进度、开发任务 | 只改工作区文件 |
| 只提 commit / 提交 | 仅 `git commit`，不 push |
| 明确 push / 上传 GitHub / commit 并 push | commit 后 push（用户未禁止时） |
| 只 commit 不要 push | 仅 commit |

用户可复制粘贴的提示词速查表见 **[GITHUB_SETUP.md →「让 Cursor AI 帮你提交/上传」](GITHUB_SETUP.md)**。

## 禁止

- 编造进度或假装读过未打开的文件
- 把 `journal/corpus` 当上下文塞进每次对话
- 未经用户明确要求执行 `git commit` 或 `git push`（见上节）
- 未经用户确认推送 force 到 main
- 把**真实** API key / secret 写入会被 `git commit` 的文件（见下节）

## 密钥与 `.env`（必读）

| 文件 | 内容 | 是否 push GitHub |
|------|------|------------------|
| **`.env.local`** | 你的**真** URL、key | **否**（`.gitignore` 已忽略） |
| **`.env.example`** | 占位符模板，说明需要哪些变量 | **是**（故意公开，不含真密钥） |

### 可以给 AI 什么

- **可以**在对话里提供 Supabase URL、**publishable / anon** key，便于配置开发环境。
- **不要**在对话里提供 **service_role / secret** key（仅 Supabase 后台与 Edge Function 使用）。

### Agent 必须遵守

1. 真实密钥只写入 **`.env.local`**（或 Supabase Dashboard 密钥栏），**禁止**写入 `README`、`.ts`、`.md`、`.env.example` 再 commit。
2. 新增环境变量时：更新 **`.env.example`（假值）** + 告知用户在 **`.env.local`（真值）** 填写。
3. commit 前若 `git status` 出现 `.env.local` → **不得 commit**；检查 `.gitignore`。

### 换电脑

```powershell
git clone ...
copy .env.example .env.local
# 编辑 .env.local，填入 Supabase 控制台的真值
```

`.env.example` = 说明书；`.env.local` = 只在你电脑抽屉里的真配置。
