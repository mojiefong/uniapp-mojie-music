/**
 * @Author: Mojie
 * @Date: 2023-07-11 22:08:38
 */

import { getCookie } from './storage'

type Options = UniNamespace.RequestOptions
type Response<T = any> = Omit<UniNamespace.RequestSuccessCallbackResult, 'data'> & {
  data: {
    code: number
    message?: string
  } & T
}
type HttpPromise<T = any> = Promise<Response<T>>

uni.addInterceptor('request', {
  invoke(args) {
    // args.data = {
    //   auth: 11,
    //   ...args.data,
    // }
    args.data = Object.assign({ cookie: decodeURIComponent(`MUSIC_U=${getCookie()}`) }, args.data)

    // #ifdef H5
    const { baseUrl } = document.documentElement.dataset
    if (baseUrl) {
      args.url = `//${baseUrl}${args.url}`
    }
    // #endif

    // #ifndef H5
    args.url = import.meta.env.VITE_BASE_URL + args.url
    // #endif
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
          res.statusCode === 200 ? resolve(res as unknown as HttpPromise<T>) : reject(res)
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
