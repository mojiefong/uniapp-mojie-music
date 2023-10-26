/**
 * @Author: Mojie
 * @Date: 2023-07-17 22:11:26
 */

import type { UserInfo } from '@/models'
import { getSearchHistory } from '@/utils/storage'

export const useStorage = defineStore('storage', () => {
  const userInfo = ref<UserInfo>()
  const searchHistory = ref(getSearchHistory())

  function setUserInfo(profile: UserInfo) {
    userInfo.value = profile
  }

  function setSearchHistory(searches: string[]) {
    searchHistory.value = searches
  }

  return {
    searchHistory,
    userInfo,
    setUserInfo,
    setSearchHistory,
  }
})
