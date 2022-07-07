<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :plain="value"
    :icon="!value ? 'plus' : ''"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    // 是否关注
    value: {
      type: Boolean,
      required: true
    },
    // 用户id
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    // 关注键点击事件
    // 判断是否关注
    async onClick () {
      this.isAjax = true
      if (this.value) {
        try {
          await delUser(this.target)
          // 请求成功后改变样式
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
