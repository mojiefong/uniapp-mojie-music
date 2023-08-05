import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    presetWeapp({
      whRpx: false,
    }),
    presetWeappAttributify(),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
  ],
  shortcuts: {
    // 宽高满屏
    'wh-full': 'w-full h-full',
    // position 满屏
    'pos-full': 'fixed top-0 left-0 right-0 bottom-0',
    // position 水平居中 horizontal
    'pos-h-center': 'absolute left-50% transform -translate-x-50%',
    // flex 水平居中 horizontal
    'flex-h-center': 'flex justify-center',
    // position 垂直居中 vertical
    'pos-v-center': 'absolute top-50% transform -translate-y-50%',
    // flex 垂直居中 vertical
    'flex-v-center': 'flex items-center',
    // position 水平垂直居中
    'pos-center': 'absolute top-50% left-50% transform -translate-50%',
    // flex 水平垂直居中
    'flex-center': 'flex justify-center items-center',
  },
  theme: {
    colors: {
      // 主题色
      'theme': 'var(--color-base)',

      // 辅助色
      'success': 'var(--color-success)',
      'warning': 'var(--color-warning)',
      'error': 'var(--color-error)',

      // 文字颜色
      'base': 'var(--color-text-base)',
      'secondary': 'var(--color-text-secondary)',
      'light': 'var(--color-text-light)',
      'placeholder': 'var(--color-text-placeholder)',

      // 背景色
      'bg-primary': 'var(--background-color-base)',

      // 边框色
      'b-primary': 'var(--border-color-base)',
    },
  },
})
