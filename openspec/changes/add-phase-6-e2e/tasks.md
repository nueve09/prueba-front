## 1. Harness

- [x] 1.1 Keep `tests/app.spec.ts` smoke. Optionally set `screenshot: 'only-on-failure'` in `playwright.config.ts`. Do not add browsers, projects, or dependencies.
- [x] 1.2 Add `tests/remesas.spec.ts` with an `enterId` helper that clicks keypad digit **buttons** (`exact: true`). Wait on `Cobrar remesa` `toBeEnabled` after goto. No `waitForTimeout`.

## 2. Desktop journeys (`lg+`)

- [x] 2.1 After load, assert at most 10 history rows with formatted id, company, and amount, and that a `NO_COBRADO` id (for example `#290034`) is absent.
- [x] 2.2 Type a company or amount query into `Buscar remesas` and assert the list updates to matching charged remesas (real debounce).
- [x] 2.3 Click pagination **link** `2` (not the keypad button) and assert a different id slice than page 1.
- [x] 2.4 Enter `290034` on the inline keypad, confirm, assert `#290034` appears in history without opening the Dialog.

## 3. Mobile viewport

- [x] 3.1 At 375×667, assert tabs visible, rail hidden, search visible, inline keypad hidden, `Cobrar` trigger visible.
- [x] 3.2 Open the Dialog, `enterId('311122')`, confirm, assert `#311122` in history.

## 4. Layer B — toast and print

- [x] 4.1 Confirm an unknown or already-charged id and assert the error toast text is visible and no new charged row appears.
- [x] 4.2 On desktop, `emulateMedia({ media: 'print' })` and assert rail, keypad, tabs, search, and pagination are hidden. Do not call `window.print` / generate a PDF.

## 5. Verify

- [x] 5.1 If a journey fails against current UI, fix the smallest a11y or visibility gap. Do not redesign the keypad.
- [x] 5.2 Run `pnpm test` (Vitest only, still green) and `pnpm test:e2e` green, then `graphify update .`.
