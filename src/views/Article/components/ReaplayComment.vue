<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$emit('close-event', false)"
      fixed
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>

    <van-cell title="全部回复" />

    <div class="comment1">
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
      ></CommentItem>
    </div>

    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>

    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        v-if="isAddCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          commentList.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      // 默认值是一个对象的写法
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      commentList: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit
        })
        this.commentList = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      return this.comment.reply_count ? `${this.comment.reply_count}条回复` : '暂无回复'
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 108px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  background-color: red;
}
</style>
