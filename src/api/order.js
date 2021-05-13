import request from '@/utils/request'

export function getQueryList(params) {
  return request({
    url: '/api/private/v1/salesorder',
    method: 'get',
    params
  })
}

export function editNormalClass(data) {
  return request({
    url: '/api/private/v1/goodsnormal',
    method: 'put',
    data
  })
}

export function deleteNormalClass(id) {
  return request({
    url: '/api/private/v1/goodsnormal/' + id,
    method: 'delete'
  })
}