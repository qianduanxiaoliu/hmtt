<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button to="Search" icon="search" class="search-btn" type="info"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- tab栏切换 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- tab栏内内容的单元格组件 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 右边汉堡标签 -->
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <!-- 频道面板弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1.33rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        @sub-event="active--"
        :userChannels="channels"
        :active="active"
        @activeChange="(isChannelPanelShow = false), (active = $event)"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
import ArticleList from '@/components/ArticleList.vue'
import ChannelPanel from './componets/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },

  data () {
    return {
      active: 0, // tab栏切换用
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 获取我的推荐列表
    // 判断是否登录 未登录时判断是否第一次使用 第一次使用本地没有channels 会发送请求 修改过频道后回存在本地就直接在本地获取数据
    // 已登录则直接发送请求获取数据
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log(res.data.data.channels)
          this.channels = res.data.data.channels
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  // unset把本来设置的属性去掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
/deep/.van-tabs__nav--line.van-tabs__nav--complete {
  padding-right: 101px;
}
.menu {
  min-width: 100px;
  height: 88px;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
  right: 0;
  text-align: center;
  line-height: 88px;
  .toutiao {
    font-size: 33px;
  }
}

/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
.van-cell-group {
  padding-top: 180px;
}
// 解决html的滚动条导致每个页面的位置相同的问题
/deep/.van-pull-refresh {
  height: 1054px;
  overflow: auto;
}
</style>
