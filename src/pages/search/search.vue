<template>
  <layout>
    <view class="px2 pb2">
      <view class="h-8 fixed left-2 right-2 bg-bg-primary">
        <view class="bg-white rd-8 flex-v-center text-light">
          <text class="iconfont icon-search text-xl pt-0.5" />
          <view class="flex-1 px-1">
            <input v-model="keywords" class="text-sm" placeholder="搜索歌曲/歌手" focus>
          </view>
          <text v-show="keywords" class="iconfont icon-close text-xl pt-0.5" @click="onClear" />
        </view>
      </view>

      <view v-show="!searchList.length" class="pt-8">
        <view v-show="searchHistory.length" class="py-2">
          <view class="pb-2 flex-v-center justify-between">
            <text>搜索历史</text>
            <text class="iconfont icon-delete" @click="onDelete" />
          </view>
          <text
            v-for="item in searchHistory"
            :key="item"
            class="text-xs bg-placeholder px-3 py-1 rd-3 mr-2 mb-2 inline-block"
            @click="keywords = item"
          >
            {{ item }}
          </text>
        </view>

        <view class="py-2">
          <view class="pb-2">
            热门搜索
          </view>
          <text
            v-for="hot in hotSearches"
            :key="hot.first"
            class="text-xs bg-placeholder px-3 py-1 rd-3 mr-2 mb-2 inline-block"
            @click="keywords = hot.first"
          >
            {{ hot.first }}
          </text>
        </view>
      </view>

      <view v-show="searchList.length" class="pt-8">
        <view
          v-for="(song, index) in searchList"
          :key="song.id"
          class="text-sm text-secondary leading-6 flex-v-center"
          @click="toPlay(index)"
        >
          <text class="iconfont icon-music mr-1" />
          <text>
            {{ song.name }}
          </text>
        </view>
      </view>
    </view>
  </layout>
</template>

<script setup lang="ts">
import { debounce } from '@mojiee/utils'
import { onLoad } from '@dcloudio/uni-app'
import type { HotSearch, Song } from '@/models'
import { getHotSearches, getSearchList } from '@/api/home'
import { useStorage } from '@/store/storage'
import { usePlayer } from '@/store/player'

const keywords = ref('')
const hotSearches = ref<HotSearch['hots']>([])
const searchList = ref<Song[]>([])

const storageStore = useStorage()
const { searchHistory } = storeToRefs(storageStore)
const { onPlay } = usePlayer()

onLoad(fetchHotSearches)

watch(keywords, debounce(300, fetchSearchList))

async function fetchHotSearches() {
  const { data } = await getHotSearches()
  hotSearches.value = data.result.hots
}

async function fetchSearchList() {
  const keywordsVal = keywords.value
  if (!keywordsVal) return
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    searchList.value = await getSearchList(keywordsVal)
    storageStore.saveSearchHistory(keywordsVal)
  } finally {
    uni.hideLoading()
  }
}

function toPlay(index: number) {
  onPlay(searchList.value, index)
  uni.navigateTo({ url: '/pages/player/player' })
}

function onClear() {
  keywords.value = ''
  searchList.value = []
}

function onDelete() {
  uni.showModal({
    title: '提示',
    content: '确定清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        storageStore.removeSearchHistory()
      }
    },
  })
}
</script>
