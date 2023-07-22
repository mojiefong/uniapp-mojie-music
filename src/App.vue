<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { anonymousLogin } from './api/user'
import { getCookie, setCookie } from './utils/storage'

onLaunch(() => {
  defaultLogin()
})

/**
 * 默认游客登录
 */
async function defaultLogin() {
  if (getCookie()) return
  const cookie = await anonymousLogin()
  setCookie(cookie)
}
</script>

<style>
@import "//at.alicdn.com/t/c/font_4158018_wg8h43gfuri.css";

page, html, body {
  /* #ec5241 #f4606c */

  --color-base: #f4606c;
  --color-success: #67c23a;
  --color-warning: #e6a23c;
  --color-error: #f5222d;

  --color-text-base: #333;
  --color-text-secondary: #666;
  --color-text-light: #999;
  --color-text-placeholder: #ccc;

  --border-color-base: #dcdfe6;

  --background-color-base: #f8f8f8;

  --box-shadow-base: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  color: var(--color-text-base);
  background: var(--background-color-base);
}

page,
block,
view,
scroll-view,
swiper,
movable-view,
icon,
text,
progress,
button,
checkbox,
form,
input,
label,
picker,
picker-view,
radio,
slider,
switch,
textarea,
navigator,
audio,
image,
video,
map,
canvas,
contact-button,
cover-image,
cover-view {
  box-sizing: border-box;
}

 /* 文字省略 */
.text-ellipsis-single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
