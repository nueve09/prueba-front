# unit-testing Specification

## Purpose
Vitest unit and component tests that lock N09 README functional rules and remaining implementation gaps. Playwright E2E is a separate suite.

## Requirements

### Requirement: Vitest runner with Jest-compatible API
The project SHALL run unit and component tests with Vitest. It MUST NOT add Jest as a second runner. Tests MUST live under `src/` as `*.test.ts` or `*.test.tsx`. `pnpm test` MUST execute Vitest and MUST fail when any of those tests fail. A browser-like environment MUST be available so DOM, `window.setTimeout`, and React components can be asserted.

#### Scenario: Unit command runs Vitest only
- **WHEN** a developer runs `pnpm test`
- **THEN** Vitest MUST run the files matching `src/**/*.{test,spec}.{ts,tsx}` and MUST NOT invoke Playwright

#### Scenario: Empty suite is not allowed
- **WHEN** the unit test files exist
- **THEN** Vitest MUST NOT treat an empty suite as success (`passWithNoTests` MUST be off or unused)

### Requirement: README contract tests
The suite SHALL include executable contracts for the N09 README functional minimums. They MUST cover domain, mock API, charge rules, and history filter/pagination, not only component chrome.

#### Scenario: Dataset has more than twelve remesas
- **WHEN** the seed list is validated with `remesaListSchema`
- **THEN** parsing MUST succeed and the list length MUST be greater than 12
- **AND** the list MUST include at least one `COBRADO` and one `NO_COBRADO` remesa
- **AND** each item MUST have `id`, `company`, `amount` (string), `status`, `created_at`, and `charged_at`

#### Scenario: Remesa id accepts at most eight digits
- **WHEN** `remesaIdSchema` parses `"12345678"`
- **THEN** validation MUST succeed
- **WHEN** it parses `"123456789"` or a non-digit value or an empty string
- **THEN** validation MUST fail

#### Scenario: Status is only NO_COBRADO or COBRADO
- **WHEN** a remesa payload is parsed
- **THEN** `status` MUST be `NO_COBRADO` or `COBRADO`
- **AND** a `COBRADO` remesa MUST have a calendar `charged_at` in `YYYYMMDD`
- **AND** a `NO_COBRADO` remesa MUST have empty `charged_at`

#### Scenario: Search matches id, company, or amount among charged remesas
- **WHEN** `useRemesasFilter` (or the equivalent filter used by history) receives a query that matches a charged remesa’s id, company, or amount
- **THEN** the result MUST include that remesa
- **AND** MUST exclude remesas that do not match
- **AND** MUST exclude every `NO_COBRADO` remesa even if the query matches their fields

#### Scenario: Search ignores spaces and currency punctuation
- **WHEN** the filter receives a company query with spaces (for example `western union`) or an amount with `$` or commas
- **THEN** matching charged remesas MUST still be included

#### Scenario: History shows at most ten charged remesas sorted by charged_at
- **WHEN** the search query is empty and more than 10 remesas are `COBRADO`
- **THEN** page 1 MUST contain at most 10 items
- **AND** every item MUST have `status` `COBRADO`
- **AND** items MUST be ordered by `charged_at` descending
- **AND** each item MUST expose `id`, `company`, and `amount`

#### Scenario: Pagination returns the next slice of charged remesas
- **WHEN** more than 10 charged remesas match the current query and page 2 is requested
- **THEN** the result MUST be the next slice of 10 or fewer matching charged remesas
- **AND** MUST NOT repeat page 1 ids

#### Scenario: Charge turns an uncharged remesa into COBRADO with today’s date
- **WHEN** `chargeRemesa` (or the store charge action) is called with a valid id whose remesa is `NO_COBRADO`
- **THEN** that remesa MUST become `COBRADO`
- **AND** `charged_at` MUST be today’s compact `YYYYMMDD` date
- **AND** a later filter of charged remesas MUST include that id

#### Scenario: Charge rejects already charged, unknown, and invalid ids
- **WHEN** the charge path is called with an already `COBRADO` id, an id not in the list, an empty value, a non-digit value, or an id longer than 8 digits
- **THEN** the remesa list MUST NOT change
- **AND** the call MUST fail with a domain or validation error (not a silent success)

#### Scenario: General errors are formatted for the app-wide error UI
- **WHEN** `formatUnknownError` receives a Zod error, a `RemesaApiError`, or an unknown value
- **THEN** it MUST return a non-empty user-facing string
- **AND** already-charged MUST map to the already-charged message
- **AND** not-found MUST map to the not-found message

### Requirement: Module and component gap tests
The suite SHALL cover modules and components that the README does not name but that the implementation uses, without duplicating README contract assertions. Overlaps MUST be avoided by testing a unique behavior per file (schema vs API vs hook vs UI).

#### Scenario: Compact dates reject non-calendar days
- **WHEN** `compactDateSchema` parses `"20231340"` or a non-`YYYYMMDD` string
- **THEN** validation MUST fail
- **WHEN** it parses a real calendar day such as `"20231203"`
- **THEN** validation MUST succeed

#### Scenario: Search query and page schemas reject invalid input
- **WHEN** `searchQuerySchema` parses a string with control characters or longer than 64 characters
- **THEN** validation MUST fail
- **WHEN** `pageSchema` parses `0` or a non-integer
- **THEN** validation MUST fail

#### Scenario: Amount and company schemas match the remesa shape
- **WHEN** `remesaAmountSchema` parses a numeric string with optional two decimal places
- **THEN** validation MUST succeed
- **WHEN** it parses a non-numeric amount
- **THEN** validation MUST fail
- **WHEN** `remesaCompanySchema` parses a blank or whitespace-only company
- **THEN** validation MUST fail

