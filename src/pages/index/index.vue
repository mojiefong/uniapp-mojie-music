<template>
  <view class="px-2 pt-2 pb-10">
    <view class=" flex-center text-light rd-2 bg-white">
      <text class="iconfont icon-search text-xl pt-0.5" />
      <text class="text-sm">
        告白气球
      </text>
    </view>

    <card title="今日推荐">
      <songs />
    </card>

    <card title="热门歌曲">
      <songs />
    </card>

    <card title="推荐歌单">
      <view class="flex justify-between flex-wrap">
        <view v-for="n in 6" :key="n" class="w-1/3 pt-2 pr-2">
          <view class="w-full h-28">
            <image class="w-full h-full rd-2" src="https://avatars.githubusercontent.com/u/17779577?v=4" />
          </view>
          <text class="text-sm">
            经典老歌经典老歌经典老歌经典老歌
          </text>
        </view>
      </view>
    </card>

    <card title="排行榜">
      <view class="pt-1">
        <view v-for="n in 3" :key="n" class="song flex-v-center box-content">
          <image class="w-20 h-20 rd-2" src="https://avatars.githubusercontent.com/u/17779577?v=4" />
          <view class="info h-12 flex-1 flex-h-center flex-col ml-2 b-b b-b-solid b-b-primary py-5 box-content">
            <text class="text-sm">
              热歌榜
            </text>
            <text class="text-xs text-light">
              1 告白气球
            </text>
            <text class="text-xs text-light">
              2 稻香
            </text>
            <text class="text-xs text-light">
              3 青花瓷
            </text>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.song:last-child .info{
  border: 0;
}
</style>
