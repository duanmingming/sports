import request from '@/utils/request'


export function getCustomerList(params) {
  return request({
    url: '/api/private/v1/customer/list',
    method: 'get',
    params
  })
}

// export function getList(params) {
//   return request({
//     url: '/api/private/v1/salesorder',
//     method: 'get',
//     params
//   })
// }

// export function getOrder(params) {
//   return request({
//     url: '/api/private/v1/salesorder/header',
//     method: 'get',
//     params
//   })
// }

export function addCustomer(data) {
  return request({
    url: '/api/private/v1/customer',
    method: 'post',
    data
  })
}

export function editCustomer(data) {
  return request({
    url: '/api/private/v1/customer',
    method: 'put',
    data
  })
}

export function deleteCustomer(params) {
  return request({
    url: '/api/private/v1/customer/' + params,
    method: 'delete'
  })
}

export function getDistributionList(params) {
  return request({
    url: '/api/private/v1/customer/alist',
    method: 'get',
    params
  })
}


export function getConsulant(params) {
  return request({
    url: '/api/private/v1/users/consultant',
    method: 'get',
    params
  })
}

export function allocate(data) {
  return request({
    url: '/api/private/v1/customer/allocate',
    method: 'put',
    data
  })
}

export function addPrivateCommunication(data) {
  return request({
    url: '/api/private/v1/communication',
    method: 'post',
    data
  })
}

export function getPravateList(params) {
  return request({
    url: '/api/private/v1/customer/prilist',
    method: 'get',
    params
  })
}

export function getPublicList(params) {
  return request({
    url: '/api/private/v1/customer/publist',
    method: 'get',
    params
  })
}


export function getComList(params) {
  return request({
    url: '/api/private/v1/communication/list',
    method: 'get',
    params
  })
}

export function editPrivateCommunication(data) {
  return request({
    url: '/api/private/v1/communication',
    method: 'put',
    data
  })
}


export function deleteCommunication(params) {
  return request({
    url: '/api/private/v1/communication/' + params ,
    method: 'delete'
  })
}

export function searchName(params) {
  return request({
    url: '/api/private/v1/search/customer',
    method: 'get',
    params
  })
}