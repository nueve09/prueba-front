## Why

Vitest already locks schema, seed size, charge rules, filter, debounce, and `lg:` class contracts. Playwright is installed but only smokes that the Remesas heading exists, so the README journeys (search, pagination, keypad charge, real viewports, visible errors, print chrome) are still unproven in a browser. This is Phase 6b: compose those contracts, do not repeat them.

## What Changes

- Add a Playwright remesas suite that drives the operator journeys the N09 README names, plus toast visibility and print-media chrome (layer B from exploration).
- Keep `tests/app.spec.ts` as smoke. Keep `pnpm test` as Vitest-only.
- Use the existing Chromium project and `setViewportSize` for desktop (`lg+`) vs mobile (below `lg`). Do not add a second browser, Cypress, Maestro, POM, visual regression, or axe.
- Do **not** re-assert Zod max(8), seed length, debounce implementation, or Tailwind class strings that Vitest already owns.

## Capabilities

### New Capabilities

- `e2e-testing`: Playwright journeys that compose remesas + app-shell in a real browser: loaded charged list (10), search with real debounce, pagination click, desktop keypad charge, mobile Dialog charge, rail vs tabs by viewport, visible error toast, print media hides chrome. Smoke in `tests/app.spec.ts` remains.

### Modified Capabilities

- `unit-testing`: Playwright remesas flows are no longer “a later change”. They live in `e2e-testing` and MUST NOT run as part of `pnpm test`.

## Impact

- New file `tests/remesas.spec.ts` (optional tiny `enterId` helper in that file). Possible `screenshot: only-on-failure` in `playwright.config.ts`.
- No new dependencies. No production UI unless a journey finds a bug (toast not exposed, confirm never enabled, print class missing).
- Husky pre-push and GitHub Actions that run `pnpm test:e2e` stay Phase 7.
