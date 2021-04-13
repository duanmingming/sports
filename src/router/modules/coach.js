/*
 * @Author: your name
 * @Date: 2021-04-13 14:31:48
 * @LastEditTime: 2021-04-13 14:32:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/coach.js
 */
import Layout from '@/layout'

const coachRouter = {
  path: '/coach',
  component: Layout,
  redirect: '/coach/index',
  name: 'coach',
  meta: {
    title: '',
    icon: 'chart'
  },
  children: [{
    path: 'index',
    component: () => import('@/views/coach/index'),
    name: 'index',
    meta: {
      title: '教练管理',
      noCache: true
    }
  }]
}

export default coachRouter
