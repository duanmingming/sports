/*
 * @Author: your name
 * @Date: 2021-04-07 13:37:34
 * @LastEditTime: 2021-04-07 13:47:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/order.js
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/class',
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'class',
      component: () => import('@/views/order/management'),
      name: 'Class',
      meta: { title: '课程订单', noCache: true }
    },
    {
      path: 'managementEdit',
      component: () => import('@/views/order/management'),
      name: 'managementEdit',
      meta: {
        title: 'Order managementEdit',
        noCache: true
      }
    }
  ]
}

export default orderRouter
