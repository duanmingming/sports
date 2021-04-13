/*
 * @Author: your name
 * @Date: 2021-04-13 14:38:25
 * @LastEditTime: 2021-04-13 14:41:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/user.js
 */
import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/external',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'chart'
  },
  children: [{
    path: 'external',
    component: () => import('@/views/user/external'),
    name: 'External',
    meta: {
      title: '外部用户',
      noCache: true
    }
  },
  {
    path: 'internal',
    component: () => import('@/views/user/internal'),
    name: 'Internal',
    meta: {
      title: '内部用户',
      noCache: true
    }
  }
  ]
}

export default userRouter
