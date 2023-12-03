<template>
  <view
    class="bg-opacity-40 bg-black"
    :class="{ 'pos-full': visible, 'z-99': visible }"
    @click="visible = false"
  >
    <view
      class="w-full h-70% absolute left-0 bottom-0 bg-white z-100 transition-300 translate-y-100% p2 flex flex-col rounded-t-2"
      :class="{ 'translate-y-0!': visible }"
      @click.stop
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
          <text class="iconfont icon-delete text-xl" @click="onDelete" />
        </view>
      </view>

      <scroll-view class="flex-1 overflow-hidden" :scroll-y="true">
        <mo-songs :songs="playList" :all-play="false" :type="SongsType.None" />
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { SongsType } from '@/enums'
import { usePlayer } from '@/store/player'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
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

async function onDelete() {
  const { confirm } = await uni.showModal({
    content: '确定要清空播放列表吗？',
  })
  if (confirm) {
    clearSongList()
    uni.navigateBack()
  }
}
</script>
