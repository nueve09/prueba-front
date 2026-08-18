## 1. Layout unit tests

- [x] 1.1 Add `src/components/layout/icon-rail.test.tsx`: wrap `IconRail` in `MemoryRouter` at `/`, assert a link for every `APP_NAV_ITEMS` label, remesas link `aria-current="page"`, other links not current. Do not assert `lg:` classes.
- [x] 1.2 Add `src/components/layout/mobile-tabs.test.tsx`: wrap `MobileTabs` in `MemoryRouter` at `/`, assert a tab for every `APP_NAV_ITEMS` label, click a non-remesas tab, assert location pathname becomes that item's `to`.
- [x] 1.3 Add `src/components/layout/placeholder-page.test.tsx`: render `PlaceholderPage` with a title, assert that heading, assert remesa keypad is absent.

## 2. Router and screen tests

- [x] 2.1 Extend `src/App.test.tsx` to render the app at every non-remesas `APP_NAV_ITEMS` path and assert the matching placeholder heading plus no remesa keypad.
- [x] 2.2 In `src/App.test.tsx`, from `/`, click the Pagos **link** (`role="link"`, not tab), assert `pathname` is `/pagos`, Pagos heading is shown, and the remesa keypad is absent. Keep the existing `/` remesas heading case.
- [x] 2.3 Leave `app-shell.test.tsx` as the class-contract test (`hidden`/`lg:flex` vs `lg:hidden` + same labels). Do not add Playwright files or shadcn primitive tests.

## 3. Verify

- [x] 3.1 If a new test fails against current chrome, fix the smallest production gap (`aria-current` or a missing route). Do not redesign the shell.
- [x] 3.2 Run `pnpm test` green, then `graphify update .`.
