# 魔杰音乐

魔杰音乐是一个支持多端（H5、小程序、Android、iOS）音乐播放器。使用了最新的 uni-app、Vue3、Vite、TypeScript、UnoCSS 等主流技术。

**注意：本项目主要用于练手学习**

## 特性

- uni-app：一个使用 Vue 开发所有前端应用的框架
- Vue3：使用 Vue3 + script setup 最新的组合式 API
- Pinia：传说中的 Vuex5
- Vite：开启秒男模式
- TypeScript：JavaScript 超集
- ES6+：JavaScript 语言的下一代标准
- CSS 变量：用于控制项目配色
- UnoCSS：具有高性能且极具灵活性的即时原子化 CSS 引擎
- PNPM：快速的，节省磁盘空间的包管理工具
- Husky：Git Hook 工具
- ESlint：代码校验
- Commitlint：Git 提交校验

## 功能

- [x] 手机号登录、验证码登录
- [x] 每日推荐歌曲、推荐歌单
- [x] 歌单详情
- [x] 所有排行榜
- [x] 获取个人歌单、收藏歌单
- [x] 独立播放器、mini 播放器
- [x] 歌词滚动
- [x] 收藏/取消搜藏歌曲
- [ ] 收藏/取消搜藏歌单
- [ ] 新建/删除歌单
- [x] 搜索音乐/热门搜索/历史搜索
- [x] 切换音源
- [ ] 搜索歌手、歌单
- [ ] 虚拟滚动列表
- [ ] 查看评论
- [ ] 暗色主题

## 后台服务

- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 网易云音乐 NodeJS 版 API
- [UnblockNeteaseMusic](https://github.com/UnblockNeteaseMusic/server) 解锁网易云音乐变灰歌曲

魔法实现：

修改 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 项目下的 `song_url_v1.js` 文件，不要直接粘贴，注意版本，如果升级了需要对比一下，谨慎操作

用 `npm` 或者 `yarn` 安装 `@unblockneteasemusic/server` 模块

```js
// 歌曲链接 - v1
// 此版本不再采用 br 作为音质区分的标准
// 而是采用 standard, exhigh, lossless, hires, jyeffect(高清环绕声), sky(沉浸环绕声), jymaster(超清母带) 进行音质判断

const crypto = require('crypto')
const match = require('@unblockneteasemusic/server')

module.exports = async (query, request) => {
  query.cookie.os = 'android'
  query.cookie.appver = '8.10.05'

  const data = {
    ids: '[' + query.id + ']',
    level: query.level,
    encodeType: 'flac',
  }

  if (data.level == 'sky') {
    data.immerseType = 'c51'
  }

  const res = await request(
    'POST',
    `https://interface.music.163.com/eapi/song/enhance/player/url/v1`,
    data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
      url: '/api/song/enhance/player/url/v1',
    },
  )

  const result = res.body.data
  const song = result[0]

  // 把url地址为空的、VIP可听/所在专辑需单独付费，就添加魔法
  // https://github.com/Binaryify/NeteaseCloudMusicApi/issues/899#issuecomment-680002883
  if (!song.url || [1, 4].includes(song.fee)) {
    const source = query.source || 'kuwo'
    const { url } = await match(query.id, [source]) // 这里只设置一个源，避免多个产生随机选择问题
    song.url = url
  }

  return res
}
```

## 安装运行

### 环境要求

建议 NodeJS 16+ 版本

### 运行

```shell
git clone https://github.com/mojiefong/uniapp-mojie-music.git
cd uniapp-mojie-music

# 建议使用 pnpm
pnpm i

# 本地运行 H5
npm run dev:h5
```

微信小程序需要替换成自己 `appid`，修改 `manifest.json` 文件下 `mp-weixin.appid`

## Docker部署

建议使用 `docker compose` 编排

``` yml
version: "3"

services:
  # 部署H5
  uniapp-mojie-music:
    image: mojiee/uniapp-mojie-music:xxx
    container_name: uniapp-mojie-music
    restart: always
    environment:
      # 后台API地址、注意不要加协议，只要ip+端口号或者域名
      - API_BASE_URL=127.0.0.1:3000
    ports:
      - 9527:80
    depends_on:
      - netease-cloud-music-api

  # 部署后台服务
  netease-cloud-music-api:
    image: mojiee/netease-cloud-music-api:xxx
    container_name: netease-cloud-music-api
    restart: always
    ports:
      - 3000:3000
```

微信小程序部署需要修改 `.env.production` 的 `VITE_BASE_URL` 地址。**请注意，地址必须加协议，不然会报错**

## License

[MIT](https://github.com/mojiefong/uniapp-mojie-music/blob/master/LICENSE)
