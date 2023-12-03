/**
 * @Author: Mojie
 * @Date: 2023-08-09 18:51:18
 */

/**
 * 最大搜索历史缓存长度
 */
export const MAX_SEARCH_HISTORY_LENGTH = 10

/**
 * 缓存类型
 */
export enum CacheType {
  /**
   * 认证令牌
   */
  AuthKey = '__AUTH__',

  /**
   * 搜索历史
   */
  SearchHistory = '__SEARCH_HISTORY__',

  /**
   * 播放模式
   */
  PlayModeKey = '__PLAY_MODE__',
}

/**
 * 播放模式
 */
export enum PlayMode {
  /**
   * 循序播放
   */
  Sequence,

  /**
   * 循环播放
   */
  Loop,

  /**
   * 随机播放
   */
  Random,
}

/**
 * 歌曲列表展示的类型
 */
export enum SongsType {
  /**
   * 不展示
   */
  None,

  /**
   * 索引类型
   */
  Index,

  /**
   * 图片类型
   */
  Image,
}
