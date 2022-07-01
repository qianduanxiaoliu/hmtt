import request from '@/utils/request'
/**
 *获取短信验证码
 * @param {number} mobile
 * @returns
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *登录
 * @param {mobile,code} param
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @returns 获取用户个人资料
 */
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}
