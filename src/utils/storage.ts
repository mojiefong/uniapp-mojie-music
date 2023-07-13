/**
 * @Author: Mojie
 * @Date: 2023-07-13 22:22:57
 */

enum StorageKey {
  Auth = '__AUTH__',
}

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
