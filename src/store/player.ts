/**
 * @Author: Mojie
 * @Date: 2023-07-23 16:40:59
 */

import { sleep } from '@mojiee/utils'
import type { Song } from '@/models/user'
import { getSongUrl } from '@/api/home'

export const usePlayer = defineStore('player', () => {
  const audio = uni.getBackgroundAudioManager?.() || uni.createInnerAudioContext()
  const playList = ref<Song[]>([]) // 当前播放列表
  const playing = ref(false) // 是否正在播放
  const currentIndex = ref(0) // 当前播放的索引
  const currentTime = ref(0) // 当前播放时间
  const progressDragging = ref(false) // 是否正在拖动播放的进度条
  const switching = ref(false) // 是否正在切歌

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
        showCancel: false,
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

  // 上一曲
  async function onPrev() {
    switching.value = true
    playing.value = false
    const index = unref(currentIndex) - 1
    // 如果是第一首歌就设置成最后一首歌
    const prevIndex = index < 0 ? playList.value.length - 1 : index
    currentIndex.value = prevIndex
    fetchSongUrl()
    await sleep(300)
    playing.value = true
    switching.value = false
  }

  // 下一曲
  async function onNext() {
    playing.value = false
    let index = unref(currentIndex) + 1
    // 如果是最后一首歌就设置成第一首歌
    const prevIndex = index === playList.value.length ? index = 0 : index
    currentIndex.value = prevIndex
    fetchSongUrl()
    await sleep(300)
    playing.value = true
    switching.value = false
  }

  return {
    audio,
    playList,
    currentIndex,
    playing,
    currentSong,
    currentTime,
    progressDragging,
    switching,
    onPlay,
    togglePlay,
    onPrev,
    onNext,
  }
})
