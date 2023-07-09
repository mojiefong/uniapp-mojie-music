<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
page {
  /* #ec5241 #f4606c */

  --color-base: #f4606c;
  --color-success: #67c23a;
  --color-warning: #e6a23c;
  --color-error: #f5222d;

  --color-text-base: #333;
  --color-text-secondary: #666;
  --color-text-placeholder: #ccc;

  --border-color-base:#dcdfe6;

  --background-color-base: #f5f7fa;

  --box-shadow-base: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  color: var(--color-text-base);
  background: var(--background-color-base);
}
</style>
