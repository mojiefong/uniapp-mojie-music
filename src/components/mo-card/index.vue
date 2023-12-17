<template>
  <view class="rd-2 bg-white mt-2 p-2">
    <view class="flex-v-center h-6 pb2">
      <text class="line-height-4 flex-1">
        {{ title }}
      </text>
      <view class="flex-v-center text-light">
        <text class="text-xs" @click="emits('more')">
          更多
        </text>
        <text class="iconfont icon-right -mt-1px" />
      </view>
    </view>

    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
const emits = defineEmits(['more'])
</script>
