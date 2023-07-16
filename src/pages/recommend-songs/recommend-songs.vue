<template>
  <view class="px-2 pb-4">
    <mo-songs :songs="recommendSongs" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import type { Song } from '@/models/user'
import { getRecommendSongs } from '@/api/home'

const recommendSongs = ref<Song[]>([])

onLoad(() => {
  // @ts-expect-error get getOpenerEventChannel()
  const event = getCurrentInstance().proxy.getOpenerEventChannel()
  event.on('recommendSongs', (songs: Song[]) => {
    recommendSongs.value = songs
  })
})

/**
 * 在H5端，刷新页面后event.on监听的函数不会触发，所以做个数据监听
 * 使用setTimeout是因为event.on监听的函数在赋值的时候会有延迟
 */
watchEffect(() => {
  setTimeout(() => {
    if (!recommendSongs.value.length) fetchRecommendSongs()
  })
})

async function fetchRecommendSongs() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    const songs = await getRecommendSongs()
    recommendSongs.value = songs
  } finally {
    uni.hideLoading()
  }
}
</script>
