/**
 * @Author: Mojie
 * @Date: 2023-07-11 22:08:38
 */

type Options = UniNamespace.RequestOptions

function http(options: Options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url,
      method: options.method,
      header: options.header,
      data: options.data,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

['delete', 'get', 'head', 'options'].forEach((method: string) => {
  http.prototype[method] = function (url: string, config?: Options) {
    return http({ url, method: 'GET', ...config })
  }
})

;['post', 'put'].forEach((method: string) => {
  http.prototype[method] = function (url: string, data: Options['data'], config?: Options) {
    const _method = method as Options['method']
    return http({ url, method: _method, data, ...config })
  }
})
