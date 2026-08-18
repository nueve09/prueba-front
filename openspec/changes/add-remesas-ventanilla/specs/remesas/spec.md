## ADDED Requirements

### Requirement: Remesa model validated and typed with Zod
The system SHALL define remesas with Zod schemas and SHALL export TypeScript types via `z.infer` from those schemas. Status MUST be an enum with values `NO_COBRADO` and `COBRADO`. The canonical shape MUST include `id`, `company`, `amount` (string), `status`, `created_at`, and `charged_at`, with compact dates `YYYYMMDD`. Id input MUST allow at most 8 digit characters (`max(8)` as in the README). Mock list data MUST contain more than 12 remesas and MUST include both charged and uncharged records.

#### Scenario: Schema infers the remesa type
- **WHEN** application code refers to a remesa entity
- **THEN** the type MUST come from `z.infer` of the remesa schema rather than a hand-written duplicate interface

#### Scenario: Status is a closed enum
- **WHEN** a remesa is parsed
- **THEN** `status` MUST be either `NO_COBRADO` or `COBRADO`

#### Scenario: Id rejects more than eight digits
- **WHEN** an id longer than 8 digits is validated
- **THEN** validation MUST fail

### Requirement: Mock fetch API
The system SHALL load and update remesas through a client-side mock fetch layer (artificial delay, no backend). Responses MUST be validated with Zod at that boundary. Successful charges MUST persist in client state so the history list updates.

#### Scenario: Initial load populates remesas
- **WHEN** the remesas workspace mounts
- **THEN** the system MUST request remesas from the mock API and render from the resulting list after validation

#### Scenario: Invalid mock payload is rejected
- **WHEN** mock data fails Zod validation
- **THEN** the system MUST NOT treat it as a remesa list and MUST show a general error via the app-wide toast

### Requirement: Functional keypad charge flow
The keypad SHALL collect a remesa id (digits displayed without a `**` prefix). Confirming the entry MUST run Zod validation, then look up the remesa. If the remesa exists and status is `NO_COBRADO`, the system MUST set `charged_at` to today’s `YYYYMMDD` date, set status to `COBRADO`, and show the remesa in the charged history. General errors MUST be shown with the app-wide toast. On large viewports the keypad MUST be inline in the central column. On viewports below `lg` the keypad MUST appear only inside a Dialog.

#### Scenario: Charge an uncharged remesa
- **WHEN** the operator enters a valid id of a `NO_COBRADO` remesa and confirms
- **THEN** the remesa status MUST become `COBRADO`, `charged_at` MUST be set to the current date, and the remesa MUST appear in the history list

#### Scenario: Reject an already charged remesa
- **WHEN** the operator confirms an id whose remesa is already `COBRADO`
- **THEN** the system MUST NOT change the remesa and MUST show an error toast

#### Scenario: Reject unknown or invalid id
- **WHEN** the operator confirms an empty value, a non-digit value, an id longer than 8 digits, or an id that is not in the list
- **THEN** the system MUST NOT charge any remesa and MUST show an error toast

#### Scenario: Mobile keypad is a Dialog
- **WHEN** the remesas route is shown below `lg` and the operator opens the keypad
- **THEN** the keypad MUST be presented in a Dialog and MUST NOT be inline in the page flow

#### Scenario: Desktop keypad is inline
- **WHEN** the remesas route is shown at `lg` or wider
- **THEN** the keypad MUST be visible in the central column and the keypad Dialog MUST NOT be required

### Requirement: History search, pagination, and print
The history list SHALL show charged remesas (`status` `COBRADO`) from the current search result, sorted by `charged_at`, at 10 items per page, displaying `id`, `company`, and `amount`. Search MUST match id, company, or amount (after normalizing spaces and currency noise) and MUST debounce input via a dedicated debounce hook plus a filter hook. Pagination MUST use the shadcn Pagination component. A print control MUST trigger the browser print dialog with a minimal print stylesheet (hide chrome that is not the list).

#### Scenario: Default list is charged remesas, ten per page
- **WHEN** the remesas workspace has loaded and the search query is empty
- **THEN** the list MUST show only `COBRADO` remesas ordered by `charged_at` and MUST show at most 10 rows on the first page

#### Scenario: Search filters by id, company, or amount
- **WHEN** the operator types a query that matches a charged remesa’s id, company, or amount
- **THEN** after debounce the list MUST include matching charged remesas and MUST exclude non-matching ones

#### Scenario: Search ignores spaces and currency punctuation
- **WHEN** the operator types a company name with spaces (for example `western union`) or an amount with `$` or commas
- **THEN** matching charged remesas MUST still be included

#### Scenario: Pagination moves between pages
- **WHEN** more than 10 charged remesas match the current search and the operator opens page 2
- **THEN** the list MUST show the next slice of matching charged remesas

#### Scenario: Print uses the browser print dialog
- **WHEN** the operator activates print
- **THEN** the system MUST call the browser print flow (`window.print`) without generating a PDF file
