/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}

/**
 *设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/**
 * 根据key删除本地存储中指定的数据
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/**
 * 清除所有的本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
