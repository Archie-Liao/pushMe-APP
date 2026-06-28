"""Capture agent response → journal/corpus/*.jsonl"""
import sys

from _journal_io import append_entry, debug_log, extract_text, read_hook_input

ASSISTANT_KEYS = (
    "response",
    "assistant_message",
    "message",
    "text",
    "content",
    "agent_message",
    "output",
)

if __name__ == "__main__":
    try:
        data = read_hook_input()
        debug_log(data)
        text = extract_text(data, ASSISTANT_KEYS)
        append_entry("assistant", text, "afterAgentResponse")
    except Exception as e:
        debug_log({"error": str(e), "script": "capture_response.py"})
        sys.exit(0)
