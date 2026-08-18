## Why

Phases 1–5 of the remesas workspace are implemented, but `pnpm test` still has no Vitest files (`passWithNoTests: true`). The N09 README’s functional rules (list >12, search, pagination of 10 charged remesas, keypad validations, charge transition, general errors, responsive layout) are not executable yet, so regressions can land unnoticed. This change is Phase 6 **unit/integration tests only**.

## What Changes

- Add a Vitest suite (Jest-compatible API already in the repo) that proves the README minimums first, then fills gaps by module, component, and screen section.
- Enable a browser-like Vitest environment (`jsdom`) plus React Testing Library so hooks and components can be asserted without Playwright.
- Colocate tests next to source as `src/**/*.test.ts(x)` (already configured in `vite.config.ts`).
- Add the smallest test seams needed for isolation (reset mock remesa memory and Zustand between cases). Do not change product behavior.
- Document the Playwright E2E follow-up (search, pagination, charge, mobile Dialog, responsive shell) as a later change. Do **not** add E2E cases in this change beyond the existing smoke in `tests/app.spec.ts`.

Assumption: the user asked for “Jest”; this fork already chose **Vitest** (Jest-compatible). Do **not** add Jest. That matches Phase 6 in `add-remesas-ventanilla`.

## Capabilities

### New Capabilities

- `unit-testing`: Vitest contract for README functional rules and remaining unit/integration gaps. Covers schemas, mock API, charge flow, search/pagination, keypad, history, errors, and layout presence. Excludes Playwright E2E.

### Modified Capabilities

- None at proposal time (`openspec/specs/` was empty). After sync, `unit-testing` lives in main specs; `remesas` search matching was tightened to ignore spaces and currency punctuation.

## Impact

- New files under `src/` (`*.test.ts` / `*.test.tsx`) and a Vitest setup file. Possible tiny exports for resetting mock API / store state in tests.
- New devDependencies: `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`. No Jest. No new runtime dependencies.
- `vite.config.ts` test config: `environment: 'jsdom'`, setup file, turn off `passWithNoTests` once the first file exists.
- Does not touch Playwright config or `tests/*.spec.ts` except documenting the future E2E change.
- After apply, `pnpm test` MUST fail the build if the README contract or gap tests fail.
