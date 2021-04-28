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


// 普通商品
export function addGeneralClass(data) {
  return request({
    url: '/api/private/v1/goodsgeneral',
    method: 'post',
    data
  })
}

export function getGeneralClass(params) {
  return request({
    url: '/api/private/v1/goodsgeneral',
    method: 'get',
    params
  })
}

export function editGeneralClass(data) {
  return request({
    url: '/api/private/v1/goodsgeneral',
    method: 'put',
    data
  })
}

export function deleteGeneralClass(id) {
  return request({
    url: '/api/private/v1/goodsgeneral/' + id,
    method: 'delete'
  })
}


// 活动商品
export function addEventClass(data) {
  return request({
    url: '/api/private/v1/goodsaction',
    method: 'post',
    data
  })
}

export function getEventlClass(params) {
  return request({
    url: '/api/private/v1/goodsaction',
    method: 'get',
    params
  })
}

export function editEventClass(data) {
  return request({
    url: '/api/private/v1/goodsaction',
    method: 'put',
    data
  })
}

export function deleteEventClass(id) {
  return request({
    url: '/api/private/v1/goodsaction/' + id,
    method: 'delete'
  })
}


// 赛事商品
export function addMatchClass(data) {
  return request({
    url: '/api/private/v1/goodsmatch',
    method: 'post',
    data
  })
}

export function getMatchlClass(params) {
  return request({
    url: '/api/private/v1/goodsmatch',
    method: 'get',
    params
  })
}

export function editMatchClass(data) {
  return request({
    url: '/api/private/v1/goodsmatch',
    method: 'put',
    data
  })
}

export function deleteMatchClass(id) {
  return request({
    url: '/api/private/v1/goodsmatch/' + id,
    method: 'delete'
  })
}

// 短期商品
export function addShortClass(data) {
  return request({
    url: '/api/private/v1/goodscamps',
    method: 'post',
    data
  })
}

export function getShortlClass(params) {
  return request({
    url: '/api/private/v1/goodscamps',
    method: 'get',
    params
  })
}

export function editShortClass(data) {
  return request({
    url: '/api/private/v1/goodscamps',
    method: 'put',
    data
  })
}

export function deleteShortClass(id) {
  return request({
    url: '/api/private/v1/goodscamps/' + id,
    method: 'delete'
  })
}






