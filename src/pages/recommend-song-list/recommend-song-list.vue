<template>
  <layout>
    <view class="px2 pb2">
      <mo-song-list :song-list="songList" @click="onClick" />
    </view>
  </layout>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import type { SongList } from '@/models'
import { getRecommendSongList } from '@/api/home'

const songList = ref<SongList[]>([])

onLoad(fetchRecommendSongList)

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

function onClick(item: SongList) {
  uni.navigateTo({
    url: `/pages/song-list-detail/song-list-detail?id=${item.id}`,
  })
}
</script>
