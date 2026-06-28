# 对话语料库

## 用途

1. **蒸馏「你自己」**（nuwa-skill）的原料
2. **对话原文存档**（任务榜 A 级任务明确要求）

开发 agent **日常不读** `corpus/`；只在你说「整理」或做蒸馏时接触 `conversations/`。

## 双轨采集

| 轨道 | 目录 | 谁写 | 内容 |
|------|------|------|------|
| 自动 | `corpus/YYYY-MM-DD.jsonl` | Cursor Hooks | 无损：user 全文 + assistant 全文 + 秒级时间戳 |
| 手动 | `conversations/YYYY-MM-DD.md` | 用户说「整理」时 agent | **你的段落必须全文保真**，禁止用省略号缩写；AI 段落 1～2 句 |

蒸馏时**以 user 发言为主**；assistant 仅作上下文。

## jsonl schema（corpus）

每行一个 JSON 对象：

```json
{
  "ts": "2026-06-27 20:23:23",
  "role": "user",
  "text": "用户原文",
  "session": "2026-06-27",
  "event": "beforeSubmitPrompt"
}
```

| 字段 | 说明 |
|------|------|
| `ts` | 电脑本地时间，精确到秒 |
| `role` | `user` 或 `assistant` |
| `text` | 消息正文 |
| `session` | 会话标识，默认当天日期 |
| `event` | Hook 事件名（可选） |

## md schema（conversations）

文件结构（自上而下）：

1. `# 对话整理 YYYY-MM-DD` + 简短说明
2. **最新一轮** `## 时间 · 你` / `## 时间 · 我(精简)`（写在最上面）
3. 更早的轮次依次向下
4. `---` 分隔各轮

```markdown
# 对话整理 YYYY-MM-DD

> 手动整理。最新在上。

## 2026-06-28 17:30:00 · 你
<最新原文>

## 2026-06-28 17:30:00 · 我(精简)
<1-2 句>

---

## 2026-06-28 16:00:00 · 你
<更早原文>
```

## 隐私与同步

- 含个人表达，**GitHub 仓库必须私有**
- 不要 commit API key、密码

## 喂给 nuwa

1. 语料够量后运行 `scripts/distill_prep.py`（后期）
2. 审 `distill/sample_for_review.md`
3. 用 nuwa-skill：「蒸馏我自己」，附上 `distill/user_utterances.jsonl` 等

## 排查 Hooks

- `.cursor/hooks.json`
- Cursor → 设置 → Hooks
- 输出面板 → Hooks 通道
- 调试：设置环境变量 `PUSHME_HOOK_DEBUG=1` 后查看 `journal/corpus/_hook_debug.log`
