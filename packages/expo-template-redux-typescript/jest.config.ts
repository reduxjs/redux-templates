import type { Config } from "jest"

const config: Config = {
  preset: "jest-expo",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  fakeTimers: { enableGlobally: true },
}

export default config
