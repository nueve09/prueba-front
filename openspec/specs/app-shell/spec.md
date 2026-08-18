# app-shell Specification

## Purpose
Application chrome for the remesas workspace: a three-column desktop layout with a custom icon rail, declarative React Router destinations, and a mobile stacked layout with bottom tabs.

## Requirements

### Requirement: Desktop three-column shell
The application SHALL present the remesas workspace on large viewports as three columns using CSS Grid and/or Flexbox: a narrow left icon rail, a dark central keypad workspace, and a light right history panel. Visual structure SHALL follow `maqueta.png`; pixel-perfect matching is not required.

#### Scenario: Large viewport shows three columns
- **WHEN** the viewport width is at the Tailwind `lg` breakpoint (1024px) or wider
- **THEN** the shell MUST show the icon rail, central workspace, and history panel side by side

#### Scenario: Central workspace is dark and history is light
- **WHEN** the remesas route is displayed on a large viewport
- **THEN** the central column MUST use a dark charcoal treatment and the history column MUST use a light treatment

### Requirement: Custom icon rail navigation
The left navigation SHALL be a custom icon-only rail (not the shadcn Sidebar component). Icons MUST come from lucide-react. One item SHALL represent remesas and be the default destination. Remaining items SHALL navigate to placeholder screens.

#### Scenario: Remesas is the default route
- **WHEN** the user opens the application at `/`
- **THEN** the system MUST show the remesas workspace and mark the remesas rail item as active

#### Scenario: Unused nav items open blank screens
- **WHEN** the user activates a non-remesas rail icon
- **THEN** the system MUST navigate to that route and MUST show a blank placeholder (no remesas keypad or history)

### Requirement: Declarative routing
The application SHALL use React Router Declarative Mode (`BrowserRouter`, `Routes`, `Route`, and link components). It MUST NOT use Data Mode loaders/actions or Framework Mode for this capability.

#### Scenario: Client-side navigation between rail destinations
- **WHEN** the user activates a rail icon
- **THEN** the URL MUST change without a full page reload and the matching route MUST render

### Requirement: Mobile tabs and stacked layout
Below the `lg` breakpoint the application SHALL replace the icon rail with bottom tabs that expose the same destinations. The primary mobile view for remesas SHALL be the history panel. The keypad MUST NOT appear inline on small viewports.

#### Scenario: Small viewport uses tabs instead of the rail
- **WHEN** the viewport width is below `lg`
- **THEN** the icon rail MUST be hidden and bottom tabs MUST be visible with the same destinations as the rail

#### Scenario: Remesas on small viewport shows history, not the inline keypad
- **WHEN** the remesas route is displayed below `lg`
- **THEN** the history panel MUST be visible and the keypad MUST NOT be rendered in the page flow (only via the mobile Dialog defined in the remesas capability)

### Requirement: Chrome omitted from the mockup
The shell SHALL omit the notification bell, operator avatar/name block, and the circular keyboard icon next to the date. The history header MAY show a live “Hoy” label and the current calendar date.

#### Scenario: Decorative mockup chrome is absent
- **WHEN** the remesas workspace is displayed
- **THEN** the UI MUST NOT show a notification bell, operator avatar, operator name, or a keyboard icon control
