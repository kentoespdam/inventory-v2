# Domain Docs

Single-context layout: one global `CONTEXT.md` at the repo root.

## Files

| File | Purpose |
|------|---------|
| `CONTEXT.md` | Project domain language, key concepts, ubiquitous language |
| `docs/adr/` | Architecture Decision Records |

## Consumer Rules

Skills that need domain context:

- `diagnose` — reads `CONTEXT.md` for domain terminology
- `tdd` — reads `CONTEXT.md` for domain language
- `improve-codebase-architecture` — reads `CONTEXT.md` + `docs/adr/`

## Layout

```
inventory-v2/
├── CONTEXT.md           # Domain language
└── docs/
    └── adr/             # Architectural decisions
```