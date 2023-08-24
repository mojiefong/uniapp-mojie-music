<template>
  <view class="px-2 pb-4">
    <view class="pt-1 grid grid-cols-3 gap-2">
      <view v-for="item in topList" :key="item.id" @click="toSongList(item.id)">
        <image class="w-full h-29vw rd-2" :src="`${item.coverImgUrl}?param=200y200`" />
        <text class="text-xs">
          {{ item.name }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import type { TopList } from '@/models'
import { getTopList } from '@/api/home'

const topList = ref<TopList[]>([])

onLoad(() => {
  // @ts-expect-error get getOpenerEventChannel()
  const event = getCurrentInstance().proxy.getOpenerEventChannel()
  event.on('topList', (list: TopList[]) => {
    topList.value = list
  })
})

/**
 * 在H5端，刷新页面后event.on监听的函数不会触发，所以做个数据监听
 * 使用setTimeout是因为event.on监听的函数在赋值的时候会有延迟
 */
watchEffect(() => {
  setTimeout(() => {
    if (!topList.value.length) fetchTopList()
  })
})

async function fetchTopList() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    const { data } = await getTopList()
    topList.value = data.list
  } finally {
    uni.hideLoading()
  }
}

function toSongList(id: number) {
  uni.navigateTo({ url: `/pages/song-list-detail/song-list-detail?id=${id}` })
}
</script>
