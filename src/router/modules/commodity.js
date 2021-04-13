/*
 * @Author: your name
 * @Date: 2021-04-13 10:44:01
 * @LastEditTime: 2021-04-13 11:04:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/commodity.js
 */
import Layout from '@/layout'

const commodityRouter = {
  path: '/commodity',
  component: Layout,
  redirect: '/commodity/general',
  name: 'commodity',
  meta: {
    title: '商品管理',
    icon: 'chart'
  },
  children: [{
    path: 'general',
    component: () => import('@/views/commodity/general'),
    name: 'General',
    meta: {
      title: '普通商品管理',
      noCache: true
    }
  },
  {
    path: 'event',
    component: () => import('@/views/commodity/eventgoods'),
    name: 'event',
    meta: {
      title: '活动商品管理',
      noCache: true
    }
  },
  {
    path: 'match',
    component: () => import('@/views/commodity/match'),
    name: 'match',
    meta: {
      title: '赛事商品管理',
      noCache: true
    }
  },
  {
    path: 'shortTerm',
    component: () => import('@/views/commodity/shortTerm'),
    name: 'shortTerm',
    meta: {
      title: '短期运营商品管理',
      noCache: true
    }
  }
  ]
}

export default commodityRouter
