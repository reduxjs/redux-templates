# Redux Toolkit App Structure Example

This slimmed-down version of [the Redux Toolkit template for Vite](https://github.com/reduxjs/redux-templates/tree/master/packages/vite-template-redux) shows the standard app structure and store setup for Redux Toolkit, TypeScript, and React.

It's used in the ["Redux Essentials" tutorial Part 2](https://redux.js.org/tutorials/essentials/part-2-app-structure) as an embedded example to help teach Redux app structure.

```sh
npx tiged reduxjs/redux-templates/packages/rtk-app-structure-example my-app
cd my-app
npm install
```

Or try it in the browser: [Open in StackBlitz](https://stackblitz.com/github/reduxjs/redux-templates/tree/master/packages/rtk-app-structure-example)

## What's inside

- `src/app/store.ts` - the Redux store, set up with `configureStore`, and the `RootState` / `AppDispatch` types
- `src/app/hooks.ts` - pre-typed `useAppSelector` and `useAppDispatch`
- `src/features/counter` - a `createSlice` example with a thunk

## Scripts

- `dev` / `start` - start the dev server
- `build` - build for production
- `preview` - preview the production build locally
- `format` / `format:check` - format with oxfmt
- `type-check` - run the TypeScript compiler without emitting
