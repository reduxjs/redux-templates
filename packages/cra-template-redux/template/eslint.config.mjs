import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier/flat"
import jestPlugin from "eslint-plugin-jest"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"
import { config, configs } from "typescript-eslint"

const eslintConfig = config(
  {
    name: "global-ignores",
    ignores: [
      "**/*.snap",
      "**/dist/",
      "**/.yalc/",
      "**/build/",
      "**/temp/",
      "**/.temp/",
      "**/.tmp/",
      "**/.yarn/",
      "**/coverage/",
    ],
  },
  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },
  configs.strict,
  configs.stylistic,
  {
    name: `${jestPlugin.meta.name}/recommended`,
    ...jestPlugin.configs["flat/recommended"],
  },
  {
    name: "eslint-plugin-react/jsx-runtime",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  reactHooksPlugin.configs["recommended-latest"],
  {
    name: "main",
    linterOptions: {
      reportUnusedDisableDirectives: 2,
    },
    files: ["**/*.?(c|m)js?(x)"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  prettierConfig,
)

export default eslintConfig
