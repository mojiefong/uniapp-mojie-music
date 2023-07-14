<template>
  <view class="pt-1">
    <view v-for="song in songs" :key="song.al.id" class="song flex-v-center box-content">
      <image class="w-12 h-12 rd-2" :src="song.al.picUrl" />
      <!-- <text class="text-light">
          {{ n }}
        </text> -->
      <view class="info h-12 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-1 box-content">
        <text class="text-sm">
          {{ song.al.name }}
        </text>
        <text class="text-xs text-light">
          {{ song.ar[0].name }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  songs: any[]
}>()
</script>

<style scoped>
.song:last-child .info{
  border: 0;
}
</style>
