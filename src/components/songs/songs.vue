<template>
  <view class="pt-1">
    <view v-for="n in 3" :key="n" class="song flex-v-center box-content">
      <image class="w-12 h-12 rd-2" src="https://avatars.githubusercontent.com/u/17779577?v=4" />
      <!-- <text class="text-light">
          {{ n }}
        </text> -->
      <view class="info h-12 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-1 box-content">
        <text class="text-sm">
          告白气球
        </text>
        <text class="text-xs text-light">
          周杰伦的床边故事
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.song:last-child .info{
  border: 0;
}
</style>
