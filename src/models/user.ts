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
