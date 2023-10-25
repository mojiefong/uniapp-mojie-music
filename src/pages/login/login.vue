<template>
  <view class="py-5 px-4">
    <form @submit="onSubmit">
      <view class="mb-4 b-b b-b-solid b-b-primary pb-2.5">
        <input v-model="formData.phone" placeholder="请输入手机号">
      </view>
      <view class="mb-4 b-b b-b-solid b-b-primary pb-2.5">
        <input v-model="formData.password" password placeholder="请输入密码">
      </view>
      <view class="mb-4">
        <button :disabled="isDisabled" class="bg-theme!" type="primary" form-type="submit">
          登 录
        </button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
import { setCookie } from '@/utils/storage'
import { phoneLogin } from '@/api/user'
import type { UserPhoneLogin } from '@/models'

const formData = reactive<UserPhoneLogin>({
  phone: '',
  password: '',
})

const isDisabled = computed(() => !formData.phone || !formData.password)

async function onSubmit() {
  const { data } = await phoneLogin(formData)

  if (data.code !== 200) {
    return uni.showToast({
      title: data.message,
      icon: 'none',
    })
  }

  setCookie(data.token)
  uni.switchTab({
    url: '/',
  })
}
</script>
