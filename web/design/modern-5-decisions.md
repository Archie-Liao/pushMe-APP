# 现代 5 方向 — Design Decisions（Checkpoint 1）

> 确认本文件后，再生成 `gallery.html` 现代 5 批。  
> 参照：`linear.md`、`notion-pre-ai.md`；反 AI 俗套见 `brand-spec.md`。

## 画廊交互

- 桌面画布：**1280×800** 逻辑宽（可缩放）
- Tweaks：方向 M1～M5、屏幕（登录 / 聚焦 / 任务榜）
- 每方向 3 屏，同一假数据

---

### M1 · Linear 暗色（暗）

**Step 3a**  
- 叙事：工具主界面 + 克制登录  
- 距离：笔记本 1m  
- 温度：冷静、专业、键盘友好  
- 容量：聚焦 2 任务 + 侧栏导航

**Design Decisions**  
- Anchor: `linear.md`  
- 色：底 `#08090A`，面板 `#16171C`/`#1E1F25`，字 `#F7F8F8`/`#9CA3AF`，accent `#5E6AD2`（<5% 面积）  
- 字：Display **Geist** 600 / Body **Geist** 14px / Mono **JetBrains Mono**  
- 间距：4/8/16/24/40  
- 圆角：6/12/16（max 16）  
- 阴影：极弱 `0 1px 2px rgba(0,0,0,0.3)`  
- 动效：150ms ease-out hover，350ms 布局切换  
- 签名：1px 发丝边框、快捷键 chip、窄侧栏  
- 字标：`pushME` 全大写间距 + 小字 `推手`

**登录屏**：暗底居中卡片，邮箱输入 + 单 CTA「发送登录链接」，无营销废话

---

### M2 · Notion 纸感（亮）

**Step 3a**  
- 叙事：文档块 + 温和邀请式登录  
- 温度：友好、可读、略暖  
- 容量：块级卡片，中等密度

**Design Decisions**  
- Anchor: `notion-pre-ai.md`（**不用 emoji 区块标**，用色块标签代替）  
- 色：底 `#FFFFFF`，奶油 `#F7F6F3`，墨 `#37352F`，边 `#E9E9E7`，柔色块 mint/peach 作优先级标签  
- 字：Display **Source Serif 4** 500 / Body **DM Sans** 16px  
- 间距：8/16/24/40  
- 圆角：4/8/16  
- 阴影：`0 2px 8px rgba(15,15,15,0.04)`，hover 微抬升  
- 动效：200–300ms 柔和 ease-out  
- 签名：块级内容、色标 S/A/B/C、宽留白  
- 字标：`推手` 主 + `pushME` 副标 serif

**登录屏**：奶油底全屏，左侧一句话价值说明，右侧简洁表单

---

### M3 · 仪表盘密度（暗）

**Step 3a**  
- 叙事：一屏总览，表格感任务榜  
- 温度：理性、数据导向  
- 容量：多列信息，仍对齐清晰

**Design Decisions**  
- Anchor: 信息架构 / Bloomberg -lite（非 neon）  
- 色：底 `#0C0C0E`，表头 `#141416`，行 hover `#1A1A1E`，accent 青灰 `#6B8F9F`（非电蓝）  
- 字：Display **IBM Plex Sans** 600 / Body **IBM Plex Sans** 13px / Mono **IBM Plex Mono**  
- 间距：紧凑 4/8/12  
- 圆角：2/4（几乎直角）  
- 阴影：无，靠边框分割  
- 动效：80ms 行 hover 底色  
- 签名：顶栏统计、密集表格、列：类型/标题/状态/下一步  
- 字标：等宽 `pushME` 角标

**登录屏**：顶栏品牌 + 下方窄表单，像企业内部门户

---

### M4 · 极简单栏（亮）

**Step 3a**  
- 叙事：强聚焦，干扰极少  
- 温度：安静、禅意现代（非修仙）  
- 容量：单列 max-width 640px

**Design Decisions**  
- Anchor: editorial minimal + tool  
- 色：底 `#FAFAFA`，字 `#111`，accent 单一 `#2563EB`（克制蓝，非渐变）  
- 字：Display **Literata** 600 / Body **Literata** 17px  
- 间距：大：16/32/64  
- 圆角：0/4（几乎无圆角）  
- 阴影：无  
- 动效：聚焦任务切换 400ms opacity  
- 签名：超大今日标题、仅 1–2 任务、底部小链接切任务榜  
- 字标：中文 `推手` 大字 + 英文小

**登录屏**：几乎只有邮箱框 + 按钮，上方一句「回来继续」

---

### M5 · 温和 SaaS（亮）

**Step 3a**  
- 叙事： approachable 工具，略圆略暖  
- 温度：轻松但仍是生产力工具  
- 容量：卡片网格，中等

**Design Decisions**  
- Anchor: warm humanist SaaS（非 Mailchimp 滑稽）  
- 色：底 `#F4F4F5`，卡片 `#FFF`，字 `#18181B`，accent `#0D9488`（青绿，非紫）  
- 字：Display **Plus Jakarta Sans** 600 / Body **Plus Jakarta Sans** 15px  
- 间距：12/20/32  
- 圆角：12/16/20（最圆的一版 modern）  
- 阴影：软 `0 4px 24px rgba(0,0,0,0.06)`  
- 动效：250ms spring-ish（轻微 scale 0.98 on press）  
- 签名：圆角卡片、柔和 CTA、侧栏图标占位 `[icon]`  
- 字标：`pushME` 圆角 badge + `推手`

**登录屏**：分屏——左插画占位 `[illustration]`，右表单

---

## 三视图结构（现代 5 共用逻辑）

| 屏幕 | 内容 |
|------|------|
| 登录 | 邮箱 Magic Link + 品牌字标 + 一句产品说明 |
| 聚焦 | 今日 1–2 任务（pushME A + 个人网站 S）、进度、进详情 |
| 任务榜 | S/A/B/C 表格式或块列表，真实样例标题 |

---

## 状态

- [x] Checkpoint 1 已确认（Archie）
- [x] `gallery.html` v0 已生成（现代 5 × 3 屏）

## 如何打开

双击或在浏览器打开：

`d:\WorkProject\pushMe-APP\web\design\gallery.html`

右下角 **Tweaks** → 切换方向 M1～M5、屏幕（登录 / 聚焦 / 任务榜）。

---

## 待你标记

看完后在对话里说 KEEP / AVOID，或自己填 `selection-rules.md`。
