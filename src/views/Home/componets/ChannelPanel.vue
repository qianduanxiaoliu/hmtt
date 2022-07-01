<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-my">
      <div class="title">
        <h3>我的频道</h3>
        <van-button plain type="danger" round @click="compileChannel">{{
          !closeShow ? "编辑" : "完成"
        }}</van-button>
      </div>
      <div class="channel">
        <van-row type="flex" justify="flex-start">
          <van-col
            span="6"
            v-for="(item, index) in userChannels"
            :key="item.id"
          >
            <div
              @click="activeChange(index)"
              class="inner"
              :style="{ color: active === index ? '#ff69b4' : '' }"
            >
              <van-icon
                name="close"
                v-if="closeShow && index !== 0"
                @click="delChannel(item.id, index)"
              ></van-icon
              >{{ item.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 推荐频道 -->
    <div class="channel-recommend">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <div class="channel">
        <van-row type="flex" justify="flex-start">
          <van-col span="6" v-for="item in recommendChannels" :key="item.id">
            <div class="inner" @click="add(item.id)">
              <van-icon name="plus" /> {{ item.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    active: {
      type: Number,
      required: true
    },
    // 我的频道数据
    userChannels: {
      type: Array,
      required: true
    }
  },
  async created () {
    // 获取全部频道 双重遍历选出未选择的频道 给 recommendChannels 赋值
    const res = await getAllArticleList()
    console.log(res)
    this.recommendChannels = res.data.data.channels.filter(item => this.userChannels.every(item1 => item1.id !== item.id))
  },
  data () {
    return {
      // 删除键隐藏显示
      closeShow: false,
      // 推荐频道数据
      recommendChannels: []
    }
  },
  methods: {
    // 编辑按钮事件
    compileChannel () {
      this.closeShow = !this.closeShow
    },

    // 删除频道
    async delChannel (id, ind) {
      try {
        if (ind <= this.active) {
          this.$emit('sub-event')
        }
        const index = this.userChannels.findIndex(item => item.id === id)
        this.recommendChannels.push(this.userChannels[index])
        this.userChannels.splice(index, 1)
        // await delChannel(id)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },

    // 添加频道
    async add (id) {
      // const obj = { id: id, seq: this.userChannels.length }
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.userChannels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
      // await setAddList([obj])
      // console.log(res)
    },

    // 切换主页tab 隐藏弹出层
    activeChange (index) {
      if (!this.closeShow) {
        this.$emit('activeChange', index)
      }
    }
  },
  computed: {},
  watch: {
    userChannels: {
      deep: true,
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) { // 已登录
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333333;
  }
  .van-button {
    padding: 0 5px;
    width: 104px;
    height: 48px;
    font-size: 20px;
    border-radius: 20px;
    line-height: 48px;
    text-align: center;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 24px;
  font-weight: normal;
  line-height: 86px;
  color: #222222;
  text-align: center;
  margin-bottom: 20px;
}
.van-row {
  padding-left: 22px;
}

.channel-my {
  .van-col {
    position: relative;
  }
  i {
    font-size: 40px;
    position: absolute;
    top: -20px;
    right: 6px;
    color: #222222 !important;
  }
}
.channel-recommend {
  i {
    font-size: 30px;
  }
}
</style>
