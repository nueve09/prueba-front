## Context

Playwright is already wired (`@playwright/test`, `pnpm test:e2e`, `playwright.config.ts` Chromium + Vite `webServer`). `tests/app.spec.ts` only checks the Remesas heading. Vitest owns schema, seed, charge, filter, debounce, and `lg:` class strings.

The mock API is in-memory **in the browser** (`MOCK_DELAY_MS = 280`). Each `page.goto` reloads the module graph, so workers do not leak charges. Confirm is disabled until the store is `ready`. History debounce is 300 ms real time. Seed: 16 `COBRADO` (two pages of 10) and unpaid ids `290034` / `311122`. Tailwind `lg` is 1024px. Default Desktop Chrome viewport is 1280×720.

Print hiding is Tailwind `print:hidden` on rail, keypad section, tabs, search, pagination — not a fat `@media print` block.

## Goals / Non-Goals

**Goals:**

- Compose README operator flows in Chromium: 10 charged rows, search, pagination, desktop charge, mobile Dialog charge, rail vs tabs.
- Layer B: visible error toast after a failed charge; print media hides chrome.
- Keep Vitest as `pnpm test`. Keep the existing smoke spec.

**Non-Goals:**

- Cypress, Maestro, extra browsers, Playwright component testing, POM folders, axe, Lighthouse, visual diffs vs `maqueta.png`.
- Re-testing Zod `max(8)`, seed length >12, debounce internals, or `hidden lg:flex` class strings.
- Husky pre-push / GitHub Action `test:e2e` (Phase 7).
- Clock mocking (`charged_at` is not shown in rows).

## Decisions

### 1. One file, one browser, viewport in the test

- **Choice:** `tests/remesas.spec.ts` plus existing `tests/app.spec.ts`. One Chromium project. Desktop describe at 1280×720 (or leave default). Mobile describe calls `setViewportSize({ width: 375, height: 667 })`.
- **Why:** A second Playwright project would run every test twice. The app has one breakpoint (`lg`).
- **Alternative:** `Pixel 5` project + grep tags — extra CI time. Rejected for N09.

### 2. Role locators, scoped so keypad ≠ pagination

- **Choice:** `getByRole('searchbox', { name: 'Buscar remesas' })`. Digit keys: `getByRole('button', { name: digit, exact: true })`. Page 2: `getByRole('link', { name: '2' })` (PaginationLink is an `<a>`). Confirm: `Cobrar remesa`. Mobile trigger: `Cobrar`. Dialog: `getByRole('dialog')`. Charged id: `#290034` (`formatRemesaId`).
- **Why:** Matches Playwright locator priority and the a11y already in the UI. No `data-testid`.
- **Alternative:** CSS / test ids — rejected unless a journey cannot find a role.

### 3. Wait on UI, never `waitForTimeout`

- **Choice:** After goto, `await expect(confirm).toBeEnabled()` (covers 280 ms load). After search, `await expect(page.getByText('MoneyGram')).toHaveCount(0)` (or similar) until debounce settles. After charge, `await expect(page.getByText('#290034')).toBeVisible()`.
- **Why:** Fixed sleeps flake when the machine is slow or fast.
- **Alternative:** Fake timers in Playwright — fights the real debounce the suite exists to prove.

### 4. Tiny `enterId` helper, no POM

- **Choice:** A function in `remesas.spec.ts` that clicks digit buttons for `'290034'`.
- **Why:** Used twice (desktop + mobile). A page object for eight tests is more files than journeys.
- **Alternative:** Full `pages/remesas-page.ts` — rejected (YAGNI).

### 5. Toast from the DOM; print via `emulateMedia`

- **Choice:** Failed charge (unknown id or already `COBRADO` such as `29939303`) → `getByText('La remesa no existe')` or `ya fue cobrada` visible in the toast. Print: `page.emulateMedia({ media: 'print' })` then `toBeHidden()` on rail / keypad / tabs / search / pagination. Do not click Imprimir (that opens the OS dialog).
- **Why:** Vitest spies `toast.add` and cannot apply print media. Layer B is these two proofs.
- **Alternative:** Spy print / intercept `window.print` — does not prove `print:hidden`.

### 6. Isolation is a full page load

- **Choice:** Each test `goto('/')` (or relies on Playwright’s fresh context). Do not share a page across charge tests. Unpaid ids: `290034` desktop, `311122` mobile, so even a leaked store would not collide.
- **Why:** Client mock resets on reload. Distinct ids make a leak obvious.
- **Alternative:** `resetRemesasApi` from Playwright — would need a window hook. Extra product API. Rejected unless tests flake.

### 7. Production diff only if a journey fails

- **Choice:** Write tests against current UI first. If toast text is not in the accessibility tree, or confirm never enables, fix the smallest DOM/a11y gap. Do not redesign the keypad.
- **Why:** Same contract-TDD stance as Phase 6a.

## Risks / Trade-offs

- [Keypad `2` vs pagination `2`] → button vs link roles; `exact: true` on digits.
- [Two “Remesas” headings on mobile] → assert searchbox / tabs, not heading count.
- [Confirm disabled during load] → wait `toBeEnabled` before digits+confirm.
- [Toast role may be generic] → assert visible error string from `remesaErrorMessage`.
- [Print test at 375 hides rail anyway] → run print emulation on desktop viewport so rail would be visible in screen media.
- [Parallel workers] → client-only mock; still use distinct unpaid ids.

## Migration Plan

1. Implement on a `feature/phase-6-e2e` branch (or the assignment named branch). Do not commit to `master`.
2. Add `tests/remesas.spec.ts`, optionally `screenshot: 'only-on-failure'` in config. Keep smoke.
3. `pnpm test` green (unchanged count of Vitest files except none added). `pnpm test:e2e` green.
4. `graphify update .`
5. Rollback: delete `tests/remesas.spec.ts`; revert config if touched.

## Open Questions

None blocking. Assumptions: desktop default Chromium viewport is already `lg`; mobile is 375×667; search example `western union` or a unique amount; print test does not call `window.print`.
