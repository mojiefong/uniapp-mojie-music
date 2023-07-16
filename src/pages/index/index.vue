<template>
  <view class="px-2 pb-10">
    <view class="h-6 flex-center text-light rd-1 bg-white">
      <text class="iconfont icon-search text-xl pt-0.5" />
      <text class="text-[22rpx]">
        告白气球
      </text>
    </view>

    <mo-card title="每日推荐" @more="toRecommendSong">
      <mo-songs :songs="recommendSongs.slice(0, 3)" />
    </mo-card>

    <mo-card title="推荐歌单" @more="toRecommendSonList">
      <mo-song-list :song-list="songList" />
    </mo-card>

    <mo-card title="排行榜">
      <view class="pt-1">
        <view v-for="item in topList.slice(0, 4)" :key="item.id" class="song flex-v-center box-content">
          <image class="w-20 h-20 rd-2" :src="`${item.coverImgUrl}?param=100y100`" />
          <view class="info h-12 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-5 box-content">
            <text class="text-sm">
              {{ item.name }}
            </text>
            <text v-for="(song, index) in item.tracks" :key="index" class="text-xs text-light">
              {{ index + 1 }} {{ song.first }} - {{ song.second }}
            </text>
          </view>
        </view>
      </view>
    </mo-card>
  </view>
</template>

<script setup lang="ts">
import type { Song, SongList, TopList } from '@/models/user'
import { getRecommendSongList, getRecommendSongs, getTopList } from '@/api/home'

const recommendSongs = ref<Song[]>([])
const songList = ref<SongList[]>([])
const topList = ref<TopList[]>([])

onMounted(fetchAllData)

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

function toRecommendSonList() {
  uni.navigateTo({ url: '/pages/recommend-song-list/recommend-song-list' })
}
</script>

<style scoped>
.song:last-child .info{
  border: 0;
}
</style>
