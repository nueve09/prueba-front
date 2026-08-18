## Context

The remesas workspace (Phases 1–5 in `add-remesas-ventanilla`) is already in `src/`. Vitest is configured in `vite.config.ts` with `include: ['src/**/*.{test,spec}.{ts,tsx}']` and `passWithNoTests: true`. There are **zero** unit files. The only automated check is Playwright smoke (`tests/app.spec.ts`), which is out of this change.

README functional rules are implemented but not locked by tests:

| README rule | Current owner |
| --- | --- |
| >12 remesas, charged + uncharged | `src/data/remesas.ts` (20 items: 16 `COBRADO`, 4 `NO_COBRADO`) |
| Zod shape, id max 8, status enum | `src/lib/schemas.ts` |
| Search by id / company / amount | `useRemesasFilter` |
| 10 charged remesas by `charged_at` | `useRemesasFilter` (`REMESA_PAGE_SIZE = 10`, sort desc) |
| Keypad charge + validations | `chargeRemesa`, `submitRemesaCharge`, `RemesaKeypad` |
| General errors | `formatUnknownError` + Base UI toast (`toast.add`) |
| Responsive / Dialog | CSS (`lg:flex` / `lg:hidden`) + `RemesaKeypadDialog` |

The feature already exists, so this is **contract TDD against shipped code**: write the failing-if-wrong tests in README order first, then gap tests. Do not rewrite production to “go red first”. If a Wave 1 test fails, that is a product bug to fix in this change.

## Goals / Non-Goals

**Goals:**

- Make `pnpm test` an executable README contract, then a gap suite, in that order.
- Keep tests colocated, fast, and isolated (reset mock memory + store; fake timers).
- Add only the test seams required for isolation.
- Document Playwright follow-up so Phase 6b has a ready backlog.

**Non-Goals:**

- Adding Jest.
- New Playwright specs, visual regression, or pixel-perfect mockup tests.
- Coverage percentage gates, snapshot testing of whole pages, or testing shadcn internals.
- Extracting new product abstractions “for testability” beyond a mock/store reset.
- Husky pre-push / CI (Phase 7).

## Decisions

### 1. Vitest, not Jest

- **Choice:** Keep Vitest 4. Jest-compatible `describe` / `it` / `expect` / `vi`.
- **Why:** Already wired; Phase 6 of `add-remesas-ventanilla` forbids a second runner. The request for “Jest” is satisfied by API, not by adding the package.
- **Alternative:** Add Jest — rejected (duplicate runner, extra config, fights Vite).

### 2. Apply order is the TDD order (three waves)

Even though production is green, **files must be added in this sequence** during `/opsx-apply`. Do not start component tests until Wave 1 is green.

```
Wave 0  Harness     jsdom, RTL, setup, reset seams, passWithNoTests off
Wave 1  README      schemas, seed, filter/pagination, charge API, error formatter
Wave 2  Modules →   dates/format, debounce, store, submit+toast, keypad, history
        components
Wave 3  Screens     remesas-page, keypad-dialog, app-shell, routes, header chrome
Later   Playwright  documented below; not this change
```

Wave 1 maps 1:1 to README bullets. Wave 2/3 only cover **unique** behavior so we do not re-assert “id max 8” in the keypad, the schema, and the API as three copies of the same rule. Schema owns format; API owns lookup/status; keypad owns display and confirm wiring.

### 3. Colocation and naming

- **Choice:** `src/lib/schemas.test.ts`, `src/hooks/use-remesas-filter.test.ts`, `src/components/remesas/keypad.test.tsx`, etc.
- **Why:** Matches current Vitest `include` and README (`*.test.ts` under `src/`).
- **Alternative:** `src/__tests__/` — extra folder, weaker locality.

Suggested files (do not add extras):

| Wave | File |
| --- | --- |
| 1 | `src/lib/schemas.test.ts` |
| 1 | `src/data/remesas.test.ts` |
| 1 | `src/hooks/use-remesas-filter.test.ts` |
| 1 | `src/api/remesas.test.ts` |
| 1 | `src/lib/errors.test.ts` |
| 2 | `src/lib/dates.test.ts`, `src/lib/format.test.ts` |
| 2 | `src/hooks/use-debounce.test.ts` |
| 2 | `src/stores/remesas-store.test.ts` |
| 2 | `src/lib/charge-remesa.test.ts` |
| 2 | `src/components/remesas/keypad.test.tsx` |
| 2 | `src/components/remesas/history-panel.test.tsx` |
| 3 | `src/components/remesas/remesas-page.test.tsx` |
| 3 | `src/components/remesas/keypad-dialog.test.tsx` |
| 3 | `src/components/layout/app-shell.test.tsx` |
| 3 | `src/App.test.tsx` (routes + placeholders) |

### 4. Environment: jsdom + Testing Library

