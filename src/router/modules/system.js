/*
 * @Author: your name
 * @Date: 2021-04-13 15:40:40
 * @LastEditTime: 2021-04-13 15:43:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/system.js
 */
import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/general',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'chart'
  },
  children: [{
    path: 'authority',
    component: () => import('@/views/system/authority'),
    name: 'authority',
    meta: {
      title: '权限管理',
      noCache: true
    }
  },
  {
    path: 'parameter',
    component: () => import('@/views/system/parameter'),
    name: 'parameter',
    meta: {
      title: '参数管理',
      noCache: true
    }
  },
  {
    path: 'keyvalue',
    component: () => import('@/views/system/keyvalue'),
    name: 'keyvalue',
    meta: {
      title: '键值管理',
      noCache: true
    }
  }
  ]
}

export default systemRouter
