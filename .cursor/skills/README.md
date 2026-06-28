# 本项目 Cursor Skills

技能放在 **项目内** `.cursor/skills/`（与 `.cursor/hooks/` 同级），随仓库同步，换电脑 `git pull` 即有。

| 目录 | 用途 | 是否日常召唤 |
|------|------|----------------|
| [`pushme-skill/`](pushme-skill/SKILL.md) | **APP 开发参考**：PM 人格、工作流、文件体系、评估标准 | 否 — 开发 APP 时读 `SKILL.md` 与 `references/` |
| [`web-design-engineer/`](web-design-engineer/SKILL.md) | 个人网站 UI/设计开发 | 是 — 做网站时由 Cursor 加载 |

## pushme-skill 怎么用（参考，不是口头禅）

开发 pushME APP 时，agent 应阅读：

- `pushme-skill/SKILL.md` — 产品逻辑与反例黑名单
- `pushme-skill/references/` — PM 框架、check-in、评估标准

**不要**假设用户还会说「推手」来激活；最终产品逻辑要实现在 APP 代码里，不是继续依赖 Skill 对话。

## web-design-engineer

做个人网站界面时直接使用；配方见 `references/style-recipes/`。
