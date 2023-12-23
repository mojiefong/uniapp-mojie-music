/**
 * @Author: Mojie
 * @Date: 2023-07-23 16:40:59
 */

import { sleep } from '@mojiee/utils'
import type { Song } from '@/models'
import { getSongUrl } from '@/api/home'
import { PlayMode } from '@/enums'
import { getPlayMode, setPlayMode } from '@/utils/storage'
import { getRandomIndexes } from '@/utils/util'

export const usePlayer = defineStore('player', () => {
  const audio = uni.getBackgroundAudioManager?.() || uni.createInnerAudioContext()
  const playList = ref<Song[]>([]) // 当前播放列表
  const playing = ref(false) // 是否正在播放
  const currentIndex = ref(0) // 当前播放的索引
  const currentTime = ref(0) // 当前播放时间
  const progressDragging = ref(false) // 是否正在拖动播放的进度条
  const switching = ref(false) // 是否正在切歌
  const playMode = ref(getPlayMode() || PlayMode.Sequence) // 播放模式
  const randomPlayIndexes = ref<number[]>([]) // 随机播放时，根据播放列表随机生成的索引列表

  /** 当前播放的歌曲 */
  const currentSong = computed(() => playList.value[currentIndex.value] ?? {})
  /** 播放模式的icon */
  const modeIcon = computed(() => {
    const type: Record<string, string> = {
      [PlayMode.Sequence]: 'icon-sequence',
      [PlayMode.Loop]: 'icon-loop',
      [PlayMode.Random]: 'icon-random',
    }
    return type[playMode.value]
  })
  /** 播放模式的文字 */
  const modeText = computed(() => {
    const type: Record<string, string> = {
      [PlayMode.Sequence]: '顺序播放',
      [PlayMode.Loop]: '循环播放',
      [PlayMode.Random]: '随机播放',
    }
    return type[playMode.value]
  })

  /**
   * 获取歌曲播放地址
   * @param id 歌曲id
   * @param source 歌曲来源
   */
  async function fetchSongUrl(id = currentSong.value.id, source?: string) {
    try {
      const { data } = await getSongUrl(id, source)
      const { url } = data.data[0]
      setAudioInfo(url)
      // playing.value = true 请求时间不同，导致唱针的动画不一致
    } catch ({ statusCode }: any) {
      if (statusCode === 404) {
        uni.showModal({
          title: '提示',
          content: `${source}源中没有该歌曲`,
          showCancel: false,
        })
        // 用于player页面
        return Promise.reject(new Error(`${source}源中没有该歌曲`))
      }

      uni.showModal({
        title: '提示',
        content: '获取播放地址失败',
        showCancel: false,
      })
    }
  }

  /**
   * 设置歌曲信息
   * @param url 歌曲地址
   */
  function setAudioInfo(url: string) {
    const audioVal = audio as any
    const currentSongVal = currentSong.value

    audioVal.title = currentSongVal.name
    audioVal.singer = currentSongVal.singers.join('/')
    audioVal.epname = currentSongVal.album.name
    audioVal.coverImgUrl = currentSongVal.album.picUrl
    audioVal.src = url
    audioVal.play()

    // #ifdef H5
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSongVal.name,
        artist: currentSongVal.singers.join('/'),
        album: currentSongVal.album.name,
        artwork: [
          {
            src: `${currentSongVal.album.picUrl}?param=512y512`,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      })
    }
    // #endif
  }

  /**
   * 触发播放
   * @param songs 歌曲列表
   * @param index 索引
   */
  function onPlay(songs: Song[], index: number) {
    playList.value = songs
    currentIndex.value = index
    playing.value = true
    fetchSongUrl()
  }

  /**
   * 切换播放
   */
  function togglePlay() {
    playing.value ? audio.pause() : audio.play()
  }

  /**
   * 上一曲
   */
  async function onPrev() {
    const _currentIndex = currentIndex.value
    let index = _currentIndex - 1

    switching.value = true
    playing.value = false

    // 切换歌曲后有延迟，还在播放之前的歌曲，所以把时间归零并停止播放
    currentTime.value = 0
    audio.stop()

    // 判断是否为随机播放
    if (playMode.value === PlayMode.Random) {
      const _randomPlayIndexes = randomPlayIndexes.value
      const length = _randomPlayIndexes.length
      let randomIndex = (index + length) % length

      // 如果上一个索引与当前索引相同
      if (_randomPlayIndexes[randomIndex] === _currentIndex) {
        // 如果相同，将随机索引设置为当前索引，以避免重复播放相同的歌曲
        randomIndex = _currentIndex
      }

      const prevIndex = _randomPlayIndexes[randomIndex]
      index = prevIndex
    }

    // 如果是第一首歌就设置成最后一首歌
    const prevIndex = index < 0 ? playList.value.length - 1 : index
    currentIndex.value = prevIndex
    fetchSongUrl()
    await sleep(300) // 延迟300毫秒让唱针的动画统一
    playing.value = true
    switching.value = false
  }

  /**
   * 下一曲
   */
  async function onNext() {
    const _currentIndex = currentIndex.value
    let index = _currentIndex + 1

    switching.value = true
    playing.value = false

    // 切换歌曲后有延迟，还在播放之前的歌曲，所以把时间归零并停止播放
    currentTime.value = 0
    audio.stop()

    // 判断是否为随机播放
    if (playMode.value === PlayMode.Random) {
      const _randomPlayIndexes = randomPlayIndexes.value
      let randomIndex = index % _randomPlayIndexes.length

      // 如果下一个索引与当前索引相同
      if (_randomPlayIndexes[randomIndex] === _currentIndex) {
        // 如果相同，将随机索引设置为当前索引，以避免重复播放相同的歌曲
        randomIndex = _currentIndex
      }

      const nextIndex = _randomPlayIndexes[randomIndex]
      index = nextIndex
    }

    // 如果是最后一首歌就设置成第一首歌
    const nextIndex = index === playList.value.length ? index = 0 : index
    currentIndex.value = nextIndex
    fetchSongUrl()
    await sleep(300) // 延迟300毫秒让唱针的动画统一
    playing.value = true
    switching.value = false
  }

  /**
   * 循环播放
   */
  function onLoopPlay() {
    // currentTime.value = 0
    audio.seek(0)
    audio.play()
  }

  /**
   * 改变播放模式
   */
  function changePlayMode() {
    const mode = (unref(playMode) + 1) % 3
    // 如果是随机播放则设置随机播放索引列表
    if (PlayMode.Random === mode) {
      randomPlayIndexes.value = getRandomIndexes(playList.value.length)
    }
    playMode.value = mode
    // 将播放模式存储到本地中
    setPlayMode(mode)
    uni.showToast({
      title: modeText.value,
      icon: 'none',
    })
  }

  /**
   * 清除播放列表
   */
  function clearSongList() {
    playList.value = []
    currentIndex.value = 0
    playing.value = false
    currentTime.value = 0
    audio.stop()
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
    playMode,
    randomPlayIndexes,
    modeIcon,
    modeText,
    fetchSongUrl,
    onPlay,
    togglePlay,
    onPrev,
    onNext,
    onLoopPlay,
    changePlayMode,
    clearSongList,
  }
})
