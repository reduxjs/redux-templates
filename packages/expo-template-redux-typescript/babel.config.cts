import type { ConfigFunction } from "@babel/core"

const config: ConfigFunction = api => {
  api.cache.forever()
  return {
    presets: ["babel-preset-expo"],
  }
}

export default config
