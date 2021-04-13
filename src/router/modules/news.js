/*
 * @Author: your name
 * @Date: 2021-04-13 14:57:52
 * @LastEditTime: 2021-04-13 15:01:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/news.js
 */
import Layout from '@/layout'

const newsRouter = {
  path: '/news',
  component: Layout,
  redirect: '/news/img',
  name: 'news',
  meta: {
    title: '资讯管理',
    icon: 'chart'
  },
  children: [{
    path: 'img',
    component: () => import('@/views/news/img'),
    name: 'Img',
    meta: {
      title: '轮播图管理',
      noCache: true
    }
  },
  {
    path: 'article',
    component: () => import('@/views/news/article'),
    name: 'article',
    meta: {
      title: '文章管理',
      noCache: true
    }
  },
  {
    path: 'notice',
    component: () => import('@/views/news/notice'),
    name: 'notice',
    meta: {
      title: '通告管理',
      noCache: true
    }
  }
  ]
}

export default newsRouter
