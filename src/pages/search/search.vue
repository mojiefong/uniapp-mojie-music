<template>
  <view class="px-2 pb-4">
    <view class="h-8 bg-white px-2 py-1 rd-8 flex-v-center text-light">
      <text class="iconfont icon-search text-xl pt-0.5" />
      <view class="flex-1 px-1">
        <input v-model="keywords" class="text-sm" placeholder="搜索歌曲/歌单/歌手" focus>
      </view>
      <text v-show="keywords" class="iconfont icon-close text-xl pt-0.5" @click="keywords = ''" />
    </view>

    <view v-show="searchHistory.length" class="py-2">
      <view class="pb-2">
        搜索历史
      </view>
      <text v-for="item in searchHistory" :key="item" class="text-xs bg-placeholder px-3 py-1 rd-3 mr-2 mb-2 inline-block">
        {{ item }}
      </text>
    </view>

    <view class="py-2">
      <view class="pb-2">
        热门搜索
      </view>
      <text v-for="hot in hotSearches" :key="hot.first" class="text-xs bg-placeholder px-3 py-1 rd-3 mr-2 mb-2 inline-block">
        {{ hot.first }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { HotSearch } from '@/models'
import { getHotSearches } from '@/api/home'
import { useStorage } from '@/store/storage'

const keywords = ref('')
const hotSearches = ref<HotSearch['hots']>([])

const storageStore = useStorage()

const { searchHistory } = storeToRefs(storageStore)

onMounted(fetchHotSearches)

async function fetchHotSearches() {
  const { data } = await getHotSearches()
  hotSearches.value = data.result.hots
}
</script>
