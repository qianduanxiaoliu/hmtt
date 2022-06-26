<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <!-- from表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format=" ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 表单提交
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        // 获取成功后再vuex中调用setUser给user赋值
        this.$store.commit('setUser', res.data.data)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        console.log('验证通过')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('发送失败,请重试')
        }
      } catch (error) {
        console.log('验证失败')
        this.$toast.fail('手机号格式错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}

.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  line-height: 48px;
  background-color: #ededed;
  border-radius: 23px;
  text-align: center !important;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
