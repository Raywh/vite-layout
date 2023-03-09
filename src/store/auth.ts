// 定义token的名称为 vite-layout-token, 使用localStorage存储token
const tokenName = 'vite-layout-token'
// 定义 getToken
export const getToken = () => {
  return localStorage.getItem(tokenName)
}
// 定义setToken
export const setToken = (token: string) => {
  return localStorage.setItem(tokenName, token)
}

// 定义removeToken
export const removeToken = () => {
  localStorage.removeItem(tokenName)
}
