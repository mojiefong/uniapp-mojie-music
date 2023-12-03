<template>
  <view class="wh-full fixed top-0 left-0 bg-black">
    <view class="wh-full flex-center flex-col pb-5">
      <!-- 背景底图 -->
      <view class="wh-full absolute top-0 left-0 opacity-50 blur-[20px] -z1">
        <image class="wh-full" :src="`${currentSong.album?.picUrl}?param=200y200`" />
      </view>

      <!-- 头部 -->
      <view class="w-full text-sm text-white">
        <text class="iconfont icon-left text-3xl absolute left-2" @click="onBack" />
        <view class="w-80% line-height-9 my0 mxa text-center text-ellipsis-single">
          {{ currentSong.name }}
        </view>
        <view class="-mt-2 text-[20rpx] text-placeholder text-center">
          {{ currentSong.singers?.join('/') }}
        </view>
      </view>

      <!-- 旋转的光盘 -->
      <view v-show="!isLyric" class="fade-in w-70 relative flex-1 pt-30">
        <view
          class="w-18.5 h-30 absolute left-49% top-15 z-20
          bg-[url(~@/static/stylus.png)] bg-cover bg-no-repeat
          rotate-0 origin-[12px_12px] transition-transform duration-0.3s"
          :class="{ '-rotate-30!': !playing }"
        />
        <view
          class="w-full h-70 bg-[url(~@/static/circle.png)] bg-cover bg-no-repeat relative rotate-start"
          :class="{ 'rotate-paused': !playing }"
          @click="isLyric = true"
        >
          <image class="w-64% h-64% rd-50% pos-center" :src="`${currentSong.album?.picUrl}?param=200y200`" />
        </view>
      </view>

      <!-- 歌词 -->
      <scroll-view
        v-show="isLyric"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        class="fade-in flex-1 overflow-hidden py-2"
        :class="isLyric ? 'opacity-100' : 'opacity-0'"
        @click="isLyric = false"
      >
        <template v-if="lyricList.length">
          <view
            v-for="(lyric, index) in lyricList"
            :key="lyric.time"
            :class="{ 'text-white': index === currentLyricIndex }"
            class="text-center text-sm text-light py-1 break-words px-10"
          >
            {{ lyric.content }}
          </view>
        </template>
        <view v-else class="pt-30 text-center text-sm text-light">
          暂无歌词
        </view>
      </scroll-view>

      <!-- 底部操作 -->
      <view class="w-full text-[#ffffffcc]">
        <!-- 喜欢和评论栏 -->
        <view class="flex justify-around">
          <text class="iconfont text-2xl" :class="likeIcon" @click="toggleLike" />
          <text class="iconfont icon-comment text-2xl" />
          <text class="iconfont icon-music text-2xl" @click="isSource = true" />
        </view>

        <!-- 进度条 -->
        <view class="flex-v-center px-3 text-xs">
          <view class="w-8">
            {{ formatTime(currentTime) }}
          </view>
          <view class="flex-1">
            <slider
              class="mx-2"
              background-color="rgba(255, 255, 255, 0.3)"
              active-color="var(--color-base)"
              :block-size="12"
              :value="progress"
              @change="onChange"
              @changing="onChanging"
            />
          </view>
          <view class="w-8">
            {{ formatTime(currentSong.dt / 1000) }}
          </view>
        </view>

        <!-- 歌曲操作栏 -->
        <view class="flex-v-center justify-around">
          <text class="iconfont text-2xl" :class="modeIcon" @click="changePlayMode" />
          <text class="iconfont icon-prev text-2xl" @click="onPrev" />
          <text
            class="iconfont text-5xl"
            :class="playing ? 'icon-pause' : 'icon-play'"
            @click="togglePlay"
          />
          <text class="iconfont icon-next text-2xl" @click="onNext" />
          <text class="iconfont icon-playlist text-2xl" @click="visible = true" />
        </view>
      </view>
    </view>

    <mo-play-list v-model="visible" />

    <view
      class="bg-opacity-40 bg-black"
      :class="{ 'pos-full': isSource, 'z-99': isSource }"
      @click="isSource = false"
    >
      <view
        class="w-full bg-white absolute left-0 bottom-0 z-100 rounded-t-2 transition-300 translate-y-100%"
        :class="{ 'translate-y-0!': isSource }"
      >
        <view class="b-b b-b-solid b-b-primary pb2 p2">
          选择音源（默认为酷我）
        </view>
        <view
          v-for="(item, index) in sourceList"
          :key="item.value"
          class="mx2 py2 b-b b-b-solid b-b-primary text-sm flex-v-center justify-between"
          :class="{ 'b-0!': index === 2 }"
          @click="onSource(item.value, index)"
        >
          <text>{{ item.name }}</text>
          <text v-show="activeSource === index" class="iconfont icon-gou text-theme" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useProgress } from './hooks/use-progress'
import { useLike } from './hooks/use-like'
import { useLyric } from './hooks/use-lyric'
import { usePlayer } from '@/store/player'
import { formatTime } from '@/utils/util'

const visible = ref(false)
const isSource = ref(false)
const activeSource = ref(0)
const sourceList = [
  { name: '酷我', value: 'kuwo' },
  { name: '酷狗', value: 'kugou' },
  { name: '咪咕', value: 'migu' },
]

const playerStore = usePlayer()
const { togglePlay, onPrev, onNext, changePlayMode, fetchSongUrl } = playerStore
const { currentSong, playing, currentTime, modeIcon } = storeToRefs(playerStore)
const { progress, onChanging, onChange } = useProgress()
const { likeIcon, toggleLike } = useLike()
const { isLyric, lyricList, currentLyricIndex, scrollTop } = useLyric()

onLoad(() => {
  if (!currentSong.value.id) uni.switchTab({ url: '/pages/index/index' })
})

function onBack() {
  uni.navigateBack()
}

async function onSource(value: string, index: number) {
  if (activeSource.value === index) return
  try {
    await fetchSongUrl(currentSong.value.id, value)
  } catch (error) {
    // 如果当前源没有歌曲，那么不进行选中
    return
  }
  activeSource.value = index
}
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
  }
}
@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

.rotate-start{
  animation: rotate 20s linear infinite
}
.rotate-paused{
  animation-play-state: paused
}
.icon-collect-selected{
  @apply text-theme;
  animation: heartbeat 0.2s;
}
.fade-in{
  animation: fadeIn 0.8s;
}
</style>