#### Scenario: Mock fetch validates at the boundary
- **WHEN** `fetchRemesas` runs against the seed list
- **THEN** it MUST return a Zod-parsed list
- **WHEN** the in-memory list is replaced with an invalid payload
- **THEN** `fetchRemesas` MUST reject and MUST NOT return that payload as remesas

#### Scenario: Debounce delays the value
- **WHEN** `useDebounce` is given a new value and the delay has not elapsed
- **THEN** the returned value MUST still be the previous one
- **WHEN** the delay elapses
- **THEN** the returned value MUST equal the latest input

#### Scenario: Store load is idempotent while ready
- **WHEN** `useRemesasStore.load` succeeds
- **THEN** `status` MUST be `ready` and `remesas` MUST be populated
- **WHEN** `load` is called again while `ready`
- **THEN** it MUST NOT start a second fetch

#### Scenario: Store charge replaces the matching remesa in state
- **WHEN** `useRemesasStore.charge` succeeds for a `NO_COBRADO` id
- **THEN** the store list MUST contain the updated `COBRADO` remesa at that id
- **AND** other remesas MUST stay unchanged

#### Scenario: Charge submit maps failures to error toasts
- **WHEN** `submitRemesaCharge` is called with an invalid or unchargeable id
- **THEN** it MUST return `false`
- **AND** it MUST add an error toast
- **WHEN** it is called with a valid uncharged id
- **THEN** it MUST return `true`

#### Scenario: Keypad collects digits without a star prefix
- **WHEN** the operator presses digit keys on `RemesaKeypad`
- **THEN** the display MUST show those digits (optionally spaced) and MUST NOT show a `**` prefix
- **WHEN** nine digit keys are pressed
- **THEN** the displayed id MUST still have at most 8 digits

#### Scenario: Keypad confirm uses the charge path
- **WHEN** the store is `ready` and the operator confirms a valid uncharged id on the keypad
- **THEN** the charge path MUST run
- **AND** the display MUST clear on success
- **WHEN** the operator confirms a value that includes a decimal point
- **THEN** the remesa list MUST NOT change and an error toast MUST be shown

#### Scenario: History panel renders id, company, and amount for the filtered page
- **WHEN** `RemesaHistoryPanel` receives a list with charged remesas
- **THEN** each visible row MUST show formatted id, company, and amount
- **AND** a search input labeled for remesa search MUST be present
- **AND** pagination controls MUST appear when there is more than one page

#### Scenario: Print control calls the browser print flow
- **WHEN** the operator activates the print control on the history panel
- **THEN** `window.print` MUST be called
- **AND** the app MUST NOT generate a PDF file

### Requirement: Screen section tests
The suite SHALL cover visible screen sections (shell, remesas workspace, mobile keypad entry, placeholders). Viewport-true layout (real `lg` breakpoint, Dialog vs inline keypad in a browser) MAY be asserted only as class/presence contracts in Vitest; full visual/responsive proof belongs to Playwright.

#### Scenario: Remesas page loads the store and shows history
- **WHEN** `RemesasPage` mounts
- **THEN** the store load path MUST be invoked
- **AND** the history panel MUST render
- **AND** the inline keypad section MUST use the desktop-only visibility classes (`hidden` by default, `lg:flex`)

#### Scenario: Mobile keypad trigger is not in the desktop keypad column
- **WHEN** `RemesaHistoryPanel` renders
- **THEN** the “Cobrar” Dialog trigger MUST be marked `lg:hidden`
- **AND** `RemesaKeypadDialog` MUST wrap the keypad in a Dialog (not as a second inline desktop keypad)

#### Scenario: Shell uses rail on large viewports and tabs on small
- **WHEN** `AppShell` renders
- **THEN** the icon rail MUST be `hidden` by default and `lg:flex`
- **AND** the bottom tabs MUST be visible by default and `lg:hidden`
- **AND** both MUST expose the same destinations from `APP_NAV_ITEMS`

#### Scenario: Default route is remesas and unused routes are placeholders
- **WHEN** the app is rendered at `/`
- **THEN** the remesas workspace heading MUST be present
- **WHEN** the app is rendered at a non-remesas nav path such as `/pagos`
- **THEN** a placeholder screen MUST render
- **AND** the remesa keypad MUST NOT be present

#### Scenario: History header shows Hoy and omits mockup chrome
- **WHEN** the remesas history header is rendered
- **THEN** it MUST include the text `Hoy`
- **AND** it MUST NOT include a notification bell, operator avatar, or operator name

### Requirement: Isolated remesa state between tests
Mock remesa memory and the Zustand store MUST be reset between tests so charge mutations cannot leak. Tests MUST use fake timers (or equivalent) for mock delay and debounce so the suite stays fast and deterministic.

#### Scenario: A charge in one test does not appear in the next
- **WHEN** test A charges a `NO_COBRADO` remesa and test B later loads the list without charging
- **THEN** test B MUST still see that remesa as `NO_COBRADO` unless it charges it itself

### Requirement: Playwright E2E is a separate suite
`pnpm test` MUST NOT run Playwright. Remesas E2E coverage (search typing, pagination clicks, charge on desktop keypad, mobile Dialog, real viewport breakpoints) SHALL live in a later OpenSpec change. The existing smoke in `tests/app.spec.ts` MAY remain.

#### Scenario: Unit command excludes Playwright remesas flows
- **WHEN** a developer runs `pnpm test`
- **THEN** no new Playwright remesas-flow specs MUST run as part of that command
- **AND** `pnpm test` MUST still exclude Playwright
