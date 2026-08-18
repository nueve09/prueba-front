## 1. Phase 1 — Domain

- [x] 1.1 Add Zod remesa schemas (status enum `NO_COBRADO` | `COBRADO`, id digits max 8, amount string, `YYYYMMDD` dates, discriminated union for `charged_at`) and export types with `z.infer` only
- [x] 1.2 Add keypad/search input schemas and validate mock payloads with `safeParse` / list schema (more than 12 remesas, mix of charged and uncharged)
- [x] 1.3 Create mock dataset and mock fetch helpers (`fetchRemesas`, `chargeRemesa`) with artificial delay and Zod at the boundary
- [x] 1.4 Replace the counter Zustand store with a remesas store (list, load, charge); selectors for render, `getState()` in handlers
- [x] 1.5 Remove unused counter schema/UI once the remesas store is wired

## 2. Phase 2 — App shell and routing

- [x] 2.1 Add `react-router` and wrap the app with Declarative Mode (`BrowserRouter`, `Routes`, `Route`, `NavLink`)
- [x] 2.2 Add shadcn primitives needed for the shell and later remesas UI: `sonner`, `dialog`, `tabs`, `input`, `pagination`, `separator` (do not add Sidebar or Toast)
- [x] 2.3 Build a custom lucide icon rail (not shadcn Sidebar) with remesas as default `/` and blank placeholder routes for the other icons
- [x] 2.4 Implement the three-column CSS Grid shell at `lg+` (dark center, light history) without bell, avatar, keyboard icon, or sliders control
- [x] 2.5 Show “Hoy” plus the current calendar date in the history header
- [x] 2.6 Update the existing Playwright smoke so it asserts the remesas workspace instead of the scaffold heading “Prueba Front”

## 3. Phase 3 — Charge keypad (desktop)

- [x] 3.1 Mount the app-wide toaster and map Zod/domain errors to `toast.add`
- [x] 3.2 Build the keypad component (digit display without `**`, backspace, enter; decimal key allowed visually but rejected by id schema)
- [x] 3.3 Render the keypad inline in the central column at `lg+` and wire confirm to `chargeRemesa` (uncharged → `COBRADO` + today’s `charged_at`; already charged / unknown / invalid → toast, no mutation)

## 4. Phase 4 — History search, pagination, print

- [x] 4.1 Implement generic `useDebounce`
- [x] 4.2 Implement `useRemesasFilter` (id, company, or amount; only `COBRADO`; sort by `charged_at` desc; page size 10)
- [x] 4.3 Render history rows (`id`, `company`, `amount`) with a text search input and shadcn Pagination
- [x] 4.4 Add a print control that calls `window.print()` and a minimal `@media print` stylesheet hiding rail/keypad/tabs

## 5. Phase 5 — Mobile

- [x] 5.1 Replace the icon rail below `lg` with bottom tabs to the same destinations; remesas shows history, not an inline keypad
- [x] 5.2 Add a mobile-only control that opens a Dialog containing the same keypad component (Dialog MUST NOT be used for the keypad at `lg+`)
- [x] 5.3 Run `graphify update .` after the feature files land

## Future (out of scope for this change)

Do not implement these during `/opsx-apply` of `add-remesas-ventanilla`. Track them as later OpenSpec changes.

- Phase 6 — Tests: **unit/integration shipped** in `add-phase-6-unit-tests` (Vitest, Jest-compatible API; no Jest). **Still later:** Playwright E2E (`add-phase-6-e2e`) covering search typing, pagination clicks, desktop keypad charge, mobile Dialog, and real `lg` breakpoints
- Phase 7 — Git gates: Husky **pre-push** that rejects branches not matching GitFlow (`feature/<kebab>` | `fix/<kebab>`) and blocks push unless lint + tests pass; GitHub Action with the same checks on PR/push
- Phase 8 — README: visible note that the assignment allows **vanilla (html + css + js)** or **the library/framework of your choice**, plus a short rationale for this stack (tool fluency, adaptability, architecture, spec-driven development with AI)
