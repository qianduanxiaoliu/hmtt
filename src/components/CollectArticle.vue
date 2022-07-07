<template>
  <van-loading v-if="isLoding" size=".53333rem" />

  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoding: false
    }
  },
  methods: {
    // 点击收藏事件
    async onClick () {
      this.isLoding = true
      if (this.is_collected) {
        try {
          await delCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoding = false
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
