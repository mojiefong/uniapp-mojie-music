<template>
  <layout>
    <view class="px2 pb2">
      <mo-song-list :song-list="songList" />
    </view>
  </layout>
</template>

<script setup lang="ts">
import type { SongList } from '@/models'
import { getRecommendSongList } from '@/api/home'

const songList = ref<SongList[]>([])

onMounted(fetchRecommendSongList)

async function fetchRecommendSongList() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    const { data } = await getRecommendSongList(100)
    songList.value = data.result
  } finally {
    uni.hideLoading()
  }
}
</script>
