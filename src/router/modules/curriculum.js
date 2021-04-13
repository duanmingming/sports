/*
 * @Author: your name
 * @Date: 2021-04-13 15:19:17
 * @LastEditTime: 2021-04-13 15:24:23
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
  }
  ]
}

export default curriculumRouter

