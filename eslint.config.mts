import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier/flat"
import type { ConfigArray } from "typescript-eslint"
import { config, configs } from "typescript-eslint"

const eslintConfig: ConfigArray = config(
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
      "**/coverage/",
      "packages/rtk-app-structure-example",
      "packages/vite-template-redux",
      "packages/expo-template-redux-typescript",
    ],
  },
  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  {
    name: "main",
    linterOptions: {
      reportUnusedDisableDirectives: 2,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-undef": [0],
      "@typescript-eslint/consistent-type-definitions": [2, "type"],
      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: true,
        },
      ],
    },
  },

  prettierConfig,
)

export default eslintConfig
