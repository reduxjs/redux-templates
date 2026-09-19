/** @type {import("jest").Config} */
const config = {
  preset: "jest-expo",
  verbose: true,
  /**
   * The first render of the app on a cold Jest cache can take longer than the
   * default 5 second timeout while React Native's modules are transformed.
   */
  testTimeout: 20000,
  /**
   * Without this we will get the following error:
   * `SyntaxError: Cannot use import statement outside a module`
   */
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|...|react-redux))",
  ],
  /**
   * React Native's `jest` preset includes a
   * [polyfill for `window`](https://github.com/facebook/react-native/blob/acb634bc9662c1103bc7c8ca83cfdc62516d0060/packages/react-native/jest/setup.js#L61-L66).
   * This polyfill causes React-Redux to use `useEffect`
   * instead of `useLayoutEffect` for the `useIsomorphicLayoutEffect` hook.
   * As a result, nested component updates may not be properly batched
   * when using the `connect` API, leading to potential issues.
   */
  globals: {
    window: undefined,
    navigator: {
      product: "ReactNative",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  fakeTimers: {
    enableGlobally: true,
    advanceTimers: true,
  },
}

module.exports = config
