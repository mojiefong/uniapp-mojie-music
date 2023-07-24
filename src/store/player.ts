/**
 * @Author: Mojie
 * @Date: 2023-07-23 16:40:59
 */

import type { Song } from '@/models/user'

export const usePlayer = defineStore('player', () => {
  const audio = uni.getBackgroundAudioManager?.() || uni.createInnerAudioContext()
  const playList = ref<Song[]>([]) // 当前播放列表
  const playing = ref(false) // 是否正在播放
  const currentIndex = ref(0) // 当前播放的索引

  // 当前播放的歌曲
  const currentSong = computed(() => playList.value[currentIndex.value] ?? {})

  function setPlayList(songs: Song[]) {
    playList.value = songs
  }

  function setCurrentIndex(index: number) {
    currentIndex.value = index
  }

  return {
    audio,
    currentSong,
    setPlayList,
    setCurrentIndex,
  }
})
