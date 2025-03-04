declare module "eslint-plugin-react-hooks" {
  import type { ESLint, Linter } from "eslint"

  type Configs = { recommended: Linter.Config }

  const plugin: ESLint.Plugin & {
    configs: Configs
  }

  export = plugin
}
