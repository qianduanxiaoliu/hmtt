import request from '@/utils/request'

/**
 *获取我的频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 *获取文章新闻推荐
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

/**
 *获取用户的频道
 * @returns
 */
export const getUserChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 *删除用户指定频道
 * @param {*} id
 * @returns
 */
export const delChannel = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/channels/${id}`
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

/**
 *获取全部频道
 * @returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

/**
 *添加频道
 * @param {*} channels
 * @returns
 */
export const setAddList = (channels) => {
  return request({
    method: 'PATCH',
    url: 'user/channels',
    data: {
      channels
    }
  })
}

/**
 *频道数据持久化
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
