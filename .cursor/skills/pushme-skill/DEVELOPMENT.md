# 推手 pushME — 开发情况总览

> 本文档供后续开发者（人或 AI）快速理解项目全貌。最后更新：2026-06-12。

---

## 更新日志

### 2026-06-12（第二次迭代）

进行了首次测试 + 多轮修改。测试结果：3 个场景 17/17 断言通过。测试产物在 `C:\Users\Administrator\pushme-test\workspace\iteration-1\`。

**本次解决的问题**：

| # | 问题 | 改动 |
|---|------|------|
| 1 | Excel 导入跳过用户审核 | SKILL.md 首次导入模式新增第 4 步「任务确认环节」——数据分三类（建议执行/灵感参考/疑似过时），用户审核后才写盘 |
| 2 | 数据目录路径不明确 | SKILL.md Step 0 明确默认 `~/.pushme/`（`C:\Users\Administrator\.pushme\`），首次导入先询问用户是否接受，支持自定义路径（redirect.txt 机制） |
| 3 | 每次交互后不知道改了哪些文件 | SKILL.md 新增「输出约定」——每次回复末尾列出修改的文件清单，overview.md 作为唯一总览入口 |
| 4 | `read_tasks.py` GBK 编码崩溃 | scripts/read_tasks.py 顶部加了 4 行 UTF-8 强制输出 |
| 5 | 参考文件引用了不存在的旧文件名 | check-in-templates.md 中 `status.md`/`log.md` 修正为当前文件体系名称；evaluation-criteria.md 归档路径修正 |
| 6 | CLAUDE.md 缺少质量检查规则 | 新增规则：修改 skill 后必须执行隐含假设检查（路径/条件/输出是否交代清楚） |

**本次新增的待完善项**：

| # | 问题 |
|---|------|
| A | `read_tasks.py` 仍只输出 console，未改造为直接写入 md 文件 |
| B | 测试因 Python 沙箱限制未能通过子代理访问 D 盘（已通过复制到 C 盘绕过，Python 现已安装可用） |
| C | 评估报告生成器 `generate_review.py` 也卡 GBK 编码，未修复 |
| D | V2 拆分方案（pushme-plan + pushme-push）尚未开始 |
| E | Skill 仍未在真实对话中激活测试——三次测试均由子代理模拟执行 |

**环境变化**：
- Python 3.12.10 已安装（`C:\Users\Administrator\AppData\Local\Programs\Python\Python312\`），openpyxl 3.1.5 + pyyaml 6.0.3 可用
- 沙箱不再拦截 Python（之前 WindowsApps 版本的 python.exe 被拦截，退出码 49）

**下次从这里开始**（优先级排序）：

1. **真实激活测试**（最优先）：在对话中说"推手"召唤技能，走一遍首次导入流程。观察：数据目录询问是否触发、Excel 数据是否正确读取、任务确认三类分类是否合理、输出约定是否生效。这是唯一没跑过的环节。
2. **改 read_tasks.py**：从 console 输出改为直接生成 markdown 格式的分类清单（对应 SKILL.md 首次导入的三类分类），减少 Claude 手工转写。
3. **跑 quick_validate.py**：Python 环境已就绪，可以实际跑验证脚本了。
4. **V2 拆分讨论**：规划 Skill（pushme-plan）+ 执行监督 Skill（pushme-push）的边界和共享文件体系。

---

## 一、项目起源

### 1.1 用户自述（轻度润色，保留原始表述）

我是一个 AI 初学者，目前主要了解 AI 应用层的使用，会使用 Claude Code 这类 agent，尝试开发过一个手机 APP，但对编程完全不懂。

我现在到了一个工作学习瓶颈期。开始的时候关于 AI 的什么都不懂，学什么都有获得感、有相应的提升。但到现在，我对自己的判断是需要深入具体地做一些 AI 方向的事情、做具体的产品。但我有本职工作需要完成，还要处理自己的日常事务，会经常处于失焦的状态，对当前进度也没有清晰的认识。

所以我需要一个东西帮我记录安排各个任务，就像我给自己找了一个项目经理，来帮助我推进各个任务。

### 1.2 核心功能需求（用户原始表述）

- 能**主动提问收集我的信息**，知道我的工作内容、可安排的时间
- 给出**具体可执行的方案**
- **监督我完成**相应的任务
- 在我完成之后对我的**效率、完成度、可修正优化的地方进行评估建议**
- 完整记录我的**完成成果、完成时间以及可优化迭代的地方**
- **不能对我言听计从像个软蛋**——项目经理还要主动质疑我的决定和任务安排修改

---

## 二、需求演进与关键决策

### 2.1 形态

- 开始可能只是一个 Skill，后面可能发展成桌面软件或手机软件，能接入云服务和 AI
- **MVP 决定**：先做 Codex Skill

### 2.2 数据存储

- 接受云同步，但 MVP 阶段用本地 Markdown 文件体系
- 用户的原始数据存在 Excel（`任务榜.xlsx` 和 `Archie修仙录.xlsx`），pushME 导入后用自己的 md 文件维护
- **Excel 读取策略**：仅首次导入时读取，或用户说"同步 Excel"时读取。日常运作以 pushME 维护的 md 文件为准

### 2.3 AI 模型

- 希望灵活切换，不绑定特定模型

### 2.4 交互模式

- 按需召唤 + 定时 check-in

### 2.5 人格设计

用户希望能"质疑我、不能对我言听计从"。最终采纳方案：
- **底层**：马斯克式质疑精神 + 反例黑名单机制（继承自 nuwa-skill 蒸馏框架）
- **上层**：PM 特有的耐心跟进、结构化记录和复盘评估能力
- **语言风格**：直接，不客气，但尊重。参考马斯克极简宣言体——先结论后推理，不铺垫

### 2.6 命名

经过多轮讨论（包括"魏征""砺剑""淬火""推手""势""pushme""pushME"等候选），最终确定：

| | |
|------|------|
| 中文名 | 推手 |
| 英文名 | pushME |
| 目录名 | `pushme-skill` |

命名原则：短 + 中英双通 + 一眼秒懂 + 跟 PM 功能自然关联。

---

## 三、市场调研结论

用户要求在生成方案前先做全网搜索。调研范围包括：GitHub（多组关键词）、HuggingFace、DuckDuckGo（网络受限未完成）。

**结论：不存在能满足用户全链路需求的现有产品。**

| 类型 | 代表产品 | 缺失 |
|------|---------|------|
| AI 排程 | Motion、Reclaim.ai、Trevor AI | 只管"什么时候做"，不管"做得怎么样" |
| 项目管理 | ClickUp AI、Notion AI | 团队导向或被动型，不会主动推你 |
| 任务管理 | Todoist、TickTick | AI 功能弱，无执行监督和评估 |
| 开源 | P.R.I.S.M（3★）、untask（2★）等 | 均未形成完整闭环 |

**核心空白**：没有产品扮演"项目经理"角色——主动了解你 → 拆解目标 → 监督执行 → 评估完成度 → 给出优化建议 → 沉淀成果。

---

## 四、参考资源

### 4.1 核心参考 Skill

三个参考 Skill 的完整 SKILL.md 均存放在 `referskill/` 目录下：

| Skill | 本地路径 | 来源 | 借鉴了什么 |
|-------|---------|------|-----------|
| nuwa-skill（女娲） | [referskill/nuwa-skill-main.md](referskill/nuwa-skill-main.md) | [GitHub: alchaincyf/nuwa-skill](https://github.com/alchaincyf/nuwa-skill) | 人格蒸馏框架（6 Agent 调研 → 心智模型提取 → 表达 DNA → 反例黑名单 → 失败模式树）；pushME 的质疑机制和反例黑名单直接继承此思路 |
| Elon Musk Perspective | [referskill/elon-musk-perspective.md](referskill/elon-musk-perspective.md) | nuwa-skill 的示例产出 | 身份卡 + Agentic Protocol + 反例黑名单 + 失败模式 Fallback 树；pushME 的 SKILL.md 结构参考此格式 |
| planning-with-files-zh | [referskill/planning-with-files-zh.md](referskill/planning-with-files-zh.md) | 文件规划系统 | task_plan / findings / progress 持久化模式；pushME 的 `pushme/` 文件体系借鉴此思路并做了维度扩展 |

### 4.2 构建工具

- **skill-creator**（Codex 内置）：用于初始化 Skill 目录结构、生成模板、验证。pushME 的脚手架由 `init_skill.py` 生成。

### 4.3 用户现有数据

用户自建的个人管理 OS（Excel 格式）：
- `任务榜.xlsx`：S/A/B/C 四级优先级任务 + AI 日报金句 + 每日流水账
- `Archie修仙录.xlsx`：自我条例（43 条）× 修行日志 × 道心觉醒 × 修仙总纲 × 道途机缘录（108 条）× 周度/月度复盘 × 天赋功法榜

这些数据是 pushME 设计和测试的素材来源。用户的规划能力远强于执行能力——这正是 pushME 需要解决的核心矛盾。

---

## 五、已完成的交付物（V1）

### 5.1 位置

```
D:\咕咕_26369_廖智强\AI工具实验\manager-skill\pushme-skill\
```

### 5.2 文件清单与用途

| 文件 | 大小 | 一句话 |
|------|------|--------|
| `SKILL.md` | ~6KB | 核心 Skill 文件——角色定义 + Step 0/1/2/3 工作流 + 6 项核心能力 + 7 条反例黑名单 + 5 条失败模式 + 完整文件体系说明 |
| `agents/openai.yaml` | ~260B | Codex UI 元数据（display_name、short_description、default_prompt） |
| `references/pm-framework.md` | ~3.6KB | PM 人格方法论——马斯克基因（4 适用 + 2 不适用心智模型）+ PM 结构化能力 + 质疑的轻/中/重节奏控制 |
| `references/check-in-templates.md` | ~2.7KB | 首次访谈 5 轮递进式提问 + 早晚 check-in 流程 + 每周复盘框架 + 评估模板 |
| `references/evaluation-criteria.md` | ~1.4KB | 四维评估标准（完成度/效率偏差/偏差分析/可复用经验），含量化公式 |
| `scripts/read_tasks.py` | ~2.5KB | Excel 读取脚本——读取任务榜和修仙录，支持导入到 md 文件（V1 为 console 输出，待改造为 md 写入模式） |

### 5.3 SKILL.md 核心设计要点

- **Step 0（状态检查）**：每次激活先检查磁盘 `pushme/` 是否存在——用文件系统判断是否首次运行，不依赖 Skill 自身的"记忆"
- **首次导入模式**：`pushme/` 不存在时触发。先问用户要不要导入 Excel，不行就走对话访谈
- **Excel 读取**：仅首次导入或用户主动说"同步 Excel"时触发，日常不读
- **7 层文件记忆体系**：`current.md`（焦点）+ `backlog.md`（待做池）+ `overview.md`（总览）+ `config.md`（配置）+ `plans/`（项目方案）+ `archive/`（归档）+ `check-ins/`（记录）+ `patterns.md`（模式总结）
- **反例黑名单**：7 条"绝不要做"的行为（如"用户说推迟就同意""模糊评估无数据"等）
- **诚实边界**：明确标注了不擅长的领域

### 5.4 已知待完善项

| # | 问题 | 状态 |
|---|------|------|
| 1 | ~~`quick_validate.py` 依赖 PyYAML，沙箱环境装不了~~ | ✅ Python 3.12 已安装，pyyaml 6.0.3 可用，待实际跑验证 |
| 2 | `read_tasks.py` 输出为 console 模式，未改造为直接写入 md 文件。SKILL.md 已通过任务确认环节（人工审核）规避了自动写入的问题，但脚本本身仍需改造 | 部分解决，脚本改造待做 |
| 3 | 两个 Skill 拆分方案（pushme-plan + pushme-push）已在讨论中，计划 V2 实施 | 待 V2 |
| 4 | Skill 尚未在真实对话中激活测试（已通过子代理完成 3 场景模拟测试，17/17 断言通过） | 待真实激活测试 |

---

## 六、部署方式

1. 将 `pushme-skill` 文件夹复制到 Codex 技能目录：`C:\Users\Administrator\.codex\skills\`
2. 在对话中说"推手"或"pushme"即可激活
3. 首次激活会自动创建 `pushme/` 文件体系并走访谈流程
4. 后续激活直接读取已有文件进入 check-in 模式

---

## 七、后续方向（用户提及，尚未实施）

- 拆分为两个 Skill：规划 Skill + 执行监督 Skill，共享同一套文件体系
- 从 Skill 演进为桌面/手机应用
- 接入云服务和更多 AI 模型
- 定时自动化 check-in（当前为手动召唤）


