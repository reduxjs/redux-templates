# Agent notes

React Native + Redux Toolkit app built with Expo SDK 57 and TypeScript. Read the versioned Expo docs at https://docs.expo.dev/versions/v57.0.0/ before changing Expo-specific code; the APIs change between SDK releases.

## Layout

- `App.tsx` renders `src/Main.tsx` inside the React-Redux `Provider`. `index.ts` registers it with `registerRootComponent`.
- `src/app/store.ts` creates the store. `combineSlices` builds the root reducer from the slices passed to it; `makeStore` exists so tests can create a fresh store per test. Add new slices to the `combineSlices` call, and add RTK Query APIs to both `combineSlices` and the `middleware` callback.
- `src/app/hooks.ts` exports `useAppSelector` and `useAppDispatch`. Use these instead of importing `useSelector` / `useDispatch` from `react-redux`; the linter enforces it.
- `src/features/<name>/` holds one slice (or RTK Query API) plus its components and tests. `counter` shows `createSlice` with a thunk; `quotes` shows `createApi`.
- `src/utils/test-utils.tsx` exports `renderWithProviders`, which wraps a component in a `Provider` with a fresh store and returns a `user-event` instance. It is async because React Native Testing Library's `render` is async.

## Commands

- `npm start` - Expo dev server
- `npm test` - Jest with the `jest-expo` preset (`jest.config.js`); fake timers are on globally
- `npm run lint` - oxlint (`.oxlintrc.json`)
- `npm run format` - oxfmt (`.oxfmtrc.json`; no semicolons, double quotes, `arrowParens: avoid`)
- `npm run type-check` - `tsc --noEmit`
- `npm run build` - `expo export` for Android; produces a JS bundle in `build/`, no native toolchain needed

## Conventions

- Define types with `type`, not `interface`.
- Import types with `import type`.
- Slice files export the slice object, its action creators, and its selectors; components import selectors rather than reaching into `state.<slice>` directly.
- Tests that mount components which call RTK Query endpoints must mock `fetch`; Expo's native `fetch` is stubbed under `jest-expo` and cannot complete requests. See `src/Main.test.tsx`.
