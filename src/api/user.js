// 用户相关的请求模块

import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    // 请求的方法
    method: 'POST',
    url: '/app/v1_0/authorizations',

    // 请求体的参数
    data
  })
}
// 发送验证码接口
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前登录用户的个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表或默认推荐频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
