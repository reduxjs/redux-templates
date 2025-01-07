import { getDefaultConfig } from "expo/metro-config"
import { mergeConfig } from "metro-config"

const config = mergeConfig(getDefaultConfig(__dirname))

export { config }
