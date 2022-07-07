<template>
  <div>
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="item.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ item.content }}</p>
        <p>
          <span style="margin-right: 10px">{{
            item.pubdate | dataformat
          }}</span>
          <van-button
            size="mini"
            type="default"
            @click="$emit('replay-show', item)"
            >{{ item.reply_count ? item.reply_count : "" }}回复</van-button
          >
        </p>
      </div>
      <van-loading v-if="isloading" />
      <van-icon
        v-else
        slot="right-icon"
        :name="item.is_liking ? 'like' : 'like-o'"
        :color="item.is_liking ? 'red' : ''"
        @click="onClick"
      >
        {{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
      >
    </van-cell>
  </div>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isloading: false
    }
  },
  methods: {
    async onClick () {
      this.isloading = true
      if (this.item.is_liking) {
        // 取消点赞
        try {
          await delLike(this.item.com_id)
          this.item.is_liking = false
          this.item.like_count--
        } catch (error) {
          console.log(error)
        }
      } else {
        // 点赞
        try {
          await addLike(this.item.com_id)
          this.item.is_liking = true
          this.item.like_count++
        } catch (error) {
          console.log(error)
        }
      }
      this.isloading = false
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
