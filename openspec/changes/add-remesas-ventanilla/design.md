## Context

The repo is a Vite + React 19 + TypeScript scaffold with Tailwind v4, shadcn/ui (radix-nova), Zustand, Zod, Husky (pre-commit lint only), Vitest, and Playwright. `src/App.tsx` still shows a demo counter. The N09 README requires a remesas teller based on `maqueta.png`, client-side only.

This design covers the product change (shell + remesas). Quality gates, CI, and README rationale notes are documented as later phases and are not implemented in this change.

## Goals / Non-Goals

**Goals:**

- Ship a usable Ventanilla Digital remesas workspace aligned with README functional rules and the mockup’s three-column structure.
- Type and validate remesas with Zod (`z.infer`), including status enum and id `max(8)`.
- Charge flow on a keypad: inline on desktop, Dialog-only on mobile.
- Search (debounced), paginate charged remesas (10, by `charged_at`), print with `window.print`, errors via Sonner.
- Route unused nav destinations as blank screens using React Router Declarative Mode.
- Phase the work so apply can proceed incrementally.

**Non-Goals:**

- Pixel-perfect reproduction of `maqueta.png`.
- Backend, auth, notifications, operator profile, keyboard icon, or `**` prefix on the display.
- shadcn Sidebar, Font Awesome, React Router Data/Framework Mode, shadcn Toast (deprecated; Sonner replaces it).
- Adding Jest (the repo already has Vitest). Automated coverage of the exercise, pre-push hooks, GitHub Actions, and README stack-rationale copy are **future phases**, not this change.

## Phased roadmap

```
THIS CHANGE
───────────
Phase 1  Domain          Zod schemas, mock data (>12), mock fetch, Zustand
Phase 2  App shell       Icon rail, Declarative Router, blank routes, Grid layout
Phase 3  Charge UI       Inline keypad (lg+), Sonner, charge mutation
Phase 4  History         Search input, useDebounce, filter hook, Pagination, print
Phase 5  Mobile          Bottom tabs, keypad Dialog only below lg

FUTURE CHANGES (do not implement now)
─────────────────────────────────────
Phase 6  Tests           Vitest (unit/integration) + Playwright (E2E) for README flows
Phase 7  Git gates       Husky pre-push: branch name (GitFlow) + tests must pass
                         GitHub Action mirroring the same checks on PR/push
Phase 8  README notes    Visible note: README allows library/framework of choice
                         (not vanilla-only); short rationale (tools, SDD, AI)
```

## Decisions

### 1. Custom icon rail, not shadcn Sidebar

- **Choice:** Narrow icon-only rail built with Flexbox + lucide-react + React Router `NavLink`.
- **Why:** The mockup is a kiosk rail, not a labeled sidebar. lucide is already the shadcn icon library.
- **Alternative:** shadcn Sidebar — rejected (labels, collapse chrome, wrong density). Font Awesome — rejected to avoid a second icon pack.

### 2. React Router Declarative Mode

- **Choice:** `BrowserRouter` + `Routes` + `Route` + `NavLink`. Placeholder components for non-remesas paths.
- **Why:** Requested explicitly; enough for icon destinations without loaders.
- **Alternative:** Data Mode (`createBrowserRouter`) — extra API surface. Zustand “current screen” — no real URLs.

### 3. Zod as the source of types

- **Choice:** Module-level schemas; `export type Remesa = z.infer<typeof remesaSchema>`. Status via `z.enum(['NO_COBRADO', 'COBRADO'])`. Prefer a discriminated union so `charged_at` is required only when `COBRADO`. Id: digits, length 1–8 (`max(8)`). `amount` stays a string as in the README. Compact dates `YYYYMMDD` with a calendar refine. `safeParse` at keypad, search, and mock-API boundaries; Sonner maps `ZodError.issues`.
- **Why:** Matches “schema also used for TypeScript” and “maximum validations”.
- **Alternative:** Hand-written interfaces + Zod — drifts. `z.enum` vs TS enum — Zod enum keeps runtime and types aligned.

### 4. Mock fetch + Zustand

- **Choice:** In-memory dataset; `fetchRemesas` / `chargeRemesa` with delay; parse with Zod; store holds the list. UI selects with narrow Zustand selectors; handlers use `getState()`.
- **Why:** No backend; simulates API without React Query.
- **Alternative:** Static import with no delay — weaker demo. React Query — extra dependency.

