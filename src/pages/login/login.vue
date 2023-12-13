<template>
  <view class="py-5 px-4">
    <view class="text-xs mb2 text-light">
      建议使用验证码登录，因为密码登录是明文传输
    </view>
    <form @submit="onSubmit">
      <view class="mb-4 b-b b-b-solid b-b-primary pb-2.5">
        <input v-model="formData.phone" placeholder="请输入手机号">
      </view>
      <view v-if="isCaptcha" class="mb-4 b-b b-b-solid b-b-primary pb-2.5">
        <view class="flex">
          <input v-model="formData.captcha" class="flex-1" type="number" placeholder="请输入验证码">
          <button
            :disabled="countingDown"
            :class="{ 'text-blue': !countingDown }"
            class="text-sm b-none p0 after:display-none"
            hover-class="none"
            @click="onSendCaptcha(false)"
          >
            {{ countdownText }}
          </button>
        </view>
      </view>
      <view v-else class="mb-4 b-b b-b-solid b-b-primary pb-2.5">
        <input v-model="formData.password" password placeholder="请输入密码">
      </view>
      <view class="mb-4">
        <button
          :disabled="!phoneRule"
          class="mb-4"
          @click="onSendCaptcha(true)"
        >
          {{ loginModeText }}
        </button>
        <button
          :disabled="isDisabled"
          class="bg-theme!"
          type="primary"
          form-type="submit"
        >
          登 录
        </button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
import type { UserPhoneLogin } from '@/models'
import { setCookie } from '@/utils/storage'
import { phoneLogin, sendCaptcha } from '@/api/user'
import { useCountdown } from '@/hooks/use-countdown'

const isCaptcha = ref(false)
const formData = reactive<UserPhoneLogin>({
  phone: '',
  password: '',
  captcha: '',
})

const phoneRule = computed(() => formData.phone && formData.phone.length === 11)
const isDisabled = computed(() => {
  if (isCaptcha.value) return !phoneRule.value || !formData.captcha
  return !phoneRule.value || !formData.password
})
const loginModeText = computed(() => isCaptcha.value ? '密码登录' : '验证码登录')
const { countingDown, countdownText, startCountdown } = useCountdown()

async function onSubmit() {
  const params = { ...formData }
  isCaptcha.value ? delete params.password : delete params.captcha
  const { data } = await phoneLogin(params)
  if (data.code !== 200) {
    return uni.showToast({
      title: data.message,
      icon: 'none',
    })
  }

  setCookie(data.token)
  uni.switchTab({
    url: '/pages/index/index',
  })
}

async function onSendCaptcha(send: boolean) {
  if (send) {
    isCaptcha.value = !isCaptcha.value
    formData.password = ''
    formData.captcha = ''
  }

  if (isCaptcha.value) {
    startCountdown()
    const { data } = await sendCaptcha(formData.phone)
    if (data.code !== 200) {
      uni.showToast({
        title: data.message,
        icon: 'none',
      })
    }
  }
}
</script>
