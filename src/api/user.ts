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
export const useLogin = (data: LoginParams): ResponseData => {
  return request('/api/v1/login', { method: "POST", data: data })
}

export const userInfo = (): ResponseData => {
  return request('/api/v1/userInfo', { method: "GET" })
}