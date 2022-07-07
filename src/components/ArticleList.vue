<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem'
import { getArticleList } from '@/api/home'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },

  mounted () {
    ele = this.$refs.pullrefresh.$el
    ele.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false, // 判断是否加载完
      refreshing: false
    }
  },
  methods: {
    // 发送axios请求
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据全部加载完毕 则将finished设置为true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList = [...this.articleList, ...res.data.data.results]
        // 若数据更新完毕则将loading设置为false
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    // 下拉触底事件
    onLoad () {
      this.getArticleList()
    },
    // 上拉刷新
    onRefresh () {
      console.log('触发下拉刷新')
      this.timestamp = Date.now()
      this.finished = false
      this.loading = true
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
</style>
