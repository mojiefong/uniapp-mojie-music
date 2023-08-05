<template>
  <view class="wh-full fixed top-0 left-0 bg-black">
    <view class="wh-full absolute top-0 left-0 opacity-50 blur-[20px] -z1">
      <image class="wh-full" :src="`${currentSong.album?.picUrl}?param=400y400`" />
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
        class="w-18.5 h-30 absolute left-49% top-15 z-100
        bg-[url(~@/static/stylus.png)] bg-cover bg-no-repeat
        rotate-0 origin-[12px_12px] transition-transform duration-0.3s"
        :class="{ '-rotate-30!': isOk }"
      />
      <view class="w-full h-70 bg-[url(~@/static/circle.png)] bg-cover bg-no-repeat relative">
        <image class="w-64% h-64% rd-50% pos-center" :src="`${currentSong.album?.picUrl}?param=200y200`" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { usePlayer } from '@/store/player'

const isOk = ref(true)
const { currentSong } = usePlayer()

onLoad(() => {
  if (!currentSong.id) uni.switchTab({ url: '/pages/index/index' })
})

function onBack() {
  uni.navigateBack()
}
</script>
