/**
 * @Author: Mojie
 * @Date: 2023-07-23 16:40:59
 */

import { getSongUrl } from '@/api/home'
import type { Song } from '@/models/user'

export const usePlayer = defineStore('player', () => {
  const audio = uni.getBackgroundAudioManager?.() || uni.createInnerAudioContext()
  const playList = ref<Song[]>([]) // 当前播放列表
  const playing = ref(false) // 是否正在播放
  const currentIndex = ref(0) // 当前播放的索引

  // 当前播放的歌曲
  const currentSong = computed(() => playList.value[currentIndex.value] ?? {})

  // 获取歌曲播放的url地址
  async function fetchSongUrl() {
    try {
      const { data } = await getSongUrl(currentSong.value.id)
      const { url } = data.data[0]
      audio.src = url
      audio.play()
    } catch (error) {
      uni.showModal({
        title: '提示',
        content: '获取播放地址失败',
      })
    }
  }

  // 触发播放
  function onPlay(songs: Song[], index: number) {
    playList.value = songs
    currentIndex.value = index
    playing.value = true
    fetchSongUrl()
  }

  // 切换播放
  function togglePlay() {
    playing.value ? audio.pause() : audio.play()
  }

  return {
    audio,
    playing,
    currentSong,
    onPlay,
    togglePlay,
  }
})
