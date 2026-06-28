# 把本地项目上传到 GitHub（零基础分步指南）

> 适用：Windows + PowerShell，仓库路径 `d:\WorkProject\pushMe-APP`  
> 本机未安装 `gh` CLI，请用**网页创建仓库 + git 命令**（方式二）。

## 先理解三个概念

| 概念 | 是什么 | 类比 |
|------|--------|------|
| **本地仓库** | 你电脑上的文件夹 + `.git` 隐藏目录 | 你桌上的笔记本 |
| **commit（提交）** | 给当前文件状态拍一张「快照」，写上说明 | 笔记本某一页的定稿 |
| **GitHub 远程仓库** | 放在 GitHub 服务器上的备份 | 云盘里的同一份笔记本 |

**push（推送）** = 把本地 commit 上传到 GitHub，这样换电脑、丢硬盘都能 `clone` 拉回来。

本仓库当前为 **Public**（https://github.com/Archie-Liao/pushMe-APP）。`journal/` 含个人语料；若介意公开，可在 GitHub 仓库 Settings 改为 Private。

---

## 第一步：确认你在正确目录

```powershell
cd d:\WorkProject\pushMe-APP
```

**目的**：后面所有 git 命令都针对这个项目，避免改错文件夹。

---

## 第二步：配置 git 身份（每台电脑首次使用 git 时做一次）

```powershell
git config user.name "你的名字"
git config user.email "你的邮箱@example.com"
```

**目的**：每次 commit 会记录「谁提交的」。GitHub 上显示的作者信息来自这里。  
**说明**：只在**本仓库**生效（未加 `--global`）。邮箱建议用 GitHub 账号邮箱。

验证：

```powershell
git config user.name
git config user.email
```

---

## 第三步：创建第一个 commit（本地快照）

当前状态：文件已 `git add` 过，但还没有 commit。

```powershell
git status
```

**目的**：`git status` 查看哪些文件将被提交（绿色 `A` = 新文件待提交）。

```powershell
git commit -m "Add context system, journal hooks, and project memory"
```

**目的**：`commit` 在本地生成第一个快照。`-m` 后面是这次提交的简短说明（以后回顾历史用）。

若提示 `nothing to commit`，说明已经 commit 过，可跳过本步。

---

## 第四步：在 GitHub 网页创建空仓库

1. 浏览器打开：https://github.com/new  
2. **Repository name**：例如 `pushMe-APP`（可与本地文件夹名不同，但建议一致）  
3. **Description**：可选，如「pushME AI 项目经理」  
4. **可见性**：Public 或 Private（当前仓库为 Public）  
5. **不要勾选**：
   - Add a README file  
   - Add .gitignore  
   - Choose a license  

**目的**：在 GitHub 上占一个「空房间」，等你把本地文件 `push` 进去。若勾了 README，远程会多一个 commit，和本地历史冲突，新手容易卡住。

创建后页面会显示仓库地址，形如：

`https://github.com/你的用户名/pushMe-APP.git`

复制这个地址，下一步要用。

---

## 第五步：把本地仓库和 GitHub 地址绑定

```powershell
git remote add origin https://github.com/你的用户名/pushMe-APP.git
```

**目的**：`origin` 是远程仓库的默认名字；告诉 git「推送时往哪个 URL 发」。

检查是否绑定成功：

```powershell
git remote -v
```

应看到 `origin` 指向你的 GitHub 地址。

**若提示 `remote origin already exists`**：先执行 `git remote remove origin`，再重新 `git add origin ...`。

---

## 第六步：把默认分支改名为 main（与 GitHub 一致）

```powershell
git branch -M main
```

**目的**：GitHub 默认主分支叫 `main`；老版 git 可能叫 `master`，改名避免推送警告。

---

## 第七步：推送到 GitHub（上传）

```powershell
git push -u origin main
```

**目的**：

- `git push`：把本地 `main` 分支的 commit 上传到 GitHub  
- `-u origin main`：记住「以后在这个分支上 push 默认推到 origin/main」，下次只需 `git push`

**第一次 push 会弹出登录**（二选一）：

### 方式 A：浏览器登录（推荐）

1. 弹出窗口或终端提示打开浏览器  
2. 用 GitHub 账号登录并授权  
3. Windows 可能通过 **Git Credential Manager** 保存凭据，以后不用重复登录  

### 方式 B：Personal Access Token（PAT）

若浏览器登录失败：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)  
2. Generate new token，勾选 `repo` 权限  
3. 推送时 **密码处粘贴 token**（不是 GitHub 登录密码）

