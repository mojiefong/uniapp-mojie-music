/**
 * @Author: Mojie
 * @Date: 2023-07-17 22:11:26
 */

import { getSearchHistory } from '@/utils/storage'

export const useStorage = defineStore('storage', () => {
  const searchHistory = ref(getSearchHistory())

  function setSearchHistory(searches: string[]) {
    searchHistory.value = searches
  }

  return {
    searchHistory,
    setSearchHistory,
  }
})
