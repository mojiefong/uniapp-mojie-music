/**
 * @Author: Mojie
 * @Date: 2023-07-17 22:11:26
 */

import type { UserInfo } from '@/models'
import { MAX_SEARCH_HISTORY_LENGTH } from '@/enums'
import { clearSearchHistory, getSearchHistory, setSearchHistory } from '@/utils/storage'

export const useStorage = defineStore('storage', () => {
  const userInfo = ref<UserInfo>()
  const searchHistory = ref(getSearchHistory())

  function setUserInfo(profile: UserInfo) {
    userInfo.value = profile
  }

  function saveSearchHistory(keywords: string) {
    const searchHistoryList = searchHistory.value
    const index = searchHistoryList.findIndex(str => str === keywords)
    if (index > -1) return
    searchHistoryList.unshift(keywords)
    searchHistoryList.length > MAX_SEARCH_HISTORY_LENGTH && searchHistoryList.pop()
    setSearchHistory(searchHistoryList)
  }

  function removeSearchHistory() {
    searchHistory.value = []
    clearSearchHistory()
  }

  return {
    searchHistory,
    userInfo,
    setUserInfo,
    saveSearchHistory,
    removeSearchHistory,
  }
})
