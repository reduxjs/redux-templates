# Expo Template Redux TypeScript

The official Redux+TS template for Expo.

## Usage

```sh
npx tiged reduxjs/redux-templates/packages/expo-template-redux-typescript my-app
```

Then install dependencies in the new folder:

```sh
cd my-app
npm install
```

## Running the app

Start the Expo dev server:

```sh
npm start
```

Then press `a` for an Android emulator, `i` for an iOS simulator, or scan the QR code with the Expo Go app on a device. `npm run android`, `npm run ios`, and `npm run web` start the dev server and open that platform directly.

See the [Expo docs](https://docs.expo.dev/get-started/set-up-your-environment/) for setting up emulators and simulators.

## What's inside

- `App.tsx` wraps `src/Main.tsx` in the React-Redux `Provider`.
- `src/app/store.ts` sets up the store with `combineSlices` and `configureStore`, and exports a `makeStore` helper for tests.
- `src/app/hooks.ts` exports pre-typed `useAppSelector` and `useAppDispatch` hooks.
- `src/features/counter` is a `createSlice` example with a thunk.
- `src/features/quotes` is an RTK Query example using `createApi`.
- `src/utils/test-utils.tsx` exports `renderWithProviders` for tests that need a store.

Tests use Jest with `jest-expo` and React Native Testing Library. Note that RNTL's `render` is async, so `renderWithProviders` must be awaited, and tests that mount components using RTK Query need to mock `fetch` (see `src/Main.test.tsx`) because `jest-expo` stubs Expo's native `fetch`. Linting and formatting use [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

## Scripts

- `npm start` - start the Expo dev server
- `npm run android` / `npm run ios` / `npm run web` - start the dev server and open that platform
- `npm test` - run the Jest tests
- `npm run lint` - lint with oxlint
- `npm run format` - format with oxfmt
- `npm run type-check` - run the TypeScript compiler
- `npm run build` - export an Android JS bundle with `expo export`
