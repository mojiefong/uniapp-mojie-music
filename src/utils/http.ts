/**
 * @Author: Mojie
 * @Date: 2023-07-11 22:08:38
 */

type Options = UniNamespace.RequestOptions
type Response<T = any> = UniNamespace.RequestSuccessCallbackResult & {
  data?: T
}
type HttpPromise<T = any> = Promise<Response<T>>

uni.addInterceptor('request', {
  invoke(args) {
    args.url = import.meta.env.VITE_BASE_URL + args.url
  },
})

class Http {
  request<T = any>(options: Options): HttpPromise<T> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: options.url,
        method: options.method,
        header: options.header,
        data: options.data,
        success: (res) => {
          resolve(res as unknown as HttpPromise<T>)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  get<T = any>(url: string, config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'GET', ...config })
  }

  delete<T = any>(url: string, config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'DELETE', ...config })
  }

  head<T = any>(url: string, config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'HEAD', ...config })
  }

  options<T = any>(url: string, config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'OPTIONS', ...config })
  }

  post<T = any>(url: string, data: Options['data'], config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'POST', data, ...config })
  }

  put<T = any>(url: string, data: Options['data'], config?: Partial<Options>): HttpPromise<T> {
    return this.request({ url, method: 'PUT', data, ...config })
  }
}

const http = new Http()
export { http }
