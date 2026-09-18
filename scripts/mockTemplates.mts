#!/usr/bin/env -vS node --import=tsx

import type { ExecFileOptionsWithStringEncoding } from "node:child_process"
import * as childProcess from "node:child_process"
import * as fs from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import { promisify } from "node:util"

const execFile = promisify(childProcess.execFile)

const homeOrTempDir = os.tmpdir() || os.homedir()

const testDirectory = path.join(homeOrTempDir, "test-redux-templates")

const repoRoot = path.join(import.meta.dirname, "..")

/**
 * Retrieves a map of pnpm workspace packages and their corresponding locations.
 *
 * @returns A {@linkcode Promise | promise} that resolves to a map of package names and their absolute paths.
 * @throws An error If there is an error while listing the workspace packages.
 */
const listWorkspaces = async () => {
  const { stdout } = await execFile(
    "pnpm",
    ["-r", "ls", "--json", "--depth", "-1"],
    { shell: true, cwd: repoRoot },
  )

  const packages = JSON.parse(stdout) as { name: string; path: string }[]

  return new Map(
    packages
      .filter(({ path: packagePath }) => packagePath !== repoRoot)
      .map(({ name, path: packagePath }) => [name, packagePath]),
  )
}

const workspaces = await listWorkspaces()

const getWorkspacePath = (name: string) => {
  const workspacePath = workspaces.get(name)

  if (!workspacePath) {
    throw new Error(`Unknown workspace package: ${name}`)
  }

  return workspacePath
}

/**
 * Copies a template folder into the `example` directory, mirroring what
 * `tiged` produces when it downloads the folder from GitHub.
 */
const copyTemplate = async (name: string, destination: string) => {
  await fs.cp(getWorkspacePath(name), destination, {
    recursive: true,
    filter: source => path.basename(source) !== "node_modules",
  })
}

type TemplateSetup = (tempDirectory: string) => Promise<void>

const runScaffold = async (
  command: string,
  args: string[],
  cwd: string,
  options?: Partial<ExecFileOptionsWithStringEncoding>,
) => {
  const { stdout, stderr } = await execFile(command, args, {
    encoding: "utf-8",
    shell: true,
    cwd,
    ...options,
  })

  console.log(stdout.trim())

  console.error(stderr)
}

const allTemplates = new Map<string, TemplateSetup>([
  [
    "expo-template-redux-typescript",
    tempDirectory =>
      runScaffold(
        "npx",
        [
          "-y",
          "create-expo@latest",
          "example",
          "--no-install",
          "--template",
          `file:${getWorkspacePath("expo-template-redux-typescript")}`,
        ],
        tempDirectory,
      ),
  ],
  [
    "vite-template-redux",
    tempDirectory =>
      copyTemplate("vite-template-redux", path.join(tempDirectory, "example")),
  ],
  [
    "rtk-app-structure-example",
    tempDirectory =>
      copyTemplate(
        "rtk-app-structure-example",
        path.join(tempDirectory, "example"),
      ),
  ],
])

/**
 * @param templates - The name of the template to mock.
 * @returns A map of template names and their corresponding temporary directories.
 */
const createTempDirectories = async (templates: string[]) => {
  return Object.fromEntries(
    await Promise.all(
      templates.map(async template => {
        const tempDirectory = path.join(testDirectory, template)

        console.log(
          `Creating temporary directory for ${template} at ${tempDirectory}`,
        )

        await fs.mkdir(tempDirectory, { recursive: true })

        return [template, tempDirectory] as const
      }),
    ),
  )
}

/**
 * Mocks templates by executing the template related command.
 *
 * @param templates - The name of the templates to mock.
 * @returns A {@linkcode Promise | promise} that resolves when the template execution is complete.
 */
const mockTemplate = async (templates: string[]) => {
  await fs.rm(testDirectory, { recursive: true, force: true })

  console.log(`Testing the following templates:\n\n${templates.join(",\n")}\n`)

  const tempDirectories = await createTempDirectories(templates)

  await Promise.all(
    templates.map(async template => {
      const setup = allTemplates.get(template)

      if (!setup) {
        throw new Error(
          `Unknown template "${template}". Known templates: ${[...allTemplates.keys()].join(", ")}`,
        )
      }

      const tempDirectory = tempDirectories[template]

      await setup(tempDirectory)

      const cwd = path.join(tempDirectory, "example")

      await runScaffold("npm", ["install"], cwd)

      for (const script of ["test", "lint", "build"]) {
        await runScaffold("npm", ["run", script, "--if-present"], cwd)
      }
    }),
  )
}

const processArgs = process.argv.slice(2)

await mockTemplate(
  processArgs.length === 0 ? [...allTemplates.keys()] : processArgs,
)
