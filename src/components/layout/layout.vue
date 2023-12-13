<template>
  <view>
    <view :class="{ 'pb-50px': playList.length }">
      <slot />
    </view>
    <view v-if="playList.length" class="mini-player" @click="onClick">
      <view class="w-8 h-8 rd-50%">
        <image class="wh-full rd-50%" :src="`${currentSong.album?.picUrl}?param=100y100`" />
      </view>
      <view class="mx2 flex-1 overflow-hidden whitespace-nowrap">
        <text class="text-sm whitespace-nowrap">
          {{ currentSong.name }}
        </text>
        &nbsp;
        <text class="text-xs text-placeholder whitespace-nowrap">
          {{ currentSong.singers?.join('/') }}
        </text>
      </view>
      <view class="flex-center" @click.stop>
        <text
          class="iconfont text-2xl mr2"
          :class="playing ? 'icon-pause' : 'icon-play'"
          @click="togglePlay"
        />
        <text class="iconfont icon-playlist text-2xl" @click="visible = true" />
      </view>
    </view>

    <mo-play-list v-model="visible" />
  </view>
</template>

<script setup lang="ts">
import { usePlayer } from '@/store/player'

const visible = ref(false)

const playerStore = usePlayer()
const { togglePlay } = playerStore
const { currentSong, playing, playList } = storeToRefs(playerStore)

function onClick() {
  uni.navigateTo({ url: '/pages/player/player' })
}
</script>

<style scoped>
.mini-player{
  @apply w-full h-50px fixed left-0 z-998 flex-v-center text-base;
  bottom: var(--window-bottom);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 0 0.5rem;
}
</style>