### 5. Hooks: `useDebounce` + remesas filter

- **Choice:** Generic `useDebounce(value, ms)` (≈300ms). `useRemesasFilter` applies query to id/company/amount, keeps `COBRADO`, sorts by `charged_at` desc, slices 10 per page.
- **Why:** README search + pagination; keeps debounce reusable.
- **Assumption:** No extra “sliders” filter control (mockup chrome, not in README). Search is a text input, not a magnifying-glass icon-only button.

### 6. Keypad: desktop inline, mobile Dialog only

- **Choice:** Same keypad component. Parent renders it in the center column at `lg+`. Below `lg`, a control opens shadcn Dialog containing that keypad. No keyboard icon next to “Hoy”. Display shows spaced digits without `**`. Decimal key may exist for mockup structure; Zod rejects non-digit ids on confirm.
- **Why:** Closed in exploration: Dialog is mobile-only for the calculator.
- **Alternative:** Always Dialog — fights the desktop mockup. Sheet/Drawer — extra pattern.

### 7. Sonner for general errors

- **Choice:** `pnpm dlx shadcn@latest add sonner`; root `<Toaster />`; `toast.error` for validation, not found, already charged, mock failures.
- **Why:** shadcn documents Sonner as the Toast replacement (Toast deprecated).
- **Alternative:** Custom error banner — extra UI. Alert dialog — heavier for field errors.

### 8. Layout and responsive

- **Choice:** CSS Grid for the three columns; Flexbox for rail, keypad grid, history rows. Tailwind default `lg` (1024px) as the desktop/mobile split. Semantic tokens plus a few mockup accents (charcoal, cyan, royal blue). “Hoy” + formatted current date in the history header.
- **Why:** README requires Grid/Flexbox; user asked for default Tailwind/shadcn breakpoints; pixel-perfect is discarded.
- **Alternative:** `md` split — too tight for three columns.

### 9. Print

- **Choice:** `window.print()` plus `@media print` to hide rail/keypad/tabs.
- **Why:** Minimum that makes the control work. No PDF library.

### 10. Future quality stack (not this change)

- **Tests:** Prefer **Vitest** (already configured; `src/**/*.test.ts`) plus **Playwright** (already in `tests/`). Do not add Jest — it would duplicate the runner. Cover README flows: list >12, search, pagination of 10 charged, keypad validations, charge transition, responsive Dialog.
- **Pre-push:** Husky hook that (1) enforces GitFlow branch names `feature/<kebab>` or `fix/<kebab>` from `.cursor/rules/gitflow.mdc` (Conventional Commits remain for commit messages, not branch names), (2) runs lint + unit tests + e2e (or a documented subset) and **blocks push on failure**. Today only `.husky/pre-commit` runs `pnpm lint`.
- **GitHub Action:** Same checks on pull_request/push to protect `master`.
- **README:** A visible note that the assignment allows **vanilla (html + css + js)** *or* **the library/framework of your choice**; this fork chose React/Vite/shadcn/Zustand/Zod/OpenSpec to show tool fluency, adaptability, architecture, and spec-driven development with AI assistance.

## Risks / Trade-offs

- [Three columns vs small laptops] → `lg` split; history-first on mobile. If `lg` feels late, revisit in implementation, not by adding a third layout.
- [Mock state lost on refresh] → Acceptable for a client-only test; no persistence layer.
- [Existing Playwright smoke looks for “Prueba Front”] → Will fail once the shell lands. Either a tiny assertion update during apply (preferred if e2e is run locally) or defer to Phase 6. Prefer updating the smoke to “Remesas” / “Ventanilla” during Phase 2 so `pnpm test:e2e` does not stay red.
- [Decimal key vs digit-only id] → Keep the key for structure; reject on confirm with Sonner.
- [README “fewer dependencies” vs chosen stack] → Document in Phase 8; do not strip the scaffold.

## Migration Plan

1. Implement Phases 1–5 on a `feature/remesas-ventanilla` branch from `master` (do not commit to `master`).
2. Remove the counter store/UI when the remesas store exists.
3. Add shadcn components and `react-router` via pnpm as listed in tasks.
4. Rollback: revert the feature branch; no data migration.

## Open Questions

None blocking. Assumptions: omit sliders/filter icon; omit bell/avatar/keyboard icon/`**`; id is max 8 digits not exactly 8; amount remains a string; Dialog is the only mobile keypad; future tests use Vitest not Jest.
