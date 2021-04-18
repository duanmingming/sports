/*
 * @Author: your name
 * @Date: 2021-04-07 17:15:23
 * @LastEditTime: 2021-04-07 23:31:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/api/campus.js
 */
import request from '@/utils/request'

export function getCampusList(query) {
  return request({
    url: '/api/private/v1/school/list',
    method: 'get',
    params: query
  })
}

export function login() {
  return request({
    url: '/api/private/v1/login',
    method: 'get',
    params: {
      username: "admin",
      password: "123456"
    }
  })
}

export function getUserInfo() {
  return request({
    url: '/api/private/v1/users/info',
    method: 'get'
  })
}
