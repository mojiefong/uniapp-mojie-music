/**
 * @Author: Mojie
 * @Date: 2023-07-13 21:06:13
 */

import { http } from '@/utils/http'

export function anonymousLogin() {
  return http.get<{ cookie: string }>('/register/anonimous')
}

export function getLoginState() {
  return http.get('/login/status')
}
