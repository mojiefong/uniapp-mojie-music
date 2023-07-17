/**
 * @Author: Mojie
 * @Date: 2023-07-14 22:50:01
 */

import type { HotSearch, Song, SongList, TopList } from '@/models/user'
import { http } from '@/utils/http'

function transform(list: any) {
  list.forEach((item: any) => {
    item.album = item.al
    item.singers = item.ar.map((singer: any) => singer.name)
  })
  return list
}

/**
 * 获取每日推荐歌曲
 */
export async function getRecommendSongs(): Promise<Song[]> {
  const { data } = await http.get('/recommend/songs')
  return transform(data.data.dailySongs)
}

/**
 * 获取每日推荐歌单
 */
export function getRecommendSongList(limit = 6) {
  return http.get<{ result: SongList[] }>(`/personalized?limit=${limit}`)
}

/**
 * 获取排行榜
 */
export function getTopList() {
  return http.get<{ list: TopList[] }>('/toplist/detail')
}

/**
 * 获取热门搜索列表
 */
export function getHotSearches() {
  return http.get<{ result: HotSearch }>('/search/hot')
}
