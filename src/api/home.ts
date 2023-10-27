/**
 * @Author: Mojie
 * @Date: 2023-07-14 22:50:01
 */

import type { HotSearch, Song, SongList, SongListDetail, TopList } from '@/models'
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

/**
 * 获取歌单详情
 * @param id 歌单id
 */
export async function getSongListDetail(id: string) {
  const { data } = await http.get<{ playlist: SongListDetail }>(`/playlist/detail?id=${id}`)
  data.playlist.tracks = transform(data.playlist.tracks)
  return data.playlist
}

/**
 * 获取歌曲详细
 * @param ids
 */
export async function getSongDetail(ids: string): Promise<Song[]> {
  const { data } = await http.get(`/song/detail?ids=${ids}`)
  return transform(data.songs)
}

/**
 * 获取歌曲播放地址
 * @param id 歌曲id
 * @param magic 是否开启魔法，默认 false 不开启，true 开启
 */
export function getSongUrl(id: string | number, magic = false) {
  return http.get<{ data: { url: string }[] }>('/song/url/v1', {
    data: {
      id,
      magic,
      level: 'lossless',
    },
  })
}

/**
 * 获取喜欢音乐列表
 * 目前v4.10.1版本有bug，传了uid还是获取的当前登录用户的喜欢音乐列表
 * 参考：https://github.com/Binaryify/NeteaseCloudMusicApi/issues/1558
 */
export function getLikeList() {
  return http.get<{ ids: number[] }>('/likelist')
}

/**
 * 切换喜欢的歌曲
 * @param id 歌曲id
 * @param like 默认为 true 即喜欢, 若传 false 则取消喜欢
 */
export function changeLike(id: string | number, like: boolean) {
  return http.get(`/like?id=${id}&like=${like}`)
}

/**
 * 获取歌词
 * @param id 音乐id
 */
export function getLyric(id: string | number) {
  return http.get<{ lrc: { lyric: string } }>(`/lyric?id=${id}`)
}
