<template>
  <div class="layout">
    <!-- 内容区域 -->
    <keep-alive :include="['Home']">
      <router-view class="main" />
    </keep-alive>

    <!-- 底部tabbar -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <template #icon> <i class="toutiao toutiao-shouye"></i> </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">
        视频
        <template #icon> <i class="toutiao toutiao-shipin"></i> </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="search">
        问答
        <template #icon> <i class="toutiao toutiao-wenda"></i> </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search">
        我的
        <template #icon> <i class="toutiao toutiao-wode"></i> </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  background-color: #f5f7f9;
  padding-bottom: 100px;
}
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 20px !important;
}
</style>
