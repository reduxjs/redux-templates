import { getDefaultConfig } from "expo/metro-config"
import type { MetroConfig } from "metro-config"
import { mergeConfig } from "metro-config"

const config: MetroConfig = mergeConfig(getDefaultConfig(__dirname))

export { config }
