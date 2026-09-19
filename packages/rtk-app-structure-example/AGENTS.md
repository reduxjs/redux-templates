# Agent notes

Minimal React + Redux Toolkit app built with Vite and TypeScript. It exists as the embedded example for the "Redux Essentials" tutorial Part 2, so keep it small and keep file names and structure stable; the tutorial text refers to them.

## Layout

- `src/app/store.ts` creates the store with `configureStore` and exports the `RootState`, `AppDispatch`, and `AppThunk` types. Add new slice reducers to the `reducer` object.
- `src/app/hooks.ts` exports `useAppSelector` and `useAppDispatch`. Use these instead of importing `useSelector` / `useDispatch` from `react-redux`.
- `src/features/counter/` holds the counter slice, its component, and a fake async API.
- `@/` is an alias for `src/` (see `tsconfig.json` and `vite.config.mts`).

## Commands

- `npm run dev` - dev server
- `npm run type-check` - `tsc --noEmit`
- `npm run format` - oxfmt (`.oxfmtrc.json`; no semicolons, double quotes, `arrowParens: avoid`)
- `npm run build` - type check then `vite build`

There are no tests or lint setup in this package on purpose.
