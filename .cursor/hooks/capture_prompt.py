"""Capture user prompt before submit → journal/corpus/*.jsonl"""
import sys

from _journal_io import append_entry, debug_log, extract_text, log_hook_trace, read_hook_input

USER_KEYS = (
    "prompt",
    "user_message",
    "message",
    "text",
    "content",
    "userPrompt",
    "user_prompt",
)

if __name__ == "__main__":
    try:
        data = read_hook_input()
        debug_log(data)
        text = extract_text(data, USER_KEYS)
        log_hook_trace("beforeSubmitPrompt", data, text)
        append_entry("user", text, "beforeSubmitPrompt")
    except Exception as e:
        debug_log({"error": str(e), "script": "capture_prompt.py"})
        sys.exit(0)
