import request from '@/utils/request'

export function addNormalClass(data) {
  return request({
    url: '/api/private/v1/goodsnormal',
    method: 'post',
    data
  })
}