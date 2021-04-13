/*
 * @Author: your name
 * @Date: 2021-04-13 14:54:15
 * @LastEditTime: 2021-04-13 14:55:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/staff.js
 */
import Layout from '@/layout'

const staffRouter = {
  path: '/staff',
  component: Layout,
  redirect: '/staff/index',
  name: 'staff',
  meta: {
    title: '',
    icon: 'chart'
  },
  children: [{
    path: 'index',
    component: () => import('@/views/staff/index'),
    name: 'index',
    meta: {
      title: '员工管理',
      noCache: true
    }
  }]
}

export default staffRouter
