import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getToken, setToken, removeToken } from './auth'
import { userInfo } from '@/api/user'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const username = ref('')
  const info = ref({
    _id: '',
    channel_id: ''
  })

  const setUserToken = (userToken: string) => {
    token.value = userToken
    setToken(userToken)
    getUserInfo()

  }
  const setUser = (name: string) => {
    username.value = name
  }
  token.value = getToken() || '' // 从本地存储中获取token

  const getUserInfo = async () => {
    const res = await userInfo()
    if (res.code === 0) {
      info.value = res.data
    } else {
      console.log('获取用户信息失败')
    }
  }
  // 退出登录 清除token 清除用户信息  跳转到登录页
  const logout = () => {
    token.value = ''
    info.value._id = ''
    info.value.channel_id = ''
    removeToken()
    router.push('/login')
  }
  return { token, username, info, setUserToken, setUser, getUserInfo, logout }
})
