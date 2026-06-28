"""Session end marker → journal/corpus/*.jsonl"""
import sys

from _journal_io import append_entry, debug_log, read_hook_input

if __name__ == "__main__":
    try:
        data = read_hook_input()
        debug_log(data)
        append_entry("system", "--- sessionEnd ---", "sessionEnd")
    except Exception as e:
        debug_log({"error": str(e), "script": "session_end.py"})
        sys.exit(0)
