import request from '@/utils/request'

/**
 *获取文章内容
 * @param {文章的id} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}

/**
 *关注用户
 * @param {作者id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 *取消关注
 * @param {作者id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 *收藏文章
 * @param {文章的id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 *取消文章收藏
 * @param {文章的id} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
