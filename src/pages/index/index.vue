<template>
  <view class="px-2 pt-2 pb-10">
    <view class=" flex-center text-light rd-2 bg-white">
      <text class="iconfont icon-search text-xl pt-0.5" />
      <text class="text-sm">
        告白气球
      </text>
    </view>

    <card title="推荐歌曲">
      <songs :songs="recommendSongs.slice(0, 3)" />
    </card>

    <card title="热门歌曲">
      <songs :songs="hotSongs.slice(0, 3)" />
    </card>

    <card title="推荐歌单">
      <view class="grid grid-cols-3 gap-2 pt-2">
        <view v-for="item in songList" :key="item.id">
          <view class="w-full h-28">
            <image class="w-full h-full rd-2" :src="`${item.picUrl}?param=150y150`" />
          </view>
          <text class="name">
            {{ item.name }}
          </text>
        </view>
      </view>
    </card>

    <card title="排行榜">
      <view class="pt-1">
        <view v-for="n in 3" :key="n" class="song flex-v-center box-content">
          <image class="w-20 h-20 rd-2" src="https://avatars.githubusercontent.com/u/17779577?v=4" />
          <view class="info h-12 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-5 box-content">
            <text class="text-sm">
              热歌榜
            </text>
            <text class="text-xs text-light">
              1 告白气球
            </text>
            <text class="text-xs text-light">
              2 稻香
            </text>
            <text class="text-xs text-light">
              3 青花瓷
            </text>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script setup lang="ts">
import type { Song, SongList } from '@/models/user'
import { getHotSongs, getRecommendSongList, getRecommendSongs } from '@/api/home'

const recommendSongs = ref<Song[]>([])
const hotSongs = ref<Song[]>([])
const songList = ref<SongList[]>([])

onMounted(fetchAllData)

async function fetchAllData() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })

    await Promise.all([
      fetchRecommendSongs(),
      fetchHotSongs(),
      fetchRecommendSongList(),
    ])
  } finally {
    uni.hideLoading()
  }
}

async function fetchRecommendSongs() {
  const songs = await getRecommendSongs()
  recommendSongs.value = songs
}

async function fetchHotSongs() {
  const songs = await getHotSongs()
  hotSongs.value = songs
}

async function fetchRecommendSongList() {
  const { data } = await getRecommendSongList()
  songList.value = data.result
}
</script>

<style scoped>
.song:last-child .info{
  border: 0;
}

.name {
  font-size: 22rpx;
  padding-top: 16rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}
</style>
