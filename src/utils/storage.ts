/**
 * @Author: Mojie
 * @Date: 2023-07-13 22:22:57
 */

enum StorageKey {
  Auth = '__AUTH__',
  SearchHistory = '__SEARCH_HISTORY__',
}

/**
 * 最大历史搜索缓存长度
 */
const MAX_SEARCH_HISTORY_LENGTH = 10

/**
 * 获取cookie信息
 */
export function getCookie() {
  return uni.getStorageSync(StorageKey.Auth)
}

/**
 * 设置cookie信息
 * @param cookie
 */
export function setCookie(cookie: string) {
  uni.setStorageSync(StorageKey.Auth, cookie)
}

/**
 * 获取搜索历史列表
 */
export function getSearchHistory(): string[] {
  const searches: string[] = uni.getStorageSync(StorageKey.SearchHistory)
  if (searches && searches.length) return JSON.parse(searches as unknown as string)
  return []
}

/**
 * 设置搜索历史列表
 * @param keywords 关键字
 */
export function setSearchHistory(keywords: string) {
  const searches = getSearchHistory()
  const index = searches.findIndex(s => s === keywords)
  if (index > -1) return
  searches.unshift(keywords)
  searches.length > MAX_SEARCH_HISTORY_LENGTH && searches.pop()
  uni.setStorageSync(StorageKey.SearchHistory, searches)
}
