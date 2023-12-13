<template>
  <layout>
    <view class="px-2 pb-2">
      <view class="h-8 flex-center text-light rd-7 bg-white" @click="toSearch">
        <text class="iconfont icon-search text-xl pt-0.5" />
        <text class="text-sm">
          搜索歌曲/歌单/歌手
        </text>
      </view>

      <mo-card title="每日推荐" @more="toRecommendSong">
        <mo-songs :all-play="false" :slice="3" :songs="recommendSongs" />
      </mo-card>

      <mo-card title="推荐歌单" @more="toRecommendSongList">
        <mo-song-list :song-list="songList" @click="toSongList" />
      </mo-card>

      <mo-card title="排行榜" @more="toTopList">
        <view
          v-for="item in topList.slice(0, 4)"
          :key="item.id"
          class="flex-v-center pb2 last:pb0"
          @click="toSongList(item.id)"
        >
          <image class="w-20 h-20 rd-2" :src="`${item.coverImgUrl}?param=100y100`" />
          <view class="flex-1 flex-h-center flex-col ml-2 overflow-hidden">
            <text class="text-sm">
              {{ item.name }}
            </text>
            <view v-for="(song, index) in item.tracks" :key="index" class="text-xs text-light inline-flex">
              <text class="w-3 font-sans">
                {{ index + 1 }}
              </text>
              <text class="flex-1 truncate">
                {{ song.first }} - {{ song.second }}
              </text>
            </view>
          </view>
        </view>
      </mo-card>
    </view>
  </layout>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import type { Song, SongList, TopList } from '@/models'
import { getRecommendSongList, getRecommendSongs, getTopList } from '@/api/home'

const recommendSongs = ref<Song[]>([])
const songList = ref<SongList[]>([])
const topList = ref<TopList[]>([])

onLoad(fetchAllData)

async function fetchAllData() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })

    await Promise.all([
      fetchRecommendSongs(),
      fetchRecommendSongList(),
      fetchTopList(),
    ])
  } finally {
    uni.hideLoading()
  }
}

async function fetchRecommendSongs() {
  const songs = await getRecommendSongs()
  recommendSongs.value = songs
}

async function fetchRecommendSongList() {
  const { data } = await getRecommendSongList()
  songList.value = data.result
}

async function fetchTopList() {
  const { data } = await getTopList()
  topList.value = data.list
}

function toRecommendSong() {
  uni.navigateTo({
    url: '/pages/recommend-songs/recommend-songs',
    success(res) {
      res.eventChannel.emit('recommendSongs', recommendSongs.value)
    },
  })
}

function toRecommendSongList() {
  uni.navigateTo({ url: '/pages/recommend-song-list/recommend-song-list' })
}

function toTopList() {
  uni.navigateTo({
    url: '/pages/top-list/top-list',
    success(res) {
      res.eventChannel.emit('topList', topList.value)
    },
  })
}

function toSearch() {
  uni.navigateTo({ url: '/pages/search/search' })
}

function toSongList(item: SongList | number) {
  let url = ''
  if (typeof item === 'number') {
    url = `/pages/song-list-detail/song-list-detail?id=${item}`
  } else {
    url = `/pages/song-list-detail/song-list-detail?id=${item.id}`
  }
  uni.navigateTo({ url })
}
</script>
