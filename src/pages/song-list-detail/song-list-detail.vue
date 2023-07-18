<template>
  <view>
    <view class="w-full h-8 text-sm text-center flex-v-center fixed top-0 left-0 z-1">
      <text class="iconfont icon-left text-xl" />
      <view class="pl-6 pr-1 -ml-4 text-center flex-1 text-ellipsis-single">
        {{ detail?.name }}
      </view>
    </view>

    <image class="w-full" :src="`${detail?.coverImgUrl}?param=400y400`" />
    <view class="px-2 pb-10">
      <mo-songs v-if="detail" :songs="detail.tracks" show-index />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getSongListDetail } from '@/api/home'
import type { SongListDetail } from '@/models/user'

const detail = ref<SongListDetail>()

onLoad((options) => {
  if (options?.id) {
    fetchSongListDetail(options.id)
  } else {
    uni.navigateBack()
  }
})

async function fetchSongListDetail(id: string) {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    const item = await getSongListDetail(id)
    detail.value = item
  } finally {
    uni.hideLoading()
  }
}
</script>
