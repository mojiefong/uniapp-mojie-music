import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    presetWeapp(),
    presetWeappAttributify(),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
  ],
})
