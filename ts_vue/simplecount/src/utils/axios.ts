import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import config from '@/config'

export interface ResponseData {
  code: number
  data?: any
  msg: string
}

const {
  api: { devApiBaseUrl, proApiBaseUrl },
} = config
const apiBaseUrl = process.env.NODE_ENV === 'production' ? proApiBaseUrl : devApiBaseUrl

class HttpRequest {
  constructor(public baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create()
    options = this.mergeConfig(options)
    this.interceptor(instance, options.url)
    return instance(options)
  }
  private interceptor(instance: AxiosInstance, url?: string) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res
        const { code, msg } = data
        if (code !== 0) {
          // tslint:disable-next-line: no-console
          console.log(msg)
        }
        return res
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({ baseURL: this.baseUrl }, options)
  }
}

export default HttpRequest
