## Why

The N09 assignment asks for a client-side remesas teller (Ventanilla Digital) based on `maqueta.png`: enter a remesa id, charge it if unpaid, and list charged remesas with search and pagination. The repo is still a counter scaffold, so the exercise is unimplemented.

## What Changes

- Replace the scaffold counter UI with a three-column desktop shell (icon rail, dark keypad workspace, light history panel) and a mobile layout (bottom tabs + history; keypad only inside a Dialog).
- Add a remesas domain modeled and typed with Zod (`z.infer`), including a `NO_COBRADO` | `COBRADO` status enum and id validation of max 8 digits as in the README.
- Simulate API calls with a mock fetch layer (delayed, Zod-validated). Persist list and charge mutations in Zustand.
- Make the keypad functional: validate input, reject already-charged or unknown ids, set `charged_at` and status to `COBRADO` on success. Surface errors with the app-wide toast (shadcn Base UI `toast`, not Sonner).
- Add history search by id, company, or amount (`useDebounce` + filter hook), pagination of 10 charged remesas sorted by `charged_at` (shadcn Pagination), and a minimal print action (`window.print`).
- Route unused nav icons with React Router **Declarative Mode**; those screens stay blank. Icons come from lucide-react (already in the stack).
- Use CSS Grid/Flexbox and Tailwind default breakpoints. Visual fidelity follows the mockup’s structure and palette; pixel-perfect matching is out of scope.

Intentionally omitted from the mockup: notification bell, operator avatar/name, keyboard icon next to “Hoy”, and `**` prefix on the keypad display.

**Out of scope for this change (later phases):** Playwright E2E (`add-phase-6-e2e`), Husky pre-push (branch naming + tests), GitHub Actions CI, and README notes about choosing a framework instead of vanilla. Phase 6 **unit tests** shipped in `add-phase-6-unit-tests`. See design.md for the roadmap.

## Capabilities

### New Capabilities

- `app-shell`: Desktop three-column layout, custom icon rail (not shadcn Sidebar), mobile bottom tabs, React Router Declarative Mode, blank placeholder routes, responsive breakpoints.
- `remesas`: Remesa schema/types, mock API, charge flow, keypad (inline on desktop, Dialog on mobile), history search/filter/pagination/print, app-wide toast errors.

### Modified Capabilities

- None at proposal time. After sync, `remesas` and `app-shell` live in `openspec/specs/`. Search matching was tightened to ignore spaces and currency punctuation.

## Impact

- Replaces `src/App.tsx` and the demo Zustand counter as the main UI.
- New client-only modules: Zod schemas, mock remesas data/API, remesas store, `useDebounce` / remesas filter hooks, layout and remesas feature components.
- New runtime dependency: `react-router` (Declarative Mode). New shadcn primitives: pagination, toast, dialog, tabs, input, separator (and similar layout pieces). No backend.
- Icons: lucide-react only (README allows a library of choice; Font Awesome is not added).
- Existing Playwright smoke test will need an update when the heading “Prueba Front” disappears; that update belongs to a later quality phase, not this change.
