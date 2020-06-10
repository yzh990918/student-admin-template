import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
  })
}

export function getInfo(token, uid) {
  return request({
    url: '/admin/getUserInfo',
    method: 'get',
    params: { token, uid: uid }
  })
}
