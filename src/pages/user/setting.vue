<template>
  <layout>
    <view class="p2">
      <view class="bg-white rd-2 p2 flex-v-center justify-between">
        <text class="text-sm">
          暗色主题
        </text>
        <switch style="zoom: 60%" disabled />
      </view>

      <view class="p2 mt2 text-sm bg-white rd-2">
        <view class="mb2 b-b b-b-solid b-b-primary pb2">
          关于
        </view>
        <view>当前版本：{{ version }}</view>
        <view>作者微信：WebMojie</view>
        <view>
          项目地址：
          https://github.com/mojiefong/uniapp-mojie-music
        </view>
        <view>
          问题反馈：
          https://github.com/mojiefong/uniapp-mojie-music/issues
        </view>
      </view>

      <button
        v-if="!!userInfo"
        class="w-full bg-theme! mt2"
        type="primary"
        form-type="submit"
        size="mini"
        @click="onLogout"
      >
        退出登录
      </button>
      <button
        v-else
        class="w-full bg-theme! mt2"
        type="primary"
        form-type="submit"
        size="mini"
        @click="onLogin"
      >
        立即登录
      </button>
    </view>
  </layout>
</template>

<script setup lang="ts">
import { version } from '../../../package.json'
import { logout } from '@/api/user'
import { useStorage } from '@/store/storage'
import { clearCookie } from '@/utils/storage'

const storageStore = useStorage()
const { userInfo } = storeToRefs(storageStore)

function onLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录？',
    success: async ({ confirm }) => {
      if (confirm) {
        await logout()
        clearCookie()
        userInfo.value = null
        uni.reLaunch({
          url: '/pages/user/user',
        })
      }
    },
  })
}

function onLogin() {
  uni.redirectTo({
    url: '/pages/login/login',
  })
}
</script>
