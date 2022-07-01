import dayjs from 'dayjs'
// 国际化 引入中文
import 'dayjs/locale/zh-cn'
// 引入将对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 修改为中文
dayjs.extend(relativeTime)
export const dataformat = (time) => {
  return dayjs(time).fromNow()
}
