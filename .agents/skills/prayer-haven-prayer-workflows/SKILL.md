---
name: prayer-haven-prayer-workflows
description: Implement, debug, or refactor Prayer Haven's prayer creation, list, and detail flows in this Expo app. Use for changes to the associated routes, local storage, or prayer data behavior.
---

# Prayer Haven Prayer Workflows

Use this skill for work on saved prayers. Read [the workflow reference](references/prayer-workflows.md) before changing the prayer routes or their supporting data layer.

## Working conventions

- Treat the source files as authoritative and recheck them before editing; this reference is a map, not a replacement for the code.
- Preserve the local-mode and authenticated remote-create paths unless the request explicitly changes product behavior.
- Keep the local list query and its `"local-prayers"` invalidation in sync whenever local create behavior changes.
- For visual work on these screens, also apply `$prayer-haven-ui-theme`. For API calls, queries, mutations, caching, or authentication changes, also apply `$expo-data-fetching`.
- Do not assume remote prayer listing or remote prayer detail exists: the current non-local list is a static placeholder and the detail screen resolves from local data.
