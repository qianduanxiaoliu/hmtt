<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <router-link to="/"
            ><div>{{ userInfo.art_count }}</div>
            <div>头条</div>
          </router-link>
        </li>
        <li>
          <router-link to="/"
            ><div>{{ userInfo.follow_count }}</div>
            <div>关注</div>
          </router-link>
        </li>
        <li>
          <router-link to="/"
            ><div>{{ userInfo.fans_count }}</div>
            <div>粉丝</div>
          </router-link>
        </li>
        <li>
          <router-link to="/"
            ><div>{{ userInfo.like_count }}</div>
            <div>获赞</div>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 登录前 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>

    <!-- 收藏历史 -->
    <div class="coll">
      <van-grid :column-num="2">
        <van-grid-item text="收藏" to="/">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="历史" to="/">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- cell单元格 -->
    <div class="cell">
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
    </div>

    <!-- 退出登录按钮 -->
    <van-button
      block
      type="default"
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data.data
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgba(51, 150, 250, 0.8) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
// 未登录
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
    // vertical-align: middle; 解决行内块基线对齐问题
    // display: block;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
  }
}
// 已登录
.header-login {
  padding-top: 116px;
  .avatar {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;
    .button {
      width: 116px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;

    li {
      flex: 1;
      text-align: center;
      div {
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
        color: #fff;
        font-weight: 400;
      }
    }
  }
}

//收藏历史
.coll {
  margin-bottom: 10px;
  .toutiao-shoucang {
    font-size: 45px;
    color: #eb5253;
  }
  .toutiao-lishi {
    font-size: 45px;
    color: #ff9d1d;
  }
  /deep/.van-grid-item__text {
    font-size: 28px;
  }
}

// cell单元格
.cell {
  margin-bottom: 9px;
}

// 退出登录按钮
.logout {
  color: red;
}
</style>
