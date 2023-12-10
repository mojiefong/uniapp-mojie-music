<template>
  <view>
    <view :class="{ 'pb-[var(--tab-bar-height)]': playList.length }">
      <slot />
    </view>
    <view v-if="playList.length" class="mini-player" @click="onClick">
      <view class="w-10 h-10 rd-50%">
        <image class="wh-full rd-50%" :src="`${currentSong.album?.picUrl}?param=100y100`" />
      </view>
      <view class="mx2 flex-1 overflow-hidden whitespace-nowrap">
        <text class="text-sm whitespace-nowrap">
          {{ currentSong.name }}
        </text>
        -
        <text class="text-xs text-placeholder whitespace-nowrap">
          {{ currentSong.singers?.join('/') }}
        </text>
      </view>
      <view class="flex-center" @click.stop>
        <text
          class="iconfont text-3xl mr2"
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
  @apply w-full fixed left-0 z-998 flex-v-center text-base;
  height: var(--tab-bar-height);
  bottom: var(--window-bottom);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 0 0.5rem;
}
</style>
