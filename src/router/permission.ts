// vue3 permission.ts 
// 使用 pinia库定义状态管理
// 定义路由守卫 使用 nprogress库定义进度条
// 未登录跳转到登录页

// Import necessary libraries and dependencies
import router from '@/router'
import { useAuthStore } from "@/store/user";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Set up NProgress to show a progress bar during route changes
router.beforeEach(async (to) => {
  NProgress.start()
  const authStore = useAuthStore();
  const token = authStore.token
  // If the user is not logged in, redirect to the login page
  if (token) {
    // If the user info is not obtained, get the user info
    if (!authStore.info._id) {
      await authStore.getUserInfo()
    }
    return true
  } else {
    if (to.path !== '/login') return '/login'
    return true
  }
})
router.afterEach(() => {
  NProgress.done()
})



