/*
 * @Author: your name
 * @Date: 2021-04-13 14:26:07
 * @LastEditTime: 2021-04-13 14:27:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/student.js
 */
import Layout from '@/layout'

const studentRouter = {
  path: '/student',
  component: Layout,
  redirect: '/student/index',
  name: 'student',
  meta: {
    title: '',
    icon: 'chart'
  },
  children: [{
    path: 'index',
    component: () => import('@/views/student/index'),
    name: 'index',
    meta: {
      title: '学员管理',
      noCache: true
    }
  }]
}

export default studentRouter
