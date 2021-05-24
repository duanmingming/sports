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

  export function getClassTimesDetail(query) {
    return request({
      url: '/api/private/v1/classtimes/list',
      method: 'get',
      params: query
    })
  }

  export function getSignClassTimes(query) {
    return request({
      url: '/api/private/v1/classtimes/sign',
      method: 'get',
      params: query
    })
  }

  export function signClassTimes(data) {
    return request({
      url: '/api/private/v1/classtimes/sign',
      method: 'put',
      data
    })
  }

  export function getClassStudent(query) {
    return request({
      url: '/api/private/v1/schedule/member',
      method: 'get',
      params: query
    })
  }

  export function getClassCoach(query) {
    return request({
      url: '/api/private/v1/schedule/coach',
      method: 'get',
      params: query
    })
  }




  



