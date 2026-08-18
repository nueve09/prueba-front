## Purpose

Playwright journeys that compose the remesas workspace and app shell in a real browser. Vitest keeps domain rules; this suite proves operator flows, viewports, visible errors, and print chrome.

## ADDED Requirements

### Requirement: Playwright is a separate command
The project SHALL run remesas E2E with Playwright via `pnpm test:e2e`. `pnpm test` MUST remain Vitest-only. The suite MUST use Chromium. It MUST NOT add Cypress, Maestro, Playwright component tests, visual snapshots against `maqueta.png`, or extra browsers. Existing smoke in `tests/app.spec.ts` MUST remain.

#### Scenario: Unit command still excludes Playwright
- **WHEN** a developer runs `pnpm test`
- **THEN** Vitest MUST run and Playwright remesas specs MUST NOT run as part of that command

#### Scenario: E2E command runs Chromium remesas flows
- **WHEN** a developer runs `pnpm test:e2e`
- **THEN** Playwright MUST run `tests/app.spec.ts` and the remesas journey specs
- **AND** MUST use Chromium (not Firefox or WebKit as a required matrix)

### Requirement: Desktop operator journeys
On a viewport at the Tailwind `lg` breakpoint (1024px) or wider, Playwright SHALL compose history, search, pagination, and keypad charge. It MUST wait on user-visible state (enabled confirm, row text, toast). It MUST NOT use fixed sleeps, MUST NOT re-assert Zod id `max(8)`, seed length, or debounce implementation, and MUST NOT query keypad digits with the same role as pagination page numbers.

#### Scenario: Loaded history shows ten charged remesas
- **WHEN** the operator opens `/` at `lg` or wider and the list has finished loading
- **THEN** the history MUST show at most 10 remesas
- **AND** each visible row MUST include formatted id, company, and amount
- **AND** a `NO_COBRADO` remesa id MUST NOT appear in the list

#### Scenario: Search filters the charged list
- **WHEN** the operator types a query that matches a charged remesa’s company or amount into the remesa search field
- **THEN** after the real debounce the list MUST include matching charged remesas
- **AND** MUST exclude non-matching charged remesas

#### Scenario: Pagination shows the next page
- **WHEN** more than 10 charged remesas match the current search and the operator activates page 2
- **THEN** the list MUST show a different slice of charged remesas
- **AND** MUST NOT repeat the page 1 ids

#### Scenario: Desktop keypad charges an unpaid remesa
- **WHEN** the operator is at `lg` or wider, the inline keypad is visible, and they enter a valid `NO_COBRADO` id (for example `290034`) and confirm
- **THEN** that remesa’s formatted id MUST appear in the charged history
- **AND** the keypad Dialog MUST NOT be required

### Requirement: Mobile viewport and Dialog charge
Below `lg` the suite SHALL assert computed visibility (not Tailwind class strings) and charge through the Dialog keypad.

#### Scenario: Small viewport shows tabs and history, not the inline keypad
- **WHEN** the remesas route is shown below `lg`
- **THEN** bottom tabs MUST be visible and the icon rail MUST NOT be visible
- **AND** the history search MUST be visible
- **AND** the inline desktop keypad MUST NOT be visible
- **AND** a control to open the charge Dialog MUST be visible

#### Scenario: Mobile Dialog charges an unpaid remesa
- **WHEN** the operator is below `lg`, opens the charge Dialog, enters a valid `NO_COBRADO` id (for example `311122`), and confirms
- **THEN** the Dialog keypad MUST be used
- **AND** that remesa’s formatted id MUST appear in the charged history

### Requirement: Visible error toast
General errors SHALL appear in the app-wide toast DOM after a failed charge. The suite MUST NOT spy on `toast.add`.

#### Scenario: Unknown or already charged id shows a toast
- **WHEN** the operator confirms an id that is not in the list or is already `COBRADO`
- **THEN** a toast MUST become visible
- **AND** the remesa list MUST NOT gain a new charged row for that id

### Requirement: Print media hides chrome
Under print media the suite SHALL assert that shell and keypad chrome marked `print:hidden` are not visible. It MUST NOT generate a PDF file.

#### Scenario: Print media hides rail, keypad, tabs, and list chrome
- **WHEN** the remesas workspace is shown and print media is emulated
- **THEN** the icon rail, inline keypad, bottom tabs, search, and pagination MUST NOT be visible
- **AND** the browser print flow MUST NOT write a PDF file
