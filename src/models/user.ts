/**
 * @Author: Mojie
 * @Date: 2023-07-15 19:43:50
 */

/**
 * 歌曲模型
 */
export interface Song {
  id: number

  /**
   * 歌曲名称
   */
  name: string

  /**
   * 专辑
   */
  album: {
    id: number

    /**
     * 专辑名称
     */
    name: string

    /**
     * 图片地址
     */
    picUrl: string
  }

  /**
   * 歌手列表
   */
  singers: string[]

  /**
   * 歌曲总时长
   */
  dt: number
}

/**
 * 歌单模型
 */
export interface SongList {
  id: number
  name: string
  picUrl: string

  /**
   * 播放次数
   */
  playCount: number
}

export interface SongListDetail {
  id: number
  name: string
  coverImgUrl: string
  description: string

  /**
     * 创建人
     */
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }

  tracks: Song[]
}

/**
 * 排行榜模型
 */
export interface TopList {
  id: number
  name: string
  coverImgUrl: string

  /**
   * 更新频率
   */
  updateFrequency: string

  /**
   * 曲目
   */
  tracks: {
    /**
     * 歌曲名称
     */
    first: string

    /**
     * 歌手名称
     */
    second: string
  }[]
}

/**
 * 热门搜索模型
 */
export interface HotSearch {
  hots: {
    first: string
  }[]
}
