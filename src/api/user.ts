/**
 * @Author: Mojie
 * @Date: 2023-07-13 21:06:13
 */

import { http } from '@/utils/http'

/**
 * 游客登录
 */
export function anonymousLogin() {
  return http.get<{ cookie: string }>('/register/anonimous')
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.get('/user/account')
}
