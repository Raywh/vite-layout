import { createRouter, createWebHistory } from 'vue-router'

import { private_routes } from './menuRoutes'
// 定义登录前的可使用路由
const constant_routes = [
  {
    path: '/redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/components/error-page/404.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: private_routes.concat(constant_routes)
})

export default router
