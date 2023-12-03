/**
 * @Author: Mojie
 * @Date: 2023-08-25 17:44:02
 */

import { getLyric } from '@/api/home'
import { usePlayer } from '@/store/player'

interface LyricList {
  time: string
  content: string
}

export function useLyric() {
  const isLyric = ref(false) // 是否显示歌词
  const lyricList = ref<LyricList[]>([]) // 歌词列表
  const currentLyricIndex = ref(0) // 当前播放歌词的索引
  const scrollTop = ref(0) // 滚动条位置

  const { currentSong, currentTime } = storeToRefs(usePlayer())

  watch(currentSong, () => fetchLyric(), { immediate: true })
  watch(currentTime, () => scrollLyric())

  async function fetchLyric() {
    if (!currentSong.value.id) return
    lyricList.value = []

    const { data } = await getLyric(currentSong.value.id)
    const lyric = (data.lrc.lyric || '').split('\n')
    const timeReg = /^\[(\d{2}:\d{2}\.\d{1,})\]\s*(.*)$/

    lyric.forEach((item) => {
      const match = timeReg.exec(item)
      if (match) {
        const content = match[2]
        // 过滤空内容。如：'[00:00.123] '
        if (!content) return
        lyricList.value.push({
          time: match[1],
          content,
        })
      }
    })
  }

  function scrollLyric() {
    // 如果当前播放时间为0则重置
    if (currentTime.value === 0) {
      scrollTop.value = 0
      currentLyricIndex.value = 0
    }
    // 获取每行歌词的高度
    const lineHeight = 28
    // 获取当前歌词行的索引
    const lyricIndex = currentLyricIndex.value = getCurrentLyricIndex()
    // 计算歌词滚动的距离
    const scrollDistance = lyricIndex * lineHeight

    // 当歌词索引大于6行才开始设置滚动条位置
    if (lyricIndex > 6) {
      scrollTop.value = scrollDistance - (6 * lineHeight)
    }
  }

  function getCurrentLyricIndex() {
    let _currentLyricIndex = 0

    // 遍历歌词数组，找到当前播放时间对应的歌词行索引
    lyricList.value.forEach((item, index) => {
      const lineTime = lyricList.value && lyricList.value[index].time

      // 将毫秒转换为分钟秒
      const lineTimeMinutes = Number(lineTime.split(':')[0])
      const lineTimeSeconds = Number(lineTime.split(':')[1])
      const lineTimeMilliseconds = Number(lineTime.split('.')[1])
      // 计算当前播放时间的分钟秒数
      const lineTimeSum = lineTimeMinutes * 60 + lineTimeSeconds + (lineTimeMilliseconds / 1000)
      // 如果当前播放时间大于等于歌词行的时间，则将当前行索引赋值给_currentLyricIndex
      if (currentTime.value >= lineTimeSum) {
        _currentLyricIndex = index
      }
    })

    return _currentLyricIndex
  }

  return {
    isLyric,
    lyricList,
    currentLyricIndex,
    scrollTop,
  }
}
