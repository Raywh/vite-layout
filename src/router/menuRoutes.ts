
// 定义登录后的菜单栏路由
/* Layout */
import Layout from '@/components/Layout/index.vue'
import { Grid, Calendar, List, Notebook, Ticket } from "@element-plus/icons-vue";

export const private_routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    // 存在两个子组件需要显示在菜单栏，所以这里不需要设置meta 和 name
    // meta: { title: '渠道', icon: 'el-icon-s-home' },
    // name: 'Channel',
    children: [
      {
        path: '/index',
        name: 'ChannelManage',
        meta: { title: '渠道管理', icon: Grid },
        component: () => import('../views/ChannelManage/index.vue')
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    children: [
      {
        path: '/product/index',
        name: 'Product',
        meta: { title: '产品核销', icon: Calendar },
        component: () => import('../views/Product/index.vue')
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    meta: { title: '渠道', icon: 'el-icon-s-home' },

    children: [
      {
        path: '/order/index',
        name: 'OrderManage',
        meta: { title: '订单管理', icon: List },
        component: () => import('../views/OrderManage/index.vue')
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/index',
    children: [
      {
        path: '/customer/index',
        name: 'CustomerManage',
        meta: { title: '客户管理', icon: Notebook },
        component: () => import('../views/CustomerManage/index.vue')
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    children: [
      {
        path: '/account/index',
        name: 'MyAccount',
        meta: { title: '我的账户', icon: Ticket },
        component: () => import('../views/MyAccount/index.vue')
      }
    ]
  }
]
