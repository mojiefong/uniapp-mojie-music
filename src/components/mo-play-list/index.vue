<template>
  <view
    v-if="visible"
    class="pos-full bg-opacity-40 bg-black z-100"
    @click="visible = false"
    @touchmove.prevent
  />
  <view
    class="w-full h-70% fixed left-0 bottom-0 bg-white z-999 transition-300 translate-y-100% p2 flex flex-col rounded-t-2"
    :class="{ 'translate-y-0!': visible }"
  >
    <view class="flex-v-center text-sm justify-between">
      <view class="flex-v-center" @click="changePlayMode">
        <text class="iconfont text-xl mr-1" :class="modeIcon" />
        <text>{{ modeText }}</text>
        <text class="text-[18rpx] text-light ml-1">
          ({{ playList.length }})
        </text>
      </view>
      <view class="flex-v-center">
        <text class="iconfont icon-delete text-xl" @click="onClear" />
      </view>
    </view>

    <scroll-view class="flex-1 overflow-hidden" :scroll-y="true">
      <mo-songs :songs="playList" :all-play="false" :type="SongsType.None" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { SongsType } from '@/enums'
import { usePlayer } from '@/store/player'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'clearSuccess'): void
}>()

const playerStore = usePlayer()
const { changePlayMode, clearSongList } = playerStore
const { modeIcon, modeText, playList } = storeToRefs(playerStore)

const visible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

async function onClear() {
  const { confirm } = await uni.showModal({
    content: '确定要清空播放列表吗？',
  })
  if (confirm) {
    clearSongList()
    visible.value = false
    emit('clearSuccess')
  }
}
</script>
