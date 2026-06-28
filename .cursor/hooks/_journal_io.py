"""Shared journal I/O for Cursor Hooks."""
from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any


def project_root() -> Path:
    return Path(__file__).resolve().parents[2]


def now_ts() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def session_id() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def corpus_path() -> Path:
    d = project_root() / "journal" / "corpus"
    d.mkdir(parents=True, exist_ok=True)
    return d / f"{session_id()}.jsonl"


def debug_log(data: Any) -> None:
    if os.environ.get("PUSHME_HOOK_DEBUG") != "1":
        return
    log = project_root() / "journal" / "corpus" / "_hook_debug.log"
    with open(log, "a", encoding="utf-8") as f:
        f.write(f"\n--- {now_ts()} ---\n")
        f.write(json.dumps(data, ensure_ascii=False, indent=2, default=str))
        f.write("\n")


def extract_text(data: dict, keys: tuple[str, ...]) -> str:
    for key in keys:
        val = data.get(key)
        if isinstance(val, str) and val.strip():
            return val.strip()
        if isinstance(val, dict):
            for sub in ("text", "content", "message", "prompt", "value"):
                inner = val.get(sub)
                if isinstance(inner, str) and inner.strip():
                    return inner.strip()
    conv = data.get("conversation")
    if isinstance(conv, list) and conv:
        last = conv[-1]
        if isinstance(last, dict):
            return extract_text(last, ("text", "content", "message", "prompt"))
    return ""


def append_entry(role: str, text: str, event: str) -> None:
    if not text or not text.strip():
        return
    entry = {
        "ts": now_ts(),
        "role": role,
        "text": text.strip(),
        "session": session_id(),
        "event": event,
    }
    path = corpus_path()
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def read_hook_input() -> dict:
    raw = os.read(0, 10_000_000)
    if not raw.strip():
        return {}
    return json.loads(raw.decode("utf-8"))
