"""
蒸馏前数据整理（阶段6，后期使用）。

从 journal/corpus/*.jsonl 生成 distill/ 目录：
  - user_utterances.jsonl
  - dialogue_pairs.jsonl
  - stats.md
  - sample_for_review.md

用法: python scripts/distill_prep.py
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS = ROOT / "journal" / "corpus"
OUT = ROOT / "distill"
SKIP_SHORT = 3  # 跳过过短 user 消息


def main() -> int:
    if not CORPUS.exists():
        print("No journal/corpus/ yet. Use the app and Hooks first.")
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    users: list[dict] = []
    pairs: list[dict] = []
    roles = Counter()

    for path in sorted(CORPUS.glob("*.jsonl")):
        if path.name.startswith("_"):
            continue
        lines = path.read_text(encoding="utf-8").splitlines()
        prev_user: str | None = None
        for line in lines:
            if not line.strip():
                continue
            row = json.loads(line)
            role = row.get("role", "")
            text = (row.get("text") or "").strip()
            roles[role] += 1
            if role == "user" and len(text) >= SKIP_SHORT:
                users.append(row)
                prev_user = text
            elif role == "assistant" and prev_user:
                short = text[:200] + ("…" if len(text) > 200 else "")
                pairs.append(
                    {
                        "ts": row.get("ts"),
                        "user": prev_user,
                        "assistant_short": short,
                    }
                )
                prev_user = None

    (OUT / "user_utterances.jsonl").write_text(
        "\n".join(json.dumps(u, ensure_ascii=False) for u in users) + ("\n" if users else ""),
        encoding="utf-8",
    )
    (OUT / "dialogue_pairs.jsonl").write_text(
        "\n".join(json.dumps(p, ensure_ascii=False) for p in pairs) + ("\n" if pairs else ""),
        encoding="utf-8",
    )

    stats = [
        "# 语料统计",
        "",
        f"- user 发言（≥{SKIP_SHORT} 字）: {len(users)}",
        f"- 对话对: {len(pairs)}",
        f"- 角色计数: {dict(roles)}",
    ]
    (OUT / "stats.md").write_text("\n".join(stats), encoding="utf-8")

    sample_lines = ["# 样本审阅（删不想被蒸馏的内容）", ""]
    for u in users[:20]:
        sample_lines.append(f"## {u.get('ts')}")
        sample_lines.append(u.get("text", ""))
        sample_lines.append("")
    (OUT / "sample_for_review.md").write_text("\n".join(sample_lines), encoding="utf-8")

    print(f"Done. Output: {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
