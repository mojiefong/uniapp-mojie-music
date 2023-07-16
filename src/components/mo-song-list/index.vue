<template>
  <view class="grid grid-cols-3 gap-2 pt-2">
    <view v-for="item in songList" :key="item.id">
      <view class="w-full h-29vw">
        <image class="w-full h-full rd-2" :src="`${item.picUrl}?param=200y200`" />
      </view>
      <text class="name">
        {{ item.name }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SongList } from '@/models/user'

defineProps<{ songList: SongList[] }>()
</script>
