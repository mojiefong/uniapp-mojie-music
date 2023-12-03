<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { anonymousLogin } from './api/user'
import { getCookie, setCookie } from './utils/storage'
import { usePlayer } from './store/player'
import { getRandomIndexes } from './utils/util'
import { PlayMode } from './enums'

const playerStore = usePlayer()
const { audio, onNext, onLoopPlay } = playerStore
const {
  playing,
  currentTime,
  progressDragging,
  switching,
  randomPlayIndexes,
  playList,
  playMode,
} = storeToRefs(playerStore)

onLaunch(() => {
  defaultLogin()
  setupAudio()
})

/**
 * 默认游客登录
 */
async function defaultLogin() {
  if (getCookie()) return
  const cookie = await anonymousLogin()
  setCookie(cookie)
}

/**
 * 监听audio事件
 */
function setupAudio() {
  audio.onPlay(() => {
    if (switching.value) return

    // 初始化播放时，如果是随机播放并且没有随机播放索引列表，则设置随机播放索引列表
    if (playMode.value === PlayMode.Random && !randomPlayIndexes.value.length) {
      randomPlayIndexes.value = getRandomIndexes(playList.value.length)
    }

    playing.value = true
  })

  audio.onPause(() => {
    playing.value = false
  })

  audio.onTimeUpdate(() => {
    if (progressDragging.value) return
    currentTime.value = audio.currentTime
  })

  audio.onEnded(() => {
    // 判断是否循环播放
    playMode.value === PlayMode.Loop ? onLoopPlay() : onNext()
  })
}
</script>

<style>
@import "//at.alicdn.com/t/c/font_4158018_wbz1zx2ec49.css";

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
