import axios, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

interface LoginReqArguInterface {
  userName: string
  password: number | string
}

interface GetInfoReqArguInterface {
  userId: string
}

export const loginReq = (data: LoginReqArguInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'POST',
  })
}

export const getInfoReq = (data?: GetInfoReqArguInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/getInfo',
    data,
    method: 'POST',
  })
}
