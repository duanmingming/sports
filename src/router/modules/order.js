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
      path: 'goods',
      component: () => import('@/views/order/management'),
      name: 'Class',
      meta: { title: '订单商品查询', noCache: true }
    },
    {
      path: 'query',
      component: () => import('@/views/order/management'),
      name: 'Class',
      meta: { title: '订单查询', noCache: true }
    },
    {
      path: 'status',
      component: () => import('@/views/order/management'),
      name: 'Class',
      meta: { title: '订单状态管理', noCache: true }
    }
    
  ]
}

export default orderRouter
