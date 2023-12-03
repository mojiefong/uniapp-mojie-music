/**
 * @Author: Mojie
 * @Date: 2023-07-13 22:22:57
 */

import type { PlayMode } from '@/enums'
import { CacheType } from '@/enums'

/**
 * 获取cookie信息
 */
export function getCookie() {
  return uni.getStorageSync(CacheType.AuthKey)
}

/**
 * 设置cookie信息
 * @param cookie
 */
export function setCookie(cookie: string) {
  uni.setStorageSync(CacheType.AuthKey, cookie)
}

/**
 * 获取播放模式
 */
export function getPlayMode() {
  return uni.getStorageSync(CacheType.PlayModeKey)
}

/**
 * 设置播放模式
 * @param mode
 */
export function setPlayMode(mode: PlayMode) {
  uni.setStorageSync(CacheType.PlayModeKey, mode)
}

/**
 * 获取搜索历史列表
 */
export function getSearchHistory(): string[] {
  return uni.getStorageSync(CacheType.SearchHistory) || []
}

/**
 * 设置搜索历史列表
 * @param keywords 关键字
 */
export function setSearchHistory(keywords: string[]) {
  uni.setStorageSync(CacheType.SearchHistory, keywords)
}

/**
 * 清除搜索历史列表
 */
export function clearSearchHistory() {
  uni.removeStorageSync(CacheType.SearchHistory)
}
