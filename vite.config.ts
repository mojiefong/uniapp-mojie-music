/**
 * @Author: Mojie
 * @Date: 2023-07-06 14:31:56
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9527,
  },
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue'],
    }),
    Components({
      types: [],
    }),
    UnoCSS(),
  ],
})
