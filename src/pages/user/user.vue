<template>
  <view class="mx-2 mb-4">
    <view class="-mx-2 h-30 overflow-hidden">
      <image class="wh-full h-60" :src="`${userInfo?.profile.backgroundUrl}?param=400y400`" />
    </view>

    <view class="bg-white -mt-4 rd-2 flex flex-col items-center pb2 relative z-1">
      <image class="w-14 h-14 rd-50% -mt-7" :src="`${userInfo?.profile.avatarUrl}?param=60y60`" />
      <text class="pt2">
        {{ userInfo?.profile.nickname }}
      </text>
      <view class="text-light text-sm pt2">
        <text class="mr-2">
          {{ userInfo?.profile.follows }} 关注
        </text>
        <text class="mr-2">
          {{ userInfo?.profile.followeds }} 粉丝
        </text>
        <text>Lv.{{ userInfo?.level }}</text>
      </view>
    </view>

    <view class="bg-white mt-4 p2 rd-2">
      创建的歌单
      <view
        v-for="item in createdPlayList"
        :key="item.id"
        class="flex-v-center box-content mt-2"
      >
        <image class="w-10 h-10 rd-2 mr-2" :src="`${item.coverImgUrl}?param=60y60`" />
        <view class="flex flex-col">
          <text class="text-sm">
            {{ item.name }}
          </text>
          <text class="text-xs text-light">
            {{ item.trackCount }}首，播放{{ item.playCount }}次
          </text>
        </view>
      </view>
    </view>

    <view class="bg-white mt-4 p2 rd-2">
      收藏的歌单
      <view
        v-for="item in collectPlayList"
        :key="item.id"
        class="flex-v-center box-content mt-2"
      >
        <image class="w-10 h-10 rd-2 mr-2" :src="`${item.coverImgUrl}?param=60y60`" />
        <view class="flex flex-col">
          <text class="text-sm text-ellipsis-single">
            {{ item.name }}
          </text>
          <text class="text-xs text-light">
            {{ item.trackCount }}首，播放{{ item.playCount }}次
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
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
  const { data } = await getUserInfo()
  storageStore.setUserInfo(data)
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
</script>
