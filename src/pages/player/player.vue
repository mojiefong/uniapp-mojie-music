<template>
  <view class="w-full h-full fixed top-0 left-0 bg-black">
    <view class="w-full h-full absolute top-0 left-0 opacity-50 blur-[20px] -z1">
      <image class="w-full h-full" :src="currentSong.album?.picUrl" />
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
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { usePlayer } from '@/store/player'

const { currentSong } = usePlayer()

onLoad(() => {
  if (!currentSong.id) uni.switchTab({ url: '/pages/index/index' })
})

function onBack() {
  uni.navigateBack()
}
</script>
