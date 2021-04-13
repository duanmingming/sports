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
    url: '/api/private/v1/users/1',
    method: 'get',
    params: query
  })
}
