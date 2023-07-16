<template>
  <view class="pt-1">
    <view v-for="song in songs" :key="song.id" class="song flex-v-center box-content">
      <image class="w-10 h-10 rd-2" :src="`${song.album.picUrl}?param=60y60`" />
      <view class="info h-10 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-1 box-content">
        <text class="text-sm">
          {{ song.name }}
        </text>
        <text class="text-[20rpx] text-light">
          {{ song.singers.join('/') }} - {{ song.album.name }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Song } from '@/models/user'

defineProps<{
  songs: Song[]
}>()
</script>

<style scoped>
.song:last-child .info{
  border: 0;
}
</style>