- **Choice:** `test.environment: 'jsdom'`, setup file that imports `@testing-library/jest-dom/vitest`. DevDeps: `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`.
- **Why:** Hooks (`renderHook`), keypad clicks, and toast spies need a DOM. `window.setTimeout` is what the mock API already uses.
- **Alternative:** happy-dom — slightly faster, weaker `matchMedia`. Default `node` — cannot render keypad/history.

Use `vi.useFakeTimers()` in API, debounce, and charge tests. Advance `280ms` (mock delay) and `300ms` (history debounce) explicitly. Prefer `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })` when both user-event and fake timers run in the same file.

### 5. Isolation seams (smallest production diff)

Module state today:

- `src/api/remesas.ts` holds `let remesas = remesaSeedList.map(...)`.
- `useRemesasStore` is a process-wide Zustand store.

- **Choice:** Export `resetRemesasApi()` from the API module that reclones `remesaSeedList`. In `beforeEach`, call that plus `useRemesasStore.setState({ remesas: [], status: 'idle' })`. Mock `toast.add` in charge-submit tests.
- **Why:** Without a reset, Wave 1 charge tests poison later cases (spec: isolated remesa state).
- **Alternative:** Recreate the module per test with `vi.resetModules()` — slower and breaks alias imports. Persist nothing; do not add localStorage.

Do **not** extract `useRemesasFilter` into a new public helper unless a test cannot call `renderHook`. The hook is the unit.

### 6. What each layer is allowed to assert

- **Schemas / data:** parse success/failure only. No React.
- **Filter hook:** charged-only, sort, page size 10, search fields. Use a small fixture list, not the full seed, except one seed-length check in `remesas.test.ts`.
- **API:** delay + Zod boundary + charge transition + error codes. Fake timers; do not assert UI.
- **Keypad:** display, 8-digit cap, no `**`, confirm calls charge (mock `submitRemesaCharge` **or** use the real store with reset — prefer real store for one success path, mock only if delay makes the test noisy).
- **History:** rows for a **provided** remesa prop list; search box; pagination when `pageCount > 1`; `window.print` spy.
- **Layout:** class contracts (`hidden lg:flex`, `lg:hidden`), not computed layout. Real breakpoint behavior is Playwright.

### 7. Responsive and Dialog in Vitest

jsdom has no real viewport. Do **not** fake `matchMedia` to prove “mobile vs desktop layout”. Wave 3 asserts:

- Inline keypad section: `hidden` + `lg:flex`.
- Dialog trigger: `lg:hidden`.
- Rail vs tabs: inverse `lg` classes.
- Dialog: “Cobrar” opens dialog content containing the keypad.

True `lg` (1024px) and “keypad not in page flow on a phone” belong to Phase 6b.

### 8. Future Playwright change (document only)

Track as a later OpenSpec change (name suggestion: `add-phase-6-e2e`). Do not implement it here. Intended coverage:

| Flow | Why Vitest is not enough |
| --- | --- |
| Type in search, wait debounce, list updates | Real input + layout |
| Click pagination page 2 | Full history + store |
| Desktop keypad charge appears in history | Real `lg` viewport |
| Below `lg`, inline keypad absent; Dialog keypad works | Real viewport + portal |
| Rail hidden / tabs visible below `lg` | Computed style |
| Print CSS hides rail/keypad/tabs | `@media print` |
| Keep existing `tests/app.spec.ts` smoke | Already there |

Phase 7 (Husky pre-push + GitHub Action) can then run `pnpm test` and `pnpm test:e2e`.

## Risks / Trade-offs

- [Charge tests leak across files] → Mandatory `resetRemesasApi` + store reset in a shared `src/test/setup.ts` `beforeEach`.
- [Fake timers + user-event deadlock] → Configure user-event with `advanceTimers`; prefer `renderHook` / direct API calls in Wave 1 so timers stay simple.
- [Toast manager is a singleton] → Spy `toast.add`; do not assert toast DOM in every test.
- [Class-name “responsive” tests can rot if Tailwind class strings change] → Assert tokens that encode the contract (`lg:flex`, `lg:hidden`), not the full `className`.
- [TDD on green code feels backwards] → Wave order is the TDD discipline; a failing Wave 1 test is a bug, not a reason to skip.
- [Overlap with Playwright later] → Vitest owns rules and wiring; Playwright owns real viewport and user journeys.

## Migration Plan

1. Implement on a `feature/phase-6-unit-tests` branch from `master` (or from the remesas feature branch if that PR is not merged). Do not commit to `master`.
2. Wave 0 deps + config + reset seam, then Waves 1 → 3 in order. `pnpm test` must stay green after each wave.
3. `graphify update .` after test files land.
4. Rollback: revert the feature branch; no data migration. Removing tests does not change runtime behavior except the reset export (unused in production).

## Open Questions

None blocking. Assumptions already recorded: Vitest not Jest; no E2E in this change; class-level responsive contracts; extract no new filter module.
