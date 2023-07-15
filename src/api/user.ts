/**
 * @Author: Mojie
 * @Date: 2023-07-13 21:06:13
 */

import { http } from '@/utils/http'

/**
 * 游客登录
 */
export async function anonymousLogin() {
  const { data } = await http.get('/register/anonimous')
  const cookies = data.cookie.split(';') as string[]
  const [_, value] = cookies.filter(key => key.startsWith('MUSIC_A='))[0].split('=')
  return value
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.get('/user/account')
}
