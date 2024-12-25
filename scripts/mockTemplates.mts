#!/usr/bin/env -vS node --import=tsx

import * as childProcess from 'node:child_process';
import * as path from 'node:path';
import { promisify } from 'node:util';

const execFile = promisify(childProcess.execFile);

/**
 * Retrieves a map of Yarn workspaces and their corresponding locations.
 *
 * @returns A promise that resolves to a map of workspace names and their locations.
 * @throws An error If there is an error while listing Yarn workspaces.
 */
const listYarnWorkspaces = async () => {
  // Execute `yarn workspaces list --json` command
  const { stdout } = await execFile('yarn', ['workspaces', 'list', '--json'], {
    shell: true,
  });

  // The output includes multiple JSON lines, one for each workspace.
  // Split stdout by newlines and filter out empty lines or lines that are not JSON (like yarn logs)
  const workspaces = stdout
    .trim()
    .split('\n')
    .filter((line) => {
      try {
        JSON.parse(line);
        return true;
      } catch (error) {
        return false;
      }
    })
    .map((line) => JSON.parse(line))
    .filter(({ location }) => location !== '.');

  // Extract workspace names or any other property you need
  const workspaceNames = new Map(
    workspaces.map((workspace) => [
      workspace.name,
      path.resolve(import.meta.dirname, '..', workspace.location),
    ])
  );

  return workspaceNames;
};

const workspaces = await listYarnWorkspaces();

/**
 * Constructs a GitHub URL based on the current Git repository information.
 *
 * @returns An object containing the remote URL, current branch, and commit hash.
 * @throws An error If there is an error while retrieving the Git repository information.
 */
async function constructGitHubUrl(): Promise<{
  remoteUrl: string;
  currentBranch: string;
  commitHash: string;
}> {
  const remoteUrl = (
    await execFile('git', ['remote', 'get-url', 'origin'], { shell: true })
  ).stdout.trim();

  const currentBranch = (
    await execFile('git', ['branch', '--show-current'], { shell: true })
  ).stdout.trim();

  const commitHash = (
    await execFile('git', ['rev-parse', '--short', 'HEAD'], { shell: true })
  ).stdout.trim();

  return {
    remoteUrl,
    currentBranch,
    commitHash,
  };
}

const gitHubUrl = await constructGitHubUrl();

const allTemplates = {
  'cra-template-redux': `npx create-react-app@latest example --template file:${workspaces.get('cra-template-redux')}`,
  'cra-template-redux-typescript': `npx create-react-app@latest example --template file:${workspaces.get('cra-template-redux-typescript')}`,
  'expo-template-redux-typescript': `npx create-expo@latest example --template file:${workspaces.get('expo-template-redux-typescript')} && cd example && npm install`,
  'react-native-template-redux-typescript': `npx @react-native-community/cli@latest init app --template file:${workspaces.get('react-native-template-redux-typescript')} --pm=npm --directory example`,
  'vite-template-redux': `rm -rf ~/.degit && npx -y tiged@rc -D ${gitHubUrl.remoteUrl}/packages/vite-template-redux#${gitHubUrl.currentBranch} example -v && cd example && npm install`,
};

/**
 * Mocks a template by executing the template related command.
 *
 * @param template - The name of the template to mock.
 * @returns A {@linkcode Promise | promise} that resolves when the template execution is complete.
 */
const mockTemplate = async (template: string) => {
  await execFile(allTemplates[template], { shell: true });
};

await mockTemplate(process.argv.at(-1)!);
