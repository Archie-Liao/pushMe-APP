# Cursor Hooks 语料采集

## 触发条件（自动，不用你说「整理」）

| 事件 | 何时 | 写入 |
|------|------|------|
| `beforeSubmitPrompt` | 你点发送 | `corpus/*.jsonl` role=user |
| `afterAgentResponse` | AI 回复完成 | role=assistant |
| `sessionEnd` | 会话结束 | role=system 分隔 |

**「整理」** 是另一件事：你说出口 → agent 写 `journal/conversations/*.md`。

## 排查「没有 jsonl」

1. **Reload Window** 或重启 Cursor（让 `hooks.json` 生效）
2. Cursor → 设置 → **Hooks** → 确认已加载
3. 发一条测试消息后看：
   - `journal/corpus/YYYY-MM-DD.jsonl` 是否新增行
   - `journal/corpus/_hook_trace.log` 是否有新行（`text_len` > 0 才算抓到正文）
4. 输出面板 → **Hooks** 通道看报错
5. 若 `text_len` 恒为 0：看 `_hook_debug.log` 里 Cursor 传来的 JSON 字段名，再改 `capture_*.py` 的 `USER_KEYS` / `ASSISTANT_KEYS`

## Windows 注意

Hook 子进程可能找不到 `python`。本项目用 `run_capture_*.cmd` 调用 `C:\Python314\python.exe`。若你 Python 路径不同，改 cmd 文件里的路径。
