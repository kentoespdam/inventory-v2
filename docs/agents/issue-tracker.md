# Issue Tracker

This project uses **bd (beads)** for issue tracking — a Dolt-powered local markdown tracker.

## Configuration

- Issue files: local markdown under `.scratch/` directory
- Auto-sync: bd auto-commits to Dolt; use `bd dolt push`/`bd dolt pull` to sync

## Commands

```bash
bd ready --json          # Find unblocked issues
bd create "Title" --description="..." -t bug|feature|task -p 0-4 --json  # Create issue
bd update <id> --claim --json  # Claim issue
bd close <id> --reason "Done" --json  # Complete
```

## Integration

Skills that read/write issues (`to-issues`, `triage`, `to-prd`, `diagnose`, `tdd`) use `bd` commands. See `AGENTS.md` for full workflow.