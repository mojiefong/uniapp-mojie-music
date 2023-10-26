<template>
  <view class="bg-white mt-4 p2 rd-2">
    {{ title }}
    <text class="text-xs text-light">
      ({{ playList.length }})
    </text>
    <view
      v-for="item in playList"
      :key="item.id"
      class="flex-v-center box-content mt-2"
    >
      <image class="w-10 h-10 rd-2 mr-2" :src="`${item.coverImgUrl}?param=60y60`" />
      <view class="flex flex-col">
        <text class="text-sm">
          {{ item.name }}
        </text>
        <text class="text-xs text-light">
          {{ item.trackCount }}首，播放{{ item.playCount }}次
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { UserPlayList } from '@/models'

defineProps<{
  title: string
  playList: UserPlayList[]
}>()
</script>
