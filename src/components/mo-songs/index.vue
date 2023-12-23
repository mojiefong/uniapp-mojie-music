<template>
  <view v-show="allPlay" class="py2" @click="onClickAll">
    <view class="flex-v-center">
      <text class="w-6 h-6 text-white bg-theme flex-center rd-50%">
        <text class="iconfont icon-play" />
      </text>
      <text class="pl-2 pr-1">
        播放全部
      </text>
      <text class="text-[18rpx] text-light">
        ({{ songs.length }})
      </text>
    </view>
  </view>

  <view
    v-for="(song, index) in songList" :key="song.id"
    class="flex-v-center pb2"
    @click="onClick(song, index)"
  >
    <text
      v-if="type === SongsType.Index"
      class="w-4 text-center mr-1 text-light text-sm"
      :class="{ 'text-xs': index.toString().length > 2 }"
    >
      {{ index + 1 }}
    </text>
    <image v-if="type === SongsType.Image" class="w-10 h-10 rd-2" :src="`${song.album.picUrl}?param=60y60`" />
    <view
      class="info flex-1 flex-h-center flex-col ml-2 overflow-hidden"
      :class="{ 'h-10': type !== SongsType.Index }"
    >
      <text
        class="text-sm"
        :class="{ 'text-theme': currentIndex === index }"
      >
        {{ song.name }}
      </text>
      <text class="text-[20rpx] text-light truncate">
        {{ song.singers.join('/') }} - {{ song.album.name }}
      </text>
    </view>
    <text
      v-if="currentIndex === index"
      class="iconfont icon-playing text-theme"
    />
  </view>
</template>

<script setup lang="ts">
import type { Song } from '@/models'
import { SongsType } from '@/enums'
import { usePlayer } from '@/store/player'

interface Props {
  songs: Song[]
  type?: SongsType
  allPlay?: boolean
  slice?: number
}

const props = withDefaults(defineProps<Props>(), {
  allPlay: true,
  type: SongsType.Image,
})

const playerStore = usePlayer()
const { currentIndex } = storeToRefs(playerStore)
const songList = computed(() => props.slice ? props.songs.slice(0, props.slice) : props.songs)

function onClick(song: Song, index: number) {
  playerStore.onPlay(props.songs, index)
  uni.navigateTo({ url: '/pages/player/player' })
}

function onClickAll() {
  playerStore.onPlay(props.songs, 0)
  uni.navigateTo({ url: '/pages/player/player' })
}
</script>
