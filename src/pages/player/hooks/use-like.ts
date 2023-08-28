/**
 * @Author: Mojie
 * @Date: 2023-08-24 16:20:00
 */

import { changeLike, getLikeList } from '@/api/home'
import { usePlayer } from '@/store/player'

export function useLike() {
  const likeIcon = ref('')
  const { currentSong } = storeToRefs(usePlayer())

  watch(currentSong, () => fetchLikeList(), { immediate: true })

  /**
   * 获取喜欢的音乐列表
   */
  async function fetchLikeList() {
    const { data } = await getLikeList()
    likeIcon.value = data.ids.includes(currentSong.value.id)
      ? 'icon-collect-selected'
      : 'icon-collect'
  }

  /**
   * 切换喜欢的歌曲
   */
  async function toggleLike() {
    const isLikeIcon = likeIcon.value === 'icon-collect-selected'
    await changeLike(currentSong.value.id, !isLikeIcon)
    if (isLikeIcon) {
      likeIcon.value = 'icon-collect'
      uni.showToast({ title: '已取消喜欢', icon: 'none' })
    } else {
      // 使手机发生较短时间的振动（15ms）
      uni.vibrateShort()
      likeIcon.value = 'icon-collect-selected'
      uni.showToast({ title: '已添加到我喜欢的音乐', icon: 'none' })
    }
  }

  return {
    likeIcon,
    toggleLike,
  }
}
