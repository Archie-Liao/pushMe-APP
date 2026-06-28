---
type: gotchas
title: 踩坑与解法
timestamp: 2026-06-27T00:00:00+08:00
---

# 踩坑与解法

## 环境与工具

### GBK 编码导致 Python 输出崩溃

- **现象**：`read_tasks.py` 在 Windows 控制台打印中文报错
- **解法**：脚本顶部强制 stdout/stderr UTF-8（见 `.cursor/skills/pushme-skill/scripts/read_tasks.py`）

### 中文路径在 PowerShell 管道中丢失

- **现象**：`python script.py "任务榜.xlsx"` 路径变成 `???.xlsx`
- **解法**：Python 内用 `glob.glob("*.xlsx")` 或 `Get-ChildItem -LiteralPath`，避免经管道传中文路径

### openpyxl 未安装

- **现象**：`ModuleNotFoundError: openpyxl`
- **解法**：`pip install openpyxl`；或临时用 zipfile+regex 解析 xlsx（stdlib）

### Python 版本

- 本机：Python 3.14.5（`C:\Python314`）；Hooks 依赖 `python` 在 PATH

## AI / 工作流

### Skill 无跨会话记忆

- **现象**：每次激活 Skill 都是全新，不能假设记得上次状态
- **解法**：磁盘文件是唯一可信状态（pushME `Step 0` 检查 `~/.pushme/`）

### AI 不能后台定时整理

- **现象**：「每半小时自动整理」不可行
- **解法**：Hook 事件触发写 jsonl + 用户说「整理」写 curated md

### 时间戳

- AI 不「记住」时间；脚本/agent 用 `Get-Date` / `datetime.now()` **当场读取**

## Cursor

### Hooks 字段名可能因版本而异

- **解法**：首次实现先打印 stdin JSON，确认字段后再写盘（见 `.cursor/hooks/_journal_io.py` 多 key 回退）

### Hooks 排查位置

- Cursor 设置 → **Hooks**；输出面板 → **Hooks** 通道

## 计划文件重复

- **现象**：`pushme_跨端_app_方案` 曾重复生成两份相同 plan
- **解法**：删重复副本，保留 `19d0d05a` 那份
