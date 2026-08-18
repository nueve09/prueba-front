## MODIFIED Requirements

### Requirement: Playwright E2E is a separate suite
`pnpm test` MUST NOT run Playwright. Remesas E2E coverage (search typing, pagination clicks, charge on desktop keypad, mobile Dialog, real viewport breakpoints, visible error toasts, print chrome) SHALL live in the `e2e-testing` capability and run via `pnpm test:e2e`. The existing smoke in `tests/app.spec.ts` MUST remain.

#### Scenario: Unit command excludes Playwright remesas flows
- **WHEN** a developer runs `pnpm test`
- **THEN** no Playwright remesas-flow specs MUST run as part of that command
- **AND** `pnpm test` MUST still exclude Playwright
