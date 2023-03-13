import request from '@/api/request'
type ResponseData = {
  code: number
  data: any
  message: string
}
type LoginParams = {
  username: string
  password: string
}

export enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export const useLogin = (data: LoginParams): any => {
  return request('/api/v1/login', { method: EHttpMethods.POST, data: data })
}

export const userInfo = (): any => {
  return request('/api/v1/userInfo', { method: EHttpMethods.GET })
}