**成功后**：刷新 GitHub 仓库网页，应能看到 `AGENTS.md`、`.context/` 等文件。

---

## 第八步：以后改了文件怎么再上传？

日常流程（改代码 → 上传）：

```powershell
cd d:\WorkProject\pushMe-APP

# 1. 看改了什么
git status

# 2. 把改动加入「待提交清单」
git add .

# 3. 本地快照 + 说明
git commit -m "简述你改了什么"

# 4. 上传到 GitHub
git push
```

| 命令 | 作用 |
|------|------|
| `git status` | 看哪些文件被修改/新增 |
| `git add .` | 当前目录所有改动加入暂存区 |
| `git add 某个文件` | 只提交指定文件 |
| `git commit -m "..."` | 本地保存快照 |
| `git push` | 把快照同步到 GitHub |

---

## 让 Cursor AI 帮你提交/上传（提示词速查）

> **给你查阅用**：复制下面句子发给 AI 即可。  
> **给 Agent 的规则**见 [AGENTS.md](AGENTS.md)「Git 与 GitHub」节。

### Agent 默认不会自动上传

| 你说的话 | Agent 会不会 push |
|----------|-------------------|
| 整理、更新进度、改代码 | **不会**（只改本地文件） |
| 只说了 commit / 提交 | **不会 push**（只本地快照） |
| 明确说了 push / 上传 GitHub | **会** commit + push |

`整理` ≠ 上传；`更新进度` ≠ 上传。

### 想上传时 — 复制这些提示词

| 你想做什么 | 发给 AI 的提示词（任选一句） |
|------------|------------------------------|
| **提交并上传**（最常用） | `commit 并 push 到 GitHub` |
| 同上 | `把当前改动提交并同步到远程` |
| 同上 | `上传 GitHub` |
| **只本地提交，先不上传** | `只 commit，不要 push` |
| 同上 | `先本地提交，等我确认再 push` |
| **指定文件** | `只 commit 并 push AGENTS.md 和 conversations` |
| **排除 corpus** | `除了 corpus 都提交并 push` |
| **完全不要动 git** | `别提交` / 不提 commit、push 即可 |

### 和 corpus 的关系

`journal/corpus/*.jsonl` 由 **Hooks 自动写本地**，不会自动进 GitHub。  
除非你明确说要提交 corpus，一般**不要** push（体积大、原始语料）。

### 自己检查有没有上传成功

```powershell
cd d:\WorkProject\pushMe-APP
git status
```

- `Your branch is up to date with 'origin/main'` → 本地和 GitHub 一致  
- `ahead of 'origin/main' by N commits` → 有本地提交**还没 push**  
- 网页刷新 https://github.com/Archie-Liao/pushMe-APP 看文件是否更新

---

## 换电脑继续开发

```powershell
git clone https://github.com/你的用户名/pushMe-APP.git
cd pushMe-APP
```

**目的**：`clone` 把 GitHub 上的完整仓库（含历史）下载到新电脑。  
然后安装 Python、用 Cursor 打开项目，Hooks 与 `AGENTS.md` 自动生效。

---

## 验证 Hooks（上传前后都可做）

1. 重启 Cursor（或保存 `.cursor/hooks.json` 后等待重载）  
2. 在本项目发一条测试消息  
3. 打开 `journal/corpus/YYYY-MM-DD.jsonl`，应多一行 JSON  

若无输出：Cursor → 设置 → **Hooks**；输出面板 → **Hooks** 通道。  
调试：设置环境变量 `PUSHME_HOOK_DEBUG=1`，查看 `journal/corpus/_hook_debug.log`。

---

## 常见问题

### `Author identity unknown`

→ 回到**第二步**配置 `user.name` 和 `user.email`。

### `failed to push ... rejected`

→ 远程有你没有的提交（例如在网页上改过文件）。新手可先确认远程是空仓库；若仍报错，把完整错误信息发给 agent。

### `Authentication failed`

→ 重新登录 Git Credential Manager，或使用 PAT（见第七步方式 B）。

### 仓库必须是私有吗？

→ **不必**。当前为 Public。若不想公开 `journal/` 语料，可改为 Private（Settings → Danger zone → Change visibility）。

---

## 命令速查（复制用，替换你的用户名）

```powershell
cd d:\WorkProject\pushMe-APP
git config user.name "你的名字"
git config user.email "你的邮箱"
git commit -m "Add context system, journal hooks, and project memory"
git remote add origin https://github.com/你的用户名/pushMe-APP.git
git branch -M main
git push -u origin main
```

完成第七步后，在 GitHub 网页刷新即可看到全部文件。
