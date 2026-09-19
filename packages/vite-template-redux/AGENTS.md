# Agent notes

React + Redux Toolkit app built with Vite and TypeScript.

## Layout

- `src/app/store.ts` creates the store. `combineSlices` builds the root reducer from the slices passed to it; `makeStore` exists so tests can create a fresh store per test. Add new slices to the `combineSlices` call, and add RTK Query APIs to both `combineSlices` and the `middleware` callback.
- `src/app/hooks.ts` exports `useAppSelector` and `useAppDispatch`. Use these instead of importing `useSelector` / `useDispatch` from `react-redux`; the linter enforces it.
- `src/features/<name>/` holds one slice (or RTK Query API) plus its components and tests. `counter` shows `createSlice` with a thunk; `quotes` shows `createApi`.
- `src/utils/test-utils.tsx` exports `renderWithProviders`, which wraps a component in a `Provider` with a fresh store and returns a `user-event` instance.

## Commands

- `npm run dev` - dev server
- `npm test` - Vitest, single run, jsdom environment, type checking enabled
- `npm run lint` - oxlint (`.oxlintrc.json`)
- `npm run format` - oxfmt (`.oxfmtrc.json`; no semicolons, double quotes, `arrowParens: avoid`)
- `npm run type-check` - `tsc -b --noEmit`
- `npm run build` - type check then `vite build`

## Conventions

- Define types with `type`, not `interface`.
- Import types with `import type`.
- Slice files export the slice object, its action creators, and its selectors; components import selectors rather than reaching into `state.<slice>` directly.
