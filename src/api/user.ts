/**
 * @Author: Mojie
 * @Date: 2023-07-13 21:06:13
 */

import type { UserInfo, UserPhoneLogin, UserPlayList } from '@/models'
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
export async function getUserInfo() {
  const { data } = await http.get<{ profile: { userId: number } }>('/user/account')
  const { userId } = data.profile
  return http.get<UserInfo>(`/user/detail?uid=${userId}`)
}

/**
 * 手机号登录
 */
export function phoneLogin(data: UserPhoneLogin) {
  return http.get<{ token: string }>('/login/cellphone', {
    data,
  })
}

/**
 * 获取用户的歌单
 * @param uid 用户id
 * @param limit 返回数量，默认为 30
 * @param offset 偏移数量，用于分页，如:( 页数 -1)*30, 其中 30 为 limit 的值。默认为 0
 */
export function getUserPlayList(uid: number, limit = 100, offset = 0) {
  return http.get<{
    playlist: UserPlayList[]
  }>(`/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`)
}
