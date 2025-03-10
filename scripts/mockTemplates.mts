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

/**
 * Retrieves a map of Yarn workspaces and their corresponding locations.
 *
 * @returns A {@linkcode Promise | promise} that resolves to a map of workspace names and their locations.
 * @throws An error If there is an error while listing Yarn workspaces.
 */
const listYarnWorkspaces = async () => {
  // Execute `yarn workspaces list --json` command
  const { stdout } = await execFile("yarn", ["workspaces", "list", "--json"], {
    shell: true,
  })

  // The output includes multiple JSON lines, one for each workspace.
  // Split stdout by newlines and filter out empty lines or lines that are not JSON (like yarn logs)
  const workspaces = stdout
    .trim()
    .split("\n")
    .filter(line => {
      try {
        JSON.parse(line)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    })
    .map(line => JSON.parse(line) as { location: string; name: string })
    .filter(({ location }) => location !== ".")

  // Extract workspace names or any other property you need
  const workspaceNames = new Map(
    workspaces.map(workspace => [
      workspace.name,
      path.join(import.meta.dirname, "..", workspace.location),
    ]),
  )

  return workspaceNames
}

const workspaces = await listYarnWorkspaces()

/**
 * Constructs a GitHub URL based on the current Git repository information.
 *
 * @returns An object containing the remote URL, current branch, and commit hash.
 * @throws An error If there is an error while retrieving the Git repository information.
 */
async function constructGitHubUrl(): Promise<{
  remoteUrl: string
  currentBranch: string
  commitHash: string
}> {
  const remoteUrl = (
    await execFile("git", ["remote", "get-url", "origin"], { shell: true })
  ).stdout.trim()

  const currentBranch = (
    await execFile("git", ["branch", "--show-current"], { shell: true })
  ).stdout.trim()

  const commitHash = (
    await execFile("git", ["rev-parse", "--short", "HEAD"], { shell: true })
  ).stdout.trim()

  return {
    remoteUrl,
    currentBranch,
    commitHash,
  }
}

const gitHubUrl = await constructGitHubUrl()

type AllTemplates = Record<
  string,
  {
    command: string
    args: string[]
    options?: Partial<ExecFileOptionsWithStringEncoding>
  }
>

const allTemplates: AllTemplates = {
  "cra-template-redux": {
    command: "npx",
    args: [
      "-y",
      "create-react-app@latest",
      "example",
      "--template",
      `file:${workspaces.get("cra-template-redux") ?? ""}`,
    ],
  },
  "cra-template-redux-typescript": {
    command: "npx",
    args: [
      "-y",
      "create-react-app@latest",
      "example",
      "--template",
      `file:${workspaces.get("cra-template-redux-typescript") ?? ""}`,
    ],
  },
  "expo-template-redux-typescript": {
    command: "npx",
    args: [
      "-y",
      "create-expo@latest",
      "example",
      "--template",
      `file:${workspaces.get("expo-template-redux-typescript") ?? ""}`,
    ],
  },
  "react-native-template-redux-typescript": {
    command: "npx",
    args: [
      "-y",
      "@react-native-community/cli@latest",
      "init",
      "app",
      "--template",
      `file:${workspaces.get("react-native-template-redux-typescript") ?? ""}`,
      "--pm=npm",
      "--directory",
      "example",
    ],
  },
  "vite-template-redux": {
    command: "npx",
    args: [
      "-y",
      "tiged@rc",
      "-Dv",
      `${gitHubUrl.remoteUrl}/packages/vite-template-redux#${gitHubUrl.currentBranch}`,
      "example",
    ],
  },
}

/**
 * @param templates - The name of the template to mock.
 * @returns A map of template names and their corresponding temporary directories.
 */
const createTempDirectories = async (templates: string[]) => {
  await fs.rm(path.join(os.homedir(), ".degit"), {
    force: true,
    recursive: true,
  })

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
      const { command, args } = allTemplates[template]

      const tempDirectory = tempDirectories[template]

      const { stdout, stderr } = await execFile(command, args, {
        encoding: "utf-8",
        shell: true,
        cwd: tempDirectory,
      })

      console.log(stdout.trim())

      console.error(stderr)

      const cwd = path.join(tempDirectory, "example")

      const install = await execFile("npm", ["install"], {
        encoding: "utf-8",
        shell: true,
        cwd,
      })

      console.log(install.stdout.trim())

      console.error(install.stderr)

      const test = await execFile("npm", ["run", "test"], {
        encoding: "utf-8",
        shell: true,
        cwd,
      })

      console.log(test.stdout.trim())

      console.error(test.stderr)

      const lint = await execFile("npm", ["run", "lint"], {
        encoding: "utf-8",
        shell: true,
        cwd,
      })

      console.log(lint.stdout.trim())

      console.error(lint.stderr)

      const build = await execFile("npm", ["run", "build"], {
        encoding: "utf-8",
        shell: true,
        cwd,
      })

      console.log(build.stdout.trim())

      console.error(build.stderr)
    }),
  )
}

const processArgs = process.argv.slice(2)

await mockTemplate(
  processArgs.length === 0 ? Object.keys(allTemplates) : processArgs,
)
