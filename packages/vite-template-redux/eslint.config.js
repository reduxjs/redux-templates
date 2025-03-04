import js from "@eslint/js"
import vitestPlugin from "@vitest/eslint-plugin"
import prettierConfig from "eslint-config-prettier"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"
import { config, configs } from "typescript-eslint"

const ESLintConfig = config(
  { name: "global-ignores", ignores: ["**/*.snap", "dist", "coverage"] },
  { name: js.meta.name, ...js.configs.recommended },
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  { name: vitestPlugin.meta.name, ...vitestPlugin.configs.recommended },
  {
    ...reactPlugin.configs.flat["jsx-runtime"],
    name: "main",
    linterOptions: { reportUnusedDisableDirectives: 2 },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      react: reactPlugin,
      vitest: vitestPlugin,
    },
    settings: { vitest: { typecheck: true } },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "@typescript-eslint/consistent-type-definitions": [2, "type"],
      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: true,
        },
      ],
      "@typescript-eslint/no-restricted-imports": [
        2,
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useStore", "useDispatch"],
              message:
                "Please use pre-typed versions from `src/app/hooks.ts` instead.",
            },
          ],
        },
      ],
    },
  },
  { name: "prettier-config", ...prettierConfig },
)

export default ESLintConfig
