import request from '@/utils/request'

/**
 *  搜索联想关键词
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

/**
 *获取搜索结果
 * @param page 第几页  per_page 每页数量  q传入的值
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
