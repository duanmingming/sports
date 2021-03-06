import request from '@/utils/request'


export function getQueryDetail(params) {
  return request({
    url: '/api/private/v1/salesorder/detail',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: '/api/private/v1/salesorder',
    method: 'get',
    params
  })
}

export function getOrder(params) {
  return request({
    url: '/api/private/v1/salesorder/header',
    method: 'get',
    params
  })
}

export function changeStatus(data) {
  return request({
    url: '/api/private/v1/salesorder/status',
    method: 'put',
    data
  })
}