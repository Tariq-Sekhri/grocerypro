# UI placement conventions

- Anchor dropdowns, menus, and popovers to the control that opens them in the document layout. They must move with that control when the page scrolls; do not use viewport-fixed positioning or detached bottom sheets for these interactions.
- Keep menus layered above their originating control and nearby content. Place modal/dialog overlays above the content that opened them, preserving the user's context whenever possible.
- Use direct, factual interface text. Every sentence must communicate status, an action, or information the user needs; avoid promotional or decorative copy. For an empty shopping list, say "List empty" without extra filler.

# Old history

Commits before the clean restart (2026-11-06) are in the private `grocerypro-archive` repo, available as the `archive` remote. Run `git fetch archive` and look at `archive/main` or other `archive/*` branches when you need old commits. Never push archive history to `origin`.
