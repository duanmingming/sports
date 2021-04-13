/*
 * @Author: your name
 * @Date: 2021-04-13 10:24:16
 * @LastEditTime: 2021-04-13 10:30:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/partner.js
 */
import Layout from '@/layout'

const partnerRouter = {
  path: '/partner',
  component: Layout,
  redirect: '/partner/index',
  name: 'partner',
  meta: {
    title: '',
    icon: 'chart'
  },
  children: [{
    path: 'index',
    component: () => import('@/views/partner/index'),
    name: 'index',
    meta: {
      title: '合作伙伴',
      noCache: true
    }
  }]
}

export default partnerRouter
