import request from './request'

interface loginData {
  username: string,
  password: string
}

export function userLogin(data: loginData) {
  return request.postData('/api/v1/auth/token', data)
}