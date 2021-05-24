/*
 * @Author: your name
 * @Date: 2021-04-13 15:31:08
 * @LastEditTime: 2021-04-13 15:33:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/crm.js
 */
import Layout from '@/layout'

const crmRouter = {
  path: '/crm',
  component: Layout,
  redirect: '/crm/client',
  name: 'crm',
  meta: {
    title: 'CRM管理',
    icon: 'chart'
  },
  children: [{
    path: 'client',
    component: () => import('@/views/crm/client'),
    name: 'client',
    meta: {
      title: '客户信息录入',
      noCache: true
    }
  },
  {
    path: 'distribution',
    component: () => import('@/views/crm/distribution'),
    name: 'distribution',
    meta: {
      title: '客户信息分配',
      noCache: true
    }
  },
  {
    path: 'private',
    component: () => import('@/views/crm/private'),
    name: 'private',
    meta: {
      title: '私有客户池',
      noCache: true
    }
  },
  {
    path: 'public',
    component: () => import('@/views/crm/public'),
    name: 'public',
    meta: {
      title: '公共客户池',
      noCache: true
    }
  },
  {
    path: 'communication',
    component: () => import('@/views/crm/communication'),
    name: 'communication',
    meta: {
      title: '客户精耕记录',
      noCache: true
    }
  },
  {
    path: 'reservation',
    component: () => import('@/views/crm/reservation'),
    name: 'reservation',
    meta: {
      title: '客户预约体验',
      noCache: true
    }
  }
  ]
}

export default crmRouter
