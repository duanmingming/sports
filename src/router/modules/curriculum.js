/*
 * @Author: your name
 * @Date: 2021-04-13 15:19:17
 * @LastEditTime: 2021-05-10 16:42:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/curriculum.js
 */
import Layout from '@/layout'

const curriculumRouter = {
  path: '/curriculum',
  component: Layout,
  redirect: '/curriculum/schedule',
  name: 'curriculum',
  meta: {
    title: '排课与销课',
    icon: 'chart'
  },
  children: [{
    path: 'schedule',
    component: () => import('@/views/curriculum/schedule'),
    name: 'schedule',
    meta: {
      title: '排课管理',
      noCache: true
    }
  },
  {
    path: 'signIn',
    component: () => import('@/views/curriculum/signIn'),
    name: 'signIn',
    meta: {
      title: '签到管理',
      noCache: true
    }
  },
  {
    path: 'studentSchedule',
    component: () => import('@/views/curriculum/studentSchedule'),
    name: 'studentSchedule',
    meta: {
      title: '学员课表',
      noCache: true
    }
  },
  {
    path: 'coachSchedule',
    component: () => import('@/views/curriculum/coachSchedule'),
    name: 'coachSchedule',
    meta: {
      title: '教练课表',
      noCache: true
    }
  },
  {
    hidden: true,
    path: 'add',
    component: () => import('@/views/curriculum/class/index'),
    name: 'add',
    meta: {
      title: '教练课表',
      noCache: true
    }
  },
  {
    hidden: true,
    path: 'sign',
    component: () => import('@/views/curriculum/class/sign'),
    name: 'sign',
    meta: {
      title: '教练课表',
      noCache: true
    }
  }
  ]
}

export default curriculumRouter

