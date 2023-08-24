<template>
  <view class="wh-full fixed top-0 left-0 bg-black">
    <view class="wh-full absolute top-0 left-0 opacity-50 blur-[20px] -z1">
      <image class="wh-full" :src="`${currentSong.album?.picUrl}?param=200y200`" />
    </view>

    <view class="w-full h-9 text-sm absolute top-0 left-0 z-10 text-white">
      <text class="iconfont icon-left text-3xl absolute left-2" @click="onBack" />
      <view class="w-80% line-height-9 my0 mxa text-center text-ellipsis-single">
        {{ currentSong.name }}
      </view>
      <view class="-mt-2 text-[20rpx] text-placeholder text-center">
        {{ currentSong.singers?.join('/') }}
      </view>
    </view>

    <view class="w-70 relative pt-30 mxa">
      <view
        class="w-18.5 h-30 absolute left-49% top-15 z-20
        bg-[url(~@/static/stylus.png)] bg-cover bg-no-repeat
        rotate-0 origin-[12px_12px] transition-transform duration-0.3s"
        :class="{ '-rotate-30!': !playing }"
      />
      <view
        class="w-full h-70 bg-[url(~@/static/circle.png)] bg-cover bg-no-repeat relative"
        :class="{ rotate: playing }"
      >
        <image class="w-64% h-64% rd-50% pos-center" :src="`${currentSong.album?.picUrl}?param=200y200`" />
      </view>
    </view>

    <view class="w-full absolute bottom-5 left-0 text-[#ffffffcc]">
      <view class="flex justify-around">
        <text />
        <text class="iconfont text-2xl" :class="likeIcon" @click="toggleLike" />
        <text />
        <text class="iconfont icon-comment text-2xl" />
        <text />
      </view>

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

    <mo-play-list v-model="visible" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useProgress } from './hooks/use-progress'
import { useLike } from './hooks/use-like'
import { usePlayer } from '@/store/player'
import { formatTime } from '@/utils/util'

const visible = ref(false)

const playerStore = usePlayer()
const { togglePlay, onPrev, onNext, changePlayMode } = playerStore
const { currentSong, playing, currentTime, modeIcon } = storeToRefs(playerStore)
const { progress, onChanging, onChange } = useProgress()
const { likeIcon, fetchLikeList, toggleLike } = useLike()

onLoad(() => {
  fetchLikeList()
  if (!currentSong.value.id) uni.switchTab({ url: '/pages/index/index' })
})

function onBack() {
  uni.navigateBack()
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

.rotate{
  animation: rotate 20s linear infinite
}
.icon-collect-selected{
  @apply text-theme;
  animation: heartbeat 0.2s;
}
</style>
