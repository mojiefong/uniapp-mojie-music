<template>
  <layout>
    <view class="w-full h-10 pt-[var(--status-bar-height)] text-sm text-center fixed flex-v-center top-0 left-0 z-12 text-white">
      <text class="iconfont icon-left text-3xl relative z-1" @click="onBack" />
      <view class="pl-8 pr-1 -ml-7.5 text-center flex-1 text-ellipsis-single opacity-0" :style="titleStyle">
        {{ detail?.name }}
      </view>
    </view>

    <view id="img" class="w-full h-60 fixed top-0 left-0 z-10 overflow-hidden" :style="imgStyle">
      <image class="w-full h-75" :src="`${detail?.coverImgUrl}?param=300y300`" />
    </view>

    <view class="px-2 pt-60 pb-2">
      <mo-songs v-if="detail" :songs="detail.tracks" :type="SongsType.Index" />
    </view>
  </layout>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import type { SongListDetail } from '@/models'
import { getSongListDetail } from '@/api/home'
import { SongsType } from '@/enums'

const detail = ref<SongListDetail>()
const titleStyle = ref<CSSProperties>()
const imgStyle = ref<CSSProperties>()

onLoad((options) => {
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#ffffff',
  })

  options!.id && fetchSongListDetail(options!.id)
})

onPageScroll(({ scrollTop }) => {
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query.select('#img').boundingClientRect(({ height }: any) => {
    const opacity = (scrollTop > 0 ? Math.round(scrollTop + 40) : Math.round(scrollTop)) / height
    titleStyle.value = { opacity: opacity >= 1 ? 1 : opacity }
    // #ifdef H5
    imgStyle.value = { top: scrollTop <= 200 ? `-${scrollTop}px` : '-200px' }
    // #endif

    // #ifndef H5
    imgStyle.value = { top: scrollTop <= 200 ? `-${scrollTop}px` : '-190px' }
    // #endif
  }).exec()
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

function onBack() {
  uni.navigateBack()
}
</script>
