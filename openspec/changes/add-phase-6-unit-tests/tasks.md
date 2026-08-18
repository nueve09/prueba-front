## 1. Wave 0 — Vitest harness

- [x] 1.1 Add devDependencies with pnpm: `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` (do not add Jest)
- [x] 1.2 Point Vitest at `environment: 'jsdom'`, a setup file, and turn off `passWithNoTests` in `vite.config.ts`
- [x] 1.3 Create `src/test/setup.ts` that imports `@testing-library/jest-dom/vitest` and, in `beforeEach`, resets the remesa API memory and `useRemesasStore` to `{ remesas: [], status: 'idle' }`
- [x] 1.4 Export `resetRemesasApi()` from `src/api/remesas.ts` that reclones `remesaSeedList` (no product behavior change)

## 2. Wave 1 — README contract (TDD, domain first)

- [x] 2.1 Add `src/lib/schemas.test.ts`: id max 8 digits (accept `12345678`, reject empty / non-digit / 9 digits); `COBRADO` vs `NO_COBRADO` charged_at rules
- [x] 2.2 Add `src/data/remesas.test.ts`: seed length > 12, mix of charged and uncharged, each item has `id` / `company` / `amount` (string) / `status` / `created_at` / `charged_at`
- [x] 2.3 Add `src/hooks/use-remesas-filter.test.ts` via `renderHook`: search by id, company, or amount; exclude `NO_COBRADO`; empty query returns only `COBRADO` sorted by `charged_at` desc; page 1 size ≤ 10; page 2 is the next slice with no repeated ids (use a fixture list, not the full seed, except where page size needs >10 charged)
- [x] 2.4 Add `src/api/remesas.test.ts` with fake timers: charge a `NO_COBRADO` id → `COBRADO` + today’s `YYYYMMDD`; reject already charged, unknown, empty, non-digit, and >8 digit ids without mutating the list
- [x] 2.5 Add `src/lib/errors.test.ts`: `formatUnknownError` for Zod, `RemesaApiError` already-charged / not-found, and unknown values
- [x] 2.6 Run `pnpm test` and stop if Wave 1 is not green before starting Wave 2

## 3. Wave 2 — Gaps by module, then component

- [x] 3.1 Extend schema tests (same file or keep in `schemas.test.ts`): compact dates, amount, company, search query, page schema
- [x] 3.2 Add `src/lib/dates.test.ts` and `src/lib/format.test.ts` for compact/today/long date and amount/id/search normalize helpers
- [x] 3.3 Add `src/api/remesas.test.ts` cases: `fetchRemesas` returns the parsed seed; invalid in-memory payload is rejected
- [x] 3.4 Add `src/hooks/use-debounce.test.ts` with fake timers (value unchanged before delay, updates after)
- [x] 3.5 Add `src/stores/remesas-store.test.ts`: load populates and becomes `ready`; second load while `ready` does not refetch; charge replaces only the matching remesa
- [x] 3.6 Add `src/lib/charge-remesa.test.ts`: spy `toast.add`; invalid/unchargeable ids return `false` and toast error; valid uncharged id returns `true`
- [x] 3.7 Add `src/components/remesas/keypad.test.tsx`: digits without `**`; cap at 8 digits; confirm on ready store charges and clears; decimal confirm does not mutate and shows an error toast
- [x] 3.8 Add `src/components/remesas/history-panel.test.tsx`: rows show formatted id, company, amount; search input present; pagination when more than one page; print button calls `window.print`
- [x] 3.9 Run `pnpm test` and stop if Wave 2 is not green before starting Wave 3

## 4. Wave 3 — Gaps by screen section

- [x] 4.1 Add `src/components/remesas/remesas-page.test.tsx`: mount calls store load; history renders; inline keypad section has `hidden` and `lg:flex`
- [x] 4.2 Add `src/components/remesas/keypad-dialog.test.tsx`: “Cobrar” is `lg:hidden`; opening the Dialog shows the keypad (wrap with router/toast as needed)
- [x] 4.3 Add `src/components/layout/app-shell.test.tsx` (MemoryRouter): rail `hidden lg:flex`, tabs `lg:hidden`, both expose `APP_NAV_ITEMS` destinations
- [x] 4.4 Add `src/App.test.tsx`: `/` shows Remesas heading; `/pagos` shows placeholder and no keypad
- [x] 4.5 Assert history header includes `Hoy` and does not include bell / operator avatar / operator name (in history-panel or remesas-page test, do not duplicate)
- [x] 4.6 Confirm no new Playwright files under `tests/`; leave `tests/app.spec.ts` unchanged
- [x] 4.7 Run `pnpm test` (full suite green) and `graphify update .`

## Future (out of scope — do not implement)

Do not add Playwright specs during `/opsx-apply` of `add-phase-6-unit-tests`. Track as a later change `add-phase-6-e2e`:

- Search typing + debounce updates the visible list
- Pagination click shows page 2
- Desktop (`lg+`) inline keypad charge appears in history
- Below `lg`, inline keypad absent; Dialog keypad works
- Rail hidden / tabs visible below `lg`
- `@media print` hides rail, keypad, and tabs
- Keep the existing `tests/app.spec.ts` smoke
