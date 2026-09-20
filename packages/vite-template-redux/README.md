# vite-template-redux

The official Redux + TypeScript template for [Vite](https://vite.dev/). Uses [Redux Toolkit](https://redux-toolkit.js.org/), [React Redux](https://react-redux.js.org/), [Vitest](https://vitest.dev/), and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```sh
npx tiged reduxjs/redux-templates/packages/vite-template-redux my-app
cd my-app
npm install
```

Or try it in the browser: [Open in StackBlitz](https://stackblitz.com/github/reduxjs/redux-templates/tree/master/packages/vite-template-redux)

## What's inside

- `src/app/store.ts` - the Redux store, set up with `combineSlices` and `configureStore`, plus a `makeStore` factory and the `RootState` / `AppDispatch` types
- `src/app/hooks.ts` - pre-typed `useAppSelector` and `useAppDispatch`
- `src/features/counter` - a `createSlice` example with a thunk, plus tests
- `src/features/quotes` - an RTK Query API slice fetching from a public API
- `src/utils/test-utils.tsx` - a `renderWithProviders` helper for testing components that use the store

Linting and formatting use [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

## Scripts

- `dev` / `start` - start the dev server
- `build` - build for production
- `preview` - preview the production build locally
- `test` - run the tests once
- `lint` / `lint:fix` - lint with oxlint
- `format` / `format:check` - format with oxfmt
- `type-check` - run the TypeScript compiler without emitting
