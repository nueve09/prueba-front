## MODIFIED Requirements

### Requirement: Custom icon rail navigation
The left navigation SHALL be a custom icon-only rail (not the shadcn Sidebar component). Icons MUST come from lucide-react. One item SHALL represent remesas and be the default destination. Remaining items SHALL navigate to placeholder screens. Every `APP_NAV_ITEMS` destination except remesas MUST have a dedicated placeholder route.

#### Scenario: Remesas is the default route
- **WHEN** the user opens the application at `/`
- **THEN** the system MUST show the remesas workspace and mark the remesas rail item as the current page (`aria-current="page"`)

#### Scenario: Unused nav items open blank screens
- **WHEN** the user activates a non-remesas rail icon
- **THEN** the system MUST navigate to that route and MUST show a blank placeholder (no remesas keypad or history)

#### Scenario: Every unused destination has a placeholder
- **WHEN** the application is opened at each non-remesas path in `APP_NAV_ITEMS`
- **THEN** that path MUST render a placeholder heading for that destination
- **AND** the remesa keypad MUST NOT be present

### Requirement: Declarative routing
The application SHALL use React Router Declarative Mode (`BrowserRouter`, `Routes`, `Route`, and link components). It MUST NOT use Data Mode loaders/actions or Framework Mode for this capability.

#### Scenario: Client-side navigation between rail destinations
- **WHEN** the user activates a rail icon
- **THEN** the URL MUST change without a full page reload and the matching route MUST render

#### Scenario: Rail click updates location
- **WHEN** the remesas workspace is shown and the operator activates a non-remesas rail link
- **THEN** the location pathname MUST become that item's path
- **AND** the matching placeholder MUST render without a full document reload

### Requirement: Mobile tabs and stacked layout
Below the `lg` breakpoint the application SHALL replace the icon rail with bottom tabs that expose the same destinations. The primary mobile view for remesas SHALL be the history panel. The keypad MUST NOT appear inline on small viewports. Activating a tab MUST navigate to that destination.

#### Scenario: Small viewport uses tabs instead of the rail
- **WHEN** the viewport width is below `lg`
- **THEN** the icon rail MUST be hidden and bottom tabs MUST be visible with the same destinations as the rail

#### Scenario: Remesas on small viewport shows history, not the inline keypad
- **WHEN** the remesas route is displayed below `lg`
- **THEN** the history panel MUST be visible and the keypad MUST NOT be rendered in the page flow (only via the mobile Dialog defined in the remesas capability)

#### Scenario: Activating a tab navigates
- **WHEN** the operator activates a bottom tab whose destination is not the current path
- **THEN** the system MUST navigate to that destination
- **AND** the matching route MUST render
