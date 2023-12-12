/**
 * @Author: Mojie
 * @Date: 2023-08-24 15:54:28
 */

import { usePlayer } from '@/store/player'

export function useProgress() {
  const playerStore = usePlayer()
  const { audio } = playerStore
  const { currentSong, currentTime, progressDragging } = storeToRefs(playerStore)

  const progress = computed(() => {
    const duration = currentSong.value.dt / 1000
    const time = (currentTime.value / duration)
    return Number.parseFloat((time * 100).toFixed(1))
  })

  /**
   * 拖动进度条时修改当前播放时间
   * @param time 时间
   */
  function setCurrentTime(time: number) {
    const ratio = time / 100
    const duration = currentSong.value.dt / 1000
    currentTime.value = ratio * duration
  }

  /**
   * 正在拖动进度条
   */
  function onChanging(e: any) {
    progressDragging.value = true
    setCurrentTime(e.detail.value)
  }

  /**
   * 结束拖动进度条
   */
  function onChange(e: any) {
    progressDragging.value = false
    setCurrentTime(e.detail.value)
    // audio.currentTime = currentTime.value

    // 微信小程序 bug
    // https://developers.weixin.qq.com/community/develop/doc/00024ab2c7844056004a8cc9056400
    audio.pause()
    audio.seek(currentTime.value)
    ;(audio as any).onSeeked(() => {
      audio.play()
    })
  }

  return {
    progress,
    onChanging,
    onChange,
  }
}
