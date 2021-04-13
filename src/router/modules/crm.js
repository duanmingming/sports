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
      title: '客户信息',
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
  }
  ]
}

export default crmRouter
