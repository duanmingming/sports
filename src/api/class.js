import request from '@/utils/request'

export function getScheduleList(query) {
  return request({
    url: '/api/private/v1/schedule/list',
    method: 'get',
    params: query
  })
}

export function getStudentList(query) {
    return request({
      url: '/api/private/v1/member/cid/' + query,
      method: 'get'
    })
  }


  export function getCoachList(query) {
    return request({
      url: '/api/private/v1/coaches/cid/' + query,
      method: 'get'
    })
  }

  export function createClass(data) {
    return request({
      url: '/api/private/v1/schedule',
      method: 'post',
      data
    })
  }

  export function editClass(data) {
    return request({
      url: '/api/private/v1/schedule',
      method: 'put',
      data
    })
  }

  export function addClassTimes(data) {
    return request({
      url: '/api/private/v1/classtimes',
      method: 'post',
      data
    })
  }

  export function deleteClassTimes(query) {
    return request({
      url: '/api/private/v1/classtimes',
      method: 'delete',
      params: query
    })
  }
  



