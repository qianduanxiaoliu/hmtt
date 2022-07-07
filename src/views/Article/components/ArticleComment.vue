<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: { // 类型
      type: String,
      required: true,
      // 自定义校验
      Validator (value) {
        return ['a', 'b'].includes(value)
      }

    },

    source: { // 文章或者评论的id
      type: [Number, String],
      required: true
    },

    commentList: { // 评论数据
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [], // 评论数据
      loading: false, // 判断是否加载完成
      finished: false // 判断是否全部加载完成
    }
  },
  methods: {
    // 获取评论
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // 判断是否全部加载完毕
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 返回本次数据最后一位id赋值给offset作为下一次请求的数据
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每一次数据拿回来就把list的转圈关闭
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getCommentList() // 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
