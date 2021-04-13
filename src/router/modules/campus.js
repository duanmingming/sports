/*
 * @Author: your name
 * @Date: 2021-04-07 15:02:45
 * @LastEditTime: 2021-04-07 15:08:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/campus.js
 */
import Layout from '@/layout'

const campusRouter = {
  path: '/campus',
  component: Layout,
  redirect: '/campus/manage',
  name: 'Order',
  meta: {
    title: '',
    icon: 'chart'
  },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/campus/manage'),
      name: 'Class',
      meta: { title: '校区管理', noCache: true }
    }
  ]
}

export default campusRouter
