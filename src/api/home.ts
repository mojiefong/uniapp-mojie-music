/**
 * @Author: Mojie
 * @Date: 2023-07-14 22:50:01
 */

import { http } from '@/utils/http'

/**
 * 获取每日推荐歌曲
 */
export function getRecommendSongs() {
  return http.get('/recommend/songs')
}
