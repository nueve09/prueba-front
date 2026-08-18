## Context

Phases 1–5 of the remesas workspace and Phase 6a Vitest contracts are already in `src/`. Layout chrome lives in `AppShell` → `IconRail` + `Outlet` + `MobileTabs`. Routes are declarative in `App.tsx` (`BrowserRouter` + nested `Route`s). `APP_NAV_ITEMS` is the single destination list.

Current tests:

- Remesas units and screens: keypad, keypad-dialog, history-panel, remesas-page — done.
- `app-shell.test.tsx`: rail/tabs `lg:` class contract and same labels. Does not assert current page or navigation.
- `App.test.tsx`: `/` remesas heading and `/pagos` placeholder. Does not walk the rest of `APP_NAV_ITEMS` or click a link.
- No files for `icon-rail.tsx`, `mobile-tabs.tsx`, `placeholder-page.tsx`.

React Router `NavLink` already sets `aria-current="page"` when active. `MobileTabs` already calls `navigate(path)` on tab change. Product UI should not need a redesign; this change is mostly tests.

## Goals / Non-Goals

**Goals:**

- Lock `app-shell` navigation contracts that Vitest currently misses: current remesas rail item, every unused destination as a placeholder, rail click changes location, tab activation navigates.
- Give IconRail, MobileTabs, and PlaceholderPage colocated unit tests with unique assertions.
- Expand the App route suite to the full unused-path table plus one click path.

**Non-Goals:**

- Playwright E2E, real `lg` viewport, or print CSS (still Phase 6b).
- Tests for shadcn primitives.
- Rewriting remesas keypad/history tests.
- Husky pre-push, GitHub Actions lint/test gates, README rationale (Phases 7–8).
- Switching to Data/Framework Mode.

## Decisions

### 1. Unique assertion per file

- **Choice:** IconRail owns links + `aria-current`. MobileTabs owns tabs + `navigate`. PlaceholderPage owns heading-only blank screen. `AppShell` keeps the existing `lg:` class contract. `App.test.tsx` owns the route table and one rail click through `BrowserRouter`.
- **Why:** Matches the existing unit-testing rule (no triple-asserting the same fact). `app-shell.test.tsx` already covers “same destinations + visibility classes”.
- **Alternative:** One giant App test for everything — rejected; a broken rail would still look like a router bug.

### 2. Current page via `aria-current`, not a custom class assertion

- **Choice:** Assert `aria-current="page"` on the remesas `NavLink` at `/`. Do not assert `bg-kiosk` / `text-kiosk-accent`.
- **Why:** React Router already sets `aria-current` on active `NavLink`. That is the accessible “active” signal `app-shell` now names. Class strings rot.
- **Alternative:** Add `data-active` — extra product API for tests. Not needed.

### 3. MemoryRouter for layout units, BrowserRouter for App

- **Choice:** Wrap `IconRail` / `MobileTabs` in `MemoryRouter` (`initialEntries: ['/']`). Keep `App.test.tsx` on the real `App` (`BrowserRouter`) with `window.history.replaceState` as today, plus `userEvent.click` on `getByRole('link', { name: 'Pagos' })`.
- **Why:** Rail links are `NavLink`s; tabs are not links (`role="tab"`), so the Pagos **link** is unique in App. Layout units should not mount RemesasPage or the store.
- **Alternative:** Inject a router into `App` — product change. Rejected.

### 4. Walk unused paths from `APP_NAV_ITEMS`

- **Choice:** In `App.test.tsx`, iterate `APP_NAV_ITEMS` entries whose `to` is not `/`. One parameterized case (or a small loop inside one test) asserts heading + no keypad.
- **Why:** Adding a seventh nav item without a route should fail the same test. Hard-coding `/inicio` … `/reportes` drifts.
- **Alternative:** Five copy-pasted tests — rejected.

### 5. No production diff unless a test proves a bug

- **Choice:** Write tests against current components first. Only touch production if `aria-current` is missing or a listed path has no route (neither is expected).
- **Why:** This is contract TDD on shipped chrome, same as Phase 6a.

## Risks / Trade-offs

- [App.test click hits the tab instead of the rail] → Query `role="link"` (rail) not `role="tab"` (mobile).
- [IconRail without a router throws] → Always wrap layout units in `MemoryRouter`.
- [Overlapping destination assertions] → AppShell keeps labels+classes; IconRail/MobileTabs do not re-assert `lg:flex` / `lg:hidden`.
- [jsdom has no real viewport] → Still class contracts only; true `lg` stays Playwright.

## Migration Plan

1. Implement on a `feature/app-shell-coverage` branch from `master` (do not commit to `master`).
2. Add the three colocated tests, then extend `App.test.tsx`. `pnpm test` must stay green.
3. `graphify update .` after test files land.
4. Rollback: delete the new tests and revert `App.test.tsx`; no data migration.

## Open Questions

None blocking. Assumptions: remesas path is `to: '/'` with `end: true`; unused paths are every other `APP_NAV_ITEMS` entry; Playwright remains out of `pnpm test`.
