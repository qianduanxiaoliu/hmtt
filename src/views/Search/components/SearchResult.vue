<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in searchResult"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  props: {
    // 输入框内容
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      searchResult: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  methods: {
    // 搜索事件
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 不能覆盖源数据 要在末尾添加数据
        this.searchResult.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (error) {
        console.log(error)
      }
    },
    // 触底事件
    onLoad () {
      // 每次到底会给页码加一然后请求下一页数据
      this.page++
      this.getSearchResult()
    },
    // 下拉刷新
    onRefresh () {
      this.searchResult = []
      this.page = 1
      this.finished = false
      // this.$toast.loading({
      //   message: '加载中...'
      // })
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler () {
        this.page = 1
        this.loading = false
        this.finished = false
        this.refreshing = false
      },
      deep: true
    }
  },
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: 1226px;
}
</style>
