## pnpm supply-chain hardening

Source of truth: [`pnpm-workspace.yaml`](pnpm-workspace.yaml). Do not copy these values into `.npmrc` or `package.json`; pnpm 11 reads them from that file.

```yaml
minimumReleaseAge: 10080
minimumReleaseAgeExclude:
  - '@testing-library/user-event'
  - shadcn
  - zustand
trustPolicy: no-downgrade
trustPolicyIgnoreAfter: 43200
blockExoticSubdeps: true
```

| Key | Value | What it does |
| --- | --- | --- |
| `minimumReleaseAge` | `10080` | Wait 7 days (minutes) after a version is published before pnpm will install it. Blocks malware that gets published and yanked within hours. |
| `minimumReleaseAgeExclude` | `user-event`, `shadcn`, `zustand` | Those three specifiers have no version older than 7 days, so they skip the age gate. Remove a name once a mature in-range version exists. |
| `trustPolicy` | `no-downgrade` | Abort install if a package's provenance/signature trust is weaker than earlier publishes (typical stolen-token pattern). |
| `trustPolicyIgnoreAfter` | `43200` | Skip the trust check for versions published more than 30 days ago. Needed so old packages like `semver@6.3.1` (via `eslint-plugin-react-hooks`) can install. |
| `blockExoticSubdeps` | `true` | Transitive deps must come from the registry; git/tarball URLs are allowed only on direct dependencies. |

Docs: [pnpm supply-chain security](https://pnpm.io/supply-chain-security), [pnpm-workspace.yaml settings](https://pnpm.io/settings). These keys satisfy `react-doctor/require-pnpm-hardening`. After changing them, run `pnpm install` so the lockfile is re-checked.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
