<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'searchSuggest',
  props: {
    searchText: {
      typr: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: [] // 联想关键词
    }
  },
  methods: {
    // 因为这里渲染的不是不同的字符串而是html代码片段 需要用到v-html 所以不能使用过滤器 过滤器不能再属性中使用
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    // 监听输入框
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 500)
      },
      immediate: true // 立即监听 组件在创建的时候就会监听一次
    }
  },
  beforeDestroy () {
    // 组件销毁清除定时器 避免内存泄漏
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
