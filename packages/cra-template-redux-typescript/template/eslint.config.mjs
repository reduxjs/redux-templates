import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import jestPlugin from "eslint-plugin-jest"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"
import { config, configs } from "typescript-eslint"

export default config(
  { name: "global-ignores", ignores: ["**/*.snap", "build", "coverage"] },
  { name: js.meta.name, ...js.configs.recommended },
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  { name: jestPlugin.meta.name, ...jestPlugin.configs["flat/recommended"] },
  {
    ...reactPlugin.configs.flat["jsx-runtime"],
    name: "main",
    linterOptions: { reportUnusedDisableDirectives: 2 },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.?(c|m)[jt]s?(x)"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      react: reactPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "no-restricted-imports": [
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
  { name: "prettier-config", ...prettierConfig },
)
