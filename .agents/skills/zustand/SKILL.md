---
name: zustand
description: Zustand store access patterns that avoid unnecessary React re-renders. Use when creating or editing Zustand stores, calling useStore selectors, using getState in handlers, or optimizing store subscriptions in React components.
---

# Zustand

Prefer narrow subscriptions. Aligns with Zustand docs (`getState` for non-UI reads) and this repo’s React rule `rerender-defer-reads` (don’t subscribe to state only used in callbacks).

Does **not** conflict with composition-patterns (`state-decouple-implementation`): that rule is about UI vs provider boundaries, not how to read a Zustand store.

## When to use a selector (subscribe)

Use a selector **only** when the value must be rendered (or otherwise drive React render output):

```ts
const count = useAppStore((state) => state.count)
```

```tsx
return <p>{count}</p>
```

## When to use `getState()` (no subscribe)

If the value is only needed inside an event handler, async callback, timeout, or non-React code, read it with `getState()` so the component does **not** re-render when that slice changes:

```ts
const handleFunction = () => {
  const variable = useAppStore.getState().count
  // use variable…
}
```

Same for actions that don’t need a subscription:

```ts
const handleIncrement = () => {
  useAppStore.getState().increment()
}

// or inline
<button onClick={() => useAppStore.getState().increment()} />
```

`getState()` is **not** a React hook. Calling it inside a handler is valid.

## When this pattern does **not** apply

| Case | Why | Use instead |
| --- | --- | --- |
| Value appears in JSX / must update the UI | No subscription → stale UI | Selector: `useAppStore((s) => s.x)` |
| `useEffect` / layout that should **react** when `x` changes | `getState()` is a one-shot read | Selector (or `store.subscribe`) |
| During render as a substitute for a selector | Looks fine once, never updates | Selector |
| Hook call **inside** a nested function | Violates Rules of Hooks | Never `useAppStore(...)` inside handlers — only `getState()` |
| Playwright / E2E | Couples tests to store internals | Assert the UI (see playwright-best-practices) |

## Anti-patterns

```ts
// ❌ Subscribes to the whole store → re-render on any change
const { count } = useAppStore()

// ❌ Subscribes even though count is only used in the handler
const count = useAppStore((state) => state.count)
const handleClick = () => doSomething(count)

// ✅ Handler reads current state without subscribing
const handleClick = () => {
  const count = useAppStore.getState().count
  doSomething(count)
}
```

## Multiple values for render

Prefer separate primitive selectors, or `useShallow` when returning an object/array:

```ts
import { useShallow } from 'zustand/react/shallow'

const count = useAppStore((state) => state.count)
const label = useAppStore((state) => state.label)

const { count, label } = useAppStore(
  useShallow((state) => ({ count: state.count, label: state.label })),
)
```

## Checklist

- [ ] Rendered store fields → selector
- [ ] Handler / effect one-shot reads → `getState()`
- [ ] No `useStore()` without a selector in components
- [ ] No `useStore(...)` inside nested non-hook functions
