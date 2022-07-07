<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
  >
    <template #extra>
      <van-button type="default" :disabled="!message.length" @click="onClick"
        >发布</van-button
      >
    </template></van-field
  >
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    // 文章id或者评论id
    target: {
      typr: [String, Number],
      required: true
    },
    // 如果对文章评论不用传,对评论评论要传
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        this.$emit('add-comment', res.data.data.new_obj)
        this.$toast('评论成功')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
button {
  border: unset;
}
</style>
