import request from '@/utils/request'

export function addNormalClass(data) {
  return request({
    url: '/api/private/v1/goodsnormal',
    method: 'post',
    data
  })
}

export function getNormalClass(params) {
  return request({
    url: '/api/private/v1/goodsnormal',
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



