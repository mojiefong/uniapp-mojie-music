<template>
  <layout>
    <view id="img" class="w-full h-260px fixed top-0 left-0 z-10 overflow-hidden" :style="imgStyle">
      <image class="w-full h-300px" :src="`${detail?.coverImgUrl}?param=300y300`" />
    </view>

    <view class="w-full h-40px text-sm text-center fixed flex-v-center top-[var(--status-bar-height)] left-0 z-12 text-white">
      <text class="iconfont icon-left text-3xl relative z-1" @click="onBack" />
      <view class="pl-8 pr-1 -ml-7.5 text-center flex-1 text-ellipsis-single opacity-0" :style="titleStyle">
        {{ detail?.name }}
      </view>
    </view>

    <view class="px-2 pt-260px pb-2">
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

const query = uni.createSelectorQuery().in(getCurrentInstance())

onLoad((options) => {
  uni.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#ffffff',
  })

  options!.id && fetchSongListDetail(options!.id)
})

onPageScroll(({ scrollTop }) => {
  query.select('#img').boundingClientRect(({ height }: any) => {
    const opacity = (scrollTop > 0 ? Math.round(scrollTop + 40) : Math.round(scrollTop)) / height
    titleStyle.value = { opacity: opacity >= 1 ? 1 : opacity }
    // #ifdef H5
    imgStyle.value = { top: scrollTop <= 220 ? `-${scrollTop}px` : '-220px' }
    // #endif

    // #ifndef H5
    imgStyle.value = { top: scrollTop <= 195 ? `-${scrollTop}px` : '-195px' }
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
