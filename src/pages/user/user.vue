<template>
  <view class="mx-2 mb-4">
    <view class="-mx-2 h-30 overflow-hidden">
      <image v-if="userInfo" class="wh-full h-60" :src="`${userInfo?.profile.backgroundUrl}?param=400y400`" />
    </view>

    <view
      class="bg-white -mt-4 rd-2 flex flex-col items-center pb2 relative z-1"
      @click="onLogin"
    >
      <image v-if="userInfo" class="w-14 h-14 rd-50% -mt-7" :src="`${userInfo?.profile.avatarUrl}?param=60y60`" />
      <text v-else class="iconfont icon-netease-cloud-music-fill text-14 text-theme -mt-7" />
      <text class="pt2">
        {{ userInfo?.profile.nickname || '点击登录' }}
      </text>
      <view v-if="userInfo" class="text-light text-sm pt2">
        <text class="mr-2">
          {{ userInfo?.profile.follows }} 关注
        </text>
        <text class="mr-2">
          {{ userInfo?.profile.followeds }} 粉丝
        </text>
        <text>Lv.{{ userInfo?.level }}</text>
      </view>
    </view>

    <PlayList v-if="userInfo" title="创建的歌单" :play-list="createdPlayList" />
    <PlayList v-if="userInfo" title="收藏的歌单" :play-list="collectPlayList" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import PlayList from './components/play-list.vue'
import type { UserPlayList } from '@/models'
import { getUserInfo, getUserPlayList } from '@/api/user'
import { useStorage } from '@/store/storage'

onLoad(fetchAll)

const createdPlayList = ref<UserPlayList[]>([])
const collectPlayList = ref<UserPlayList[]>([])
const storageStore = useStorage()
const { userInfo } = storeToRefs(storageStore)

async function fetchAll() {
  try {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    await fetchUserInfo()
    await fetchUserPlayList()
  } finally {
    uni.hideLoading()
  }
}

async function fetchUserInfo() {
  if (userInfo.value) return
  try {
    const { data } = await getUserInfo()
    storageStore.setUserInfo(data)
  } catch (error) {
    console.log(error)
  }
}

async function fetchUserPlayList() {
  if (!userInfo.value) return
  const { userId } = userInfo.value.profile
  const { data } = await getUserPlayList(userId)
  data.playlist.forEach((item) => {
    if (item.subscribed) {
      collectPlayList.value.push(item)
    } else {
      createdPlayList.value.push(item)
    }
  })
}

function onLogin() {
  if (userInfo.value) return
  uni.redirectTo({
    url: '/pages/login/login',
  })
}
</script>
