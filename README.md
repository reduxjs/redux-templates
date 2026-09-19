# Redux Project Templates

This monorepo contains the official Redux templates for Vite and Expo.

For installation and setup instructions, see the README file in each project template folder under `./packages/`.

Currently, this repo contains these templates:

- `vite-template-redux`: Vite, with TypeScript
- `expo-template-redux-typescript`: Expo, with TypeScript
- `rtk-app-structure-example`: A standalone example of the Redux Toolkit app structure used in the Redux Essentials tutorial

Each template is a plain project. Copy one with [tiged](https://github.com/tiged/tiged):

```sh
npx tiged reduxjs/redux-templates/packages/vite-template-redux my-app
```

The older Create-React-App and React Native CLI templates were removed. Their last version is preserved at the [`archive/cra-and-rn-cli`](https://github.com/reduxjs/redux-templates/tree/archive/cra-and-rn-cli/packages) tag.

## Contributing

This repo uses [pnpm](https://pnpm.io/) workspaces. Run `pnpm install` at the root, then work inside a package folder as you would in a standalone project. Each package has its own `lint`, `format`, `type-check`, and `test` scripts; the root scripts only cover the repo tooling in `scripts/`. Linting and formatting use [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

`pnpm test:templates` copies each template into a temp folder the same way `tiged` would and runs its install, test, lint, and build scripts. On Windows, set `TEMP` to the long form of your temp folder first (for example `export TEMP="$USERPROFILE\AppData\Local\Temp"`); the default 8.3 short path breaks `vite build`.
