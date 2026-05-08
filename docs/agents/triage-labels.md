# Triage Labels

This project uses the canonical triage label vocabulary.

## Labels

| Label | Meaning |
|-------|---------|
| `needs-triage` | Maintainer needs to evaluate |
| `needs-info` | Waiting on reporter for more information |
| `ready-for-agent` | Fully specified, AFK-ready for agent pickup |
| `ready-for-human` | Needs human implementation |
| `wontfix` | Will not be actioned |

## Mapping

These are the default strings. When the `triage` skill processes issues, it applies these labels. The underlying issue tracker (bd/beads) uses types (`bug`, `feature`, `task`, `epic`, `chore`) and priorities (`p0`-`p4`) — this mapping is informational only for skills that expect GitHub-style labels.