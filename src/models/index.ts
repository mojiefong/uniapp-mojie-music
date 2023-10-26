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

/**
 * 用户手机登录
 */
export interface UserPhoneLogin {
  phone: string
  password: string
}

/**
 * 用户信息
 */
export interface UserInfo {
  /**
   * 等级
   */
  level: number

  profile: {
    userId: number
    avatarUrl: string
    backgroundUrl: string
    nickname: string

    /**
     * 粉丝
     */
    followeds: number

    /**
     * 关注
     */
    follows: number
  }
}

/**
 * 用户的歌单
 */
export interface UserPlayList {
  id: number
  name: string
  coverImgUrl: string

  /**
   * 是自己创建还是收藏，false 是自己创建，true 是收藏
   */
  subscribed: boolean

  /**
   * 曲目数
   */
  trackCount: number

  /**
   * 播放次数
   */
  playCount: number
}
