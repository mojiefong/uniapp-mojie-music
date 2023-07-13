/**
 * @Author: Mojie
 * @Date: 2023-07-11 22:08:38
 */

type Options = UniNamespace.RequestOptions

export class Http {
  request(options: Options) {
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

  get(url: string, config?: Options) {
    return this.request({ url, method: 'GET', ...config })
  }

  delete(url: string, config?: Options) {
    return this.request({ url, method: 'DELETE', ...config })
  }

  head(url: string, config?: Options) {
    return this.request({ url, method: 'HEAD', ...config })
  }

  options(url: string, config?: Options) {
    return this.request({ url, method: 'OPTIONS', ...config })
  }

  post(url: string, data: Options['data'], config?: Options) {
    return this.request({ url, method: 'POST', data, ...config })
  }

  put(url: string, data: Options['data'], config?: Options) {
    return this.request({ url, method: 'PUT', data, ...config })
  }
}

const http = new Http()
export { http }
