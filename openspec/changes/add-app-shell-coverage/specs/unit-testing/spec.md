## ADDED Requirements

### Requirement: Shell layout unit tests
The suite SHALL colocate unit tests next to `IconRail`, `MobileTabs`, and `PlaceholderPage`. Those files MUST assert unique behavior not already covered by `AppShell` class contracts or by `App` route tests. The suite MUST NOT add tests for shadcn primitives (`button`, `tabs`, `dialog`, `input`, `pagination`, `separator`, `toast`).

#### Scenario: IconRail exposes nav destinations and current remesas
- **WHEN** `IconRail` is rendered at `/`
- **THEN** it MUST expose a link for every `APP_NAV_ITEMS` label
- **AND** the remesas link MUST have `aria-current="page"`
- **AND** other rail links MUST NOT have `aria-current="page"`

#### Scenario: MobileTabs exposes the same destinations and navigates
- **WHEN** `MobileTabs` is rendered at `/`
- **THEN** it MUST expose a tab for every `APP_NAV_ITEMS` label
- **WHEN** the operator activates a non-remesas tab
- **THEN** the router location MUST change to that item's path

#### Scenario: PlaceholderPage is a blank title screen
- **WHEN** `PlaceholderPage` is rendered with a title
- **THEN** that title MUST appear as a heading
- **AND** the remesa keypad MUST NOT be present

### Requirement: Router table and click navigation tests
The App route suite SHALL cover every unused `APP_NAV_ITEMS` path and one client-side navigation from remesas to an unused destination. It MUST NOT duplicate IconRail or MobileTabs unit assertions. Playwright MUST remain a separate suite.

#### Scenario: Every unused nav path is a placeholder
- **WHEN** the app is rendered at each non-remesas `APP_NAV_ITEMS` path
- **THEN** a placeholder heading for that destination MUST be present
- **AND** the remesa keypad MUST NOT be present

#### Scenario: Activating a rail destination changes the route
- **WHEN** the app is rendered at `/` and the operator activates the Pagos rail link
- **THEN** the location pathname MUST be `/pagos`
- **AND** the Pagos placeholder MUST render
- **AND** the remesa keypad MUST NOT be present
