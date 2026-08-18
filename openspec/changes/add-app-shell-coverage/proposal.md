## Why

`app-shell` already describes default remesas routing, unused destinations as placeholders, active rail state, and client-side navigation, but Vitest only locks two of those: `/` shows Remesas and `/pagos` is a blank page. IconRail, MobileTabs, and PlaceholderPage have no colocated unit tests, so a broken NavLink, inactive remesas item, or missing placeholder route would still pass `pnpm test`.

## What Changes

- Tighten `app-shell` so unused destinations are every non-remesas `APP_NAV_ITEMS` path, remesas is the current rail item at `/`, rail clicks change the URL without reload, and mobile tabs navigate to the same destinations.
- Extend `unit-testing` with unique coverage for those layout units, the placeholder screen, and the full declarative route table (including one click-to-navigate path).
- Do **not** add Playwright, tests for shadcn primitives (`button`, `tabs`, `dialog`, …), or duplicate remesas keypad/history/page contracts that already exist.

Audit this change is based on (already shipped):

| Layer | Present | Missing |
| --- | --- | --- |
| Remesas units | keypad, keypad-dialog, history-panel, remesas-page | — |
| Shell units | app-shell composition (rail/tabs class contract + same labels) | icon-rail, mobile-tabs, placeholder-page |
| Screens | RemesasPage, AppShell | PlaceholderPage as its own screen; only `/pagos` sampled |
| Router | `/` remesas, `/pagos` placeholder | remaining nav paths, rail `aria-current`, click navigation |

## Capabilities

### New Capabilities

- None. This fills gaps in existing shell and test capabilities.

### Modified Capabilities

- `app-shell`: Require every unused nav destination to render a blank placeholder, remesas rail current at `/`, client-side navigation on rail activation, and mobile tab activation that navigates to the same paths.
- `unit-testing`: Require colocated unit tests for IconRail, MobileTabs, and PlaceholderPage, plus App route coverage for all unused destinations and one rail/tab click that changes the location without a remesa keypad.

## Impact

- New colocated tests under `src/components/layout/` and extra cases in `src/App.test.tsx`. Possible tiny test-only a11y hooks on the remesas `NavLink` (e.g. rely on React Router `aria-current="page"`, already default). No new dependencies. No product UI redesign. Playwright and Phase 7 git gates stay out of this change.
